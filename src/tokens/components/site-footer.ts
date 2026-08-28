import siteFooter from '../../../tokens/component/site-footer.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(siteFooter as never);

export const siteFooterTokens     = all.filter(t => !t.name.includes('-surface-dark-'));
export const siteFooterDarkTokens = all.filter(t => t.name.includes('-surface-dark-'));
