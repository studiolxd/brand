import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

type Row = { id: string; name: string; email: string };

const columns: ColumnDef<Row, unknown>[] = [
  { accessorKey: 'name', header: 'Nombre' },
  { accessorKey: 'email', header: 'Correo' },
];

const data: Row[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i),
  name: `Persona ${String(i).padStart(2, '0')}`,
  email: `persona${i}@studiolxd.com`,
}));

describe('DataTable', () => {
  it('pagina en cliente las filas que recibe', () => {
    render(<DataTable columns={columns} data={data} pageSize={5} />);
    expect(screen.getAllByRole('row')).toHaveLength(6); // 1 cabecera + 5 filas
    expect(screen.getByText('Persona 00')).toBeInTheDocument();
    expect(screen.queryByText('Persona 05')).not.toBeInTheDocument();
  });

  it('filtra por la columna del buscador por defecto', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={data}
        searchColumnId="name"
        searchPlaceholder="Buscar"
        pageSize={20}
      />,
    );
    await user.type(screen.getByRole('textbox', { name: 'Buscar' }), 'Persona 07');
    expect(screen.getByText('Persona 07')).toBeInTheDocument();
    expect(screen.queryByText('Persona 00')).not.toBeInTheDocument();
  });

  it('delega el buscador cuando está controlado desde fuera', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={data}
        search={{ value: '', onChange }}
        searchPlaceholder="Buscar"
      />,
    );
    await user.type(screen.getByRole('textbox', { name: 'Buscar' }), 'a');
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('el aspa del buscador vacía el filtro y devuelve el foco', async () => {
    const user = userEvent.setup();
    render(
      <DataTable
        columns={columns}
        data={data}
        searchColumnId="name"
        searchPlaceholder="Buscar"
        pageSize={20}
      />,
    );
    const campo = screen.getByRole('textbox', { name: 'Buscar' });
    await user.type(campo, 'Persona 07');
    expect(screen.queryByText('Persona 00')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Borrar' }));
    expect(campo).toHaveValue('');
    expect(campo).toHaveFocus();
    expect(screen.getByText('Persona 00')).toBeInTheDocument();
  });

  it('ordena al activar una cabecera ordenable', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={data} pageSize={20} />);
    // La cabecera ordenable es un <button> dentro del <th>: el estado vive en
    // el aria-sort de la celda y el nombre del botón es solo el rótulo.
    const boton = screen.getByRole('button', { name: 'Nombre' });
    expect(screen.getByRole('columnheader', { name: /Nombre/ })).toHaveAttribute(
      'aria-sort',
      'none',
    );
    await user.click(boton);
    const rows = screen.getAllByRole('row').slice(1);
    expect(within(rows[0]!).getByText('Persona 00')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Nombre/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );
    await user.click(boton);
    const reversed = screen.getAllByRole('row').slice(1);
    expect(within(reversed[0]!).getByText('Persona 11')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Nombre/ })).toHaveAttribute(
      'aria-sort',
      'descending',
    );
  });

  it('muestra el estado vacío con su mensaje', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="Nada por aquí" />);
    expect(screen.getByText('Nada por aquí')).toBeInTheDocument();
  });

  it('muestra filas de esqueleto mientras carga, ocultas a lectores de pantalla', () => {
    const { baseElement } = render(
      <DataTable columns={columns} data={[]} isLoading pageSize={4} />,
    );
    expect(baseElement.querySelectorAll('.skeleton')).toHaveLength(8); // 4 filas × 2 columnas
    expect(screen.queryByText('Sin resultados')).not.toBeInTheDocument();
  });

  it('con paginación en servidor no vuelve a recortar la página recibida', () => {
    const onPageChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={data.slice(0, 8)}
        pagination={{ page: 2, pageSize: 8, total: 40, onPageChange }}
      />,
    );
    expect(screen.getAllByRole('row')).toHaveLength(9); // 1 cabecera + las 8 recibidas
  });

  it('reenvía las etiquetas accesibles a la paginación', () => {
    render(
      <DataTable
        columns={columns}
        data={data}
        pageSize={5}
        paginationLabels={{ ariaLabel: 'Paging' }}
      />,
    );
    expect(screen.getByRole('navigation', { name: 'Paging' })).toBeInTheDocument();
  });
});
