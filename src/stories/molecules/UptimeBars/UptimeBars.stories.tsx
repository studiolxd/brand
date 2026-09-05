import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { TooltipProvider } from '../../atoms/Tooltip/Tooltip';
import { UptimeBars, type UptimeBarsPoint } from './UptimeBars';

const meta = {
  title: 'Molecules/UptimeBars',
  component: UptimeBars,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={100}>
        <div style={{ maxInlineSize: '40rem' }}>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof UptimeBars>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Datos de ejemplo ──────────────────────────────────────────────────────
   Las fechas las escribe el consumidor: la tira no sabe qué es un día. Aquí
   se generan con `Intl` desde una fecha fija para que las stories no cambien
   de un día para otro. */

const FIN = new Date('2026-09-05T00:00:00Z');
const fecha = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', timeZone: 'UTC' });

/** El mismo formato que pinta la tira: el porcentaje lleva espacio duro. */
const pct = (n: number) => new Intl.NumberFormat('es-ES', { style: 'percent', maximumFractionDigits: 2 }).format(n / 100);

const dia = (indiceDesdeElFinal: number) =>
  fecha.format(new Date(FIN.getTime() - indiceDesdeElFinal * 24 * 60 * 60 * 1000));

/** 30 puntos, del más antiguo al más reciente, con el porcentaje que se le pase. */
const serie = (valores: (number | null)[], detalle?: (valor: number | null) => string | undefined): UptimeBarsPoint[] =>
  valores.map((value, i) => ({
    value,
    label: dia(valores.length - 1 - i),
    detail: detalle?.(value),
  }));

const detalleHabitual = (valor: number | null) => {
  if (valor === null) return 'El monitor todavía no existía';
  if (valor === 100) return 'Sin incidencias';
  const minutos = Math.round(((100 - valor) / 100) * 24 * 60);
  return minutos >= 60
    ? `Caído ${Math.floor(minutos / 60)} h ${minutos % 60} min`
    : `Caído ${minutos} min`;
};

const SANA = serie(Array.from({ length: 30 }, () => 100), detalleHabitual);

const CON_CAIDAS = serie(
  [
    100, 100, 100, 99.98, 100, 100, 100, 96.5, 100, 100,
    100, 100, 88.2, 100, 100, 100, 100, 100, 99.4, 100,
    100, 100, 100, 100, 100, 72.1, 100, 100, 100, 99.99,
  ],
  detalleHabitual,
);

const RECIEN_ESTRENADA = serie(
  [...Array.from({ length: 18 }, () => null), 100, 100, 99.9, 100, 100, 100, 97.2, 100, 100, 100, 100, 100],
  detalleHabitual,
);

const pie = {
  startLabel: 'Hace 30 días',
  endLabel: 'Hoy',
  label: 'Disponibilidad de los últimos 30 días',
};

/** La serie completa, sana: el caso que se ve el 95 % de los días. */
export const PorDefecto: Story = {
  name: 'Por defecto',
  args: { ...pie, points: SANA, summary: '100 % de disponibilidad' },
};

/** Con caídas: los tres tramos —bueno, tocado y caído— en la misma tira. */
export const ConCaidas: Story = {
  name: 'Con caídas',
  args: { ...pie, points: CON_CAIDAS, summary: '98,53 % de disponibilidad' },
};

/**
 * El caso real de una aplicación recién dada de alta: el monitor lleva menos de
 * 30 días, así que los primeros puntos no tienen dato. No son ceros —no estuvo
 * caída, es que no se medía—, y por eso van rayados y se anuncian «sin datos».
 */
export const SinDatosAlPrincipio: Story = {
  name: 'Sin datos al principio',
  args: { ...pie, points: RECIEN_ESTRENADA, summary: '99,76 % de disponibilidad (12 días medidos)' },
};

/** La misma tira sobre el lienzo oscuro del sistema. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { ...pie, points: CON_CAIDAS, summary: '98,53 % de disponibilidad' },
};

/**
 * A 375px las 30 barritas siguen cabiendo: el ancho de cada una sale de repartir
 * el contenedor, así que la tira encoge en vez de desbordar.
 */
export const EnMovil: Story = {
  name: 'A 375px',
  render: (args) => (
    <div style={{ inlineSize: 375, paddingInline: 'var(--spacing-4)', boxSizing: 'border-box' }}>
      <UptimeBars {...args} />
    </div>
  ),
  args: { ...pie, points: CON_CAIDAS, summary: '98,53 %' },
};

/**
 * Sin bocadillos. Las barritas dejan de recibir el foco —no habría nada que
 * enseñar—, pero su nombre accesible sigue completo y la media sigue en texto.
 */
export const SinBocadillos: Story = {
  name: 'Sin bocadillos',
  args: { ...pie, points: CON_CAIDAS, summary: '98,53 % de disponibilidad', tooltips: false },
};

/**
 * Otros cortes: un servicio con un compromiso más duro, donde cualquier minuto
 * caído ya tiñe el día.
 */
export const OtrosCortes: Story = {
  name: 'Otros cortes',
  args: {
    ...pie,
    points: CON_CAIDAS,
    summary: '98,53 % de disponibilidad',
    thresholds: { ok: 100, degraded: 99.9 },
  },
};

/* ── Pruebas ─────────────────────────────────────────────────────────────── */

/** Cada barrita se anuncia entera, y la que no tiene dato dice «sin datos», no 0 %. */
export const ContratoNombres: Story = {
  name: 'Test — cada barrita se anuncia entera',
  tags: ['!dev'],
  args: { ...pie, points: RECIEN_ESTRENADA, summary: '99,76 % de disponibilidad' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('list', { name: 'Disponibilidad de los últimos 30 días' })).toBeInTheDocument();
    await expect(canvas.getAllByRole('img')).toHaveLength(30);
    await expect(
      canvas.getByRole('img', { name: `${dia(29)}: sin datos. El monitor todavía no existía` }),
    ).toBeInTheDocument();
    await expect(canvas.getByRole('img', { name: `${dia(0)}: ${pct(100)}. Sin incidencias` })).toBeInTheDocument();
  },
};

