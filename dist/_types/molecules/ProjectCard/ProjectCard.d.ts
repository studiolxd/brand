import type { ReactNode } from 'react';
import { type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { type TagVariant } from '../../atoms/Tag/Tag';
import type { CardMedia } from '../Card/Card';
import './ProjectCard.css';
export type { TagVariant };
export interface ProjectCardTag {
    /** Clave de React. Sin ella se usa la etiqueta. */
    id?: string;
    label: string;
    variant?: TagVariant;
}
export interface ProjectCardProps {
    /** Título del proyecto. Es el enlace de la tarjeta. */
    title: ReactNode;
    /** Descripción breve. */
    description?: ReactNode;
    /** Imagen del proyecto. */
    media?: CardMedia;
    /** Etiquetas de categoría. */
    tags?: ProjectCardTag[];
    /** URL de destino. Pinta un `<a>` nativo. */
    href?: string;
    /**
     * Elemento sobre el que renderizar el enlace del título (el `Link` del
     * router de la aplicación). Manda sobre `href`, igual que en `Card`.
     */
    render?: React.ReactElement<Record<string, unknown>>;
    /** Nivel semántico del título. Por defecto `3`. */
    headingLevel?: HeadingLevel;
    /** Talla del título. Por defecto `5` (24px). */
    headingSize?: HeadingSize;
    /** Nombre accesible de la lista de etiquetas. Por defecto «Categorías». */
    tagsLabel?: string;
    className?: string;
    id?: string;
}
/**
 * Tarjeta de un proyecto para una portada de marketing: imagen, etiquetas de
 * categoría, título y una descripción breve.
 *
 * No es una `Card` con `href`: allí el bloque entero es un enlace, aquí hay
 * etiquetas y texto alrededor del enlace. El enlace es **el título**, y su
 * área pulsable se estira sobre toda la tarjeta con un pseudoelemento: se
 * puede pulsar en cualquier sitio, pero el teclado solo se para una vez y el
 * lector de pantalla anuncia el nombre del proyecto, no la tarjeta entera.
 */
export declare function ProjectCard({ title, description, media, tags, href, render, headingLevel, headingSize, tagsLabel, className, id, }: ProjectCardProps): import("react/jsx-runtime").JSX.Element;
