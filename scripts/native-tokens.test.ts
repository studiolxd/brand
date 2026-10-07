import { describe, expect, it } from 'vitest';
// @ts-expect-error — módulo .mjs sin tipos
import { buildNativeModel, parseColor, parseShadow, toPoints } from '../sd.formats.mjs';

type Token = { path: string[]; $value: string; $description?: string };
const t = (path: string, $value: string): Token => ({ path: path.split('.'), $value });

describe('tokens nativos: conversiones', () => {
  it('rem → puntos con 1rem = 16, y px tal cual', () => {
    expect(toPoints('0.25rem')).toBe(4);
    expect(toPoints('2.5rem')).toBe(40);
    expect(toPoints('9999px')).toBe(9999);
    expect(toPoints('0')).toBe(0);
  });

  it('colores hex y rgba', () => {
    expect(parseColor('#111e30')).toEqual({ r: 17, g: 30, b: 48, a: 1 });
    expect(parseColor('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseColor('rgba(17,30,48,0.08)')).toEqual({ r: 17, g: 30, b: 48, a: 0.08 });
  });

  it('sombras', () => {
    expect(parseShadow('none')).toBeNull();
    expect(parseShadow('0 2px 8px rgba(17,30,48,0.10)')).toMatchObject({ x: 0, y: 2, blur: 8 });
  });
});

describe('tokens nativos: el modelo', () => {
  const model = buildNativeModel([
    t('color.text.on-light', '#111e30'),
    t('color.text.on-dark', '#ffffff'),
    t('color.error-text-on-light', '#b30000'),
    t('color.error-text-on-dark', '#ff8585'),
    t('color.bg.light', '#ffffff'),
    t('color.bg.dark', '#111e30'),
    t('color.chart.series-1', '#1e7ff6'),
    t('color.chart.series-1-on-dark', '#1d7cf0'),
    t('color.border-recessive-on-dark', '#4a4a4a'),
    t('color.error-fill', '#b30000'),
    t('color.white', '#ffffff'),
    t('spacing.1', '0.25rem'),
    t('motion.duration.fast', '150ms'),
    t('motion.easing.in-out', 'ease-in-out'),
    t('breakpoint.md', '768px'),
    t('z-index.modal', '100'),
    t('button.primary.bg', '#000000'),
    t('button.primary.surface-dark-bg', '#ffffff'),
    t('font-family.sans', '"Google Sans Flex", system-ui, sans-serif'),
    t('size-target.min', '1.5rem'),
    t('content.measure', '70ch'),
  ]);

  it('empareja los lados claro y oscuro de cada rol', () => {
    const roles = Object.fromEntries(model.colors.roles.map((r: { name: string }) => [r.name, r]));
    expect(roles.text).toMatchObject({ light: '#111e30', dark: '#ffffff', oneSided: null });
    expect(roles.errorText).toMatchObject({ light: '#b30000', dark: '#ff8585' });
    expect(roles.bg).toMatchObject({ light: '#ffffff', dark: '#111e30' });
    expect(roles.chartSeries1).toMatchObject({ light: '#1e7ff6', dark: '#1d7cf0' });
  });

  it('un color global renombrado lleva su nombre viejo como alias nativo (v51)', () => {
    const aliased = buildNativeModel([
      { path: ['color', 'bg', 'light'], $value: '#ffffff', $extensions: { 'com.studiolxd': { deprecatedAliases: ['color.background.light'] } } },
      { path: ['color', 'bg', 'dark'], $value: '#111e30', $extensions: { 'com.studiolxd': { deprecatedAliases: ['color.background.dark'] } } },
    ]);
    expect(aliased.colors.roles).toEqual([expect.objectContaining({ name: 'bg', aliases: ['background'] })]);
  });

  it('un rol con un solo lado cae al mismo valor en el otro', () => {
    const role = model.colors.roles.find((r: { name: string }) => r.name === 'borderRecessive');
    expect(role).toMatchObject({ light: '#4a4a4a', dark: '#4a4a4a', oneSided: 'dark' });
  });

  it('los colores universales y primitivos son singles', () => {
    expect(model.colors.singles.map((c: { name: string }) => c.name)).toEqual(['errorFill', 'white']);
  });

  it('numera los peldaños, convierte unidades y deja fuera lo que no tiene equivalente', () => {
    expect(model.spacing).toMatchObject([{ name: 's1', points: 4 }]);
    expect(model.duration).toMatchObject([{ name: 'fast', ms: 150 }]);
    expect(model.easing).toMatchObject([{ name: 'inOut', bezier: [0.42, 0, 0.58, 1] }]);
    expect(model.size).toMatchObject([{ name: 'targetMin', points: 24 }]);
    expect(model.fontFamily).toMatchObject([{ name: 'sans', family: 'Google Sans Flex' }]);
    // breakpoint, z-index, tokens de componente (y sus surface-dark-*) y `content.measure` no salen.
    const all = JSON.stringify(model);
    for (const omitted of ['768px', '"100"', '#000000', '70ch']) expect(all).not.toContain(omitted);
  });
});
