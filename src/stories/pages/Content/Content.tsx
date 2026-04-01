import { Header } from '../../sections/Header/Header';
import type { NavItem } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Heading } from '../../atoms/Heading/Heading';
import { Button } from '../../atoms/Button/Button';
import { DEFAULT_NAV_ITEMS, DEFAULT_FEATURED_LINK } from '../../constants/navigation';
import './Content.css';

interface ContentProps {
  /** Título de la página. */
  title: string;
  /** Descripción introductoria junto al título. */
  description?: string;
  /** Contenido principal de la página. */
  children?: React.ReactNode;
  /** Elementos de navegación. */
  navItems?: NavItem[];
  /** Enlace destacado del header. */
  featuredLink?: NavItem;
}

export function Content({ title, description, children, navItems = DEFAULT_NAV_ITEMS, featuredLink = DEFAULT_FEATURED_LINK }: ContentProps) {
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
        <div className="content-page__body">
          <div className="content-page__header">
            <Heading level={1} size={8} weight="bold">{title}</Heading>
            {description && <p className="content-page__description">{description}</p>}
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
