import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { PlanningGrid, type PlanningGridCell, type PlanningGridColumn, type PlanningGridRow } from './PlanningGrid';
import { Link } from '../../atoms/Link/Link';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Organisms/PlanningGrid',
  component: PlanningGrid,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof PlanningGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Proyecto × semana ──────────────────────────────────────────────────────
   La rejilla de planificación: los proyectos en las filas y las semanas en las
   columnas, con las horas disponibles de cada semana al pie. */

const PROYECTOS: PlanningGridRow[] = [
  { id: 'pr1', name: 'Portal de facturación', label: <Link href="#pr1" tone="ink">Portal de facturación</Link> },
  { id: 'pr2', name: 'Migración a Keycloak', label: <Link href="#pr2" tone="ink">Migración a Keycloak</Link> },
  { id: 'pr3', name: 'App de fichajes', label: <Link href="#pr3" tone="ink">App de fichajes</Link> },
  { id: 'pr4', name: 'Rediseño de la web', label: <Link href="#pr4" tone="ink">Rediseño de la web</Link>, readOnly: true },
];

const SEMANAS: PlanningGridColumn[] = [
  { key: 's10', name: 'Semana 10', label: 'S10', sublabel: '2–8 mar', capacity: 38.5, readOnly: true },
  { key: 's11', name: 'Semana 11', label: 'S11', sublabel: '9–15 mar', capacity: 38.5, current: true },
  { key: 's12', name: 'Semana 12', label: 'S12', sublabel: '16–22 mar', capacity: 38.5 },
  { key: 's13', name: 'Semana 13', label: 'S13', sublabel: '23–29 mar', capacity: 30 },
  { key: 's14', name: 'Semana 14', label: 'S14', sublabel: '30 mar–5 abr', capacity: 38.5 },
];

const HORAS: PlanningGridCell[] = [
  { rowId: 'pr1', columnKey: 's10', value: 16 },
  { rowId: 'pr1', columnKey: 's11', value: 20 },
  { rowId: 'pr1', columnKey: 's12', value: 12 },
  { rowId: 'pr1', columnKey: 's13', value: 8 },
  { rowId: 'pr2', columnKey: 's10', value: 12 },
  { rowId: 'pr2', columnKey: 's11', value: 12 },
  { rowId: 'pr2', columnKey: 's12', value: 16 },
  { rowId: 'pr2', columnKey: 's14', value: 20 },
  { rowId: 'pr3', columnKey: 's11', value: 10.5 },
  { rowId: 'pr3', columnKey: 's12', value: 14 },
  { rowId: 'pr3', columnKey: 's13', value: 24 },
  { rowId: 'pr4', columnKey: 's10', value: 8 },
  { rowId: 'pr4', columnKey: 's14', value: 8 },
];

/** Igual que la pantalla que la monta: las celdas las guarda quien la usa. */
function Rejilla({
  inicial = HORAS,
  ...props
}: { inicial?: PlanningGridCell[] } & Partial<React.ComponentProps<typeof PlanningGrid>>) {
  const [cells, setCells] = useState(inicial);
  return (
    <PlanningGrid
      rows={PROYECTOS}
      columns={SEMANAS}
      rowHeader="Proyecto"
      label="Planificación de Nuria Oliva"
      {...props}
      cells={cells}
      onCellChange={(rowId, columnKey, value) =>
        setCells((previas) => [
          ...previas.filter((c) => !(c.rowId === rowId && c.columnKey === columnKey)),
          { rowId, columnKey, value },
        ])
      }
    />
  );
}

export const PorDefecto: Story = {
  args: { rows: PROYECTOS, columns: SEMANAS, cells: HORAS },
  render: () => <Rejilla />,
};

export const ConDisponibilidad: Story = {
  name: 'Con las horas disponibles',
  args: { rows: PROYECTOS, columns: SEMANAS, cells: HORAS },
  render: () => <Rejilla showCapacity />,
};

