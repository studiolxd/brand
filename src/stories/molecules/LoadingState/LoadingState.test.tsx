import type { ReactElement } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render as renderRaw, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture } from '../../../../.storybook/brandMessagesFixture';
import { LoadingState } from './LoadingState';

function render(ui: ReactElement) {
  return renderRaw(<BrandMessagesProvider messages={brandMessagesFixture}>{ui}</BrandMessagesProvider>);
}

describe('LoadingState', () => {
  it('anuncia la espera una sola vez; el texto es su nombre y no se ve', () => {
    render(<LoadingState label="Cargando revisión…" />);

    const region = screen.getByRole('status', { name: 'Cargando revisión…' });
    expect(region).toHaveAttribute('aria-busy', 'true');
    // A la vista solo el girador: el texto es para los lectores de pantalla.
    expect(screen.getByText('Cargando revisión…')).toHaveClass('visually-hidden');
    // El girador es decorativo: no es un segundo `status`.
    expect(screen.getAllByRole('status')).toHaveLength(1);
    expect(region.querySelector('.spinner')).toHaveAttribute('aria-hidden', 'true');
  });

  it('sin label, el texto sale de spinner.label del catálogo', () => {
    render(<LoadingState />);
    expect(screen.getByRole('status', { name: 'Cargando…' })).toBeInTheDocument();
  });

  it('sin label ni catálogo, falla con el error explícito de siempre (nunca un nombre vacío)', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderRaw(<LoadingState />)).toThrow(/spinner\.label/);
    vi.restoreAllMocks();
  });

  it('con label y sin catálogo, se basta solo', () => {
    renderRaw(<LoadingState label="Cargando…" />);
    expect(screen.getByRole('status', { name: 'Cargando…' })).toBeInTheDocument();
  });

  it('talla sm: modificador y girador md', () => {
    render(<LoadingState size="sm" />);
    const region = screen.getByRole('status');
    expect(region).toHaveClass('loading-state', 'loading-state--sm');
    expect(region.querySelector('.spinner')).toHaveClass('spinner--md');
  });

  it('fill la pone a página completa; sin fill no lleva el modificador', () => {
    const { unmount } = render(<LoadingState fill />);
    expect(screen.getByRole('status')).toHaveClass('loading-state--fill');
    unmount();
    render(<LoadingState />);
    expect(screen.getByRole('status')).not.toHaveClass('loading-state--fill');
  });

  it('no emite atributos style', () => {
    const { container } = render(<LoadingState fill action={{ label: 'Cancelar' }} />);
    expect(container.querySelector('[style]')).toBeNull();
  });

  it('ofrece la salida mientras espera', async () => {
    const onCancel = vi.fn();
    render(<LoadingState label="Procesando…" action={{ label: 'Cancelar', onClick: onCancel }} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  describe('labelVisible', () => {
    it('pinta el label bajo el girador y es el mismo nodo que da el nombre accesible', () => {
      render(<LoadingState label="Procesando el documento: paso 2 de 5…" labelVisible />);
      const region = screen.getByRole('status', { name: 'Procesando el documento: paso 2 de 5…' });
      const texto = screen.getByText('Procesando el documento: paso 2 de 5…');
      expect(texto).toHaveClass('loading-state__label');
      expect(texto).not.toHaveClass('visually-hidden');
      expect(region.getAttribute('aria-labelledby')).toBe(texto.id);
      // Un solo nodo con el texto: no hay copia oculta que lo duplique.
      expect(screen.getAllByText('Procesando el documento: paso 2 de 5…')).toHaveLength(1);
      expect(region).toHaveAttribute('aria-live', 'polite');
      expect(region).toHaveAttribute('aria-atomic', 'false');
    });

    it('sin label propio no pinta el texto del catálogo: sigue oculto', () => {
      render(<LoadingState labelVisible />);
      const texto = screen.getByText('Cargando…');
      expect(texto).toHaveClass('visually-hidden');
      expect(texto).not.toHaveClass('loading-state__label');
      expect(screen.getByRole('status', { name: 'Cargando…' })).toBeInTheDocument();
    });

    it('por defecto el texto no se ve, aunque haya label', () => {
      render(<LoadingState label="Cargando revisión…" />);
      expect(screen.getByText('Cargando revisión…')).toHaveClass('visually-hidden');
    });

    it('al cambiar el label (pasos) actualiza el mismo nodo; con el mismo texto no lo toca', () => {
      const { rerender } = render(<LoadingState label="Paso 1 de 3…" labelVisible />);
      const nodo = screen.getByText('Paso 1 de 3…');
      rerender(<BrandMessagesProvider messages={brandMessagesFixture}><LoadingState label="Paso 1 de 3…" labelVisible /></BrandMessagesProvider>);
      expect(screen.getByText('Paso 1 de 3…')).toBe(nodo);
      rerender(<BrandMessagesProvider messages={brandMessagesFixture}><LoadingState label="Paso 2 de 3…" labelVisible /></BrandMessagesProvider>);
      expect(screen.getByText('Paso 2 de 3…')).toBe(nodo);
      expect(screen.getByRole('status', { name: 'Paso 2 de 3…' })).toBeInTheDocument();
    });
  });
});
