import {ChildProcess, ForkOptions, fork} from 'child_process'
import {resolve, sep} from 'path'
import {watchFile} from 'node:fs'

export const runModuleInVM = async (entryPoint: string) => {
  const datReg = resolve(__dirname, '..', 'register.js')
  const requireArg = `-r "${datReg}"`
  const nodeOpts = ['-r esbuild-register', requireArg, '--no-warnings'].join(' ')
  let childProc = fork(entryPoint, {
    env: {
      ...process.env,
      NODE_OPTIONS: nodeOpts
    }
  })
  const filesToWatch : string[] = []
  childProc.on('message', (msg: {nodeModules: string[], pathToFile: string}) => {
    const isFromNodeModules = msg.nodeModules.some(pathToNode => msg.pathToFile.startsWith(pathToNode))
    if (!isFromNodeModules) {
      filesToWatch.push(msg.pathToFile)
      watchFile(msg.pathToFile, () => {
        const isKill = childProc.kill()
        console.log('is kil', isKill)
        childProc = fork(entryPoint, {
          env: {
            ...process.env,
            NODE_OPTIONS: nodeOpts
          }
        })
      })
    }
  });
};