import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToggleGroup } from './ToggleGroup';
import { Toggle } from '../Toggle/Toggle';

function grupo(props: Partial<React.ComponentProps<typeof ToggleGroup>> = {}) {
  return (
    <ToggleGroup aria-label="Periodo" {...props}>
      <Toggle value="mensual">Mensual</Toggle>
      <Toggle value="anual">Anual</Toggle>
    </ToggleGroup>
  );
}

describe('ToggleGroup', () => {
  it('es un role="group" con su nombre accesible', () => {
    render(grupo());
    expect(screen.getByRole('group', { name: 'Periodo' })).toBeInTheDocument();
  });

  it('exclusivo: elegir uno suelta el anterior', async () => {
    const user = userEvent.setup();
    render(grupo({ defaultValue: ['mensual'] }));

    await user.click(screen.getByRole('button', { name: 'Anual' }));
    expect(screen.getByRole('button', { name: 'Anual' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Mensual' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('multiple: los valores se acumulan', async () => {
    const user = userEvent.setup();
    render(grupo({ multiple: true, defaultValue: ['mensual'] }));

    await user.click(screen.getByRole('button', { name: 'Anual' }));
    expect(screen.getByRole('button', { name: 'Anual' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Mensual' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('avisa con la lista de valores, sin los detalles del evento', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(grupo({ onValueChange }));

    await user.click(screen.getByRole('button', { name: 'Anual' }));
    expect(onValueChange).toHaveBeenCalledWith(['anual']);
  });

  it('reparte la talla a sus botones', () => {
    render(grupo({ size: 'lg' }));
    expect(screen.getByRole('button', { name: 'Anual' })).toHaveClass('toggle--lg');
  });

  it('deshabilitado deshabilita a todos', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(grupo({ disabled: true, onValueChange }));

    await user.click(screen.getByRole('button', { name: 'Anual' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
