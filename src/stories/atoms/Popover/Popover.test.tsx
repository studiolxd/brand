import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from './Popover';

const trigger = <button type="button">Abrir</button>;

describe('Popover', () => {
  it('abre el panel al pulsar el disparador y lo nombra con `label`', async () => {
    const user = userEvent.setup();
    render(<Popover trigger={trigger} label="Detalles"><p>Contenido</p></Popover>);
    const boton = screen.getByRole('button', { name: 'Abrir' });

    expect(boton).toHaveAttribute('aria-haspopup', 'dialog');
    expect(boton).toHaveAttribute('aria-expanded', 'false');

    await user.click(boton);
    expect(await screen.findByRole('dialog', { name: 'Detalles' })).toBeInTheDocument();
    expect(boton).toHaveAttribute('aria-expanded', 'true');
  });

  it('cierra con Escape y avisa por onOpenChange', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={trigger} label="Detalles" onOpenChange={onOpenChange}>
        <p>Contenido</p>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    // El segundo argumento es el detalle de Base UI: por qué pasa y cómo cancelarlo.
    expect(onOpenChange).toHaveBeenLastCalledWith(
      true,
      expect.objectContaining({ reason: 'trigger-press' }),
    );

    await user.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenLastCalledWith(
      false,
      expect.objectContaining({ reason: 'escape-key' }),
    );
  });

  it('en modo controlado el panel obedece a `open`, no a la pulsación', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Popover trigger={trigger} label="Detalles" open={false} onOpenChange={onOpenChange}>
        <p>Contenido</p>
      </Popover>,
    );
    await user.click(screen.getByRole('button', { name: 'Abrir' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onOpenChange).toHaveBeenCalledWith(
      true,
      expect.objectContaining({ reason: 'trigger-press' }),
    );
  });
});
