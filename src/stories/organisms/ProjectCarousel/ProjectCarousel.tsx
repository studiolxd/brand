import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
import { ProjectCard } from '../../molecules/ProjectCard/ProjectCard';
import type { Project } from '../../molecules/ProjectCard/ProjectCard';
import './ProjectCarousel.css';

interface ProjectCarouselProps {
  projects: Project[];
  /** Oculta el tag de categoría en cada ProjectCard. */
  hideTags?: boolean;
  className?: string;
}

export function ProjectCarousel({ projects, hideTags = false, className }: ProjectCarouselProps) {
  return (
    <Carousel
      options={{ align: 'center' }}
      className={['project-carousel', className].filter(Boolean).join(' ')}
    >
      {projects.map((project) => (
        <CarouselSlide key={project.id}>
          <ProjectCard project={project} hideTag={hideTags} />
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