export const SoloLectura: Story = {
  name: 'Solo lectura',
  args: { rows: PROYECTOS, columns: SEMANAS, cells: HORAS },
  render: () => (
    <PlanningGrid
      rows={PROYECTOS}
      columns={SEMANAS}
      cells={HORAS}
      rowHeader="Proyecto"
      label="Planificación de Nuria Oliva"
      readOnly
    />
  ),
};

export const ConCambioEnVueloYError: Story = {
  name: 'Con un cambio en vuelo y un error',
  args: { rows: PROYECTOS, columns: SEMANAS, cells: HORAS },
  render: () => (
    <PlanningGrid
      rows={PROYECTOS}
      columns={SEMANAS}
      rowHeader="Proyecto"
      label="Planificación de Nuria Oliva"
      onCellChange={() => {}}
      cells={HORAS.map((c) => {
        if (c.rowId === 'pr2' && c.columnKey === 's12') return { ...c, pending: true };
        if (c.rowId === 'pr3' && c.columnKey === 's13') return { ...c, error: 'El proyecto está cerrado en esa semana' };
        return c;
      })}
    />
  ),
};

/* ── Persona × día ──────────────────────────────────────────────────────────
   La misma rejilla con el otro eje: la dedicación diaria de un equipo. */

const PERSONAS: PlanningGridRow[] = [
  { id: 'e1', name: 'Alicia Benítez' },
  { id: 'e2', name: 'Ignacio Puente' },
  { id: 'e3', name: 'Nuria Oliva' },
];

const DIAS: PlanningGridColumn[] = [
  { key: 'd16', name: 'Lunes 16', label: 'Lun', sublabel: '16', capacity: 8 },
  { key: 'd17', name: 'Martes 17', label: 'Mar', sublabel: '17', capacity: 8 },
  { key: 'd18', name: 'Miércoles 18', label: 'Mié', sublabel: '18', capacity: 8, current: true },
  { key: 'd19', name: 'Jueves 19', label: 'Jue', sublabel: '19', capacity: 8 },
  { key: 'd20', name: 'Viernes 20', label: 'Vie', sublabel: '20', capacity: 6.5 },
  { key: 'd21', name: 'Sábado 21', label: 'Sáb', sublabel: '21', readOnly: true },
];

const DEDICACION: PlanningGridCell[] = [
  { rowId: 'e1', columnKey: 'd16', value: 8 }, { rowId: 'e1', columnKey: 'd17', value: 8 },
  { rowId: 'e1', columnKey: 'd18', value: 4 }, { rowId: 'e1', columnKey: 'd19', value: 8 },
  { rowId: 'e2', columnKey: 'd16', value: 6 }, { rowId: 'e2', columnKey: 'd17', value: 8 },
  { rowId: 'e2', columnKey: 'd18', value: 8 }, { rowId: 'e2', columnKey: 'd20', value: 6.5 },
  { rowId: 'e3', columnKey: 'd16', value: 2 }, { rowId: 'e3', columnKey: 'd18', value: 8 },
];

export const PersonaPorDia: Story = {
  name: 'Persona × día, con una columna pasada',
  args: { rows: PERSONAS, columns: DIAS, cells: DEDICACION },
  render: () => (
    <PlanningGrid
      rows={PERSONAS}
      columns={DIAS}
      cells={DEDICACION}
      rowHeader="Persona"
      label="Dedicación al Portal de facturación"
      showCapacity
      onCellChange={() => {}}
    />
  ),
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { rows: PROYECTOS, columns: SEMANAS, cells: HORAS },
  render: () => <Rejilla showCapacity />,
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

export const TestEscribirHoras: Story = {
  name: 'Test — escribir unas horas actualiza los totales',
  tags: ['!dev'],
  args: { rows: PROYECTOS, columns: SEMANAS, cells: HORAS },
  render: () => <Rejilla />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByRole('textbox', { name: 'Horas de App de fichajes en Semana 14' });
    await userEvent.clear(campo);
    await userEvent.type(campo, '7,5');
    await userEvent.tab();
    // El total de la fila pasa de 48,5 a 56 h.
    expect(canvas.getByText('56 h')).toBeInTheDocument();
  },
};
