import { describe, it, expect, vi } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';

/** El control con estado, como lo monta un formulario de verdad. */
function DatePickerControlado({
  onChange,
  ...props
}: Partial<React.ComponentProps<typeof DatePicker>> = {}) {
  const [value, setValue] = useState<Date | null>(props.value ?? null);
  return (
    <DatePicker
      aria-label="Fecha"
      {...props}
      value={value}
      onChange={(date) => {
        setValue(date);
        onChange?.(date);
      }}
    />
  );
}

function campo(): HTMLInputElement {
  return screen.getByRole('textbox', { name: 'Fecha' }) as HTMLInputElement;
}

describe('DatePicker — el campo se escribe', () => {
  it('enseña la fecha en el formato numérico del locale', () => {
    render(<DatePicker aria-label="Fecha" value={new Date(2026, 8, 25)} />);
    expect(campo()).toHaveValue('25/09/2026');
  });

  it('enseña la máscara del locale como pista', () => {
    const { unmount } = render(<DatePicker aria-label="Fecha" />);
    expect(campo()).toHaveAttribute('placeholder', 'dd/mm/aaaa');
    unmount();

    render(<DatePicker aria-label="Fecha" locale="en-US" />);
    expect(campo()).toHaveAttribute('placeholder', 'mm/dd/aaaa');
  });

  it('emite la fecha escrita cuando está completa', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePickerControlado onChange={onChange} />);

    await user.type(campo(), '25/09/2026');

    expect(onChange).toHaveBeenCalled();
    const ultima = onChange.mock.calls.at(-1)![0] as Date;
    expect(ultima).toEqual(new Date(2026, 8, 25));
  });

  it('no emite una fecha a medias y la marca en error', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePickerControlado onChange={onChange} />);

    await user.type(campo(), '25/09');

    expect(onChange).not.toHaveBeenCalled();
    expect(campo()).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(campo()).toHaveAccessibleDescription(/fecha completa/i);
  });

  it('vaciarlo borra la fecha: emite null', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePickerControlado value={new Date(2026, 8, 25)} onChange={onChange} />);

    await user.clear(campo());

    expect(onChange).toHaveBeenCalledWith(null);
    expect(campo()).toHaveValue('');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('el mensaje de fecha incompleta es una prop con default castellano', async () => {
    const user = userEvent.setup();
    render(<DatePickerControlado invalidMessage="Enter a full date." />);

    await user.type(campo(), '25/09');
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a full date.');
  });
});

describe('DatePicker — el calendario', () => {
  it('lo abre el botón del final del campo y elegir un día rellena el campo', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<DatePickerControlado value={new Date(2026, 8, 1)} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: 'Abrir calendario' }));

    const dia = screen.getByRole('gridcell', { name: /\b25 de \w+ de 2026$/ });
    await user.click(dia);

    expect(onChange).toHaveBeenCalled();
    expect(campo()).toHaveValue('25/09/2026');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('la flecha abajo desde el campo lo abre y Escape lo cierra', async () => {
    const user = userEvent.setup();
    render(<DatePickerControlado />);

    campo().focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('dialog', { name: 'Calendario' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('de solo lectura no abre nada', async () => {
    const user = userEvent.setup();
    render(<DatePickerControlado readOnly value={new Date(2026, 8, 25)} />);

    await user.click(screen.getByRole('button', { name: 'Abrir calendario' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('el input oculto del formulario lleva la fecha local, no la UTC', () => {
    const { container } = render(
      <DatePicker aria-label="Fecha" name="fecha" value={new Date(2026, 0, 1, 0, 30)} />
    );
    expect(container.querySelector<HTMLInputElement>('input[name="fecha"]')).toHaveValue('2026-01-01');
  });
});
