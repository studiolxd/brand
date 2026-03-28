import type { Token } from './utils';

export const formGapTokens: Token[] = [
  { name: '--form-gap', value: 'var(--spacing-4)', description: 'Separación entre campos del formulario' },
];

export const formHeadingTokens: Token[] = [
  { name: '--form-heading-font-family',    value: 'var(--font-family-sans)',     description: 'Font family del heading' },
  { name: '--form-heading-font-size',      value: 'var(--font-size-5)',          description: 'Font size del heading (20px)' },
  { name: '--form-heading-font-weight',    value: 'var(--font-weight-semibold)', description: 'Font weight del heading' },
  { name: '--form-heading-line-height',    value: 'var(--line-height-snug)',     description: 'Line height del heading' },
  { name: '--form-heading-letter-spacing', value: 'var(--letter-spacing-tight)', description: 'Letter spacing del heading' },
  { name: '--form-heading-color',          value: 'var(--color-text-default)',   description: 'Color del heading' },
  { name: '--form-heading-dark-color',     value: 'var(--color-text-dark)',      description: 'Color del heading sobre fondo oscuro' },
];

export const formErrorTokens: Token[] = [
  { name: '--form-error-font-family', value: 'var(--font-family-sans)',    description: 'Font family del mensaje de error' },
  { name: '--form-error-font-size',   value: 'var(--font-size-1)',         description: 'Font size del mensaje de error (12px)' },
  { name: '--form-error-font-weight', value: 'var(--font-weight-default)', description: 'Font weight del mensaje de error' },
  { name: '--form-error-line-height', value: 'var(--line-height-normal)',  description: 'Line height del mensaje de error' },
  { name: '--form-error-color',       value: 'var(--color-error)',         description: 'Color del mensaje de error' },
  { name: '--form-error-dark-color',  value: 'var(--color-error-dark)',    description: 'Color del mensaje de error sobre fondo oscuro' },
];

export const formHelperTokens: Token[] = [
  { name: '--form-helper-font-family', value: 'var(--font-family-sans)',      description: 'Font family del texto de ayuda' },
  { name: '--form-helper-font-size',   value: 'var(--font-size-1)',           description: 'Font size del texto de ayuda (12px)' },
  { name: '--form-helper-font-weight', value: 'var(--font-weight-default)',   description: 'Font weight del texto de ayuda' },
  { name: '--form-helper-line-height', value: 'var(--line-height-normal)',    description: 'Line height del texto de ayuda' },
  { name: '--form-helper-color',       value: 'var(--color-text-muted)',      description: 'Color del texto de ayuda' },
  { name: '--form-helper-dark-color',  value: 'var(--color-text-muted-dark)', description: 'Color del texto de ayuda sobre fondo oscuro' },
];

export const formSuccessTokens: Token[] = [
  { name: '--form-success-font-family', value: 'var(--font-family-sans)',    description: 'Font family del mensaje de éxito' },
  { name: '--form-success-font-size',   value: 'var(--font-size-3)',         description: 'Font size del mensaje de éxito (16px)' },
  { name: '--form-success-font-weight', value: 'var(--font-weight-default)', description: 'Font weight del mensaje de éxito' },
  { name: '--form-success-line-height', value: 'var(--line-height-normal)',  description: 'Line height del mensaje de éxito' },
  { name: '--form-success-color',       value: 'var(--color-text-default)',  description: 'Color del mensaje de éxito' },
  { name: '--form-success-dark-color',  value: 'var(--color-text-dark)',     description: 'Color del mensaje de éxito sobre fondo oscuro' },
];
