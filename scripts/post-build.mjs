import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
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

// Activos de marca: los SVG del isotipo viajan tal cual a dist/assets, para
// servirlos o copiarlos (favicon, iconos PWA) sin pasar por el bundler. Solo el
// isotipo: en src/assets también viven activos de desarrollo que no se publican.
const assetsSrc = 'src/assets';
const assetsOut = `${dist}/assets`;
mkdirSync(assetsOut, { recursive: true });
for (const file of readdirSync(assetsSrc).filter((f) => f.startsWith('logomark') && f.endsWith('.svg'))) {
  copyFileSync(`${assetsSrc}/${file}`, `${assetsOut}/${file}`);
  console.log(`✔︎ dist/assets/${file}`);
}

// Fuentes: cada familia en su subcarpeta (woff2 + LICENSE.txt de OFL), tal
// cual las sirve fonts.css vía @studiolxd/brand/fonts.
const fontsSrc = `${assetsSrc}/fonts`;
const fontsOut = `${assetsOut}/fonts`;
if (existsSync(fontsSrc)) {
  for (const family of readdirSync(fontsSrc)) {
    const familyOut = `${fontsOut}/${family}`;
    mkdirSync(familyOut, { recursive: true });
    for (const file of readdirSync(`${fontsSrc}/${family}`)) {
      copyFileSync(`${fontsSrc}/${family}/${file}`, `${familyOut}/${file}`);
    }
    console.log(`✔︎ dist/assets/fonts/${family}`);
  }
}
