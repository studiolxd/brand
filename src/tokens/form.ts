import formJson from '../../tokens/component/form.json';
import { flattenTokens, type Token } from './utils';

const all = flattenTokens(formJson as never);

/** Estructura y aire del formulario: campos, errores, acciones, enlaces y alternativas. */
export const formLayoutTokens = all.filter(t =>
  !t.name.startsWith('--form-error-') &&
  !t.name.startsWith('--form-helper-') &&
  !t.name.startsWith('--form-success-') &&
  !t.name.includes('surface-dark'),
);

export const formLayoutDarkTokens = all.filter(t => t.name.includes('surface-dark') && t.name.includes('alternatives'));

export const formErrorTokens = all.filter(t => t.name.startsWith('--form-error-') && !t.name.includes('surface-dark'));
export const formErrorDarkTokens: Token[] = all.filter(t => t.name.startsWith('--form-error-') && t.name.includes('surface-dark'));

export const formHelperTokens = all.filter(t => t.name.startsWith('--form-helper-') && !t.name.includes('surface-dark'));
export const formHelperDarkTokens: Token[] = all.filter(t => t.name.startsWith('--form-helper-') && t.name.includes('surface-dark'));

export const formSuccessTokens = all.filter(t => t.name.startsWith('--form-success-') && !t.name.includes('surface-dark'));
export const formSuccessDarkTokens: Token[] = all.filter(t => t.name.startsWith('--form-success-') && t.name.includes('surface-dark'));
