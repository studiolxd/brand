import container from '../../../tokens/component/container.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(container as never);

export const containerWidthTokens   = all.filter(t => t.name.includes('max-width'));
export const containerSpacingTokens = all.filter(t => t.name.includes('padding'));
