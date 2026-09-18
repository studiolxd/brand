import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { UserMenu } from './UserMenu';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

const items = [
  { type: 'link' as const, label: 'Mi cuenta', href: '#cuenta' },
  { type: 'button' as const, label: 'Configuración', onClick: () => {} },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true },
];

const meta: Meta<typeof UserMenu> = {
  title: 'Molecules/UserMenu',
  component: UserMenu,
  parameters: { layout: 'padded' },
  args: { name: 'Ana García', email: 'ana.garcia@studiolxd.com', items },
  argTypes: { renderLink: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof UserMenu>;

/** Sin foto, el avatar son las iniciales. */
export const PorDefecto: Story = {};

export const ConFoto: Story = {
  args: { avatarUrl: 'https://i.pravatar.cc/64?img=47' },
};

/** El badge asoma por la esquina del avatar y se anuncia con su contexto. */
export const ConNotificaciones: Story = {
  args: { notificationCount: 5 },
};

/** `compact`, para la barra: avatar, badge y chevron, sin nombre. El nombre sigue en el panel y en el nombre accesible. */
export const Compacto: Story = {
  args: { compact: true, notificationCount: 5 },
};

/** El nombre se recorta con puntos suspensivos; el panel lo muestra entero con el correo. */
export const NombreLargo: Story = {
  args: { name: 'Alejandro Rodríguez Martínez', email: 'alejandro.rodriguez.martinez@empresa.com' },
  render: (args) => <div style={{ inlineSize: '14rem' }}><UserMenu {...args} /></div>,
};

export const ContratoCompacto: Story = {
  name: 'Test — compacto: sin nombre visible, con chevron y nombre accesible',
  tags: ['!dev'],
  args: { compact: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Cuenta de Ana García' });
    await expect(boton.querySelector('.user-menu__name')).toBeNull();
    await expect(boton.querySelector('.user-menu__chevron')).not.toBeNull();
  },
};

export const Contrato: Story = {
  name: 'Test — nombre accesible, panel con identidad, ítems',
  tags: ['!dev'],
  args: { notificationCount: 120 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boton = canvas.getByRole('button', { name: 'Cuenta de Ana García' });
    await expect(canvas.getByLabelText('120 notificaciones sin leer').textContent).toBe('99+');
    await expect(boton.querySelector('.user-menu__chevron')).not.toBeNull();
    await userEvent.click(boton);
    const menu = await within(document.body).findByRole('menu');
    // Abierto, el disparador lo marca (data-popup-open): es lo que gira el chevron.
    await expect(boton).toHaveAttribute('data-popup-open');
    await expect(within(menu).getByText('ana.garcia@studiolxd.com')).toBeInTheDocument();
    await expect(within(menu).getByRole('menuitem', { name: 'Mi cuenta' })).toHaveAttribute('href', '#cuenta');
    await expect(within(menu).getAllByRole('menuitem')).toHaveLength(3);
  },
};

/**
 * La cabecera del panel es la cuenta activa: su foto a la izquierda y, al lado,
 * nombre y correo. Sin `avatarUrl` cae a las iniciales, como el disparador.
 */
export const CabeceraConAvatar: Story = {
  name: 'Cabecera con avatar',
  args: { avatarUrl: 'https://i.pravatar.cc/64?img=47', defaultOpen: true },
};

/**
 * Test: la cabecera pinta el avatar de la cuenta activa a la izquierda del
 * nombre y del correo, con foto y sin ella (iniciales), y decorativo: quien no
 * ve la pantalla ya tiene el nombre escrito al lado.
 */
export const ContratoCabeceraAvatar: Story = {
  name: 'Test — la cabecera lleva el avatar de la cuenta activa',
  tags: ['!dev'],
  args: { avatarUrl: 'https://i.pravatar.cc/64?img=47' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Cuenta de Ana García' }));
    const menu = await within(document.body).findByRole('menu');

    const cabecera = menu.querySelector('.user-menu__header') as HTMLElement;
    const avatar = cabecera.querySelector('.user-menu__header-avatar') as HTMLImageElement;
    await expect(avatar.tagName).toBe('IMG');
    await expect(avatar.getAttribute('alt')).toBe('');

    // A la izquierda del bloque nombre + correo, no encima.
    const texto = cabecera.querySelector('.user-menu__header-text') as HTMLElement;
    await expect(avatar.getBoundingClientRect().right)
      .toBeLessThanOrEqual(texto.getBoundingClientRect().left + 1);
  },
};

/** Test: sin foto, la cabecera enseña las iniciales del nombre. */
export const ContratoCabeceraIniciales: Story = {
  name: 'Test — sin foto, la cabecera cae a las iniciales',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Cuenta de Ana García' }));
    const menu = await within(document.body).findByRole('menu');
    const avatar = menu.querySelector('.user-menu__header-avatar') as HTMLElement;
    await expect(avatar.tagName).toBe('SPAN');
    await expect(avatar.textContent).toBe('AG');
  },
};

/**
 * Los dos textos del menú de cuenta interpolan un dato —el nombre, el número de
 * sin leer— y salen de `userMenu.*` del catálogo. El nombre, el correo y los
 * ítems son contenido: con el catálogo en inglés el botón se llama «Ada
 * Lovelace's account» y los ítems siguen diciendo lo que les pasa la app.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <UserMenu name="Ada Lovelace" email="ada@studiolxd.com" notificationCount={3} items={items} />
    </BrandMessagesProvider>
  ),
};

/** Test: el nombre del botón y el del contador salen del catálogo, interpolados. */
export const ContratoProveedor: Story = {
  name: 'Test — el menú de cuenta lee su cromo del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <UserMenu name="Ada Lovelace" email="ada@studiolxd.com" notificationCount={3} items={items} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: "Ada Lovelace's account" })).toBeInTheDocument();
    await expect(canvas.getByLabelText('3 unread notifications')).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Cuenta de Ada Lovelace' })).toBeNull();
  },
};
