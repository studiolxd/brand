import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { fn } from 'storybook/test';
import { ClockWidget, type ClockEntry } from './ClockWidget';
import { Link } from '../../atoms/Link/Link';
import { STORY_TODAY } from '../../utils/storyDate';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Molecules/ClockWidget',
  component: ClockWidget,
  parameters: { layout: 'padded' },
  args: { onClockIn: fn(), onClockOut: fn() },
  decorators: [
    (Story) => (
      <div style={{ maxInlineSize: '28rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ClockWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Datos de ejemplo ──────────────────────────────────────────────────────
   El «hoy» del catálogo está congelado (`STORY_TODAY`, 15 de marzo de 2026 a
   las 10:00 UTC), así que las horas y el tiempo transcurrido no cambian de una
   captura a otra. Las stories pasan además `now` para no depender del tic. */

const AHORA = STORY_TODAY;
const a = (hh: number, mm: number) => new Date(Date.UTC(2026, 2, 15, hh, mm));

const DIA = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(AHORA);

const CERRADO: ClockEntry[] = [
  { id: '1', start: a(8, 2), end: a(9, 30) },
];

const ABIERTO: ClockEntry[] = [
  { id: '1', start: a(8, 2), end: a(9, 30) },
  { id: '2', start: a(9, 45), end: null },
];

const JORNADA: ClockEntry[] = [
  { id: '1', start: a(8, 2), end: a(9, 30) },
  { id: '2', start: a(9, 45), end: a(11, 58) },
  { id: '3', start: a(12, 40), end: a(15, 5) },
];

export const SinFichar: Story = {
  name: 'Sin fichar',
  args: { entries: [], date: DIA, now: AHORA, timeZone: 'UTC' },
};

export const TurnoAbierto: Story = {
  name: 'Turno abierto',
  args: { entries: ABIERTO, date: DIA, now: AHORA, timeZone: 'UTC' },
};

export const JornadaCerrada: Story = {
  name: 'Jornada cerrada',
  args: { entries: JORNADA, date: DIA, now: AHORA, timeZone: 'UTC' },
};

export const ConPie: Story = {
  name: 'Con pie',
  args: {
    entries: CERRADO,
    date: DIA,
    now: AHORA,
    timeZone: 'UTC',
    footer: <Link href="#mis-fichajes" tone="ink">Ver mis fichajes</Link>,
  },
};

export const DiaDeVacaciones: Story = {
  name: 'Día de vacaciones',
  args: { entries: [], date: DIA, dayState: 'vacation', now: AHORA, timeZone: 'UTC' },
};

export const ConError: Story = {
  name: 'Con error',
  args: {
    entries: ABIERTO,
    date: DIA,
    now: AHORA,
    timeZone: 'UTC',
    error: 'No se pudo registrar la salida: vuelve a intentarlo.',
  },
};

export const Fichando: Story = {
  args: { entries: ABIERTO, date: DIA, now: AHORA, timeZone: 'UTC', pending: true },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { entries: ABIERTO, date: DIA, now: AHORA, timeZone: 'UTC' },
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

export const TestFichar: Story = {
  name: 'Test — el botón cambia con el turno',
  tags: ['!dev'],
  args: { entries: [], date: DIA, now: AHORA, timeZone: 'UTC' },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const entrar = canvas.getByRole('button', { name: 'Fichar entrada' });
    await userEvent.click(entrar);
    expect(args.onClockIn).toHaveBeenCalled();
    expect(canvas.queryByRole('button', { name: 'Fichar salida' })).not.toBeInTheDocument();
  },
};
