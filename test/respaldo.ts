import { expect, vi } from 'vitest';
import { resetMissingMessageWarnings } from '../src/stories/messages/BrandMessagesContext';

/**
 * Lo que pasa cuando falta un texto (D5): el componente **no lanza**, pinta el
 * castellano de respaldo y avisa en la consola, una vez por clave, de cuál
 * faltaba. Sustituye a los `toThrow(/espacio\.clave/)` de cuando faltar un
 * texto reventaba.
 *
 * Olvida antes los avisos ya dados, porque el aviso sale una sola vez por
 * clave en todo el proceso y otro test pudo haberlo gastado.
 */
export function expectRespaldo(pintar: () => unknown, clave: RegExp): void {
  resetMissingMessageWarnings();
  const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {});
  try {
    expect(pintar).not.toThrow();
    const avisos = aviso.mock.calls.map((llamada) => String(llamada[0]));
    const deTextos = avisos.filter((texto) => texto.startsWith('@studiolxd/brand: falta «'));
    expect(deTextos.join('\n')).toMatch(clave);
    expect(deTextos.every((texto) => texto.endsWith('» en el catálogo; sale en castellano.'))).toBe(true);
  } finally {
    aviso.mockRestore();
  }
}

/**
 * La otra cara: pintar esto **no lee** ningún texto que falte. Es lo que
 * antes probaba un `not.toThrow()` —«un componente que no enseña el selector
 * no pide su texto»— y que ahora, sin excepción, solo se ve en el aviso.
 */
export function expectSinAviso(pintar: () => unknown): void {
  resetMissingMessageWarnings();
  const aviso = vi.spyOn(console, 'warn').mockImplementation(() => {});
  try {
    expect(pintar).not.toThrow();
    const deTextos = aviso.mock.calls
      .map((llamada) => String(llamada[0]))
      .filter((texto) => texto.startsWith('@studiolxd/brand: falta «'));
    expect(deTextos).toEqual([]);
  } finally {
    aviso.mockRestore();
  }
}
