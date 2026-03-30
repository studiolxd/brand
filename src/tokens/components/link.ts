import type { Token } from '../utils';

export const linkBaseTokens: Token[] = [
  { name: '--link-color',                 value: 'inherit',    description: 'Color — heredado del texto circundante' },
  { name: '--link-text-decoration',       value: 'underline',  description: 'Decoración por defecto' },
  { name: '--link-text-decoration-hover', value: 'none',       description: 'Decoración en hover' },
  { name: '--link-cursor',                value: 'pointer',    description: 'Cursor' },
];

export const linkDarkTokens: Token[] = [
  { name: '--link-dark-color', value: 'var(--color-text-dark)', description: 'Color sobre fondo oscuro' },
];
