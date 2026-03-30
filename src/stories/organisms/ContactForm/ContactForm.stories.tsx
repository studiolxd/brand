import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';

const privacyLabel = (
  <>
    He leído y acepto la{' '}
    <a href="#">política de privacidad</a>
  </>
);

const meta: Meta<typeof ContactForm> = {
  title: 'Organisms/ContactForm',
  component: ContactForm,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    emailPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del campo de email.',
    },
    messagePlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder del campo de mensaje.',
    },
    messageRows: {
      control: { type: 'number' },
      description: 'Número de filas del textarea.',
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
type Story = StoryObj<typeof ContactForm>;

export const Default: Story = {};

export const Submitting: Story = {
  args: { submitting: true },
};

export const WithErrors: Story = {
  args: {
    errors: ['El email es obligatorio.', 'El mensaje es obligatorio.', 'Debes aceptar la política de privacidad.'],
  },
};

export const Success: Story = {
  args: { success: true },
};
