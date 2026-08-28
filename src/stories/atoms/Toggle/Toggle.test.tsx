import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from './Toggle';

describe('Toggle', () => {
  it('es un botón con aria-pressed que conmuta', async () => {
    const user = userEvent.setup();
    render(<Toggle>Negrita</Toggle>);
    const boton = screen.getByRole('button', { name: 'Negrita' });

    expect(boton).toHaveAttribute('aria-pressed', 'false');
    await user.click(boton);
    expect(boton).toHaveAttribute('aria-pressed', 'true');
  });

  it('avisa solo con el estado, sin los detalles del evento', async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Negrita</Toggle>);

    await user.click(screen.getByRole('button', { name: 'Negrita' }));
    expect(onPressedChange).toHaveBeenCalledTimes(1);
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('controlado no cambia por su cuenta', async () => {
    const user = userEvent.setup();
    render(<Toggle pressed={false}>Negrita</Toggle>);
    const boton = screen.getByRole('button', { name: 'Negrita' });

    await user.click(boton);
    expect(boton).toHaveAttribute('aria-pressed', 'false');
  });

  it('deshabilitado no conmuta', async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle disabled onPressedChange={onPressedChange}>Negrita</Toggle>);

    await user.click(screen.getByRole('button', { name: 'Negrita' }));
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it('la talla y el modo solo icono llegan a las clases', () => {
    render(<Toggle size="lg" iconOnly aria-label="Negrita">B</Toggle>);
    const boton = screen.getByRole('button', { name: 'Negrita' });
    expect(boton).toHaveClass('toggle', 'toggle--lg', 'toggle--icon-only');
  });
});
