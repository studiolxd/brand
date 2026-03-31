import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { entryPoints, clientComponents } from './entry-points.mjs';

const dist = 'dist';

for (const name of Object.keys(entryPoints)) {
  const jsFile  = `${dist}/${name}.js`;
  const cssFile = `${dist}/${name}.css`;

  if (!existsSync(jsFile)) continue;

  let content = readFileSync(jsFile, 'utf-8');

  // 1. Inject CSS import (before 'use client' so it ends up after it)
  if (existsSync(cssFile)) {
    content = `import './${name}.css';\n${content}`;
  }

  // 2. Prepend 'use client' — must be the very first line
  if (clientComponents.has(name)) {
    content = `'use client';\n${content}`;
  }

  writeFileSync(jsFile, content);
  console.log(`✔︎ dist/${name}.js${clientComponents.has(name) ? ' [use client]' : ''}`);
}
