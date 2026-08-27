import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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

export const PorDefecto: Story = {};

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

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const TestContrato: Story = {
  name: 'Test — nombre accesible y página actual',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Migas de pan' });
    await expect(nav).toBeInTheDocument();

    const actual = canvas.getByText('Diseño instruccional');
    await expect(actual).toHaveAttribute('aria-current', 'page');

    const enlace = canvas.getByRole('link', { name: 'Inicio' });
    await expect(enlace).toHaveAttribute('href', '/');
  },
};

export const TestRenderLinkPropagaProps: Story = {
  name: 'Test — renderLink propaga props',
  tags: ['!dev'],
  args: {
    renderLink: (props) => <a {...props} data-router="next" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enlace = canvas.getByRole('link', { name: 'Inicio' });
    await expect(enlace).toHaveAttribute('data-router', 'next');
    await expect(enlace).toHaveAttribute('href', '/');
    await expect(enlace).toHaveClass('breadcrumb__link');
  },
};

