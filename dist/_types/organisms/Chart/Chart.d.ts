import { type ReactNode } from 'react';
import './Chart.css';
export type ChartType = 'line' | 'area' | 'bar' | 'scatter' | 'pie' | 'donut' | 'funnel' | 'treemap' | 'radial-bar' | 'radar';
export interface ChartSeries {
    /** Clave del valor dentro de cada fila de `data`. */
    key: string;
    /** Nombre que se lee en la leyenda, el bocadillo y la tabla. */
    label: string;
    /**
     * Color de la serie. Lo normal es una **referencia a token**
     * (`'var(--chart-series-3)'` o una custom property del producto): la interfaz
     * del sistema no tiene colores cableados.
     *
     * Admite además un **color literal** cuando el color es *dato*, no diseño: lo
     * que el autor de un contenido eligió desde la paleta de su tema. Ver
     * `colors` y la sección «Color por dato» de la documentación.
     *
     * Sin este dato, la serie toma la ranura que le corresponde por orden
     * (`--chart-series-1`…`8`).
     */
    color?: string;
}
export type ChartDatum = Record<string, string | number | null | undefined>;
/** Etiquetas directas de valor. Nunca hay una cifra en cada punto salvo que se pida. */
export type ChartValueLabels = 'none' | 'last' | 'extremes' | 'all';
export interface ChartProps extends Omit<React.ComponentPropsWithoutRef<'figure'>, 'title'> {
    /** Forma del gráfico. Por defecto `line`. */
    type?: ChartType;
    /** Filas de datos. Cada fila trae la posición X y un valor por serie. */
    data: ChartDatum[];
    /**
     * Series a pintar, en orden. El orden es el que asigna las ranuras de color:
     * la identidad sigue a la entidad, así que filtrar series no repinta a las
     * que quedan. A partir de la novena, la serie se pinta con el gris de «Otros».
     */
    series: ChartSeries[];
    /** Clave de la posición X (o de la categoría, en los gráficos de porción). */
    xKey: string;
    /**
     * **Color por dato**: paleta por posición, en colores literales. La entrada
     * `colors[i]` pinta la serie `i` —o, en los gráficos de porción, la categoría
     * `i`—, por encima de la ranura de token que le tocaría por orden y por
     * debajo del `color` propio de la serie.
     *
     * Es la vía para el caso en que el color **es dato**: el que eligió el autor
     * de un contenido desde la paleta de su tema. Para la interfaz del sistema,
     * las ranuras de token siguen siendo lo correcto.
     */
    colors?: string[];
    /** Barras verticales (columnas) u horizontales. Horizontal para categorías con nombre largo. */
    orientation?: 'vertical' | 'horizontal';
    /** Apila las series en vez de agruparlas. Solo `bar` y `area`. */
    stacked?: boolean;
    /**
     * Patrón de énfasis: la serie indicada (o, en `pie`/`donut`, la categoría)
     * mantiene su color y el resto pasa al gris de atenuación.
     */
    emphasis?: string;
    /** Alto del área de dibujo en px. La banda del eje X va aparte. Default 256. */
    height?: number;
    /**
     * Descripción del gráfico para lectores de pantalla. Obligatoria: el lienzo
     * es una imagen y la tabla equivalente va oculta debajo.
     */
    ariaLabel: string;
    /** Título visible del gráfico, en el `<figcaption>`. */
    title?: ReactNode;
    /** Texto al pie del gráfico, bajo la leyenda. */
    caption?: ReactNode;
    /** Formateo de valores. Default: `Intl.NumberFormat(locale)`. */
    formatValue?: (value: number, series?: ChartSeries) => string;
    /** Formateo de la posición X. Default: el valor tal cual. */
    formatX?: (value: string | number) => string;
    /** Número orientativo de marcas del eje de valores. Default 5. */
    yTicks?: number;
    /** Leyenda. Default: hay leyenda desde dos series (con una, el título ya la nombra). */
    legend?: boolean;
    /** Rejilla del eje de valores. Default `true`. */
    grid?: boolean;
    /** Bocadillo al pasar el puntero y al enfocar con el teclado. Default `true`. */
    tooltip?: boolean;
    /** Etiquetas directas de valor. Default: `last` en línea y área, `none` en el resto. */
    valueLabels?: ChartValueLabels;
    /** Locale con el que se formatean los números. Default `'es-ES'`. */
    locale?: string;
    /** Título de la tabla equivalente oculta. Default: «Datos del gráfico» (castellano). */
    tableCaption?: string;
    /**
     * Frase que describe el gráfico para quien lo enfoca. Default: «Los datos
     * completos están en la tabla que sigue; flechas para recorrer el gráfico.»
     * (castellano).
     */
    tableHint?: string;
    /** Encabezado de la primera columna de la tabla. Default: «Categoría» (castellano). */
    categoryLabel?: string;
    /** Encabezado de la columna de valores en `pie`/`donut`. Default: «Valor» (castellano). */
    valueLabel?: string;
    /** Encabezado de la columna de porcentaje en `pie`/`donut`. Default: «Porcentaje» (castellano). */
    shareLabel?: string;
    /** Texto cuando no hay datos. Default: «Sin datos que mostrar» (castellano). */
    emptyMessage?: string;
    /** Se añade DESPUÉS de las clases propias del componente. */
    className?: string;
}
/**
 * Gráfico de datos: línea, área, barras (verticales u horizontales, agrupadas o
 * apiladas), tarta y donut. Dibuja SVG a pelo —sin librería de gráficos— para
 * que todo el color y toda la tipografía salgan de tokens, el marcado sea BEM y
 * el primer render valga en servidor.
 *
 * Cada gráfico trae su **tabla equivalente oculta**: el bocadillo enriquece, no
 * franquea, y ningún valor depende de pasar el puntero.
 */
export declare const Chart: import("react").ForwardRefExoticComponent<ChartProps & import("react").RefAttributes<HTMLElement>>;
