import columnsJson from '../../../tokens/component/columns.json';
import { flattenTokens } from '../utils';

export const columnsTokens = flattenTokens(columnsJson as never);
