import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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
  title: 'Por revisar/Organisms/ConversationThread',
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

/**
 * Test: el `aria-label` del `role="log"` usa el castellano por defecto y se
 * sustituye cuando el consumidor lo pasa traducido.
 */
export const Etiquetas: Story = {
  name: 'Test — etiqueta del hilo',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <ConversationThread messages={MESSAGES} />
      </div>
      <div data-testid="traducido">
        <ConversationThread messages={MESSAGES} ariaLabel="Conversation" />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByRole('log', { name: 'Conversación' })).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByRole('log', { name: 'Conversation' })).toBeInTheDocument();
    await expect(en.queryByRole('log', { name: 'Conversación' })).toBeNull();
  },
};
