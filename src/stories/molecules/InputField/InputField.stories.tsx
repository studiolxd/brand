import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
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
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda bajo el input.',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Mensaje de error. Activa también el estado error del input.',
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
    id: 'nombre',
    label: 'Nombre completo',
    labelHidden: true,
    placeholder: 'Nombre completo',
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: { helperText: 'Introduce tu nombre tal como aparece en tu DNI.' },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'Este campo es obligatorio.',
    helperText: 'Introduce tu nombre tal como aparece en tu DNI.',
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LabelVisible: Story = {
  args: { labelHidden: false },
};
