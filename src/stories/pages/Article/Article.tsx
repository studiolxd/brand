import { Header } from '../../sections/Header/Header';
import type { NavItem } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Tag } from '../../atoms/Tag/Tag';
import { DEFAULT_NAV_ITEMS, DEFAULT_FEATURED_LINK } from '../../constants/navigation';
import './Article.css';

type TagVariant = 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

interface ArticleSection {
  title: string;
  body: string;
}

interface ArticleProps {
  /** Categoría del artículo. */
  category: string;
  /** Variante de color del tag de categoría. */
  tagVariant?: TagVariant;
  /** URL de la imagen destacada. */
  photo: string;
  /** Texto alternativo de la imagen. */
  photoAlt?: string;
  /** Título del artículo. */
  title: string;
  /** Párrafo introductorio. */
  description: string;
  /** Secciones de contenido. */
  sections: ArticleSection[];
  /** Elementos de navegación. */
  navItems?: NavItem[];
  /** Enlace destacado del header. */
  featuredLink?: NavItem;
}

export function Article({
  category,
  tagVariant = 'default',
  photo,
  photoAlt,
  title,
  description,
  sections,
  navItems = DEFAULT_NAV_ITEMS,
  featuredLink = DEFAULT_FEATURED_LINK,
}: ArticleProps) {
  return (
    <div className="article-page">
      <Header
        navItems={navItems}
        featuredLink={featuredLink}
        actions={
          <Button href="https://academy.studiolxd.com" variant="primary" external>
            Entra a la academia
          </Button>
        }
      />
      <main id="main-content" className="article-page__main">
        <div className="article-page__body">
          <article className="article-detail">
            <Tag variant={tagVariant}>{category}</Tag>
            <Heading level={1} size={8} className="article-detail__title">{title}</Heading>
            <p className="article-detail__intro">{description}</p>
            <img
              src={photo}
              alt={photoAlt ?? title}
              className="article-detail__photo"
              width={1200}
              height={800}
            />
            <div className="article-detail__content">
              {sections.map((section) => (
                <section key={section.title} className="article-detail__section">
                  <Heading level={2} size={7} className="article-detail__section-title">{section.title}</Heading>
                  <p className="article-detail__section-body">{section.body}</p>
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
