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

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Si esta columna admite ordenación */
  sortable?: boolean;
  /** Dirección activa. Solo relevante si sortable */
  sorted?: 'asc' | 'desc' | false;
  /** Handler de click/teclado. Solo relevante si sortable */
  onSort?: () => void;
  children: ReactNode;
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

function TableHead({ children }: { children: ReactNode }) {
  return <thead>{children}</thead>;
}

function TableFoot({ children }: { children: ReactNode }) {
  return <tfoot>{children}</tfoot>;
}

function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function TableHeader({
  sortable = false,
  sorted = false,
  onSort,
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
    <th {...rest} scope={scope} className={classes}>
      {children}
    </th>
  );
}

function TableRow({
  onClick,
  interactive = false,
  children,
  className,
  ...rest
}: TableRowProps) {
  const isInteractive = interactive || !!onClick;
  const classes = ['table__row', isInteractive ? 'table__row--interactive' : '', className]
    .filter(Boolean)
    .join(' ');

  if (isInteractive) {
    return (
      <tr
        {...rest}
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

  return (
    <tr {...rest} className={classes}>
      {children}
    </tr>
  );
}

function TableCell({ children, className, ...rest }: TableCellProps) {
  const classes = ['table__cell', className].filter(Boolean).join(' ');
  return (
    <td {...rest} className={classes}>
      {children}
    </td>
  );
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
Table.Footer = TableFoot;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
