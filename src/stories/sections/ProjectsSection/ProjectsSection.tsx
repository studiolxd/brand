import { Heading } from '../../atoms/Heading/Heading';
import { ProjectCarousel } from '../../organisms/ProjectCarousel/ProjectCarousel';
import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  id?: string;
  /** Título de la sección. */
  title?: string;
  /** Lista de proyectos. */
  projects: Project[];
}

export function ProjectsSection({ id, title = 'Proyectos', projects }: ProjectsSectionProps) {
  return (
    <section id={id} className="projects-section">
      <Heading level={2} weight="medium">{title}</Heading>
      <ProjectCarousel projects={projects} />
    </section>
  );
}
