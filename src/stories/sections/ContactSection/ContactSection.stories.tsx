import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactSection } from './ContactSection';

export const privacyLabel = (
  <>
    He leído la{' '}
    <a href="#">política de privacidad</a>
  </>
);

export const contactArgs = {
  title: '¿Hablamos?',
  form: {
    privacyLabel,
    emailPlaceholder: 'Escribe aquí tu correo electrónico',
    messagePlaceholder: 'Cuéntanos brevemente qué necesitas',
    buttonLabel: 'Envía el mensaje',
    submittingLabel: 'Enviando mensaje...',
    successMessage: '¡Gracias por tu mensaje! Nos pondremos en contacto contigo lo antes posible.',
  },
  whatsappTitle: '¿Mejor por WhatsApp?',
  whatsappLabel: 'Escríbenos',
  whatsappHref: 'https://wa.me/34600000000',
};

const meta: Meta<typeof ContactSection> = {
  title: 'Sections/ContactSection',
  excludeStories: /^[a-z]/,
  component: ContactSection,
  parameters: {
    layout: 'fullscreen',
  },
  args: contactArgs,
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {};

export const Dark: Story = {
  decorators: [(Story) => <div className="dark"><Story /></div>],
};

export const Submitting: Story = {
  args: {
    form: { privacyLabel, submitting: true },
  },
};

export const WithErrors: Story = {
  args: {
    form: {
      privacyLabel,
      errors: [
        'El email es obligatorio.',
        'El mensaje es obligatorio.',
        'Debes aceptar la política de privacidad.',
      ],
    },
  },
};

export const Success: Story = {
  args: {
    form: { privacyLabel, success: true },
  },
};
