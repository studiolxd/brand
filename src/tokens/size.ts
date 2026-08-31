import component from '../../tokens/size/component.json';
import target from '../../tokens/size/target.json';
import { flattenTokens } from './utils';

export const componentSizeTokens = flattenTokens(component as never);
export const targetSizeTokens = flattenTokens(target as never);
