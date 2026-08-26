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
  title: 'Por revisar/Organisms/DataTable',
  component: MemberTable,
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
