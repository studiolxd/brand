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
    // Y, como recibe el foco, dice qué es: un grupo apagado con el nombre del
    // control que envuelve.
    expect(screen.getByRole('group', { name: 'Generar' })).toBe(envoltorio);
    expect(envoltorio).toHaveAttribute('aria-disabled', 'true');
  });

  // El botón de solo icono (el nombre del envoltorio sale de su `aria-label`)
  // no se prueba aquí: dom-accessibility-api —la de Testing Library, en jsdom
  // y en el navegador— no recoge el `aria-label` de un control descendiente al
  // seguir un `aria-labelledby`. Chromium sí lo hace, como pide accname
  // (comprobado con el árbol de accesibilidad por CDP).

  it('un id o un aria-label del consumidor no rompen el nombre del envoltorio', () => {
    render(
      <TooltipProvider>
        <Tooltip label="Motivo" disabledTrigger id="mi-disparador">
          <Button disabled>Generar</Button>
        </Tooltip>
        <Tooltip label="Motivo" disabledTrigger aria-label="Exportar (no disponible)">
          <Button disabled>Exportar</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    const conId = screen.getByRole('group', { name: 'Generar' });
    expect(conId).toHaveAttribute('id', 'mi-disparador');
    expect(conId).toHaveAttribute('aria-labelledby', 'mi-disparador');
    const conLabel = screen.getByRole('group', { name: 'Exportar (no disponible)' });
    expect(conLabel).not.toHaveAttribute('aria-labelledby');
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
