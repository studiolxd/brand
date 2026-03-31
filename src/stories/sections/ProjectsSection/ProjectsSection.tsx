import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
import { Heading } from '../../atoms/Heading/Heading';
import { Tag } from '../../atoms/Tag/Tag';
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
  id?: string;
  /** Título de la sección. */
  title?: string;
  /** Lista de proyectos. */
  projects: Project[];
}

export function ProjectsSection({ id, title = 'Proyectos', projects }: ProjectsSectionProps) {
  return (
    <section id={id} className="projects-section">
      <Heading level={2} weight="semibold">{title}</Heading>
      <Carousel
        options={{ align: 'center' }}
      >
        {projects.map((project) => (
          <CarouselSlide key={project.id}>
            <a className="project-card" href={project.href} aria-label={project.title}>
              <Tag variant={project.tagVariant ?? 'default'}>{project.category}</Tag>
              <Heading level={3} className="project-card__title">{project.title}</Heading>
              <div className="project-card__image-wrap">
                <img
                  src={project.photo}
                  alt={project.photoAlt ?? project.title}
                  className="project-card__image"
                />
              </div>
              <p className="project-card__description">{project.description}</p>
              <span className="project-card__cta button button--primary" aria-hidden="true">Leer más</span>
            </a>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