/**
 * La tira es **una** parada de tabulador y las flechas recorren las barritas.
 * El bocadillo se abre con el foco, no solo con el ratón.
 */
export const ContratoTeclado: Story = {
  name: 'Test — una parada de tabulador y flechas',
  tags: ['!dev'],
  args: { ...pie, points: CON_CAIDAS, summary: '98,53 % de disponibilidad' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const barritas = canvas.getAllByRole('img');
    await expect(barritas.filter((b) => b.getAttribute('tabindex') === '0')).toHaveLength(1);

    await userEvent.tab();
    await expect(barritas[0]).toHaveFocus();
    await waitFor(async () => {
      await expect(await within(document.body).findByRole('tooltip')).toHaveTextContent(dia(29));
    });

    await userEvent.keyboard('{ArrowRight}');
    await expect(barritas[1]).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(barritas[29]).toHaveFocus();

    await userEvent.keyboard('{Home}');
    await expect(barritas[0]).toHaveFocus();

    // El vecino nunca es tabulable: la tira sigue siendo una sola parada.
    await expect(barritas.filter((b) => b.getAttribute('tabindex') === '0')).toHaveLength(1);
  },
};

/** A 375px la tira no desborda ni saca barra horizontal. */
export const ContratoCabeEnMovil: Story = {
  name: 'Test — 30 barritas caben en 375px',
  tags: ['!dev'],
  render: (args) => (
    <div style={{ inlineSize: 375, paddingInline: 'var(--spacing-4)', boxSizing: 'border-box' }}>
      <UptimeBars {...args} />
    </div>
  ),
  args: { ...pie, points: CON_CAIDAS, summary: '98,53 %' },
  play: async ({ canvasElement }) => {
    const lista = canvasElement.querySelector('.uptime-bars__list') as HTMLElement;
    await expect(lista.scrollWidth).toBeLessThanOrEqual(lista.clientWidth);
    const primera = lista.querySelector('.uptime-bars__bar')!.getBoundingClientRect();
    await expect(primera.width).toBeGreaterThan(0);
  },
};
