import type { ReactNode } from 'react';
import './Table.css';
export interface TableProps {
    /** Texto de <caption>. Obligatorio para accesibilidad — se oculta visualmente. */
    caption: string;
    children: ReactNode;
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
    /** Texto accesible de la cabecera de acciones. Default: "Acciones" */
    actionsLabel?: string;
    children?: ReactNode;
}
/** onClick tipado como () => void para mantener la API de interactividad con teclado */
export interface TableRowProps extends Omit<React.HTMLAttributes<HTMLTableRowElement>, 'onClick'> {
    onClick?: () => void;
    /** Alternativa explícita a onClick para control manual */
    interactive?: boolean;
    children: ReactNode;
}
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
}
declare function TableHead({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TableFoot({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TableBody({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TableHeader({ sortable, sorted, onSort, actions, actionsLabel, children, className, scope, ...rest }: TableHeaderProps): import("react/jsx-runtime").JSX.Element;
declare function TableRow({ onClick, interactive, children, className, ...rest }: TableRowProps): import("react/jsx-runtime").JSX.Element;
declare function TableCell({ children, className, ...rest }: TableCellProps): import("react/jsx-runtime").JSX.Element;
export declare function Table({ caption, children, size }: TableProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Table {
    var Head: typeof TableHead;
    var Footer: typeof TableFoot;
    var Header: typeof TableHeader;
    var Body: typeof TableBody;
    var Row: typeof TableRow;
    var Cell: typeof TableCell;
}
export {};
