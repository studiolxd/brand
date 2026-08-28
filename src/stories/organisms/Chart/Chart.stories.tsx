import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Chart } from './Chart';
import type { ChartDatum, ChartSeries } from './Chart';

/** Precio por millón de tokens de tres modelos, tal y como lo guarda aipricing. */
const PRECIOS: ChartDatum[] = [
  { mes: 'Ene', opus: 15, sonnet: 3, haiku: 0.8 },
  { mes: 'Feb', opus: 15, sonnet: 3, haiku: 0.8 },
  { mes: 'Mar', opus: 15, sonnet: 3, haiku: 1 },
  { mes: 'Abr', opus: 12, sonnet: 3, haiku: 1 },
  { mes: 'May', opus: 12, sonnet: 2.5, haiku: 1 },
  { mes: 'Jun', opus: 10, sonnet: 2.5, haiku: 1 },
  { mes: 'Jul', opus: 10, sonnet: 2.5, haiku: 1.2 },
  { mes: 'Ago', opus: 9, sonnet: 2, haiku: 1.2 },
];

const SERIES_PRECIOS: ChartSeries[] = [
  { key: 'opus', label: 'Opus' },
  { key: 'sonnet', label: 'Sonnet' },
  { key: 'haiku', label: 'Haiku' },
];

/** Uso mensual de un paquete SCORM: usuarios facturables, lanzamientos y finalizaciones. */
const USO_SCORM: ChartDatum[] = [
  { mes: 'Mar', facturables: 320, excluidos: 40 },
  { mes: 'Abr', facturables: 410, excluidos: 55 },
  { mes: 'May', facturables: 480, excluidos: 38 },
  { mes: 'Jun', facturables: 505, excluidos: 61 },
  { mes: 'Jul', facturables: 470, excluidos: 44 },
  { mes: 'Ago', facturables: 590, excluidos: 52 },
];

const SERIES_SCORM: ChartSeries[] = [
  { key: 'facturables', label: 'Usuarios facturables' },
  { key: 'excluidos', label: 'Usuarios excluidos' },
];

/** Reparto de bricks por tipo en un espacio de Bricks. */
const BRICKS: ChartDatum[] = [
  { tipo: 'Texto', bricks: 184 },
  { tipo: 'Imagen', bricks: 96 },
  { tipo: 'Vídeo', bricks: 54 },
  { tipo: 'Cuestionario', bricks: 41 },
  { tipo: 'Acordeón', bricks: 22 },
];

const SERIE_BRICKS: ChartSeries[] = [{ key: 'bricks', label: 'Bricks' }];

const euros = (value: number) => `${value.toLocaleString('es-ES', { minimumFractionDigits: 1 })} €`;

