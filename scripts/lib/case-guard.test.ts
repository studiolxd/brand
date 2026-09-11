import { describe, expect, it } from 'vitest';
import { findCaseMismatches, findIndexDiskCaseMismatches } from './case-guard.mjs';

describe('findCaseMismatches', () => {
  it('no reporta nada cuando índice y disco coinciden en caja', () => {
    expect(findCaseMismatches(['dist/_shared/Logo.js'], ['dist/_shared/Logo.js'])).toEqual([]);
  });

  it('detecta un fichero esperado con distinta caja en el disco (el bug de la 37.5.2)', () => {
    const mismatches = findCaseMismatches(['dist/_shared/Logo.js'], ['dist/_shared/logo.js']);
    expect(mismatches).toEqual([{ expected: 'dist/_shared/Logo.js', foundAs: ['dist/_shared/logo.js'] }]);
  });

  it('no reporta nada cuando el fichero esperado no existe en absoluto (ausencia, no mismatch de caja)', () => {
    expect(findCaseMismatches(['dist/_shared/Logo.js'], ['dist/_shared/Other.js'])).toEqual([]);
  });

  it('es sensible a mayúsculas: DatePicker.css vs datepicker.css es mismatch', () => {
    const mismatches = findCaseMismatches(['dist/DatePicker.css'], ['dist/datepicker.css']);
    expect(mismatches).toEqual([{ expected: 'dist/DatePicker.css', foundAs: ['dist/datepicker.css'] }]);
  });
});

describe('findIndexDiskCaseMismatches', () => {
  it('no reporta nada cuando índice y disco están completamente en sync', () => {
    const names = ['dist/index.js', 'dist/_shared/Logo.js', 'dist/DatePicker.css'];
    expect(findIndexDiskCaseMismatches(names, names)).toEqual([]);
  });

  it('detecta el escenario de la 37.5.2: disco reconstruido en minúscula, índice con la caja vieja', () => {
    const indexNames = ['dist/_shared/Logo.js', 'dist/DatePicker.css'];
    const diskNames = ['dist/_shared/logo.js', 'dist/datepicker.css'];
    const mismatches = findIndexDiskCaseMismatches(indexNames, diskNames);
    expect(mismatches).toHaveLength(2);
    expect(mismatches.map((m) => m.expected).sort()).toEqual(['dist/DatePicker.css', 'dist/_shared/Logo.js'].sort());
  });

  it('no duplica un mismatch ya visto al comprobar la dirección disco→índice', () => {
    const indexNames = ['dist/DatePicker.css'];
    const diskNames = ['dist/datepicker.css'];
    const mismatches = findIndexDiskCaseMismatches(indexNames, diskNames);
    expect(mismatches).toHaveLength(1);
  });

  it('ignora ficheros solo en el índice (borrados en disco) o solo en el disco (sin trackear): no son mismatch de caja', () => {
    const indexNames = ['dist/index.js', 'dist/Removed.js'];
    const diskNames = ['dist/index.js', 'dist/New.js'];
    expect(findIndexDiskCaseMismatches(indexNames, diskNames)).toEqual([]);
  });
});
