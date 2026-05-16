import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectField } from './SelectField';

const options = [
  { value: '', label: 'Selecciona un tipo' },
  { value: 'full-time', label: 'Jornada completa' },
  { value: 'part-time', label: 'Media jornada' },
  { value: 'freelance', label: 'Autónomo' },
];

const meta: Meta<typeof SelectField> = {
  title: 'Molecules/SelectField',
  component: SelectField,
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
      description: 'Texto mostrado por Radix cuando no hay valor seleccionado.',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda bajo el select.',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Mensaje de error. Activa también el estado error del select.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error (borde rojo en el trigger).',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el campo.',
    },
  },
  args: {
    id: 'tipo-contrato',
    label: 'Tipo de contrato',
    labelHidden: false,
    options,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'full-time' },
};

export const WithHelper: Story = {
  args: { helperText: 'El tipo de contrato determina la duración y condiciones.' },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'Este campo es obligatorio.',
    helperText: 'El tipo de contrato determina la duración y condiciones.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'part-time' },
};

export const LabelHidden: Story = {
  args: { labelHidden: true },
};
