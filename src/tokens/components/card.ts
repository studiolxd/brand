import card from '../../../tokens/component/card.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(card as never);

export const cardTokens     = all.filter(t => !t.name.startsWith('--card-surface-dark-'));
export const cardDarkTokens = all.filter(t => t.name.startsWith('--card-surface-dark-'));
