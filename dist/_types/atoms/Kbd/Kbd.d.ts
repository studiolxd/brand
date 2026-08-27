import './Kbd.css';
export interface KbdProps extends React.ComponentPropsWithoutRef<'kbd'> {
    /** Talla de la tecla. */
    size?: 'sm' | 'md' | 'lg';
    /** Símbolo o etiqueta de la tecla (p. ej. `⌘`, `Ctrl`, `K`). */
    children: React.ReactNode;
}
/**
 * Una tecla del teclado, con el elemento semántico `<kbd>`. Para una
 * combinación (`Ctrl + K`) se componen varias con el separador que toque: el
 * átomo representa siempre una sola tecla.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export declare const Kbd: import("react").ForwardRefExoticComponent<KbdProps & import("react").RefAttributes<HTMLElement>>;
