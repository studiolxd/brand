import { forwardRef } from 'react';
import './Separator.css';

export interface SeparatorProps extends React.ComponentPropsWithoutRef<'hr'> {
  /** Eje de la línea. Default: `'horizontal'`. */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Línea puramente visual: no aporta significado al esquema del documento y
   * se retira del árbol de accesibilidad (`role="none"`). Ponlo en `false`
   * cuando la línea separe de verdad dos grupos de contenido y quieras que un
   * lector de pantalla lo anuncie. Default: `true`.
   */
  decorative?: boolean;
  /** Aire a ambos lados de la línea. Default: `'md'`. */
  spacing?: 'sm' | 'md' | 'lg';
}

/**
 * La línea de separación del sistema: un `<hr>` con el grosor, el color y el
 * aire de los tokens `separator.*`. Es la misma línea que ya pintaban por su
 * cuenta `Menu`, `UserMenu`, `OrgSwitcher`, `Sidebar` y `Select`; esos
 * componentes siguen renderizando la suya (se la pide su motor de Base UI),
 * pero sus tokens cuelgan ahora de estos.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(function Separator({
  orientation = 'horizontal',
  decorative = true,
  spacing = 'md',
  className,
  ...rest
}, ref) {
  const classes = [
    'separator',
    orientation === 'vertical' ? 'separator--vertical' : '',
    spacing !== 'md' ? `separator--${spacing}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  // `<hr>` ya tiene rol `separator` implícito: solo hay que decir la
  // orientación cuando no es la de por defecto, o retirarlo si es decorativa.
  const semantics = decorative
    ? { role: 'none' as const }
    : orientation === 'vertical'
      ? { 'aria-orientation': 'vertical' as const }
      : {};

  return <hr ref={ref} className={classes} {...semantics} {...rest} />;
});
