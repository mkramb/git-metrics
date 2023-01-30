import shell from 'shelljs';

import { getProjects } from '../utils/get-projects';
import { checkRepository } from '../utils/check-repository';
import { getCrossContributors } from '../utils/get-cross-contributions';
import { updateReadme } from '../utils/update-readme';

const PROJECTS_PATH = process.env.PROJECTS_PATH ?? 'packages';

async function contributors(repository: string) {
  try {
    if (!shell.which('git')) {
      throw Error('Sorry, this script requires GIT to be installed');
    }

    if (!checkRepository(repository, PROJECTS_PATH)) {
      throw Error(`Repository ${repository} is not valid`);
    }

    const projects = getProjects(repository, PROJECTS_PATH);
    const sumOfCrossContributors = await getCrossContributors(repository, projects);

    updateReadme(repository, sumOfCrossContributors);
  } catch (error) {
    console.error(error.message ?? 'Error processing provided repository');
    process.exit(1);
  }
}

export { contributors };
