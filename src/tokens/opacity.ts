import scale from '../../tokens/opacity/scale.json';
import { flattenTokens } from './utils';

export const opacityTokens = flattenTokens(scale as never);
