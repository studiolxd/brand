import StyleDictionary from 'style-dictionary';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { registerDarkModeFormat, isDarkToken } from './sd.formats.mjs';

registerDarkModeFormat(StyleDictionary);

const cssOptions = { selector: ':root', outputReferences: true };
const scssOptions = { outputReferences: false };

const filters = {
  color:       (t) => t.path[0] === 'color',
  breakpoint:  (t) => t.path[0] === 'breakpoint',
  typography:  (t) => ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'].includes(t.path[0]),
  spacing:     (t) => t.path[0] === 'spacing',
  border:      (t) => t.path[0] === 'border-radius' || t.path[0] === 'border-width',
  shadow:      (t) => t.path[0] === 'shadow',
  size:        (t) => t.path[0] === 'size-component' || t.path[0] === 'content',
  motion:      (t) => t.path[0] === 'motion',
  opacity:     (t) => t.path[0] === 'opacity',
  'z-index':   (t) => t.path[0] === 'z-index',
  'skip-link': (t) => t.path[0] === 'skip-link',
  form:        (t) => t.path[0] === 'form',
  text:        (t) => t.path[0] === 'text',
  control:     (t) => t.path[0] === 'control',
  input:       (t) => t.path[0] === 'input',
  breadcrumb:  (t) => t.path[0] === 'breadcrumb',
  button:      (t) => t.path[0] === 'button',
  textarea:    (t) => t.path[0] === 'textarea',
  checkbox:    (t) => t.path[0] === 'checkbox',
  'menu-button': (t) => t.path[0] === 'menu-button',
  logo:        (t) => t.path[0] === 'logo',
  header:      (t) => t.path[0] === 'header',
  'app-header': (t) => t.path[0] === 'app-header',
  label:       (t) => t.path[0] === 'label',
  link:        (t) => t.path[0] === 'link',
  tag:         (t) => t.path[0] === 'tag',
  kbd:         (t) => t.path[0] === 'kbd',
  card:        (t) => t.path[0] === 'card',
  container:   (t) => t.path[0] === 'container',
  columns:     (t) => t.path[0] === 'columns',
  'site-shell': (t) => t.path[0] === 'site-shell',
  stack:       (t) => t.path[0] === 'stack',
  'site-header': (t) => t.path[0] === 'site-header',
  'pricing-card': (t) => t.path[0] === 'pricing-card',
  'code-block':   (t) => t.path[0] === 'code-block',
  'highlight-section': (t) => t.path[0] === 'highlight-section',
  select:         (t) => t.path[0] === 'select',
  'multi-select': (t) => t.path[0] === 'multi-select',
  carousel:    (t) => t.path[0] === 'carousel',
  'card-square': (t) => t.path[0] === 'card-square',
  'card-split':  (t) => t.path[0] === 'card-split',
  avatar:      (t) => t.path[0] === 'avatar',
  'input-phone': (t) => t.path[0] === 'input-phone',
  accordion:     (t) => t.path[0] === 'accordion',
  arrow:         (t) => t.path[0] === 'arrow',
  icon:          (t) => t.path[0] === 'icon',
  radio:            (t) => t.path[0] === 'radio',
  'input-field':    (t) => t.path[0] === 'input-field',
  'form-field':     (t) => t.path[0] === 'form-field',
  'site-nav':          (t) => t.path[0] === 'site-nav',
  'language-switcher': (t) => t.path[0] === 'language-switcher',
  'theme-switcher':    (t) => t.path[0] === 'theme-switcher',
  'dropdown-field':    (t) => t.path[0] === 'dropdown-field',
  'legal-footer':      (t) => t.path[0] === 'legal-footer',
  'notification-button': (t) => t.path[0] === 'notification-button',
  'textarea-field': (t) => t.path[0] === 'textarea-field',
  'select-field':         (t) => t.path[0] === 'select-field',
  'multi-select-field':   (t) => t.path[0] === 'multi-select-field',
  'checkbox-field':  (t) => t.path[0] === 'checkbox-field',
  'radio-field':     (t) => t.path[0] === 'radio-field',
  'clients-section':    (t) => t.path[0] === 'clients-section',
  'methodology-section':(t) => t.path[0] === 'methodology-section',
  'contact-section':    (t) => t.path[0] === 'contact-section',
  footer:               (t) => t.path[0] === 'footer',
  section:              (t) => t.path[0] === 'section',
  'floating-panel':     (t) => t.path[0] === 'floating-panel',
  menu:                 (t) => t.path[0] === 'menu',
  'command-palette':    (t) => t.path[0] === 'command-palette',
  'image-crop-dialog':  (t) => t.path[0] === 'image-crop-dialog',
  popover:              (t) => t.path[0] === 'popover',
  tooltip:              (t) => t.path[0] === 'tooltip',
  pagination:           (t) => t.path[0] === 'pagination',
  'prev-next-nav':      (t) => t.path[0] === 'prev-next-nav',
  sidebar:              (t) => t.path[0] === 'sidebar',
  table:                (t) => t.path[0] === 'table',
  'data-table':         (t) => t.path[0] === 'data-table',
  'org-switcher':       (t) => t.path[0] === 'org-switcher',
  'app-launcher':     (t) => t.path[0] === 'app-launcher',
  'user-menu':          (t) => t.path[0] === 'user-menu',
  'sidebar-nav':        (t) => t.path[0] === 'sidebar-nav',
  modal:               (t) => t.path[0] === 'modal',
  sheet:               (t) => t.path[0] === 'sheet',
  tabs:                (t) => t.path[0] === 'tabs',
  calendar:            (t) => t.path[0] === 'calendar',
  'calendar-planner':  (t) => t.path[0] === 'calendar-planner',
  'calendar-roster':   (t) => t.path[0] === 'calendar-roster',
  'time-select':       (t) => t.path[0] === 'time-select',
  'time-field':        (t) => t.path[0] === 'time-field',
  'date-picker-field': (t) => t.path[0] === 'date-picker-field',
  'date-time-field':   (t) => t.path[0] === 'date-time-field',
  switcher:            (t) => t.path[0] === 'switcher',
  'switcher-field':    (t) => t.path[0] === 'switcher-field',
  'password-field':    (t) => t.path[0] === 'password-field',
  'empty-state':       (t) => t.path[0] === 'empty-state',
  'progress-bar':      (t) => t.path[0] === 'progress-bar',
  spinner:             (t) => t.path[0] === 'spinner',
  skeleton:            (t) => t.path[0] === 'skeleton',
  alert:               (t) => t.path[0] === 'alert',
  toast:               (t) => t.path[0] === 'toast',
  'number-input':       (t) => t.path[0] === 'number-input',
  'number-input-field': (t) => t.path[0] === 'number-input-field',
  'file-upload':        (t) => t.path[0] === 'file-upload',
  'file-upload-field':  (t) => t.path[0] === 'file-upload-field',
  'description-list':   (t) => t.path[0] === 'description-list',
  'number-badge':       (t) => t.path[0] === 'number-badge',
  'message-bubble':     (t) => t.path[0] === 'message-bubble',
  'typing-indicator':   (t) => t.path[0] === 'typing-indicator',
  'message-composer':   (t) => t.path[0] === 'message-composer',
  'conversation-thread':(t) => t.path[0] === 'conversation-thread',
  'input-phone-field':      (t) => t.path[0] === 'input-phone-field',
  'otp-field':              (t) => t.path[0] === 'otp-field',
  'async-select-field':     (t) => t.path[0] === 'async-select-field',
  'async-multi-select-field': (t) => t.path[0] === 'async-multi-select-field',
  'conversation-list':  (t) => t.path[0] === 'conversation-list',
};

