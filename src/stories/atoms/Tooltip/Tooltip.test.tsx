import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '../Button/Button';
import { Tooltip, TooltipProvider } from './Tooltip';

describe('Tooltip — disparador deshabilitado', () => {
  it('pone un envoltorio focusable alrededor del control apagado', () => {
    render(
      <TooltipProvider>
        <Tooltip label="Hace falta una matriz publicada" disabledTrigger>
          <Button disabled>Generar</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    const boton = screen.getByRole('button', { name: 'Generar' });
    expect(boton).toBeDisabled();

    const envoltorio = boton.parentElement!;
    expect(envoltorio.tagName).toBe('SPAN');
    expect(envoltorio).toHaveClass('tooltip__trigger');
    // Es el envoltorio quien recibe el foco: el botón apagado no puede.
    expect(envoltorio).toHaveAttribute('tabindex', '0');
  });

  it('sin la prop, el disparador sigue siendo el propio elemento — sin envoltorio', () => {
    render(
      <TooltipProvider>
        <Tooltip label="Guardar los cambios">
          <Button variant="outline">Guardar</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    const boton = screen.getByRole('button', { name: 'Guardar' });
    expect(boton.closest('.tooltip__trigger')).toBeNull();
  });
});
