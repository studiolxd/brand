import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { ConversationThread } from './ConversationThread';
import type { ConversationMessage } from './ConversationThread';
import { MessageBubble } from '../../atoms/MessageBubble/MessageBubble';
import { EmptyState } from '../../molecules/EmptyState/EmptyState';

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
 * La conversación que todavía no tiene mensajes: la pantalla mete **un solo
 * bloque** en lugar de los globos —aquí un `EmptyState`, pero el hilo no le
 * pide que lo sea— y el hilo lo centra en el alto disponible en vez de dejarlo
 * pegado arriba. En cuanto hay dos bloques, todo vuelve arriba con su scroll.
 */
export const ConversacionSinMensajes: Story = {
  name: 'Conversación sin mensajes',
  args: { messages: [] },
  render: (args) => (
    <ConversationThread {...args}>
      <EmptyState
        title="Empieza la conversación"
        description="Escribe abajo para preguntar lo que necesites."
      />
    </ConversationThread>
  ),
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

/**
 * Test: el bloque que va solo en el hilo se centra, y con dos bloques —o con
 * los globos que monta el propio hilo— vuelve arriba.
 */
export const ContratoHiloVacio: Story = {
  name: 'Test — lo que va solo se centra',
  tags: ['!dev'],
  render: () => (
    <>
      <div style={{ flex: '0 0 260px', minHeight: 0, display: 'flex', flexDirection: 'column' }} data-testid="solo">
        <ConversationThread messages={[]}>
          <EmptyState title="Empieza la conversación" />
        </ConversationThread>
      </div>
      <div style={{ flex: '0 0 260px', minHeight: 0, display: 'flex', flexDirection: 'column' }} data-testid="dos">
        <ConversationThread messages={[]}>
          <MessageBubble role="user">Uno</MessageBubble>
          <MessageBubble role="assistant">Dos</MessageBubble>
        </ConversationThread>
      </div>
      <div style={{ flex: '0 0 260px', minHeight: 0, display: 'flex', flexDirection: 'column' }} data-testid="un-mensaje">
        <ConversationThread messages={[MESSAGES[0]]} />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const hilo = (id: string) =>
      canvasElement.querySelector(`[data-testid="${id}"] .conversation-thread`) as HTMLElement;
    // Lo que separa el primer bloque del canto del hilo. El hilo ya no se
    // rellena a sí mismo, así que pegado arriba es cero: cualquier hueco lo han
    // puesto los márgenes automáticos. (No se mide `marginBlockStart`: el
    // navegador devuelve `0px` para un margen automático, no el valor que acaba
    // usando.)
    const hueco = (t: HTMLElement) =>
      Math.round(
        (t.firstElementChild as HTMLElement).getBoundingClientRect().top - t.getBoundingClientRect().top,
      );

    const solo = hilo('solo');
    await expect(solo.getAttribute('data-content')).toBe('children');
    // El hilo ocupa el alto que le dan, no el de su contenido.
    await waitFor(() => expect(Math.round(solo.getBoundingClientRect().height)).toBe(260));

    // El hilo no pone relleno: sin centrar, el primer bloque toca el canto.
    await expect(Math.round(parseFloat(getComputedStyle(solo).paddingBlockStart))).toBe(0);
    await waitFor(() => expect(hueco(solo)).toBeGreaterThan(0));

    // Dos bloques: sin márgenes automáticos, pegados arriba.
    await expect(hueco(hilo('dos'))).toBe(0);

    // Un solo mensaje montado por el hilo: arriba, como irán los siguientes.
    const unMensaje = hilo('un-mensaje');
    await expect(unMensaje.getAttribute('data-content')).toBe('messages');
    await expect(hueco(unMensaje)).toBe(0);
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

    // Y el hilo ha bajado del todo (el deslizamiento es asíncrono).
    await waitFor(() => expect(hilo.scrollTop).toBeGreaterThan(0));
  },
};
