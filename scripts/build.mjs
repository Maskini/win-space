import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { HomePage, DemoPage } from '../src/pages.mjs';

const root = new URL('../', import.meta.url);
await mkdir(new URL('demo/', root), { recursive: true });
await writeFile(new URL('index.html', root), HomePage());
await writeFile(new URL('demo/index.html', root), DemoPage());
console.log(`Built home and demo pages in ${fileURLToPath(root)}`);
