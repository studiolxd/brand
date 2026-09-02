import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarPlanner } from './CalendarPlanner';
import type { PlannerEvent } from './CalendarPlanner';

const MES = new Date(2026, 0, 1);

const EVENTOS: PlannerEvent[] = [
  { id: '1', date: new Date(2026, 0, 14), label: 'Reunión' },
  { id: '2', date: new Date(2026, 0, 14), label: 'Entrega' },
  { id: '3', date: new Date(2026, 0, 14), label: 'Guardia' },
  { id: '4', date: new Date(2026, 0, 14), label: 'Retro' },
];

describe('CalendarPlanner', () => {
  it('la celda se nombra con la fecha entera, no con el número suelto', () => {
    render(<CalendarPlanner month={MES} onDayClick={() => {}} />);

    const celda = screen.getByRole('gridcell', { name: /14 de enero de 2026/ });
    expect(celda).toBeInTheDocument();
    // el dígito queda oculto al lector: no duplica la fecha
    expect(celda.querySelector('[aria-hidden="true"]')).toHaveTextContent('14');
  });

  it('abre el diálogo interno de «+N más» cuando nadie se ocupa del desbordamiento', async () => {
    const user = userEvent.setup();
    render(<CalendarPlanner month={MES} events={EVENTOS} />);

    await user.click(screen.getByRole('button', { name: '+1 más' }));

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('con onMoreClick se aparta: avisa y no abre nada', async () => {
    const user = userEvent.setup();
    const onMoreClick = vi.fn();
    render(<CalendarPlanner month={MES} events={EVENTOS} onMoreClick={onMoreClick} />);

    await user.click(screen.getByRole('button', { name: '+1 más' }));

    expect(onMoreClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('showMoreDialog manda sobre el default en los dos sentidos', async () => {
    const user = userEvent.setup();
    const onMoreClick = vi.fn();
    const { unmount } = render(
      <CalendarPlanner month={MES} events={EVENTOS} onMoreClick={onMoreClick} showMoreDialog />,
    );

    await user.click(screen.getByRole('button', { name: '+1 más' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    unmount();

    render(<CalendarPlanner month={MES} events={EVENTOS} showMoreDialog={false} />);
    await user.click(screen.getByRole('button', { name: '+1 más' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});
