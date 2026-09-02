import type { ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Table.css';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /**
   * Texto de `<caption>` (se oculta visualmente). **Opcional**: sin `caption` no se
   * renderiza el `<caption>` — el consumidor decide su estrategia de accessible-name
   * (p. ej. `aria-label` vía rest).
   */
  caption?: string;
  /** Variante de densidad. Default: "md" */
  size?: 'sm' | 'md';
}

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Si esta columna admite ordenación */
  sortable?: boolean;
  /** Dirección activa. Solo relevante si sortable */
  sorted?: 'asc' | 'desc' | false;
  /** Handler de click/teclado. Solo relevante si sortable */
  onSort?: () => void;
  /** Marca esta columna como columna de acciones: ancho mínimo y cabecera oculta visualmente */
  actions?: boolean;
  /** Texto accesible de la cabecera de acciones. Default: «Acciones» (castellano). Una app multiidioma debe pasarlo traducido. */
  actionsLabel?: string;
  /**
   * Texto accesible del estado de ordenación ascendente. Default: "Ordenado ascendente"
   * (castellano). Una app multiidioma debe pasarlo traducido.
   */
  sortedAscLabel?: string;
  /** Texto accesible del estado descendente. Default: «Ordenado descendente» (castellano). Una app multiidioma debe pasarlo traducido. */
  sortedDescLabel?: string;
  /** Texto accesible de la columna ordenable sin ordenar. Default: «Activar ordenación» (castellano). Una app multiidioma debe pasarlo traducido. */
  sortableLabel?: string;
  children?: ReactNode;
}

/** onClick tipado como () => void para mantener la API de interactividad con teclado */
export interface TableRowProps extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'onClick'> {
  onClick?: () => void;
  /** Alternativa explícita a onClick para control manual */
  interactive?: boolean;
  /** Marca la fila como seleccionada: se dice con tinta y peso, sin fondo. */
  selected?: boolean;
  /**
   * Nombre accesible de la fila. Por defecto el rol `row` toma su nombre del
   * contenido de sus celdas; pásalo solo cuando ese texto no identifique la
   * fila (celdas de solo iconos, datos crípticos). Default: castellano — no
   * hay texto por defecto, es el consumidor quien lo escribe.
   */
  label?: string;
  children: ReactNode;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode;
}

export function TableHead({ children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...rest}>{children}</thead>;
}

export function TableFooter({ children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tfoot {...rest}>{children}</tfoot>;
}

export function TableBody({ children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...rest}>{children}</tbody>;
}

export function TableHeader({
  sortable = false,
  sorted = false,
  onSort,
  actions = false,
  actionsLabel = 'Acciones',
  sortedAscLabel = 'Ordenado ascendente',
  sortedDescLabel = 'Ordenado descendente',
  sortableLabel = 'Activar ordenación',
  children,
  className,
  scope = 'col',
  ...rest
}: TableHeaderProps) {
  const classes = [
    'table__header',
    sortable ? 'table__header--sortable' : '',
    sorted === 'asc' ? 'table__header--sorted-asc' : '',
    sorted === 'desc' ? 'table__header--sorted-desc' : '',
    actions ? 'table__header--actions' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (sortable) {
    return (
      <th
        {...rest}
        scope={scope}
        className={classes}
        aria-sort={
          sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'
        }
      >
        {/*
          Patrón WAI-ARIA de tabla ordenable: el estado vive en el `aria-sort` del
          `th` y la acción en un `<button>` dentro. El botón da activación nativa
          con Enter y Espacio, y su nombre accesible es solo el rótulo de la
          columna — el estado no se mezcla con el nombre.
        */}
        <button type="button" className="table__header-content" onClick={onSort}>
          {children}
          <Icon name="chevron" size="xs" className="table__sort-icon" />
        </button>
        <VisuallyHidden>
          {sorted === 'asc'
            ? sortedAscLabel
            : sorted === 'desc'
              ? sortedDescLabel
              : sortableLabel}
        </VisuallyHidden>
      </th>
    );
  }

  if (actions) {
    return (
      <th {...rest} scope={scope} className={classes}>
        <VisuallyHidden>{children ?? actionsLabel}</VisuallyHidden>
      </th>
    );
  }

  return (
    <th {...rest} scope={scope} className={classes}>
      {children}
    </th>
  );
}

export function TableRow({
  onClick,
  interactive = false,
  selected = false,
  label,
  children,
  className,
  ...rest
}: TableRowProps) {
  const isInteractive = interactive || !!onClick;
  // `aria-selected="false"` solo dice algo sobre lo que se puede seleccionar:
  // en una fila interactiva se anuncian los dos estados; en una fila de solo
  // lectura, únicamente la que está marcada.
  const ariaSelected = isInteractive ? selected : selected || undefined;
  const classes = [
    'table__row',
    isInteractive ? 'table__row--interactive' : '',
    selected ? 'table__row--selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (isInteractive) {
    return (
      <tr
        {...rest}
        className={classes}
        aria-label={label}
        aria-selected={ariaSelected}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        tabIndex={0}
      >
        {children}
      </tr>
    );
  }

  return (
    <tr {...rest} className={classes} aria-label={label} aria-selected={ariaSelected}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className, ...rest }: TableCellProps) {
  const classes = ['table__cell', className].filter(Boolean).join(' ');
  return (
    <td {...rest} className={classes}>
      {children}
    </td>
  );
}

export function Table({ caption, children, size = 'md', className, ...rest }: TableProps) {
  const classes = ['table', size === 'sm' ? 'table--sm' : '', className ?? ''].filter(Boolean).join(' ');

  return (
    <div className="table__wrapper">
      <table className={classes} {...rest}>
        {/* `visually-hidden` a pelo: el modelo de contenido de <table> no
            admite el span de `<VisuallyHidden>` en el sitio del <caption>.
            Excepción declarada en CLAUDE.md § «Accesibilidad — VisuallyHidden». */}
        {caption && <caption className="visually-hidden">{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

/**
 * Subpartes disponibles también como **named exports** (`TableHead`, `TableBody`,
 * `TableFooter`, `TableHeader`, `TableRow`, `TableCell`): en **Server Components (RSC)**
 * usa los named exports — el namespace (`Table.Head`) requiere contexto cliente.
 */
Table.Head = TableHead;
Table.Footer = TableFooter;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
