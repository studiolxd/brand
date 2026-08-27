import type { ComponentType, MouseEvent, ReactNode } from 'react';
import './PrevNextNav.css';
export interface PrevNextNavProps {
    /** href del enlace anterior. Mutuamente exclusivo con prevOnClick */
    prevHref?: string;
    /** href del enlace siguiente. Mutuamente exclusivo con nextOnClick */
    nextHref?: string;
    /**
     * Handler del control anterior. Con `prevHref` puesto se dispara **además**
     * del enlace: es la puerta para la navegación SPA (`preventDefault()` en el
     * handler y ruta por el router).
     */
    prevOnClick?: (event: MouseEvent<HTMLElement>) => void;
    /** Handler del control siguiente. Mismo contrato que `prevOnClick`. */
    nextOnClick?: (event: MouseEvent<HTMLElement>) => void;
    /** aria-label del control anterior. Default: "Anterior" */
    prevLabel?: string;
    /** aria-label del control siguiente. Default: "Siguiente" */
    nextLabel?: string;
    /** Contenido central: texto de periodo, semana, mes, etc. */
    label: ReactNode;
    /**
     * id del label central, para que otro elemento pueda tomarlo como nombre
     * accesible (`aria-labelledby`).
     */
    labelId?: string;
    /**
     * Componente `Link` del router para los controles con `href`. Default: `"a"`.
     * Recibe `href` y el resto de props tal cual.
     */
    linkComponent?: ComponentType<any>;
    /** Variante de densidad. Default: "md" */
    size?: 'sm' | 'md';
}
export declare function PrevNextNav({ prevHref, nextHref, prevOnClick, nextOnClick, prevLabel, nextLabel, label, labelId, linkComponent, size, }: PrevNextNavProps): import("react/jsx-runtime").JSX.Element;
