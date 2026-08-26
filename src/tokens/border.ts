import width from '../../tokens/border/width.json';
import radius from '../../tokens/border/radius.json';
import { flattenTokens } from './utils';

const isRole = (name: string) => /-(default|focus|round)$/.test(name);

const allWidth = flattenTokens(width as never);
export const widthRoleTokens  = allWidth.filter((t) => isRole(t.name));
export const widthScaleTokens = allWidth.filter((t) => !isRole(t.name));

const allRadius = flattenTokens(radius as never);
export const radiusRoleTokens  = allRadius.filter((t) => isRole(t.name));
export const radiusScaleTokens = allRadius.filter((t) => !isRole(t.name));
