import './List.css';
export type ListType = 'unordered' | 'ordered' | 'plain';
export interface ListProps extends React.ComponentPropsWithoutRef<'ul'> {
    /** Tipo de lista: con viñetas, numerada o sin decoración. */
    type?: ListType;
    children: React.ReactNode;
}
/**
 * Lista con viñetas (`ul`), numerada (`ol`) o sin decoración (`plain`, un `ul`
 * sin marcas ni sangría). Viste el elemento con la tipografía del cuerpo; los
 * `<li>` los pone quien la usa.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export declare const List: import("react").ForwardRefExoticComponent<ListProps & import("react").RefAttributes<HTMLUListElement & HTMLOListElement>>;
