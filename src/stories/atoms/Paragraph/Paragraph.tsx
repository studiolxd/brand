import './Paragraph.css';

interface ParagraphProps {
  /** Tamaño del texto del párrafo. */
  size?: 'small' | 'default' | 'large';
  /** Clases adicionales. */
  className?: string;
  children: React.ReactNode;
}

export function Paragraph({ size = 'default', className, children }: ParagraphProps) {
  return (
    <p
      className={[
        'paragraph',
        size !== 'default' ? `paragraph--${size}` : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </p>
  );
}
