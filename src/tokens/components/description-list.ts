import descriptionList from '../../../tokens/component/description-list.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(descriptionList as never);

export const descriptionListTokens     = all.filter(t => !t.name.startsWith('--description-list-surface-dark-'));
export const descriptionListDarkTokens = all.filter(t => t.name.startsWith('--description-list-surface-dark-'));
