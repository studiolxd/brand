import type { Meta, StoryObj } from '@storybook/react-vite';
import { SwitcherField } from './SwitcherField';

const meta: Meta<typeof SwitcherField> = {
  title: 'Molecules/SwitcherField',
  component: SwitcherField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label asociado al switcher.',
    },
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
      description: 'Deshabilita el campo.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del campo.',
    },
    onCheckedChange: {
      description: 'Callback al cambiar el estado.',
    },
  },
  args: {
    label: 'Activar notificaciones',
    disabled: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof SwitcherField>;

export const Default: Story = {
  name: 'Off',
};

export const On: Story = {
  name: 'On',
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

export const Sizes: Story = {
  name: 'Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <SwitcherField size="sm" label="Pequeño" defaultChecked />
      <SwitcherField size="md" label="Mediano" defaultChecked />
      <SwitcherField size="lg" label="Grande" defaultChecked />
    </div>
  ),
};
