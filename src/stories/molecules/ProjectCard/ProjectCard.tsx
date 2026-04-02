import { Heading } from '../../atoms/Heading/Heading';
import { Tag } from '../../atoms/Tag/Tag';
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
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const {
    category,
    tagVariant = 'default',
    photo,
    photoAlt,
    title,
    description,
    href,
    ctaLabel = 'Leer más',
  } = project;

  return (
    <a
      className={['project-card', className].filter(Boolean).join(' ')}
      href={href}
      aria-label={title}
    >
      <Tag variant={tagVariant}>{category}</Tag>
      <Heading level={3} className="project-card__title">{title}</Heading>
      <div className="project-card__image-wrap">
        <img
          src={photo}
          alt={photoAlt ?? title}
          className="project-card__image"
        />
      </div>
      <p className="project-card__description">{description}</p>
      <span className="project-card__cta button button--primary" aria-hidden="true">
        {ctaLabel}
      </span>
    </a>
  );
}
