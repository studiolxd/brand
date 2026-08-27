import stackJson from '../../../tokens/component/stack.json';
import { flattenTokens } from '../utils';

export const stackTokens = flattenTokens(stackJson as never);
