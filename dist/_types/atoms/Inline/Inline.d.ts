import type { ReactNode } from 'react';
import './Inline.css';
export interface InlineProps {
    /** Aire entre piezas: compacto, base o amplio. */
    gap?: 'sm' | 'md' | 'lg';
    /**
     * Alineación vertical de las piezas dentro de la fila. Por defecto al
     * centro: un botón y un enlace de distinta altura comparten eje.
     */
    align?: 'start' | 'center' | 'end';
    /**
     * Reparto horizontal de las piezas: al principio de la fila (por defecto),
     * centradas, al final —una fila de acciones alineada a la derecha— o
     * separadas a los extremos.
     */
    justify?: 'start' | 'center' | 'end' | 'between';
    children: ReactNode;
    className?: string;
}
/**
 * Pone piezas en fila con aire por token y envoltura: cuando no caben en una
 * línea pasan a la siguiente. Es el hermano horizontal de `Stack` —los
 * botones de un `Hero`, el botón y el enlace de una `ErrorPage`—, sin fondo
 * ni semántica: `div.inline`.
 *
 * `justify` reparte las piezas a lo ancho: es lo que evita que una fila de
 * acciones alineada a la derecha necesite un `className` de producto.
 */
export declare function Inline({ gap, align, justify, children, className }: InlineProps): import("react/jsx-runtime").JSX.Element;
