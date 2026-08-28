import consent from '../../../tokens/molecule/consent.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(consent as never);

export const consentBannerTokens      = all.filter(t => t.name.startsWith('--consent-banner-') && !t.name.startsWith('--consent-banner-surface-dark-'));
export const consentPreferencesTokens = all.filter(t => t.name.startsWith('--consent-preferences-') && !t.name.startsWith('--consent-preferences-surface-dark-'));
export const consentDarkTokens        = all.filter(t => t.name.includes('-surface-dark-'));
