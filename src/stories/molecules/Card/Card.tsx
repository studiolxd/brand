import { forwardRef, useCallback, useRef } from 'react';
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
   *
   * También admite un `<button type="submit" name="…" value="…" />`: la
   * tarjeta-acción, para un formulario nativo donde pulsar la tarjeta envía
   * un valor en vez de navegar (el `authenticationExecution` del tema de
   * Keycloak es el caso que lo motiva). El CSS del modo enlace no depende de
   * que el elemento sea un `<a>`.
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
  /**
   * Texto accesible del CTA (modo link), *visually-hidden*. **Manda sobre la
   * flecha**: con `ctaLabel` la tarjeta pinta la flecha Y su nombre accesible;
   * sin `ctaLabel` no pinta ninguna de las dos cosas. Una sola decisión en vez
   * de dos props que puedan contradecirse — no hay `showArrow`.
   *
   * Omitirlo es lo que se quiere en una rejilla de catálogo, donde la flecha
   * repetida en cada tarjeta es ruido y el destino ya lo dice el título. Con
   * él, en cambio, la tarjeta suelta de marketing gana la llamada visible y el
   * enlace un nombre accesible completo («Ver más sobre plataformas LMS»)
   * cuando lo único visible sería la flecha.
   */
  ctaLabel?: string;
  /** Color de fondo. Default: `'outline'`. */
  color?: CardColor;
  /** Maqueta de la tarjeta. Default: `'default'`. */
  variant?: CardVariant;
  /**
   * Modo contenedor: el enlace del **título** cubre toda la tarjeta. La
   * tarjeta sigue siendo un `<div>` con contenido interactivo dentro —un menú
   * en `CardAction`, un botón en el pie—, y quien navega es el `<a>` del
   * título, que estira su área de pulsación a todo el bloque con una capa
   * vacía (`::after`).
   *
   * Es la forma correcta de una «tarjeta que es enlace **y** lleva acciones»:
   * meter un `<button>` dentro de un `<a>` —envolviendo la tarjeta en el
   * `Link` del router— no es HTML válido, y un lector de pantalla anuncia un
   * enlace cuyo nombre se come el título, el estado, el pie y la etiqueta del
   * menú de una sentada. Con `linkOverlay` cada control conserva su papel: un
   * enlace con el nombre del título, y un botón de menú aparte.
   *
   * La ranura de acciones queda por encima de la capa, así que se pulsa sola.
   */
  linkOverlay?: boolean;
  /**
   * Modo contenedor: la tarjeta entera es la opción de un grupo. Dentro va
   * un `RadioField` (o `CheckboxField`) del DS, que la tarjeta extiende a todo
   * su bloque y deja invisible: pulsar en cualquier punto marca la opción y
   * el foco del teclado se dibuja sobre la tarjeta. Nada más dentro puede ser
   * interactivo.
   */
  selectable?: boolean;
  /** Con `selectable`: la opción marcada se pinta en accent-1. */
  selected?: boolean;
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
  linkOverlay = false,
  selectable = false,
  selected = false,
  className,
  children,
  ...rest
}, ref) {
  const classes = [
    'card',
    `card--${color}`,
    variant !== 'default' ? `card--${variant}` : '',
    linkOverlay ? 'card--link-overlay' : '',
    selectable ? 'card--selectable' : '',
    selectable && selected ? 'card--selected' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  // El contenido de la link-card: título, descripción, los hijos que traiga el
  // consumidor y —solo si hay `ctaLabel`— el CTA accesible con su flecha. Las
  // dos van juntas a propósito: la flecha es el dibujo de esa llamada, así que
  // no puede haber flecha muda ni nombre accesible sin señal visible. La
  // descripción en cadena la envuelve la tarjeta; si ya es un nodo, el marcado
  // lo pone quien lo pasa.
  const text = (
    <>
      {title !== undefined && <Heading level={2} size={8}>{title}</Heading>}
      {description && (typeof description === 'string' ? <p>{description}</p> : description)}
      {children}
      {ctaLabel !== undefined && (
        <>
          <VisuallyHidden>{ctaLabel}</VisuallyHidden>
          <Arrow size="lg" />
        </>
      )}
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

export interface CardPartProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Declara la subparte como **zona interactiva** de una tarjeta `linkOverlay`:
   * sube por encima de la capa del enlace (`position: relative` + un apilado
   * interno de 1) para que lo que lleve dentro se pueda pulsar. Sin ella, la
   * capa del título cubre el bloque entero y se queda con la pulsación — que
   * es lo que se quiere en todo lo que es solo texto.
   *
   * No hace falta en `CardAction` ni en `CardSelection`, que ya son ranuras
   * interactivas por definición y suben solas. Fuera de `linkOverlay` no hace
   * nada: no hay capa a la que ganar.
   *
   * @default false
   */
  interactive?: boolean;
}

/** Clases de una subparte que puede declararse interactiva. */
function partClasses(block: string, interactive: boolean | undefined, className?: string) {
  return [block, interactive ? 'card__interactive' : '', className].filter(Boolean).join(' ');
}

/** Fila superior: el bloque de título a un lado y la acción al otro. */
export const CardHeader = forwardRef<HTMLDivElement, CardPartProps>(function CardHeader(
  { interactive, className, ...rest },
  ref,
) {
  return <div ref={ref} className={partClasses('card__header', interactive, className)} {...rest} />;
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
  /**
   * Líneas que reserva aunque el texto ocupe menos (altura mínima en `lh`).
   * Para tarjetas hermanas cuyo siguiente bloque —un precio, una cifra— debe
   * quedar a la misma altura tengan la descripción que tengan.
   */
  lines?: 1 | 2 | 3;
}

/**
 * Texto secundario bajo el título. Es un párrafo del sistema (`Paragraph`):
 * hereda el cuerpo de la superficie en la que viva la tarjeta.
 */
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ size = 'small', lines, className, children, ...rest }, ref) {
    return (
      <Paragraph
        ref={ref}
        size={size}
        className={[
          'card__description',
          lines ? `card__description--lines-${lines}` : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </Paragraph>
    );
  },
);

export interface CardActionProps extends CardPartProps {
  /**
   * La ranura **aísla sus eventos** de la tarjeta que la contiene, que es lo
   * que se quiere siempre que la tarjeta sea a la vez un enlace (`Card href`,
   * `Card render`, o un `<Link>` del router envolviéndola): pulsar el menú de
   * la cabecera abre el menú, no navega.
   *
   * Hace dos cosas, y las dos hacen falta:
   *
   * - `stopPropagation`, para que el clic no llegue a un manejador que la
   *   tarjeta o la fila tengan puesto más arriba;
   * - `preventDefault` **solo cuando la ranura cuelga de un enlace** —se
   *   comprueba en el DOM, buscando un `a[href]` por encima del propio nodo—
   *   y **solo para lo que se pulsa dentro de ella**. Sin esto no basta:
   *   detener la propagación no cancela la acción por defecto del navegador,
   *   que sigue el enlace igual. Y acotarlo evita romper lo que sí depende de
   *   su acción por defecto: un `type="submit"` dentro de una tarjeta
   *   contenedora, o el ítem de un `Menu` que se pinta en un portal fuera del
   *   enlace.
   *
   * `false` para la tarjeta que quiere lo contrario: que pulsar la acción
   * cuente también como pulsar la tarjeta.
   *
   * @default true
   */
  isolate?: boolean;
}

/**
 * Acción alineada al extremo de la cabecera (menú, botón…). Por defecto aísla
 * sus eventos de la tarjeta-enlace que la contiene: ver `isolate`.
 */
export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(function CardAction(
  { isolate = true, className, onClick, ...rest },
  ref,
) {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      nodeRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (isolate) {
      event.stopPropagation();
      const node = nodeRef.current;
      const insideSlot = node?.contains(event.target as Node) ?? false;
      if (insideSlot && node?.parentElement?.closest('a[href], [role="link"]')) {
        event.preventDefault();
      }
    }
    onClick?.(event);
  };

  return (
    <div
      ref={setRefs}
      className={['card__action', className].filter(Boolean).join(' ')}
      onClick={handleClick}
      {...rest}
    />
  );
});

export interface CardSelectionProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * Detiene la propagación del clic: marcar la casilla marca la casilla y no
   * llega al manejador que la tarjeta o la fila tengan puesto más arriba.
   *
   * A diferencia de `CardAction`, **no cancela la acción por defecto** aunque
   * la ranura cuelgue de un enlace: la acción por defecto es justo lo que
   * marca la casilla, así que cancelarla la dejaría sin marcar. Lo que impide
   * que se navegue es la capa —dentro de `linkOverlay` la ranura queda por
   * encima de ella y el enlace ni se entera—; una tarjeta envuelta a mano en un
   * `<Link>` con la casilla dentro no tiene arreglo aquí, porque no lo tiene:
   * es un control dentro de un enlace, y se escribe con `linkOverlay`.
   *
   * @default true
   */
  isolate?: boolean;
}

