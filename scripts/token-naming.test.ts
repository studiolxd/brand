/*
 * D9 — La convención de nombres de los tokens:
 *
 *   <componente>-<parte>-<estado>-<propiedad>-<talla>
 *
 * (`button-hover-bg`, `menu-item-hover-color`, `input-lg-height`). Este test
 * recorre TODOS los tokens de `tokens/**` y falla si alguno la incumple en lo
 * que se puede comprobar a máquina:
 *
 * 1. El estado va ANTES de la propiedad: `link-hover-color`, nunca
 *    `link-color-hover`.
 * 2. `bg`, nunca `background`.
 * 3. `max-width`/`min-width` (y `-height`), nunca `width-max`/`width-min`.
 * 4. Las medidas se llaman `width`/`height`, nunca `inline-size`/`block-size`
 *    (la regla 5 de ejes lógicos sigue para padding, margin y gap; y en el CSS
 *    la propiedad puede seguir siendo `inline-size`: lo que cambia es el NOMBRE
 *    del token).
 * 5. La tinta es `color`, nunca `ink-color`… salvo el TONO `ink` de
 *    `Link`/`Button text` (`tone="ink"`), que es una variante y no una
 *    propiedad: `link-ink-color` es «el color del tono ink».
 * 6. El vocabulario de las props (v51) vale también para los tokens: el tono
 *    rojo es `error`, nunca `danger` (`destructive` es otra cosa: una
 *    acción, y se queda), y las tallas se escriben `2xl`, `3xl`…, nunca
 *    `xxl`, `xxxl`.
 *
 * Además vigila los renombrados de la v51 (sus alias obsoletos se retiraron en
 * la v53): cada uno de `TOKEN_RENAMES_V51` existe con su nombre nuevo y ya no
 * con el viejo, ni como token ni como alias en ninguna salida. Y que el
 * mecanismo de alias, que se queda para el próximo renombrado, casa con el
 * manifiesto: hay `deprecated-aliases.css` y su `@import` solo si hay alias.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — módulo .mjs sin tipos
import { TOKEN_RENAMES_V51 } from './lib/token-renames.mjs';

type Token = { path: string[]; file: string; extensions?: Record<string, Record<string, unknown>> };

const ROOT = join(__dirname, '..');

function loadTokens(): Token[] {
  const files: string[] = [];
  const collect = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) collect(full);
      else if (entry.name.endsWith('.json')) files.push(full);
    }
  };
  collect(join(ROOT, 'tokens'));
  const tokens: Token[] = [];
  for (const file of files) {
    const walk = (node: Record<string, unknown>, path: string[]) => {
      for (const [key, value] of Object.entries(node)) {
        if (!value || typeof value !== 'object') continue;
        const obj = value as Record<string, unknown>;
        if ('$value' in obj) {
          tokens.push({ path: [...path, key], file, extensions: obj.$extensions as Token['extensions'] });
        } else walk(obj, [...path, key]);
      }
    };
    walk(JSON.parse(readFileSync(file, 'utf-8')), []);
  }
  return tokens;
}

const tokens = loadTokens();
const dotted = (t: Token) => t.path.join('.');

/*
 * El nombre del token SIN el componente (`path[0]`) y sin el prefijo del par
 * oscuro: el componente puede llamarse `color-picker` y el par oscuro es el
 * mismo nombre que el claro.
 */
const ownName = (t: Token) =>
  t.path
    .slice(1)
    .map((segment) => segment.replace(/^surface-dark-/, ''))
    .join('-');

const STATES = new Set([
  'hover', 'active', 'focus', 'disabled', 'selected', 'checked', 'open', 'pressed', 'visited',
  'current', 'expanded', 'dragging', 'invalid', 'indeterminate', 'highlighted', 'readonly', 'error',
]);
const PROPERTIES = new Set([
  'color', 'bg', 'background', 'border', 'shadow', 'opacity', 'width', 'height', 'size', 'radius',
  // Sin `outline`: es también el nombre de una variante (`button.outline.hover-bg`).
  'weight', 'fill', 'stroke', 'ring', 'underline', 'decoration', 'font', 'padding', 'gap',
  'offset', 'cursor', 'transform', 'scale',
]);

/** Un estado que aparece detrás de una palabra de propiedad. */
function stateAfterProperty(name: string): boolean {
  const words = name.split('-');
  const firstProperty = words.findIndex((w) => PROPERTIES.has(w));
  if (firstProperty < 0) return false;
  return words.slice(firstProperty + 1).some((w) => STATES.has(w));
}

