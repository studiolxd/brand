import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ConversationThread } from './ConversationThread';
import type { ConversationMessage } from './ConversationThread';
import { MessageBubble } from '../../atoms/MessageBubble/MessageBubble';

const MESSAGES: ConversationMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Hola, soy tu asistente. ¿En qué puedo ayudarte hoy?',
    model: 'Claude Opus 5',
    timestamp: new Date('2026-08-27T14:30:00Z'),
  },
  {
    id: '2',
    role: 'user',
    content: 'Necesito ayuda para redactar un correo profesional.',
    timestamp: new Date('2026-08-27T14:31:00Z'),
  },
  {
    id: '3',
    role: 'assistant',
    content:
      'Por supuesto. Para redactar un correo profesional es importante ser claro y conciso. ¿Puedes contarme más sobre el destinatario y el propósito del mensaje?',
    model: 'Claude Opus 5',
    timestamp: new Date('2026-08-27T14:31:00Z'),
  },
  {
    id: '4',
    role: 'user',
    content: 'Es para solicitar una reunión con un cliente potencial.',
    timestamp: new Date('2026-08-27T14:32:00Z'),
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

export const PorDefecto: Story = {};

/** El último mensaje del asistente todavía se está generando. */
export const Generando: Story = {
  args: {
    messages: [
      ...MESSAGES,
      {
        id: '5',
        role: 'assistant',
        isStreaming: true,
        model: 'Claude Opus 5',
      },
    ],
    streamingLabel: 'El asistente está escribiendo',
  },
};

export const Vacio: Story = {
  name: 'Vacío',
  args: { messages: [] },
};

/**
 * Con `children`, el hilo pone solo el contenedor, la región live y el
 * autoscroll: los globos los monta el producto. Es la salida para mensajes que
 * no son texto —llamadas a herramientas, adjuntos, tablas—.
 */
export const ContenidoPropio: Story = {
  name: 'Con contenido propio',
  args: { messages: [] },
  render: (args) => (
    <ConversationThread {...args}>
      <MessageBubble role="user">¿Cuántos usuarios activos hubo en julio?</MessageBubble>
      <MessageBubble role="assistant">
        <p>He consultado el almacén de datos:</p>
        <ul>
          <li>Usuarios activos: 12.480</li>
          <li>Sesiones: 41.902</li>
        </ul>
      </MessageBubble>
    </ConversationThread>
  ),
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
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

/** Test: el hilo baja al último mensaje sin dejar el centinela en el orden de lectura. */
export const ContratoAutoscroll: Story = {
  name: 'Test — el hilo baja al último mensaje',
  tags: ['!dev'],
  render: () => (
    <div style={{ height: '200px', display: 'flex', flexDirection: 'column' }}>
      <ConversationThread messages={MESSAGES} className="propia" data-testid="hilo" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hilo = canvas.getByTestId('hilo');
    await expect(hilo).toHaveClass('conversation-thread');
    await expect(hilo).toHaveClass('propia');

    // El centinela es el último hijo, no tiene altura y está fuera del árbol
    // accesible: existe solo para pedirle el scroll.
    const centinela = hilo.lastElementChild as HTMLElement;
    await expect(centinela.getAttribute('aria-hidden')).toBe('true');
    await expect(centinela.getBoundingClientRect().height).toBe(0);

    // Y el hilo ha bajado del todo.
    await expect(hilo.scrollTop).toBeGreaterThan(0);
  },
};
