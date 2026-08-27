import './DescriptionList.css';
export interface DescriptionListProps extends React.ComponentPropsWithoutRef<'dl'> {
    /** Pares `<dt>` término y `<dd>` valor, en ese orden. */
    children: React.ReactNode;
}
/**
 * Lista de descripción: pares término/valor en una rejilla con separadores.
 * Sirve para fichas de datos —cliente, servicio, año— donde cada fila es una
 * propiedad y su contenido.
 *
 * Reenvía el resto de props del `<dl>` (`data-*`, `aria-*`, `id`…) y concatena
 * `className` tras las clases propias.
 */
export declare const DescriptionList: import("react").ForwardRefExoticComponent<DescriptionListProps & import("react").RefAttributes<HTMLDListElement>>;