function cssFile(destination, filterKey) {
  return { destination, format: 'css/variables-with-dark-mode', filter: filters[filterKey], options: cssOptions };
}

function scssFile(destination, filterKey) {
  const baseFilter = filters[filterKey];
  // Los tokens `surface-dark-*` no se exponen a SCSS: no hay modo runtime
  // para consumidores no-React, así que solo reciben el valor claro.
  const filter = (t) => baseFilter(t) && !isDarkToken(t);
  return { destination, format: 'scss/variables', filter, options: scssOptions };
}

const sd = new StyleDictionary({
  usesDtcg: true,
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [
        cssFile('global/colors.css',    'color'),
        cssFile('global/breakpoint.css','breakpoint'),
        cssFile('global/typography.css','typography'),
        cssFile('global/spacing.css',   'spacing'),
        cssFile('global/border.css',    'border'),
        cssFile('global/shadow.css',    'shadow'),
        cssFile('global/size.css',      'size'),
        cssFile('global/motion.css',    'motion'),
        cssFile('global/opacity.css',   'opacity'),
        cssFile('global/z-index.css',   'z-index'),
        cssFile('global/form.css',      'form'),
        cssFile('global/section.css',   'section'),
        cssFile('components/text.css',             'text'),
        cssFile('components/control.css',          'control'),
        cssFile('components/input.css',            'input'),
        cssFile('components/breadcrumb.css',       'breadcrumb'),
        cssFile('components/button.css',           'button'),
        cssFile('components/textarea.css',         'textarea'),
        cssFile('components/checkbox.css',         'checkbox'),
        cssFile('components/radio.css',            'radio'),
        cssFile('components/menu-button.css',      'menu-button'),
        cssFile('components/logo.css',             'logo'),
        cssFile('components/header.css',           'header'),
        cssFile('components/app-header.css',       'app-header'),
        cssFile('components/label.css',            'label'),
        cssFile('components/link.css',             'link'),
        cssFile('components/tag.css',              'tag'),
        cssFile('components/kbd.css',              'kbd'),
        cssFile('components/card.css',             'card'),
        cssFile('components/container.css',        'container'),
        cssFile('components/columns.css',          'columns'),
        cssFile('components/site-shell.css',       'site-shell'),
        cssFile('components/stack.css',            'stack'),
        cssFile('components/skip-link.css',        'skip-link'),
        cssFile('components/site-header.css',      'site-header'),
        cssFile('components/pricing-card.css',     'pricing-card'),
        cssFile('components/code-block.css',       'code-block'),
        cssFile('components/highlight-section.css','highlight-section'),
        cssFile('components/select.css',             'select'),
        cssFile('components/multi-select.css',       'multi-select'),
        cssFile('components/carousel.css',         'carousel'),
        cssFile('components/card-square.css',      'card-square'),
        cssFile('components/card-split.css',       'card-split'),
        cssFile('components/avatar.css',           'avatar'),
        cssFile('components/input-phone.css',      'input-phone'),
        cssFile('components/accordion.css',         'accordion'),
        cssFile('components/arrow.css',            'arrow'),
        cssFile('components/icon.css',             'icon'),
        cssFile('molecules/input-field.css',       'input-field'),
        cssFile('molecules/form-field.css',        'form-field'),
        cssFile('molecules/site-nav.css',           'site-nav'),
        cssFile('molecules/language-switcher.css',  'language-switcher'),
        cssFile('molecules/theme-switcher.css',     'theme-switcher'),
        cssFile('molecules/dropdown-field.css',     'dropdown-field'),
        cssFile('components/legal-footer.css',      'legal-footer'),
        cssFile('molecules/notification-button.css', 'notification-button'),
        cssFile('molecules/textarea-field.css',    'textarea-field'),
        cssFile('molecules/select-field.css',           'select-field'),
        cssFile('molecules/multi-select-field.css',     'multi-select-field'),
        cssFile('molecules/checkbox-field.css',    'checkbox-field'),
        cssFile('molecules/radio-field.css',       'radio-field'),
        cssFile('components/clients-section.css',     'clients-section'),
        cssFile('components/methodology-section.css', 'methodology-section'),
        cssFile('components/contact-section.css',     'contact-section'),
        cssFile('components/footer.css',              'footer'),
        cssFile('components/floating-panel.css',      'floating-panel'),
        cssFile('molecules/menu.css',                 'menu'),
        cssFile('molecules/command-palette.css',      'command-palette'),
        cssFile('molecules/image-crop-dialog.css',    'image-crop-dialog'),
        cssFile('components/popover.css',             'popover'),
        cssFile('components/tooltip.css',             'tooltip'),
        cssFile('molecules/pagination.css',           'pagination'),
        cssFile('molecules/prev-next-nav.css',        'prev-next-nav'),
        cssFile('components/sidebar.css',             'sidebar'),
        cssFile('molecules/table.css',                'table'),
        cssFile('molecules/data-table.css',           'data-table'),
        cssFile('molecules/org-switcher.css',         'org-switcher'),
        cssFile('molecules/app-launcher.css',       'app-launcher'),
        cssFile('molecules/user-menu.css',            'user-menu'),
        cssFile('molecules/sidebar-nav.css',          'sidebar-nav'),
        cssFile('molecules/modal.css',                'modal'),
        cssFile('molecules/sheet.css',                'sheet'),
        cssFile('components/tabs.css',               'tabs'),
        cssFile('molecules/calendar.css',            'calendar'),
        cssFile('molecules/calendar-planner.css',   'calendar-planner'),
        cssFile('molecules/calendar-roster.css',    'calendar-roster'),
        cssFile('components/time-select.css',       'time-select'),
        cssFile('molecules/time-field.css',         'time-field'),
        cssFile('molecules/date-picker-field.css',  'date-picker-field'),
        cssFile('molecules/date-time-field.css',    'date-time-field'),
        cssFile('components/switcher.css',          'switcher'),
        cssFile('molecules/switcher-field.css',     'switcher-field'),
        cssFile('molecules/password-field.css',     'password-field'),
        cssFile('molecules/empty-state.css',        'empty-state'),
        cssFile('components/progress-bar.css',      'progress-bar'),
        cssFile('components/spinner.css',           'spinner'),
        cssFile('components/skeleton.css',          'skeleton'),
        cssFile('molecules/alert.css',              'alert'),
        cssFile('molecules/toast.css',              'toast'),
        cssFile('components/number-input.css',      'number-input'),
        cssFile('molecules/number-input-field.css', 'number-input-field'),
        cssFile('components/file-upload.css',       'file-upload'),
        cssFile('molecules/file-upload-field.css',  'file-upload-field'),
        cssFile('components/description-list.css', 'description-list'),
        cssFile('components/number-badge.css',     'number-badge'),
        cssFile('components/message-bubble.css',   'message-bubble'),
        cssFile('components/typing-indicator.css', 'typing-indicator'),
        cssFile('molecules/message-composer.css',  'message-composer'),
        cssFile('molecules/conversation-thread.css','conversation-thread'),
        cssFile('molecules/conversation-list.css', 'conversation-list'),
        cssFile('molecules/input-phone-field.css',  'input-phone-field'),
        cssFile('molecules/otp-field.css',          'otp-field'),
        cssFile('molecules/async-select-field.css', 'async-select-field'),
        cssFile('molecules/async-multi-select-field.css', 'async-multi-select-field'),
      ],
    },
    scss: {
      transformGroup: 'scss',
      prefix: 'lxd',
      buildPath: 'src/tokens/scss/',
      files: [
        scssFile('global/_colors.scss',    'color'),
        scssFile('global/_breakpoint.scss','breakpoint'),
        scssFile('global/_typography.scss','typography'),
        scssFile('global/_spacing.scss',   'spacing'),
        scssFile('global/_border.scss',    'border'),
        scssFile('global/_shadow.scss',    'shadow'),
        scssFile('global/_size.scss',      'size'),
        scssFile('global/_motion.scss',    'motion'),
        scssFile('global/_opacity.scss',   'opacity'),
        scssFile('global/_z-index.scss',   'z-index'),
        scssFile('global/_form.scss',      'form'),
        scssFile('global/_section.scss',   'section'),
        scssFile('components/_text.scss',             'text'),
        scssFile('components/_control.scss',          'control'),
        scssFile('components/_input.scss',            'input'),
        scssFile('components/_breadcrumb.scss',       'breadcrumb'),
        scssFile('components/_button.scss',           'button'),
        scssFile('components/_textarea.scss',         'textarea'),
        scssFile('components/_checkbox.scss',         'checkbox'),
        scssFile('components/_radio.scss',            'radio'),
        scssFile('components/_menu-button.scss',      'menu-button'),
        scssFile('components/_logo.scss',             'logo'),
        scssFile('components/_header.scss',           'header'),
        scssFile('components/_app-header.scss',       'app-header'),
        scssFile('components/_label.scss',            'label'),
        scssFile('components/_link.scss',             'link'),
        scssFile('components/_tag.scss',              'tag'),
        scssFile('components/_kbd.scss',              'kbd'),
        scssFile('components/_card.scss',             'card'),
        scssFile('components/_container.scss',        'container'),
        scssFile('components/_columns.scss',          'columns'),
        scssFile('components/_site-shell.scss',       'site-shell'),
        scssFile('components/_stack.scss',            'stack'),
        scssFile('components/_skip-link.scss',        'skip-link'),
        scssFile('components/_site-header.scss',      'site-header'),
        scssFile('components/_pricing-card.scss',     'pricing-card'),
        scssFile('components/_code-block.scss',       'code-block'),
        scssFile('components/_highlight-section.scss','highlight-section'),
        scssFile('components/_select.scss',             'select'),
        scssFile('components/_multi-select.scss',       'multi-select'),
        scssFile('components/_carousel.scss',         'carousel'),
        scssFile('components/_card-square.scss',      'card-square'),
        scssFile('components/_card-split.scss',       'card-split'),
        scssFile('components/_avatar.scss',           'avatar'),
        scssFile('components/_input-phone.scss',      'input-phone'),
        scssFile('components/_accordion.scss',         'accordion'),
        scssFile('components/_arrow.scss',            'arrow'),
        scssFile('components/_icon.scss',             'icon'),
        scssFile('molecules/_input-field.scss',       'input-field'),
        scssFile('molecules/_form-field.scss',        'form-field'),
        scssFile('molecules/_site-nav.scss',           'site-nav'),
        scssFile('molecules/_language-switcher.scss',  'language-switcher'),
        scssFile('molecules/_theme-switcher.scss',     'theme-switcher'),
        scssFile('molecules/_dropdown-field.scss',     'dropdown-field'),
        scssFile('components/_legal-footer.scss',      'legal-footer'),
        scssFile('molecules/_notification-button.scss', 'notification-button'),
        scssFile('molecules/_textarea-field.scss',    'textarea-field'),
        scssFile('molecules/_select-field.scss',           'select-field'),
        scssFile('molecules/_multi-select-field.scss',     'multi-select-field'),
        scssFile('molecules/_checkbox-field.scss',    'checkbox-field'),
        scssFile('molecules/_radio-field.scss',       'radio-field'),
        scssFile('components/_clients-section.scss',     'clients-section'),
        scssFile('components/_methodology-section.scss', 'methodology-section'),
        scssFile('components/_contact-section.scss',     'contact-section'),
        scssFile('components/_footer.scss',              'footer'),
        scssFile('components/_floating-panel.scss',      'floating-panel'),
        scssFile('molecules/_menu.scss',                 'menu'),
        scssFile('molecules/_command-palette.scss',      'command-palette'),
        scssFile('molecules/_image-crop-dialog.scss',    'image-crop-dialog'),
        scssFile('components/_popover.scss',             'popover'),
        scssFile('components/_tooltip.scss',             'tooltip'),
        scssFile('molecules/_pagination.scss',           'pagination'),
        scssFile('molecules/_prev-next-nav.scss',        'prev-next-nav'),
        scssFile('components/_sidebar.scss',             'sidebar'),
        scssFile('molecules/_table.scss',                'table'),
        scssFile('molecules/_data-table.scss',           'data-table'),
        scssFile('molecules/_org-switcher.scss',         'org-switcher'),
        scssFile('molecules/_app-launcher.scss',       'app-launcher'),
        scssFile('molecules/_user-menu.scss',            'user-menu'),
        scssFile('molecules/_sidebar-nav.scss',          'sidebar-nav'),
        scssFile('molecules/_modal.scss',                'modal'),
        scssFile('molecules/_sheet.scss',                'sheet'),
        scssFile('components/_tabs.scss',               'tabs'),
        scssFile('molecules/_calendar.scss',            'calendar'),
        scssFile('molecules/_calendar-planner.scss',   'calendar-planner'),
        scssFile('molecules/_calendar-roster.scss',    'calendar-roster'),
        scssFile('components/_time-select.scss',       'time-select'),
        scssFile('molecules/_time-field.scss',         'time-field'),
        scssFile('molecules/_date-picker-field.scss',  'date-picker-field'),
        scssFile('molecules/_date-time-field.scss',    'date-time-field'),
        scssFile('components/_switcher.scss',           'switcher'),
        scssFile('molecules/_switcher-field.scss',      'switcher-field'),
        scssFile('molecules/_password-field.scss',      'password-field'),
        scssFile('molecules/_empty-state.scss',         'empty-state'),
        scssFile('components/_progress-bar.scss',       'progress-bar'),
        scssFile('components/_spinner.scss',            'spinner'),
        scssFile('components/_skeleton.scss',           'skeleton'),
        scssFile('molecules/_alert.scss',               'alert'),
        scssFile('molecules/_toast.scss',               'toast'),
        scssFile('components/_number-input.scss',      'number-input'),
        scssFile('molecules/_number-input-field.scss', 'number-input-field'),
        scssFile('components/_file-upload.scss',       'file-upload'),
        scssFile('molecules/_file-upload-field.scss',  'file-upload-field'),
        scssFile('components/_description-list.scss',  'description-list'),
        scssFile('components/_number-badge.scss',      'number-badge'),
        scssFile('components/_message-bubble.scss',    'message-bubble'),
        scssFile('components/_typing-indicator.scss',  'typing-indicator'),
        scssFile('molecules/_message-composer.scss',   'message-composer'),
        scssFile('molecules/_conversation-thread.scss','conversation-thread'),
        scssFile('molecules/_conversation-list.scss', 'conversation-list'),
        scssFile('molecules/_input-phone-field.scss',  'input-phone-field'),
        scssFile('molecules/_otp-field.scss',          'otp-field'),
        scssFile('molecules/_async-select-field.scss', 'async-select-field'),
        scssFile('molecules/_async-multi-select-field.scss', 'async-multi-select-field'),
      ],
    },
  },
});

