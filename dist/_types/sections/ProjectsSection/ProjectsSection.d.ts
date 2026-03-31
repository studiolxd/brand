import './ProjectsSection.css';
type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
interface Project {
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
}
interface ProjectsSectionProps {
    /** Título de la sección. */
    title?: string;
    /** Lista de proyectos. */
    projects: Project[];
}
export declare function ProjectsSection({ title, projects }: ProjectsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
