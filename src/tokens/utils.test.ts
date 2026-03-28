import { describe, it, expect } from 'vitest';
import { resolveRef, flattenTokens } from './utils';

describe('resolveRef', () => {
  it('returns the value unchanged when it is not a reference', () => {
    expect(resolveRef('#ffffff', {})).toBe('#ffffff');
    expect(resolveRef('16px', {})).toBe('16px');
    expect(resolveRef('solid', {})).toBe('solid');
  });

  it('resolves a direct reference', () => {
    const map = { 'color.prussian': '#111e30' };
    expect(resolveRef('{color.prussian}', map)).toBe('#111e30');
  });

  it('resolves chained references', () => {
    const map = {
      'color.primary': '{color.prussian}',
      'color.prussian': '#111e30',
    };
    expect(resolveRef('{color.primary}', map)).toBe('#111e30');
  });

  it('returns the original ref when the key is not in the map', () => {
    expect(resolveRef('{color.unknown}', {})).toBe('{color.unknown}');
  });

  it('stops when the resolved value equals the current value (circular guard)', () => {
    const map = { 'color.loop': '{color.loop}' };
    expect(resolveRef('{color.loop}', map)).toBe('{color.loop}');
  });
});

describe('flattenTokens', () => {
  it('flattens a single-level tree', () => {
    const tree = {
      white: { $value: '#ffffff', $type: 'color', $description: 'Pure white' },
    };
    expect(flattenTokens(tree)).toEqual([
      { name: '--white', value: '#ffffff', description: 'Pure white' },
    ]);
  });

  it('flattens a nested tree using dash-separated paths', () => {
    const tree = {
      color: {
        text: {
          default: { $value: '#111e30', $type: 'color' },
        },
      },
    };
    expect(flattenTokens(tree)).toEqual([
      { name: '--color-text-default', value: '#111e30', description: undefined },
    ]);
  });

  it('prepends a prefix when provided', () => {
    const tree = {
      sm: { $value: '4px', $type: 'dimension' },
    };
    expect(flattenTokens(tree, 'spacing')).toEqual([
      { name: '--spacing-sm', value: '4px', description: undefined },
    ]);
  });

  it('handles multiple sibling tokens', () => {
    const tree = {
      sans: { $value: 'Inter, sans-serif', $type: 'string' },
      mono: { $value: 'Fira Code, monospace', $type: 'string' },
    };
    const result = flattenTokens(tree);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('--sans');
    expect(result[1].name).toBe('--mono');
  });

  it('includes description when present and omits it when absent', () => {
    const tree = {
      a: { $value: '1', $type: 'number', $description: 'Token A' },
      b: { $value: '2', $type: 'number' },
    };
    const [a, b] = flattenTokens(tree);
    expect(a.description).toBe('Token A');
    expect(b.description).toBeUndefined();
  });
});
