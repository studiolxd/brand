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

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Lee un hexadecimal de 3, 4, 6 u 8 dígitos, con o sin `#`, en mayúsculas o
 * minúsculas. Cualquier otra cosa —un nombre CSS, `rgb()`, `transparent`—
 * devuelve `null`: el selector solo edita hex; la muestra sí pinta cualquier
 * color CSS.
 */
export function parseHex(input: string): Rgba | null {
  const raw = input.trim().replace(/^#/, '');
  if (!/^[0-9a-f]+$/i.test(raw)) return null;
  let digits: string;
  if (raw.length === 3 || raw.length === 4) {
    digits = raw.split('').map((d) => d + d).join('');
  } else if (raw.length === 6 || raw.length === 8) {
    digits = raw;
  } else {
    return null;
  }
  const channel = (index: number) => parseInt(digits.slice(index * 2, index * 2 + 2), 16);
  return {
    r: channel(0),
    g: channel(1),
    b: channel(2),
    a: digits.length === 8 ? channel(3) / 255 : 1,
  };
}

const toByte = (value: number) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0');

/**
 * `#rrggbb` en minúsculas, o `#rrggbbaa` con `alpha`. Con `alpha` el par del
 * alfa va siempre, también cuando es opaco (`ff`): el formato no cambia de
 * longitud según el valor.
 */
export function formatHex({ r, g, b, a }: Rgba, alpha: boolean): string {
  const base = `#${toByte(r)}${toByte(g)}${toByte(b)}`;
  return alpha ? `${base}${toByte(clamp(a, 0, 1) * 255)}` : base;
}

export function rgbToHsv({ r, g, b, a }: Rgba): Hsva {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === red) h = ((green - blue) / delta) % 6;
    else if (max === green) h = (blue - red) / delta + 2;
    else h = (red - green) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return {
    h,
    s: max === 0 ? 0 : (delta / max) * 100,
    v: max * 100,
    a,
  };
}

export function hsvToRgb({ h, s, v, a }: Hsva): Rgba {
  const hue = ((h % 360) + 360) % 360;
  const sat = clamp(s, 0, 100) / 100;
  const val = clamp(v, 0, 100) / 100;
  const chroma = val * sat;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = val - chroma;
  let rgb: [number, number, number];
  if (hue < 60) rgb = [chroma, x, 0];
  else if (hue < 120) rgb = [x, chroma, 0];
  else if (hue < 180) rgb = [0, chroma, x];
  else if (hue < 240) rgb = [0, x, chroma];
  else if (hue < 300) rgb = [x, 0, chroma];
  else rgb = [chroma, 0, x];
  return {
    r: (rgb[0] + m) * 255,
    g: (rgb[1] + m) * 255,
    b: (rgb[2] + m) * 255,
    a: clamp(a, 0, 1),
  };
}

export function hexToHsva(hex: string): Hsva | null {
  const rgba = parseHex(hex);
  return rgba ? rgbToHsv(rgba) : null;
}

export function hsvaToHex(hsva: Hsva, alpha: boolean): string {
  return formatHex(hsvToRgb(hsva), alpha);
}

/**
 * Normaliza un hex a la forma que emite el selector (`#rrggbb` o
 * `#rrggbbaa`, minúsculas), o `null` si no lo es. Sin `alpha`, la
 * transparencia de un `#rrggbbaa` se descarta.
 */
export function normalizeHex(input: string, alpha: boolean): string | null {
  const rgba = parseHex(input);
  return rgba ? formatHex(rgba, alpha) : null;
}

/**
 * Las paradas del degradado de tono, cada 60°: los seis colores puros y la
 * vuelta al rojo. Salen del propio modelo, no de una lista escrita a mano.
 */
export function hueStops(): string[] {
  return [0, 60, 120, 180, 240, 300, 360].map((h) => hsvaToHex({ h, s: 100, v: 100, a: 1 }, false));
}
