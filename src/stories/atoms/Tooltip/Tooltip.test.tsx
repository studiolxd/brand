import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { Button } from '../Button/Button';
import { CloseButton } from '../CloseButton/CloseButton';
import { DotsButton } from '../DotsButton/DotsButton';
import { Toggle } from '../Toggle/Toggle';
import { CopyButton } from '../../molecules/CopyButton/CopyButton';
import { resetWarnings } from '../../constants/env';
import { Tooltip, TooltipProvider } from './Tooltip';

/**
 * D46: un control deshabilitado con `Tooltip` sigue siendo el disparador —sin
 * envoltorio—, gracias a `focusableWhenDisabled`. Recibe el foco, abre el
 * bocadillo, se anuncia deshabilitado y no ejecuta nada.
 */
describe('Tooltip — disparador deshabilitado (focusableWhenDisabled)', () => {
  const casos: Array<[string, (onClick: () => void) => ReactElement, string]> = [
    ['Button', (onClick) => <Button disabled onClick={onClick}>Generar</Button>, 'Generar'],
    ['CloseButton', (onClick) => <CloseButton disabled label="Quitar" onClick={onClick} />, 'Quitar'],
    ['DotsButton', (onClick) => <DotsButton disabled aria-label="Más acciones" onClick={onClick} />, 'Más acciones'],
    ['CopyButton', (onClick) => <CopyButton disabled value="x" label="Copiar enlace" onClick={onClick} />, 'Copiar enlace'],
    ['Toggle', (onClick) => <Toggle disabled iconOnly aria-label="Negrita" onClick={onClick} />, 'Negrita'],
    ['<button> nativo', (onClick) => <button type="button" disabled onClick={onClick}>Exportar</button>, 'Exportar'],
  ];

  for (const [nombre, pinta, nombreAccesible] of casos) {
    it(`${nombre}: recibe el foco, abre el bocadillo, se anuncia deshabilitado y no ejecuta nada`, async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      render(
        <TooltipProvider>
          <Tooltip label="Hace falta una matriz publicada">{pinta(onClick)}</Tooltip>
        </TooltipProvider>,
      );
      const control = screen.getByRole('button', { name: nombreAccesible });
      // Sin envoltorio: el propio control es el disparador.
      expect(control.closest('.tooltip__trigger')).toBeNull();
      expect(control).not.toHaveAttribute('disabled');
      expect(control).toHaveAttribute('aria-disabled', 'true');

      await user.tab();
      expect(control).toHaveFocus();
      const bocadillo = await screen.findByRole('tooltip');
      expect(bocadillo).toHaveTextContent('Hace falta una matriz publicada');
      await waitFor(() => expect(control).toHaveAttribute('aria-describedby', bocadillo.id));

      await user.click(control);
      await user.keyboard('{Enter}');
      await user.keyboard(' ');
      expect(onClick).not.toHaveBeenCalled();
    });
  }

  it('Toggle: apagado y enfocable, no conmuta', async () => {
    const onPressedChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip label="Solo en modo edición">
          <Toggle disabled iconOnly aria-label="Negrita" onPressedChange={onPressedChange} />
        </Tooltip>
      </TooltipProvider>,
    );
    const toggle = screen.getByRole('button', { name: 'Negrita' });
    expect(toggle).toHaveAttribute('data-disabled');
    await user.click(toggle);
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('sin Tooltip, el control deshabilitado sigue fuera del orden de tabulación', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Button disabled>Generar</Button>
        <CloseButton disabled label="Quitar" />
        <Toggle disabled iconOnly aria-label="Negrita" />
        <Button>Siguiente</Button>
      </>,
    );
    expect(screen.getByRole('button', { name: 'Generar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Quitar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Negrita' })).toBeDisabled();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Siguiente' })).toHaveFocus();
  });

  it('focusableWhenDisabled a mano, sin Tooltip: enfocable y sin efecto', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button disabled focusableWhenDisabled onClick={onClick}>Generar</Button>);
    const boton = screen.getByRole('button', { name: 'Generar' });
    await user.tab();
    expect(boton).toHaveFocus();
    await user.click(boton);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('un control habilitado sigue siendo el disparador, sin envoltorio ni aria-disabled', () => {
    render(
      <TooltipProvider>
        <Tooltip label="Guardar los cambios">
          <Button variant="outline">Guardar</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    const boton = screen.getByRole('button', { name: 'Guardar' });
    expect(boton.closest('.tooltip__trigger')).toBeNull();
    expect(boton).not.toHaveAttribute('aria-disabled');
  });
});

describe('Tooltip — alias obsoleto disabledTrigger (v51)', () => {
  it('con un control del DS, ya no envuelve: activa focusableWhenDisabled y avisa', () => {
    resetWarnings();
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <TooltipProvider>
        <Tooltip label="Hace falta una matriz publicada" disabledTrigger>
          <Button disabled>Generar</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    const boton = screen.getByRole('button', { name: 'Generar' });
    expect(boton.closest('.tooltip__trigger')).toBeNull();
    expect(boton).toHaveAttribute('aria-disabled', 'true');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('`<Tooltip disabledTrigger>` está obsoleta'));
    warn.mockRestore();
  });

  it('con un disparador que no entiende focusableWhenDisabled, cae en el envoltorio de siempre', () => {
    function Ajeno(props: { disabled?: boolean }) {
      return <button type="button" disabled={props.disabled}>Campo ajeno</button>;
    }
    render(
      <TooltipProvider>
        <Tooltip label="Motivo" disabledTrigger>
          <Ajeno disabled />
        </Tooltip>
      </TooltipProvider>,
    );
    const envoltorio = screen.getByRole('group', { name: 'Campo ajeno' });
    expect(envoltorio).toHaveClass('tooltip__trigger');
    expect(envoltorio).toHaveAttribute('tabindex', '0');
    expect(envoltorio).toHaveAttribute('aria-disabled', 'true');
  });
});
