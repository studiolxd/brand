import { describe, it, expect, afterEach, vi } from 'vitest';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster } from './Toaster';
import { toast } from './toast';

afterEach(() => {
  vi.useRealTimers();
});

/** Lanzar un aviso es un cambio de estado de la cola: va dentro de `act`. */
function lanzar(fn: () => void) {
  act(() => { fn(); });
}

/** Las tarjetas en pantalla. Se consultan por el DOM porque la pila va en un portal. */
function tarjetas() {
  return Array.from(document.querySelectorAll<HTMLElement>('.toast'));
}

/** El texto de las tarjetas: `error` y `warning` duplican el suyo en la región asertiva. */
function titulos() {
  return tarjetas().map((tarjeta) => tarjeta.querySelector('.alert__title')?.textContent);
}

/**
 * El aspa se consulta por su clase: el motor la oculta al lector de pantalla
 * (`aria-hidden`) mientras la pila está recogida, así que no tiene rol hasta que
 * el ratón o el foco la despliegan.
 */
function aspa() {
  return document.querySelector<HTMLElement>('.toast .alert__close');
}

describe('Toaster', () => {
  it('el aviso se cierra solo al agotarse su duración', async () => {
    vi.useFakeTimers();
    render(<Toaster duration={5000} />);
    lanzar(() => toast('Cambios guardados'));

    expect(screen.getByText('Cambios guardados')).toBeInTheDocument();

    await act(async () => { await vi.advanceTimersByTimeAsync(5001); });
    expect(screen.queryByText('Cambios guardados')).toBeNull();
  });

  it('con duration Infinity el aviso no se va solo', async () => {
    vi.useFakeTimers();
    render(<Toaster duration={80} />);
    lanzar(() => toast('Aviso fijo', { duration: Infinity }));

    await act(async () => { await vi.advanceTimersByTimeAsync(5000); });
    expect(screen.getByText('Aviso fijo')).toBeInTheDocument();
  });

  it('el aspa cierra el aviso, y closeLabel traduce su nombre accesible', async () => {
    render(<Toaster closeLabel="Close" />);
    lanzar(() => toast('Un aviso'));

    await screen.findByText('Un aviso');
    const boton = aspa()!;
    expect(boton.getAttribute('aria-label')).toBe('Close');

    await userEvent.click(boton);
    await waitFor(() => { expect(tarjetas()).toHaveLength(0); });
  });

  it('la tarjeta del aviso es un Alert: mismas clases, mismos tokens', async () => {
    render(<Toaster />);
    lanzar(() => toast.error('Se ha roto algo'));

    await waitFor(() => { expect(titulos()).toEqual(['Se ha roto algo']); });
    const tarjeta = tarjetas()[0];
    expect(tarjeta.classList.contains('alert')).toBe(true);
    expect(tarjeta.classList.contains('alert--error')).toBe(true);
    expect(tarjeta.classList.contains('alert--dismissible')).toBe(true);
  });

  it('el rol sale de la intención: error y warning interrumpen', async () => {
    render(<Toaster />);

    lanzar(() => toast('Neutro'));
    await waitFor(() => { expect(tarjetas()).toHaveLength(1); });
    expect(tarjetas()[0].getAttribute('role')).toBe('dialog');

    lanzar(() => toast.warning('Ojo'));
    await waitFor(() => { expect(tarjetas()).toHaveLength(2); });
    expect(tarjetas()[0].getAttribute('role')).toBe('alertdialog');
  });

  it('la acción se pinta como botón y llama a su manejador', async () => {
    const onClick = vi.fn();
    render(<Toaster />);
    lanzar(() => toast('Proyecto archivado', { action: { label: 'Deshacer', onClick } }));

    const accion = await screen.findByRole('button', { name: 'Deshacer' });
    await userEvent.click(accion);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('reutilizar un id actualiza el aviso en su sitio en vez de apilar otro', async () => {
    render(<Toaster />);

    let id = '';
    lanzar(() => { id = toast.loading('Exportando…'); });
    await screen.findByText('Exportando…');

    lanzar(() => toast.success('Exportado', { id }));
    await waitFor(() => { expect(titulos()).toEqual(['Exportado']); });
  });

  it('dismiss cierra un aviso por id, y sin id cierra todos', async () => {
    render(<Toaster />);

    let id = '';
    lanzar(() => { id = toast('Primero'); });
    lanzar(() => toast('Segundo'));
    await screen.findByText('Segundo');

    lanzar(() => toast.dismiss(id));
    await waitFor(() => { expect(titulos()).toEqual(['Segundo']); });

    lanzar(() => toast.dismiss());
    await waitFor(() => { expect(tarjetas()).toHaveLength(0); });
  });

  it('sin closeButton no hay aspa', async () => {
    render(<Toaster closeButton={false} />);
    lanzar(() => toast('Un aviso'));

    await screen.findByText('Un aviso');
    expect(aspa()).toBeNull();
    expect(tarjetas()[0].classList.contains('alert--dismissible')).toBe(false);
  });

  it('containerAriaLabel nombra la región de notificaciones', async () => {
    render(<Toaster containerAriaLabel="Avisos" />);
    await waitFor(() => {
      expect(document.querySelector('.toaster[aria-label="Avisos"]')).not.toBeNull();
    });
  });
});
