import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Icon, ICON_NAMES } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  args: { name: 'chevron', size: 'md' },
  argTypes: {
    name: { control: 'select', options: ICON_NAMES },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Un icono cualquiera en la talla por defecto. */
export const PorDefecto: Story = {};

/** Las cinco tallas: el trazo mide 1px en todas. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'flex-end' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — talla por token, trazo fijo y decorativo',
  tags: ['!dev'],
  args: { name: 'bell', size: 'lg' },
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('svg.icon')!;
    await expect(Math.round(svg.getBoundingClientRect().width)).toBe(48);
    await expect(svg).toHaveAttribute('aria-hidden', 'true');
    const trazo = svg.querySelector('path, line')!;
    await expect(getComputedStyle(trazo).strokeWidth).toBe('1px');
  },
};
