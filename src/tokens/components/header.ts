import header from '../../../tokens/component/header.json';
import { flattenTokens } from '../utils';

const all = flattenTokens(header as never);

export const headerDimensionTokens  = all.filter(t => t.name.match(/--header-(height|logo-height|nav-padding|featured-padding|featured-margin|featured-border-width|nav-gap|nav-font-size|featured-font-size|actions-gap|featured-font-weight|nav-font-weight|nav-padding-block)/));
export const headerColorTokens      = all.filter(t => t.name.match(/--header-(bg|dark-bg|nav-color|nav-dark-color|featured-border-color)/));
export const headerLayerTokens      = all.filter(t => t.name.match(/--header-(z-index|controls-z-index|navbar-z-index|backdrop-z-index)/));
export const headerMotionTokens     = all.filter(t => t.name.match(/--header-navbar-transition/));
export const headerShadowTokens     = all.filter(t => t.name.match(/--header-shadow/));
