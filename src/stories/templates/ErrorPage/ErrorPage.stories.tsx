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
    title: 'Algo ha salido mal',
    description: 'No hemos podido cargar esta página. Puedes reintentarlo o volver al inicio.',
    actions: (
      <>
        <Button type="button" size="lg" onClick={() => {}}>Reintentar</Button>
        <Link icon="arrow-left" href="#inicio">Ir al inicio</Link>
      </>
    ),
  },
  argTypes: { actions: { table: { disable: true } }, header: { table: { disable: true } }, footer: { table: { disable: true } }, id: { table: { disable: true } } },
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

export const Contrato: Story = {
  name: 'Test — main con título, frase y acciones',
  tags: ['!dev'],
  args: ConCabeceraYPie.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const main = canvas.getByRole('main');
    await expect(main).toHaveAttribute('id', 'main-content');
    await expect(main).toHaveAttribute('tabindex', '-1');
    await expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent('Algo ha salido mal');
    await expect(within(main).getByText(/No hemos podido cargar/)).toHaveClass('paragraph--large');
    const acciones = main.querySelector('.error-page__actions')!;
    await expect(within(acciones as HTMLElement).getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
    await expect(within(acciones as HTMLElement).getByRole('link', { name: 'Ir al inicio' })).toBeInTheDocument();
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
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent('Algo ha salido mal');
    await expect(canvas.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument();
  },
};
