import { describe, it, expect, vi, afterEach } from 'vitest';
import { render as renderRTL, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { ClockWidget, type ClockEntry } from './ClockWidget';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const a = (hh: number, mm: number) => new Date(Date.UTC(2026, 2, 15, hh, mm));
const AHORA = a(10, 0);

const ABIERTO: ClockEntry[] = [
  { id: '1', start: a(8, 0), end: a(9, 30) },
  { id: '2', start: a(9, 45), end: null },
];

const CERRADO: ClockEntry[] = [{ id: '1', start: a(8, 0), end: a(9, 30) }];

afterEach(() => {
  vi.useRealTimers();
});

describe('ClockWidget', () => {
  it('con el turno cerrado ofrece fichar entrada, y solo eso', async () => {
    const entrar = vi.fn();
    const salir = vi.fn();
    render(<ClockWidget entries={CERRADO} now={AHORA} timeZone="UTC" onClockIn={entrar} onClockOut={salir} />);

    expect(screen.queryByRole('button', { name: ES.clockWidget.clockOut })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: ES.clockWidget.clockIn }));
    expect(entrar).toHaveBeenCalledTimes(1);
    expect(salir).not.toHaveBeenCalled();
  });

  it('con el turno abierto ofrece fichar salida, y solo eso', async () => {
    const salir = vi.fn();
    render(<ClockWidget entries={ABIERTO} now={AHORA} timeZone="UTC" onClockIn={vi.fn()} onClockOut={salir} />);

    expect(screen.queryByRole('button', { name: ES.clockWidget.clockIn })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: ES.clockWidget.clockOut }));
    expect(salir).toHaveBeenCalledTimes(1);
  });

  it('el tiempo trabajado suma los tramos, con el abierto medido contra `now`', () => {
    render(<ClockWidget entries={ABIERTO} now={AHORA} timeZone="UTC" onClockOut={vi.fn()} />);
    // 90 min del tramo cerrado + 15 del abierto.
    expect(screen.getByRole('timer')).toHaveTextContent('1 h 45 min');
  });

  it('con `now` el reloj no corre', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(<ClockWidget entries={ABIERTO} now={AHORA} timeZone="UTC" onClockOut={vi.fn()} />);
    act(() => {
      vi.advanceTimersByTime(120_000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent('1 h 45 min');
  });

  it('sin `now` y con el turno abierto el reloj corre solo', () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(AHORA);
    render(<ClockWidget entries={ABIERTO} timeZone="UTC" onClockOut={vi.fn()} />);
    expect(screen.getByRole('timer')).toHaveTextContent('1 h 45 min');
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent('1 h 46 min');
  });

  it('la tabla de tramos pinta la salida pendiente como «en curso»', () => {
    render(<ClockWidget entries={ABIERTO} now={AHORA} timeZone="UTC" onClockOut={vi.fn()} />);
    const tabla = screen.getByRole('table', { name: ES.clockWidget.entries });
    expect(tabla).toBeInTheDocument();
    expect(screen.getByText(ES.clockWidget.running)).toBeInTheDocument();
  });

  it('con un solo tramo no pinta la fila de total: no hay nada que sumar', () => {
    render(<ClockWidget entries={CERRADO} now={AHORA} timeZone="UTC" onClockIn={vi.fn()} />);
    expect(screen.queryByText(ES.clockWidget.total)).not.toBeInTheDocument();
  });

  it('un día que no se trabaja dice por qué y no ofrece fichar', () => {
    render(<ClockWidget entries={[]} dayState="vacation" now={AHORA} onClockIn={vi.fn()} />);
    expect(screen.getByText(ES.clockWidget.vacation)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('timer')).not.toBeInTheDocument();
  });

  it('mientras la acción está en vuelo el botón lo dice y no se puede pulsar', () => {
    render(<ClockWidget entries={ABIERTO} now={AHORA} pending onClockOut={vi.fn()} />);
    const botón = screen.getByRole('button', { name: ES.clockWidget.pending });
    expect(botón).toBeDisabled();
  });

  it('el error se anuncia', () => {
    render(<ClockWidget entries={ABIERTO} now={AHORA} error="No se pudo fichar" onClockOut={vi.fn()} />);
    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo fichar');
  });

  it('sin manejador no pinta botón: el widget también sirve de solo lectura', () => {
    render(<ClockWidget entries={ABIERTO} now={AHORA} timeZone="UTC" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('timer')).toBeInTheDocument();
  });
});
