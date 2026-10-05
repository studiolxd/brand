import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { LoadingRegion, SkeletonGrid, SkeletonList, SkeletonTable, SkeletonText } from './LoadingRegion';
import { Skeleton } from '../../atoms/Skeleton/Skeleton';

const meta: Meta<typeof LoadingRegion> = {
  title: 'Molecules/LoadingRegion',
  component: LoadingRegion,
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: { type: 'text' } },
    announce: { control: { type: 'boolean' } },
    children: { control: false },
  },
  args: { announce: true },
};

export default meta;
type Story = StoryObj<typeof LoadingRegion>;

/** Una página tipo: el título, un párrafo y una tabla. La región anuncia; los esqueletos solo se ven. */
export const PorDefecto: Story = {
  render: (args) => (
    <LoadingRegion {...args}>
      <Skeleton width="40%" height="2rem" />
      <SkeletonText />
      <SkeletonTable />
    </LoadingRegion>
  ),
};

/** Con su propio texto: lo que se espera, con puntos suspensivos. Se anuncia, no se ve. */
export const ConTexto: Story = {
  name: 'Con texto propio',
  args: { label: 'Cargando bancos…' },
  render: (args) => (
    <LoadingRegion {...args}>
      <SkeletonList />
    </LoadingRegion>
  ),
};

/** `SkeletonText`: un párrafo, con la última línea más corta. `lines` dice cuántas. */
export const Texto: Story = {
  name: 'SkeletonText',
  render: (args) => (
    <LoadingRegion {...args}>
      <SkeletonText />
      <SkeletonText lines={5} />
    </LoadingRegion>
  ),
};

/** `SkeletonList`: una barra por fila, del alto de un control. */
export const Lista: Story = {
  name: 'SkeletonList',
  render: (args) => (
    <LoadingRegion {...args}>
      <SkeletonList rows={5} />
    </LoadingRegion>
  ),
};

/** `SkeletonTable`: la cabecera y sus filas. */
export const Tabla: Story = {
  name: 'SkeletonTable',
  render: (args) => (
    <LoadingRegion {...args}>
      <SkeletonTable rows={6} />
    </LoadingRegion>
  ),
};

/** `SkeletonGrid`: una rejilla de tarjetas o miniaturas, a 2, 3 o 4 columnas. */
export const Rejilla: Story = {
  name: 'SkeletonGrid',
  render: (args) => (
    <LoadingRegion {...args}>
      <SkeletonGrid columns={2} rows={1} />
      <SkeletonGrid columns={3} rows={1} />
      <SkeletonGrid columns={4} rows={2} />
    </LoadingRegion>
  ),
};

/**
 * `announce={false}`: la espera ya la anuncia una región viva que existe
 * antes y después de cargar. La región queda solo a la vista.
 */
export const SinAnuncio: Story = {
  name: 'Sin anuncio',
  args: { announce: false },
  render: (args) => (
    <div role="region" aria-live="polite" aria-label="Resultados">
      <LoadingRegion {...args}>
        <SkeletonList rows={3} />
      </LoadingRegion>
    </div>
  ),
};

export const TestContrato: Story = {
  name: 'Test — anuncia una vez y los esqueletos toman el alto de sus tokens',
  tags: ['!dev'],
  args: { label: 'Cargando miembros…' },
  render: (args) => (
    <LoadingRegion {...args}>
      <SkeletonText lines={3} />
      <SkeletonList rows={2} />
      <SkeletonTable rows={2} />
      <SkeletonGrid columns={4} rows={1} />
    </LoadingRegion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = await canvas.findByRole('status', { name: 'Cargando miembros…' });
    await expect(region).toHaveAttribute('aria-busy', 'true');
    await expect(canvas.getAllByRole('status')).toHaveLength(1);

    const sonda = document.createElement('div');
    document.body.append(sonda);
    const mide = (token: string) => {
      sonda.style.blockSize = `var(${token})`;
      return Math.round(sonda.getBoundingClientRect().height);
    };
    const alto = (sel: string) => Math.round(region.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('.skeleton-list__row')).toBe(mide('--loading-region-list-row-height'));
    await expect(alto('.skeleton-table__header')).toBe(mide('--loading-region-table-header-height'));
    await expect(alto('.skeleton-table__row')).toBe(mide('--loading-region-table-row-height'));
    await expect(alto('.skeleton-grid__item')).toBe(mide('--loading-region-grid-item-height'));
    sonda.remove();

    // La última línea del párrafo es más corta que las demás.
    const lineas = region.querySelectorAll('.skeleton-text .skeleton');
    await expect(lineas[2].getBoundingClientRect().width).toBeLessThan(lineas[0].getBoundingClientRect().width);
    // Cuatro columnas de verdad.
    const celdas = region.querySelectorAll('.skeleton-grid__item');
    const tops = new Set([...celdas].map((c) => Math.round(c.getBoundingClientRect().top)));
    await expect(tops.size).toBe(1);
  },
};
