#!/usr/bin/env node
// Captura una story de Storybook en claro u oscuro, para compararla con la captura de SwiftUI.
//
//   node native/apple/scripts/capture-story.mjs <storyId> <salida.png> [--dark] [--args "k:v;k2:v2"]
//        [--width 480] [--selector "#storybook-root"] [--scale 2] [--url http://localhost:6006]
//
// Requiere el Storybook en marcha (`pnpm storybook`). `storyId` es el de la URL (`atoms-button--primary`).
// Recorta al elemento de la story (con 16 px de margen) y fija el factor de escala, para que las parejas
// React/SwiftUI se midan igual.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const [storyId, out, ...rest] = process.argv.slice(2);
if (!storyId || !out) {
  console.error('uso: capture-story.mjs <storyId> <salida.png> [--dark] [--args "k:v;k2:v2"] [--width 480]');
  process.exit(2);
}
const flag = (name) => rest.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : fallback;
};
const dark = flag('dark');
const base = opt('url', 'http://localhost:6006');
const width = Number(opt('width', 480));
const scale = Number(opt('scale', 2));
const selector = opt('selector', '#storybook-root');
const args = opt('args', '');

const params = new URLSearchParams({ id: storyId, viewMode: 'story' });
if (args) params.set('args', args);
params.set('globals', `backgrounds.value:${dark ? 'dark' : 'light'}`);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width, height: 800 }, deviceScaleFactor: scale, reducedMotion: 'reduce' });
  await page.goto(`${base}/iframe.html?${params}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('#storybook-root > *', { timeout: 20000 });
  await page.waitForSelector(selector, { timeout: 20000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  if (dark) {
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    if (theme !== 'dark') console.error(`⚠ ${storyId}: el tema oscuro no se activó (data-theme=${theme})`);
  }
  const box = await page.locator(selector).first().boundingBox();
  const pad = 16;
  mkdirSync(dirname(out), { recursive: true });
  await page.screenshot({
    path: out,
    clip: {
      x: Math.max(0, box.x - pad),
      y: Math.max(0, box.y - pad),
      width: Math.min(width, box.width + 2 * pad),
      height: box.height + 2 * pad,
    },
  });
  console.log(`✔ ${out}`);
} finally {
  await browser.close();
}
