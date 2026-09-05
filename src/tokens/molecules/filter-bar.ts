import filterBar from '../../../tokens/molecule/filter-bar.json';
import { flattenTokens } from '../utils';

// La barra es maqueta: no pinta ni un color, así que no tiene par oscuro.
export const filterBarTokens = flattenTokens(filterBar as never);