const meta = {
  title: 'Organisms/Chart',
  component: Chart,
  parameters: { layout: 'padded' },
  args: {
    type: 'line',
    data: PRECIOS,
    series: SERIES_PRECIOS,
    xKey: 'mes',
    ariaLabel: 'Precio por millón de tokens de tres modelos, de enero a agosto',
    title: 'Precio por millón de tokens',
    formatValue: euros,
  },
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linea: Story = {};

export const Area: Story = {
  args: {
    type: 'area',
    data: USO_SCORM,
    series: [SERIES_SCORM[0] as ChartSeries],
    xKey: 'mes',
    title: 'Usuarios facturables al mes',
    ariaLabel: 'Usuarios facturables por mes, de marzo a agosto',
    formatValue: undefined,
  },
};

export const AreaApilada: Story = {
  name: 'Área apilada',
  args: {
    type: 'area',
    stacked: true,
    data: USO_SCORM,
    series: SERIES_SCORM,
    xKey: 'mes',
    title: 'Usuarios del paquete, facturables y excluidos',
    ariaLabel: 'Usuarios facturables y excluidos por mes, apilados',
    formatValue: undefined,
  },
};

export const Barras: Story = {
  args: {
    type: 'bar',
    data: BRICKS,
    series: SERIE_BRICKS,
    xKey: 'tipo',
    title: 'Bricks por tipo',
    ariaLabel: 'Número de bricks por tipo en el espacio',
    formatValue: undefined,
  },
};

export const BarrasHorizontales: Story = {
  name: 'Barras horizontales',
  args: {
    type: 'bar',
    orientation: 'horizontal',
    data: BRICKS,
    series: SERIE_BRICKS,
    xKey: 'tipo',
    title: 'Bricks por tipo',
    ariaLabel: 'Número de bricks por tipo en el espacio',
    formatValue: undefined,
  },
};

export const BarrasApiladas: Story = {
  name: 'Barras apiladas',
  args: {
    type: 'bar',
    stacked: true,
    data: USO_SCORM,
    series: SERIES_SCORM,
    xKey: 'mes',
    title: 'Usuarios del paquete, facturables y excluidos',
    ariaLabel: 'Usuarios facturables y excluidos por mes, apilados',
    formatValue: undefined,
  },
};

export const BarrasAgrupadas: Story = {
  name: 'Barras agrupadas',
  args: {
    type: 'bar',
    data: USO_SCORM,
    series: SERIES_SCORM,
    xKey: 'mes',
    title: 'Usuarios del paquete, mes a mes',
    ariaLabel: 'Usuarios facturables y excluidos por mes, agrupados',
    formatValue: undefined,
  },
};

export const Tarta: Story = {
  args: {
    type: 'pie',
    data: BRICKS,
    series: SERIE_BRICKS,
    xKey: 'tipo',
    title: 'Reparto de bricks por tipo',
    ariaLabel: 'Reparto de bricks por tipo, en porcentaje',
    formatValue: undefined,
  },
};

export const Donut: Story = {
  args: {
    type: 'donut',
    data: BRICKS,
    series: SERIE_BRICKS,
    xKey: 'tipo',
    title: 'Reparto de bricks por tipo',
    caption: 'El centro lleva el total.',
    ariaLabel: 'Reparto de bricks por tipo, en porcentaje, con el total en el centro',
    formatValue: undefined,
  },
};

export const Enfasis: Story = {
  name: 'Énfasis',
  args: {
    emphasis: 'opus',
    title: 'Solo Opus baja de precio',
    caption: 'Una serie en color y el resto en gris: cuando la historia es una sola serie, esto y no ocho colores.',
  },
};

export const SinBocadillo: Story = {
  name: 'Sin bocadillo',
  args: {
    tooltip: false,
    valueLabels: 'extremes',
    caption: 'Sin capa de puntero, los valores extremos van rotulados sobre la propia línea.',
  },
};

export const Vacio: Story = {
  name: 'Vacío',
  args: { data: [], title: 'Precio por millón de tokens' },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    type: 'bar',
    data: USO_SCORM,
    series: SERIES_SCORM,
    xKey: 'mes',
    stacked: true,
    title: 'Usuarios del paquete, facturables y excluidos',
    ariaLabel: 'Usuarios facturables y excluidos por mes, apilados',
    formatValue: undefined,
  },
};

export const TestTablaEquivalente: Story = {
  name: 'Test — la tabla equivalente lleva todos los valores',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabla = canvas.getByRole('table', { name: 'Datos del gráfico' });
    expect(tabla).toBeInTheDocument();
    expect(within(tabla).getAllByRole('row')).toHaveLength(PRECIOS.length + 1);
    expect(within(tabla).getByRole('columnheader', { name: 'Opus' })).toBeInTheDocument();
    expect(within(tabla).getByRole('rowheader', { name: 'Ago' })).toBeInTheDocument();
  },
};

export const TestNombreAccesible: Story = {
  name: 'Test — el lienzo tiene nombre accesible y es explorable con el teclado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lienzo = canvas.getByRole('img', { name: meta.args.ariaLabel });
    expect(lienzo).toHaveAttribute('tabindex', '0');
  },
};

export const TestVacio: Story = {
  name: 'Test — sin datos no se dibuja nada',
  tags: ['!dev'],
  args: { data: [] },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Sin datos que mostrar')).toBeInTheDocument();
    expect(canvas.queryByRole('img')).not.toBeInTheDocument();
  },
};
