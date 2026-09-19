import { describe, it, expect } from 'vitest';
import { clockEntryMinutes, clockedMinutes, isClockRunning, type ClockEntry } from './clockDuration';

const a = (hh: number, mm: number) => new Date(Date.UTC(2026, 2, 15, hh, mm));
const AHORA = a(10, 0);

describe('clockEntryMinutes', () => {
  it('mide un tramo cerrado entre su entrada y su salida', () => {
    expect(clockEntryMinutes({ id: '1', start: a(8, 0), end: a(9, 30) }, AHORA)).toBe(90);
  });

  it('mide un tramo abierto contra el instante que se le pase', () => {
    expect(clockEntryMinutes({ id: '1', start: a(9, 45), end: null }, AHORA)).toBe(15);
  });

  it('un tramo sin salida declarada es un tramo abierto', () => {
    expect(clockEntryMinutes({ id: '1', start: a(9, 45) }, AHORA)).toBe(15);
  });

  it('un tramo que acaba antes de empezar cuenta cero, no resta del día', () => {
    expect(clockEntryMinutes({ id: '1', start: a(9, 0), end: a(8, 0) }, AHORA)).toBe(0);
  });
});

describe('clockedMinutes', () => {
  const JORNADA: ClockEntry[] = [
    { id: '1', start: a(8, 0), end: a(9, 30) },
    { id: '2', start: a(9, 45), end: null },
  ];

  it('suma todos los tramos, con el abierto medido contra el instante', () => {
    expect(clockedMinutes(JORNADA, AHORA)).toBe(105);
  });

  it('un día sin tramos suma cero', () => {
    expect(clockedMinutes([], AHORA)).toBe(0);
  });
});

describe('isClockRunning', () => {
  it('el turno está abierto si algún tramo no tiene salida', () => {
    expect(isClockRunning([{ id: '1', start: a(9, 45), end: null }])).toBe(true);
    expect(isClockRunning([{ id: '1', start: a(9, 45) }])).toBe(true);
  });

  it('está cerrado si todos los tramos tienen salida', () => {
    expect(isClockRunning([{ id: '1', start: a(8, 0), end: a(9, 30) }])).toBe(false);
  });

  it('un día sin tramos está cerrado', () => {
    expect(isClockRunning([])).toBe(false);
  });
});
