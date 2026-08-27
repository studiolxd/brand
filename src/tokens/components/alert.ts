import alert from '../../../tokens/component/alert.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(alert as never);

const VARIANTS = ['success', 'error', 'warning'];

export const alertBaseTokens = all.filter(
  t => !VARIANTS.some(v => t.name.startsWith(`--alert-${v}-`)),
);

export const alertVariantTokens = all.filter(
  t => VARIANTS.some(v => t.name.startsWith(`--alert-${v}-`)),
);
