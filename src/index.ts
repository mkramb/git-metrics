import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { contributors } from './commands/contributors';

yargs(hideBin(process.argv))
  .scriptName('git-metrics-cli')
  .demandCommand()
  .strict()
  .command(
    'count-contributors [repositoryPath]',
    'Count projects contributors and update README.md',
    (yargs) => {
      return yargs
        .positional('repositoryPath', {
          describe: 'repository local path',
          type: 'string',
        })
        .demandOption('repositoryPath');
    },
    async (argv) => {
      await contributors(argv.repositoryPath);
    }
  )
  .wrap(yargs.terminalWidth())
  .parse();
