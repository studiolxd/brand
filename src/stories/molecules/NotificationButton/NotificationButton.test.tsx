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
