import fs from 'fs';

import { getProjects } from './get-projects';

jest.mock('fs');

describe('get-projects', () => {
  const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;

  beforeEach(() => {
    jest.clearAllMocks();

    mockFS.readdirSync.mockReturnValue(['folderA', 'folderB'] as unknown as fs.Dirent[]);
    mockFS.statSync.mockReturnValue({ isDirectory: () => true } as unknown as fs.Stats);
  });

  test('should be able to resolve projects paths', () => {
    const projects = getProjects('repository', 'projectPath', '/testing/');

    expect(projects).toEqual([
      '/testing/repository/projectPath/folderA',
      '/testing/repository/projectPath/folderB',
    ]);
  });
});
