import './LoadingRegion.css';
export interface LoadingRegionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
    /**
     * Lo que se espera, con puntos suspensivos («Cargando bancos…»). Se anuncia,
     * no se ve. **Sin default**: sin él, sale de `spinner.label` del
     * `BrandMessagesProvider`. No se lee cuando `announce` es `false`.
     */
    label?: string;
    /**
     * `false` cuando la espera ya la anuncia una región viva que existe antes y
     * después de cargar: la región queda solo a la vista (`aria-hidden`), para
     * no anunciarla dos veces.
     */
    announce?: boolean;
    /** Los esqueletos: `SkeletonText`, `SkeletonList`, `SkeletonTable`, `SkeletonGrid` o `Skeleton` sueltos. */
    children: React.ReactNode;
}
/**
 * La espera de un contenido cuya forma se conoce: reserva su sitio con
 * esqueletos y la página no salta al llegar. El `Skeleton` es decorativo; quien
 * anuncia es esta región, con `role="status"`, `aria-busy` y el texto de la
 * espera oculto a la vista. Apila sus hijos con aire entre bloques.
 */
export declare function LoadingRegion({ label, announce, children, className, ...rest }: LoadingRegionProps): import("react/jsx-runtime").JSX.Element;
export interface SkeletonTextProps {
    /** Líneas del párrafo; la última sale más corta. */
    lines?: number;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/** Un bloque de texto —un párrafo, una lista de definiciones— que aún no llegó. Decorativo. */
export declare function SkeletonText({ lines, className }: SkeletonTextProps): import("react/jsx-runtime").JSX.Element;
export interface SkeletonListProps {
    /** Filas de la lista. */
    rows?: number;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/** Una lista que aún no llegó: una barra por fila, del alto de un control. Decorativo. */
export declare function SkeletonList({ rows, className }: SkeletonListProps): import("react/jsx-runtime").JSX.Element;
export interface SkeletonTableProps {
    /** Filas de cuerpo, sin contar la cabecera. */
    rows?: number;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Una tabla que aún no llegó: la cabecera y sus filas. No calca el diseño —no
 * hace falta—, solo ocupa un sitio parecido. Decorativo.
 */
export declare function SkeletonTable({ rows, className }: SkeletonTableProps): import("react/jsx-runtime").JSX.Element;
export interface SkeletonGridProps {
    /** Columnas de la rejilla. */
    columns?: 2 | 3 | 4;
    /** Filas de la rejilla: se pintan `columns × rows` celdas. */
    rows?: number;
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/** Una rejilla de tarjetas o miniaturas que aún no llegó. Decorativo. */
export declare function SkeletonGrid({ columns, rows, className }: SkeletonGridProps): import("react/jsx-runtime").JSX.Element;
