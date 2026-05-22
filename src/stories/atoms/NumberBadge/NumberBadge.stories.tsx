import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberBadge } from './NumberBadge';
import type { NumberBadgeVariant } from './NumberBadge';

const meta = {
  title: 'Atoms/NumberBadge',
  component: NumberBadge,
  args: { count: 5, variant: 'primary' },
} satisfies Meta<typeof NumberBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Accent1: Story   = { args: { variant: 'accent-1' } };
export const Accent2: Story   = { args: { variant: 'accent-2' } };
export const Support1: Story  = { args: { variant: 'support-1' } };
export const Support2: Story  = { args: { variant: 'support-2' } };
export const Danger: Story    = { args: { variant: 'danger' } };
export const Success: Story   = { args: { variant: 'success' } };
export const Neutral: Story   = { args: { variant: 'neutral' } };

export const DoubleDígito: Story = { args: { count: 42 } };
export const MaxOverflow: Story  = { args: { count: 150 } };

const VARIANTS: NumberBadgeVariant[] = [
  'primary', 'accent-1', 'accent-2', 'support-1', 'support-2', 'danger', 'success', 'neutral',
];

export const TodasLasVariantes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
      {VARIANTS.map((v) => <NumberBadge key={v} {...args} variant={v} />)}
    </div>
  ),
};
