import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../atoms/Button/Button';
import { Tag } from '../../atoms/Tag/Tag';
import { DataTable } from './DataTable';

type Member = {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
};

const ROLE_VARIANT = {
  owner: 'primary',
  admin: 'neutral',
  member: 'neutral',
} as const;

const columns: ColumnDef<Member, unknown>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'email', header: 'Correo' },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => (
      <Tag variant={ROLE_VARIANT[row.original.role]}>{row.original.role}</Tag>
    ),
  },
];

const NAMES = [
  'Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson',
  'Edsger Dijkstra', 'Barbara Liskov', 'Donald Knuth', 'Margaret Hamilton',
  'Ken Thompson', 'Radia Perlman', 'Leslie Lamport', 'Frances Allen',
];

const data: Member[] = NAMES.map((name, index) => ({
  id: String(index),
  name,
  email: `${name.toLowerCase().replace(/\s+/g, '.')}@studiolxd.com`,
  role: index === 0 ? 'owner' : index < 3 ? 'admin' : 'member',
}));

// Storybook no puede inferir los genéricos de DataTable: se le da la versión
// ya instanciada para este juego de datos.
const MemberTable = DataTable<Member, unknown>;

const meta = {
  title: 'Organisms/DataTable',
  component: MemberTable,
  // El nombre de la tabla no tiene default: lo pone el producto.
  args: { ariaLabel: 'Miembros del equipo' },
} satisfies Meta<typeof MemberTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Con buscador y paginación en cliente',
  args: {
    columns,
    data,
    searchColumnId: 'name',
    searchPlaceholder: 'Buscar por nombre…',
    pageSize: 5,
  },
};

export const ConAcciones: Story = {
  name: 'Con acciones en la barra',
  args: {
    columns,
    data,
    searchColumnId: 'name',
    pageSize: 5,
    toolbar: <Button variant="outline" size="sm">Invitar</Button>,
  },
};

export const AccionesEnElPie: Story = {
  name: 'Acciones en el pie',
  args: {
    columns,
    data,
    searchColumnId: 'name',
    pageSize: 5,
    footerActions: <Button variant="outline" size="sm">Exportar</Button>,
  },
};

type Invoice = {
  id: string;
  number: string;
  status: 'paid' | 'pending';
  amount: string;
};

const invoices: Invoice[] = [
  { id: '1', number: 'F-2026-001', status: 'paid', amount: '1.240,00 €' },
  { id: '2', number: 'F-2026-002', status: 'pending', amount: '380,50 €' },
  { id: '3', number: 'F-2026-003', status: 'paid', amount: '12.900,00 €' },
];

const alignedColumns: ColumnDef<Invoice, unknown>[] = [
  { accessorKey: 'number', header: 'Factura' },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <Tag variant={row.original.status === 'paid' ? 'success' : 'neutral'}>
        {row.original.status === 'paid' ? 'Pagada' : 'Pendiente'}
      </Tag>
    ),
    meta: { align: 'center' },
  },
  { accessorKey: 'amount', header: 'Importe', meta: { align: 'end' } },
  {
    id: 'actions',
    header: 'Acciones',
    cell: () => (
      <Button variant="text" size="sm">Ver</Button>
    ),
    meta: { align: 'center' },
  },
];

const InvoiceTable = DataTable<Invoice, unknown>;

export const ColumnasAlineadas: StoryObj<typeof InvoiceTable> = {
  name: 'Columnas alineadas',
  args: { ariaLabel: 'Facturas' },
  render: (args) => (
    <InvoiceTable {...args} columns={alignedColumns} data={invoices} pageSize={5} />
  ),
};

export const Cargando: Story = {
  args: { columns, data: [], isLoading: true, pageSize: 5 },
};

export const Vacia: Story = {
  name: 'Sin resultados',
  args: { columns, data: [], emptyMessage: 'Todavía no hay miembros' },
};

export const PaginadaEnServidor: Story = {
  name: 'Paginada en servidor',
  args: { columns, data: data.slice(0, 5) },
  render: (args) => {
     
    const [page, setPage] = useState(1);
     
    const [query, setQuery] = useState('');
    const filtered = data.filter((m) =>
      m.name.toLowerCase().includes(query.toLowerCase()),
    );
    return (
      <MemberTable
        {...args}
        data={filtered.slice((page - 1) * 5, page * 5)}
        search={{ value: query, onChange: (value) => { setQuery(value); setPage(1); } }}
        searchPlaceholder="Buscar en el servidor…"
        pagination={{
          page,
          pageSize: 5,
          total: filtered.length,
          onPageChange: setPage,
        }}
      />
    );
  },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    columns,
    data,
    searchColumnId: 'name',
    searchPlaceholder: 'Buscar por nombre…',
    pageSize: 5,
  },
};

export const CargandoEnSuperficieOscura: Story = {
  name: 'Cargando en superficie oscura',
  parameters: { surface: 'dark' },
  args: { columns, data: [], isLoading: true, pageSize: 5 },
};
