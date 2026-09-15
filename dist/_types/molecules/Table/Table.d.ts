import type { ReactNode } from 'react';
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
export declare function TableHead({ children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableFooter({ children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableBody({ children, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>): import("react/jsx-runtime").JSX.Element;
export declare function TableHeader({ sortable, sorted, onSort, actions, actionsLabel, sortedAscLabel, sortedDescLabel, sortableLabel, sticky, nowrap, children, className, scope, ...rest }: TableHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function TableRow({ onClick, interactive, selected, label, children, className, ...rest }: TableRowProps): import("react/jsx-runtime").JSX.Element;
export declare function TableCell({ sticky, actions, nowrap, children, className, ...rest }: TableCellProps): import("react/jsx-runtime").JSX.Element;
export declare function Table({ caption, children, size, className, ...rest }: TableProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Table {
    var Head: typeof TableHead;
    var Footer: typeof TableFooter;
    var Header: typeof TableHeader;
    var Body: typeof TableBody;
    var Row: typeof TableRow;
    var Cell: typeof TableCell;
}
