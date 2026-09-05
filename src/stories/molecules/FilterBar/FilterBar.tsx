import { Children, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './FilterBar.css';

export interface FilterBarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  /**
   * El buscador: el campo de búsqueda del sistema —un `InputField kind="search"`,
   * que es el que trae la lupa, o el `SearchForm` cuando la consulta viaja a
   * otra página—. Ocupa **su propia línea entera**, siempre: es lo primero que
   * se toca y lo que más se escribe.
   */
  search?: ReactNode;
  /**
   * Los filtros: un campo del sistema por filtro (`SelectField`,
   * `DatePickerField`…), **con su etiqueta visible**. Un filtro sin rótulo
   * obliga a abrirlo para saber qué filtra. En escritorio se reparten en
   * columnas; en móvil se apilan a ancho completo.
   */
  children?: ReactNode;
  /**
   * Acciones sobre los filtros —«Limpiar filtros», normalmente—, al final de
   * la fila de filtros y alineadas con los controles, no con sus rótulos.
   */
  actions?: ReactNode;
  /**
   * Nombre accesible del punto de referencia `search` que es la barra.
   * Default: «Filtros» (castellano). Una app multiidioma debe pasarlo traducido.
   */
  ariaLabel?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * La barra de filtros de un listado: el buscador en su línea y, debajo, los
 * filtros en columnas. Es **maqueta y nada más** —no sabe qué se filtra, no
 * guarda estado y no pide datos—: cada filtro es un campo controlado por el
 * consumidor, igual que en un formulario.
 *
 * Existe porque montarla a mano en un `Inline` se rompe en móvil: los campos
 * no encogen por debajo de su contenido y la fila se sale. Aquí la rejilla es
 * `auto-fit` sobre un ancho mínimo por token, así que el número de columnas lo
 * decide el sitio disponible y en pantalla estrecha queda una sola.
 *
 * `{...rest}` (`id`, `data-*`, `aria-*`…) va al `<div>`.
 */
export function FilterBar({
  search,
  children,
  actions,
  ariaLabel = 'Filtros',
  className,
  ...rest
}: FilterBarProps) {
  const filters = Children.toArray(children);

  return (
    <div
      className={['filter-bar', className].filter(Boolean).join(' ')}
      role="search"
      aria-label={ariaLabel}
      {...rest}
    >
      {search && <div className="filter-bar__search">{search}</div>}
      {(filters.length > 0 || actions) && (
        <div className="filter-bar__row">
          {filters.length > 0 && (
            <div className="filter-bar__filters">
              {filters.map((filter, index) => (
                <div key={index} className="filter-bar__filter">{filter}</div>
              ))}
            </div>
          )}
          {actions && <div className="filter-bar__actions">{actions}</div>}
        </div>
      )}
    </div>
  );
}
