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
export declare const HEATMAP_RAMP_STEPS = 6;
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
export declare function heatmapStep(value: number | null | undefined, scale: HeatmapScale): number | null;
/**
 * El peldaño de la rampa del sistema (1…6) que pinta el paso `step` de una
 * escala de `steps` pasos. Con menos pasos que peldaños, la escala se reparte
 * por la rampa entera: el primero siempre es el 1 y el último siempre es el 6,
 * para que dos matrices con distinto número de pasos se lean igual de lejos.
 */
export declare function heatmapRampIndex(step: number, steps: number): number;
/**
 * Los peldaños de la rampa divergente: tres por brazo y el neutro en medio.
 * El nombre es el del token (`heatmap.diverging-<peldaño>-bg`).
 */
export type HeatmapDivergingStep = 'warm-3' | 'warm-2' | 'warm-1' | 'neutral' | 'cool-1' | 'cool-2' | 'cool-3';
/** Intensidades por brazo de la rampa divergente. */
export declare const HEATMAP_DIVERGING_ARM_STEPS = 3;
/**
 * Qué brazo pinta lo que queda **por debajo** del centro. Por defecto,
 * `'warm-below'`: lo que se queda corto es cálido (cayena) y lo que sobra es
 * frío (prusia). `'warm-above'` lo da la vuelta, para magnitudes en las que
 * pasarse es lo que alarma (un retraso, un sobrecoste).
 */
export type HeatmapDivergingDirection = 'warm-below' | 'warm-above';
/** El dominio de la escala divergente: el centro y cuánto se aleja de él. */
export interface HeatmapDivergingScale {
    /** El valor que se lee como «nada»: la meta, el cero de una diferencia. */
    midpoint: number;
    /**
     * La distancia al centro que pinta el extremo de cada brazo. Los dos brazos
     * comparten radio, así que la misma distancia pinta la misma intensidad a
     * los dos lados.
     */
    radius: number;
    direction?: HeatmapDivergingDirection;
}
/**
 * El peldaño divergente que le toca a un valor. `null` es **sin dato**.
 *
 * El intervalo `[centro − radio, centro + radio]` se parte en **siete bandas
 * iguales**, una por peldaño, como la secuencial parte el suyo en tantas
 * bandas como pasos: la banda central —a menos de medio séptimo de diámetro
 * del centro— es el neutro, y cada brazo tiene tres bandas más. Lo que se sale
 * del radio se recorta contra el extremo. Con niveles enteros y un radio de 3
 * (una brecha de −3 a +3), cada nivel cae en su peldaño: 0 es el neutro, ±1
 * el primero de cada brazo y ±3 el extremo.
 */
export declare function heatmapDivergingStep(value: number | null | undefined, scale: HeatmapDivergingScale): HeatmapDivergingStep | null;
/**
 * Los siete peldaños en el orden en que se leen de izquierda a derecha, del
 * valor más bajo al más alto: el orden de la leyenda.
 */
export declare function heatmapDivergingLegend(direction?: HeatmapDivergingDirection): HeatmapDivergingStep[];
/**
 * El radio de la escala divergente. Los extremos que se pasen (`min`, `max`)
 * mandan: el radio es la mayor distancia de cualquiera de ellos al centro, y
 * así dos matrices del mismo panel se comparan. **Sin ninguno, sale de los
 * datos**: la mayor |valor − centro| de las casillas.
 */
export declare function heatmapDivergingRadius(midpoint: number, values: readonly (number | null)[], min?: number, max?: number): number;
