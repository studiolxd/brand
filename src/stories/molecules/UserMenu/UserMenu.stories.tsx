import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserMenu } from './UserMenu';

const meta: Meta<typeof UserMenu> = {
  title: 'Molecules/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

const defaultItems = [
  { type: 'button' as const, label: 'Notificaciones', onClick: () => console.log('notifications') },
  { type: 'button' as const, label: 'Configuración', onClick: () => console.log('settings') },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Cerrar sesión', onClick: () => console.log('sign out'), destructive: true },
];

export const Default: Story = {
  args: {
    name: 'Ana García',
    email: 'ana.garcia@studiolxd.com',
    items: defaultItems,
  },
};

export const ConAvatar: Story = {
  args: {
    name: 'Ana García',
    email: 'ana.garcia@studiolxd.com',
    avatarUrl: 'https://placehold.co/32x32/1a2b4a/ffffff?text=AG',
    items: defaultItems,
  },
};

export const ConIconos: Story = {
  args: {
    name: 'Ana García',
    email: 'ana.garcia@studiolxd.com',
    items: [
      { type: 'button' as const, label: 'Notificaciones', icon: '🔔', onClick: () => {} },
      { type: 'button' as const, label: 'Configuración', icon: '⚙', onClick: () => {} },
      { type: 'separator' as const },
      { type: 'button' as const, label: 'Cerrar sesión', icon: '→', onClick: () => {}, destructive: true },
    ],
  },
};

export const NombreLargo: Story = {
  args: {
    name: 'Alejandro Rodríguez Martínez',
    email: 'alejandro.rodriguez.martinez@empresa.com',
    items: defaultItems,
  },
};

export const ConNotificaciones: Story = {
  args: {
    name: 'Ana García',
    email: 'ana.garcia@studiolxd.com',
    notificationCount: 5,
    items: defaultItems,
  },
};

export const MuchasNotificaciones: Story = {
  args: {
    name: 'Ana García',
    email: 'ana.garcia@studiolxd.com',
    notificationCount: 120,
    items: defaultItems,
  },
};
