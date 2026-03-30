import { Header } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Tag } from '../../atoms/Tag/Tag';
import './Project.css';

type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

interface ProjectSection {
  title: string;
  body: string;
}

interface ProjectProps {
  /** Categoría del proyecto. */
  category: string;
  /** Variante de color del tag de categoría. */
  tagVariant?: TagVariant;
  /** URL de la imagen destacada. */
  photo: string;
  /** Texto alternativo de la imagen. */
  photoAlt?: string;
  /** Título del proyecto. */
  title: string;
  /** Párrafo introductorio. */
  description: string;
  /** Secciones de contenido. */
  sections: ProjectSection[];
}

const navItems = [
  { label: 'Inicio', href: '#' },
  { label: 'Soluciones', href: '#' },
  { label: 'Proyectos', href: '#' },
  { label: 'Academia', href: '#' },
  { label: 'Contacto', href: '#' },
];

const featuredLink = { label: 'Cursos online', href: '#' };

export function Project({
  category,
  tagVariant = 'default',
  photo,
  photoAlt,
  title,
  description,
  sections,
}: ProjectProps) {
  return (
    <div className="project-page">
      <Header
        navItems={navItems}
        featuredLink={featuredLink}
        actions={
          <a href="https://academy.studiolxd.com" className="btn btn-primary">
            Entra a la academia
          </a>
        }
      />
      <main className="project-page__main">
        <div className="project-page__body">
          <article className="project-detail">
            <Tag variant={tagVariant}>{category}</Tag>
            <h1 className="project-detail__title">{title}</h1>
            <p className="project-detail__intro">{description}</p>
            <img
              src={photo}
              alt={photoAlt ?? title}
              className="project-detail__photo"
            />
            <div className="project-detail__content">
              {sections.map((section) => (
                <section key={section.title} className="project-detail__section">
                  <h2 className="project-detail__section-title">{section.title}</h2>
                  <p className="project-detail__section-body">{section.body}</p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
