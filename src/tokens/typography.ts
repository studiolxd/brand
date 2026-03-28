import family from '../../tokens/typography/family.json';
import size from '../../tokens/typography/size.json';
import weight from '../../tokens/typography/weight.json';
import lineHeight from '../../tokens/typography/line-height.json';
import letterSpacing from '../../tokens/typography/letter-spacing.json';
import { flattenTokens } from './utils';

export const familyTokens = flattenTokens(family as never);
export const sizeTokens = flattenTokens(size as never);
export const weightTokens = flattenTokens(weight as never);
export const lineHeightTokens = flattenTokens(lineHeight as never);
export const letterSpacingTokens = flattenTokens(letterSpacing as never);

type FontExtensions = { 'studio-lxd': { intro: string; link: string } };
type FontToken = { $value: string; $extensions: FontExtensions };

export const fontFamilies = Object.values(
  family['font-family'] as Record<string, FontToken>
).map((token) => ({
  name: token.$value.split(',')[0].trim().replace(/['"]/g, ''),
  fontFamily: token.$value,
  intro: token.$extensions['studio-lxd'].intro,
  link: token.$extensions['studio-lxd'].link,
}));
