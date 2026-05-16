import type { ReactNode } from 'react';
import { Chevron } from '../../atoms/Chevron/Chevron';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
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

function TableHead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableHeader({ sortable = false, sorted = false, onSort, children }: TableHeaderProps) {
  const classes = [
    'table__header',
    sortable ? 'table__header--sortable' : '',
    sorted === 'asc' ? 'table__header--sorted-asc' : '',
    sorted === 'desc' ? 'table__header--sorted-desc' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (sortable) {
    return (
      <th
        scope="col"
        className={classes}
        onClick={onSort}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSort?.();
          }
        }}
        tabIndex={0}
        aria-sort={
          sorted === 'asc' ? 'ascending' : sorted === 'desc' ? 'descending' : 'none'
        }
      >
        <span className="table__header-content">
          {children}
          <Chevron size="xs" className="table__sort-icon" />
          <VisuallyHidden>
            {sorted === 'asc'
              ? 'Ordenado ascendente'
              : sorted === 'desc'
                ? 'Ordenado descendente'
                : 'Activar ordenación'}
          </VisuallyHidden>
        </span>
      </th>
    );
  }

  return (
    <th scope="col" className={classes}>
      {children}
    </th>
  );
}

function TableRow({ onClick, interactive = false, children }: TableRowProps) {
  const isInteractive = interactive || !!onClick;
  const classes = ['table__row', isInteractive ? 'table__row--interactive' : '']
    .filter(Boolean)
    .join(' ');

  if (isInteractive) {
    return (
      <tr
        className={classes}
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

  return <tr className={classes}>{children}</tr>;
}

function TableCell({ children }: { children: ReactNode }) {
  return <td className="table__cell">{children}</td>;
}

export function Table({ caption, children, size = 'md' }: TableProps) {
  const classes = ['table', size === 'sm' ? 'table--sm' : ''].filter(Boolean).join(' ');

  return (
    <div className="table__wrapper">
      <table className={classes}>
        <caption className="visually-hidden">{caption}</caption>
        {children}
      </table>
    </div>
  );
}

Table.Head = TableHead;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
