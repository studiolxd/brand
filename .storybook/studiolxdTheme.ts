import { create } from 'storybook/theming';
import palette from '../tokens/color/palette.json';
import brand from '../tokens/color/brand.json';
import neutral from '../tokens/color/neutral.json';
import semantic from '../tokens/color/semantic.json';
import family from '../tokens/typography/family.json';
import button from '../tokens/component/button.json';
import input from '../tokens/component/input.json';
import { resolveRef } from '../src/tokens/utils';

const refMap: Record<string, string> = {
  ...Object.fromEntries(Object.entries(palette.color).map(([k, v]) => [`color.${k}`, v.$value])),  
  ...Object.fromEntries(Object.entries(brand.color).map(([k, v]) => [`color.${k}`, v.$value])),  
  ...Object.fromEntries(Object.entries(neutral.color).map(([k, v]) => [`color.${k}`, v.$value])),
};

export default create({
  base: 'light',
  colorPrimary: resolveRef(brand.color.primary.$value, refMap),
  colorSecondary: resolveRef(brand.color.secondary.$value, refMap),

  appBg: resolveRef(semantic.color.background.default.$value, refMap),
  appContentBg: resolveRef(semantic.color.background.default.$value, refMap),
  appHoverBg: resolveRef(brand.color.secondary.$value, refMap),
  appPreviewBg: resolveRef(semantic.color.background.default.$value, refMap),

  appBorderColor: resolveRef(brand.color.primary.$value, refMap),
  appBorderRadius: 0,

  fontBase: family['font-family'].sans.$value,
  fontCode: family['font-family'].mono.$value,  

  textColor: resolveRef(semantic.color.text.default.$value, refMap),
  textInverseColor: resolveRef(semantic.color.text.dark.$value, refMap),
  textMutedColor: resolveRef(semantic.color.text.placeholder.$value, refMap),  

  barTextColor: resolveRef(semantic.color.text.default.$value, refMap),
  barHoverColor: resolveRef(brand.color.secondary.$value, refMap),
  barSelectedColor: resolveRef(brand.color.secondary.$value, refMap),
  barBg: resolveRef(semantic.color.background.default.$value, refMap),

  buttonBg: resolveRef(brand.color.primary.$value, refMap),
  buttonBorder: resolveRef(button.button.primary.border.$value, refMap),

  booleanBg: resolveRef(neutral.color['grey-lightest'].$value, refMap),
  booleanSelectedBg: resolveRef(neutral.color['grey-light'].$value, refMap),

  inputBg: resolveRef(input.input.bg.$value, refMap),
  inputBorder: resolveRef(input.input['border-color'].$value, refMap),
  inputTextColor: resolveRef(input.input.color.$value, refMap),
  inputBorderRadius: 0,

  brandTitle: 'Studio LXD',
  brandUrl: 'https://brand.studiolxd.com',
  brandImage: '/logo.svg',
  brandTarget: '_blank',

  gridCellSize: 12,
  
});
