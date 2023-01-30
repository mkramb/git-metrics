import fs from 'fs';

import { updateReadme } from './update-readme';

jest.mock('fs');

describe('update-readme', () => {
  const mockFS: jest.Mocked<typeof fs> = <jest.Mocked<typeof fs>>fs;
  const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    warn.mockReset();
  });

  test('should be able to create initial README stats', () => {
    const sumOfCrossContributors = 2;
    const existingContent = '';

    mockFS.existsSync.mockReturnValue(false);
    mockFS.readFileSync.mockReturnValue(existingContent);

    updateReadme('repository', sumOfCrossContributors, '/testing');

    expect(mockFS.writeFileSync).toHaveBeenCalledWith(
      '/testing/repository/README.md',
      `# Sum of Cross Contributions : ${sumOfCrossContributors}`,
      'utf-8'
    );

    expect(warn).toBeCalledWith('Result were appended to root README.md');
  });

  test('should be able to append stats', () => {
    const sumOfCrossContributors = 10;
    const existingContent = 'line1\nline2';

    mockFS.existsSync.mockReturnValue(true);
    mockFS.readFileSync.mockReturnValue(existingContent);

    updateReadme('repository', sumOfCrossContributors, '/testing');

    expect(mockFS.writeFileSync).toHaveBeenCalledWith(
      '/testing/repository/README.md',
      `# Sum of Cross Contributions : ${sumOfCrossContributors}\n${existingContent}`,
      'utf-8'
    );

    expect(warn).toBeCalledWith('Result were appended to root README.md');
  });
});
