import type { NavItem } from '../../sections/Header/Header';
import './Project.css';
type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
interface ProjectSection {
    title: string;
    body: string;
}
interface ProjectProps {
    /** Categoría del proyecto. */
    category: string;
    /** Variante de color del tag de categoría. */
    tagVariant?: TagVariant;
    /** URL de la imagen destacada. */
    photo: string;
    /** Texto alternativo de la imagen. */
    photoAlt?: string;
    /** Título del proyecto. */
    title: string;
    /** Párrafo introductorio. */
    description: string;
    /** Secciones de contenido. */
    sections: ProjectSection[];
    /** Elementos de navegación. */
    navItems?: NavItem[];
    /** Enlace destacado del header. */
    featuredLink?: NavItem;
}
export declare function Project({ category, tagVariant, photo, photoAlt, title, description, sections, navItems, featuredLink, }: ProjectProps): import("react/jsx-runtime").JSX.Element;
export {};
