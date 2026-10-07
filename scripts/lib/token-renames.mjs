/*
 * D9 — Tokens renombrados en la v51 por la convención de nombres
 * `<componente>-<parte>-<estado>-<propiedad>-<talla>`.
 *
 * Esta tabla NO es la fuente de los alias: cada token nuevo lleva sus nombres
 * antiguos en `$extensions["com.studiolxd"].deprecatedAliases`, y de ahí los
 * emite el build (`sd.config.mjs`). La tabla sirve de registro para la guía de
 * migración y para el test de convención (`src/tokens/naming.test.ts`), que
 * comprueba que cada renombrado conserva su alias y que ningún nombre viejo
 * sigue existiendo como token. Se retira, con los alias, en la v52.
 *
 * Los pares oscuros siguen solos: `surface-dark-<viejo>` pasa a
 * `surface-dark-<nuevo>` y no necesita alias propio, porque se publica con el
 * nombre de su par claro.
 */
export const TOKEN_RENAMES_V51 = {
  // El estado va ANTES de la propiedad.
  'breadcrumb.link-color-hover': 'breadcrumb.link-hover-color',
  'checkbox.bg-checked': 'checkbox.checked-bg',
  'checkbox.disabled-bg-checked': 'checkbox.checked-disabled-bg',
  'file-upload.remove-color-hover': 'file-upload.remove-hover-color',
  'password-field.toggle-color-hover': 'password-field.toggle-hover-color',
  'switcher.track-bg-checked': 'switcher.track-checked-bg',
  'tabs.trigger-pill-bg-active': 'tabs.trigger-pill-active-bg',
  'tabs.trigger-pill-color-active': 'tabs.trigger-pill-active-color',
  'typing-indicator.dot-opacity-active': 'typing-indicator.dot-active-opacity',

  // `bg`, nunca `background`.
  'text.background': 'text.bg',

  // `max-width`/`min-width`, nunca `width-max`/`width-min`.
  'modal.width-max': 'modal.max-width',

  // Medidas: `width`/`height`, nunca `inline-size`/`block-size` en el nombre.
  'accordion.index-min-inline-size': 'accordion.index-min-width',
  'app-launcher.tile-badge-block-size': 'app-launcher.tile-badge-height',
  'async-multi-select.input-min-inline-size': 'async-multi-select.input-min-width',
  'embed-frame.device-mobile-inline-size': 'embed-frame.device-mobile-width',
  'embed-frame.device-tablet-inline-size': 'embed-frame.device-tablet-width',
  'floating-dock.panel-inline-size': 'floating-dock.panel-width',
  'floating-dock.panel-block-size': 'floating-dock.panel-height',
  'loading-state.min-block-size': 'loading-state.min-height',
  'loading-state.sm-min-block-size': 'loading-state.sm-min-height',
  'modal.inline-size': 'modal.width',
  'otp-input.cell-inline-size': 'otp-input.cell-width',
  'slider.control-block-size': 'slider.control-height',
  'table.actions-inline-size': 'table.actions-width',
  'calendar.year-grid-min-inline-size': 'calendar.year-grid-min-width',
  'calendar.sm-year-grid-min-inline-size': 'calendar.sm-year-grid-min-width',
  'calendar.lg-year-grid-min-inline-size': 'calendar.lg-year-grid-min-width',
  'carousel.indicator-inline-size': 'carousel.indicator-width',
  'carousel.indicator-block-size': 'carousel.indicator-height',
  'carousel.indicator-hit-block-size': 'carousel.indicator-hit-height',
  'color-picker.panel.inline-size': 'color-picker.panel.width',
  'color-picker.area.block-size': 'color-picker.area.height',
  'consent.banner.max-inline-size': 'consent.banner.max-width',
  'date-picker.inline-size': 'date-picker.width',
  'docs-search.results-max-block-size': 'docs-search.results-max-height',
  'filter-bar.control-block-size': 'filter-bar.control-height',
  'notification-panel.inline-size': 'notification-panel.width',
  'notification-panel.list-max-block-size': 'notification-panel.list-max-height',
  'search-form.inline-size': 'search-form.width',
  'sheet.inline-size': 'sheet.width',
  'sheet.block-size': 'sheet.height',
  'table-of-contents.sticky-max-block-size': 'table-of-contents.sticky-max-height',
  'org-chart.viewport-block-size': 'org-chart.viewport-height',
  'org-chart.card-inline-size': 'org-chart.card-width',
  'site-search.inline-size': 'site-search.width',
  'site-search.ghost-section-inline-size': 'site-search.ghost-section-width',
  'site-search.ghost-title-inline-size': 'site-search.ghost-title-width',
  'site-search.ghost-url-inline-size': 'site-search.ghost-url-width',
};
