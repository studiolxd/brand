import { forwardRef, type MouseEvent, type ReactNode } from 'react';
import { List } from '../../atoms/List/List';
import { Link } from '../../atoms/Link/Link';
import './TableOfContents.css';

export interface TableOfContentsItem {
  /** `id` del encabezado al que apunta la entrada. El enlace será `#id`. */
  id: string;
  /** Texto de la entrada: el del encabezado. */
  label: string;
  /** Nivel del encabezado (`2` para un `h2`, `3` para un `h3`…). La sangría es relativa al nivel más alto de la lista. */
  level: number;
}

export interface TableOfContentsProps extends Omit<React.ComponentPropsWithoutRef<'nav'>, 'title'> {
  /** Entradas, en el orden en que aparecen en el documento. */
  items: TableOfContentsItem[];
  /**
   * `id` de la sección en la que está el lector. El scroll lo observa el
   * consumidor: el índice solo pinta lo que le digan.
   */
  activeId?: string;
  /**
   * Nombre accesible del `nav`. Por defecto, en castellano.
   * @default 'En esta página'
   */
  ariaLabel?: string;
  /** Rótulo visible sobre la lista. Sin él, no se pinta ninguno. */
  title?: string;
  /**
   * Fija el índice al hacer scroll (`position: sticky`). La distancia al borde
   * y el alto máximo son tokens (`--table-of-contents-sticky-*`).
   */
  sticky?: boolean;
  /** Se llama al pulsar una entrada, además de seguir el ancla. Para desplazamiento suave o para cerrar un panel. */
  onItemClick?: (item: TableOfContentsItem, event: MouseEvent<HTMLAnchorElement>) => void;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/** Profundidad relativa al título más alto del índice, con tope en 5 niveles de sangría. */
function depthOf(level: number, minLevel: number): number {
  return Math.min(Math.max(level - minLevel, 0), 5);
}

/**
 * Índice de anclas de la página: la lista de encabezados del documento, con
 * sangría por nivel y una marca en la sección en la que está el lector.
 *
 * Es un componente **controlado y sin scroll propio**: no observa la página ni
 * decide qué está a la vista. El consumidor calcula `activeId` (con un
 * `IntersectionObserver` o con el hash de la URL) y el índice lo pinta. Así el
 * mismo componente sirve para un índice con scroll-spy, para uno que solo
 * sigue al hash y para uno estático.
 *
 * `{...rest}` (`id`, `data-*`, `role`…) se reenvía al `<nav>`. El nombre
 * accesible sigue siendo `ariaLabel`.
 */
export const TableOfContents = forwardRef<HTMLElement, TableOfContentsProps>(function TableOfContents({
  items,
  activeId,
  ariaLabel = 'En esta página',
  title,
  sticky = false,
  onItemClick,
  className,
  ...rest
}, ref): ReactNode {
  if (items.length === 0) return null;

  const minLevel = Math.min(...items.map((item) => item.level));

  const classes = [
    'table-of-contents',
    sticky ? 'table-of-contents--sticky' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <nav ref={ref} className={classes} aria-label={ariaLabel} {...rest}>
      {title && <p className="table-of-contents__title">{title}</p>}
      <List type="plain" className="table-of-contents__list">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li
              key={item.id}
              className={`table-of-contents__item table-of-contents__item--level-${depthOf(item.level, minLevel)}`}
            >
              <Link
                href={`#${item.id}`}
                className={['table-of-contents__link', active ? 'table-of-contents__link--active' : '']
                  .filter(Boolean).join(' ')}
                // `location` es el valor de aria-current para «la sección de
                // esta página en la que estás», no `page` (eso es otra página).
                aria-current={active ? 'location' : undefined}
                onClick={onItemClick ? (event) => onItemClick(item, event) : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </List>
    </nav>
  );
});
