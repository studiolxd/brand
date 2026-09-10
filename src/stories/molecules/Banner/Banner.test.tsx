import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Banner } from './Banner';

describe('Banner', () => {
  it('anuncia como status/polite y las props lo fuerzan', () => {
    const { rerender } = render(<Banner>Suplantando</Banner>);
    const barra = screen.getByRole('status');
    expect(barra).toHaveTextContent('Suplantando');
    expect(barra).toHaveAttribute('aria-live', 'polite');

    rerender(<Banner role="alert" aria-live="assertive">Corte</Banner>);
    expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
  });

  it('la variante pone su clase, e `info` declara superficie oscura', () => {
    const { rerender } = render(<Banner>Info</Banner>);
    expect(screen.getByRole('status')).toHaveClass('banner', 'banner--info', 'surface-dark');

    rerender(<Banner variant="warning">Aviso</Banner>);
    const aviso = screen.getByRole('status');
    expect(aviso).toHaveClass('banner', 'banner--warning');
    // El aviso es el único relleno claro: no se declara superficie oscura.
    expect(aviso).not.toHaveClass('surface-dark');
  });

  it('el aspa solo aparece con onDismiss, y la barra no se oculta sola', async () => {
    const onDismiss = vi.fn();
    const { rerender } = render(<Banner>Suplantando</Banner>);
    expect(screen.queryByRole('button')).toBeNull();

    rerender(<Banner onDismiss={onDismiss}>Suplantando</Banner>);
    await userEvent.click(screen.getByRole('button', { name: 'Descartar aviso' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    // Controlada: quien decide si sigue en pantalla es la aplicación.
    expect(screen.getByText('Suplantando')).toBeInTheDocument();
  });

  it('dismissLabel nombra el aspa', () => {
    render(<Banner onDismiss={vi.fn()} dismissLabel="Dejar de suplantar">Suplantando</Banner>);
    expect(screen.getByRole('button', { name: 'Dejar de suplantar' })).toBeInTheDocument();
  });

  it('las acciones se pintan en su ranura y las props se reenvían', () => {
    render(
      <Banner actions={<button type="button">Dejar de suplantar</button>} className="extra" data-uso="prueba">
        Suplantando
      </Banner>,
    );
    const barra = screen.getByRole('status');
    expect(barra).toHaveAttribute('data-uso', 'prueba');
    expect(barra.className.trim().endsWith('extra')).toBe(true);
    expect(barra.querySelector('.banner__actions')).toHaveTextContent('Dejar de suplantar');
  });
});
