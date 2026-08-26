import { forwardRef } from 'react';
import './Container.css';

/** Medida del contenido interior. `full` = sin límite (la banda entera). */
export type ContainerWidth = 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
/** Aire vertical de la banda. `none` = sin padding vertical. */
export type ContainerSpace = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Ancho máximo del contenido interior, tomado de la escala de breakpoints.
   * Por defecto `'xl'` (1280px), el ancho de las páginas públicas; `'full'`
   * para que el contenido llegue tan lejos como la banda.
   *
   * No es una medida de lectura: para texto largo, el ancho lo fija el
   * componente de prosa según su tipografía, no la maqueta.
   */
  width?: ContainerWidth;
  /** Aire vertical de la banda. Por defecto `'none'`: lo pone quien la usa. */
  space?: ContainerSpace;
  /** Sin aire lateral — para contenido que debe tocar el borde de la pantalla. */
  flush?: boolean;
  /**
   * Banda sobre superficie oscura: pinta el lienzo oscuro y voltea los tokens
   * de todo lo que contiene (texto, botones, cabecera). Fondo y color van
   * siempre emparejados; no hace falta poner el fondo aparte.
   */
  surface?: 'dark';
  /** Elemento a renderizar. Por defecto `'div'`; usa `'section'`, `'header'`… según el papel. */
  as?: 'div' | 'section' | 'header' | 'footer' | 'main' | 'article' | 'aside' | 'nav';
  /** Clases para el elemento interior, el que lleva el ancho máximo. */
  innerClassName?: string;
}

/**
 * Banda a sangre con el contenido acotado y centrado.
 *
 * El elemento exterior ocupa el 100% del ancho: es donde se pinta el fondo, que
 * así llega de lado a lado de la pantalla. El interior limita la medida del
 * contenido. Es la pieza de las partes públicas — la web, el hub sin sesión —
 * donde una sección de color debe sangrar mientras el texto se queda en su
 * columna.
 */
export const Container = forwardRef<HTMLElement, ContainerProps>(function Container({
  width = 'xl',
  space = 'none',
  flush = false,
  surface,
  as: Tag = 'div',
  className,
  innerClassName,
  children,
  ...rest
}, ref) {
  const outer = [
    'container',
    space !== 'none' && `container--space-${space}`,
    flush && 'container--flush',
    surface === 'dark' && 'surface-dark container--surface',
    className,
  ].filter(Boolean).join(' ');

  const inner = [
    'container__inner',
    width !== 'full' && `container__inner--${width}`,
    innerClassName,
  ].filter(Boolean).join(' ');

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={outer} {...rest}>
      <div className={inner}>{children}</div>
    </Tag>
  );
});
