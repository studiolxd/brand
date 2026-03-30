import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewsletterForm } from './NewsletterForm';

const privacyLabel = (
  <>
    He leído la <a href="#">política de privacidad</a> y consiento recibir la newsletter
  </>
);

const meta: Meta<typeof NewsletterForm> = {
  title: 'Organisms/NewsletterForm',
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
  },
  args: {
    privacyLabel,
    submitting: false,
    success: false,
  },
};

export default meta;
type Story = StoryObj<typeof NewsletterForm>;

export const Default: Story = {};

export const Submitting: Story = {
  args: { submitting: true },
};

export const WithErrors: Story = {
  args: {
    errors: ['El email es obligatorio.', 'Debes aceptar la política de privacidad.'],
  },
};

export const Success: Story = {
  args: {
    success: true,
    successMessage: '¡Gracias por suscribirte! Ya no te perderás ninguna de nuestras novedades.',
  },
};
