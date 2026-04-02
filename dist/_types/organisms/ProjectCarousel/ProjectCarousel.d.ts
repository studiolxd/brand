import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectCarousel.css';
interface ProjectCarouselProps {
    projects: Project[];
    className?: string;
}
export declare function ProjectCarousel({ projects, className }: ProjectCarouselProps): import("react/jsx-runtime").JSX.Element;
export {};
