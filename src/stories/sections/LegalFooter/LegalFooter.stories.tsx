import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { LegalFooter } from './LegalFooter';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const links = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
  { id: 'cookies', label: 'Cookies', href: '#cookies' },
  { id: 'condiciones', label: 'Condiciones', href: '#condiciones' },
];

const meta: Meta<typeof LegalFooter> = {
  title: 'Sections/LegalFooter',
  component: LegalFooter,
  parameters: { layout: 'fullscreen' },
  args: { links },
  argTypes: { renderLink: { table: { disable: true } }, className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof LegalFooter>;

export const PorDefecto: Story = {};

export const ConTitulo: Story = { args: { title: 'Legal' } };

export const Contrato: Story = {
  name: 'Test — nav con nombre y enlaces por el router',
  tags: ['!dev'],
  args: { label: 'Legal', renderLink: ({ children, ...props }) => <a {...props} data-router="sí">{children}</a> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Legal' });
    const enlaces = within(nav).getAllByRole('link');
    await expect(enlaces).toHaveLength(4);
    await expect(enlaces[1]).toHaveAttribute('href', '#privacidad');
    await expect(enlaces[1]).toHaveAttribute('data-router', 'sí');
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};

/**
 * El nombre de la navegación sale de `legalFooter.label`. Los rótulos de los
 * enlaces son datos y viajan en `links`; el `title` es el contenido de ESE pie.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <LegalFooter
        links={[
          { id: 'legal', label: 'Legal notice', href: '#legal' },
          { id: 'privacy', label: 'Privacy', href: '#privacy' },
          { id: 'cookies', label: 'Cookies', href: '#cookies' },
        ]}
      />
    </BrandMessagesProvider>
  ),
};

/** Test: el pie toma el nombre de su navegación del catálogo. */
export const ContratoProveedor: Story = {
  name: 'Test — el pie lee el nombre de su navegación del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <LegalFooter links={[{ id: 'privacy', label: 'Privacy', href: '#privacy' }]} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Legal' })).toBeInTheDocument();
  },
};
