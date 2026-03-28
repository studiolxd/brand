import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Átomos/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder.',
    },
    rows: {
      control: { type: 'number' },
      description: 'Número de filas visibles.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el textarea.',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Textarea de solo lectura.',
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
type Story = StoryObj<typeof Textarea>;

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
