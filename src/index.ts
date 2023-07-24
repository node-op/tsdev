import { resolve } from 'path'
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { runModuleInVM } from "./vm-runner";

export const tester = true

yargs(hideBin(process.argv))
  .command(
    "dev <entry>",
    "start up a node based application",
    (yargs) => {
      yargs.positional('entry', {
        describe: 'the start file for your application',
        type: 'string',
      });
      yargs.option('inspect', {
        describe: 'attach inspector',
        type: 'boolean',
        default: false
      })
    },
    ({entry, inspect}) => {
      console.log('inspect ', inspect)
      const fullPath = resolve(process.cwd(), entry as string)
      runModuleInVM(fullPath)
    },
  )
  .demandCommand(1)
  .parse();
