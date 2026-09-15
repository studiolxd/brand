import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './FilterBar.css';
/**
 * El único texto que la barra emite por su cuenta: su nombre accesible como
 * punto de referencia de búsqueda. Los rótulos de los filtros no están aquí —
 * los escribe cada campo, y dicen qué filtran.
 */
export interface FilterBarMessages {
    /** Nombre accesible del punto de referencia `search` que es la barra. */
    label: string;
}
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
     * **Sin default**: sale de `filterBar.label` del `BrandMessagesProvider`.
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
 * no encogen por debajo de su contenido y la fila se sale. Aquí las columnas
 * son fijas por punto de corte —4 en escritorio, 2 en tableta, 1 antes de
 * `md`— y `auto-fit` hace que los filtros que haya llenen la fila entera, sin
 * hueco a la derecha cuando hay menos de los que caben.
 *
 * `{...rest}` (`id`, `data-*`, `aria-*`…) va al `<div>`.
 */
export declare function FilterBar({ search, children, actions, ariaLabel, className, ...rest }: FilterBarProps): import("react/jsx-runtime").JSX.Element;
