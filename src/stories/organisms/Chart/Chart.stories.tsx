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

/** Recorrido de una matriculación, del primer contacto a la finalización. */
const EMBUDO: ChartDatum[] = [
  { paso: 'Visitas', personas: 4200 },
  { paso: 'Registros', personas: 1480 },
  { paso: 'Matrículas', personas: 640 },
  { paso: 'Empezaron', personas: 512 },
  { paso: 'Finalizaron', personas: 318 },
];

const SERIE_EMBUDO: ChartSeries[] = [{ key: 'personas', label: 'Personas' }];

/** Horas de dedicación por área en un trimestre. */
const DEDICACION: ChartDatum[] = [
  { area: 'Diseño instruccional', horas: 420 },
  { area: 'Producción', horas: 310 },
  { area: 'Desarrollo', horas: 260 },
  { area: 'Gestión', horas: 150 },
  { area: 'Soporte', horas: 90 },
];

const SERIE_DEDICACION: ChartSeries[] = [{ key: 'horas', label: 'Horas' }];

/** Tiempo dedicado frente a nota obtenida, alumno a alumno. */
const RENDIMIENTO: ChartDatum[] = [
  { minutos: 25, nota: 4.1 }, { minutos: 40, nota: 5.2 }, { minutos: 55, nota: 5.8 },
  { minutos: 70, nota: 6.9 }, { minutos: 85, nota: 6.4 }, { minutos: 100, nota: 7.8 },
  { minutos: 115, nota: 8.1 }, { minutos: 130, nota: 7.5 }, { minutos: 150, nota: 9.2 },
];

const SERIE_RENDIMIENTO: ChartSeries[] = [{ key: 'nota', label: 'Nota' }];

/** Competencias evaluadas al empezar y al terminar el itinerario. */
const COMPETENCIAS: ChartDatum[] = [
  { competencia: 'Análisis', antes: 3, despues: 7 },
  { competencia: 'Diseño', antes: 4, despues: 8 },
  { competencia: 'Producción', antes: 2, despues: 6 },
  { competencia: 'Evaluación', antes: 3, despues: 7 },
  { competencia: 'Accesibilidad', antes: 2, despues: 8 },
];

const SERIES_COMPETENCIAS: ChartSeries[] = [
  { key: 'antes', label: 'Al empezar' },
  { key: 'despues', label: 'Al terminar' },
];

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

export const Embudo: Story = {
  args: {
    type: 'funnel',
    data: EMBUDO,
    series: SERIE_EMBUDO,
    xKey: 'paso',
    title: 'Del primer contacto a la finalización',
    ariaLabel: 'Embudo de matriculación: visitas, registros, matrículas, empezaron y finalizaron',
    formatValue: undefined,
  },
};

export const Treemap: Story = {
  args: {
    type: 'treemap',
    data: DEDICACION,
    series: SERIE_DEDICACION,
    xKey: 'area',
    title: 'Dedicación por área',
    caption: 'El área de cada baldosa es su parte del total.',
    ariaLabel: 'Reparto de horas de dedicación por área, por superficie',
    formatValue: undefined,
  },
};

export const BarraRadial: Story = {
  name: 'Barra radial',
  args: {
    type: 'radial-bar',
    data: DEDICACION,
    series: SERIE_DEDICACION,
    xKey: 'area',
    title: 'Dedicación por área',
    caption: 'Cada anillo se compara con el mayor, no con el total.',
    ariaLabel: 'Horas de dedicación por área, en anillos concéntricos',
    formatValue: undefined,
  },
};

export const Dispersion: Story = {
  name: 'Dispersión',
  args: {
    type: 'scatter',
    data: RENDIMIENTO,
    series: SERIE_RENDIMIENTO,
    xKey: 'minutos',
    title: 'Tiempo dedicado y nota obtenida',
    caption: 'Los dos ejes son numéricos: cada punto es un alumno.',
    ariaLabel: 'Relación entre minutos dedicados y nota obtenida, alumno a alumno',
    formatValue: undefined,
  },
};

export const Radar: Story = {
  args: {
    type: 'radar',
    data: COMPETENCIAS,
    series: SERIES_COMPETENCIAS,
    xKey: 'competencia',
    title: 'Competencias antes y después',
    ariaLabel: 'Competencias evaluadas al empezar y al terminar el itinerario',
    formatValue: undefined,
  },
};

/**
 * Cuando el color **es dato** —el que eligió el autor de un contenido desde la
 * paleta de su tema— se pasa en `colors`, en literales. La interfaz del sistema
 * sigue usando las ranuras de token.
 */
export const ColorPorDato: Story = {
  name: 'Color por dato',
  args: {
    type: 'bar',
    data: DEDICACION,
    series: SERIE_DEDICACION,
    xKey: 'area',
    colors: ['#1E7FF6', '#F16123', '#27A0AF', '#B29124', '#C62C90'],
    title: 'Dedicación por área',
    caption: 'La paleta la eligió quien escribió el contenido, no el sistema.',
    ariaLabel: 'Horas de dedicación por área, con la paleta del contenido',
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

export const TestFormasNuevas: Story = {
  name: 'Test — las formas de porción comparten tabla equivalente',
  tags: ['!dev'],
  args: {
    type: 'funnel',
    data: EMBUDO,
    series: SERIE_EMBUDO,
    xKey: 'paso',
    title: 'Embudo',
    ariaLabel: 'Embudo de matriculación',
    formatValue: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tabla = canvas.getByRole('table', { name: 'Datos del gráfico' });
    await expect(within(tabla).getByRole('columnheader', { name: 'Porcentaje' })).toBeInTheDocument();
    await expect(within(tabla).getByRole('rowheader', { name: 'Visitas' })).toBeInTheDocument();
  },
};

export const TestColorPorDato: Story = {
  name: 'Test — la paleta de dato gana a la ranura de token',
  tags: ['!dev'],
  args: {
    type: 'bar',
    data: DEDICACION,
    series: SERIE_DEDICACION,
    xKey: 'area',
    colors: ['#1E7FF6'],
    title: 'Dedicación',
    ariaLabel: 'Dedicación por área',
    formatValue: undefined,
  },
  play: async ({ canvasElement }) => {
    const barra = canvasElement.querySelector('.chart__bar');
    await expect(barra).toHaveStyle({ '--chart-mark-color': '#1E7FF6' });
  },
};
