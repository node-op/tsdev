import { transformSync } from 'esbuild';
import { existsSync, promises as fs } from 'fs';

export async function load(url, context, nextLoad) {
  if (url.endsWith('.ts')) {
    const absPath = url.replace('file://', '');
    const source = await fs.readFile(absPath, 'utf-8');
    const { code } = transformSync(source, { loader: 'ts' });
    return {
      format: 'module',
      source: code,
      shortCircuit: true
    };
  }
  return nextLoad(url, context);
}

export function resolve(specifier, context, defaultResolve) {
  const { parentURL = null } = context;
  if (process.send) {
    process.send({parentURL, specifier})
  }
  if (specifier[0] === '.' && !specifier.includes('.ts')) {
    let url = new URL(specifier, parentURL);
    // if no js file is there, let's find a ts one
    if (!existsSync(url)) {
      url = new URL(`${specifier}.ts`, parentURL);
    }
    return {
      url: url.href,
      shortCircuit: true
    };
  }

  // Let Node.js handle all other specifiers
  return defaultResolve(specifier, context, defaultResolve);
}