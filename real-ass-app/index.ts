import {resolve} from 'path'
import yargs from "yargs";

const i_am_a_func = () => {
  process.stdout.write('sup\n', () => {
    process.stdout.write('done sayin sup')
  })
}

i_am_a_func()

let i = 2

setInterval(() => console.log('still running', i++), 500)
