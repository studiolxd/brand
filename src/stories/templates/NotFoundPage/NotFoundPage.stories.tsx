import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { NotFoundPage } from './NotFoundPage';
import { Link } from '../../atoms/Link/Link';
import { SiteHeader } from '../../sections/SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LegalFooter } from '../../sections/LegalFooter/LegalFooter';

const indice = [{ id: 'sitio', label: 'Sitio', href: '#sitio', items: [{ id: 'inicio', label: 'Inicio', href: '#inicio' }, { id: 'precios', label: 'Precios', href: '#precios' }] }];
const legal = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
];

const meta: Meta<typeof NotFoundPage> = {
  title: 'Templates/NotFoundPage',
  component: NotFoundPage,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Página no encontrada',
    description: 'Error 404',
    homeLink: <Link icon="arrow-left" href="#inicio">Ir al inicio</Link>,
  },
  argTypes: { homeLink: { table: { disable: true } }, header: { table: { disable: true } }, footer: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof NotFoundPage>;

/** Solo el mensaje y la vuelta: el marco sin cabecera ni pie. */
export const SinCabeceraNiPie: Story = { name: 'Sin cabecera ni pie' };

/** Con el chrome público del sitio: `SiteHeader` con su `SiteNav` y `LegalFooter`. */
export const ConCabeceraYPie: Story = {
  name: 'Con cabecera y pie',
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    footer: <LegalFooter links={legal} />,
  },
};

/** `shell={false}`: solo el contenido, dentro de una app que ya tiene su `main`. */
export const DentroDeUnaApp: Story = {
  name: 'Dentro de una app',
  parameters: { layout: 'padded' },
  args: { shell: false },
  render: (args) => (
    <main id="app-main">
      <NotFoundPage {...args} />
    </main>
  ),
};

export const Contrato: Story = {
  name: 'Test — main con título, frase y enlace de vuelta',
  tags: ['!dev'],
  args: ConCabeceraYPie.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');
    await expect(main).toHaveAttribute('id', 'main-content');
    await expect(main).toHaveAttribute('tabindex', '-1');
    await expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent('Página no encontrada');
    await expect(within(main).getByText('Error 404')).toHaveClass('paragraph--large');
    await expect(within(main).getByRole('link', { name: 'Ir al inicio' })).toHaveAttribute('href', '#inicio');
    await expect(canvasElement.querySelector('.site-header')).toBeInTheDocument();
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};

export const ContratoSinShell: Story = {
  name: 'Test — sin shell no hay SiteShell ni main propio',
  tags: ['!dev'],
  args: { ...ConCabeceraYPie.args, shell: false },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.site-shell')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('main')).not.toBeInTheDocument();
    await expect(canvasElement.querySelector('.site-header')).not.toBeInTheDocument();
    await expect(canvasElement.firstElementChild).toHaveClass('stack');
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeInTheDocument();
  },
};
