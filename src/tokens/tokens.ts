/*
 * Los tokens del sistema, legibles desde JS/TS.
 *
 * `tokens.json` lo genera `pnpm build:tokens` (plataforma `js` de
 * `sd.config.mjs`) en la misma pasada de transformación que el CSS, así que
 * cada valor es literalmente el que emite el `:root` generado. No editarlo a
 * mano.
 *
 * Para qué: hay consumidores que no pueden leer una custom property. Un correo
 * HTML es el caso claro —Outlook no resuelve `var()`, así que todo estilo va
 * inline y resuelto en tiempo de render—, pero vale igual para un canvas, un
 * PDF o cualquier sitio donde el valor haga falta como dato y no como CSS.
 *
 * Lo que NO hay aquí son los pares oscuros: un token `surface-dark-*` se
 * publica con el nombre de su par claro, así que no puede convivir con él en
 * un mapa plano. Quien necesite los dos temas (el correo) los deriva de los
 * roles semánticos `*-on-dark`, que sí son tokens normales — la misma regla de
 * derivación que documentan Foundations y el CLAUDE.md.
 */
import raw from './tokens.json';

/** Nombre de una custom property del sistema, con sus dos guiones. */
export type TokenName = string;

/**
 * Todos los tokens del sistema, `{ '--nombre': 'valor' }`, con los valores ya
 * resueltos (nunca un `var()`).
 */
export const tokens: Readonly<Record<TokenName, string>> = raw;

/**
 * El valor de un token, o un error si no existe.
 *
 * Falla en vez de devolver `undefined` a propósito: un estilo inline con un
 * valor vacío no se ve roto, se ve «casi bien», y ese fallo viaja hasta la
 * bandeja de entrada de alguien.
 */
export function token(name: TokenName): string {
  const value = tokens[name];
  if (value === undefined) throw new Error(`Token desconocido: ${name}`);
  return value;
}

/** 1rem, en píxeles: el sistema no toca el `font-size` del `html`. */
const ROOT_FONT_SIZE = 16;

/**
 * El valor de un token en píxeles absolutos.
 *
 * La escala del sistema está en `rem`, que fuera del navegador no significa
 * nada: Outlook resuelve `rem` contra su propio contexto y el correo sale con
 * otro tamaño. Los tokens que ya vienen en `px` (radios, grosores de borde) y
 * los sin unidad (interlineados, pesos) pasan tal cual.
 */
export function tokenPx(name: TokenName): string {
  const value = token(name);
  const rem = value.match(/^(-?[\d.]+)rem$/);
  return rem ? `${Number(rem[1]) * ROOT_FONT_SIZE}px` : value;
}
