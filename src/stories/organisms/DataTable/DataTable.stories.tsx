import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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

/**
 * Las acciones del pie van pegadas al selector de registros por página —el
 * grupo de la izquierda, con el total—; los botones de página se quedan solos
 * al otro extremo.
 */
export const AccionesEnElPie: Story = {
  name: 'Acciones en el pie',
  args: {
    columns,
    data,
    footerActions: <Button variant="outline" size="sm">Exportar</Button>,
  },
  render: (args) => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    return (
      <MemberTable
        {...args}
        data={data.slice((page - 1) * pageSize, page * pageSize)}
        pagination={{
          page,
          pageSize,
          total: data.length,
          onPageChange: setPage,
          onPageSizeChange: (size) => {
            setPageSize(size === 'all' ? data.length : Number(size));
            setPage(1);
          },
        }}
      />
    );
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
    meta: { align: 'center', headerHidden: true },
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

// La columna de acciones, tal y como se escribe siempre: centrada y con el
// rótulo solo para lectores de pantalla.
const columnsConAcciones: ColumnDef<Member, unknown>[] = [
  ...columns,
  {
    id: 'actions',
    header: 'Acciones',
    enableSorting: false,
    cell: () => (
      <Button variant="text" size="sm">Editar</Button>
    ),
    meta: { align: 'center', headerHidden: true },
  },
];

/**
 * La columna de acciones no enseña su rótulo: los botones ya dicen lo que
 * hacen, y «Acciones» solo ocupaba sitio en la cabecera. Con
 * `meta: { headerHidden: true }` el `header` se sigue pintando —dentro de
 * `VisuallyHidden`—, así que la columna conserva su nombre para quien lee con
 * lector de pantalla y su celda de cabecera sigue en la fila con su
 * alineación.
 */
export const AccionesSinRotulo: Story = {
  name: 'Acciones sin rótulo',
  args: { columns: columnsConAcciones, data: data.slice(0, 4), pageSize: 5 },
};

/** Test: el rótulo no se ve, pero sigue nombrando la columna. */
export const ContratoAccionesSinRotulo: Story = {
  name: 'Test — el rótulo de acciones solo lo leen los lectores de pantalla',
  tags: ['!dev'],
  args: { columns: columnsConAcciones, data: data.slice(0, 4), pageSize: 5 },
  play: async ({ canvasElement }) => {
    const cabeceras = canvasElement.querySelectorAll('thead th');
    // La celda de cabecera sigue ahí: una por columna, acciones incluida.
    await expect(cabeceras).toHaveLength(4);

    const acciones = cabeceras[3] as HTMLElement;
    await expect(acciones.textContent).toContain('Acciones');
    // Y no ocupa: el texto está en un nodo de 1×1 px fuera de la vista.
    const rotulo = acciones.querySelector('.visually-hidden') as HTMLElement;
    await expect(rotulo).not.toBeNull();
    await expect(rotulo.getBoundingClientRect().height).toBeLessThan(2);
    // La alineación de la columna se conserva.
    await expect(acciones.classList.contains('data-table__header-cell--center')).toBe(true);
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

type WideRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  location: string;
  startDate: string;
  status: string;
  manager: string;
};

const wideData: WideRow[] = NAMES.map((name, index) => ({
  id: String(index),
  name,
  email: `${name.toLowerCase().replace(/\s+/g, '.')}@studiolxd.com`,
  role: index === 0 ? 'Propietario' : 'Miembro',
  department: 'Ingeniería',
  location: 'Madrid',
  startDate: '01/01/2024',
  status: 'Activo',
  manager: 'Ada Lovelace',
}));

// La columna de acciones se escribe siempre así: `align: 'center'`,
// `headerHidden: true` y, cuando la tabla puede desbordar, `sticky: 'end'`.
const wideColumns: ColumnDef<WideRow, unknown>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'email', header: 'Correo' },
  { accessorKey: 'role', header: 'Rol' },
  { accessorKey: 'department', header: 'Departamento' },
  { accessorKey: 'location', header: 'Ubicación' },
  { accessorKey: 'startDate', header: 'Fecha de alta' },
  { accessorKey: 'status', header: 'Estado' },
  { accessorKey: 'manager', header: 'Responsable' },
  {
    id: 'actions',
    header: 'Acciones',
    cell: () => <Button variant="text" size="sm">Editar</Button>,
    meta: { align: 'center', headerHidden: true, sticky: 'end' },
  },
];

