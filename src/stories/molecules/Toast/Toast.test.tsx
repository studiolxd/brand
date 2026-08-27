import { describe, it, expect } from 'vitest';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { Toaster } from './Toaster';

describe('Toaster', () => {
  it('el aviso se cierra solo al agotarse su duración', async () => {
    render(<Toaster duration={80} />);
    toast('Cambios guardados');

    const aviso = await screen.findByText('Cambios guardados');
    await waitForElementToBeRemoved(aviso, { timeout: 3000 });
  });

  it('con duration Infinity el aviso no se va solo', async () => {
    render(<Toaster duration={80} />);
    toast('Aviso fijo', { duration: Infinity });

    await screen.findByText('Aviso fijo');
    await new Promise(r => setTimeout(r, 300));
    expect(screen.getByText('Aviso fijo')).toBeInTheDocument();
  });

  it('el aspa cierra el aviso, y closeLabel traduce su nombre accesible', async () => {
    render(<Toaster closeLabel="Close" />);
    toast('Un aviso');

    await screen.findByText('Un aviso');
    const aspa = await screen.findByRole('button', { name: 'Close' });
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull();

    await userEvent.click(aspa);
    await waitForElementToBeRemoved(() => screen.queryByText('Un aviso'), { timeout: 3000 });
  });

  it('la tarjeta del aviso es un Alert: mismas clases, mismos tokens', async () => {
    render(<Toaster />);
    toast.error('Se ha roto algo');

    const titulo = await screen.findByText('Se ha roto algo');
    const tarjeta = titulo.closest('.toast');
    expect(tarjeta).not.toBeNull();
    expect(tarjeta!.classList.contains('alert')).toBe(true);
    expect(tarjeta!.classList.contains('alert--error')).toBe(true);
    expect(tarjeta!.classList.contains('alert--dismissible')).toBe(true);
    expect(titulo.classList.contains('alert__title')).toBe(true);
  });

  it('sin closeButton no hay aspa', async () => {
    render(<Toaster closeButton={false} />);
    toast('Un aviso');

    await screen.findByText('Un aviso');
    expect(screen.queryByRole('button', { name: 'Cerrar' })).toBeNull();
  });

  it('containerAriaLabel nombra la región de notificaciones', async () => {
    render(<Toaster containerAriaLabel="Avisos" />);
    expect(document.querySelector('[aria-label^="Avisos"]')).not.toBeNull();
  });
});
