import type { NavItem } from '../../sections/Header/Header';
import './Article.css';
type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
interface ArticleSection {
    title: string;
    body: string;
}
interface ArticleProps {
    /** Categoría del artículo. */
    category: string;
    /** Variante de color del tag de categoría. */
    tagVariant?: TagVariant;
    /** URL de la imagen destacada. */
    photo: string;
    /** Texto alternativo de la imagen. */
    photoAlt?: string;
    /** Título del artículo. */
    title: string;
    /** Párrafo introductorio. */
    description: string;
    /** Secciones de contenido. */
    sections: ArticleSection[];
    /** Elementos de navegación. */
    navItems?: NavItem[];
    /** Enlace destacado del header. */
    featuredLink?: NavItem;
}
export declare function Article({ category, tagVariant, photo, photoAlt, title, description, sections, navItems, featuredLink, }: ArticleProps): import("react/jsx-runtime").JSX.Element;
export {};
