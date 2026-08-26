import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { SiteHeader } from './SiteHeader';
import { Button } from '../../atoms/Button/Button';
import { Container } from '../../atoms/Container/Container';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { SiteNav, type SiteNavGroup } from '../../molecules/SiteNav/SiteNav';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';

const indice: SiteNavGroup[] = [
  { id: 'soluciones', label: 'Soluciones', href: '#soluciones', items: [
    { id: 'contenidos', label: 'Contenidos elearning', href: '#contenidos', current: true },
    { id: 'plataformas', label: 'Plataformas LMS', href: '#plataformas' },
    { id: 'diseno', label: 'Diseño instruccional', href: '#diseno' },
  ] },
  { id: 'productos', label: 'Productos', items: [
    { id: 'bricks', label: 'Bricks', href: '#bricks' },
    { id: 'tender', label: 'Tender', href: '#tender' },
    { id: 'localizia', label: 'Localizia', href: '#localizia' },
  ] },
  { id: 'estudio', label: 'Estudio', items: [
    { id: 'proyectos', label: 'Proyectos', href: '#proyectos' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
  ] },
];

const meta: Meta<typeof SiteHeader> = {
  title: 'Sections/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    width: {
      control: { type: 'select' },
      options: ['md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Ancho del contenido; el fondo siempre llega de lado a lado.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SiteHeader>;

/** Logotipo a la izquierda, botón de menú a la derecha. */
export const PorDefecto: Story = {};

/** Con el índice del sitio en el panel: abre el menú para verlo. */
export const ConMenu: Story = {
  args: {
    children: <SiteNav groups={indice} />,
    settings: <ThemeSwitcher value="system" />,
  },
};

/** El panel abierto, con el índice en columnas y los ajustes al final. */
export const MenuAbierto: Story = {
  args: { ...ConMenu.args, open: true },
};

/** Con controles propios del sitio antes del menú. */
export const ConAcciones: Story = {
  args: {
    actions: <Button variant="outline">Entrar</Button>,
  },
};

/** Un producto de la suite pone su marca en vez del logotipo de Studio LXD, y enruta el enlace con su router. */
export const MarcaDelProducto: Story = {
  args: {
    logo: <strong>Bricks</strong>,
    logoLabel: 'Bricks — ir al inicio',
    renderLogoLink: ({ children, ...props }) => <a {...props} data-router="sí">{children}</a>,
    children: <SiteNav groups={indice} />,
  },
};

/** Sin índice ni ajustes no hay panel, y por tanto tampoco botón de menú: una cabecera de página de error. */
export const SinMenu: Story = {
  args: { actions: <Button variant="outline">Entrar</Button> },
};

/** La barra completa: logo, acciones del producto, idioma y menú; en el panel, el índice y los ajustes (tema). */
export const Completa: Story = {
  args: {
    actions: <Button variant="outline">Entrar</Button>,
    settings: <ThemeSwitcher value="system" />,
    language: (
      <LanguageSwitcher
        value="es"
        languages={[{ code: 'es', label: 'Español' }, { code: 'en', label: 'English' }, { code: 'fr', label: 'Français' }]}
      />
    ),
    children: <SiteNav groups={indice} />,
  },
};

/** Con página debajo. El enlace de salto al contenido lo pone `AppRoot`, no la cabecera. */
export const ConPagina: Story = {
  render: (args) => (
    <>
      <SiteHeader {...args} />
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Paragraph>
          Contenido principal de la página, bajo la cabecera.
        </Paragraph>
      </Container>
    </>
  ),
};

/** Sobre superficie oscura: el fondo sangra y la barra voltea con los tokens. */
export const SuperficieOscura: Story = {
  args: { className: 'surface-dark' } as never,
};

/** Test: el botón de menú abre y cierra el panel, y lo anuncia. */
export const ContratoLogo: Story = {
  name: 'Test — marca y enlace del logotipo por el producto; sin panel no hay botón de menú',
  tags: ['!dev'],
  args: {
    logo: <strong>Bricks</strong>,
    logoLabel: 'Bricks — ir al inicio',
    logoHref: '/es',
    renderLogoLink: ({ children, ...props }) => <a {...props} data-router="sí">{children}</a>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const logo = canvas.getByRole('link', { name: 'Bricks — ir al inicio' });
    await expect(logo).toHaveAttribute('href', '/es');
    await expect(logo).toHaveAttribute('data-router', 'sí');
    await expect(logo).toHaveClass('site-header__logo');
    await expect(logo.textContent).toBe('Bricks');
    await expect(canvas.queryByRole('button', { name: 'Menú de navegación' })).toBeNull();
  },
};

export const ContratoAjustes: Story = {
  name: 'Test — elegir en un menú del panel no cierra el panel',
  tags: ['!dev'],
  args: { settings: <ThemeSwitcher value="system" />, children: <SiteNav groups={indice} /> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Menú de navegación' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Tema' }));
    const opcion = await within(document.body).findByRole('menuitemradio', { name: 'Oscuro' });
    await userEvent.click(opcion);
    // el menú se cierra; el panel sigue abierto
    await waitFor(() => expect(within(document.body).queryByRole('menu')).toBeNull());
    await expect(canvas.getByRole('button', { name: 'Menú de navegación' })).toHaveAttribute('aria-expanded', 'true');
  },
};

export const Comportamiento: Story = {
  name: 'Test — el menú abre y cierra',
  tags: ['!dev'],
  args: { children: <nav aria-label="Principal"><a href="#uno">Uno</a></nav> },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Menú de navegación' });
    const panel = canvasElement.querySelector('#site-header-panel')!;

    await expect(boton).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toHaveAttribute('inert');

    await userEvent.click(boton);
    await expect(boton).toHaveAttribute('aria-expanded', 'true');
    await expect(panel).not.toHaveAttribute('inert');
    await expect(panel).toHaveClass('site-header__panel--open');

    // Escape cierra y devuelve el foco al botón
    await userEvent.keyboard('{Escape}');
    await expect(panel).toHaveAttribute('inert');
    await expect(document.activeElement).toBe(boton);

    // clic fuera cierra
    await userEvent.click(boton);
    await expect(panel).not.toHaveAttribute('inert');
    await userEvent.click(document.body);
    await expect(panel).toHaveAttribute('inert');
  },
};

/** Test: el fondo sangra aunque el contenido esté acotado. */
export const Sangrado: Story = {
  name: 'Test — fondo a sangre, contenido acotado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const header = canvasElement.querySelector('.site-header')!;
    const barra = canvasElement.querySelector('.site-header__bar')!;
    await expect(header.getBoundingClientRect().width).toBe(
      canvasElement.getBoundingClientRect().width,
    );
    await expect(getComputedStyle(barra).maxInlineSize).toBe('1280px');
  },
};

