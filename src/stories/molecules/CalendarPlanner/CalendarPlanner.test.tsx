import { describe, it, expect, vi } from 'vitest';
import { render as renderRTL, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarPlanner } from './CalendarPlanner';
import type { PlannerEvent } from './CalendarPlanner';
import type { ReactNode } from 'react';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

/**
 * Estas piezas ya no traen su castellano puesto: el cromo sale del catálogo.
 * Aquí el catálogo lo monta este envoltorio, que es lo que hace la aplicación
 * en su raíz. `rerender` lo reutiliza solo.
 */
const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}


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

  it('dos planificadores del mismo mes no comparten el id del título', () => {
    render(
      <>
        <CalendarPlanner month={MES} gridLabel="" />
        <CalendarPlanner month={MES} gridLabel="" />
      </>,
    );

    const [a, b] = screen.getAllByRole('grid');
    const idA = a.getAttribute('aria-labelledby');
    expect(idA).toBeTruthy();
    expect(idA).not.toBe(b.getAttribute('aria-labelledby'));
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

describe('CalendarPlanner — vista de semana', () => {
  // Lunes 12 de enero de 2026; la semana va del 12 al 18.
  const SEMANA = new Date(2026, 0, 14);

  const AGENDA: PlannerEvent[] = [
    { id: 'a', date: new Date(2026, 0, 14, 9, 30), label: 'Reunión' },
    { id: 'b', date: new Date(2026, 0, 14), label: 'Guardia' },
    { id: 'c', date: new Date(2026, 0, 14, 8, 0), label: 'Entrega' },
    { id: 'd', date: new Date(2026, 0, 16, 17, 0), label: 'Retro' },
  ];

  it('pinta siete columnas, cada una con su fecha entera', () => {
    render(<CalendarPlanner view="week" week={SEMANA} />);

    const columnas = screen.getAllByRole('columnheader');
    expect(columnas).toHaveLength(7);
    expect(columnas[0]).toHaveAccessibleName(/12 de enero de 2026/);
    expect(columnas[6]).toHaveAccessibleName(/18 de enero de 2026/);
    expect(screen.getAllByRole('gridcell')).toHaveLength(7);
  });

  it('el título es el tramo de la semana', () => {
    render(<CalendarPlanner view="week" week={SEMANA} />);
    expect(screen.getByRole('heading')).toHaveTextContent(/12.*18 de enero de 2026/);
  });

  it('el evento con hora la enseña, el de día entero no, y van en orden de reloj', () => {
    render(<CalendarPlanner view="week" week={SEMANA} events={AGENDA} />);

    // El día lo nombra su columna (la cabecera), así que la celda es la
    // tercera de la fila: miércoles 14.
    const miercoles = screen.getAllByRole('gridcell')[2];
    const renglones = Array.from(
      miercoles.querySelectorAll('.calendar-planner__event'),
    ) as HTMLElement[];

    expect(renglones.map((r) => r.textContent)).toEqual(['Guardia', '08:00Entrega', '09:30Reunión']);
  });

  it('las flechas avanzan y retroceden de semana, y avisan con el lunes', async () => {
    const user = userEvent.setup();
    const onWeekChange = vi.fn();
    render(<CalendarPlanner defaultWeek={SEMANA} view="week" onWeekChange={onWeekChange} />);

    await user.click(screen.getByRole('button', { name: 'Semana siguiente' }));
    expect(screen.getAllByRole('columnheader')[0]).toHaveAccessibleName(/19 de enero de 2026/);

    const [lunes] = onWeekChange.mock.calls[0] as [Date];
    expect(lunes.getDate()).toBe(19);

    await user.click(screen.getByRole('button', { name: 'Semana anterior' }));
    expect(screen.getAllByRole('columnheader')[0]).toHaveAccessibleName(/12 de enero de 2026/);
  });

  it('el conmutador cambia de vista y abre la primera semana del mes que se miraba', async () => {
    const user = userEvent.setup();
    const onViewChange = vi.fn();
    render(
      <CalendarPlanner
        defaultMonth={new Date(2026, 2, 1)}
        defaultWeek={SEMANA}
        viewSwitcher
        onViewChange={onViewChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Semana' }));

    expect(onViewChange).toHaveBeenCalledWith('week');
    // La semana del 1 de marzo —que empieza en febrero—, no la de enero que
    // llevaba guardada ni la de hoy.
    expect(screen.getAllByRole('columnheader')[6]).toHaveAccessibleName(/1 de marzo de 2026/);

    // Y volver no cambia de mes: esa semana pisa marzo.
    await user.click(screen.getByRole('button', { name: 'Mes' }));
    expect(screen.getByRole('heading')).toHaveTextContent(/marzo de 2026/);
  });

  it('sin conmutador no hay botones de vista', () => {
    render(<CalendarPlanner view="week" week={SEMANA} />);
    expect(screen.queryByRole('button', { name: 'Mes' })).toBeNull();
  });

  it('con onDayClick la semana es una rejilla: una parada de tabulador y flechas', async () => {
    const user = userEvent.setup();
    const onDayClick = vi.fn();
    render(<CalendarPlanner view="week" week={SEMANA} events={AGENDA} onDayClick={onDayClick} />);

    const celdas = screen.getAllByRole('gridcell');
    expect(celdas.filter((c) => c.getAttribute('tabindex') === '0')).toHaveLength(1);

    celdas[0].focus();
    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(celdas[1]).toHaveFocus());

    await user.keyboard('{Enter}');
    const [fecha] = onDayClick.mock.calls[0] as [Date, PlannerEvent[]];
    expect(fecha.getDate()).toBe(13);
  });

  it('hoy se marca en la columna y en la celda', () => {
    render(<CalendarPlanner view="week" week={new Date()} />);

    expect(
      screen.getAllByRole('columnheader').filter((c) => c.getAttribute('aria-current') === 'date'),
    ).toHaveLength(1);
    expect(
      screen.getAllByRole('gridcell').filter((c) => c.getAttribute('aria-current') === 'date'),
    ).toHaveLength(1);
  });
});
