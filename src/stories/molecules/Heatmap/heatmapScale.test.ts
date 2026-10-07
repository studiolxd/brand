import { describe, it, expect } from 'vitest';
import {
  heatmapStep,
  heatmapRampIndex,
  HEATMAP_RAMP_STEPS,
  heatmapDivergingStep,
  heatmapDivergingLegend,
  heatmapDivergingRadius,
} from './heatmapScale';

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

describe('heatmapDivergingStep', () => {
  // Una brecha de competencias: nivel real − nivel exigido, de −3 a +3.
  const brecha = { midpoint: 0, radius: 3 };

  it('el centro es el neutro', () => {
    expect(heatmapDivergingStep(0, brecha)).toBe('neutral');
  });

  it('por debajo del centro es cálido y por encima frío, a tres intensidades', () => {
    expect([-3, -2, -1].map((v) => heatmapDivergingStep(v, brecha))).toEqual(['warm-3', 'warm-2', 'warm-1']);
    expect([1, 2, 3].map((v) => heatmapDivergingStep(v, brecha))).toEqual(['cool-1', 'cool-2', 'cool-3']);
  });

  it('la misma distancia pinta la misma intensidad a los dos lados', () => {
    for (const d of [0.5, 1, 1.5, 2, 2.5, 3]) {
      const bajo = heatmapDivergingStep(-d, brecha);
      const alto = heatmapDivergingStep(d, brecha);
      expect(bajo?.replace('warm', 'x')).toBe(alto?.replace('cool', 'x'));
    }
  });

  it('la banda central es el neutro: lo que apenas se separa del centro no toma brazo', () => {
    // Siete bandas iguales en [−3, 3]: la central es (−3/7, 3/7).
    expect(heatmapDivergingStep(0.4, brecha)).toBe('neutral');
    expect(heatmapDivergingStep(-0.4, brecha)).toBe('neutral');
    expect(heatmapDivergingStep(0.5, brecha)).toBe('cool-1');
    expect(heatmapDivergingStep(-0.5, brecha)).toBe('warm-1');
  });

  it('lo que se sale del radio se recorta contra el extremo', () => {
    expect(heatmapDivergingStep(-10, brecha)).toBe('warm-3');
    expect(heatmapDivergingStep(10, brecha)).toBe('cool-3');
  });

  it('el centro no tiene por qué ser cero', () => {
    const meta = { midpoint: 80, radius: 20 };
    expect(heatmapDivergingStep(80, meta)).toBe('neutral');
    expect(heatmapDivergingStep(60, meta)).toBe('warm-3');
    expect(heatmapDivergingStep(100, meta)).toBe('cool-3');
  });

  it('`warm-above` invierte los brazos', () => {
    const invertida = { ...brecha, direction: 'warm-above' as const };
    expect(heatmapDivergingStep(-3, invertida)).toBe('cool-3');
    expect(heatmapDivergingStep(3, invertida)).toBe('warm-3');
    expect(heatmapDivergingStep(0, invertida)).toBe('neutral');
  });

  it('sin dato no es el centro', () => {
    expect(heatmapDivergingStep(null, brecha)).toBeNull();
    expect(heatmapDivergingStep(undefined, brecha)).toBeNull();
    expect(heatmapDivergingStep(Number.NaN, brecha)).toBeNull();
  });

  it('un radio nulo deja el centro en neutro y lo demás en el extremo de su brazo', () => {
    const plana = { midpoint: 0, radius: 0 };
    expect(heatmapDivergingStep(0, plana)).toBe('neutral');
    expect(heatmapDivergingStep(-1, plana)).toBe('warm-3');
    expect(heatmapDivergingStep(1, plana)).toBe('cool-3');
  });
});

describe('heatmapDivergingLegend', () => {
  it('va del valor más bajo al más alto, con el neutro en medio', () => {
    expect(heatmapDivergingLegend()).toEqual(['warm-3', 'warm-2', 'warm-1', 'neutral', 'cool-1', 'cool-2', 'cool-3']);
    expect(heatmapDivergingLegend('warm-above')).toEqual(['cool-3', 'cool-2', 'cool-1', 'neutral', 'warm-1', 'warm-2', 'warm-3']);
  });
});

describe('heatmapDivergingRadius', () => {
  it('sin extremos, sale de la mayor distancia de las casillas al centro', () => {
    expect(heatmapDivergingRadius(0, [-2, 1, null, 3])).toBe(3);
    expect(heatmapDivergingRadius(0, [-4, 1])).toBe(4);
  });

  it('con extremos, mandan ellos y no los datos', () => {
    expect(heatmapDivergingRadius(0, [-1, 1], -3, 3)).toBe(3);
    expect(heatmapDivergingRadius(0, [-1, 1], undefined, 2)).toBe(2);
    expect(heatmapDivergingRadius(50, [], 0, 100)).toBe(50);
  });

  it('sin datos ni extremos, el radio es 0', () => {
    expect(heatmapDivergingRadius(0, [null])).toBe(0);
  });
});
