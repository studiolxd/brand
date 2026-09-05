import { describe, it, expect } from 'vitest';
import { getDateMask, SPANISH_MASK_LETTERS } from './dateMask';

describe('dateMask — el orden lo pone el locale, no una tabla a mano', () => {
  it('escribe la fecha corta en el orden de cada locale', () => {
    const fecha = new Date(2026, 8, 25);

    expect(getDateMask('es-ES').format(fecha)).toBe('25/09/2026');
    expect(getDateMask('en-US').format(fecha)).toBe('09/25/2026');
    expect(getDateMask('de-DE').format(fecha)).toBe('25.09.2026');
  });

  it('enseña la máscara con las letras que le den', () => {
    expect(getDateMask('es-ES').mask(SPANISH_MASK_LETTERS)).toBe('dd/mm/aaaa');
    expect(getDateMask('en-US').mask(SPANISH_MASK_LETTERS)).toBe('mm/dd/aaaa');
    expect(getDateMask('en-US').mask({ day: 'dd', month: 'mm', year: 'yyyy' })).toBe('mm/dd/yyyy');
  });

  it('lee de vuelta lo que escribe, con y sin ceros por delante', () => {
    const es = getDateMask('es-ES');

    expect(es.parse('25/09/2026')).toEqual(new Date(2026, 8, 25));
    expect(es.parse('5/9/2026')).toEqual(new Date(2026, 8, 5));
    expect(es.parse('  25/09/2026 ')).toEqual(new Date(2026, 8, 25));
  });

  it('el mismo texto es otra fecha en otro locale', () => {
    expect(getDateMask('en-US').parse('09/25/2026')).toEqual(new Date(2026, 8, 25));
    expect(getDateMask('de-DE').parse('25.09.2026')).toEqual(new Date(2026, 8, 25));
  });

  it('no adivina: la fecha incompleta o imposible no vale', () => {
    const es = getDateMask('es-ES');

    expect(es.parse('')).toBeNull();
    expect(es.parse('25')).toBeNull();
    expect(es.parse('25/09')).toBeNull();
    // El año va entero: `26` no es 2026
    expect(es.parse('25/09/26')).toBeNull();
    // El 31 de febrero no existe: `Date` lo desbordaría a marzo
    expect(es.parse('31/02/2026')).toBeNull();
    expect(es.parse('32/01/2026')).toBeNull();
    expect(es.parse('01/13/2026')).toBeNull();
    expect(es.parse('25 de septiembre')).toBeNull();
  });

  it('el año bisiesto sí existe', () => {
    const es = getDateMask('es-ES');
    expect(es.parse('29/02/2024')).toEqual(new Date(2024, 1, 29));
    expect(es.parse('29/02/2025')).toBeNull();
  });
});
