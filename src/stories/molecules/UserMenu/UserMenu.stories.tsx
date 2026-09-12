import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { UserMenu } from './UserMenu';

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
