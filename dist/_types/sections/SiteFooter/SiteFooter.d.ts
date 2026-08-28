import type { ReactNode } from 'react';
import { type ContainerWidth } from '../../atoms/Container/Container';
import { type HeadingLevel } from '../../atoms/Heading/Heading';
import './SiteFooter.css';
export interface SiteFooterLink {
    /** Clave de React. Sin ella se usa el `href`. */
    id?: string;
    label: string;
    href: string;
    /** Abre en otra pestaña (`target="_blank"` con su `rel`). */
    external?: boolean;
}
export interface SiteFooterColumn {
    /** Clave de React. Sin ella se usa el título. */
    id?: string;
    /** Título de la columna. Es también el nombre accesible de su `nav`. */
    title: string;
    links: SiteFooterLink[];
}
export type SiteFooterRenderLinkProps = {
    href: string;
    className: string;
    children: ReactNode;
    target?: string;
    rel?: string;
};
export interface SiteFooterProps {
    /** El logotipo. Por defecto el de Studio LXD a talla `lg`. */
    logo?: ReactNode;
    /** La frase bajo el logotipo. */
    tagline?: ReactNode;
    /** Columnas de enlaces. */
    columns?: SiteFooterColumn[];
    /** Enlace del router del producto. Debe reenviar todas las props. */
    renderLink?: (props: SiteFooterRenderLinkProps) => ReactNode;
    /**
     * Bloque libre a la derecha de las columnas: los datos de contacto, el
     * formulario de newsletter, las redes. Lo compone quien usa el pie con los
     * componentes del sistema; el pie solo le reserva el sitio.
     */
    aside?: ReactNode;
    /** Bloque legal bajo el pie, separado por una línea. Se espera un `LegalFooter`. */
    legal?: ReactNode;
    /** Nivel semántico del título de cada columna. Por defecto `2`. */
    columnTitleLevel?: HeadingLevel;
    /** Superficie del pie. Por defecto oscura: es el cierre de una página pública. */
    surface?: 'dark' | 'light';
    /** Ancho del contenido, como en `SiteHeader`. */
    width?: ContainerWidth;
    className?: string;
    id?: string;
}
/**
 * El pie de una página pública: la marca con su frase, las columnas de
 * enlaces, un bloque libre para el contacto o la newsletter y, debajo, el pie
 * legal. Fondo a sangre y contenido acotado por su `Container` interior, como
 * el resto de secciones, con su propio aire vertical
 * (`--site-footer-space-block-start/-end`, un peldaño menor en móvil): no se
 * envuelve en nada.
 *
 * Va sobre superficie oscura por defecto —es el cierre de la página— y no
 * pinta ningún color por su cuenta: el lienzo lo pone la superficie, así que
 * cambiar `surface` a `light` basta para que todo el pie voltee.
 *
 * Es el hermano mayor de `LegalFooter`, que sigue siendo el pie de las
 * aplicaciones de la suite: solo los enlaces legales y nada más.
 */
export declare function SiteFooter({ logo, tagline, columns, renderLink, aside, legal, columnTitleLevel, surface, width, className, id, }: SiteFooterProps): import("react/jsx-runtime").JSX.Element;
