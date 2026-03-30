import './Paragraph.css';

interface ParagraphProps {
  /** Tamaño del texto del párrafo. */
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
}

export function Paragraph({ size = 'default', children }: ParagraphProps) {
  return (
    <p
      className={[
        'paragraph',
        size !== 'default' ? `paragraph--${size}` : '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </p>
  );
}
