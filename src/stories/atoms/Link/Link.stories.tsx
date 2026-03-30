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

/** Navega con Tab hasta el enlace para ver el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

export const External: Story = {
  args: { external: true },
};
