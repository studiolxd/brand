import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calendar } from './Calendar';

/** Enero de 2025 empieza en miércoles; los lunes son 6, 13, 20 y 27. */
const ENERO_2025 = new Date(2025, 0, 1);

function renderCalendar(props: Partial<React.ComponentProps<typeof Calendar>> = {}) {
  return render(
    <Calendar defaultMonth={ENERO_2025} value={new Date(2025, 0, 15)} {...props} />
  );
}

function celdaActiva(): HTMLElement {
  const grid = screen.getByRole('grid');
  const activas = within(grid)
    .getAllByRole('gridcell')
    .filter((cell) => cell.getAttribute('tabindex') === '0');
  expect(activas).toHaveLength(1);
  return activas[0];
}

describe('Calendar — rejilla accesible', () => {
  it('monta la estructura de rejilla: grid > row > columnheader/gridcell', () => {
    renderCalendar();
    const grid = screen.getByRole('grid');

    expect(within(grid).getAllByRole('columnheader')).toHaveLength(7);
    expect(within(grid).getAllByRole('row').length).toBeGreaterThan(1);
    expect(within(grid).getAllByRole('gridcell').length % 7).toBe(0);
  });

  it('toma como nombre el mes visible y lo cambia por el de la prop', () => {
    const { unmount } = renderCalendar();
    expect(screen.getByRole('grid')).toHaveAccessibleName(/enero/i);
    unmount();

    renderCalendar({ gridLabel: 'Calendario' });
    expect(screen.getByRole('grid')).toHaveAccessibleName('Calendario');
  });

  it('anuncia el mes vivo en una región polite', () => {
    renderCalendar();
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('aria-live', 'polite');
  });

  it('marca hoy con aria-current y la selección con aria-selected', () => {
    const hoy = new Date();
    render(<Calendar value={hoy} />);
    const grid = screen.getByRole('grid');
    const seleccionada = within(grid)
      .getAllByRole('gridcell')
      .filter((cell) => cell.getAttribute('aria-selected') === 'true');

    expect(seleccionada).toHaveLength(1);
    expect(seleccionada[0]).toHaveAttribute('aria-current', 'date');
  });

  it('deja una sola parada de tabulador, en el día seleccionado', () => {
    renderCalendar();
    expect(celdaActiva()).toHaveTextContent('15');
  });

  it('mueve el foco con las flechas: ±1 día y ±1 semana', async () => {
    const user = userEvent.setup();
    renderCalendar();
    celdaActiva().focus();

    await user.keyboard('{ArrowRight}');
    expect(document.activeElement).toHaveTextContent('16');

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(document.activeElement).toHaveTextContent('14');

    await user.keyboard('{ArrowDown}');
    expect(document.activeElement).toHaveTextContent('21');

    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(document.activeElement).toHaveTextContent('7');
  });

  it('Inicio y Fin se mueven dentro de la semana (lunes → domingo)', async () => {
    const user = userEvent.setup();
    renderCalendar();
    celdaActiva().focus();

    await user.keyboard('{Home}');
    expect(document.activeElement).toHaveTextContent('13');

    await user.keyboard('{End}');
    expect(document.activeElement).toHaveTextContent('19');
  });

  it('RePág/AvPág cambian de mes y con Mayús, de año', async () => {
    const user = userEvent.setup();
    const onMonthChange = vi.fn();
    renderCalendar({ onMonthChange });
    celdaActiva().focus();

    await user.keyboard('{PageDown}');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/febrero de 2025/i);
    expect(onMonthChange).toHaveBeenCalled();

    await user.keyboard('{PageUp}');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/enero de 2025/i);

    await user.keyboard('{Shift>}{PageDown}{/Shift}');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/enero de 2026/i);
  });

  it('cruza el borde del mes con las flechas y arrastra el mes visible', async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={ENERO_2025} value={new Date(2025, 0, 31)} />);
    celdaActiva().focus();

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/febrero de 2025/i);
    expect(document.activeElement).toHaveTextContent('1');
  });

  it('Enter y Espacio seleccionan el día enfocado', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderCalendar({ onChange });
    celdaActiva().focus();

    await user.keyboard('{ArrowRight}{Enter}');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((onChange.mock.calls[0][0] as Date).getDate()).toBe(16);

    await user.keyboard(' ');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('marca los días fuera de rango con aria-disabled y no los selecciona', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Calendar
        defaultMonth={ENERO_2025}
        value={new Date(2025, 0, 15)}
        disabledDates={[new Date(2025, 0, 16)]}
        onChange={onChange}
      />
    );

    const dia16 = within(screen.getByRole('grid'))
      .getAllByRole('gridcell')
      .find((c) => c.textContent === '16' && !c.className.includes('outside')) as HTMLElement;

    expect(dia16).toHaveAttribute('aria-disabled', 'true');

    celdaActiva().focus();
    await user.keyboard('{ArrowRight}{Enter}');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('las cabeceras de día llevan el nombre completo en un abbr', () => {
    renderCalendar();
    const cabeceras = within(screen.getByRole('grid')).getAllByRole('columnheader');

    expect(cabeceras[0]).toHaveAccessibleName(/lunes/i);
    expect(cabeceras[0].querySelector('abbr')).toHaveAttribute('title', expect.stringMatching(/lunes/i));
  });
});
