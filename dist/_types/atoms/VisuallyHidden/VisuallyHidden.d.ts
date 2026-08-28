import './VisuallyHidden.css';
export interface VisuallyHiddenProps extends React.ComponentPropsWithoutRef<'span'> {
    children: React.ReactNode;
    /**
     * Elemento que se pinta. `span` por defecto; `div` para envolver contenido de
     * flujo que no cabe dentro de un `span` (una tabla, una lista, un párrafo) —
     * el caso de la tabla equivalente de `Chart`.
     */
    as?: 'span' | 'div';
    /** Se añade DESPUÉS de la clase propia. */
    className?: string;
}
/**
 * Oculta contenido visualmente y lo deja en el árbol de accesibilidad.
 * Reenvía `ref` y cualquier atributo (`id`, `aria-*`…): así sirve de
 * `render` para los primitivos de Base UI (p. ej. un título de diálogo que
 * no se ve pero al que apunta `aria-labelledby`).
 */
export declare const VisuallyHidden: import("react").ForwardRefExoticComponent<VisuallyHiddenProps & import("react").RefAttributes<HTMLSpanElement>>;
