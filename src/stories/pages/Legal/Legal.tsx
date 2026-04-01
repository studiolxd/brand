import { useState } from 'react';
import { Header } from '../../sections/Header/Header';
import type { NavItem } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Chevron } from '../../atoms/Chevron/Chevron';
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

function LegalAccordionItem({ section, index }: { section: LegalSection; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = `legal-section-${index}`;

  return (
    <div className={`legal-accordion__item${isOpen ? ' legal-accordion__item--open' : ''}`}>
      <Heading level={2} className="legal-accordion__heading">
        <button
          className="legal-accordion__header"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={id}
        >
          <span className="legal-accordion__counter">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="legal-accordion__title">{section.title}</span>
          <Chevron className="legal-accordion__chevron" size="lg" />
        </button>
      </Heading>
      <div className="legal-accordion__body" id={id} role="region">
        <div className="legal-accordion__body-inner">
          {section.content}
        </div>
      </div>
    </div>
  );
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
          <Heading level={1} size={10} weight="bold">{title}</Heading>
        </div>
        <div className="legal-accordion">
          {sections.map((section, index) => (
            <LegalAccordionItem key={section.title} section={section} index={index} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
