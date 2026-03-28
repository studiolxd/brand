import type { Token } from '../utils';

export const textareaFieldBaseTokens: Token[] = [
  { name: '--textarea-field-gap', value: 'var(--spacing-2)', description: 'Espacio entre label, textarea, helper y error' },
];

export const textareaFieldErrorTokens: Token[] = [
  { name: '--textarea-field-error-font-family', value: 'var(--form-error-font-family)', description: 'Font family del mensaje de error' },
  { name: '--textarea-field-error-font-size',   value: 'var(--form-error-font-size)',   description: 'Font size del mensaje de error' },
  { name: '--textarea-field-error-font-weight', value: 'var(--form-error-font-weight)', description: 'Font weight del mensaje de error' },
  { name: '--textarea-field-error-line-height', value: 'var(--form-error-line-height)', description: 'Line height del mensaje de error' },
  { name: '--textarea-field-error-color',       value: 'var(--form-error-color)',       description: 'Color del mensaje de error' },
];

export const textareaFieldHelperTokens: Token[] = [
  { name: '--textarea-field-helper-font-family', value: 'var(--form-helper-font-family)', description: 'Font family del texto de ayuda' },
  { name: '--textarea-field-helper-font-size',   value: 'var(--form-helper-font-size)',   description: 'Font size del texto de ayuda' },
  { name: '--textarea-field-helper-font-weight', value: 'var(--form-helper-font-weight)', description: 'Font weight del texto de ayuda' },
  { name: '--textarea-field-helper-line-height', value: 'var(--form-helper-line-height)', description: 'Line height del texto de ayuda' },
  { name: '--textarea-field-helper-color',       value: 'var(--form-helper-color)',       description: 'Color del texto de ayuda' },
];
