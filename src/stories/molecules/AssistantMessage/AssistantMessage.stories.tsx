import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AssistantMessage } from './AssistantMessage';

/** Un instante fijo, para que la story no cambie entre ejecuciones. */
const MOMENTO = new Date('2026-08-27T14:33:00Z');

const meta = {
  title: 'Molecules/AssistantMessage',
  component: AssistantMessage,
  parameters: { layout: 'padded' },
  args: {
    children: 'Hola, soy tu asistente. ¿En qué puedo ayudarte hoy?',
    model: 'Claude Opus 5',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '32rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AssistantMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

/**
 * La marca de tiempo se pasa como instante —un `Date` o una cadena ISO 8601—,
 * no como hora ya escrita: el componente la formatea con `Intl` y la escribe
 * además en el atributo `datetime`.
 */
export const ConMarcaDeTiempo: Story = {
  name: 'Con marca de tiempo',
  args: { timestamp: MOMENTO },
};

/** Mientras la respuesta se genera, el globo lleva el indicador de escritura y no hay hora todavía. */
export const Generando: Story = {
  args: { isStreaming: true, children: undefined, timestamp: MOMENTO },
};

export const SinModelo: Story = {
  name: 'Sin modelo',
  args: { model: undefined, timestamp: MOMENTO },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { timestamp: MOMENTO },
};

/** Test: el `<time>` lleva la hora legible por máquina, y no aparece mientras se genera. */
export const ContratoTiempo: Story = {
  name: 'Test — el tiempo es legible por máquina',
  tags: ['!dev'],
  render: () => (
    <>
      <AssistantMessage timestamp={MOMENTO}>Terminado</AssistantMessage>
      <AssistantMessage timestamp={MOMENTO} isStreaming streamingLabel="Escribiendo" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const times = canvasElement.querySelectorAll('time');
    await expect(times).toHaveLength(1);
    await expect(times[0]?.getAttribute('datetime')).toBe('2026-08-27T14:33:00.000Z');
  },
};

/** Test: el modelo se anuncia como texto, no solo con la posición del globo. */
export const ContratoModelo: Story = {
  name: 'Test — el modelo firma la respuesta en texto',
  tags: ['!dev'],
  render: () => (
    <AssistantMessage model="Claude Opus 5" className="propia" data-testid="mensaje">
      Respuesta
    </AssistantMessage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Claude Opus 5')).toBeInTheDocument();
    const el = canvas.getByTestId('mensaje');
    await expect(el).toHaveClass('assistant-message');
    await expect(el).toHaveClass('propia');
  },
};
