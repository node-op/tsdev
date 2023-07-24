import { transformSync } from 'esbuild';
import { promises as fs } from 'fs';

interface Context {
  format: string;
  url: string;
}

interface LoadResult {
  format: string;
  source: string;
  shortCircuit: boolean;
}

type NextLoad = (url: string, context: Context) => Promise<LoadResult>;

export async function load(url: string, context: Context, nextLoad: NextLoad): Promise<LoadResult> {
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
