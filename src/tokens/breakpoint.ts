import breakpoint from '../../tokens/breakpoint/breakpoint.json';
import { flattenTokens } from './utils';

export const breakpointTokens = flattenTokens(breakpoint as never);
