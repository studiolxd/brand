import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { UserMessage } from './UserMessage';

/** Un instante fijo, para que la story no cambie entre ejecuciones. */
const MOMENTO = new Date('2026-08-27T14:32:00Z');

const meta = {
  title: 'Molecules/UserMessage',
  component: UserMessage,
  parameters: { layout: 'padded' },
  args: {
    children: 'Necesito ayuda con mi proyecto.',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '32rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

/**
 * La marca de tiempo se pasa como instante —un `Date` o una cadena ISO 8601—,
 * no como hora ya escrita: el componente la formatea con `Intl` y la escribe
 * además en el atributo `datetime`, que es lo que leen las máquinas.
 */
export const ConMarcaDeTiempo: Story = {
  name: 'Con marca de tiempo',
  args: { timestamp: MOMENTO },
};

/** El formato y el idioma van por `locale` y `timestampFormat`, no por props de texto. */
export const OtroIdioma: Story = {
  name: 'Otro idioma y otro formato',
  args: {
    timestamp: MOMENTO,
    locale: 'en-GB',
    timestampFormat: { dateStyle: 'medium', timeStyle: 'short' },
  },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { timestamp: MOMENTO },
};

/** Test: el `<time>` lleva la hora legible por máquina y el texto formateado. */
export const ContratoTiempo: Story = {
  name: 'Test — el tiempo es legible por máquina',
  tags: ['!dev'],
  render: () => (
    <>
      <UserMessage timestamp={MOMENTO}>Con Date</UserMessage>
      <UserMessage timestamp="2026-08-27T14:32:00Z">Con ISO</UserMessage>
      <UserMessage timestamp="14:32">Con hora ya formateada</UserMessage>
    </>
  ),
  play: async ({ canvasElement }) => {
    const times = canvasElement.querySelectorAll('time');
    // Un `Date` y su equivalente ISO dan lo mismo; una hora ya formateada no
    // se puede interpretar y no se pinta nada (mejor que «Invalid Date»).
    await expect(times).toHaveLength(2);
    await expect(times[0]?.getAttribute('datetime')).toBe('2026-08-27T14:32:00.000Z');
    await expect(times[1]?.getAttribute('datetime')).toBe(times[0]?.getAttribute('datetime'));
    await expect(times[0]?.textContent).toBe(times[1]?.textContent);
  },
};

/** Test: `className` se añade a las clases propias y `...rest` llega al `<div>`. */
export const ContratoContenedor: Story = {
  name: 'Test — className y rest llegan al contenedor',
  tags: ['!dev'],
  render: () => (
    <UserMessage className="propia" data-testid="mensaje" id="m1">
      Mensaje
    </UserMessage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = canvas.getByTestId('mensaje');
    await expect(el).toHaveClass('user-message');
    await expect(el).toHaveClass('propia');
    await expect(el.id).toBe('m1');
  },
};
