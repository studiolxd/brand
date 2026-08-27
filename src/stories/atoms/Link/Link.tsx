import { forwardRef } from 'react';
import { useRender } from '@base-ui-components/react/use-render';
import { Icon, type IconName } from '../Icon/Icon';
import './Link.css';

export interface LinkProps extends React.ComponentPropsWithoutRef<'a'> {
  /** URL de destino. Con `render`, la lleva el elemento del router. */
  href?: string;
  children: React.ReactNode;
  /** Abre en nueva pestaña con `rel="noopener noreferrer"`. */
  external?: boolean;
  /**
   * Tono. `accent` (por defecto): el enlace de texto y de acción — prusia con
   * línea en claro, amarillo con línea en hover en oscuro. `ink`: el enlace
   * utilitario (legal, volver, ¿olvidaste la contraseña?) — tinta, línea en
   * reposo y ninguna en hover, en las dos superficies.
   */
  tone?: 'accent' | 'ink';
  /** Un icono junto al texto («← Volver», «Descargar ↓»). Decorativo: el texto ya lo dice. */
  icon?: IconName;
  /** Dónde va el icono: delante (`start`, por defecto) o detrás del texto. */
  iconPosition?: 'start' | 'end';
  /** Elemento sobre el que renderizar el enlace: el `Link` del router del producto (`render={<NextLink href="…" />}`), que recibe icono, clases y texto. */
  render?: React.ReactElement<Record<string, unknown>>;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * Enlace de texto. La cara la pone la base para cualquier `<a>`; el
 * componente aporta `external` con su `rel` seguro y reenvía `ref` y
 * atributos (`aria-*`, `data-*`, `download`…). Para el router del producto no
 * hace falta: un `<Link>` de Next.js ya es un `<a>` y hereda la misma cara.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, external = false, tone = 'accent', icon, iconPosition = 'start', render, className, ...rest },
  ref,
) {
  const classes = [tone === 'ink' ? 'link--ink' : '', icon ? 'link--with-icon' : '', className].filter(Boolean).join(' ') || undefined;
  const glyph = icon ? <Icon name={icon} size="sm" className="link__icon" /> : null;
  const content = (
    <>
      {iconPosition === 'start' && glyph}
      {children}
      {iconPosition === 'end' && glyph}
    </>
  );
  const rendered = useRender({
    render,
    ref,
    enabled: render !== undefined,
    props: { className: classes, ...(rest as Record<string, unknown>), children: content },
  });
  if (rendered) return rendered;
  return (
    <a
      ref={ref}
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
});
