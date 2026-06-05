import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switcher } from './Switcher';

const meta: Meta<typeof Switcher> = {
  title: 'Atoms/Switcher',
  component: Switcher,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el switcher.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del switcher.',
    },
    onCheckedChange: {
      description: 'Callback al cambiar el estado. Recibe `true` o `false`.',
    },
  },
  args: {
    disabled: false,
    size: 'md',
    'aria-label': 'Toggle',
  },
};

export default meta;
type Story = StoryObj<typeof Switcher>;

export const Default: Story = {
  name: 'Off',
};

export const On: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  name: 'Disabled (off)',
  args: { disabled: true },
};

export const DisabledOn: Story = {
  name: 'Disabled (on)',
  args: { disabled: true, defaultChecked: true },
};

export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <Switcher size="sm" aria-label="Small" defaultChecked />
      <Switcher size="md" aria-label="Medium" defaultChecked />
      <Switcher size="lg" aria-label="Large" defaultChecked />
    </div>
  ),
};
