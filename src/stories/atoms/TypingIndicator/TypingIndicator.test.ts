import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('./TypingIndicator.css', import.meta.url), 'utf8');

/** El bloque `@media (prefers-reduced-motion: reduce) { … }` del fichero. */
function bloqueMovimientoReducido(): string {
  const inicio = css.indexOf('@media (prefers-reduced-motion: reduce)');
  expect(inicio).toBeGreaterThan(-1);
  const abre = css.indexOf('{', inicio);
  let profundidad = 0;
  for (let i = abre; i < css.length; i++) {
    if (css[i] === '{') profundidad++;
    else if (css[i] === '}' && --profundidad === 0) return css.slice(abre + 1, i);
  }
  throw new Error('El bloque de movimiento reducido no está cerrado');
}

// Es lo que define al componente y lo único que no puede comprobarse desde
// jsdom (no aplica hojas de estilo) ni desde la story cuando Chromium no está
// disponible: se comprueba sobre la fuente CSS, como en `Logomark`.
describe('TypingIndicator — movimiento reducido', () => {
  it('los puntos dejan de animarse', () => {
    const bloque = bloqueMovimientoReducido();
    expect(bloque).toMatch(/\.typing-indicator__dot\s*\{[^}]*animation:\s*none/);
  });

  it('quedan en la opacidad de reposo, no a medio salto', () => {
    const bloque = bloqueMovimientoReducido();
    expect(bloque).toMatch(/opacity:\s*var\(--typing-indicator-dot-opacity-inactive\)/);
  });

  it('los retardos escalonados también se anulan', () => {
    const bloque = bloqueMovimientoReducido();
    expect(bloque).toMatch(/animation-delay:\s*0s/);
  });
});
