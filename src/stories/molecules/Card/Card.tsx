import { forwardRef } from 'react';
import { useRender } from '@base-ui/react/use-render';
import './Card.css';
import { Arrow } from '../../atoms/Arrow/Arrow';
import { Heading, type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { Paragraph, type ParagraphProps } from '../../atoms/Paragraph/Paragraph';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';

export type CardColor = 'primary' | 'outline' | 'accent-1' | 'accent-2' | 'support-1' | 'support-2';

/**
 * Maqueta de la tarjeta. `default` es la de siempre: una columna de texto.
 * `square` y `split` son las dos tarjetas de marketing —la cuadrada con la
 * imagen arriba y la partida con el panel de color al lado de la foto—, que
 * antes eran dos componentes aparte y ahora son una variante de la misma
 * pieza: el contrato (enlace, título, descripción, CTA accesible, color) ya
 * era idéntico; lo único que cambiaba era dónde va la imagen.
 */
export type CardVariant = 'default' | 'square' | 'split';

export interface CardMedia {
  src: string;
  /** Texto alternativo. Vacío si la imagen no aporta nada al título. */
  alt: string;
}

export interface CardProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  /**
   * URL de destino. **Con `href`** el Card es una *link-card*: todo el bloque es un
   * `<a>` (título + descripción + `children` + flecha). **Sin `href`** es una
   * *superficie contenedora*: un `<div>` con `children` arbitrarios
   * (interactivos permitidos).
   */
  href?: string;
  /**
   * Elemento sobre el que renderizar la tarjeta (p. ej. `<Link href="…" />` de
   * Next.js): recibe las clases y el contenido del Card. Es el modo enlace
   * cuando la navegación la lleva el router de la aplicación, y sustituye al
   * patrón `asChild`. Manda sobre `href`.
   */
  render?: React.ReactElement<Record<string, unknown>>;
  /**
   * Abre en nueva pestaña con `rel="noopener noreferrer"` (solo con `href`).
   * Misma prop y mismo contrato que en `Button` y `Link`.
   */
  external?: boolean;
  /** Título (modo link — se espera junto a `href` o `render`). */
  title?: string;
  /**
   * Descripción (modo link). Con una cadena, la tarjeta la envuelve en su
   * propio `<p>`. Con un nodo, lo pinta tal cual: el marcado lo trae el
   * consumidor (varios párrafos, `<Tag>`, texto con formato…).
   */
  description?: React.ReactNode;
  /** Texto accesible del CTA, visually-hidden (modo link — se espera junto a `href` o `render`). */
  ctaLabel?: string;
  /** Color de fondo. Default: `'outline'`. */
  color?: CardColor;
  /** Maqueta de la tarjeta. Default: `'default'`. */
  variant?: CardVariant;
  /**
   * Imagen de la tarjeta: arriba en `square`, al lado del panel de color en
   * `split`, y sobre el texto en `default`. Sin ella la tarjeta es solo texto,
   * como hasta ahora.
   */
  media?: CardMedia;
}

/**
 * Card con dos modos:
 * - **link-card** (`href` o `render`): navegación — el bloque entero es un
 *   enlace. Con `href` lo pinta un `<a>`; con `render`, el elemento que se le
 *   pase (el `Link` del router de turno). Admite `children` para el contenido
 *   que no cabe en `title`/`description`, siempre que no sea interactivo.
 * - **contenedor** (sin ninguno de los dos): superficie de app con contenido
 *   interactivo dentro (formularios, botones), que no puede vivir dentro de un
 *   `<a>`. Se compone con las subpartes de más abajo.
 *
 * En modo contenedor, `className` se concatena tras las clases propias y `{...rest}`
 * (`data-*`, `aria-*`, `id`…) se reenvía al `<div>`.
 */
