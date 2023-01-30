import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function getProjects(repository: string, projectsPath: string) {
  const resolvedPath = join(process.cwd(), repository);

  const packages = join(resolvedPath, projectsPath);
  const projects: string[] = [];

  readdirSync(packages).forEach((file) => {
    const currentPath = join(packages, file);

    if (statSync(currentPath).isDirectory()) {
      projects.push(currentPath);
    }
  });

  return projects;
}

export { getProjects };
