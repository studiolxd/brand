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
      options: ['default', 'primary', 'accent-1', 'accent-2', 'support-1', 'support-2'],
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
    </div>
  ),
};
