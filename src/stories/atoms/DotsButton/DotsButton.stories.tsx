import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { DotsButton } from './DotsButton';
import { Container } from '../Container/Container';

const meta = {
  title: 'Atoms/DotsButton',
  component: DotsButton,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    className: { table: { disable: true } },
  },
  args: { 'aria-label': 'Más opciones' },
} satisfies Meta<typeof DotsButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

/** Las tres tallas del sistema: cuadrado de 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <DotsButton {...args} size="sm" />
      <DotsButton {...args} size="md" />
      <DotsButton {...args} size="lg" />
    </div>
  ),
};

export const Vertical: Story = { args: { orientation: 'vertical' } };

export const Deshabilitado: Story = { args: { disabled: true } };

export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="md">
      <DotsButton {...args} />
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — botón con nombre, cuadrado a talla',
  tags: ['!dev'],
  render: () => (
    <>
      <DotsButton size="sm" aria-label="Más opciones (sm)" />
      <DotsButton aria-label="Más opciones" />
      <DotsButton size="lg" aria-label="Más opciones (lg)" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const [name, px] of [['Más opciones (sm)', 32], ['Más opciones', 40], ['Más opciones (lg)', 48]] as const) {
      const b = canvas.getByRole('button', { name });
      const r = b.getBoundingClientRect();
      await expect(Math.round(r.width)).toBe(px);
      await expect(Math.round(r.height)).toBe(px);
      await expect(b).toHaveClass('button--ghost');
    }
  },
};