const WideTable = DataTable<WideRow, unknown>;

/**
 * Con muchas columnas la tabla mide más que su contenedor: la columna de
 * acciones se queda pegada al borde final con scroll horizontal, en vez de
 * caer fuera del recorte del wrapper sin barra de scroll visible (macOS).
 */
export const MuchasColumnas: StoryObj<typeof WideTable> = {
  name: 'Muchas columnas',
  args: { ariaLabel: 'Miembros del equipo, muchas columnas' },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <WideTable {...args} columns={wideColumns} data={wideData} pageSize={5} />
    </div>
  ),
};

/** Test: con scroll a 0, la celda de acciones está dentro del viewport del wrapper. */
export const ContratoColumnaDeAccionesPegajosa: StoryObj<typeof WideTable> = {
  name: 'Test — la columna de acciones pegajosa queda dentro del viewport',
  tags: ['!dev'],
  args: { ariaLabel: 'Miembros del equipo, muchas columnas' },
  render: (args) => (
    <div style={{ maxWidth: '480px' }}>
      <WideTable {...args} columns={wideColumns} data={wideData} pageSize={5} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.table__wrapper') as HTMLElement;
    await expect(wrapper).not.toBeNull();
    // La tabla desborda de verdad: si no, el contrato no prueba nada.
    const table = wrapper.querySelector('table') as HTMLElement;
    await expect(table.scrollWidth).toBeGreaterThan(wrapper.clientWidth);

    wrapper.scrollLeft = 0;
    const accionesCell = wrapper.querySelector('.table__cell--sticky') as HTMLElement;
    await expect(accionesCell).not.toBeNull();
    const wrapperRect = wrapper.getBoundingClientRect();
    const cellRect = accionesCell.getBoundingClientRect();
    await expect(cellRect.right).toBeLessThanOrEqual(wrapperRect.right + 1);
    await expect(cellRect.left).toBeGreaterThanOrEqual(wrapperRect.left);
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

/** Test: las acciones del pie van tras el selector, y el paginador, solo. */
export const ContratoAccionesTrasElSelector: Story = {
  name: 'Test — las acciones van tras el selector de página',
  tags: ['!dev'],
  args: {
    columns,
    data,
    footerActions: <Button variant="outline" size="sm">Exportar</Button>,
  },
  render: (args) => (
    <MemberTable
      {...args}
      data={data.slice(0, 5)}
      pagination={{
        page: 1,
        pageSize: 5,
        total: data.length,
        onPageChange: () => {},
        onPageSizeChange: () => {},
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const meta = canvasElement.querySelector('.pagination__meta') as HTMLElement;
    const selector = meta.querySelector('.pagination__size-selector') as HTMLElement;
    const acciones = meta.querySelector('.pagination__after-page-size') as HTMLElement;
    await expect(selector).not.toBeNull();
    await expect(acciones).not.toBeNull();
    // Hermanas y en ese orden: el selector primero, las acciones justo detrás.
    await expect(selector.nextElementSibling).toBe(acciones);
    await expect(acciones.textContent).toContain('Exportar');

    // Y el paginador, solo al otro extremo.
    const controles = canvasElement.querySelector('.pagination__controls') as HTMLElement;
    await expect(controles.getBoundingClientRect().left)
      .toBeGreaterThan(acciones.getBoundingClientRect().right);
  },
};
