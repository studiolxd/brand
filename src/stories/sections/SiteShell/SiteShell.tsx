import type { ReactNode } from 'react';
import './SiteShell.css';

export interface SiteShellProps {
  /** La cabecera del sitio (`SiteHeader` o la del producto). */
  header?: ReactNode;
  /** El pie (`LegalFooter`, el del producto…). Siempre queda abajo del todo. */
  footer?: ReactNode;
  /** El contenido de la página: normalmente el `main` con `id="main-content"`. */
  children?: ReactNode;
  className?: string;
}

/**
 * El marco de una página pública: cabecera, contenido y pie en columna,
 * con la altura mínima de la pantalla. Con poco contenido, el pie se queda
 * pegado al borde inferior; con mucho, la página entera hace scroll. Es la
 * norma del sistema: ningún producto necesita CSS propio para sujetar el pie.
 * Para las aplicaciones con barra y sidebar está `AppShell`.
 */
export function SiteShell({ header, footer, children, className }: SiteShellProps) {
  const classes = ['site-shell', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {header}
      <div className="site-shell__main">{children}</div>
      {footer}
    </div>
  );
}
