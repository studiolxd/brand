import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { OtpField } from './OtpField';

const meta: Meta<typeof OtpField> = {
  title: 'Molecules/OtpField',
  component: OtpField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Texto del label.',
    },
    labelHidden: {
      control: { type: 'boolean' },
      description: 'Oculta el label visualmente.',
    },
    length: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Número de celdas.',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Texto de ayuda bajo las celdas.',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Mensaje de error.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error sin mensaje.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el campo.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de las celdas.',
    },
  },
  args: {
    id: 'verify-code',
    label: 'Código de acceso',
    labelHidden: false,
    length: 6,
    size: 'md',
    disabled: false,
    error: false,
    onChange: fn(),
    onComplete: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof OtpField>;

export const Default: Story = {};

export const WithHelper: Story = {
  name: 'With helper text',
  args: { helperText: 'Revisa tu correo electrónico.' },
};

export const WithError: Story = {
  name: 'Error state',
  args: {
    error: true,
    errorMessage: 'El código introducido no es válido.',
    helperText: 'Revisa tu correo electrónico.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: '123' },
};

export const LabelHidden: Story = {
  name: 'Label hidden (PIN)',
  args: { labelHidden: true, label: 'PIN', length: 4, size: 'lg' },
};

export const Prefilled: Story = {
  name: 'Prefilled',
  args: { value: '1234', length: 6, helperText: 'Revisa tu correo electrónico.' },
};

export const FourDigitPin: Story = {
  name: '4-digit PIN (lg)',
  args: { length: 4, size: 'lg', label: 'PIN de acceso' },
};
