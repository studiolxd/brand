import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 65,
    variant: 'primary',
    size: 'md',
    label: 'Progreso del proyecto',
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    variant: 'primary',
    size: 'md',
    label: 'Sin progreso',
  },
};

export const LowValue: Story = {
  name: 'Valor bajo (etiqueta exterior)',
  args: {
    value: 8,
    variant: 'primary',
    size: 'md',
    label: 'Inicio del proceso',
  },
};

export const Complete: Story = {
  name: 'Completado (100%)',
  args: {
    value: 100,
    variant: 'primary',
    size: 'md',
    label: 'Tarea completada',
  },
};

export const SizeSmall: Story = {
  name: 'Tamaño sm (sin etiqueta)',
  args: {
    value: 45,
    variant: 'primary',
    size: 'sm',
    label: 'Progreso',
  },
};

export const SizeLarge: Story = {
  name: 'Tamaño lg',
  args: {
    value: 72,
    variant: 'primary',
    size: 'lg',
    label: 'Progreso del proyecto',
  },
};

export const AllVariants: Story = {
  name: 'Todas las variantes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ProgressBar value={65} variant="primary"   label="Primary"   />
      <ProgressBar value={65} variant="accent-1"  label="Accent 1"  />
      <ProgressBar value={65} variant="accent-2"  label="Accent 2"  />
      <ProgressBar value={65} variant="support-1" label="Support 1" />
      <ProgressBar value={65} variant="support-2" label="Support 2" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'Todos los tamaños',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ProgressBar value={65} size="sm" label="Small"  />
      <ProgressBar value={65} size="md" label="Medium" />
      <ProgressBar value={65} size="lg" label="Large"  />
    </div>
  ),
};

export const LabelThreshold: Story = {
  name: 'Umbral etiqueta interior/exterior',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {[0, 5, 10, 14, 15, 20, 50, 85, 100].map((v) => (
        <ProgressBar key={v} value={v} label={`Progreso ${v}%`} />
      ))}
    </div>
  ),
};

export const DarkBackground: Story = {
  name: 'Sobre fondo oscuro',
  render: () => (
    <div
      className="surface-dark"
      style={{
        backgroundColor: '#111E30',
        padding: '2rem',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <ProgressBar value={65} variant="primary"   label="Primary"   />
      <ProgressBar value={65} variant="accent-1"  label="Accent 1"  />
      <ProgressBar value={65} variant="accent-2"  label="Accent 2"  />
      <ProgressBar value={8}  variant="primary"   label="Valor bajo" />
    </div>
  ),
};
