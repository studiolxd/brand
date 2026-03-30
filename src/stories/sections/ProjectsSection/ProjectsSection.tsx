import { Carousel, CarouselSlide } from '../../atoms/Carousel/Carousel';
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
  /** Título de la sección. */
  title?: string;
  /** Lista de proyectos. */
  projects: Project[];
}

export function ProjectsSection({ title = 'Proyectos', projects }: ProjectsSectionProps) {
  return (
    <section className="projects-section">
      <h2>{title}</h2>
      <Carousel
        options={{ align: 'center' }}
      >
        {projects.map((project) => (
          <CarouselSlide key={project.id}>
            <a className="project-card" href={project.href}>
              <Tag variant={project.tagVariant ?? 'default'}>{project.category}</Tag>
              <h3 className="project-card__title">{project.title}</h3>
              <div className="project-card__image-wrap">
                <img
                  src={project.photo}
                  alt={project.photoAlt ?? project.title}
                  className="project-card__image"
                />
              </div>
              <p className="project-card__description">{project.description}</p>
              <span className="project-card__cta btn btn-primary">Leer más</span>
            </a>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}
