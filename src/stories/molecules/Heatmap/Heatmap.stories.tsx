import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Heatmap, type HeatmapCell, type HeatmapColumn, type HeatmapRow } from './Heatmap';
import { Link } from '../../atoms/Link/Link';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Molecules/Heatmap',
  component: Heatmap,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Heatmap>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Competencias por persona ───────────────────────────────────────────────
   Niveles de 0 a 4, el dominio del catálogo de competencias. Las columnas van
   agrupadas por categoría. */

const PERSONAS: HeatmapRow[] = [
  { id: 'p1', label: <Link href="#alicia" tone="ink">Alicia Benítez</Link> },
  { id: 'p2', label: <Link href="#ignacio" tone="ink">Ignacio Puente</Link> },
  { id: 'p3', label: <Link href="#nuria" tone="ink">Nuria Oliva</Link> },
  { id: 'p4', label: <Link href="#julio" tone="ink">Julio Vidal</Link> },
  { id: 'p5', label: <Link href="#marta" tone="ink">Marta Ferrer</Link> },
];

const COMPETENCIAS: HeatmapColumn[] = [
  { key: 'react', label: 'React', group: 'Front' },
  { key: 'css', label: 'CSS', group: 'Front' },
  { key: 'a11y', label: 'A11y', group: 'Front' },
  { key: 'node', label: 'Node', group: 'Back' },
  { key: 'sql', label: 'SQL', group: 'Back' },
  { key: 'k8s', label: 'K8s', group: 'Infra' },
  { key: 'ci', label: 'CI/CD', group: 'Infra' },
];

const NIVELES: HeatmapCell[] = [
  { rowId: 'p1', columnKey: 'react', value: 4 }, { rowId: 'p1', columnKey: 'css', value: 3 },
  { rowId: 'p1', columnKey: 'a11y', value: 4 }, { rowId: 'p1', columnKey: 'node', value: 2 },
  { rowId: 'p1', columnKey: 'sql', value: 1 },  { rowId: 'p1', columnKey: 'k8s', value: 0 },
  { rowId: 'p1', columnKey: 'ci', value: 2 },

  { rowId: 'p2', columnKey: 'react', value: 2 }, { rowId: 'p2', columnKey: 'css', value: 1 },
  { rowId: 'p2', columnKey: 'a11y', value: 1 }, { rowId: 'p2', columnKey: 'node', value: 4 },
  { rowId: 'p2', columnKey: 'sql', value: 4 },  { rowId: 'p2', columnKey: 'k8s', value: 3 },
  { rowId: 'p2', columnKey: 'ci', value: 4 },

  { rowId: 'p3', columnKey: 'react', value: 3 }, { rowId: 'p3', columnKey: 'css', value: 4 },
  { rowId: 'p3', columnKey: 'a11y', value: 3 }, { rowId: 'p3', columnKey: 'node', value: 3 },
  { rowId: 'p3', columnKey: 'sql', value: 2 },  { rowId: 'p3', columnKey: 'k8s', value: 1 },
  { rowId: 'p3', columnKey: 'ci', value: 2 },

  { rowId: 'p4', columnKey: 'react', value: 1 }, { rowId: 'p4', columnKey: 'css', value: 2 },
  { rowId: 'p4', columnKey: 'node', value: 2 }, { rowId: 'p4', columnKey: 'sql', value: 3 },
  { rowId: 'p4', columnKey: 'k8s', value: 4 },  { rowId: 'p4', columnKey: 'ci', value: 3 },

  { rowId: 'p5', columnKey: 'react', value: 0 }, { rowId: 'p5', columnKey: 'css', value: 1 },
  { rowId: 'p5', columnKey: 'a11y', value: 2 }, { rowId: 'p5', columnKey: 'node', value: 0 },
  { rowId: 'p5', columnKey: 'sql', value: 1 },  { rowId: 'p5', columnKey: 'ci', value: 1 },
];

export const PorDefecto: Story = {
  args: {
    rows: PERSONAS,
    columns: COMPETENCIAS,
    cells: NIVELES,
    min: 0,
    max: 4,
    rowHeader: 'Persona',
    label: 'Competencias del equipo de plataforma',
    minLabel: 'Sin experiencia',
    maxLabel: 'Referente',
  },
};

/* ── Cobertura por puesto ───────────────────────────────────────────────────
   El mismo componente con un dominio de porcentaje y sin grupos. */

const PUESTOS: HeatmapRow[] = [
  { id: 'q1', label: 'Desarrollo front' },
  { id: 'q2', label: 'Desarrollo back' },
  { id: 'q3', label: 'Diseño de producto' },
  { id: 'q4', label: 'Soporte N2' },
];

const TRIMESTRES: HeatmapColumn[] = [
  { key: 't1', label: 'T1' },
  { key: 't2', label: 'T2' },
  { key: 't3', label: 'T3' },
  { key: 't4', label: 'T4' },
];

const COBERTURA: HeatmapCell[] = [
  { rowId: 'q1', columnKey: 't1', value: 100 }, { rowId: 'q1', columnKey: 't2', value: 92 },
  { rowId: 'q1', columnKey: 't3', value: 75 },  { rowId: 'q1', columnKey: 't4', value: 60 },
  { rowId: 'q2', columnKey: 't1', value: 80 },  { rowId: 'q2', columnKey: 't2', value: 80 },
  { rowId: 'q2', columnKey: 't3', value: 100 }, { rowId: 'q2', columnKey: 't4', value: 100 },
  { rowId: 'q3', columnKey: 't1', value: 50 },  { rowId: 'q3', columnKey: 't2', value: 50 },
  { rowId: 'q3', columnKey: 't3', value: 25 },  { rowId: 'q3', columnKey: 't4', value: null },
  { rowId: 'q4', columnKey: 't1', value: 33 },  { rowId: 'q4', columnKey: 't2', value: 66 },
  { rowId: 'q4', columnKey: 't3', value: 66 },  { rowId: 'q4', columnKey: 't4', value: 100 },
];

export const Cobertura: Story = {
  args: {
    rows: PUESTOS,
    columns: TRIMESTRES,
    cells: COBERTURA,
    min: 0,
    max: 100,
    rowHeader: 'Puesto',
    label: 'Cobertura de puestos por trimestre',
    formatValue: (v) => `${v} %`,
  },
};

export const SeisPasos: Story = {
  name: 'La rampa entera',
  args: { ...Cobertura.args, steps: 6, label: 'Cobertura de puestos por trimestre' },
};

export const SinCifras: Story = {
  name: 'Sin cifras a la vista',
  args: { ...PorDefecto.args, showValues: false },
};

export const SinLeyenda: Story = {
  name: 'Sin leyenda',
  args: { ...PorDefecto.args, showLegend: false },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { ...PorDefecto.args },
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

export const TestCasillaSinDato: Story = {
  name: 'Test — la casilla sin dato se lee',
  tags: ['!dev'],
  args: { ...Cobertura.args },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabla = canvas.getByRole('table', { name: 'Cobertura de puestos por trimestre' });
    // La casilla sin dato dice que no lo tiene; no se confunde con un 0 %.
    expect(within(tabla).getByText('sin dato')).toBeInTheDocument();
    expect(within(tabla).getAllByRole('rowheader')).toHaveLength(4);
  },
};
