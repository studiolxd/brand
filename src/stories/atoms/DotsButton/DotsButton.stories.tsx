import type { Meta, StoryObj } from '@storybook/react-vite';
import { DotsButton } from './DotsButton';

const meta = {
  title: 'Atoms/DotsButton',
  component: DotsButton,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof DotsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    orientation: 'horizontal',
    'aria-label': 'Más opciones',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <DotsButton size="sm" aria-label="Más opciones (sm)" />
      <DotsButton size="md" aria-label="Más opciones (md)" />
      <DotsButton size="lg" aria-label="Más opciones (lg)" />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    'aria-label': 'Más opciones',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    'aria-label': 'Más opciones (deshabilitado)',
  },
};
