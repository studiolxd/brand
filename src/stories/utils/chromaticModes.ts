/**
 * Modos de Chromatic: cada story del catálogo se fotografía dos veces, en claro
 * y en oscuro. El oscuro no se documenta con stories duplicadas —se borraron
 * las 110 que solo repetían el mismo componente sobre fondo oscuro—; lo cubre
 * este par de modos, que mueve el global `backgrounds` (el mismo del switcher
 * de fondos, con las claves `light`/`dark` declaradas en `preview.tsx`) y con
 * él el decorator `withSurface`.
 */
export const MODOS_CHROMATIC = {
  claro: { backgrounds: { value: 'light' } },
  oscuro: { backgrounds: { value: 'dark' } },
} as const;

/**
 * Para lo que no tiene superficie oscura y no la va a tener: el correo (medio
 * sin CSS ni `prefers-color-scheme`, ver § «El correo» en `CLAUDE.md`) y la
 * tarjeta social, que es una imagen de colores fijos. Va en el `meta`:
 * `parameters: { chromatic: SOLO_CLARO }`.
 */
export const SOLO_CLARO = { modes: { oscuro: { disable: true } } } as const;

/**
 * Para la story que YA fuerza el oscuro por su cuenta (`parameters.surface` o
 * una prop `surface`/`theme`): en el modo claro saldría exactamente la misma
 * captura, así que se apaga y queda una sola. Va en la story:
 * `parameters: { surface: 'dark', chromatic: SOLO_OSCURO }`.
 */
export const SOLO_OSCURO = { modes: { claro: { disable: true } } } as const;
