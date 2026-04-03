import './ProjectCard.css';
export type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
export interface Project {
    /** Identificador único. */
    id: string;
    /** Categoría — se muestra como tag. */
    category: string;
    /** Variante de color del tag. */
    tagVariant?: TagVariant;
    /** URL de la imagen. */
    photo: string;
    /** Texto alternativo de la imagen. */
    photoAlt?: string;
    /** Título del proyecto. */
    title: string;
    /** Descripción breve. */
    description: string;
    /** URL de destino del proyecto. */
    href?: string;
    /** Texto del CTA. Por defecto "Leer más". */
    ctaLabel?: string;
}
interface ProjectCardProps {
    project: Project;
    /** Oculta el tag de categoría. */
    hideTag?: boolean;
    className?: string;
}
export declare function ProjectCard({ project, hideTag, className }: ProjectCardProps): import("react/jsx-runtime").JSX.Element;
export {};
