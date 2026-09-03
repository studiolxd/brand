import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ErrorPage } from './ErrorPage';
import { Button } from '../../atoms/Button/Button';
import { Link } from '../../atoms/Link/Link';
import { SiteHeader } from '../../sections/SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LegalFooter } from '../../sections/LegalFooter/LegalFooter';

const indice = [{ id: 'sitio', label: 'Sitio', href: '#sitio', items: [{ id: 'inicio', label: 'Inicio', href: '#inicio' }, { id: 'precios', label: 'Precios', href: '#precios' }] }];
const legal = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
];

function CabeceraRota(): never {
  throw new Error('La cabecera lanza al renderizar');
}

const meta: Meta<typeof ErrorPage> = {
  title: 'Templates/ErrorPage',
  component: ErrorPage,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Error',
    description: '¡Ups! Algo ha salido mal.',
    homeAction: <Link icon="arrow-left" href="#inicio">Volver al inicio</Link>,
    retryDescription: 'Puedes reintentarlo o volver al inicio.',
    retryAction: <Button type="button" size="lg" block onClick={() => {}}>Reintentar</Button>,
  },
  argTypes: {
    homeAction: { table: { disable: true } },
    retryAction: { table: { disable: true } },
    header: { table: { disable: true } },
    footer: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof ErrorPage>;

/** Sin chrome: lo que pinta `global-error.tsx`, donde no hay proveedores. */
export const SinCabeceraNiPie: Story = { name: 'Sin cabecera ni pie' };

/** Con cabecera (sin auth) y pie: lo que pinta el `error.tsx` de una app. */
export const ConCabeceraYPie: Story = {
  name: 'Con cabecera y pie',
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    footer: <LegalFooter links={legal} />,
  },
};

/** La cabecera lanza al renderizar: desaparece ella, no la página. */
export const CabeceraQueFalla: Story = {
  name: 'Con una cabecera que falla',
  args: {
    header: <CabeceraRota />,
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
      <ErrorPage {...args} />
    </main>
  ),
};

export const Contrato: Story = {
  name: 'Test — main con título, frase y acciones',
  tags: ['!dev'],
  args: ConCabeceraYPie.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');
    await expect(main).toHaveAttribute('id', 'main-content');
    await expect(main).toHaveAttribute('tabindex', '-1');
    await expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent('Error');
    await expect(within(main).getByText('¡Ups! Algo ha salido mal.')).toHaveClass('paragraph--large');
    const contenido = main.querySelector('.error-page__content')!;
    await expect(contenido).toHaveClass('columns');
    await expect(within(contenido as HTMLElement).getByRole('link', { name: 'Volver al inicio' })).toBeInTheDocument();
    const boton = within(contenido as HTMLElement).getByRole('button', { name: 'Reintentar' });
    await expect(boton).toBeInTheDocument();
    await expect(boton).toHaveClass('button--block');
    await expect(within(contenido as HTMLElement).getByText('Puedes reintentarlo o volver al inicio.')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.site-header')).toBeInTheDocument();
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};

export const ContratoCabeceraRota: Story = {
  name: 'Test — una cabecera que lanza no tumba la página',
  tags: ['!dev'],
  args: CabeceraQueFalla.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvasElement.querySelector('.site-header')).not.toBeInTheDocument();
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('Error');
    await expect(canvas.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
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
    await expect(canvasElement.querySelector('.error-page__content')).toHaveClass('columns');
    await expect(within(canvasElement).getByRole('heading', { level: 1 })).toBeInTheDocument();
  },
};
