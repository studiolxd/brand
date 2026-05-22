import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Moléculas/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
    },
  },
  args: {
    title: 'Título del alert',
    variant: 'default',
    dismissible: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: { variant: 'success', title: 'Operación completada' },
};

export const Error: Story = {
  args: { variant: 'error', title: 'Ha ocurrido un error' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Atención requerida' },
};

export const WithDescription: Story = {
  args: {
    title: 'Título del alert',
    description: 'Descripción adicional con más contexto sobre el mensaje principal.',
  },
};

export const Dismissible: Story = {
  args: {
    title: 'Este alert se puede cerrar',
    description: 'Pulsa la X para ocultarlo.',
    dismissible: true,
  },
};

export const DismissibleSuccess: Story = {
  args: {
    variant: 'success',
    title: 'Guardado correctamente',
    description: 'Los cambios se han guardado.',
    dismissible: true,
  },
};

export const DismissibleWarning: Story = {
  args: {
    variant: 'warning',
    title: 'Revisa los datos',
    description: 'Algunos campos requieren tu atención.',
    dismissible: true,
  },
};
