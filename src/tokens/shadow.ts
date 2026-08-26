import scale from '../../tokens/shadow/scale.json';
import { flattenTokens } from './utils';

const all = flattenTokens(scale as never);
export const shadowRoleTokens  = all.filter((t) => /-default$/.test(t.name));
export const shadowScaleTokens = all.filter((t) => !/-default$/.test(t.name));
