import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatingDock } from './FloatingDock';

const base = {
  label: 'Abrir el asistente',
  title: 'Asistente',
  children: <p>Contenido del asistente</p>,
};

describe('FloatingDock', () => {
  it('sin `open` se gobierna solo: el lanzador abre y cierra el panel', async () => {
    const user = userEvent.setup();
    render(<FloatingDock {...base} />);
    const lanzador = screen.getByRole('button', { name: 'Abrir el asistente' });

    expect(lanzador).toHaveAttribute('aria-haspopup', 'dialog');
    expect(lanzador).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).toBeNull();

    await user.click(lanzador);
    const panel = await screen.findByRole('dialog', { name: 'Asistente' });
    // No modal: la página de detrás sigue disponible.
    expect(panel).not.toHaveAttribute('aria-modal', 'true');
    expect(lanzador).toHaveAttribute('aria-expanded', 'true');
    expect(lanzador.getAttribute('aria-controls')).toBe(panel.getAttribute('id'));
  });

  it('con `open` el panel obedece a la prop, no a la pulsación', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<FloatingDock {...base} open={false} onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole('button', { name: 'Abrir el asistente' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('el título puede quedarse solo como nombre accesible', async () => {
    render(<FloatingDock {...base} titleHidden defaultOpen />);
    const panel = await screen.findByRole('dialog', { name: 'Asistente' });
    expect(within(panel).queryByRole('heading', { name: 'Asistente' })).toBeNull();
  });

  it('el contador se anuncia en castellano y admite traducción', () => {
    const { rerender } = render(<FloatingDock {...base} badge={3} />);
    expect(screen.getByText('3 mensajes nuevos')).toBeInTheDocument();

    rerender(<FloatingDock {...base} badge={3} badgeLabel={(n) => `${n} new messages`} />);
    expect(screen.getByText('3 new messages')).toBeInTheDocument();
  });

  it('sin contador no hay región live que anunciar', () => {
    const { container } = render(<FloatingDock {...base} />);
    expect(container.querySelector('[aria-live]')).toBeNull();
  });

  it('el ancla lleva la esquina en un atributo, no en un estilo en línea', () => {
    const { container } = render(<FloatingDock {...base} position="top-start" />);
    const dock = container.querySelector('.floating-dock') as HTMLElement;
    expect(dock).toHaveAttribute('data-position', 'top-start');
    expect(dock.getAttribute('style')).toBeNull();
  });
});
