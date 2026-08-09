import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectCarousel.css';
interface ProjectCarouselProps {
    projects: Project[];
    /** Oculta el tag de categoría en cada ProjectCard. */
    hideTags?: boolean;
    className?: string;
}
export declare function ProjectCarousel({ projects, hideTags, className }: ProjectCarouselProps): import("react/jsx-runtime").JSX.Element;
export {};
