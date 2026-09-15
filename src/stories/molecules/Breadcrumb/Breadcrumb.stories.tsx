import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Breadcrumb } from './Breadcrumb';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

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

/**
 * El nombre de la región sale de `breadcrumb.label` del catálogo; los rótulos
 * del rastro son datos de la pantalla y no se traducen aquí. Con el catálogo en
 * inglés, el `nav` se llama «Breadcrumb» y el rastro sigue diciendo lo que le
 * pasa esta story.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Ajustes' }]} />
    </BrandMessagesProvider>
  ),
};

/** Test: el nombre del `nav` sale de `breadcrumb.label`, no de un default. */
export const ContratoProveedor: Story = {
  name: 'Test — las migas leen su nombre del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Ajustes' }]} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    await expect(canvas.queryByRole('navigation', { name: 'Migas de pan' })).toBeNull();
    // Y el rastro sigue siendo dato: no lo toca el catálogo.
    await expect(canvas.getByText('Ajustes')).toBeInTheDocument();
  },
};
