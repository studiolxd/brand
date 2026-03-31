import component from '../../tokens/size/component.json';
import content from '../../tokens/size/content.json';
import { flattenTokens } from './utils';

export const componentSizeTokens = flattenTokens(component as never);
export const contentSizeTokens = flattenTokens(content as never);
