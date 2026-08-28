import projectCard from '../../../tokens/molecule/project-card.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(projectCard as never);

export const projectCardTokens     = all.filter(t => !t.name.includes('-surface-dark-'));
export const projectCardDarkTokens = all.filter(t => t.name.includes('-surface-dark-'));
