import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  NotificationPanel,
  type NotificationPanelItem,
  type NotificationPanelProps,
} from './NotificationPanel';

const items: NotificationPanelItem[] = [
  { id: '1', title: 'Marta ha comentado', body: 'Revisa la fase 2', time: 'hace 5 min', unread: true, link: '/c/1' },
  { id: '2', title: 'Vacaciones aprobadas', time: 'hace 2 h', unread: true },
  { id: '3', title: 'Parte de horas', time: 'ayer', unread: false },
];

/**
 * Un `Link` de router de verdad corta la navegación del navegador y hace la
 * suya: aquí se imita con `preventDefault`, que es lo que permite comprobar
 * el `onClick` sin que jsdom intente navegar.
 */
const renderLink: NotificationPanelProps['renderLink'] = ({ href, children, onClick, ...rest }) => (
  <a
    href={href}
    onClick={(event) => {
      event.preventDefault();
      onClick?.();
    }}
    {...rest}
  >
    {children}
  </a>
);

function setup(props: Partial<NotificationPanelProps> = {}) {
  const onRead = vi.fn();
  const utils = render(
    <NotificationPanel
      items={items}
      count={2}
      onRead={onRead}
      allHref="/notificaciones"
      preferencesHref="/notificaciones/preferencias"
      renderLink={renderLink}
      {...props}
    />,
  );
  return { onRead, ...utils };
}

describe('NotificationPanel — apertura y contrato ARIA', () => {
  it('la campana abre un diálogo nombrado y se anuncia expandida', async () => {
    const user = userEvent.setup();
    setup();
    const bell = screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' });
    expect(bell).toHaveAttribute('aria-expanded', 'false');

    await user.click(bell);
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    expect(bell).toHaveAttribute('aria-expanded', 'true');
    expect(bell).toHaveAttribute('aria-controls', panel.id);
    // La lista se llama con el título visible de la cabecera.
    expect(within(panel).getByRole('list', { name: 'Notificaciones' })).toBeInTheDocument();
  });

  it('Escape cierra y devuelve el foco a la campana', async () => {
    const user = userEvent.setup();
    setup();
    const bell = screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' });
    await user.click(bell);
    await screen.findByRole('dialog', { name: 'Notificaciones' });

    await user.keyboard('{Escape}');
    expect(bell).toHaveAttribute('aria-expanded', 'false');
    expect(bell).toHaveFocus();
  });

  it('al abrir, el foco entra por la primera notificación', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' }));
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    await waitFor(() => expect(within(panel).getAllByRole('button')[0]).toHaveFocus());
  });

  it('los textos son props: sin ellas, castellano', async () => {
    const user = userEvent.setup();
    setup({
      panelLabel: 'Notifications',
      allLabel: 'See all notifications',
      preferencesLabel: 'Notification preferences',
      viewLabel: 'View',
      unreadLabel: 'Unread',
      label: 'Notifications',
      countLabel: (n) => `Notifications: ${n} unread`,
    });
    await user.click(screen.getByRole('button', { name: 'Notifications: 2 unread' }));
    const panel = await screen.findByRole('dialog', { name: 'Notifications' });
    expect(within(panel).getByRole('link', { name: 'See all notifications' })).toBeInTheDocument();
    expect(within(panel).getByRole('link', { name: 'Notification preferences' })).toBeInTheDocument();
    expect(within(panel).getByRole('link', { name: 'View Marta ha comentado' })).toBeInTheDocument();
  });
});

describe('NotificationPanel — marcar leído', () => {
  it('pulsar una fila avisa, no cierra el panel y la deja en su sitio', async () => {
    const user = userEvent.setup();
    const { onRead } = setup();
    await user.click(screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' }));
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });

    const filas = () => within(panel).getAllByRole('button');
    expect(filas()[0]).toHaveAccessibleName(/Sin leer/);

    await user.click(filas()[0]);
    expect(onRead).toHaveBeenCalledWith('1');
    expect(screen.getByRole('dialog', { name: 'Notificaciones' })).toBeInTheDocument();

    // Sigue siendo la primera fila, ya sin el «Sin leer» y sin acción.
    expect(filas()[0]).toHaveAccessibleName(/Marta ha comentado/);
    expect(filas()[0]).not.toHaveAccessibleName(/Sin leer/);
    expect(filas()[0]).toHaveAttribute('aria-disabled', 'true');
  });

  it('una fila ya leída no vuelve a avisar', async () => {
    const user = userEvent.setup();
    const { onRead } = setup();
    await user.click(screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' }));
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });

    await user.click(within(panel).getByRole('button', { name: /Parte de horas/ }));
    expect(onRead).not.toHaveBeenCalled();
  });

  it('el enlace «Ver» también marca leído', async () => {
    const user = userEvent.setup();
    const { onRead } = setup();
    await user.click(screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' }));
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });

    await user.click(within(panel).getByRole('link', { name: 'Ver Marta ha comentado' }));
    expect(onRead).toHaveBeenCalledWith('1');
  });

  it('al cerrar el panel se olvida lo marcado aquí: manda otra vez el consumidor', async () => {
    const user = userEvent.setup();
    setup();
    const bell = screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' });
    await user.click(bell);
    let panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    await user.click(within(panel).getAllByRole('button')[0]);
    expect(within(panel).getAllByRole('button')[0]).not.toHaveAccessibleName(/Sin leer/);

    await user.keyboard('{Escape}');
    await user.click(bell);
    panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    expect(within(panel).getAllByRole('button')[0]).toHaveAccessibleName(/Sin leer/);
  });
});

describe('NotificationPanel — pie y estado vacío', () => {
  it('sin `onMarkAllRead` el pie no pinta el botón; con ella, sí, y marca todas', async () => {
    const user = userEvent.setup();
    const onMarkAllRead = vi.fn();
    const { unmount } = setup();
    await user.click(screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' }));
    let panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    expect(within(panel).queryByRole('button', { name: 'Marcar todas como leídas' })).toBeNull();
    unmount();

    setup({ onMarkAllRead });
    await user.click(screen.getByRole('button', { name: 'Notificaciones: 2 sin leer' }));
    panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    await user.click(within(panel).getByRole('button', { name: 'Marcar todas como leídas' }));
    expect(onMarkAllRead).toHaveBeenCalled();
    expect(within(panel).queryByText('Sin leer')).toBeNull();
  });

  it('sin notificaciones se ve el mensaje de al día y no hay lista', async () => {
    const user = userEvent.setup();
    setup({ items: [], count: 0 });
    await user.click(screen.getByRole('button', { name: 'Notificaciones' }));
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    expect(within(panel).getByText('Estás al día')).toBeInTheDocument();
    expect(within(panel).queryByRole('list')).toBeNull();
  });
});
