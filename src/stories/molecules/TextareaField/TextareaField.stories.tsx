import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextareaField } from './TextareaField';

const meta: Meta<typeof TextareaField> = {
  title: 'Molecules/TextareaField',
  component: TextareaField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label (accesible siempre, visible según labelHidden).',
    },
    labelHidden: {
      control: { type: 'boolean' },
      description: 'Oculta el label visualmente.',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder.',
    },
    rows: {
      control: { type: 'number' },
      description: 'Número de filas visibles.',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda bajo el textarea.',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Mensaje de error. Activa también el estado error del textarea.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el campo.',
    },
  },
  args: {
    id: 'mensaje',
    label: 'Mensaje',
    labelHidden: true,
    placeholder: 'Escribe tu mensaje…',
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helperText: 'Máximo 500 caracteres.' },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'Este campo es obligatorio.',
    helperText: 'Máximo 500 caracteres.',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LabelVisible: Story = {
  args: { labelHidden: false },
};