export const Card = forwardRef<HTMLElement, CardProps>(function Card({
  href,
  render,
  external = false,
  title,
  description,
  ctaLabel,
  color = 'outline',
  variant = 'default',
  media,
  className,
  children,
  ...rest
}, ref) {
  const classes = [
    'card',
    `card--${color}`,
    variant !== 'default' ? `card--${variant}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  // El contenido de la link-card: título, descripción, los hijos que traiga el
  // consumidor, el CTA accesible y la flecha. La descripción en cadena la
  // envuelve la tarjeta; si ya es un nodo, el marcado lo pone quien lo pasa.
  const text = (
    <>
      {title !== undefined && <Heading level={2} size={8}>{title}</Heading>}
      {description && (typeof description === 'string' ? <p>{description}</p> : description)}
      {children}
      {ctaLabel !== undefined && <VisuallyHidden>{ctaLabel}</VisuallyHidden>}
      <Arrow size="lg" />
    </>
  );

  const picture = media && (
    <div className="card__media">
      <img src={media.src} alt={media.alt} />
    </div>
  );

  // Sin imagen y sin maqueta propia, la tarjeta es la de siempre: el texto
  // cuelga directamente del enlace, sin envoltorio. En cuanto hay imagen o
  // variante, el texto necesita su caja para que la imagen llegue al borde.
  const linkContent = variant === 'default' && !media ? text : (
    <>
      {picture}
      <div className="card__body">{text}</div>
    </>
  );

  // Modo enlace sobre el elemento del consumidor (router). Manda sobre `href`.
  const rendered = useRender({
    render,
    ref,
    enabled: render !== undefined,
    props: {
      className: classes,
      ...(rest as Record<string, unknown>),
      children: linkContent,
    },
  });
  if (rendered) return rendered;

  // Modo link (retrocompatible): todo el bloque es un enlace.
  if (href !== undefined) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {linkContent}
      </a>
    );
  }

  // Modo contenedor: superficie con children arbitrarios.
  return (
    <div ref={ref as React.Ref<HTMLDivElement>} className={classes} {...rest}>
      {children}
    </div>
  );
});

/* --------------------------------------------------------------------------
   Subpartes del modo contenedor. Componer con ellas evita que cada producto
   se maquete la cabecera, el pie o el título por su cuenta.
   -------------------------------------------------------------------------- */

export type CardPartProps = React.ComponentPropsWithoutRef<'div'>;

/** Fila superior: el bloque de título a un lado y la acción al otro. */
export const CardHeader = forwardRef<HTMLDivElement, CardPartProps>(function CardHeader(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={['card__header', className].filter(Boolean).join(' ')} {...rest} />;
});

export interface CardTitleProps extends Omit<React.ComponentPropsWithoutRef<'h3'>, 'children'> {
  /**
   * Nivel semántico del encabezado en el esquema del documento. Default: `3`
   * — una tarjeta suele colgar de un `h2` de sección. Súbelo o bájalo según
   * dónde viva la tarjeta; no cambia cómo se ve.
   */
  level?: HeadingLevel;
  /**
   * Tamaño de la escala de títulos. Default: `4` (20px), el tamaño de un título
   * de tarjeta de aplicación. La link-card de marketing usa el suyo, mucho mayor.
   */
  size?: HeadingSize;
  children: React.ReactNode;
}

/**
 * Título de la tarjeta. Es un encabezado de verdad (`Heading`): cuenta para el
 * esquema del documento y para la navegación por encabezados de un lector de
 * pantalla. El nivel y el tamaño se eligen por separado — el nivel dice dónde
 * cuelga la tarjeta, el tamaño cómo se ve.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { level = 3, size = 4, className, children, ...rest },
  ref,
) {
  return (
    <Heading
      ref={ref}
      level={level}
      size={size}
      className={['card__title', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Heading>
  );
});

export interface CardDescriptionProps extends Omit<ParagraphProps, 'children'> {
  children: React.ReactNode;
}

/**
 * Texto secundario bajo el título. Es un párrafo del sistema (`Paragraph`):
 * hereda el cuerpo de la superficie en la que viva la tarjeta.
 */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ size = 'small', className, children, ...rest }, ref) {
    return (
      <Paragraph
        ref={ref}
        size={size}
        className={['card__description', className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </Paragraph>
    );
  },
);

/** Acción alineada al extremo de la cabecera (menú, botón…). */
export const CardAction = forwardRef<HTMLDivElement, CardPartProps>(function CardAction(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={['card__action', className].filter(Boolean).join(' ')} {...rest} />;
});

/** Cuerpo de la tarjeta. */
export const CardContent = forwardRef<HTMLDivElement, CardPartProps>(function CardContent(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={['card__content', className].filter(Boolean).join(' ')} {...rest} />;
});

/** Pie con las acciones de la tarjeta. */
export const CardFooter = forwardRef<HTMLDivElement, CardPartProps>(function CardFooter(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={['card__footer', className].filter(Boolean).join(' ')} {...rest} />;
});
