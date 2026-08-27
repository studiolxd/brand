import siteShellJson from '../../../tokens/component/site-shell.json';
import { flattenTokens } from '../utils';

export const siteShellTokens = flattenTokens(siteShellJson as never);

/** Los que redefinen la escala de lectura de la superficie pública. */
export const siteShellTypeTokens = siteShellTokens.filter(
  (t) => /^--site-shell-(text|paragraph|heading)-/.test(t.name),
);
