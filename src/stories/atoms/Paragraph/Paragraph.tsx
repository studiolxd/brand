import './Paragraph.css';

export interface ParagraphProps {
  /** Tamaño: `small` para notas y metadatos, `large` para entradillas. */
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
