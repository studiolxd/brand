/**
 * El reparto de una magnitud en pasos de color, aparte del componente para
 * poder probarlo sin montar nada.
 */

/**
 * Los pasos que tiene la rampa de la matriz: **seis**, no los siete de la
 * rampa secuencial del sistema.
 *
 * El paso `sequential-400` se queda fuera a propósito. La cifra se pinta
 * DENTRO de la celda, así que cada relleno tiene que admitir una de las dos
 * tintas del sistema a 4,5:1, y el 400 sobre superficie oscura
 * (`sequential-400-on-dark`, #2978DE) no llega con ninguna: 4,34:1 con la
 * tinta clara y 3,86:1 con la prusia. Los otros seis pasos sí llegan en las
 * dos superficies. Inventar un color para tapar ese hueco sería ampliar la
 * paleta por un rol, que es justo lo que el sistema no hace.
 */
export const HEATMAP_RAMP_STEPS = 6;

/** El dominio de la matriz: de dónde a dónde va la magnitud, y en cuántos pasos. */
export interface HeatmapScale {
  min: number;
  max: number;
  /** Pasos visibles, de 2 a `HEATMAP_RAMP_STEPS`. */
  steps: number;
}

/**
 * El paso que le toca a un valor, de 1 a `scale.steps`. `null` es **sin dato**
 * —nadie midió esa casilla—, que no es lo mismo que el mínimo.
 *
 * El mínimo cae en el paso 1 y el máximo en el último; lo que se sale del
 * dominio se recorta contra él en vez de desbordar la rampa.
 */
export function heatmapStep(value: number | null | undefined, scale: HeatmapScale): number | null {
  if (value === null || value === undefined || !Number.isFinite(value)) return null;
  const steps = Math.max(2, Math.min(HEATMAP_RAMP_STEPS, Math.round(scale.steps)));
  if (scale.max <= scale.min) return steps;
  const acotado = Math.max(scale.min, Math.min(scale.max, value));
  const fraccion = (acotado - scale.min) / (scale.max - scale.min);
  return Math.min(steps, Math.floor(fraccion * steps) + 1);
}

/**
 * El peldaño de la rampa del sistema (1…6) que pinta el paso `step` de una
 * escala de `steps` pasos. Con menos pasos que peldaños, la escala se reparte
 * por la rampa entera: el primero siempre es el 1 y el último siempre es el 6,
 * para que dos matrices con distinto número de pasos se lean igual de lejos.
 */
export function heatmapRampIndex(step: number, steps: number): number {
  const total = Math.max(2, Math.min(HEATMAP_RAMP_STEPS, Math.round(steps)));
  const actual = Math.max(1, Math.min(total, Math.round(step)));
  return Math.round(((actual - 1) * (HEATMAP_RAMP_STEPS - 1)) / (total - 1)) + 1;
}
