import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AsyncMultiSelect } from './AsyncMultiSelect';
import type { AsyncMultiSelectOption } from './AsyncMultiSelect';

const EMPLEADOS: AsyncMultiSelectOption[] = [
  { value: '1', label: 'Ana García' },
  { value: '2', label: 'Carlos López' },
];

const buscar = (q: string): Promise<AsyncMultiSelectOption[]> =>
  Promise.resolve(q ? EMPLEADOS.filter(e => e.label.toLowerCase().includes(q.toLowerCase())) : EMPLEADOS);

describe('AsyncMultiSelect — modo no controlado', () => {
  it('pinta una pill por valor de defaultValue con la etiqueta de selectedOptions', () => {
    render(
      <AsyncMultiSelect
        onSearch={buscar}
        defaultValue={['1']}
        selectedOptions={[{ value: '1', label: 'Ana García' }]}
        aria-label="Empleados"
      />,
    );

    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).not.toHaveAttribute('placeholder');
  });

  it('sin selectedOptions no se queda vacío: la pill enseña el valor crudo', () => {
    render(<AsyncMultiSelect onSearch={buscar} defaultValue={['1']} aria-label="Empleados" />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Quitar 1' })).toBeInTheDocument();
  });

  it('recuerda la etiqueta de lo que se elige y la quita al deseleccionar', async () => {
    const user = userEvent.setup();
    render(<AsyncMultiSelect onSearch={buscar} placeholder="Buscar…" aria-label="Empleados" />);

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.click(await screen.findByRole('option', { name: 'Ana García' }));

    // la pill sale del estado interno: nadie ha pasado `selectedOptions`
    await waitFor(() => expect(screen.getByRole('button', { name: 'Quitar Ana García' })).toBeInTheDocument());

    await user.keyboard('{Escape}');
    await user.click(screen.getByRole('button', { name: 'Quitar Ana García' }));
    await waitFor(() => expect(screen.queryByRole('button', { name: 'Quitar Ana García' })).toBeNull());
  });

  it('los valores vigentes mandan sobre selectedOptions al pintar las pills', () => {
    render(
      <AsyncMultiSelect
        onSearch={buscar}
        value={['2']}
        selectedOptions={EMPLEADOS}
        aria-label="Empleados"
      />,
    );

    expect(screen.getByText('Carlos López')).toBeInTheDocument();
    expect(screen.queryByText('Ana García')).toBeNull();
  });

  it('avisa del cambio con la lista entera de valores', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <AsyncMultiSelect
        onSearch={buscar}
        defaultValue={['2']}
        selectedOptions={[{ value: '2', label: 'Carlos López' }]}
        onValueChange={onValueChange}
        placeholder="Buscar…"
        aria-label="Empleados"
      />,
    );

    await user.click(screen.getByRole('combobox'));
    await user.click(await screen.findByRole('option', { name: 'Ana García' }));

    expect(onValueChange).toHaveBeenCalledWith(['2', '1']);
  });
});
