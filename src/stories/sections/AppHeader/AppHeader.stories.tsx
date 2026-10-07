import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { AppHeader } from './AppHeader';
import { Heading } from '../../atoms/Heading/Heading';
import { Logo } from '../../atoms/Logo/Logo';
import { token } from '../../../tokens/tokens';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { NotificationButton } from '../../molecules/NotificationButton/NotificationButton';

const notifications = <NotificationButton count={3} />;
const end = <UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={[{ type: 'button', label: 'Cerrar sesión', onClick: () => {}, destructive: true }]} />;

// Una marca de producto que no es el `Logo` del sistema: un SVG apaisado (5:1)
// sin medidas propias. La barra le da el alto; el ancho sale de la proporción.
const marcaDeProducto = (
  <svg viewBox="0 0 200 40" aria-hidden="true" fill="currentColor">
    <rect x="0" y="4" width="32" height="32" rx="8" />
    <rect x="44" y="12" width="148" height="16" rx="4" />
  </svg>
);

// La misma marca como imagen (4:1): un `<img>` también toma el alto de la barra.
const imagenDeProducto = (
  <img
    alt=""
    src={`data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="100" viewBox="0 0 400 100"><rect width="400" height="100" rx="20" fill="${token('--color-accent-1')}"/></svg>`)}`}
  />
);

const meta: Meta<typeof AppHeader> = {
  title: 'Sections/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  args: { notifications, end },
  argTypes: { logo: { table: { disable: true } }, renderLogoLink: { table: { disable: true } }, start: { table: { disable: true } }, notifications: { table: { disable: true } }, end: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof AppHeader>;

/** Menú · (inicio) · notificaciones · cuenta. Igual en móvil y escritorio. */
export const PorDefecto: Story = {};

/** `start`: lo que la página necesite en la barra — un título, un breadcrumb, un buscador. */
export const ConInicio: Story = {
  args: { start: <Heading level={1} size={6}>Proyectos</Heading> },
};

/**
 * `logo`: la marca del producto, entre el botón de menú y `start`. Toma el alto
 * de contenido de la barra (40px) sin que el producto le dé medidas, y enlaza a
 * `logoHref` con el texto `appHeader.logo` del catálogo.
 */
export const ConLogo: Story = {
  name: 'Con logo',
  args: { logo: <Logo />, start: <Heading level={1} size={6}>Proyectos</Heading> },
};

/** Una marca que no es el `Logo` del sistema —un SVG apaisado sin medidas—: mismo alto, el ancho que dé su proporción. */
export const ConMarcaDeProducto: Story = {
  name: 'Con una marca de producto',
  args: { logo: marcaDeProducto, logoLabel: 'Bricks, ir al inicio', start: <Heading level={1} size={6}>Proyectos</Heading> },
};

/** En un teléfono la marca mantiene su alto; lo que cede es `start`, que se recorta antes que el logo o la cuenta. */
export const ConLogoEnMovil: Story = {
  name: 'Con logo (móvil)',
  globals: { viewport: { value: 'mobile1' } },
  args: { logo: <Logo />, start: <Heading level={1} size={6}>Proyectos</Heading> },
};

export const ContratoLogo: Story = {
  name: 'Test — el logo va tras el menú, enlaza y mide el alto de contenido',
  tags: ['!dev'],
  args: { logo: <Logo size="2xl" />, logoHref: '/inicio', start: <span>Inicio</span> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enlace = canvas.getByRole('link', { name: 'Studio LXD — ir al inicio' });
    await expect(enlace).toHaveAttribute('href', '/inicio');
    const boton = canvas.getByRole('button', { name: 'Menú de navegación' });
    await expect(boton.compareDocumentPosition(enlace) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // Aunque le pidan `2xl`, el `Logo` mide lo que la barra le da: 40px.
    const marca = enlace.querySelector('svg') as SVGElement;
    await expect(Math.round(marca.getBoundingClientRect().height)).toBe(40);
    // Y la barra no crece por llevar logo.
    await expect(Math.round(canvas.getByRole('banner').getBoundingClientRect().height)).toBe(56);
  },
};

export const ContratoLogoImagen: Story = {
  name: 'Test — una imagen de cualquier proporción toma el alto y conserva la proporción',
  tags: ['!dev'],
  args: { logo: imagenDeProducto, logoLabel: 'Bricks, ir al inicio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const imagen = canvas.getByRole('link', { name: 'Bricks, ir al inicio' }).querySelector('img') as HTMLImageElement;
    await waitFor(() => expect(imagen.complete && imagen.naturalWidth > 0).toBe(true));
    const caja = imagen.getBoundingClientRect();
    await expect(Math.round(caja.height)).toBe(40);
    await expect(Math.round(caja.width)).toBe(160);
  },
};

export const ContratoSinLogo: Story = {
  name: 'Test — sin logo la barra no cambia',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole('link')).toBeNull();
    await expect(canvasElement.querySelector('.app-header__logo')).toBeNull();
  },
};

export const Contrato: Story = {
  name: 'Test — el botón de menú anuncia su estado y lo alterna',
  tags: ['!dev'],
  args: { sidebarId: 'sidebar' },
  // `aria-controls` tiene que apuntar a algo que exista: en el shell es el
  // `Sidebar`; aquí, sin shell, un hueco con ese id hace de panel gobernado.
  decorators: [(Story) => (
    <>
      <Story />
      <div id="sidebar" />
    </>
  )],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Menú de navegación' });
    await expect(boton).toHaveAttribute('aria-controls', 'sidebar');
    await expect(boton).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(boton);
    await expect(boton).toHaveAttribute('aria-expanded', 'true');
    await expect(Math.round(canvas.getByRole('banner').getBoundingClientRect().height)).toBe(56);
  },
};
