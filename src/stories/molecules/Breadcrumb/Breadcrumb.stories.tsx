import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    separator: {
      control: { type: 'text' },
    },
    ariaLabel: {
      control: { type: 'text' },
    },
  },
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Diseño instruccional' },
    ],
    separator: '/',
    ariaLabel: 'Migas de pan',
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const ConRenderLink: Story = {
  name: 'Con renderLink (simula Next.js Link)',
  args: {
    renderLink: ({ href, children, className }) => (
      <a href={href} className={className} data-router="next">
        {children}
      </a>
    ),
  },
};

export const ItemSinHref: Story = {
  name: 'Item sin href',
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Categoría' },
      { label: 'Artículo actual' },
    ],
  },
};

export const UnSoloItem: Story = {
  name: 'Un solo item',
  args: {
    items: [{ label: 'Inicio' }],
  },
};

export const SeparadorChevron: Story = {
  name: 'Separador ›',
  args: {
    separator: '›',
  },
};

export const DarkMode: Story = {
  name: 'Dark mode',
  decorators: [
    (Story) => (
      <div
        className="surface-dark"
        style={{ padding: '2rem', backgroundColor: 'var(--color-background-dark)' }}
      >
        <Story />
      </div>
    ),
  ],
};
