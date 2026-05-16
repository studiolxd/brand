import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'accent-1', 'accent-2', 'support-1', 'support-2', 'neutral', 'info', 'warning', 'success', 'danger'],
      description: 'Variante de color del tag.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del tag.',
    },
  },
  args: {
    children: 'E-learning',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};

export const Primary: Story = {
  args: { variant: 'primary', children: 'Diseño instruccional' },
};

export const Accent1: Story = {
  args: { variant: 'accent-1', children: 'Formación presencial' },
};

export const Accent2: Story = {
  args: { variant: 'accent-2', children: 'Plataformas LMS' },
};

export const Support1: Story = {
  args: { variant: 'support-1', children: 'Consultoría' },
};

export const Support2: Story = {
  args: { variant: 'support-2', children: 'E-learning' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag variant="default">E-learning</Tag>
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

export const Neutral: Story = {
  args: { variant: 'neutral', children: 'Por hacer' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'En progreso' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'En pausa' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Completado' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Cancelado' },
};

export const SemanticVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#767676' }}>Estados de proyecto</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Tag variant="neutral">Planificación</Tag>
          <Tag variant="info">Activo</Tag>
          <Tag variant="warning">En pausa</Tag>
          <Tag variant="success">Completado</Tag>
          <Tag variant="danger">Cancelado</Tag>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#767676' }}>Prioridades de tarea</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <Tag variant="neutral">Baja</Tag>
          <Tag variant="info">Media</Tag>
          <Tag variant="danger">Alta</Tag>
          <Tag variant="danger">Urgente</Tag>
        </div>
      </div>
    </div>
  ),
};
