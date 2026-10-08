import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync, readdirSync } from 'node:fs';
import { entryPoints, clientComponents } from './entry-points.mjs';
import { rewriteFacadeImports } from './lib/client-boundary.mjs';

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

/* Chunks compartidos: cuando dos entradas comparten un componente, rollup saca
   su cuerpo a `dist/_shared/<Componente>.js` y su CSS al raíz de dist con el
   nombre del chunk (`dist/<Componente>.css`) — un fichero que no importa nadie.
   Sin este paso, la entrada del componente compartido y todas las que lo
   componen se publican sin estilos. */
const sharedDir = `${dist}/_shared`;
if (existsSync(sharedDir)) {
  for (const file of readdirSync(sharedDir).filter((f) => f.endsWith('.js'))) {
    const cssFile = `${dist}/${file.replace(/\.js$/, '.css')}`;
    if (!existsSync(cssFile)) continue;

    const jsFile = `${sharedDir}/${file}`;
    const cssImport = `import '../${file.replace(/\.js$/, '.css')}';`;
    let content = readFileSync(jsFile, 'utf-8');
    if (content.includes(cssImport)) continue;

    const directive = /^[ \t]*(['"])use client\1;?[ \t]*\r?\n/m;
    const hadDirective = directive.test(content);
    if (hadDirective) content = content.replace(directive, '');
    content = `${cssImport}\n${content}`;
    if (hadDirective) content = `'use client';\n${content}`;

    writeFileSync(jsFile, content);
    console.log(`✔︎ dist/_shared/${file} [css]`);
  }
}

/* Frontera cliente: un módulo de servidor que compone un componente cliente lo
   importa por su entrada (`'use client'`), nunca por el cuerpo que el bundler
   sacó a `_shared/` sin la directiva. Ver `scripts/lib/client-boundary.mjs`. */
{
  const files = new Map();
  for (const file of readdirSync(dist).filter((f) => f.endsWith('.js'))) {
    files.set(file, readFileSync(`${dist}/${file}`, 'utf-8'));
  }
  if (existsSync(sharedDir)) {
    for (const file of readdirSync(sharedDir).filter((f) => f.endsWith('.js'))) {
      files.set(`_shared/${file}`, readFileSync(`${sharedDir}/${file}`, 'utf-8'));
    }
  }
  for (const [file, content] of rewriteFacadeImports(files)) {
    writeFileSync(`${dist}/${file}`, content);
    console.log(`✔︎ dist/${file} [frontera cliente]`);
  }
}

// Activos de marca: los SVG del logotipo y el isotipo viajan tal cual a
// dist/assets, para servirlos o copiarlos (favicon, iconos PWA) sin pasar por
// el bundler. Solo logo*/logomark*: en src/assets también viven ficheros de
// desarrollo (los tests, el módulo de metadatos…) que no se copian aquí.
const assetsSrc = 'src/assets';
const assetsOut = `${dist}/assets`;
mkdirSync(assetsOut, { recursive: true });
for (const file of readdirSync(assetsSrc).filter((f) => /^logo(mark)?/.test(f) && f.endsWith('.svg'))) {
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
