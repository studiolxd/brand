import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectGrid.css';
interface ProjectGridProps {
    /** Lista de proyectos. */
    projects: Project[];
    /** Oculta los filtros de tags. */
    hideTags?: boolean;
    /** Clase adicional. */
    className?: string;
}
export declare function ProjectGrid({ projects, hideTags, className }: ProjectGridProps): import("react/jsx-runtime").JSX.Element;
export {};
