import type { ReactNode } from 'react';
import './Table.css';
export interface TableProps {
    /** Texto de <caption>. Obligatorio para accesibilidad — se oculta visualmente. */
    caption: string;
    children: ReactNode;
    /** Variante de densidad. Default: "md" */
    size?: 'sm' | 'md';
}
export interface TableHeaderProps {
    /** Si esta columna admite ordenación */
    sortable?: boolean;
    /** Dirección activa. Solo relevante si sortable */
    sorted?: 'asc' | 'desc' | false;
    /** Handler de click/teclado. Solo relevante si sortable */
    onSort?: () => void;
    children: ReactNode;
}
export interface TableRowProps {
    /** Si se pasa, la fila es interactiva (cursor pointer, focusable, responde a teclado) */
    onClick?: () => void;
    /** Alternativa explícita a onClick para control manual */
    interactive?: boolean;
    children: ReactNode;
}
declare function TableHead({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TableBody({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function TableHeader({ sortable, sorted, onSort, children }: TableHeaderProps): import("react/jsx-runtime").JSX.Element;
declare function TableRow({ onClick, interactive, children }: TableRowProps): import("react/jsx-runtime").JSX.Element;
declare function TableCell({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function Table({ caption, children, size }: TableProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Table {
    var Head: typeof TableHead;
    var Header: typeof TableHeader;
    var Body: typeof TableBody;
    var Row: typeof TableRow;
    var Cell: typeof TableCell;
}
export {};
