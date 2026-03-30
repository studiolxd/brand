import type { Meta, StoryObj } from '@storybook/react-vite';
import { Paragraph } from './Paragraph';

const meta: Meta<typeof Paragraph> = {
  title: 'Atoms/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
      description: 'Tamaño del texto del párrafo.',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del párrafo.',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    size: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'small' },
};

export const Large: Story = {
  args: { size: 'large' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Paragraph size="small">Small — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
      <Paragraph size="default">Default — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
      <Paragraph size="large">Large — Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Paragraph>
    </div>
  ),
};
