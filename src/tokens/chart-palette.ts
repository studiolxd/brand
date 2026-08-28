import chartPalette from '../../tokens/color/chart.json';
import { flattenTokens } from './utils';

/** Solo la paleta de datos: `--color-chart-*`. Los roles del organismo van aparte. */
export const chartPaletteTokens = flattenTokens(chartPalette.color as never, 'color');
