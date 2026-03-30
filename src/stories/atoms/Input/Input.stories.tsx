import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error.',
    },
  },
  args: {
    placeholder: 'Escribe algo…',
    size: 'md',
    disabled: false,
    readOnly: false,
    error: false,
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

export const Small: Story = {
  name: 'Pequeño',
  args: { size: 'sm' },
};

export const Large: Story = {
  name: 'Grande',
  args: { size: 'lg' },
};

export const Sizes: Story = {
  name: 'Tamaños',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
};

export const Dark: Story = {
  name: 'Oscuro',
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};
