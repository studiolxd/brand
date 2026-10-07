import type { AnchorHTMLAttributes, ComponentType, MouseEvent, ReactNode } from 'react';
import './PrevNextNav.css';
/**
 * Lo que recibe `renderLink`: los atributos del `<a>` que pintaría el
 * control. Hay que reenviarlos **todos** al enlace del router.
 */
export type PrevNextNavRenderLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    className: string;
    children: ReactNode;
};
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
     * **Sin default**: sin él, sale de `prevNextNav.previous` del
     * `BrandMessagesProvider`.
     */
    prevLabel?: string;
    /**
     * Rótulo del control siguiente. Mismo contrato que `prevLabel`. **Sin
     * default**: sale de `prevNextNav.next`.
     */
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
     * Pinta los controles con `href` con el `Link` del router:
     * `renderLink={(props) => <Link {...props} />}`. Recibe todos los atributos
     * del `<a>` (`href`, `className`, `aria-label`, `onClick`, `children`) y
     * tiene que reenviarlos todos. Sin él, un `<a>`.
     */
    renderLink?: (props: PrevNextNavRenderLinkProps) => ReactNode;
    /**
     * @deprecated Usa `renderLink` (`renderLink={(props) => <Link {...props} />}`).
     * Sigue funcionando y avisa en desarrollo; se retira en la v52.
     */
    linkComponent?: ComponentType<any>;
    /** Variante de densidad. Default: "md" */
    size?: 'sm' | 'md';
    /** Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye). */
    className?: string;
}
/**
 * Los dos textos del par, y los dos son **cromo**: «anterior» y «siguiente»
 * dicen la dirección, no el destino. El destino —`prevTitle`, `nextTitle`, el
 * rótulo del medio— es **contenido** y lo escribe la página.
 */
export interface PrevNextNavMessages {
    /** Rótulo del control anterior. */
    previous: string;
    /** Rótulo del control siguiente. */
    next: string;
}
export declare function PrevNextNav({ prevHref, nextHref, prevOnClick, nextOnClick, prevLabel, nextLabel, prevTitle, nextTitle, label, labelId, renderLink: renderLinkProp, linkComponent, size, className, }: PrevNextNavProps): import("react/jsx-runtime").JSX.Element;
