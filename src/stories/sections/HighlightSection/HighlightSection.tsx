import { Highlight } from '../../atoms/Highlight/Highlight';
import './HighlightSection.css';

type HighlightWeight = 'thin' | 'extralight' | 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
type HighlightSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface HighlightSectionProps {
  id?: string;
  /** Texto destacado. */
  text: string;
  /** Tamaño tipográfico. Por defecto 8 (40px = h3). */
  size?: HighlightSize;
  /** Peso tipográfico. Por defecto usa el token del componente (medium). */
  weight?: HighlightWeight;
  /** Alineación horizontal del bloque de texto. */
  align?: 'left' | 'center' | 'right';
  /** Alineación del texto dentro del bloque. */
  textAlign?: 'left' | 'center' | 'right';
  /** Clases adicionales para el container. */
  className?: string;
}

export function HighlightSection({ id, text, size = 8, weight, align = 'left', textAlign, className }: HighlightSectionProps) {
  return (
    <section id={id} className="highlight-section">
      <Highlight text={text} size={size} weight={weight} align={align} textAlign={textAlign} className={className} />
    </section>
  );
}
