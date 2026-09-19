import { describe, it, expect } from 'vitest';
import { parsePlanningHours } from './planningHours';

describe('parsePlanningHours', () => {
  it('lee un entero y un decimal con punto', () => {
    expect(parsePlanningHours('8')).toBe(8);
    expect(parsePlanningHours('7.5')).toBe(7.5);
  });

  it('lee el decimal con coma: en castellano se escribe «7,5»', () => {
    expect(parsePlanningHours('7,5')).toBe(7.5);
  });

  it('el campo vacío son cero horas, no un error', () => {
    expect(parsePlanningHours('')).toBe(0);
    expect(parsePlanningHours('   ')).toBe(0);
  });

  it('descarta lo que no son horas', () => {
    expect(parsePlanningHours('ocho')).toBeNull();
    expect(parsePlanningHours('7,5h')).toBeNull();
    expect(parsePlanningHours('1e3')).toBeNull();
  });

  it('un negativo no son horas', () => {
    expect(parsePlanningHours('-3')).toBeNull();
  });

  it('no se traga los espacios de alrededor', () => {
    expect(parsePlanningHours('  6  ')).toBe(6);
  });
});
