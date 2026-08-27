import commandPalette from '../../../tokens/molecule/command-palette.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(commandPalette as never);

export const commandPaletteBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const commandPaletteDarkTokens = all.filter(t => t.name.includes('surface-dark'));
