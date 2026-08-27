import { forwardRef } from 'react';
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
export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList({ className, children, ...rest }, ref) {
    const classes = ['description-list', className].filter(Boolean).join(' ');
    return (
      <dl ref={ref} className={classes} {...rest}>
        {children}
      </dl>
    );
  },
);
