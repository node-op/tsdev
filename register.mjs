import { transformSync } from 'esbuild';
import BuiltinModule from 'module'
import { existsSync, promises as fs } from 'fs';

// export async function load(url, context, nextLoad) {
//   if (url.endsWith('.ts')) {
//     const absPath = url.replace('file://', '');
//     const source = await fs.readFile(absPath, 'utf-8');
//     const { code } = transformSync(source, { loader: 'ts' });
//     return {
//       format: 'module',
//       source: code,
//       shortCircuit: true
//     };
//   }
//   return nextLoad(url, context);
// }

// export function resolve(specifier, context, defaultResolve) {
//   const { parentURL = null } = context;
//   if (process.send) {
//     process.send({parentURL, specifier})
//   }
//   if (specifier[0] === '.' && !specifier.includes('.ts')) {
//     let url = new URL(specifier, parentURL);
//     // if no js file is there, let's find a ts one
//     if (!existsSync(url)) {
//       url = new URL(`${specifier}.ts`, parentURL);
//     }
//     return {
//       url: url.href,
//       shortCircuit: true
//     };
//   }

//   // Let Node.js handle all other specifiers
//   return defaultResolve(specifier, context, defaultResolve);
// }

// const Module = BuiltinModule;

// const IMPORT_META_URL_VARIABLE_NAME = '__tsdev_import_meta_url__'

// const BANNER = `const ${IMPORT_META_URL_VARIABLE_NAME} = require('url').pathToFileURL(__filename).href;`

// const originalJSLoader = Module._extensions['.js'];

// const loadersInt = {
//   '.js': 'js',
//   '.jsx': 'jsx',
//   '.ts': 'ts',
//   '.tsx': 'tsx',
//   '.mjs': 'js',
//   '.mts': 'ts',
//   '.cts': 'ts',
// }

// const transformer = (code, filename) => {

// }

// const loaderByExt = {
//   'js': (mod, filename) => {},
//   'ts': (mod, filename) => {},
//   'jsx': (mod, filename) => {},
//   'tsx': (mod, filename) => {},
// }

// Module._extensions['.ts'] = (mod, filename) => {
//   console.log('i was called for ts')
//   const compileHolster = mod._compile
//   mod._compile = function _compile(code) {
//     mod._compile = compileHolster
//     const result = transformSync(code, {loader:'ts'})
//     return mod._compile(result, filename)
//   }
// }

// Module._extensions['.js'] = (mod, filename) => {
//   console.log('i was called for ts')
//   const compileHolster = mod._compile
//   mod._compile = function _compile(code) {
//     mod._compile = compileHolster
//     const result = transformSync(code, {loader:'ts'})
//     return mod._compile(result, filename)
//   }
// }

export function register() {
  console.log('called', Module._extensions)
  
  console.log('final', Module._extensions)
}