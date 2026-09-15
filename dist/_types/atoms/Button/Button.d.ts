import './Button.css';
/**
 * Nombre accesible obligatorio en un botón de solo icono: sin texto visible,
 * el nombre tiene que venir de `aria-label` o de `aria-labelledby`. Va en el
 * tipo, no solo en el JSDoc, para que el compilador lo exija.
 */
export type ButtonIconOnlyProps = {
    iconOnly: true;
    'aria-label': string;
} | {
    iconOnly: true;
    'aria-labelledby': string;
} | {
    iconOnly?: false | undefined;
};
/** Todo lo que no es la disyuntiva de `iconOnly`. Para componentes que envuelven `Button` y lo fijan. */
export interface ButtonBaseProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> {
    /** Visual variant of the button */
    variant?: 'primary' | 'outline' | 'ghost' | 'text';
    /**
     * Solo con `variant="text"`: `ink` lo pinta con la tinta de la superficie,
     * como `Link tone="ink"`, para acciones que no deben leerse como enlace de
     * acento (abrir o cerrar un bloque, deshacer).
     */
    tone?: 'accent' | 'ink';
    /** Applies destructive (red) color intent — composable with outline and text */
    destructive?: boolean;
    /** Size of the button */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Estira el botón hasta el ancho de su contenedor (`'mobile'`, solo por
     * debajo de `md`). **Es la excepción marcada, no el camino normal.**
     *
     * Todo botón vive en una **ranura de acciones**: el pie de un `Form` o de un
     * diálogo, las `actions` de un `Alert`, de una `FilterBar`, de un `Hero`, de
     * un `PageIntro`… Y el ancho lo decide la ranura, no el botón: la norma del
     * sistema (Fundamentos › **Puntos de ruptura**) hace que en móvil las
     * acciones tomen la línea entera desde el CSS del contenedor, sin prop que
     * acordarse de pasar. Dentro de una ranura del sistema `block` no hace falta,
     * y pasarlo es pelearse con ella.
     *
     * **Si no hay ranura que le encaje, eso es un hueco del sistema y se
     * reporta** — no un `block` que se añade.
     *
     * Queda, entonces, para el botón que de verdad NO está en una ranura de
     * acciones: la llamada a la acción dentro de un texto, o la fila que un
     * producto monta a mano mientras el sistema no tiene su ranura.
     */
    block?: boolean | 'mobile';
    /**
     * Renders a square, icon-only button (aspect-ratio 1). Composable with `variant`
     * and `size`. Con `iconOnly` el tipo exige `aria-label` o `aria-labelledby`:
     * sin texto visible no hay otra forma de nombrar el control.
     */
    iconOnly?: boolean;
    /**
     * HTML button type (ignored when href is set). Se mantiene el default `"button"`;
     * dentro de un `<form>` el default nativo sería `submit`, así que pásalo explícito
     * cuando quieras enviar el formulario.
     */
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    /** Renders as <a> when provided */
    href?: string;
    /** Adds target="_blank" rel="noopener noreferrer" (solo con href) */
    external?: boolean;
    /**
     * Elemento sobre el que renderizar el botón (p. ej. `<Link href="…" />` de
     * Next.js): recibe las clases y los handlers del Button. Sustituye al
     * patrón `asChild`.
     */
    render?: React.ReactElement<Record<string, unknown>>;
    /** Se añade DESPUÉS de las clases propias del componente (el consumidor añade, no sustituye) */
    className?: string;
}
export type ButtonProps = ButtonBaseProps & ButtonIconOnlyProps;
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLElement>>;
