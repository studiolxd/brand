import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent, waitFor } from 'storybook/test';
import { AppShell, useAppShell } from './AppShell';
import { AppHeader } from '../AppHeader/AppHeader';
import { Sidebar } from '../Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Container } from '../../atoms/Container/Container';
import { SidebarNav } from '../../molecules/SidebarNav/SidebarNav';
import { OrgSwitcher } from '../../molecules/OrgSwitcher/OrgSwitcher';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { NotificationButton } from '../../molecules/NotificationButton/NotificationButton';
import { Banner } from '../../molecules/Banner/Banner';
import { Button } from '../../atoms/Button/Button';
import { navEntries, orgs } from './_datos';

const header = (
  <AppHeader
    sidebarId="sidebar"
    notifications={<NotificationButton count={3} />}
    end={<UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={[{ type: 'button', label: 'Cerrar sesión', onClick: () => {}, destructive: true }]} />}
  />
);

const sidebar = (
  <Sidebar id="sidebar" logo={<Logo size="sm" />}>
    <OrgSwitcher block current={orgs[0]} organizations={orgs} onOrgChange={() => {}} />
    <SidebarNav entries={navEntries} defaultValue={['workspace']} />
  </Sidebar>
);

function Estado() {
  const { sidebar, sidebarWidth, isDesktop } = useAppShell();
  return (
    <Paragraph size="small">
      Sidebar: <strong data-testid="estado">{sidebar}</strong>
      {isDesktop && sidebarWidth ? ` · ${sidebarWidth}px` : ''} · {isDesktop ? 'escritorio' : 'móvil'}
    </Paragraph>
  );
}

const contenido = (
  <Container space="lg">
    <Heading level={1} size={7}>Panel</Heading>
    <Paragraph>El botón de menú de la barra pliega y despliega la sidebar; arrastra su borde para cambiarle el ancho, o llévalo por debajo del mínimo para dejarla en rail.</Paragraph>
    <Estado />
  </Container>
);

const meta: Meta<typeof AppShell> = {
  title: 'Sections/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
  args: { header, sidebar, children: contenido },
  argTypes: { banner: { table: { disable: true } }, header: { table: { disable: true } }, sidebar: { table: { disable: true } }, children: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

/** Escritorio: barra arriba, sidebar desplegada a la izquierda. */
export const PorDefecto: Story = {};

/** Sidebar en rail: solo iconos; los grupos se abren como menú al pulsar o al pasar el ratón. */
export const Rail: Story = { args: { defaultSidebar: 'rail' } };

export const Plegada: Story = { args: { defaultSidebar: 'closed' } };

const barraDeSistema = (
  <Banner
    variant="error"
    actions={<Button variant="outline" size="sm">Dejar de suplantar</Button>}
  >
    Estás viendo la aplicación como ana.perez@studiolxd.com.
  </Banner>
);

/**
 * La ranura `banner` va **por encima de todo, incluida la cabecera**: es para el
 * estado de sesión que no se puede perder de vista. El cuerpo sigue ocupando el
 * resto de la pantalla y la sidebar sigue midiendo el cien por cien del cuerpo.
 */
export const ConBarraDeSistema: Story = {
  name: 'Con barra de sistema',
  args: { banner: barraDeSistema },
};

/**
 * En móvil la barra también manda: el cajón de la sidebar y su velo arrancan por
 * debajo de cabecera **más** barra, con el alto que el armazón mide y publica en
 * `--app-shell-banner-height`.
 */
export const ConBarraDeSistemaEnMovil: Story = {
  name: 'Con barra de sistema (móvil)',
  globals: { viewport: { value: 'mobile1' } },
  args: { banner: barraDeSistema },
};

/**
 * Test: la barra precede a la cabecera en el DOM y el cuerpo mide lo que queda
 * de pantalla — `100dvh` menos cabecera menos barra.
 */
export const ContratoBarraPorEncimaDeLaCabecera: Story = {
  name: 'Test — barra por encima de la cabecera',
  tags: ['!dev'],
  args: { banner: barraDeSistema },
  play: async ({ canvasElement }) => {
    const shell = canvasElement.querySelector('.app-shell') as HTMLElement;
    const ranura = shell.querySelector('.app-shell__banner') as HTMLElement;
    const cabecera = shell.querySelector('.app-header') as HTMLElement;
    const cuerpo = shell.querySelector('.app-shell__body') as HTMLElement;
    const barraLateral = shell.querySelector('.sidebar') as HTMLElement;

    // Primero la barra, después la cabecera: en el DOM y en la pantalla.
    await expect(
      ranura.compareDocumentPosition(cabecera) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // El alto de la barra lo publica un `ResizeObserver`, que llega en un
    // render posterior al montaje: se espera al valor, no se busca una vez.
    await waitFor(async () => {
      const barra = ranura.getBoundingClientRect();
      await expect(barra.height).toBeGreaterThan(0);
      const publicado = getComputedStyle(shell).getPropertyValue('--app-shell-banner-height');
      await expect(Number.parseFloat(publicado)).toBeCloseTo(barra.height, 0);
    });

    const barra = ranura.getBoundingClientRect();
    const chapa = cabecera.getBoundingClientRect();
    await expect(chapa.top).toBeGreaterThanOrEqual(barra.bottom - 1);

    // El cuerpo se queda con lo que sobra, y la sidebar lo mide entero.
    const caja = cuerpo.getBoundingClientRect();
    const alto = shell.getBoundingClientRect().height;
    await expect(caja.height).toBeCloseTo(alto - barra.height - chapa.height, 0);
    await expect(barraLateral.getBoundingClientRect().height).toBeCloseTo(caja.height, 0);
  },
};

export const Contrato: Story = {
  name: 'Test — el botón de menú pliega y despliega; el asa redimensiona por teclado',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // La barra arranca abierta, así que el botón se llama por su cara de
    // cerrar: el nombre sigue al estado (`menuButton.close` / `.open`).
    const boton = canvas.getByRole('button', { name: 'Cerrar menú' });
    await expect(canvas.getByTestId('estado')).toHaveTextContent('open');
    await userEvent.click(boton);
    await expect(canvas.getByTestId('estado')).toHaveTextContent('closed');
    await expect(boton).toHaveAccessibleName('Menú de navegación');
    await userEvent.click(boton);
    await expect(canvas.getByTestId('estado')).toHaveTextContent('open');
    await expect(boton).toHaveAccessibleName('Cerrar menú');
    const asa = canvas.getByRole('separator', { name: 'Ancho de la barra lateral' });
    asa.focus();
    await userEvent.keyboard('{Home}');
    await expect(canvas.getByTestId('estado')).toHaveTextContent('rail');
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByTestId('estado')).toHaveTextContent('open');
  },
};

export const ContratoSkipLink: Story = {
  name: 'Test — el shell monta el salto al contenido',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    const skip = canvas.getByRole('link', { name: 'Saltar al contenido principal' });
    await expect(document.activeElement).toBe(skip);
    await expect(skip).toHaveAttribute('href', '#main-content');
    const main = canvasElement.querySelector('#main-content') as HTMLElement;
    await expect(main.tabIndex).toBe(-1);
    main.focus();
    await expect(document.activeElement).toBe(main);
  },
};
