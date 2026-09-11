/**
 * «Hoy» congelado para el catálogo: un domingo de un mes de 31 días que empieza
 * en domingo (marzo de 2026), para que la rejilla de un calendario salga
 * completa y sin huecos raros en las stories que enseñan «el mes actual».
 *
 * `.storybook/preview.tsx` fija `Date` a este instante con `mockdate` para todo
 * el navegador de Storybook (local, `test:stories` y Chromatic); las stories
 * que antes calculaban sobre `new Date()` lo hacen ahora sobre esta constante,
 * para que se lean sin sorpresas y no dependan implícitamente del mock global.
 */
export declare const STORY_TODAY: Date;
