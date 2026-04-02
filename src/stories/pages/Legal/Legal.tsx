import { Header } from '../../sections/Header/Header';
import type { NavItem } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../atoms/Accordion/Accordion';
import { DEFAULT_NAV_ITEMS, DEFAULT_FEATURED_LINK } from '../../constants/navigation';
import './Legal.css';

interface LegalSection {
  title: string;
  content: React.ReactNode;
}

interface LegalProps {
  /** Título de la página legal. */
  title: string;
  /** Secciones de contenido en acordeón. */
  sections: LegalSection[];
  /** Elementos de navegación. */
  navItems?: NavItem[];
  /** Enlace destacado del header. */
  featuredLink?: NavItem;
}

export function Legal({ title, sections, navItems = DEFAULT_NAV_ITEMS, featuredLink = DEFAULT_FEATURED_LINK }: LegalProps) {
  return (
    <div className="legal-page">
      <Header
        navItems={navItems}
        featuredLink={featuredLink}
        actions={
          <Button href="https://academy.studiolxd.com" variant="primary" external>
            Entra a la academia
          </Button>
        }
      />
      <main id="main-content" className="legal-page__main">
        <div className="legal-page__header">
          <Heading level={1} size={10} weight="black">{title}</Heading>
        </div>
        <Accordion type="single" className="legal-accordion">
          {sections.map((section, index) => (
            <AccordionItem key={section.title} value={`section-${index}`}>
              <AccordionTrigger className="legal-accordion__trigger" chevronSize="lg">
                <span className="legal-accordion__counter">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="legal-accordion__title">{section.title}</span>
              </AccordionTrigger>
              <AccordionContent className="legal-accordion__body">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  );
}
