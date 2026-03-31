import './Highlight.css';

interface HighlightProps {
  /** Texto destacado. */
  text: string;
  /** Alineación horizontal del bloque. */
  align?: 'left' | 'center' | 'right';
  /** Alineación del texto dentro del bloque. */
  textAlign?: 'left' | 'center' | 'right';
  /** Clases adicionales. */
  className?: string;
}

export function Highlight({ text, align = 'left', textAlign, className }: HighlightProps) {
  return (
    <div className={[
      'highlight',
      align !== 'left' ? `highlight--${align}` : '',
      textAlign ? `highlight--text-${textAlign}` : '',
      className,
    ].filter(Boolean).join(' ')}>
      <p>{text}</p>
    </div>
  );
}
