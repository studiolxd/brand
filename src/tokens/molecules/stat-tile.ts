import statTile from '../../../tokens/molecule/stat-tile.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(statTile as never);

export const statTileBaseTokens = all.filter(t => !t.name.includes('surface-dark'));
export const statTileDarkTokens = all.filter(t => t.name.includes('surface-dark'));
