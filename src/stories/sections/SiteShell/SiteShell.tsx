import { forwardRef, type ReactNode } from 'react';
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
/**
 * Reenvía el `ref` al nodo raíz (`.site-shell`): un `Modal`/`Sheet` abierto
 * desde dentro necesita apuntar su `container` aquí para heredar los tokens
 * de la superficie pública — el portal por defecto monta en `document.body`,
 * que no es descendiente de `.site-shell` (a diferencia del tema oscuro, que
 * se activa en `<html>` y sí llega a cualquier portal sin configuración).
 */
export const SiteShell = forwardRef<HTMLDivElement, SiteShellProps>(function SiteShell(
  { header, footer, children, className },
  ref,
) {
  const classes = ['site-shell', className].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={classes}>
      {header}
      <div className="site-shell__main">{children}</div>
      {footer}
    </div>
  );
});
