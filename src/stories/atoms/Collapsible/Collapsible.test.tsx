import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';

function plegable(props: Partial<React.ComponentProps<typeof Collapsible>> = {}) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger>Detalles</CollapsibleTrigger>
      <CollapsibleContent>Contenido plegado</CollapsibleContent>
    </Collapsible>
  );
}

describe('Collapsible', () => {
  it('el disparador apunta al panel con aria-expanded y aria-controls', async () => {
    const user = userEvent.setup();
    render(plegable());
    const disparador = screen.getByRole('button', { name: 'Detalles' });

    expect(disparador).toHaveAttribute('aria-expanded', 'false');
    await user.click(disparador);
    expect(disparador).toHaveAttribute('aria-expanded', 'true');

    const panelId = disparador.getAttribute('aria-controls');
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId as string)).toHaveTextContent('Contenido plegado');
  });

  it('defaultOpen lo monta abierto', () => {
    render(plegable({ defaultOpen: true }));
    expect(screen.getByRole('button', { name: 'Detalles' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('avisa solo con el estado, sin los detalles del evento', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(plegable({ onOpenChange }));

    await user.click(screen.getByRole('button', { name: 'Detalles' }));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('controlado no se abre por su cuenta', async () => {
    const user = userEvent.setup();
    render(plegable({ open: false }));
    const disparador = screen.getByRole('button', { name: 'Detalles' });

    await user.click(disparador);
    expect(disparador).toHaveAttribute('aria-expanded', 'false');
  });

  it('deshabilitado no abre', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(plegable({ disabled: true, onOpenChange }));

    await user.click(screen.getByRole('button', { name: 'Detalles' }));
    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
