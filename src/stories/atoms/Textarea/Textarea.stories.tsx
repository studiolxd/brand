import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
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
  },
  args: {
    placeholder: 'Escribe algo…',
    disabled: false,
    readOnly: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  name: 'Default',
};

export const Error: Story = {
  name: 'Error',
  args: { error: true },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true },
};

export const ReadOnly: Story = {
  name: 'Read only',
  args: { readOnly: true, value: 'Valor de solo lectura' },
};

/** Navega con Tab hasta el textarea para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
