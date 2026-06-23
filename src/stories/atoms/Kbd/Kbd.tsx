import './Kbd.css';

export interface KbdProps {
  /** Tamaño de la tecla. */
  size?: 'sm' | 'md' | 'lg';
  /** Símbolo o etiqueta de la tecla (p. ej. `⌘`, `Ctrl`, `K`). */
  children: React.ReactNode;
}

/**
 * Representa una tecla del teclado mediante el elemento semántico `<kbd>`.
 * Para combinaciones (p. ej. `Ctrl + K`), componer varios `Kbd` con el
 * separador deseado entre ellos.
 */
export function Kbd({ size = 'md', children }: KbdProps) {
  const classes = [
    'kbd',
    size !== 'md' ? `kbd--${size}` : '',
  ].filter(Boolean).join(' ');

  return <kbd className={classes}>{children}</kbd>;
}