await sd.buildAllPlatforms();

// Genera los entrypoints SCSS a partir de las salidas de la plataforma scss:
// - _index.scss: @forward (Sass moderno)
// - _index.legacy.scss: @import (compiladores sin @use/@forward, ej. scssphp de Moodle)
const scssDestinations = sd.options.platforms.scss.files.map((f) => f.destination);
const toImportPath = (dest) =>
  dest.replace(/(?:^|\/)_([^/]+)\.scss$/, (_, name) => `/${name}`).replace(/^\//, '');
const indexLines = [
  '// Do not edit directly, this file was auto-generated.',
  '// Entrypoint moderno — usa @forward; requiere soporte de @use/@forward.',
  '',
  ...scssDestinations.map((dest) => `@forward '${toImportPath(dest)}';`),
  '',
];
writeFileSync('src/tokens/scss/_index.scss', indexLines.join('\n'));
console.log('✔︎ src/tokens/scss/_index.scss');
const legacyLines = [
  '// Do not edit directly, this file was auto-generated.',
  '// Legacy entrypoint — usa @import para compiladores que no soportan @use/@forward.',
  '',
  ...scssDestinations.map((dest) => `@import '${toImportPath(dest)}';`),
  '',
];
writeFileSync('src/tokens/scss/_index.legacy.scss', legacyLines.join('\n'));
console.log('✔︎ src/tokens/scss/_index.legacy.scss');

/* ---------------------------------------------------------------------------
 * Superficie pública: `.site-shell`
 *
 * Un `var()` dentro de una custom property se sustituye en el elemento que la
 * declara. `--alert-title-font-size: var(--text-font-size)` vive en `:root`, así
 * que ya viene resuelto a 16px cuando llega al alert: redefinir `--text-font-size`
 * en `.site-shell` no lo arrastra. La única forma de que un token que "hereda el
 * cuerpo" siga a la superficie es volver a declararlo en `.site-shell`, igual que
 * el modo oscuro vuelve a declarar los suyos en `.surface-dark`.
 *
 * Este bloque se genera solo: se parte de los tokens que la superficie pública
 * redefine (cuerpo, interlineado, peldaños del párrafo y escala de títulos) y se
 * arrastra, por punto fijo, todo token que los referencie. Añadir
 * `"{text.font-size}"` a un componente nuevo basta: el remapeo sale del build.
 * ------------------------------------------------------------------------- */
const cssName = (path) => `--${path.join('-')}`;

const surfaceSeeds = {
  'text.font-size':                   '--site-shell-text-font-size',
  'text.line-height':                 '--site-shell-text-line-height',
  'text.paragraph.small.font-size':   '--site-shell-paragraph-small-font-size',
  'text.paragraph.large.font-size':   '--site-shell-paragraph-large-font-size',
  ...Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [`text.size.${i + 1}`, `--site-shell-heading-size-${i + 1}`]),
  ),
};

