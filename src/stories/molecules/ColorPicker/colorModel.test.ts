import { describe, it, expect } from 'vitest';
import {
  formatHex,
  hexToHsva,
  hsvaToHex,
  hsvToRgb,
  hueStops,
  normalizeHex,
  parseHex,
  rgbToHsv,
} from './colorModel';

describe('parseHex', () => {
  it('lee 6 y 8 dígitos, con o sin almohadilla y en cualquier caja', () => {
    expect(parseHex('#111E30')).toEqual({ r: 17, g: 30, b: 48, a: 1 });
    expect(parseHex('111e30')).toEqual({ r: 17, g: 30, b: 48, a: 1 });
    expect(parseHex('#11223380')).toEqual({ r: 17, g: 34, b: 51, a: 128 / 255 });
  });

  it('expande la forma corta de 3 y 4 dígitos', () => {
    expect(parseHex('#fc0')).toEqual({ r: 255, g: 204, b: 0, a: 1 });
    expect(parseHex('#fc00')).toEqual({ r: 255, g: 204, b: 0, a: 0 });
  });

  it('rechaza lo que no es hex', () => {
    for (const value of ['', '#', 'red', 'transparent', 'rgb(0,0,0)', '#12345', '#gggggg', '#1234567']) {
      expect(parseHex(value)).toBeNull();
    }
  });
});

describe('formatHex', () => {
  it('emite minúsculas, con el alfa solo cuando se pide', () => {
    const rgba = { r: 186, g: 171, b: 255, a: 0.5 };
    expect(formatHex(rgba, false)).toBe('#baabff');
    expect(formatHex(rgba, true)).toBe('#baabff80');
  });

  it('con alfa pinta el par también cuando es opaco', () => {
    expect(formatHex({ r: 0, g: 0, b: 0, a: 1 }, true)).toBe('#000000ff');
  });

  it('redondea y recorta los canales fuera de rango', () => {
    expect(formatHex({ r: 255.6, g: -3, b: 127.5, a: 1 }, false)).toBe('#ff0080');
  });
});

describe('rgb ↔ hsv', () => {
  it('los primarios caen en su tono', () => {
    expect(rgbToHsv({ r: 255, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 100, v: 100, a: 1 });
    expect(rgbToHsv({ r: 0, g: 255, b: 0, a: 1 })).toEqual({ h: 120, s: 100, v: 100, a: 1 });
    expect(rgbToHsv({ r: 0, g: 0, b: 255, a: 1 })).toEqual({ h: 240, s: 100, v: 100, a: 1 });
  });

  it('un gris no tiene saturación, y el negro tampoco brillo', () => {
    expect(rgbToHsv({ r: 128, g: 128, b: 128, a: 1 })).toMatchObject({ h: 0, s: 0 });
    expect(rgbToHsv({ r: 0, g: 0, b: 0, a: 1 })).toEqual({ h: 0, s: 0, v: 0, a: 1 });
  });

  it('el tono 360 es el 0', () => {
    expect(formatHex(hsvToRgb({ h: 360, s: 100, v: 100, a: 1 }), false)).toBe('#ff0000');
  });

  it('ida y vuelta conserva el hex', () => {
    for (const hex of ['#111e30', '#baabff', '#ffcd00', '#20e38e', '#f05e1c', '#ffffff', '#000000', '#d0d0d0']) {
      expect(hsvaToHex(hexToHsva(hex)!, false)).toBe(hex);
    }
    expect(hsvaToHex(hexToHsva('#f05e1c40')!, true)).toBe('#f05e1c40');
  });
});

describe('normalizeHex', () => {
  it('lleva cualquier hex a la forma del selector', () => {
    expect(normalizeHex('FC0', false)).toBe('#ffcc00');
    expect(normalizeHex('#FFCC0080', false)).toBe('#ffcc00');
    expect(normalizeHex('#FFCC0080', true)).toBe('#ffcc0080');
    expect(normalizeHex('#fc0', true)).toBe('#ffcc00ff');
    expect(normalizeHex('azul', true)).toBeNull();
  });
});

describe('hueStops', () => {
  it('son los seis puros y la vuelta al rojo', () => {
    expect(hueStops()).toEqual(['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', '#ff0000']);
  });
});
