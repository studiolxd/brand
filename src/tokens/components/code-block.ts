import codeBlock from '../../../tokens/component/code-block.json';
import { flattenTokens, type Token } from '../utils';

const all = flattenTokens(codeBlock as never);

const esOscuro   = (t: Token) => t.name.includes('-surface-dark-');
const esSintaxis = (t: Token) => t.name.startsWith('--code-block-token-');

export const codeBlockTokens       = all.filter(t => !esOscuro(t) && !esSintaxis(t));
export const codeBlockSyntaxTokens = all.filter(t => esSintaxis(t) && !esOscuro(t));
export const codeBlockDarkTokens   = all.filter(t => esOscuro(t));
