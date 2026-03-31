import formJson from '../../tokens/component/form.json';
import { flattenTokens, type Token } from './utils';

const all = flattenTokens(formJson as never);

export const formGapTokens = all.filter(t =>
  !t.name.startsWith('--form-heading-') &&
  !t.name.startsWith('--form-error-') &&
  !t.name.startsWith('--form-helper-') &&
  !t.name.startsWith('--form-success-'),
);

export const formHeadingTokens = all.filter(t => t.name.startsWith('--form-heading-'));

export const formHeadingDarkTokens: Token[] = [
  { name: '--form-heading-dark-color', value: 'var(--color-text-dark)', description: 'Color del heading sobre fondo oscuro' },
];

export const formErrorTokens = all.filter(t => t.name.startsWith('--form-error-'));

export const formErrorDarkTokens: Token[] = [
  { name: '--form-error-dark-color', value: 'var(--color-error-dark)', description: 'Color del mensaje de error sobre fondo oscuro' },
];

export const formHelperTokens = all.filter(t => t.name.startsWith('--form-helper-'));

export const formHelperDarkTokens: Token[] = [
  { name: '--form-helper-dark-color', value: 'var(--color-text-muted-dark)', description: 'Color del texto de ayuda sobre fondo oscuro' },
];

export const formSuccessTokens = all.filter(t => t.name.startsWith('--form-success-'));

export const formSuccessDarkTokens: Token[] = [
  { name: '--form-success-dark-color', value: 'var(--color-text-dark)', description: 'Color del mensaje de éxito sobre fondo oscuro' },
];
