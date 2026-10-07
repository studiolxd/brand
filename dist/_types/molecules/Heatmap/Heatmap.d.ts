import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { type HeatmapDivergingDirection } from './heatmapScale';
import './Heatmap.css';
export type { HeatmapScale, HeatmapDivergingDirection, HeatmapDivergingStep, } from './heatmapScale';
/** La rampa de la matriz: una magnitud (`sequential`) o una distancia a un centro (`diverging`). */
export type HeatmapScaleKind = 'sequential' | 'diverging';
/**
 * Los textos de la matriz, y todos son **cromo**: cómo se llama la
 * tabla, cómo se dice que una casilla no tiene dato y cómo se llama la
 * leyenda. Los nombres de filas y columnas son contenido, y los escribe quien
 * pasa los datos.
 */
export interface HeatmapMessages {
    /** Nombre accesible de la matriz cuando la pantalla no le da uno propio. */
    label: string;
    /** Cómo se dice que una casilla no tiene dato — nadie la midió. */
    empty: string;
    /** Nombre accesible de la leyenda de la rampa. */
    scale: string;
    /**
     * Rótulo del centro en la leyenda de la escala divergente, con el valor ya
     * formateado («Centro: 0»). **Opcional** en el tipo para que un catálogo
     * anterior siga compilando; solo se lee con `scale="diverging"` y leyenda,
     * y sin él ni `midpointLabel` sale el respaldo castellano, como cualquier
     * clave ausente.
     */
    midpoint?: (value: string) => string;
}
/** Una fila: una persona, un puesto. */
export interface HeatmapRow {
    id: string;
    /** Cómo se llama la fila. Admite un nodo: un enlace a la ficha, por ejemplo. */
    label: ReactNode;
}
/** Una columna: una competencia, un mes. */
export interface HeatmapColumn {
    key: string;
    /** Cómo se llama la columna. */
    label: ReactNode;
    /**
     * Grupo al que pertenece (la categoría de la competencia). Las columnas
     * consecutivas con el mismo grupo se agrupan bajo una cabecera común; el
     * orden de las columnas lo decide quien las pasa, no la matriz.
     */
    group?: string;
}
/** Una casilla. Lo que no venga en la lista es una casilla **sin dato**. */
export interface HeatmapCell {
    rowId: string;
    columnKey: string;
    /** La magnitud. `null` es sin dato, que no es lo mismo que el mínimo. */
    value: number | null;
}
export interface HeatmapProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    rows: HeatmapRow[];
    columns: HeatmapColumn[];
    /** Las casillas con dato. Las que falten se pintan sin dato. */
    cells: HeatmapCell[];
    /**
     * La rampa. `'sequential'` (default) pinta una magnitud, de menos a más;
     * `'diverging'` pinta la distancia a `midpoint`, con un brazo cálido y uno
     * frío de tres intensidades y el neutro en el centro.
     */
    scale?: HeatmapScaleKind;
    /**
     * Extremo bajo del dominio. En la secuencial, default 0. En la divergente
     * no tiene default: si se pasa (él o `max`), el radio de los brazos es la
     * mayor distancia de los extremos pasados al centro.
     */
    min?: number;
    /**
     * Extremo alto del dominio. **Sin él sale del mayor valor de `cells`**, que
     * sirve para explorar pero hace que dos matrices del mismo panel no se
     * puedan comparar: en cuanto haya dos, se pasa. En la divergente, sin `min`
     * ni `max` el radio sale de la mayor |valor − centro| de las casillas.
     */
    max?: number;
    /** Pasos de la rampa secuencial, de 2 a 6. Default 5. La divergente siempre tiene siete. */
    steps?: number;
    /** El centro de la escala divergente: el valor que se lee como «nada». Default 0. */
    midpoint?: number;
    /**
     * Qué brazo pinta lo que queda por debajo del centro. Default
     * `'warm-below'`: lo que se queda corto es cálido y lo que sobra, frío.
     * `'warm-above'` lo invierte, para magnitudes en las que pasarse es lo que
     * alarma.
     */
    divergingDirection?: HeatmapDivergingDirection;
    /** Encabezado de la columna de filas («Persona», «Puesto»). */
    rowHeader?: ReactNode;
    /** Pinta la cifra dentro de la celda. Default `true`. Con `false` sigue leyéndose. */
    showValues?: boolean;
    /** Cómo se escribe una magnitud. Default: la cifra tal cual, con `Intl`. */
    formatValue?: (value: number) => string;
    /** Locale del formato por defecto. Default `'es-ES'`. */
    locale?: string;
    /** Enseña la leyenda de la rampa. Default `true`. */
    showLegend?: boolean;
    /** Rótulo del extremo bajo de la leyenda. Default: el mínimo formateado. */
    minLabel?: ReactNode;
    /** Rótulo del extremo alto de la leyenda. Default: el máximo formateado. */
    maxLabel?: ReactNode;
    /**
     * Rótulo del centro en la leyenda divergente. **Sin él**, sale de
     * `heatmap.midpoint` del catálogo con el centro formateado. Solo se lee con
     * `scale="diverging"` y leyenda.
     */
    midpointLabel?: ReactNode;
    /**
     * Nombre accesible de la matriz. **Sin él**, sale de `heatmap.label` del
     * `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Cómo se dice que una casilla no tiene dato. **Sin él**, sale de
     * `heatmap.empty`.
     */
    emptyLabel?: string;
    /**
     * Nombre accesible de la leyenda. **Sin él**, sale de `heatmap.scale`. Solo
     * se lee con `showLegend`.
     */
    scaleLabel?: string;
}
/**
 * La matriz de valores con escala de color: competencias por persona,
 * cobertura por puesto.
 *
 * **La cifra va dentro de la celda**, así que el color no es nunca la única
 * señal: quien no distingue un azul de otro lee el número, y quien usa un
 * lector de pantalla oye el nombre de la fila, el de la columna y el valor,
 * porque la tabla tiene encabezados de verdad en los dos ejes.
 *
 * No calcula nada: recibe las casillas y el dominio (`min`/`max`) y reparte.
 * Lo que no venga en `cells` es una casilla **sin dato**, que se pinta rayada
 * y no como el mínimo.
 */
export declare const Heatmap: import("react").ForwardRefExoticComponent<HeatmapProps & import("react").RefAttributes<HTMLDivElement>>;
