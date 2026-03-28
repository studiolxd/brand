import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Átomos/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado — marcado o no marcado.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el checkbox.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Variante para usar sobre fondo oscuro.',
    },
  },
  args: {
    disabled: false,
    dark: false,
    'aria-label': 'Checkbox',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  name: 'Sin marcar',
};

export const Checked: Story = {
  name: 'Marcado',
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  name: 'Deshabilitado',
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  name: 'Deshabilitado y marcado',
  args: { disabled: true, defaultChecked: true },
};

export const Dark: Story = {
  name: 'Oscuro',
  args: { dark: true },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const DarkChecked: Story = {
  name: 'Oscuro y marcado',
  args: { dark: true, defaultChecked: true },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
