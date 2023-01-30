import { existsSync } from 'fs';
import { join } from 'path';

function checkRepository(repository: string, projectsPath: string) {
  const resolvedPath = join(process.cwd(), repository);

  const isGitRepository = existsSync(join(resolvedPath, '.git'));
  const containsProjects = existsSync(join(process.cwd(), repository, projectsPath));

  return isGitRepository && containsProjects;
}

export { checkRepository };
