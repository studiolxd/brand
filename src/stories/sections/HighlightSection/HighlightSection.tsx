import './HighlightSection.css';

interface HighlightSectionProps {
  id?: string;
  /** Texto destacado. */
  text: string;
  /** Alineación horizontal del bloque de texto. */
  align?: 'left' | 'center' | 'right';
  /** Alineación del texto dentro del bloque. */
  textAlign?: 'left' | 'center' | 'right';
  /** Clases adicionales para el container. */
  className?: string;
}

export function HighlightSection({ id, text, align = 'left', textAlign, className }: HighlightSectionProps) {
  return (
    <section id={id} className="highlight-section">
      <div className={['highlight-section__container', align !== 'left' ? `highlight-section__container--${align}` : '', textAlign ? `highlight-section__container--text-${textAlign}` : '', className].filter(Boolean).join(' ')}>
        <p>{text}</p>
      </div>
    </section>
  );
}
