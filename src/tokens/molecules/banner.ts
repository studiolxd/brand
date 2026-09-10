import banner from '../../../tokens/molecule/banner.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(banner as never);

const VARIANTS = ['info', 'warning'];

export const bannerBaseTokens = all.filter(
  t => !VARIANTS.some(v => t.name.startsWith(`--banner-${v}-`)),
);

export const bannerVariantTokens = all.filter(
  t => VARIANTS.some(v => t.name.startsWith(`--banner-${v}-`)),
);