const allTokens = [];
{
  const walk = (node, path) => {
    for (const [key, value] of Object.entries(node)) {
      if (!value || typeof value !== 'object') continue;
      if ('$value' in value) allTokens.push({ path: [...path, key], value: value.$value });
      else walk(value, [...path, key]);
    }
  };
  const files = [];
  const collect = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) collect(full);
      else if (entry.name.endsWith('.json')) files.push(full);
    }
  };
  collect('tokens');
  for (const file of files) walk(JSON.parse(readFileSync(file, 'utf-8')), []);
}

const surfaceMap = new Map(
  Object.entries(surfaceSeeds).map(([path, target]) => [path, `var(${target})`]),
);
for (let changed = true; changed; ) {
  changed = false;
  for (const { path, value } of allTokens) {
    const dotted = path.join('.');
    if (surfaceMap.has(dotted)) continue;
    if (path[0] === 'site-shell') continue;
    if (path.some((segment) => segment.startsWith('surface-dark-'))) continue;
    const ref = typeof value === 'string' && value.match(/^\{(.+)\}$/)?.[1];
    if (!ref || !surfaceMap.has(ref)) continue;
    surfaceMap.set(dotted, `var(${cssName(ref.split('.'))})`);
    changed = true;
  }
}

const surfaceLines = [
  '/**',
  ' * Do not edit directly, this file was auto-generated.',
  ' *',
  ' * La superficie pública: dentro de un SiteShell el cuerpo lee a 20px y la escala',
  ' * de títulos sube un peldaño. Cada token que hereda del cuerpo se vuelve a',
  ' * declarar aquí porque un var() dentro de una custom property se resuelve en el',
  ' * elemento que la declara, no en el que la usa.',
  ' */',
  '',
  '.site-shell {',
  ...[...surfaceMap].map(([path, value]) => `  ${cssName(path.split('.'))}: ${value};`),
  '}',
  '',
];
writeFileSync('src/tokens/surface-public.css', surfaceLines.join('\n'));
console.log('✔︎ src/tokens/surface-public.css');
