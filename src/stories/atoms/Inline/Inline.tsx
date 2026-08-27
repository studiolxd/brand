import type { ReactNode } from 'react';
import './Inline.css';

export interface InlineProps {
  /** Aire entre piezas: compacto, base o amplio. */
  gap?: 'sm' | 'md' | 'lg';
  /**
   * Alineación vertical de las piezas dentro de la fila. Por defecto al
   * centro: un botón y un enlace de distinta altura comparten eje.
   */
  align?: 'start' | 'center' | 'end';
  children: ReactNode;
  className?: string;
}

/**
 * Pone piezas en fila con aire por token y envoltura: cuando no caben en una
 * línea pasan a la siguiente. Es el hermano horizontal de `Stack` —los
 * botones de un `Hero`, el botón y el enlace de una `ErrorPage`—, sin fondo
 * ni semántica: `div.inline`.
 */
export function Inline({ gap = 'md', align = 'center', children, className }: InlineProps) {
  const classes = ['inline', gap !== 'md' ? `inline--gap-${gap}` : '', align !== 'center' ? `inline--align-${align}` : '', className].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
