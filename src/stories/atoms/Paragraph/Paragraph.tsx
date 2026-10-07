import { forwardRef } from 'react';
import { warnDeprecated } from '../../constants/env';
import './Paragraph.css';

/** Talla del párrafo: un peldaño por debajo del cuerpo (`sm`), el cuerpo (`md`) y uno por encima (`lg`). */
export type ParagraphSize = 'sm' | 'md' | 'lg';

/**
 * @deprecated Usa `ParagraphSize`: `small` es `sm`, `default` es `md` y
 * `large` es `lg` desde la v51 (las tallas del sistema se escriben `xs`…`4xl`,
 * nunca con palabras). Se retira en la v52.
 */
export type ParagraphSizeDeprecated = 'small' | 'default' | 'large';

const SIZE_ALIAS: Record<ParagraphSizeDeprecated, ParagraphSize> = { small: 'sm', default: 'md', large: 'lg' };

export interface ParagraphProps extends Omit<React.ComponentPropsWithoutRef<'p'>, 'children'> {
  /**
   * Talla: `sm` para notas y metadatos, `lg` para entradillas. Default `md`
   * (el cuerpo). `small`, `default` y `large` son alias obsoletos que siguen
   * funcionando, con un aviso en desarrollo, hasta la v52.
   */
  size?: ParagraphSize | ParagraphSizeDeprecated;
  children: React.ReactNode;
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(function Paragraph({
  size: sizeProp = 'md',
  className,
  children,
  ...rest
}, ref) {
  let size = sizeProp as ParagraphSize;
  if (sizeProp in SIZE_ALIAS) {
    size = SIZE_ALIAS[sizeProp as ParagraphSizeDeprecated];
    warnDeprecated('Paragraph', `size="${sizeProp}"`, `\`size="${size}"\``);
  }
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
