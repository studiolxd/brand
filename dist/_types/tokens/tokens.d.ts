/** Nombre de una custom property del sistema, con sus dos guiones. */
export type TokenName = string;
/**
 * Todos los tokens del sistema, `{ '--nombre': 'valor' }`, con los valores ya
 * resueltos (nunca un `var()`).
 */
export declare const tokens: Readonly<Record<TokenName, string>>;
/**
 * El valor de un token, o un error si no existe.
 *
 * Falla en vez de devolver `undefined` a propósito: un estilo inline con un
 * valor vacío no se ve roto, se ve «casi bien», y ese fallo viaja hasta la
 * bandeja de entrada de alguien.
 */
export declare function token(name: TokenName): string;
/**
 * El valor de un token en píxeles absolutos.
 *
 * La escala del sistema está en `rem`, que fuera del navegador no significa
 * nada: Outlook resuelve `rem` contra su propio contexto y el correo sale con
 * otro tamaño. Los tokens que ya vienen en `px` (radios, grosores de borde) y
 * los sin unidad (interlineados, pesos) pasan tal cual.
 */
export declare function tokenPx(name: TokenName): string;
