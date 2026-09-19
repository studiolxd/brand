import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './PlanningGrid.css';
/**
 * Los textos de la rejilla. Todo es **cromo**: cómo se llama la tabla, cómo se
 * nombra el campo de cada cruce y cómo se llaman las tres filas del pie. Los
 * nombres de filas y columnas son contenido y los escribe quien los pasa; las
 * horas son formato y salen de `locale`.
 */
export interface PlanningGridMessages {
    /** Nombre accesible de la rejilla cuando la pantalla no le da uno propio. */
    label: string;
    /** Nombre accesible del campo de un cruce, a partir de los dos ejes. */
    cellLabel: (row: string, column: string) => string;
    /** Etiqueta de la columna de totales de fila. */
    rowTotal: string;
    /** Etiqueta de la fila de totales de columna. */
    columnTotal: string;
    /** Etiqueta de la fila de horas disponibles. */
    capacity: string;
    /** Etiqueta de la fila de resto (disponible − asignado). */
    remaining: string;
    /** Lo que se lee tras un resto negativo: hay más horas asignadas que disponibles. */
    over: string;
}
/** Una fila: un proyecto, una persona. Lo que se planifica. */
export interface PlanningGridRow {
    id: string;
    /** El nombre, **en texto plano**: con él se nombra el campo de cada cruce. */
    name: string;
    /** Cómo se pinta el nombre. Sin ella, el propio `name`. Admite un enlace. */
    label?: ReactNode;
    /** La fila entera no se edita. */
    readOnly?: boolean;
}
/** Una columna: una semana, un día, una persona. Contra qué se planifica. */
export interface PlanningGridColumn {
    key: string;
    /** El nombre, **en texto plano**: con él se nombra el campo de cada cruce. */
    name: string;
    /** Cómo se pinta el nombre. Sin ella, el propio `name`. */
    label?: ReactNode;
    /** Segunda línea del encabezado: el rango de fechas de la semana, la fecha del día. */
    sublabel?: ReactNode;
    /** Horas disponibles de la columna. Sin ella, la columna no tiene tope. */
    capacity?: number;
    /** La columna entera no se edita: una semana pasada, un día no laborable. */
    readOnly?: boolean;
    /** La columna en curso: se recuadra. */
    current?: boolean;
}
/** Un cruce con horas. Lo que no venga en la lista vale cero. */
export interface PlanningGridCell {
    rowId: string;
    columnKey: string;
    /** Las horas. `null` es lo mismo que cero a efectos de suma, y se pinta vacío. */
    value: number | null;
    /** Este cruce en concreto no se edita. */
    readOnly?: boolean;
    /** El cambio está en vuelo: la celda se atenúa. */
    pending?: boolean;
    /** Lo que falló al guardar este cruce. Pone el campo en error y se anuncia. */
    error?: string;
}
export interface PlanningGridProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    rows: PlanningGridRow[];
    columns: PlanningGridColumn[];
    /** Los cruces con horas. Los que falten valen cero. */
    cells: PlanningGridCell[];
    /**
     * Se llama al **confirmar** un cruce —al salir del campo o con Intro—, no en
     * cada tecla: la rejilla guarda contra un servidor, y una petición por
     * pulsación no es una rejilla, es una tormenta.
     */
    onCellChange?: (rowId: string, columnKey: string, value: number) => void;
    /** La rejilla entera se mira, no se edita. Sin `onCellChange` ya lo está. */
    readOnly?: boolean;
    /** Encabezado de la columna de filas («Proyecto», «Persona»). */
    rowHeader?: ReactNode;
    /** Columna de totales por fila, al final. Default `true`. */
    showRowTotals?: boolean;
    /** Fila de totales por columna, al pie. Default `true`. */
    showColumnTotals?: boolean;
    /**
     * Fila de horas disponibles al pie. Default `false`, y solo sale si alguna
     * columna declara `capacity`: repetir el tope en cada columna solo hace
     * falta cuando cambia de una a otra.
     */
    showCapacity?: boolean;
    /**
     * Fila de resto (disponible − asignado) al pie. Default `true`, y solo sale
     * si alguna columna declara `capacity`.
     */
    showRemaining?: boolean;
    /** Tope de horas de un cruce. Default 999. */
    max?: number;
    /** Locale del formato de horas. Default `'es-ES'`. */
    locale?: string;
    /** Cómo se escriben unas horas. Default: la cifra con `Intl` y una `h`. */
    formatHours?: (hours: number) => string;
    /** Talla de los campos. Default `sm`: son celdas de una rejilla. */
    size?: 'sm' | 'md' | 'lg';
    /** Nombre accesible de la rejilla. Sin él, sale de `planningGrid.label`. */
    label?: string;
    /** Nombre accesible del campo de un cruce. Sin él, sale de `planningGrid.cellLabel`. */
    cellLabel?: (row: string, column: string) => string;
}
/**
 * La rejilla editable de horas: fila × columna —persona por semana, proyecto
 * por día—, con los totales de cada eje y la disponibilidad de cada columna.
 *
 * **No guarda ni valida contra nada.** Llama a `onCellChange` al confirmar un
 * cruce y espera que le vuelvan a pasar las celdas; el estado en vuelo y el
 * error de guardado viajan **en la propia celda** (`pending`, `error`), que es
 * lo que permite que dos cruces estén en vuelo a la vez sin que la rejilla
 * tenga que llevar la cuenta.
 *
 * Los totales sí los suma ella: son la suma de lo que tiene delante, y no hay
 * dos formas de hacerla.
 */
export declare const PlanningGrid: import("react").ForwardRefExoticComponent<PlanningGridProps & import("react").RefAttributes<HTMLDivElement>>;
