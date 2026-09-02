import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CalendarRoster } from './CalendarRoster';

const MES = new Date(2026, 0, 1);

describe('CalendarRoster', () => {
  it('el emoji del cumpleaños se puede sustituir y vaciar', () => {
    const filas = [{ id: '1', name: 'Ana García', cells: { 5: { type: 'birthday' as const, label: 'Cumpleaños' } } }];

    const { unmount } = render(<CalendarRoster month={MES} rows={filas} />);
    expect(screen.getByText('🎂 Cumpleaños')).toBeInTheDocument();
    unmount();

    render(<CalendarRoster month={MES} rows={filas} birthdayPrefix="" />);
    // «Cumpleaños» a secas también está en la leyenda: lo que se comprueba es
    // que la celda ya no lleva el emoji delante
    expect(screen.getAllByText('Cumpleaños').length).toBeGreaterThan(0);
    expect(screen.queryByText('🎂 Cumpleaños')).toBeNull();
  });

  it('la columna de nombres son cabeceras de fila', () => {
    render(
      <CalendarRoster
        month={MES}
        rows={[
          { id: '1', name: 'Ana García', cells: { 1: { type: 'schedule', label: '09–17' } } },
          { id: '2', name: 'Carlos López', cells: {} },
        ]}
      />,
    );

    const cabecera = screen.getByRole('rowheader', { name: 'Ana García' });
    expect(cabecera).toHaveAttribute('scope', 'row');
    expect(screen.getAllByRole('rowheader')).toHaveLength(2);
  });
});
