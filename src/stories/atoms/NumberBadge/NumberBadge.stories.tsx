import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { NumberBadge } from './NumberBadge';
import type { NumberBadgeVariant } from './NumberBadge';

const meta = {
  title: 'Atoms/NumberBadge',
  component: NumberBadge,
  parameters: { layout: 'padded' },
  args: { count: 5, variant: 'primary' },
  argTypes: { className: { table: { disable: true } } },
} satisfies Meta<typeof NumberBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

const VARIANTS: NumberBadgeVariant[] = [
  'primary', 'accent-1', 'accent-2', 'support-1', 'support-2', 'danger', 'success', 'neutral',
];

/** Las variantes son los colores de marca y los de feedback; el texto contrasta en todas. */
export const Variantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {VARIANTS.map((v) => <NumberBadge key={v} {...args} variant={v} />)}
    </div>
  ),
};

/** Con dos dígitos crece a lo ancho; nunca por encima de `max`: a partir de ahí, «99+». */
export const DosDigitosYTope: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <NumberBadge {...args} count={7} />
      <NumberBadge {...args} count={42} />
      <NumberBadge {...args} count={150} />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — tope, nombre accesible y forma',
  tags: ['!dev'],
  render: () => (
    <>
      <NumberBadge count={3} aria-label="3 notificaciones sin leer" />
      <NumberBadge count={150} />
      <NumberBadge count={1000} max={999} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const uno = canvas.getByLabelText('3 notificaciones sin leer');
    await expect(uno.textContent).toBe('3');
    const r = uno.getBoundingClientRect();
    await expect(Math.round(r.width)).toBe(Math.round(r.height));
    await expect(canvas.getByLabelText('99+').textContent).toBe('99+');
    await expect(canvas.getByLabelText('999+').textContent).toBe('999+');
  },
};
