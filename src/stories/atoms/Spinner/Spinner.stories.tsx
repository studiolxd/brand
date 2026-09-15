import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Spinner } from './Spinner';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    label: { control: { type: 'text' } },
  },
  args: { size: 'md', label: 'Cargando…' },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

/** Test: rol y anuncio accesible; el contorno es un `<rect>` sin radio con `pathLength="100"`. */
export const Accesibilidad: Story = {
  name: 'Test — rol, label y contorno cuadrado',
  tags: ['!dev'],
  args: { label: 'Guardando…' },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement).getByRole('status');
    await expect(status).toHaveAttribute('aria-label', 'Guardando…');
    const rect = status.querySelector('rect.spinner__stroke');
    await expect(rect).not.toBeNull();
    await expect(rect).toHaveAttribute('pathLength', '100');
    await expect(rect).not.toHaveAttribute('rx');
  },
};

/** Test: decorativo — sin rol ni texto anunciado. */
export const Decorativo: Story = {
  name: 'Test — aria-hidden',
  tags: ['!dev'],
  args: { 'aria-hidden': true },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole('status')).toBeNull();
    await expect(canvasElement.querySelector('.spinner')).toHaveAttribute('aria-hidden', 'true');
  },
};

/**
 * El texto de la espera sale de `spinner.label`. Conserva los puntos
 * suspensivos: es progreso, no una frase (Foundations → Redacción § «Los
 * estados de carga llevan puntos suspensivos»). Un spinner decorativo
 * (`aria-hidden`) **no exige la clave**: no anuncia nada.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <Spinner />
    </BrandMessagesProvider>
  ),
};

/** Test: la espera lee del catálogo y conserva los puntos suspensivos. */
export const ContratoProveedor: Story = {
  name: 'Test — la espera lee su texto del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <Spinner />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status', { name: 'Loading…' })).toBeInTheDocument();
  },
};
