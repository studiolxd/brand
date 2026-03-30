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
      options: ['default', 'primary', 'secondary', 'tertiary', 'quaternary', 'quinary'],
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

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Formación presencial' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary', children: 'Plataformas LMS' },
};

export const Quaternary: Story = {
  args: { variant: 'quaternary', children: 'Consultoría' },
};

export const Quinary: Story = {
  args: { variant: 'quinary', children: 'E-learning' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      <Tag variant="default">E-learning</Tag>
      <Tag variant="primary">Diseño instruccional</Tag>
      <Tag variant="secondary">Formación presencial</Tag>
      <Tag variant="tertiary">Plataformas LMS</Tag>
      <Tag variant="quaternary">Consultoría</Tag>
      <Tag variant="quinary">E-learning</Tag>
    </div>
  ),
};
