import type { NavItem } from '../../sections/Header/Header';
import { ContactSection } from '../../sections/ContactSection/ContactSection';
import type { ComponentProps } from 'react';
import './Content.css';
type SectionColor = 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
interface ContentSection {
    /** Título de la sección (columna coloreada). */
    title: string;
    /** Contenido de la columna secundaria. */
    content?: React.ReactNode;
    /** Color de fondo de la columna del título. */
    color?: SectionColor;
    /** Lado donde aparece el color: izquierda (título) o derecha (contenido). */
    colorSide?: 'left' | 'right';
}
interface ContentProps {
    /** Título de la página. */
    title: string;
    /** Descripción introductoria junto al título. */
    description?: string;
    /** Bloques de sección con dos columnas. */
    sections?: ContentSection[];
    /** Sección de contacto al final de la página. */
    contactSection?: ComponentProps<typeof ContactSection>;
    /** Elementos de navegación. */
    navItems?: NavItem[];
    /** Enlace destacado del header. */
    featuredLink?: NavItem;
}
export declare function Content({ title, description, sections, contactSection, navItems, featuredLink }: ContentProps): import("react/jsx-runtime").JSX.Element;
export {};
