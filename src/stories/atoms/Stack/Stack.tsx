import type { ReactNode } from 'react';
import './Stack.css';

export interface StackProps extends React.ComponentPropsWithoutRef<'div'> {
  /** Aire entre piezas: base o amplio. */
  gap?: 'md' | 'lg';
  /**
   * Orden en móvil (por debajo de `md`): el del JSX o el inverso. En
   * escritorio manda siempre el JSX. Invierte solo el orden visual —no el del
   * DOM ni el de tabulación—, así que solo para piezas donde eso no importa
   * (un enlace de vuelta sobre la cabecera).
   */
  mobileOrder?: 'normal' | 'reverse';
  children: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Apila piezas con aire por token. Es el envoltorio explícito de «estas piezas
 * van juntas» (una cabecera y su enlace de vuelta en una celda de `Columns`),
 * sin fondo ni semántica: `div.stack`.
 *
 * `{...rest}` (`role`, `aria-*`, `id`, `data-*`…) se reenvía al `<div>`: una
 * pila puede ser el grupo con nombre accesible que pide un formulario sin
 * tener que envolverla en un elemento nativo aparte.
 */
export function Stack({ gap = 'md', mobileOrder = 'normal', children, className, ...rest }: StackProps) {
  const classes = ['stack', gap !== 'md' ? `stack--gap-${gap}` : '', mobileOrder === 'reverse' ? 'stack--mobile-reverse' : '', className].filter(Boolean).join(' ');
  return <div className={classes} {...rest}>{children}</div>;
}
