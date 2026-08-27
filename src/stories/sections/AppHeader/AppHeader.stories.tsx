import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { AppHeader } from './AppHeader';
import { Heading } from '../../atoms/Heading/Heading';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { NotificationButton } from '../../molecules/NotificationButton/NotificationButton';

const notifications = <NotificationButton count={3} />;
const end = <UserMenu compact name="Ana García" email="ana.garcia@studiolxd.com" items={[{ type: 'button', label: 'Cerrar sesión', onClick: () => {}, destructive: true }]} />;

const meta: Meta<typeof AppHeader> = {
  title: 'Sections/AppHeader',
  component: AppHeader,
  parameters: { layout: 'fullscreen' },
  args: { notifications, end },
  argTypes: { start: { table: { disable: true } }, notifications: { table: { disable: true } }, end: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof AppHeader>;

/** Menú · (inicio) · notificaciones · cuenta. Igual en móvil y escritorio. */
export const PorDefecto: Story = {};

/** `start`: lo que la página necesite en la barra — un título, un breadcrumb, un buscador. */
export const ConInicio: Story = {
  args: { start: <Heading level={1} size={6}>Proyectos</Heading> },
};

export const Contrato: Story = {
  name: 'Test — el botón de menú anuncia su estado y lo alterna',
  tags: ['!dev'],
  args: { sidebarId: 'sidebar' },
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
