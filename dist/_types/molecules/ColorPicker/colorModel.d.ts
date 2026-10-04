/**
 * El modelo del selector de color: conversiones puras entre hexadecimal, RGB y
 * HSV, sin dependencias.
 *
 * El selector trabaja en **HSV** (tono, saturación, brillo) porque es el
 * espacio de sus controles: el área es saturación × brillo y la banda es el
 * tono. Pero lo que entra y sale es **hexadecimal en minúsculas**: `#rrggbb`,
 * o `#rrggbbaa` cuando hay transparencia. Por eso el estado vivo es un `Hsva`
 * y el hex se deriva: ida y vuelta por hex se pierde el tono de un gris (todo
 * gris es `s = 0` con cualquier tono), y el pulgar de la banda saltaría a cero
 * al arrastrar por la columna del gris.
 */
/** Canales de 0 a 255 y alfa de 0 a 1. */
export interface Rgba {
    r: number;
    g: number;
    b: number;
    a: number;
}
/** Tono de 0 a 360, saturación y brillo de 0 a 100, alfa de 0 a 1. */
export interface Hsva {
    h: number;
    s: number;
    v: number;
    a: number;
}
/**
 * Lee un hexadecimal de 3, 4, 6 u 8 dígitos, con o sin `#`, en mayúsculas o
 * minúsculas. Cualquier otra cosa —un nombre CSS, `rgb()`, `transparent`—
 * devuelve `null`: el selector solo edita hex; la muestra sí pinta cualquier
 * color CSS.
 */
export declare function parseHex(input: string): Rgba | null;
/**
 * `#rrggbb` en minúsculas, o `#rrggbbaa` con `alpha`. Con `alpha` el par del
 * alfa va siempre, también cuando es opaco (`ff`): el formato no cambia de
 * longitud según el valor.
 */
export declare function formatHex({ r, g, b, a }: Rgba, alpha: boolean): string;
export declare function rgbToHsv({ r, g, b, a }: Rgba): Hsva;
export declare function hsvToRgb({ h, s, v, a }: Hsva): Rgba;
export declare function hexToHsva(hex: string): Hsva | null;
export declare function hsvaToHex(hsva: Hsva, alpha: boolean): string;
/**
 * Normaliza un hex a la forma que emite el selector (`#rrggbb` o
 * `#rrggbbaa`, minúsculas), o `null` si no lo es. Sin `alpha`, la
 * transparencia de un `#rrggbbaa` se descarta.
 */
export declare function normalizeHex(input: string, alpha: boolean): string | null;
/**
 * Las paradas del degradado de tono, cada 60°: los seis colores puros y la
 * vuelta al rojo. Salen del propio modelo, no de una lista escrita a mano.
 */
export declare function hueStops(): string[];
