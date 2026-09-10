import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../../atoms/Button/Button';
import {
  NotificationList,
  type NotificationListItem,
  type NotificationListProps,
} from './NotificationList';

const items: NotificationListItem[] = [
  {
    id: '1',
    title: 'Marta ha comentado',
    body: 'Revisa la fase 2',
    time: 'hace 5 min',
    timeDateTime: '2026-09-10T09:12:00Z',
    unread: true,
    href: '/propuestas/48',
  },
  { id: '2', title: 'Vacaciones aprobadas', time: 'hace 2 h', unread: true },
  { id: '3', title: 'Parte de horas', time: 'ayer', unread: false, href: '/horas' },
];

/**
 * Un `Link` de router de verdad corta la navegación del navegador y hace la
 * suya: aquí se imita con `preventDefault`, que es lo que permite comprobar el
 * `onClick` sin que jsdom intente navegar.
 */
const renderLink: NotificationListProps['renderLink'] = ({ href, children, onClick, ...rest }) => (
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

function setup(props: Partial<NotificationListProps> = {}) {
  return render(<NotificationList items={items} renderLink={renderLink} {...props} />);
}

describe('NotificationList — la fila', () => {
  it('la lista se nombra y no pinta su título', () => {
    setup();
    expect(screen.getByRole('list', { name: 'Notificaciones' })).toBeInTheDocument();
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('el hueco del punto está en todas las filas; la bolita, solo en las no leídas', () => {
    const { container } = setup();
    const filas = Array.from(container.querySelectorAll('.notification-list__item'));
    expect(filas).toHaveLength(3);
    for (const fila of filas) {
      expect(fila.querySelector('.notification-list__indicator')).not.toBeNull();
    }
    expect(filas[0].querySelector('.notification-list__dot')).not.toBeNull();
    expect(filas[2].querySelector('.notification-list__dot')).toBeNull();
  });

  it('lo no leído se dice con el punto y con el peso, y se dobla en texto oculto', () => {
    const { container } = setup();
    const filas = Array.from(container.querySelectorAll('.notification-list__item'));
    expect(within(filas[0] as HTMLElement).getByText('Sin leer')).toHaveClass('visually-hidden');
    expect(filas[0].querySelector('.notification-list__title')).toHaveClass(
      'notification-list__title--unread',
    );
    expect(filas[2].querySelector('.notification-list__title')).not.toHaveClass(
      'notification-list__title--unread',
    );
  });

  it('con `href` el título es un enlace y avisa antes de navegar; sin él, texto', async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    const { container } = setup({ onItemClick });

    const enlace = screen.getByRole('link', { name: 'Marta ha comentado' });
    expect(enlace).toHaveAttribute('href', '/propuestas/48');
    await user.click(enlace);
    expect(onItemClick).toHaveBeenCalledWith(items[0]);

    // La segunda no tiene destino: su título no es un enlace.
    expect(screen.queryByRole('link', { name: 'Vacaciones aprobadas' })).toBeNull();
    const filas = Array.from(container.querySelectorAll('.notification-list__item'));
    expect(filas[1].querySelector('.notification-list__title')?.tagName).toBe('SPAN');
  });

  it('la hora va en un `<time datetime>` cuando hay fecha máquina, y en texto cuando no', () => {
    const { container } = setup();
    const filas = Array.from(container.querySelectorAll('.notification-list__item'));
    const primera = filas[0].querySelector('.notification-list__time')!;
    expect(primera.tagName).toBe('TIME');
    expect(primera).toHaveAttribute('datetime', '2026-09-10T09:12:00Z');
    expect(primera).toHaveTextContent('hace 5 min');

    const segunda = filas[1].querySelector('.notification-list__time')!;
    expect(segunda.tagName).toBe('SPAN');
    expect(segunda).toHaveTextContent('hace 2 h');
  });

  it('la fila se lee texto → acciones → hora, y la hora cierra en su propia línea', () => {
    const { container } = setup({ onMarkRead: vi.fn() });
    const fila = container.querySelector('.notification-list__item')!;
    const texto = fila.querySelector('.notification-list__text')!;
    const acciones = fila.querySelector('.notification-list__actions')!;
    const hora = fila.querySelector('.notification-list__time')!;

    // Los tres son hermanos de la fila: la hora no cuelga del bloque de
    // acciones, va en una línea propia de la rejilla.
    expect(acciones.parentElement).toBe(fila);
    expect(hora.parentElement).toBe(fila);
    expect(
      texto.compareDocumentPosition(acciones) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      acciones.compareDocumentPosition(hora) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});

describe('NotificationList — acciones', () => {
  it('sin `onMarkRead` no hay botón de marcar; con ella, solo en las no leídas', async () => {
    const user = userEvent.setup();
    const onMarkRead = vi.fn();
    const { unmount } = setup();
    expect(screen.queryByRole('button', { name: 'Marcar como leída' })).toBeNull();
    unmount();

    setup({ onMarkRead });
    const botones = screen.getAllByRole('button', { name: 'Marcar como leída' });
    expect(botones).toHaveLength(2);
    await user.click(botones[0]);
    expect(onMarkRead).toHaveBeenCalledWith('1');
  });

  it('`renderActions` pone las acciones del producto detrás de las de la lista', () => {
    const { container } = setup({
      onMarkRead: vi.fn(),
      renderActions: (item) => (
        <Button variant="text" size="sm" onClick={() => undefined}>
          Eliminar {item.id}
        </Button>
      ),
    });
    expect(screen.getAllByRole('button', { name: /Eliminar/ })).toHaveLength(3);

    const fila = container.querySelector('.notification-list__item')!;
    const botones = Array.from(fila.querySelectorAll('.button'));
    expect(botones[0]).toHaveTextContent('Marcar como leída');
    expect(botones[1]).toHaveTextContent('Eliminar 1');
  });

  it('sin acciones de ninguna clase, la fila no pinta el bloque', () => {
    const { container } = setup();
    expect(container.querySelector('.notification-list__actions')).toBeNull();
  });
});

describe('NotificationList — textos y lista vacía', () => {
  it('los textos son props: sin ellas, castellano', () => {
    setup({
      onMarkRead: vi.fn(),
      label: 'Notifications',
      unreadLabel: 'Unread',
      markReadLabel: 'Mark as read',
    });
    expect(screen.getByRole('list', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.getAllByText('Unread')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Mark as read' })).toHaveLength(2);
  });

  it('una fila puede traer su propio texto de «sin leer»', () => {
    setup({ items: [{ ...items[0], unreadLabel: 'Sin leer, urgente' }] });
    expect(screen.getByText('Sin leer, urgente')).toBeInTheDocument();
  });

  it('sin notificaciones no pinta nada: el hueco es de un `EmptyState`', () => {
    const { container } = setup({ items: [] });
    expect(container).toBeEmptyDOMElement();
  });
});
