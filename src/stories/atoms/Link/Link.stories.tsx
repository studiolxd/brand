import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    href: {
      control: { type: 'text' },
      description: 'URL de destino.',
    },
    external: {
      control: { type: 'boolean' },
      description: 'Abre en nueva pestaña con rel="noopener noreferrer".',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del enlace.',
    },
  },
  args: {
    href: '#',
    children: 'Example link',
    external: false,
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const External: Story = {
  args: { external: true },
};

export const Dark: Story = {
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};
