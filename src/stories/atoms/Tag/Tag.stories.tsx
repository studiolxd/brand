import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Tag } from './Tag';
import { Paragraph } from '../Paragraph/Paragraph';
import { Stack } from '../Stack/Stack';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['primary', 'accent-1', 'accent-2', 'support-1', 'support-2', 'neutral', 'info', 'warning', 'success', 'error'],
      description: 'Color del tag.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del tag.',
    },
  },
  args: {
    children: 'E-learning',
    tone: 'neutral',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

const fila: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-2)',
  alignItems: 'center',
};

export const PorDefecto: Story = {};

/** Las cinco variantes de marca: clasifican, no informan de un estado. */
export const Marca: Story = {
  render: () => (
    <div style={fila}>
      <Tag tone="primary">Diseño instruccional</Tag>
      <Tag tone="accent-1">Formación presencial</Tag>
      <Tag tone="accent-2">Plataformas LMS</Tag>
      <Tag tone="support-1">Consultoría</Tag>
      <Tag tone="support-2">E-learning</Tag>
    </div>
  ),
};

/** Las cinco variantes semánticas: dicen en qué estado está algo. */
export const Semanticas: Story = {
  name: 'Semánticas',
  render: () => (
    <div style={fila}>
      <Tag tone="neutral">Por hacer</Tag>
      <Tag tone="info">En progreso</Tag>
      <Tag tone="warning">En pausa</Tag>
      <Tag tone="success">Completado</Tag>
      <Tag tone="error">Cancelado</Tag>
    </div>
  ),
};

/** Las diez variantes juntas. */
export const TodasLasVariantes: Story = {
  name: 'Todas las variantes',
  render: () => (
    <div style={fila}>
      <Tag tone="primary">Diseño instruccional</Tag>
      <Tag tone="accent-1">Formación presencial</Tag>
      <Tag tone="accent-2">Plataformas LMS</Tag>
      <Tag tone="support-1">Consultoría</Tag>
      <Tag tone="support-2">E-learning</Tag>
      <Tag tone="neutral">Por hacer</Tag>
      <Tag tone="info">En progreso</Tag>
      <Tag tone="warning">En pausa</Tag>
      <Tag tone="success">Completado</Tag>
      <Tag tone="error">Cancelado</Tag>
    </div>
  ),
};

/** En uso: el mismo juego de variantes describiendo estados y prioridades. */
export const EnUso: Story = {
  name: 'En uso',
  render: () => (
    <Stack gap="lg">
      <Stack>
        <Paragraph size="sm">Estados de proyecto</Paragraph>
        <div style={fila}>
          <Tag tone="neutral">Planificación</Tag>
          <Tag tone="info">Activo</Tag>
          <Tag tone="warning">En pausa</Tag>
          <Tag tone="success">Completado</Tag>
          <Tag tone="error">Cancelado</Tag>
        </div>
      </Stack>
      <Stack>
        <Paragraph size="sm">Prioridades de tarea</Paragraph>
        <div style={fila}>
          <Tag tone="neutral">Baja</Tag>
          <Tag tone="info">Media</Tag>
          <Tag tone="warning">Alta</Tag>
          <Tag tone="error">Urgente</Tag>
        </div>
      </Stack>
    </Stack>
  ),
};

/**
 * Sobre superficie oscura, `primary` e `info` invierten relleno y texto: su
 * prusia es el fondo de la superficie y el tag desaparecería. El resto de
 * variantes no cambian.
 */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
  render: () => (
    <div style={fila}>
      <Tag tone="primary">Primaria</Tag>
      <Tag tone="accent-1">Acento 1</Tag>
      <Tag tone="accent-2">Acento 2</Tag>
      <Tag tone="support-1">Soporte 1</Tag>
      <Tag tone="support-2">Soporte 2</Tag>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="info">Información</Tag>
      <Tag tone="warning">Aviso</Tag>
      <Tag tone="success">Éxito</Tag>
      <Tag tone="error">Peligro</Tag>
    </div>
  ),
};

/** Test: `className` del consumidor al final + `data-*`/`aria-*` reenviados. */
export const Contrato: Story = {
  name: 'Test — className + paso de props',
  tags: ['!dev'],
  render: () => (
    <Tag tone="primary" className="extra" data-tono="marca" aria-label="estado">
      Activo
    </Tag>
  ),
  play: async ({ canvasElement }) => {
    const tag = within(canvasElement).getByText('Activo');
    await expect(tag.tagName).toBe('SPAN');
    await expect(tag).toHaveClass('tag', 'tag--primary', 'extra');
    await expect(tag.className.trim().endsWith('extra')).toBe(true);
    await expect(tag).toHaveAttribute('data-tono', 'marca');
    await expect(tag).toHaveAttribute('aria-label', 'estado');
  },
};

/** Test: sin `variant` el tag es `neutral`. */
export const ContratoPorDefecto: Story = {
  name: 'Test — variante por defecto',
  tags: ['!dev'],
  render: () => <Tag>Por hacer</Tag>,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Por hacer')).toHaveClass('tag--neutral');
  },
};
