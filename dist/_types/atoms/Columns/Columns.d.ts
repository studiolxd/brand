import { type ReactNode } from 'react';
import './Columns.css';
export type ColumnsCount = 2 | 3 | 4;
export type ColumnsRatio = '1:1' | '1:2' | '2:1';
export interface ColumnsProps extends React.ComponentPropsWithoutRef<'div'> {
    /** Número de columnas en escritorio (2–4). En móvil, una; con 3 o 4, dos en el tramo intermedio. */
    columns?: ColumnsCount;
    /** Reparto del ancho, solo con dos columnas: `1:1` (mitad y mitad), `1:2`, `2:1`. Con 3 o 4 se ignora. */
    ratio?: ColumnsRatio;
    /** Alineación vertical de las celdas: arriba, centradas o estiradas. Con `stretch`, el hijo directo de cada celda ocupa toda su altura. */
    align?: 'start' | 'center' | 'stretch';
    /** Aire entre celdas: base o amplio. */
    gap?: 'md' | 'lg';
    /**
     * Solo con 3 o 4 columnas. Con el valor por defecto (`true`), en el tramo
     * intermedio (`md`) la rejilla pasa a dos columnas antes de llegar a las
     * definitivas en `lg`. Con `false` se salta ese paso: de una columna en
     * móvil a las definitivas directamente en `lg` (p. ej. tres packs de
     * crédito que nunca deben verse como "dos y uno suelto").
     */
    intermediate?: boolean;
    /** En móvil, orden de apilado: el del JSX o el inverso (la última celda arriba). */
    stackOrder?: 'normal' | 'reverse';
    /** Las celdas, en orden. Cada hija es una columna; la semántica (`header`, `aside`…) la pone la hija. */
    children: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Maquetación en columnas: N celdas iguales en escritorio, apiladas en móvil,
 * con el aire por tokens. No sabe qué hay dentro ni jerarquiza: si una
 * columna es complementaria, lo dice su contenido (`aside`, `header`), no el
 * molde. Sin fondo, borde ni padding — eso es del `Container` de fuera o de
 * las tarjetas de dentro.
 *
 * `{...rest}` (`role`, `aria-*`, `id`, `data-*`…) se reenvía al `<div>` de la
 * rejilla, no a las celdas.
 */
export declare function Columns({ columns, ratio, align, gap, intermediate, stackOrder, children, className, ...rest }: ColumnsProps): import("react/jsx-runtime").JSX.Element;
