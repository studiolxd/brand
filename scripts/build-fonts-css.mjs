import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// fonts.css es una hoja sin @import: no hace falta postcss-import. Las rutas
// en el fuente son relativas a src/stylesheets/ (../assets/fonts/…), donde
// Storybook/Vite las resuelve tal cual contra src/assets/fonts/. En dist/,
// fonts.css vive junto a assets/ (mismo nivel, no un padre), así que aquí se
// reescriben a ./assets/fonts/… antes de escribir dist/fonts.css.

const src = readFileSync('src/stylesheets/fonts.css', 'utf-8');
const out = src.replaceAll("url('../assets/fonts/", "url('./assets/fonts/");

mkdirSync('dist', { recursive: true });
writeFileSync('dist/fonts.css', out);
console.log('✔︎ dist/fonts.css');
