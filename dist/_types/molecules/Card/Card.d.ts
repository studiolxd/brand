import './Card.css';
import { type HeadingLevel, type HeadingSize } from '../../atoms/Heading/Heading';
import { type ParagraphProps } from '../../atoms/Paragraph/Paragraph';
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
export declare const Card: import("react").ForwardRefExoticComponent<CardProps & import("react").RefAttributes<HTMLElement>>;
export type CardPartProps = React.ComponentPropsWithoutRef<'div'>;
/** Fila superior: el bloque de título a un lado y la acción al otro. */
export declare const CardHeader: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
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
export declare const CardTitle: import("react").ForwardRefExoticComponent<CardTitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
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
export declare const CardDescription: import("react").ForwardRefExoticComponent<CardDescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
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
export declare const CardAction: import("react").ForwardRefExoticComponent<CardActionProps & import("react").RefAttributes<HTMLDivElement>>;
/** Cuerpo de la tarjeta. */
export declare const CardContent: import("react").ForwardRefExoticComponent<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
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
export declare const CardFooter: import("react").ForwardRefExoticComponent<CardFooterProps & import("react").RefAttributes<HTMLDivElement>>;
