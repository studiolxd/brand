import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { entryPoints, clientComponents } from './entry-points.mjs';

const sectionCss = {
  'clients-section':     'src/stories/sections/ClientsSection/ClientsSection.css',
  'contact-section':     'src/stories/sections/ContactSection/ContactSection.css',
  'footer':              'src/stories/sections/Footer/Footer.css',
  'highlight-section':   'src/stories/sections/HighlightSection/HighlightSection.css',
  'methodology-section': 'src/stories/sections/MethodologySection/MethodologySection.css',
  'projects-section':    'src/stories/sections/ProjectsSection/ProjectsSection.css',
  'reviews-section':     'src/stories/sections/ReviewsSection/ReviewsSection.css',
  'solutions-section':   'src/stories/sections/SolutionsSection/SolutionsSection.css',
  'courses-section':     'src/stories/sections/CoursesSection/CoursesSection.css',
};

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

// Copy section CSS files to dist as standalone stylesheets
for (const [name, src] of Object.entries(sectionCss)) {
  copyFileSync(src, `dist/${name}.css`);
  console.log(`✔︎ dist/${name}.css [section css]`);
}
