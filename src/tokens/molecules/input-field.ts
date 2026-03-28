import type { Token } from '../utils';

export const inputFieldBaseTokens: Token[] = [
  { name: '--input-field-gap', value: 'var(--spacing-2)', description: 'Espacio entre label, input, helper y error' },
];

export const inputFieldErrorTokens: Token[] = [
  { name: '--input-field-error-font-family', value: 'var(--form-error-font-family)', description: 'Font family del mensaje de error' },
  { name: '--input-field-error-font-size',   value: 'var(--form-error-font-size)',   description: 'Font size del mensaje de error' },
  { name: '--input-field-error-font-weight', value: 'var(--form-error-font-weight)', description: 'Font weight del mensaje de error' },
  { name: '--input-field-error-line-height', value: 'var(--form-error-line-height)', description: 'Line height del mensaje de error' },
  { name: '--input-field-error-color',       value: 'var(--form-error-color)',       description: 'Color del mensaje de error' },
];

export const inputFieldHelperTokens: Token[] = [
  { name: '--input-field-helper-font-family', value: 'var(--form-helper-font-family)', description: 'Font family del texto de ayuda' },
  { name: '--input-field-helper-font-size',   value: 'var(--form-helper-font-size)',   description: 'Font size del texto de ayuda' },
  { name: '--input-field-helper-font-weight', value: 'var(--form-helper-font-weight)', description: 'Font weight del texto de ayuda' },
  { name: '--input-field-helper-line-height', value: 'var(--form-helper-line-height)', description: 'Line height del texto de ayuda' },
  { name: '--input-field-helper-color',       value: 'var(--form-helper-color)',       description: 'Color del texto de ayuda' },
];
