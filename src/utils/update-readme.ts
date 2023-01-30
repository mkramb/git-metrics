import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const README_TITLE = `# Sum of Cross Contributions`;

const getReadmeContent = (sumOfCrossContributors: number) =>
  `${README_TITLE} : ${sumOfCrossContributors}`;

function updateReadme(repository: string, sumOfCrossContributors: number) {
  const resolvedPath = join(process.cwd(), repository);
  const readmePath = join(resolvedPath, 'README.md');

  let fileContent = [];

  if (existsSync(readmePath)) {
    const currentContent = readFileSync(readmePath, 'utf-8').split('\n');

    for (let line = 0; line < currentContent.length; line++) {
      if (currentContent[line].includes(README_TITLE)) {
        currentContent.splice(line, 1);
        break;
      }
    }

    fileContent = currentContent;
  }

  fileContent.unshift(getReadmeContent(sumOfCrossContributors));
  writeFileSync(readmePath, fileContent.join('\n'), 'utf-8');

  console.warn(`Result were appended to root README.md`);
}

export { updateReadme };
