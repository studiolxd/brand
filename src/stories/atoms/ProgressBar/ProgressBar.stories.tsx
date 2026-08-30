import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Porcentaje completado (0–100).',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'accent-1', 'accent-2', 'support-1', 'support-2'],
      description: 'Variante de color del relleno.',
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Talla de la barra. En `sm` no se muestra la cifra.',
    },
    label: {
      control: { type: 'text' },
      description: 'Nombre accesible: qué está avanzando.',
    },
  },
  args: {
    value: 65,
    variant: 'primary',
    size: 'md',
    label: 'Progreso del proyecto',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

const columna: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-4)',
};

export const PorDefecto: Story = {};

/** Cinco variantes de color de marca. */
export const Variantes: Story = {
  render: () => (
    <div style={columna}>
      <ProgressBar value={65} variant="primary" label="Primaria" />
      <ProgressBar value={65} variant="accent-1" label="Acento 1" />
      <ProgressBar value={65} variant="accent-2" label="Acento 2" />
      <ProgressBar value={65} variant="support-1" label="Soporte 1" />
      <ProgressBar value={65} variant="support-2" label="Soporte 2" />
    </div>
  ),
};

/** Tres tallas. En `sm` la barra es una línea y la cifra no se escribe. */
export const Tallas: Story = {
  render: () => (
    <div style={columna}>
      <ProgressBar value={65} size="sm" label="Compacta" />
      <ProgressBar value={65} size="md" label="Por defecto" />
      <ProgressBar value={65} size="lg" label="Destacada" />
    </div>
  ),
};

/** Los extremos: sin avance y completada. */
export const Extremos: Story = {
  render: () => (
    <div style={columna}>
      <ProgressBar value={0} label="Sin empezar" />
      <ProgressBar value={100} label="Completado" />
    </div>
  ),
};

/** La cifra se escribe dentro del relleno cuando cabe (15% o más) y fuera cuando no. */
export const UmbralDeLaCifra: Story = {
  name: 'Umbral de la cifra',
  render: () => (
    <div style={{ ...columna, gap: 'var(--spacing-3)' }}>
      {[0, 5, 10, 14, 15, 20, 50, 85, 100].map((v) => (
        <ProgressBar key={v} value={v} label={`Progreso ${v}%`} />
      ))}
    </div>
  ),
};

/** Sobre superficie oscura el carril y la cifra de fuera pasan a sus valores oscuros. */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={columna}>
      <ProgressBar value={65} variant="primary" label="Primaria" />
      <ProgressBar value={65} variant="accent-1" label="Acento 1" />
      <ProgressBar value={65} variant="accent-2" label="Acento 2" />
      <ProgressBar value={8} variant="primary" label="Valor bajo" />
    </div>
  ),
};

/** Test: rol, valores ARIA y nombre accesible. */
export const Contrato: Story = {
  name: 'Test — rol y valores ARIA',
  tags: ['!dev'],
  args: { value: 65, label: 'Progreso del proyecto' },
  play: async ({ canvasElement }) => {
    const barra = within(canvasElement).getByRole('progressbar', { name: 'Progreso del proyecto' });
    await expect(barra).toHaveAttribute('aria-valuenow', '65');
    await expect(barra).toHaveAttribute('aria-valuemin', '0');
    await expect(barra).toHaveAttribute('aria-valuemax', '100');
    await expect(barra).toHaveAttribute('aria-valuetext', '65%');
    // La cifra visible es decorativa: el valor lo anuncia aria-valuenow.
    await expect(barra.querySelector('.progress-bar__label')).toHaveAttribute('aria-hidden', 'true');
  },
};

/** Test: el valor se acota a 0–100 y se redondea. */
export const ContratoValor: Story = {
  name: 'Test — acotado y redondeo del valor',
  tags: ['!dev'],
  args: { value: 65 },
  render: () => (
    <>
      <ProgressBar value={-20} label="Por debajo" />
      <ProgressBar value={140} label="Por encima" />
      <ProgressBar value={65.6} label="Con decimales" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('progressbar', { name: 'Por debajo' })).toHaveAttribute('aria-valuenow', '0');
    await expect(canvas.getByRole('progressbar', { name: 'Por encima' })).toHaveAttribute('aria-valuenow', '100');
    await expect(canvas.getByRole('progressbar', { name: 'Con decimales' })).toHaveAttribute('aria-valuenow', '66');
  },
};

/**
 * Test (B2, auditoría 2026-08-30): en superficie oscura el relleno de la
 * variante `primary` se invierte a blanco; la cifra de dentro se quedaba
 * también en blanco (1.00:1). Ahora pasa a la tinta clara.
 */
export const ContratoCifraDentroEnOscuro: Story = {
  name: 'Test — la cifra de dentro contrasta en oscuro',
  tags: ['!dev'],
  parameters: { surface: 'dark' },
  args: { value: 65, variant: 'primary', label: 'Progreso' },
  play: async ({ canvasElement }) => {
    const relleno = canvasElement.querySelector('.progress-bar__fill') as HTMLElement;
    const cifra = canvasElement.querySelector('.progress-bar__label--inside') as HTMLElement;
    await expect(cifra).toBeInTheDocument();
    await expect(getComputedStyle(cifra).color).not.toBe(getComputedStyle(relleno).backgroundColor);
  },
};
