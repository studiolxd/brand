/** `viewBox` del logotipo completo: el trazado (isotipo + firma), sin margen. */
export declare const logoViewBox = "0 0 925.5 265.5";
/**
 * Los trazados del logotipo, en el sistema de coordenadas de `logoViewBox`.
 * Para pintarlo fuera de React —`next/og`, Satori, un SVG a mano— sin arrastrar
 * el componente ni su CSS.
 */
export declare const logoPaths: readonly string[];
/** El logotipo completo como documento SVG, idéntico a `dist/assets/logo.svg`. */
export declare const logoSvg: string;
