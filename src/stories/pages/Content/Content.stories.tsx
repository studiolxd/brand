import type { Meta, StoryObj } from '@storybook/react-vite';
import { Content } from './Content';

const meta: Meta<typeof Content> = {
  title: 'Templates/Content',
  component: Content,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Default: Story = {
  args: {
    title: 'Soluciones',
    description: 'Descubre nuestra colección de recursos y materiales para el aprendizaje digital.',
    sections: [
      { title: 'Contenidos elearning', color: 'secondary', colorSide: 'left' },
      { title: 'Plataformas elearning', color: 'tertiary', colorSide: 'right' },
    ],
    contactSection: {
      title: '¿Hablamos?',
      whatsappTitle: 'O escríbenos por WhatsApp',
      whatsappLabel: 'Abrir WhatsApp',
      whatsappHref: 'https://wa.me/34600000000',
      form: {
        privacyLabel: 'He leído y acepto la política de privacidad',
      },
    },
  },
};