/**
 * Ranura de **selección**: la casilla (o el radio) con que se elige la tarjeta
 * dentro de una lista. Va al principio de la cabecera, antes del título, que es
 * donde se busca al repasar una columna de tarjetas.
 *
 * Es la pieza que faltaba para la tarjeta que **navega y se selecciona**: en
 * una `Card linkOverlay`, la capa del enlace del título cubre el bloque entero
 * y se traga la pulsación de cualquier control que no la gane; esta ranura sube
 * por encima de ella (`position: relative` + apilado interno de 1) y conserva su
 * propio foco de teclado, en su sitio del orden de tabulación.
 *
 * No se confunde con `selectable`, que es lo contrario: ahí la tarjeta **entera**
 * es la opción y nada más dentro puede ser interactivo.
 */
export const CardSelection = forwardRef<HTMLDivElement, CardSelectionProps>(function CardSelection(
  { isolate = true, className, onClick, ...rest },
  ref,
) {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (isolate) event.stopPropagation();
    onClick?.(event);
  };

  return (
    <div
      ref={ref}
      className={['card__selection', className].filter(Boolean).join(' ')}
      onClick={handleClick}
      {...rest}
    />
  );
});

/** Cuerpo de la tarjeta. */
export const CardContent = forwardRef<HTMLDivElement, CardPartProps>(function CardContent(
  { interactive, className, ...rest },
  ref,
) {
  return <div ref={ref} className={partClasses('card__content', interactive, className)} {...rest} />;
});

export interface CardFooterProps extends CardPartProps {
  /**
   * `row` (por defecto): las acciones en fila **en escritorio**; por debajo de
   * `md` apilan y ocupan la línea entera solas, que es la norma del sistema
   * (Fundamentos › Puntos de ruptura) — no hay que pedirlo.
   *
   * `column`: apiladas y a todo el ancho **siempre, también donde hay sitio**.
   * Es la excepción declarada, para un pie con una línea de texto sobre el
   * botón (una nota de prueba, una condición) que debe quedar pegada a él, y
   * para una tarjeta que se sabe estrecha en escritorio —una rejilla de tres
   * columnas—, porque el pie mide su hueco y no la ventana.
   */
  direction?: 'row' | 'column';
}

/**
 * Pie de la tarjeta: sus acciones. En móvil apila y da la línea entera a cada
 * una; en escritorio, fila —salvo `direction="column"`—.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { direction = 'row', interactive, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={partClasses(
        'card__footer',
        interactive,
        [direction === 'column' ? 'card__footer--column' : '', className].filter(Boolean).join(' ') || undefined,
      )}
      {...rest}
    />
  );
});
