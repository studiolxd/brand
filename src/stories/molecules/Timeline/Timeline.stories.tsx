import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Timeline, type TimelineItem } from './Timeline';
import { Link } from '../../atoms/Link/Link';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Molecules/Timeline',
  component: Timeline,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: '36rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Datos de ejemplo ──────────────────────────────────────────────────────
   Las fechas las escribe el consumidor: el historial no sabe formatearlas.
   Aquí van escritas a mano para que la captura no cambie de un día a otro. */

const TICKET: TimelineItem[] = [
  {
    id: 'abierto',
    title: 'Abierto',
    date: '3 de marzo, 09:12',
    author: 'Marta Ferrer',
    note: 'El portal de facturación devuelve un 500 al descargar el PDF de una factura rectificativa.',
    tone: 'neutral',
  },
  {
    id: 'asignado',
    title: 'Asignado a Soporte N2',
    date: '3 de marzo, 10:40',
    author: 'Julio Vidal',
    tone: 'accent-1',
  },
  {
    id: 'en-curso',
    title: 'En curso',
    date: '4 de marzo, 08:05',
    author: 'Nuria Oliva',
    note: 'Reproducido en preproducción. El fallo está en la plantilla de la rectificativa, no en el generador.',
    tone: 'support-1',
  },
  {
    id: 'resuelto',
    title: 'Resuelto',
    date: '5 de marzo, 16:28',
    author: 'Nuria Oliva',
    note: 'Desplegado en la 4.18.2.',
    tone: 'success',
    icon: 'check',
    current: true,
  },
];

const CANDIDATURA: TimelineItem[] = [
  { id: 'recibida', title: 'Candidatura recibida', date: '12 de enero', author: 'Portal de empleo', tone: 'neutral' },
  { id: 'criba', title: 'Criba curricular superada', date: '15 de enero', author: 'Alicia Benítez', tone: 'accent-1' },
  {
    id: 'entrevista',
    title: 'Entrevista técnica',
    date: '22 de enero',
    author: 'Ignacio Puente',
    note: 'Buen encaje con el equipo de plataforma. Pendiente de referencias.',
    tone: 'support-1',
  },
  { id: 'descartada', title: 'Descartada', date: '29 de enero', author: 'Alicia Benítez', note: 'La persona aceptó otra oferta.', tone: 'danger', current: true },
];

export const PorDefecto: Story = {
  args: { items: TICKET, label: 'Historial del ticket SOP-2841' },
};

export const ConAcciones: Story = {
  name: 'Con acciones',
  args: {
    items: TICKET.map((item, i) =>
      i === TICKET.length - 1
        ? { ...item, actions: <Link href="#despliegue">Ver el despliegue</Link> }
        : item,
    ),
    label: 'Historial del ticket SOP-2841',
  },
};

export const SoloEstados: Story = {
  name: 'Solo los estados',
  args: {
    items: CANDIDATURA.map((item) => ({ id: item.id, title: item.title, date: item.date, tone: item.tone, current: item.current })),
    label: 'Historial de la candidatura de Lucía Arroyo',
  },
};

export const Candidatura: Story = {
  args: { items: CANDIDATURA, label: 'Historial de la candidatura de Lucía Arroyo' },
};

export const UnSoloHito: Story = {
  name: 'Un solo hito',
  args: {
    items: [TICKET[0]],
    label: 'Historial del ticket SOP-3010',
  },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { items: TICKET, label: 'Historial del ticket SOP-2841' },
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

export const TestEstadoVigente: Story = {
  name: 'Test — el estado vigente se lee',
  tags: ['!dev'],
  args: { items: TICKET, label: 'Historial del ticket SOP-2841' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lista = canvas.getByRole('list', { name: 'Historial del ticket SOP-2841' });
    expect(within(lista).getAllByRole('listitem')).toHaveLength(4);
    expect(canvas.getByText(/Resuelto/)).toBeInTheDocument();
    expect(canvas.getByText(/estado actual/)).toBeInTheDocument();
  },
};
