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
    /**
     * Rótulo del control anterior. Sin `prevTitle` es el `aria-label` del
     * chevron; con `prevTitle` es el rótulo **visible** que lo encabeza.
     * Default: "Anterior"
     */
    prevLabel?: string;
    /** Rótulo del control siguiente. Mismo contrato que `prevLabel`. Default: "Siguiente" */
    nextLabel?: string;
    /**
     * Título visible del destino anterior (el de la página, el capítulo…). Con
     * él el control deja de ser un chevron pelado: se lee «Anterior ·
     * Instalación», y ese texto visible es ya su nombre accesible.
     */
    prevTitle?: string;
    /** Título visible del destino siguiente. Mismo contrato que `prevTitle`. */
    nextTitle?: string;
    /**
     * Contenido central: texto de periodo, semana, mes, etc. Opcional — el
     * paginador de documentación no tiene centro, solo los dos destinos.
     */
    label?: ReactNode;
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
export declare function PrevNextNav({ prevHref, nextHref, prevOnClick, nextOnClick, prevLabel, nextLabel, prevTitle, nextTitle, label, labelId, linkComponent, size, }: PrevNextNavProps): import("react/jsx-runtime").JSX.Element;