/*
 * Excepciones explícitas, una por token (ruta con puntos), cada una con su
 * porqué. No se añade una sin motivo: si un token nuevo choca con la regla, lo
 * normal es que el nombre esté mal.
 */
const EXCEPTIONS: Record<string, string> = {
  // Tono `ink` de Link y de Button text (`tone="ink"`): `ink` es la variante, y
  // `color` la propiedad. No es la propiedad `ink-color` que prohíbe la regla 5.
  'link.ink-color': 'tono ink',
  'link.surface-dark-ink-color': 'tono ink',
  'button.text.ink-color': 'tono ink',
  'button.text.surface-dark-ink-color': 'tono ink',
};

const RULES: Array<[string, (t: Token) => boolean]> = [
  ['el estado va antes de la propiedad', (t) => stateAfterProperty(ownName(t))],
  ['`bg`, nunca `background`', (t) => /(^|[.-])background($|[.-])/.test(dotted(t))],
  ['`max-width`/`min-width`, nunca `width-max`/`width-min`', (t) => /(^|-)(width|height)-(max|min)(-|$)/.test(ownName(t))],
  ['medidas: `width`/`height`, nunca `inline-size`/`block-size`', (t) => /(^|-)(inline|block)-size(-|$)/.test(ownName(t))],
  ['la tinta es `color`, nunca `ink-color`', (t) => /(^|-)ink-color$/.test(ownName(t))],
  ['el tono rojo es `error`, nunca `danger`', (t) => /(^|[.-])danger($|[.-])/.test(dotted(t))],
  ['las tallas se escriben `2xl`, nunca `xxl`', (t) => /(^|[.-])x{2,}[sl]($|[.-])/.test(dotted(t))],
];

describe('D9: convención de nombres de los tokens', () => {
  it('recorre los tokens de verdad', () => {
    expect(tokens.length).toBeGreaterThan(1000);
  });

  for (const [rule, breaks] of RULES) {
    it(rule, () => {
      const offenders = tokens.filter((t) => breaks(t) && !(dotted(t) in EXCEPTIONS)).map(dotted);
      expect(offenders).toEqual([]);
    });
  }

  it('las excepciones existen y de verdad chocan con alguna regla (no hay excepciones muertas)', () => {
    const byName = new Map(tokens.map((t) => [dotted(t), t]));
    for (const name of Object.keys(EXCEPTIONS)) {
      const token = byName.get(name);
      expect(token, name).toBeDefined();
      expect(RULES.some(([, breaks]) => breaks(token!)), name).toBe(true);
    }
  });
});

describe('D9: renombrados de la v51', () => {
  const renames = Object.entries(TOKEN_RENAMES_V51 as Record<string, string>);
  const byName = new Map(tokens.map((t) => [dotted(t), t]));
  const cssName = (path: string) => `--${path.split('.').join('-')}`;

  it('cada renombrado existe con el nombre nuevo y ya no con el viejo', () => {
    for (const [old, current] of renames) {
      expect(byName.has(old), `${old} ya no debería existir`).toBe(false);
      expect(byName.get(current), current).toBeDefined();
    }
  });

  it('la tabla de Foundations → Nombres de tokens lista cada renombrado', () => {
    const doc = readFileSync(join(ROOT, 'src/stories/foundations/NombresTokens.mdx'), 'utf-8');
    for (const [old, current] of renames) {
      expect(doc, old).toContain(`| \`${cssName(old)}\` | \`${cssName(current)}\` |`);
    }
  });

  it('ningún nombre de la v51 vuelve como alias (se retiraron en la v53)', () => {
    const olds = new Set(renames.map(([old]) => old));
    const back = tokens.flatMap((t) => ((t.extensions?.['com.studiolxd']?.deprecatedAliases as string[] | undefined) ?? []).filter((a) => olds.has(a)));
    expect(back).toEqual([]);
    const json = JSON.parse(readFileSync(join(ROOT, 'src/tokens/tokens.json'), 'utf-8'));
    for (const [old] of renames) expect(json[cssName(old)], old).toBeUndefined();
  });

  it('deprecated-aliases.css y su @import existen solo si algún token declara alias', () => {
    const hasAliases = tokens.some((t) => ((t.extensions?.['com.studiolxd']?.deprecatedAliases as string[] | undefined) ?? []).length > 0);
    const imported = readFileSync(join(ROOT, 'src/tokens/index.css'), 'utf-8').includes('@import "./deprecated-aliases.css";');
    expect(existsSync(join(ROOT, 'src/tokens/deprecated-aliases.css'))).toBe(hasAliases);
    expect(imported).toBe(hasAliases);
  });
});
