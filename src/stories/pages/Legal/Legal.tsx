import { useState } from 'react';
import { Header } from '../../sections/Header/Header';
import { Footer } from '../../sections/Footer/Footer';
import { Chevron } from '../../atoms/Chevron/Chevron';
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
}

const navItems = [
  { label: 'Inicio', href: '#' },
  { label: 'Soluciones', href: '#' },
  { label: 'Proyectos', href: '#' },
  { label: 'Academia', href: '#' },
  { label: 'Contacto', href: '#' },
];

const featuredLink = { label: 'Cursos online', href: '#' };

function LegalAccordionItem({ section, index }: { section: LegalSection; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = `legal-section-${index}`;

  return (
    <div className={`legal-accordion__item${isOpen ? ' legal-accordion__item--open' : ''}`}>
      <button
        className="legal-accordion__header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <span className="legal-accordion__counter">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="legal-accordion__title">{section.title}</h2>
        <Chevron className="legal-accordion__chevron" size="lg" />
      </button>
      <div className="legal-accordion__body" id={id} role="region">
        <div className="legal-accordion__body-inner">
          {section.content}
        </div>
      </div>
    </div>
  );
}

export function Legal({ title, sections }: LegalProps) {
  return (
    <div className="legal-page">
      <Header
        navItems={navItems}
        featuredLink={featuredLink}
        actions={
          <a href="https://academy.studiolxd.com" className="btn btn-primary">
            Entra a la academia
          </a>
        }
      />
      <main className="legal-page__main">
        <div className="legal-page__header">
          <h1 className="legal-page__title">{title}</h1>
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
