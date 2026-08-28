import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Logomark } from './Logomark';

const meta: Meta<typeof Logomark> = {
  title: 'Atoms/Logomark',
  component: Logomark,
  parameters: { layout: 'padded' },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Lado del isotipo: una talla de componente.',
    },
    title: { control: { type: 'text' } },
    className: { table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof Logomark>;

/** Talla `md`, la de una cabecera. */
export const PorDefecto: Story = {};

/** Las cuatro tallas, alineadas por la base. `xl` es la talla de marca. */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-6)' }}>
      <Logomark size="sm" />
      <Logomark size="md" />
      <Logomark size="lg" />
      <Logomark size="xl" />
    </div>
  ),
};

/** El trazado toma su color de un token con par oscuro: en una banda oscura pasa a claro solo. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => <Logomark size="xl" />,
};

/** Con `title` deja de ser decorativo y se anuncia como imagen con nombre. */
export const ConNombre: Story = {
  name: 'Con nombre accesible',
  args: { title: 'Studio LXD' },
};

export const Talla: Story = {
  name: 'Test — es cuadrado, mide su talla y se anuncia según title',
  tags: ['!dev'],
  render: () => (
    <>
      <Logomark size="sm" />
      <Logomark size="xl" title="Studio LXD" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const sm = canvasElement.querySelector('.logomark--sm')!.getBoundingClientRect();
    await expect(Math.round(sm.height)).toBe(32);
    await expect(Math.round(sm.width)).toBe(32);

    const decorativo = canvasElement.querySelector('.logomark--sm')!;
    await expect(decorativo.getAttribute('aria-hidden')).toBe('true');

    const nombrado = canvasElement.querySelector('.logomark--xl')!;
    await expect(nombrado.getAttribute('role')).toBe('img');
    await expect(nombrado.querySelector('title')?.textContent).toBe('Studio LXD');
  },
};
