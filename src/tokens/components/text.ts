import type { Token } from '../utils';

export const headingBaseTokens: Token[] = [
  { name: '--text-heading-font-family',    value: 'var(--font-family-sans)',       description: 'Font family' },
  { name: '--text-heading-font-weight',    value: 'var(--font-weight-semibold)',   description: 'Font weight' },
  { name: '--text-heading-color',          value: 'var(--color-text-default)',     description: 'Color del texto' },
  { name: '--text-heading-letter-spacing', value: 'var(--letter-spacing-tight)',   description: 'Letter spacing' },
];

export const headingLevelTokens: Token[] = [
  { name: '--text-h1-font-size', value: 'var(--font-size-10)', description: 'H1 font size (96px)' },
  { name: '--text-h2-font-size', value: 'var(--font-size-9)',  description: 'H2 font size (72px)' },
  { name: '--text-h3-font-size', value: 'var(--font-size-8)',  description: 'H3 font size (56px)' },
  { name: '--text-h4-font-size', value: 'var(--font-size-7)',  description: 'H4 font size (40px)' },
  { name: '--text-h5-font-size', value: 'var(--font-size-6)',  description: 'H5 font size (32px)' },
  { name: '--text-h6-font-size', value: 'var(--font-size-5)',  description: 'H6 font size (24px)' },
];

export const headingDarkTokens: Token[] = [
  { name: '--text-heading-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];

export const paragraphBaseTokens: Token[] = [
  { name: '--text-paragraph-font-family',    value: 'var(--text-font-family)',       description: 'Font family' },
  { name: '--text-paragraph-font-size',      value: 'var(--text-font-size)',         description: 'Font size (16px)' },
  { name: '--text-paragraph-font-weight',    value: 'var(--text-font-weight)',       description: 'Font weight' },
  { name: '--text-paragraph-line-height',    value: 'var(--text-line-height)',       description: 'Line height' },
  { name: '--text-paragraph-color',          value: 'var(--text-color)',             description: 'Color del texto' },
  { name: '--text-paragraph-letter-spacing', value: 'var(--text-letter-spacing)',    description: 'Letter spacing' },
];

export const paragraphSizeTokens: Token[] = [
  { name: '--text-paragraph-small-font-size', value: 'var(--font-size-1)', description: 'Pequeño (14px)' },
  { name: '--text-paragraph-large-font-size', value: 'var(--font-size-3)', description: 'Grande (18px)' },
];

export const paragraphDarkTokens: Token[] = [
  { name: '--text-paragraph-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];

export const listBaseTokens: Token[] = [
  { name: '--text-list-font-family',          value: 'var(--text-paragraph-font-family)',    description: 'Font family' },
  { name: '--text-list-font-size',            value: 'var(--text-paragraph-font-size)',      description: 'Font size (16px)' },
  { name: '--text-list-font-weight',          value: 'var(--text-paragraph-font-weight)',    description: 'Font weight' },
  { name: '--text-list-line-height',          value: 'var(--text-paragraph-line-height)',    description: 'Line height' },
  { name: '--text-list-color',                value: 'var(--text-paragraph-color)',          description: 'Color del texto' },
  { name: '--text-list-letter-spacing',       value: 'var(--text-paragraph-letter-spacing)', description: 'Letter spacing' },
  { name: '--text-list-gap',                  value: 'var(--spacing-2)',                     description: 'Espacio entre ítems (8px)' },
  { name: '--text-list-padding-inline-start', value: 'var(--spacing-6)',                     description: 'Sangría izquierda (32px)' },
];

export const listDarkTokens: Token[] = [
  { name: '--text-list-dark-color', value: 'var(--color-text-dark)', description: 'Color del texto sobre fondo oscuro' },
];
