import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { entryPoints, clientComponents } from './entry-points.mjs';

const dist = 'dist';

for (const name of Object.keys(entryPoints)) {
  const jsFile  = `${dist}/${name}.js`;
  const cssFile = `${dist}/${name}.css`;

  if (!existsSync(jsFile)) continue;

  let content = readFileSync(jsFile, 'utf-8');

  // 1. Strip any 'use client' the bundler left inside the file. Rollup la emite
  //    después de los imports y ahí no vale como directiva; la reponemos en el
  //    paso 3, en la primera línea.
  const directive = /^[ \t]*(['"])use client\1;?[ \t]*\r?\n/m;
  const hadDirective = directive.test(content);
  if (hadDirective) content = content.replace(directive, '');

  // 2. Inject CSS import (before 'use client' so it ends up después de ella)
  if (existsSync(cssFile)) {
    content = `import './${name}.css';\n${content}`;
  }

  // 3. Prepend 'use client' — must be the very first line
  const isClient = clientComponents.has(name) || hadDirective;
  if (isClient) {
    content = `'use client';\n${content}`;
  }

  writeFileSync(jsFile, content);
  console.log(`✔︎ dist/${name}.js${isClient ? ' [use client]' : ''}`);
}
