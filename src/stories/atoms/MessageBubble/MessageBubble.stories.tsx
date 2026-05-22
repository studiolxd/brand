import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageBubble } from './MessageBubble';

const meta = {
  title: 'Atoms/MessageBubble',
  component: MessageBubble,
  args: {
    children: 'Hola, ¿en qué puedo ayudarte hoy?',
    role: 'assistant',
  },
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Assistant: Story = {};

export const User: Story = {
  args: {
    role: 'user',
    children: 'Necesito ayuda con mi proyecto.',
  },
};

export const LongMessage: Story = {
  args: {
    role: 'assistant',
    children:
      'Esta es una respuesta más larga para mostrar cómo el globo de mensaje se adapta al contenido de texto extenso manteniendo el ancho máximo definido y el interlineado apropiado para facilitar la lectura.',
  },
};
