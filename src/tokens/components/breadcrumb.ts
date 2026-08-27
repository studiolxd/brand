import breadcrumb from '../../../tokens/component/breadcrumb.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(breadcrumb as never);

export const breadcrumbTokens     = all.filter(t => !t.name.startsWith('--breadcrumb-surface-dark-'));
export const breadcrumbDarkTokens = all.filter(t => t.name.startsWith('--breadcrumb-surface-dark-'));
