import type { NavItem } from '../../sections/Header/Header';
import './Legal.css';
interface LegalSection {
    title: string;
    content: React.ReactNode;
}
interface LegalProps {
    /** Título de la página legal. */
    title: string;
    /** Secciones de contenido en acordeón. */
    sections: LegalSection[];
    /** Elementos de navegación. */
    navItems?: NavItem[];
    /** Enlace destacado del header. */
    featuredLink?: NavItem;
}
export declare function Legal({ title, sections, navItems, featuredLink }: LegalProps): import("react/jsx-runtime").JSX.Element;
export {};
