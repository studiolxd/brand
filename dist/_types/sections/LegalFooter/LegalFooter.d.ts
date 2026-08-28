import type { ReactNode } from 'react';
import { type ContainerWidth } from '../../atoms/Container/Container';
import './LegalFooter.css';
export interface LegalFooterLink {
    id: string;
    label: string;
    href: string;
}
export type LegalFooterRenderLinkProps = {
    href: string;
    className: string;
    children: ReactNode;
};
export interface LegalFooterProps {
    /** Nombre accesible del `nav`. */
    label?: string;
    /** Título opcional sobre los enlaces. */
    title?: string;
    links: LegalFooterLink[];
    /** Enlace del router del producto. Debe reenviar todas las props. */
    renderLink?: (props: LegalFooterRenderLinkProps) => ReactNode;
    /** Ancho del contenido, como en `SiteHeader`. */
    width?: ContainerWidth;
    /** Pie sobre superficie oscura. */
    surface?: 'dark';
    className?: string;
}
/**
 * El pie legal: los enlaces a aviso legal, privacidad, cookies y condiciones,
 * y nada más. Se monta a sangre, con su propio aire vertical
 * (`--legal-footer-padding-block`) y el contenido acotado por su `Container`
 * interior. Es el pie de las aplicaciones de la suite; la web tiene su pie
 * propio con más cosas.
 */
export declare function LegalFooter({ label, title, links, renderLink, width, surface, className, }: LegalFooterProps): import("react/jsx-runtime").JSX.Element;
