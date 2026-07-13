import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Table } from './Table';

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/**
 * Test: `data-*`/`aria-*` + `className` aterrizan en `<table>`, `data-*` en `<tbody>`
 * (Head/Body/Footer), y sin `caption` no se renderiza `<caption>`.
 */
export const PropPassthrough: Story = {
  name: 'Test — rest-spread + caption opcional',
  render: () => (
    <Table aria-label="Proyectos" data-slot="table" className="extra">
      <Table.Body data-slot="tbody">
        <Table.Row>
          <Table.Cell>Uno</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('table')!;
    await expect(table).toHaveClass('table', 'extra');
    await expect(table.className.trim().endsWith('extra')).toBe(true);
    await expect(table).toHaveAttribute('data-slot', 'table');
    await expect(table).toHaveAttribute('aria-label', 'Proyectos');
    // sin caption → no se renderiza <caption>
    await expect(canvasElement.querySelector('caption')).toBeNull();
    // rest en la sección Body
    await expect(canvasElement.querySelector('tbody')).toHaveAttribute('data-slot', 'tbody');
    // sanity: el contenido sigue ahí
    await expect(within(canvasElement).getByText('Uno')).toBeInTheDocument();
  },
};

const PROYECTOS = [
  { nombre: 'Virtualización Rise Cofidis', cliente: 'Cofidis', fecha: '15/05/2026', estado: 'Activo' },
  { nombre: 'Rediseño portal B2B', cliente: 'Mapfre', fecha: '10/04/2026', estado: 'En revisión' },
  { nombre: 'App móvil inversiones', cliente: 'Caixabank', fecha: '01/03/2026', estado: 'Entregado' },
  { nombre: 'Dashboard analítica', cliente: 'Telefónica', fecha: '20/02/2026', estado: 'Activo' },
];

export const Default: Story = {
  render: () => (
    <Table caption="Listado de proyectos">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>Estado</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Cell>{p.nombre}</Table.Cell>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.estado}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};

type SortDir = 'asc' | 'desc' | false;

export const ConSorting: Story = {
  render: () => {
    const [sortCol, setSortCol] = useState<'nombre' | 'cliente' | 'fecha' | null>(null);
    const [sortDir, setSortDir] = useState<SortDir>(false);

    function handleSort(col: 'nombre' | 'cliente' | 'fecha') {
      if (sortCol === col) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? false : 'asc'));
        if (sortDir === 'desc') setSortCol(null);
      } else {
        setSortCol(col);
        setSortDir('asc');
      }
    }

    function getSorted(col: 'nombre' | 'cliente' | 'fecha'): SortDir {
      return sortCol === col ? sortDir : false;
    }

    return (
      <Table caption="Listado de proyectos con ordenación">
        <Table.Head>
          <Table.Row>
            <Table.Header sortable sorted={getSorted('nombre')} onSort={() => handleSort('nombre')}>
              Nombre
            </Table.Header>
            <Table.Header sortable sorted={getSorted('cliente')} onSort={() => handleSort('cliente')}>
              Cliente
            </Table.Header>
            <Table.Header sortable sorted={getSorted('fecha')} onSort={() => handleSort('fecha')}>
              Fecha
            </Table.Header>
            <Table.Header>Estado</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {PROYECTOS.map((p) => (
            <Table.Row key={p.nombre}>
              <Table.Cell>{p.nombre}</Table.Cell>
              <Table.Cell>{p.cliente}</Table.Cell>
              <Table.Cell>{p.fecha}</Table.Cell>
              <Table.Cell>{p.estado}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

export const ConFilasInteractivas: Story = {
  render: () => {
    const [seleccionado, setSeleccionado] = useState<string | null>(null);

    return (
      <div>
        {seleccionado && (
          <p style={{ marginBottom: '1rem', fontFamily: 'var(--font-family-sans)', fontSize: '0.875rem' }}>
            Proyecto seleccionado: <strong>{seleccionado}</strong>
          </p>
        )}
        <Table caption="Listado de proyectos — filas interactivas">
          <Table.Head>
            <Table.Row>
              <Table.Header>Nombre</Table.Header>
              <Table.Header>Cliente</Table.Header>
              <Table.Header>Fecha</Table.Header>
              <Table.Header>Estado</Table.Header>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {PROYECTOS.map((p) => (
              <Table.Row key={p.nombre} onClick={() => setSeleccionado(p.nombre)}>
                <Table.Cell>{p.nombre}</Table.Cell>
                <Table.Cell>{p.cliente}</Table.Cell>
                <Table.Cell>{p.fecha}</Table.Cell>
                <Table.Cell>{p.estado}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  },
};

export const ConFooterYColspan: Story = {
  name: 'Con Footer y colSpan',
  render: () => (
    <Table caption="Resumen de proyectos con totales">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>Estado</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Header scope="row">{p.nombre}</Table.Header>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.estado}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3}>Total proyectos</Table.Cell>
          <Table.Cell>{PROYECTOS.length}</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  ),
};

export const Sm: Story = {
  render: () => (
    <Table caption="Listado compacto de proyectos" size="sm">
      <Table.Head>
        <Table.Row>
          <Table.Header>Nombre</Table.Header>
          <Table.Header>Cliente</Table.Header>
          <Table.Header>Fecha</Table.Header>
          <Table.Header>Estado</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {PROYECTOS.map((p) => (
          <Table.Row key={p.nombre}>
            <Table.Cell>{p.nombre}</Table.Cell>
            <Table.Cell>{p.cliente}</Table.Cell>
            <Table.Cell>{p.fecha}</Table.Cell>
            <Table.Cell>{p.estado}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  ),
};
