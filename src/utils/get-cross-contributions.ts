import { join, sep } from 'path';
import shell from 'shelljs';
import async from 'async';

type Contributions = Record<string, string[]>;

type QueueTask = {
  projectPath: string;
  contributions: Contributions;
};

let queue: async.QueueObject<QueueTask>;
let contributions: Contributions = {};

const MAX_CONCURRENCY = process.env.MAX_CONCURRENCY ?? 10;

const getProjectPath = (project: string) => project.split(sep).slice(-2).join(sep);
const parseGitLog = (output: string) => output.split('\n').filter(Boolean);

function execGitLog(projectPath: string) {
  const gitLogCommand = `git log --pretty="%an %ae" ${projectPath}`;
  const gitLog = shell.exec(gitLogCommand, { silent: true });

  return gitLog.stdout;
}

async function getContributions(task: QueueTask, done: async.ErrorCallback<Error>) {
  const gitLogExec = execGitLog(task.projectPath);
  const contributions = parseGitLog(gitLogExec);

  for (const contributor of contributions) {
    task.contributions[contributor] = (task.contributions[contributor] ?? []).concat(
      task.projectPath
    );
  }

  done();
}

async function getGitLog(repository: string, projectsPath: string[]) {
  const resolvedPath = join(process.cwd(), repository);
  process.chdir(resolvedPath);

  queue = async.queue<QueueTask>((task, done) => {
    getContributions(task, done);
  }, +MAX_CONCURRENCY);

  for (const project of projectsPath) {
    queue.push({
      projectPath: getProjectPath(project),
      contributions,
    });
  }

  if (queue.length() > 0) {
    await queue.drain();
  }

  return contributions;
}

async function getCrossContributors(repository: string, projects: string[]) {
  const contributions = await getGitLog(repository, projects);
  const contributors = Object.keys(contributions);

  let sumOfCrossContributors = 0;

  for (const contributor of contributors) {
    if (contributions[contributor].length > 1) {
      ++sumOfCrossContributors;
    }
  }

  return sumOfCrossContributors;
}

export { getCrossContributors };
