import colorPicker from '../../../tokens/molecule/color-picker.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(colorPicker as never);
const isDark = (name: string) => name.includes('-surface-dark-');

export const colorPickerTokens     = all.filter(t => !isDark(t.name));
export const colorPickerDarkTokens = all.filter(t => isDark(t.name));
