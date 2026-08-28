import { type ReactNode } from 'react';
import './Columns.css';
export type ColumnsCount = 2 | 3 | 4;
export type ColumnsRatio = '1:1' | '1:2' | '2:1';
export interface ColumnsProps extends React.ComponentPropsWithoutRef<'div'> {
    /** Número de columnas en escritorio (2–4). En móvil, una; con 3 o 4, dos en el tramo intermedio. */
    columns?: ColumnsCount;
    /** Reparto del ancho, solo con dos columnas: `1:1` (mitad y mitad), `1:2`, `2:1`. Con 3 o 4 se ignora. */
    ratio?: ColumnsRatio;
    /** Alineación vertical de las celdas: arriba, centradas o estiradas. */
    align?: 'start' | 'center' | 'stretch';
    /** Aire entre celdas: base o amplio. */
    gap?: 'md' | 'lg';
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
export declare function Columns({ columns, ratio, align, gap, stackOrder, children, className, ...rest }: ColumnsProps): import("react/jsx-runtime").JSX.Element;
