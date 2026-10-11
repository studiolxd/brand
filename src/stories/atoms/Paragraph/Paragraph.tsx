import { forwardRef } from 'react';
import './Paragraph.css';

/** Talla del párrafo: un peldaño por debajo del cuerpo (`sm`), el cuerpo (`md`) y uno por encima (`lg`). */
export type ParagraphSize = 'sm' | 'md' | 'lg';

export interface ParagraphProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'children'> {
  /**
   * Talla: `sm` para notas y metadatos, `lg` para entradillas. Default `md`
   * (el cuerpo).
   */
  size?: ParagraphSize;
  children: React.ReactNode;
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph({
  size = 'md',
  className,
  children,
  ...rest
}, ref) {
  return (
    <p
      ref={ref}
      className={[
        'paragraph',
        size !== 'md' ? `paragraph--${size}` : '',
        className,
      ].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </p>
  );
});
