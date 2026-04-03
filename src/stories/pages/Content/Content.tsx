import { Header } from '../../sections/Header/Header';
import type { NavItem } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Heading } from '../../atoms/Heading/Heading';
import { Button } from '../../atoms/Button/Button';
import { ContactSection } from '../../sections/ContactSection/ContactSection';
import type { ComponentProps } from 'react';
import { DEFAULT_NAV_ITEMS, DEFAULT_FEATURED_LINK } from '../../constants/navigation';
import './Content.css';

type SectionColor = 'secondary' | 'tertiary' | 'quaternary' | 'quinary';

interface ContentSection {
  /** Título de la sección (columna coloreada). */
  title: string;
  /** Contenido de la columna secundaria. */
  content?: React.ReactNode;
  /** Color de fondo de la columna del título. */
  color?: SectionColor;
  /** Lado donde aparece el color: izquierda (título) o derecha (contenido). */
  colorSide?: 'left' | 'right';
}

interface ContentProps {
  /** Título de la página. */
  title: string;
  /** Descripción introductoria junto al título. */
  description?: string;
  /** Bloques de sección con dos columnas. */
  sections?: ContentSection[];
  /** Sección de contacto al final de la página. */
  contactSection?: ComponentProps<typeof ContactSection>;
  /** Elementos de navegación. */
  navItems?: NavItem[];
  /** Enlace destacado del header. */
  featuredLink?: NavItem;
}

export function Content({ title, description, sections, contactSection, navItems = DEFAULT_NAV_ITEMS, featuredLink = DEFAULT_FEATURED_LINK }: ContentProps) {
  return (
    <div className="content-page">
      <Header
        navItems={navItems}
        featuredLink={featuredLink}
        actions={
          <Button href="https://academy.studiolxd.com" variant="primary" external>
            Entra a la academia
          </Button>
        }
      />
      <main id="main-content" className="content-page__main">
        <div className="content-page__header">
          <Heading level={1} size={8} weight="semibold">{title}</Heading>
          {description && <p className="content-page__description">{description}</p>}
        </div>
        {sections?.map((section, i) => {
          const titleClass = [
            'content-page__section-title',
            section.color ? `content-page__section-title--${section.color}` : '',
          ].filter(Boolean).join(' ');
          const contentClass = 'content-page__section-content';
          const reversed = section.colorSide === 'right';
          return (
            <div key={i} className={['content-page__section', reversed ? 'content-page__section--reversed' : ''].filter(Boolean).join(' ')}>
              <div className={titleClass}>
                <Heading level={2} size={8} weight="semibold">{section.title}</Heading>
              </div>
              <div className={contentClass}>{section.content}</div>
            </div>
          );
        })}
        {contactSection && <ContactSection {...contactSection} />}
      </main>
      <Footer />
    </div>
  );
}
