import { Button } from '../../atoms/Button/Button';
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
  /** Oculta el tag de categoría. */
  hideTag?: boolean;
  className?: string;
}

export function ProjectCard({ project, hideTag = false, className }: ProjectCardProps) {
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

  const image = (
    <div className="project-card__image-wrap">
      <img
        src={photo}
        alt={photoAlt ?? title}
        className="project-card__image"
      />
    </div>
  );

  return (
    <div className={['project-card', className].filter(Boolean).join(' ')}>
      {!hideTag && <Tag variant={tagVariant}>{category}</Tag>}
      <Heading level={3} className="project-card__title">
        {href ? <a href={href} className="project-card__title-link">{title}</a> : title}
      </Heading>
      {href ? (
        <a href={href} className="project-card__image-link" tabIndex={-1} aria-hidden="true">
          {image}
        </a>
      ) : (
        image
      )}
      <p className="project-card__description">{description}</p>
      <div className="project-card__cta">
        <Button href={href}>{ctaLabel}</Button>
      </div>
    </div>
  );
}
