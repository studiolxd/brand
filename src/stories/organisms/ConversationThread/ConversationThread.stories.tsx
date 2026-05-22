import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConversationThread } from './ConversationThread';
import type { ConversationMessage } from './ConversationThread';

const MESSAGES: ConversationMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hola, soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
    model: 'GPT-4o',
    timestamp: '14:30',
  },
  {
    id: '2',
    role: 'user',
    content: 'Necesito ayuda para redactar un email profesional.',
    timestamp: '14:31',
  },
  {
    id: '3',
    role: 'assistant',
    content:
      'Por supuesto. Para redactar un email profesional, es importante ser claro y conciso. ¿Puedes contarme más sobre el destinatario y el propósito del mensaje?',
    model: 'GPT-4o',
    timestamp: '14:31',
  },
  {
    id: '4',
    role: 'user',
    content: 'Es para solicitar una reunión con un cliente potencial.',
    timestamp: '14:32',
  },
];

const meta = {
  title: 'Organisms/ConversationThread',
  component: ConversationThread,
  decorators: [
    (Story) => (
      <div style={{ height: '500px', display: 'flex', flexDirection: 'column', maxWidth: '700px' }}>
        <Story />
      </div>
    ),
  ],
  args: { messages: MESSAGES },
} satisfies Meta<typeof ConversationThread>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithStreaming: Story = {
  args: {
    messages: [
      ...MESSAGES,
      {
        id: '5',
        role: 'assistant',
        isStreaming: true,
        model: 'GPT-4o',
      },
    ],
  },
};

export const Empty: Story = {
  args: { messages: [] },
};
