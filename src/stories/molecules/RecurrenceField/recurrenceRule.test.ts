import { describe, it, expect } from 'vitest';
import {
  buildRecurrenceRule,
  parseRecurrenceRule,
  DEFAULT_RECURRENCE,
  RECURRENCE_WEEKDAYS,
  type RecurrenceValue,
} from './recurrenceRule';

const semanal: RecurrenceValue = { ...DEFAULT_RECURRENCE };

describe('buildRecurrenceRule', () => {
  it('«no se repite» es la cadena vacía', () => {
    expect(buildRecurrenceRule(null)).toBe('');
  });

  it('escribe la frecuencia y omite el intervalo cuando es 1', () => {
    expect(buildRecurrenceRule(semanal)).toBe('FREQ=WEEKLY');
    expect(buildRecurrenceRule({ ...semanal, frequency: 'daily' })).toBe('FREQ=DAILY');
  });

  it('escribe el intervalo cuando pasa de 1', () => {
    expect(buildRecurrenceRule({ ...semanal, interval: 3 })).toBe('FREQ=WEEKLY;INTERVAL=3');
  });

  it('los días van en el orden de la semana, no en el que se pulsaron', () => {
    expect(buildRecurrenceRule({ ...semanal, weekdays: ['FR', 'MO', 'WE'] })).toBe('FREQ=WEEKLY;BYDAY=MO,WE,FR');
  });

  it('los días solo salen en la frecuencia semanal', () => {
    expect(buildRecurrenceRule({ ...semanal, frequency: 'monthly', weekdays: ['MO'] })).toBe('FREQ=MONTHLY');
  });

  it('el final por fecha llega al final del día, en UTC', () => {
    const value: RecurrenceValue = { ...semanal, end: { type: 'until', date: new Date(Date.UTC(2026, 5, 30)) } };
    expect(buildRecurrenceRule(value)).toBe('FREQ=WEEKLY;UNTIL=20260630T235959Z');
  });

  it('un final por fecha sin fecha todavía no escribe UNTIL', () => {
    expect(buildRecurrenceRule({ ...semanal, end: { type: 'until', date: null } })).toBe('FREQ=WEEKLY');
  });

  it('el final por número de veces escribe COUNT, con suelo de 1', () => {
    expect(buildRecurrenceRule({ ...semanal, end: { type: 'count', count: 10 } })).toBe('FREQ=WEEKLY;COUNT=10');
    expect(buildRecurrenceRule({ ...semanal, end: { type: 'count', count: 0 } })).toBe('FREQ=WEEKLY;COUNT=1');
  });

  it('conserva las partes que el editor no enseña', () => {
    expect(buildRecurrenceRule({ ...semanal, frequency: 'monthly', rest: ['BYMONTHDAY=15'] }))
      .toBe('FREQ=MONTHLY;BYMONTHDAY=15');
  });
});

describe('parseRecurrenceRule', () => {
  it('una cadena vacía o ausente es «no se repite»', () => {
    expect(parseRecurrenceRule('')).toBeNull();
    expect(parseRecurrenceRule(null)).toBeNull();
    expect(parseRecurrenceRule(undefined)).toBeNull();
  });

  it('una regla sin frecuencia reconocible no es una regla', () => {
    expect(parseRecurrenceRule('INTERVAL=2')).toBeNull();
    expect(parseRecurrenceRule('FREQ=HOURLY')).toBeNull();
  });

  it('lee frecuencia, intervalo y días', () => {
    expect(parseRecurrenceRule('FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,FR')).toEqual({
      frequency: 'weekly',
      interval: 2,
      weekdays: ['MO', 'FR'],
      end: { type: 'never' },
    });
  });

  it('admite el prefijo RRULE: y las claves en minúsculas', () => {
    expect(parseRecurrenceRule('RRULE:freq=daily')?.frequency).toBe('daily');
  });

  it('lee el final por fecha', () => {
    const value = parseRecurrenceRule('FREQ=WEEKLY;UNTIL=20260630T235959Z');
    expect(value?.end).toEqual({ type: 'until', date: new Date(Date.UTC(2026, 5, 30)) });
  });

  it('lee el final por número de veces', () => {
    expect(parseRecurrenceRule('FREQ=WEEKLY;COUNT=5')?.end).toEqual({ type: 'count', count: 5 });
  });

  it('descarta los días que no son días', () => {
    expect(parseRecurrenceRule('FREQ=WEEKLY;BYDAY=MO,XX,2FR')?.weekdays).toEqual(['MO']);
  });

  it('aparta lo que el editor no enseña, sin perderlo', () => {
    expect(parseRecurrenceRule('FREQ=MONTHLY;BYMONTHDAY=15;WKST=MO')?.rest).toEqual(['BYMONTHDAY=15', 'WKST=MO']);
  });
});

describe('ida y vuelta', () => {
  const casos = [
    'FREQ=DAILY',
    'FREQ=DAILY;INTERVAL=2',
    'FREQ=WEEKLY;BYDAY=MO,WE,FR',
    'FREQ=WEEKLY;INTERVAL=2;BYDAY=TU;COUNT=12',
    'FREQ=MONTHLY;UNTIL=20261231T235959Z',
    'FREQ=YEARLY;INTERVAL=5',
    'FREQ=MONTHLY;BYMONTHDAY=15',
  ];

  it.each(casos)('%s sobrevive a leerla y volver a escribirla', (regla) => {
    expect(buildRecurrenceRule(parseRecurrenceRule(regla))).toBe(regla);
  });
});

describe('RECURRENCE_WEEKDAYS', () => {
  it('son los siete, de lunes a domingo', () => {
    expect(RECURRENCE_WEEKDAYS).toEqual(['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']);
  });
});
