import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxField } from './CheckboxField';

const meta: Meta<typeof CheckboxField> = {
  title: 'Moléculas/CheckboxField',
  component: CheckboxField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto asociado al checkbox.',
    },
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
      description: 'Deshabilita el campo.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Variante para usar sobre fondo oscuro.',
    },
  },
  args: {
    label: 'Acepto los términos y condiciones',
    disabled: false,
    dark: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxField>;

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
