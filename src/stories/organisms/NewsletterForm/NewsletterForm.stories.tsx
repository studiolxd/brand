import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterForm } from './NewsletterForm';

const privacyLabel = (
  <>
    He leído y acepto la{' '}
    <a href="#">política de privacidad</a>
  </>
);

const meta: Meta<typeof NewsletterForm> = {
  title: 'Organismos/NewsletterForm',
  component: NewsletterForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    emailPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del campo de email.',
    },
    buttonLabel: {
      control: { type: 'text' },
      description: 'Texto del botón de envío.',
    },
    submitting: {
      control: { type: 'boolean' },
      description: 'Estado de envío en curso.',
    },
    submittingLabel: {
      control: { type: 'text' },
      description: 'Texto del botón mientras se envía.',
    },
    errors: {
      control: { type: 'object' },
      description: 'Lista de mensajes de error agrupados.',
    },
    success: {
      control: { type: 'boolean' },
      description: 'Muestra el mensaje de éxito en lugar del formulario.',
    },
    successMessage: {
      control: { type: 'text' },
      description: 'Mensaje de éxito.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Variante para usar sobre fondo oscuro.',
    },
  },
  args: {
    privacyLabel,
    dark: false,
    submitting: false,
    success: false,
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

export const Default: Story = {
  name: 'Por defecto',
};

export const Enviando: Story = {
  name: 'Enviando',
  args: {
    submitting: true,
  },
};

export const ConErrores: Story = {
  name: 'Con errores',
  args: {
    errors: ['El email es obligatorio.', 'Debes aceptar la política de privacidad.'],
  },
};

export const Exito: Story = {
  name: 'Éxito',
  args: {
    success: true,
    successMessage: '¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.',
  },
};

export const Dark: Story = {
  name: 'Oscuro',
  args: {
    dark: true,
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const DarkConErrores: Story = {
  name: 'Oscuro con errores',
  args: {
    dark: true,
    errors: ['El email es obligatorio.', 'Debes aceptar la política de privacidad.'],
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
