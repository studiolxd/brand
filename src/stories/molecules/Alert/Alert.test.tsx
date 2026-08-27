import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('el rol sale de la variante y la prop lo fuerza', () => {
    const { rerender } = render(<Alert title="Aviso" />);
    expect(screen.getByRole('status')).toHaveTextContent('Aviso');

    rerender(<Alert variant="error" title="Error" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Error');

    rerender(<Alert variant="error" role="status" title="Error" />);
    expect(screen.getByRole('status')).toHaveTextContent('Error');
  });

  it('sin onDismiss, el cierre oculta el alert', async () => {
    render(<Alert dismissible title="Aviso" />);
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(screen.queryByText('Aviso')).toBeNull();
  });

  it('con onDismiss, el cierre avisa y no oculta nada', async () => {
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss} title="Aviso" />);
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Aviso')).toBeInTheDocument();
  });

  it('closeLabel traduce el nombre accesible del cierre', () => {
    render(<Alert dismissible closeLabel="Close" title="Aviso" />);
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull();
  });

  it('sin dismissible no hay botón de cierre', () => {
    render(<Alert title="Aviso" />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
