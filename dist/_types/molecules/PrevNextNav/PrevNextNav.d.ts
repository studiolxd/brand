import type { ReactNode } from 'react';
import './PrevNextNav.css';
export interface PrevNextNavProps {
    /** href del enlace anterior. Mutuamente exclusivo con prevOnClick */
    prevHref?: string;
    /** href del enlace siguiente. Mutuamente exclusivo con nextOnClick */
    nextHref?: string;
    /** Handler del botón anterior. Mutuamente exclusivo con prevHref */
    prevOnClick?: () => void;
    /** Handler del botón siguiente. Mutuamente exclusivo con nextHref */
    nextOnClick?: () => void;
    /** aria-label del control anterior. Default: "Anterior" */
    prevLabel?: string;
    /** aria-label del control siguiente. Default: "Siguiente" */
    nextLabel?: string;
    /** Contenido central: texto de periodo, semana, mes, etc. */
    label: ReactNode;
    /** Variante de densidad. Default: "md" */
    size?: 'sm' | 'md';
}
export declare function PrevNextNav({ prevHref, nextHref, prevOnClick, nextOnClick, prevLabel, nextLabel, label, size, }: PrevNextNavProps): import("react/jsx-runtime").JSX.Element;
