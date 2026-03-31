import { Highlight } from '../../atoms/Highlight/Highlight';
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
      <Highlight text={text} align={align} textAlign={textAlign} className={className} />
    </section>
  );
}
