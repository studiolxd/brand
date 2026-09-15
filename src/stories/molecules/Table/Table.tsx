import type { ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Table.css';

/**
 * Los textos que la tabla emite por su cuenta: el cromo de la cabecera —el
 * estado de ordenación y el rótulo de la columna de acciones—, igual en toda
 * la suite. Los nombres calcan el espacio `table` del catálogo, así que
 * montarlo es mapear clave a clave y no traducir de nuevo.
 *
 * Lo que NO está aquí es deliberado: el `caption` de una tabla y el `label`
 * de una fila son contenido de ESA pantalla, no cromo del componente, y
 * siguen siendo props sin valor por defecto.
 */
export interface TableMessages {
  /** Rótulo oculto de la cabecera de la columna de acciones. */
  actions: string;
  /** Texto oculto de una columna ordenable que todavía no ordena. */
  sortable: string;
  /** Texto oculto de la columna ordenada de forma ascendente. */
  sortedAscending: string;
  /** Texto oculto de la columna ordenada de forma descendente. */
  sortedDescending: string;
}

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
  /**
   * Texto accesible de la cabecera de acciones. Sin default: cuando no se
   * pasa, sale de `table.actions` del `BrandMessagesProvider`.
   */
  actionsLabel?: string;
  /**
   * Pega la columna al borde final (`inset-inline-end: 0`) cuando la tabla
   * desborda su contenedor: la columna de acciones se queda alcanzable con
   * scroll horizontal en vez de caer fuera del recorte. Requiere el mismo
   * `sticky="end"` en la `Table.Cell` equivalente de cada fila.
   */
  sticky?: 'end';
  /**
   * Texto accesible del estado de ordenación ascendente. Sin default:
   * `table.sortedAscending`.
   */
  sortedAscLabel?: string;
  /** Texto accesible del estado descendente. Sin default: `table.sortedDescending`. */
  sortedDescLabel?: string;
  /** Texto accesible de la columna ordenable sin ordenar. Sin default: `table.sortable`. */
  sortableLabel?: string;
  /**
   * Impide que el rótulo de esta columna se parta en dos líneas. Mismo valor
   * que el `nowrap` de la `Table.Cell` de esta columna cuando el encabezado
   * comparte el motivo (un rótulo con una unidad pegada, «Importe (€)»).
   */
  nowrap?: boolean;
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
   * fila (celdas de solo iconos, datos crípticos). No sale del catálogo
   * común: identifica a ESTA fila, así que lo escribe el consumidor.
   */
  label?: string;
  children: ReactNode;
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /**
   * Pega la celda al borde final (`inset-inline-end: 0`) cuando la tabla
   * desborda su contenedor. Mismo valor que el `sticky` de la `Table.Header`
   * de esta columna.
   */
  sticky?: 'end';
  /**
   * Marca esta celda como parte de la columna de acciones: mismo valor que el
   * `actions` de la `Table.Header` de esta columna. Impide que su contenido
   * (un enlace o botón de dos palabras) se parta en dos líneas cuando la
   * columna, ya encogida a su mínimo, sobra ancho.
   */
  actions?: boolean;
  /**
   * Impide el salto de línea del contenido de esta celda: un valor que no
   * debe partirse (una URL, un identificador). La tabla ya resuelve el
   * desborde con scroll horizontal (`table__wrapper`) y, si la columna lo
   * necesita, con una columna de acciones fija (`sticky`) — `nowrap` no
   * cambia ese mecanismo, solo evita que este valor concreto se reparta en
   * dos líneas dentro de su celda.
   */
  nowrap?: boolean;
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
  actionsLabel,
  sortedAscLabel,
  sortedDescLabel,
  sortableLabel,
  sticky,
  nowrap = false,
  children,
  className,
  scope = 'col',
  ...rest
}: TableHeaderProps) {
  // Cada texto se lee donde se pinta: una cabecera corriente no exige
  // ninguno, y una ordenable solo el de su estado vigente.
  const t = useBrandMessages('table');
  const classes = [
    'table__header',
    sortable ? 'table__header--sortable' : '',
    sorted === 'asc' ? 'table__header--sorted-asc' : '',
    sorted === 'desc' ? 'table__header--sorted-desc' : '',
    actions ? 'table__header--actions' : '',
    sticky === 'end' ? 'table__header--sticky' : '',
    nowrap ? 'table__header--nowrap' : '',
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
            ? t('sortedAscending', sortedAscLabel)
            : sorted === 'desc'
              ? t('sortedDescending', sortedDescLabel)
              : t('sortable', sortableLabel)}
        </VisuallyHidden>
      </th>
    );
  }

  if (actions) {
    return (
      <th {...rest} scope={scope} className={classes}>
        {/* Con rótulo propio no se lee el catálogo: `??` corta antes. */}
        <VisuallyHidden>{children ?? t('actions', actionsLabel)}</VisuallyHidden>
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

export function TableCell({
  sticky,
  actions = false,
  nowrap = false,
  children,
  className,
  ...rest
}: TableCellProps) {
  const classes = [
    'table__cell',
    sticky === 'end' ? 'table__cell--sticky' : '',
    actions ? 'table__cell--actions' : '',
    nowrap ? 'table__cell--nowrap' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
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
