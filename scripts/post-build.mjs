import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { entryPoints, clientComponents } from './entry-points.mjs';

const sectionCss = {
  'clients-section':     'src/stories/sections/ClientsSection/ClientsSection.css',
  'contact-section':     'src/stories/sections/ContactSection/ContactSection.css',
  'footer':              'src/stories/sections/Footer/Footer.css',
  'header':              'src/stories/sections/Header/Header.css',
  'highlight-section':   'src/stories/sections/HighlightSection/HighlightSection.css',
  'methodology-section': 'src/stories/sections/MethodologySection/MethodologySection.css',
  'projects-section':    'src/stories/sections/ProjectsSection/ProjectsSection.css',
  'reviews-section':     'src/stories/sections/ReviewsSection/ReviewsSection.css',
  'solutions-section':   'src/stories/sections/SolutionsSection/SolutionsSection.css',
  'project-template':    'src/stories/pages/Project/Project.css',
  'legal-template':      'src/stories/pages/Legal/Legal.css',
};

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

// Copy section CSS files to dist as standalone stylesheets
for (const [name, src] of Object.entries(sectionCss)) {
  copyFileSync(src, `dist/${name}.css`);
  console.log(`✔︎ dist/${name}.css [section css]`);
}
