import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiSelect } from './MultiSelect';

const OPCIONES = [
  { value: 'design', label: 'Diseño' },
  { value: 'dev', label: 'Desarrollo' },
];

describe('MultiSelect — contrato con el formulario', () => {
  it('abrir la lista no cuenta como salir del control: onBlur espera a que el foco se vaya', async () => {
    const user = userEvent.setup();
    const onBlur = vi.fn();
    render(
      <>
        <MultiSelect options={OPCIONES} onBlur={onBlur} aria-label="Servicios" placeholder="Elegir" removeLabel={(l) => `Quitar ${l}`} />
        <button type="button">Siguiente</button>
      </>,
    );
    const combobox = screen.getByRole('combobox', { name: 'Servicios' });
    combobox.focus();
    await user.keyboard('{ArrowDown}');
    await screen.findByRole('listbox');
    await user.keyboard('{Enter}');
    expect(onBlur).not.toHaveBeenCalled();

    await user.keyboard('{Escape}');
    await waitFor(() => expect(combobox).toHaveFocus());
    expect(onBlur).not.toHaveBeenCalled();

    await user.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('envía un input oculto por valor elegido con el nombre del campo', () => {
    const { container } = render(
      <MultiSelect options={OPCIONES} name="servicios" defaultValue={['design', 'dev']} aria-label="Servicios" placeholder="Elegir" removeLabel={(l) => `Quitar ${l}`} />,
    );
    const enviados = [...container.querySelectorAll<HTMLInputElement>('input[name="servicios"]')].map(i => i.value);
    expect(enviados).toEqual(['design', 'dev']);
  });
});
