import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Átomos/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Tipo HTML del input.',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el input.',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Input de solo lectura.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Variante para usar sobre fondo oscuro.',
    },
  },
  args: {
    placeholder: 'Escribe algo…',
    disabled: false,
    readOnly: false,
    error: false,
    dark: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  name: 'Por defecto',
};

export const Error: Story = {
  name: 'Error',
  args: { error: true },
};

export const Disabled: Story = {
  name: 'Deshabilitado',
  args: { disabled: true },
};

export const ReadOnly: Story = {
  name: 'Solo lectura',
  args: { readOnly: true, value: 'Valor de solo lectura' },
};

export const Dark: Story = {
  name: 'Oscuro',
  args: { dark: true },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
