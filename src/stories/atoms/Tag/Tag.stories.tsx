import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Tag } from './Tag';
import { Paragraph } from '../Paragraph/Paragraph';
import { Stack } from '../Stack/Stack';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'accent-1', 'accent-2', 'support-1', 'support-2', 'neutral', 'info', 'warning', 'success', 'danger'],
      description: 'Variante de color del tag.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del tag.',
    },
  },
  args: {
    children: 'E-learning',
    variant: 'neutral',
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
      <Tag variant="primary">Diseño instruccional</Tag>
      <Tag variant="accent-1">Formación presencial</Tag>
      <Tag variant="accent-2">Plataformas LMS</Tag>
      <Tag variant="support-1">Consultoría</Tag>
      <Tag variant="support-2">E-learning</Tag>
    </div>
  ),
};

/** Las cinco variantes semánticas: dicen en qué estado está algo. */
export const Semanticas: Story = {
  name: 'Semánticas',
  render: () => (
    <div style={fila}>
      <Tag variant="neutral">Por hacer</Tag>
      <Tag variant="info">En progreso</Tag>
      <Tag variant="warning">En pausa</Tag>
      <Tag variant="success">Completado</Tag>
      <Tag variant="danger">Cancelado</Tag>
    </div>
  ),
};

/** Las diez variantes juntas. */
export const TodasLasVariantes: Story = {
  name: 'Todas las variantes',
  render: () => (
    <div style={fila}>
      <Tag variant="primary">Diseño instruccional</Tag>
      <Tag variant="accent-1">Formación presencial</Tag>
      <Tag variant="accent-2">Plataformas LMS</Tag>
      <Tag variant="support-1">Consultoría</Tag>
      <Tag variant="support-2">E-learning</Tag>
      <Tag variant="neutral">Por hacer</Tag>
      <Tag variant="info">En progreso</Tag>
      <Tag variant="warning">En pausa</Tag>
      <Tag variant="success">Completado</Tag>
      <Tag variant="danger">Cancelado</Tag>
    </div>
  ),
};

/** En uso: el mismo juego de variantes describiendo estados y prioridades. */
export const EnUso: Story = {
  name: 'En uso',
  render: () => (
    <Stack gap="lg">
      <Stack>
        <Paragraph size="small">Estados de proyecto</Paragraph>
        <div style={fila}>
          <Tag variant="neutral">Planificación</Tag>
          <Tag variant="info">Activo</Tag>
          <Tag variant="warning">En pausa</Tag>
          <Tag variant="success">Completado</Tag>
          <Tag variant="danger">Cancelado</Tag>
        </div>
      </Stack>
      <Stack>
        <Paragraph size="small">Prioridades de tarea</Paragraph>
        <div style={fila}>
          <Tag variant="neutral">Baja</Tag>
          <Tag variant="info">Media</Tag>
          <Tag variant="warning">Alta</Tag>
          <Tag variant="danger">Urgente</Tag>
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
  parameters: { surface: 'dark' },
  render: () => (
    <div style={fila}>
      <Tag variant="primary">Primaria</Tag>
      <Tag variant="accent-1">Acento 1</Tag>
      <Tag variant="accent-2">Acento 2</Tag>
      <Tag variant="support-1">Soporte 1</Tag>
      <Tag variant="support-2">Soporte 2</Tag>
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="info">Información</Tag>
      <Tag variant="warning">Aviso</Tag>
      <Tag variant="success">Éxito</Tag>
      <Tag variant="danger">Peligro</Tag>
    </div>
  ),
};

/** Test: `className` del consumidor al final + `data-*`/`aria-*` reenviados. */
export const Contrato: Story = {
  name: 'Test — className + paso de props',
  tags: ['!dev'],
  render: () => (
    <Tag variant="primary" className="extra" data-tono="marca" aria-label="estado">
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
