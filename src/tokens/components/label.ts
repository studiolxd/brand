import type { Token } from '../utils';

export const labelBaseTokens: Token[] = [
  { name: '--label-font-family',    value: 'var(--font-family-sans)',      description: 'Font family' },
  { name: '--label-font-size',      value: 'var(--font-size-1)',           description: 'Font size (12px)' },
  { name: '--label-font-weight',    value: 'var(--font-weight-medium)',    description: 'Font weight' },
  { name: '--label-line-height',    value: 'var(--line-height-normal)',    description: 'Line height' },
  { name: '--label-color',          value: 'var(--color-text-default)',    description: 'Color del texto' },
  { name: '--label-letter-spacing', value: 'var(--letter-spacing-normal)', description: 'Letter spacing' },
  { name: '--label-text-transform', value: 'uppercase',                    description: 'Transformación de texto' },
];

export const labelDarkTokens: Token[] = [
  { name: '--label-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];
