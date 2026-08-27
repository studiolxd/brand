import appLauncher from '../../../tokens/component/app-launcher.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(appLauncher as never);

export const appLauncherTokens     = all.filter(t => !t.name.startsWith('--app-launcher-surface-dark-'));
export const appLauncherDarkTokens = all.filter(t => t.name.startsWith('--app-launcher-surface-dark-'));
