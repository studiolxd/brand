import { forwardRef } from 'react';
import './Paragraph.css';

export interface ParagraphProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'children'> {
  /** Tamaño: `small` para notas y metadatos, `large` para entradillas. */
  size?: 'small' | 'default' | 'large';
  children: React.ReactNode;
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph({
  size = 'default',
  className,
  children,
  ...rest
}, ref) {
  return (
    <p
      ref={ref}
      className={[
        'paragraph',
        size !== 'default' ? `paragraph--${size}` : '',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </p>
  );
});
