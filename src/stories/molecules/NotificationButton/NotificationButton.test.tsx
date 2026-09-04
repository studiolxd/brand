import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotificationButton } from './NotificationButton';

describe('NotificationButton — nombre accesible', () => {
  it('sin contador usa `label`', () => {
    render(<NotificationButton />);
    expect(screen.getByRole('button', { name: 'Notificaciones' })).toBeInTheDocument();
  });

  it('con contador usa `countLabel`, que recibe el número', () => {
    render(<NotificationButton count={3} />);
    expect(screen.getByRole('button', { name: 'Notificaciones: 3 sin leer' })).toBeInTheDocument();
  });

  it('las dos props se traducen por separado y el contador sigue dentro de la frase', () => {
    const { rerender } = render(<NotificationButton label="Notifications" countLabel={(n) => `Notifications: ${n} unread`} />);
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument();

    rerender(<NotificationButton count={7} label="Notifications" countLabel={(n) => `Notifications: ${n} unread`} />);
    expect(screen.getByRole('button', { name: 'Notifications: 7 unread' })).toBeInTheDocument();
  });
});

describe('NotificationButton — el contador no se lee dos veces', () => {
  it('el badge es decorativo: la cifra solo está en el nombre del botón', () => {
    render(<NotificationButton count={3} />);
    const badge = screen.getByRole('button').querySelector('.notification-button__badge')!;
    expect(badge).toHaveAttribute('aria-hidden', 'true');
    expect(badge).not.toHaveAttribute('aria-label');
    expect(screen.queryByLabelText('3')).not.toBeInTheDocument();
  });
});
