import { describe, it, expect } from 'vitest';
import { heatmapStep, heatmapRampIndex, HEATMAP_RAMP_STEPS } from './heatmapScale';

describe('heatmapStep', () => {
  const escala = { min: 0, max: 4, steps: 5 };

  it('el mínimo cae en el paso 1 y el máximo en el último', () => {
    expect(heatmapStep(0, escala)).toBe(1);
    expect(heatmapStep(4, escala)).toBe(5);
  });

  it('reparte los valores intermedios por la escala', () => {
    expect(heatmapStep(1, escala)).toBe(2);
    expect(heatmapStep(2, escala)).toBe(3);
    expect(heatmapStep(3, escala)).toBe(4);
  });

  it('sin dato no es el mínimo', () => {
    expect(heatmapStep(null, escala)).toBeNull();
    expect(heatmapStep(undefined, escala)).toBeNull();
    expect(heatmapStep(Number.NaN, escala)).toBeNull();
  });

  it('lo que se sale del dominio se recorta contra él', () => {
    expect(heatmapStep(-10, escala)).toBe(1);
    expect(heatmapStep(99, escala)).toBe(5);
  });

  it('un dominio degenerado (max <= min) deja todo en el último paso', () => {
    expect(heatmapStep(7, { min: 5, max: 5, steps: 5 })).toBe(5);
  });

  it('funciona igual con un dominio de porcentaje', () => {
    const cobertura = { min: 0, max: 100, steps: 5 };
    expect(heatmapStep(0, cobertura)).toBe(1);
    expect(heatmapStep(50, cobertura)).toBe(3);
    expect(heatmapStep(100, cobertura)).toBe(5);
  });
});

describe('heatmapRampIndex', () => {
  it('con seis pasos usa la rampa entera, uno a uno', () => {
    expect([1, 2, 3, 4, 5, 6].map((s) => heatmapRampIndex(s, 6))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('con menos pasos el primero sigue siendo el 1 y el último el 6', () => {
    for (const pasos of [2, 3, 4, 5]) {
      expect(heatmapRampIndex(1, pasos)).toBe(1);
      expect(heatmapRampIndex(pasos, pasos)).toBe(HEATMAP_RAMP_STEPS);
    }
  });

  it('la rampa nunca retrocede', () => {
    for (const pasos of [2, 3, 4, 5, 6]) {
      const índices = Array.from({ length: pasos }, (_, i) => heatmapRampIndex(i + 1, pasos));
      const ordenados = [...índices].sort((a, b) => a - b);
      expect(índices).toEqual(ordenados);
      expect(new Set(índices).size).toBe(pasos);
    }
  });

  it('acota los pasos fuera de rango en vez de salirse de la rampa', () => {
    expect(heatmapRampIndex(0, 5)).toBe(1);
    expect(heatmapRampIndex(99, 5)).toBe(HEATMAP_RAMP_STEPS);
  });
});
