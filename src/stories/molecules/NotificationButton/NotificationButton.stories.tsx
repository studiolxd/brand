import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { NotificationButton } from './NotificationButton';

const meta: Meta<typeof NotificationButton> = {
  title: 'Molecules/NotificationButton',
  component: NotificationButton,
  parameters: { layout: 'padded' },
  args: { count: 3 },
  argTypes: { className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof NotificationButton>;

export const PorDefecto: Story = {};

/** Sin no leídas, solo la campana. */
export const SinContador: Story = { args: { count: 0 } };

export const Tope: Story = { args: { count: 120 } };

export const Contrato: Story = {
  name: 'Test — nombre con el contador, badge volando, tope',
  tags: ['!dev'],
  render: () => (
    <>
      <NotificationButton count={3} />
      <NotificationButton count={0} />
      <NotificationButton count={150} label="Avisos" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const b = canvas.getByRole('button', { name: 'Notificaciones: 3 sin leer' });
    await expect(Math.round(b.getBoundingClientRect().width)).toBe(40);
    const badge = b.querySelector('.notification-button__badge') as HTMLElement;
    const rb = badge.getBoundingClientRect(), rr = b.getBoundingClientRect();
    await expect(rb.top).toBeLessThan(rr.top + 1);
    await expect(rb.right).toBeGreaterThan(rr.right - 1);
    await expect(canvas.getByRole('button', { name: 'Notificaciones' }).querySelector('.notification-button__badge')).toBeNull();
    await expect(canvas.getByRole('button', { name: 'Avisos' }).textContent).toContain('99+');
  },
};
