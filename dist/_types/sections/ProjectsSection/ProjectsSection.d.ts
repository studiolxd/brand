import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectsSection.css';
interface ProjectsSectionProps {
    id?: string;
    /** Título de la sección. */
    title?: string;
    /** Lista de proyectos. */
    projects: Project[];
}
export declare function ProjectsSection({ id, title, projects }: ProjectsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
