import StyleDictionary from 'style-dictionary';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { registerDarkModeFormat, registerJsonVariablesFormat, isDarkToken } from './sd.formats.mjs';

registerDarkModeFormat(StyleDictionary);
registerJsonVariablesFormat(StyleDictionary);

const cssOptions = { selector: ':root', outputReferences: true };
const scssOptions = { outputReferences: false };

const filters = {
  color:       (t) => t.path[0] === 'color',
  breakpoint:  (t) => t.path[0] === 'breakpoint',
  typography:  (t) => ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'].includes(t.path[0]),
  spacing:     (t) => t.path[0] === 'spacing',
  border:      (t) => t.path[0] === 'border-radius' || t.path[0] === 'border-width',
  shadow:      (t) => t.path[0] === 'shadow',
  size:        (t) => t.path[0] === 'size-component' || t.path[0] === 'content' || t.path[0] === 'size-target',
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
  'close-button': (t) => t.path[0] === 'close-button',
  logo:        (t) => t.path[0] === 'logo',
  logomark:    (t) => t.path[0] === 'logomark',
  'app-header': (t) => t.path[0] === 'app-header',
  label:       (t) => t.path[0] === 'label',
  link:        (t) => t.path[0] === 'link',
  tag:         (t) => t.path[0] === 'tag',
  kbd:         (t) => t.path[0] === 'kbd',
  separator:   (t) => t.path[0] === 'separator',
  card:        (t) => t.path[0] === 'card',
  container:   (t) => t.path[0] === 'container',
  columns:     (t) => t.path[0] === 'columns',
  'site-shell': (t) => t.path[0] === 'site-shell',
  stack:       (t) => t.path[0] === 'stack',
  inline:      (t) => t.path[0] === 'inline',
  'site-header': (t) => t.path[0] === 'site-header',
  'code-block':   (t) => t.path[0] === 'code-block',
  code:           (t) => t.path[0] === 'code',
  select:         (t) => t.path[0] === 'select',
  'multi-select': (t) => t.path[0] === 'multi-select',
  'async-select': (t) => t.path[0] === 'async-select',
  'async-multi-select': (t) => t.path[0] === 'async-multi-select',
  avatar:      (t) => t.path[0] === 'avatar',
  'input-phone': (t) => t.path[0] === 'input-phone',
  accordion:     (t) => t.path[0] === 'accordion',
  arrow:         (t) => t.path[0] === 'arrow',
  icon:          (t) => t.path[0] === 'icon',
  radio:            (t) => t.path[0] === 'radio',
  'radio-group':    (t) => t.path[0] === 'radio-group',
  'input-field':    (t) => t.path[0] === 'input-field',
  'form-field':     (t) => t.path[0] === 'form-field',
  'field-row':      (t) => t.path[0] === 'field-row',
  'site-nav':          (t) => t.path[0] === 'site-nav',
  'language-switcher': (t) => t.path[0] === 'language-switcher',
  'theme-switcher':    (t) => t.path[0] === 'theme-switcher',
  'dropdown-field':    (t) => t.path[0] === 'dropdown-field',
  'legal-footer':      (t) => t.path[0] === 'legal-footer',
  'site-footer':       (t) => t.path[0] === 'site-footer',
  hero:                (t) => t.path[0] === 'hero',
  highlight:           (t) => t.path[0] === 'highlight',
  figure:              (t) => t.path[0] === 'figure',
  'notification-button': (t) => t.path[0] === 'notification-button',
  'textarea-field': (t) => t.path[0] === 'textarea-field',
  'select-field':         (t) => t.path[0] === 'select-field',
  'multi-select-field':   (t) => t.path[0] === 'multi-select-field',
  'checkbox-field':  (t) => t.path[0] === 'checkbox-field',
  'radio-field':     (t) => t.path[0] === 'radio-field',
  section:              (t) => t.path[0] === 'section',
  'floating-panel':     (t) => t.path[0] === 'floating-panel',
  'floating-dock':      (t) => t.path[0] === 'floating-dock',
  menu:                 (t) => t.path[0] === 'menu',
  'command-palette':    (t) => t.path[0] === 'command-palette',
  'image-crop-dialog':  (t) => t.path[0] === 'image-crop-dialog',
  popover:              (t) => t.path[0] === 'popover',
  tooltip:              (t) => t.path[0] === 'tooltip',
  pagination:           (t) => t.path[0] === 'pagination',
  'prev-next-nav':      (t) => t.path[0] === 'prev-next-nav',
  consent:              (t) => t.path[0] === 'consent',
  carousel:             (t) => t.path[0] === 'carousel',
  'project-card':       (t) => t.path[0] === 'project-card',
  sidebar:              (t) => t.path[0] === 'sidebar',
  table:                (t) => t.path[0] === 'table',
  'data-table':         (t) => t.path[0] === 'data-table',
  steps:                (t) => t.path[0] === 'steps',
  stepper:              (t) => t.path[0] === 'stepper',
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
  'date-picker':       (t) => t.path[0] === 'date-picker',
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
  chat:                 (t) => t.path[0] === 'chat',
  'message-bubble':     (t) => t.path[0] === 'message-bubble',
  'typing-indicator':   (t) => t.path[0] === 'typing-indicator',
  'message-composer':   (t) => t.path[0] === 'message-composer',
  'conversation-thread':(t) => t.path[0] === 'conversation-thread',
  'input-phone-field':      (t) => t.path[0] === 'input-phone-field',
  'otp-input':              (t) => t.path[0] === 'otp-input',
  'otp-field':              (t) => t.path[0] === 'otp-field',
  'async-select-field':     (t) => t.path[0] === 'async-select-field',
  'async-multi-select-field': (t) => t.path[0] === 'async-multi-select-field',
  'conversation-list':  (t) => t.path[0] === 'conversation-list',
  'user-message':       (t) => t.path[0] === 'user-message',
  'assistant-message':  (t) => t.path[0] === 'assistant-message',
  'chat-shell':         (t) => t.path[0] === 'chat-shell',
  'onboarding-shell':   (t) => t.path[0] === 'onboarding-shell',
  chart:                (t) => t.path[0] === 'chart',
  sparkline:            (t) => t.path[0] === 'sparkline',
  prose:                (t) => t.path[0] === 'prose',
  'table-of-contents':  (t) => t.path[0] === 'table-of-contents',
  'docs-search':        (t) => t.path[0] === 'docs-search',
  'stat-tile':          (t) => t.path[0] === 'stat-tile',
  'copy-button':        (t) => t.path[0] === 'copy-button',
  'confirm-dialog':     (t) => t.path[0] === 'confirm-dialog',
  'search-form':        (t) => t.path[0] === 'search-form',
  'star-rating':        (t) => t.path[0] === 'star-rating',
  toggle:               (t) => t.path[0] === 'toggle',
  'toggle-group':       (t) => t.path[0] === 'toggle-group',
  collapsible:          (t) => t.path[0] === 'collapsible',
  'scroll-area':        (t) => t.path[0] === 'scroll-area',
  slider:               (t) => t.path[0] === 'slider',
  'tree-view':          (t) => t.path[0] === 'tree-view',
  'annotation-thread':  (t) => t.path[0] === 'annotation-thread',
  'text-inline':        (t) => t.path[0] === 'text-inline',
  'avatar-upload':      (t) => t.path[0] === 'avatar-upload',
  'uptime-bars':        (t) => t.path[0] === 'uptime-bars',
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
        cssFile('components/close-button.css',     'close-button'),
        cssFile('components/logo.css',             'logo'),
        cssFile('components/logomark.css',         'logomark'),
        cssFile('components/app-header.css',       'app-header'),
        cssFile('components/label.css',            'label'),
        cssFile('components/link.css',             'link'),
        cssFile('components/tag.css',              'tag'),
        cssFile('components/kbd.css',              'kbd'),
        cssFile('components/separator.css',        'separator'),
        cssFile('components/card.css',             'card'),
        cssFile('components/container.css',        'container'),
        cssFile('components/columns.css',          'columns'),
        cssFile('components/site-shell.css',       'site-shell'),
        cssFile('components/stack.css',            'stack'),
        cssFile('components/inline.css',           'inline'),
        cssFile('components/skip-link.css',        'skip-link'),
        cssFile('components/site-header.css',      'site-header'),
        cssFile('components/code-block.css',       'code-block'),
        cssFile('components/select.css',             'select'),
        cssFile('components/multi-select.css',       'multi-select'),
        cssFile('components/async-select.css',       'async-select'),
        cssFile('components/async-multi-select.css', 'async-multi-select'),
        cssFile('components/avatar.css',           'avatar'),
        cssFile('components/input-phone.css',      'input-phone'),
        cssFile('components/accordion.css',         'accordion'),
        cssFile('components/arrow.css',            'arrow'),
        cssFile('components/icon.css',             'icon'),
        cssFile('molecules/input-field.css',       'input-field'),
        cssFile('molecules/form-field.css',        'form-field'),
        cssFile('molecules/field-row.css',         'field-row'),
        cssFile('molecules/avatar-upload.css',     'avatar-upload'),
        cssFile('molecules/site-nav.css',           'site-nav'),
        cssFile('molecules/language-switcher.css',  'language-switcher'),
        cssFile('molecules/theme-switcher.css',     'theme-switcher'),
        cssFile('molecules/dropdown-field.css',     'dropdown-field'),
        cssFile('components/legal-footer.css',      'legal-footer'),
        cssFile('components/site-footer.css',       'site-footer'),
        cssFile('components/hero.css',              'hero'),
        cssFile('components/highlight.css',         'highlight'),
        cssFile('components/figure.css',            'figure'),
        cssFile('components/code.css',              'code'),
        cssFile('components/radio-group.css',       'radio-group'),
        cssFile('molecules/notification-button.css', 'notification-button'),
        cssFile('molecules/textarea-field.css',    'textarea-field'),
        cssFile('molecules/select-field.css',           'select-field'),
        cssFile('molecules/multi-select-field.css',     'multi-select-field'),
        cssFile('molecules/checkbox-field.css',    'checkbox-field'),
        cssFile('molecules/radio-field.css',       'radio-field'),
        cssFile('components/floating-panel.css',      'floating-panel'),
        cssFile('components/floating-dock.css',       'floating-dock'),
        cssFile('molecules/menu.css',                 'menu'),
        cssFile('molecules/command-palette.css',      'command-palette'),
        cssFile('molecules/image-crop-dialog.css',    'image-crop-dialog'),
        cssFile('components/popover.css',             'popover'),
        cssFile('components/tooltip.css',             'tooltip'),
        cssFile('molecules/pagination.css',           'pagination'),
        cssFile('molecules/prev-next-nav.css',        'prev-next-nav'),
        cssFile('molecules/consent.css',              'consent'),
        cssFile('molecules/carousel.css',             'carousel'),
        cssFile('molecules/project-card.css',         'project-card'),
        cssFile('components/sidebar.css',             'sidebar'),
        cssFile('molecules/table.css',                'table'),
        cssFile('molecules/data-table.css',           'data-table'),
        cssFile('molecules/steps.css',                'steps'),
        cssFile('molecules/stepper.css',              'stepper'),
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
        cssFile('molecules/date-picker.css',        'date-picker'),
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
        cssFile('components/chat.css',              'chat'),
        cssFile('components/message-bubble.css',   'message-bubble'),
        cssFile('components/typing-indicator.css', 'typing-indicator'),
        cssFile('molecules/message-composer.css',  'message-composer'),
        cssFile('molecules/conversation-thread.css','conversation-thread'),
        cssFile('molecules/conversation-list.css', 'conversation-list'),
        cssFile('molecules/user-message.css',      'user-message'),
        cssFile('molecules/assistant-message.css', 'assistant-message'),
        cssFile('molecules/chat-shell.css',        'chat-shell'),
        cssFile('molecules/onboarding-shell.css',  'onboarding-shell'),
        cssFile('molecules/prose.css',             'prose'),
        cssFile('molecules/table-of-contents.css', 'table-of-contents'),
        cssFile('molecules/docs-search.css',       'docs-search'),
        cssFile('molecules/stat-tile.css',         'stat-tile'),
        cssFile('molecules/copy-button.css',       'copy-button'),
        cssFile('molecules/confirm-dialog.css',    'confirm-dialog'),
        cssFile('molecules/search-form.css',       'search-form'),
        cssFile('molecules/input-phone-field.css',  'input-phone-field'),
        cssFile('components/otp-input.css',         'otp-input'),
        cssFile('molecules/otp-field.css',          'otp-field'),
        cssFile('molecules/async-select-field.css', 'async-select-field'),
        cssFile('molecules/async-multi-select-field.css', 'async-multi-select-field'),
        cssFile('molecules/chart.css',              'chart'),
        cssFile('components/sparkline.css',         'sparkline'),
        cssFile('components/star-rating.css',       'star-rating'),
        cssFile('components/toggle.css',            'toggle'),
        cssFile('components/toggle-group.css',      'toggle-group'),
        cssFile('components/collapsible.css',       'collapsible'),
        cssFile('components/scroll-area.css',       'scroll-area'),
        cssFile('components/slider.css',            'slider'),
        cssFile('molecules/tree-view.css',          'tree-view'),
        cssFile('molecules/annotation-thread.css',  'annotation-thread'),
        cssFile('components/text-inline.css',       'text-inline'),
        cssFile('molecules/uptime-bars.css',        'uptime-bars'),
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
        scssFile('components/_close-button.scss',     'close-button'),
        scssFile('components/_logo.scss',             'logo'),
        scssFile('components/_logomark.scss',         'logomark'),
        scssFile('components/_app-header.scss',       'app-header'),
        scssFile('components/_label.scss',            'label'),
        scssFile('components/_link.scss',             'link'),
        scssFile('components/_tag.scss',              'tag'),
        scssFile('components/_kbd.scss',              'kbd'),
        scssFile('components/_separator.scss',        'separator'),
        scssFile('components/_card.scss',             'card'),
        scssFile('components/_container.scss',        'container'),
        scssFile('components/_columns.scss',          'columns'),
        scssFile('components/_site-shell.scss',       'site-shell'),
        scssFile('components/_stack.scss',            'stack'),
        scssFile('components/_inline.scss',           'inline'),
        scssFile('components/_skip-link.scss',        'skip-link'),
        scssFile('components/_site-header.scss',      'site-header'),
        scssFile('components/_code-block.scss',       'code-block'),
        scssFile('components/_select.scss',             'select'),
        scssFile('components/_multi-select.scss',       'multi-select'),
        scssFile('components/_async-select.scss',       'async-select'),
        scssFile('components/_async-multi-select.scss', 'async-multi-select'),
        scssFile('components/_avatar.scss',           'avatar'),
        scssFile('components/_input-phone.scss',      'input-phone'),
        scssFile('components/_accordion.scss',         'accordion'),
        scssFile('components/_arrow.scss',            'arrow'),
        scssFile('components/_icon.scss',             'icon'),
        scssFile('molecules/_input-field.scss',       'input-field'),
        scssFile('molecules/_form-field.scss',        'form-field'),
        scssFile('molecules/_field-row.scss',         'field-row'),
        scssFile('molecules/_avatar-upload.scss',     'avatar-upload'),
        scssFile('molecules/_site-nav.scss',           'site-nav'),
        scssFile('molecules/_language-switcher.scss',  'language-switcher'),
        scssFile('molecules/_theme-switcher.scss',     'theme-switcher'),
        scssFile('molecules/_dropdown-field.scss',     'dropdown-field'),
        scssFile('components/_legal-footer.scss',      'legal-footer'),
        scssFile('components/_site-footer.scss',       'site-footer'),
        scssFile('components/_hero.scss',              'hero'),
        scssFile('components/_highlight.scss',         'highlight'),
        scssFile('components/_figure.scss',            'figure'),
        scssFile('components/_code.scss',              'code'),
        scssFile('components/_radio-group.scss',       'radio-group'),
        scssFile('molecules/_notification-button.scss', 'notification-button'),
        scssFile('molecules/_textarea-field.scss',    'textarea-field'),
        scssFile('molecules/_select-field.scss',           'select-field'),
        scssFile('molecules/_multi-select-field.scss',     'multi-select-field'),
        scssFile('molecules/_checkbox-field.scss',    'checkbox-field'),
        scssFile('molecules/_radio-field.scss',       'radio-field'),
        scssFile('components/_floating-panel.scss',      'floating-panel'),
        scssFile('components/_floating-dock.scss',       'floating-dock'),
        scssFile('molecules/_menu.scss',                 'menu'),
        scssFile('molecules/_command-palette.scss',      'command-palette'),
        scssFile('molecules/_image-crop-dialog.scss',    'image-crop-dialog'),
        scssFile('components/_popover.scss',             'popover'),
        scssFile('components/_tooltip.scss',             'tooltip'),
        scssFile('molecules/_pagination.scss',           'pagination'),
        scssFile('molecules/_prev-next-nav.scss',        'prev-next-nav'),
        scssFile('molecules/_consent.scss',              'consent'),
        scssFile('molecules/_carousel.scss',             'carousel'),
        scssFile('molecules/_project-card.scss',         'project-card'),
        scssFile('components/_sidebar.scss',             'sidebar'),
        scssFile('molecules/_table.scss',                'table'),
        scssFile('molecules/_data-table.scss',           'data-table'),
        scssFile('molecules/_steps.scss',                'steps'),
        scssFile('molecules/_stepper.scss',              'stepper'),
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
        scssFile('molecules/_date-picker.scss',        'date-picker'),
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
        scssFile('components/_chat.scss',              'chat'),
        scssFile('components/_message-bubble.scss',    'message-bubble'),
        scssFile('components/_typing-indicator.scss',  'typing-indicator'),
        scssFile('molecules/_message-composer.scss',   'message-composer'),
        scssFile('molecules/_conversation-thread.scss','conversation-thread'),
        scssFile('molecules/_conversation-list.scss', 'conversation-list'),
        scssFile('molecules/_user-message.scss',      'user-message'),
        scssFile('molecules/_assistant-message.scss', 'assistant-message'),
        scssFile('molecules/_chat-shell.scss',        'chat-shell'),
        scssFile('molecules/_onboarding-shell.scss',  'onboarding-shell'),
        scssFile('molecules/_prose.scss',             'prose'),
        scssFile('molecules/_table-of-contents.scss', 'table-of-contents'),
        scssFile('molecules/_docs-search.scss',       'docs-search'),
        scssFile('molecules/_stat-tile.scss',         'stat-tile'),
        scssFile('molecules/_copy-button.scss',       'copy-button'),
        scssFile('molecules/_confirm-dialog.scss',    'confirm-dialog'),
        scssFile('molecules/_search-form.scss',       'search-form'),
        scssFile('molecules/_input-phone-field.scss',  'input-phone-field'),
        scssFile('components/_otp-input.scss',         'otp-input'),
        scssFile('molecules/_otp-field.scss',          'otp-field'),
        scssFile('molecules/_async-select-field.scss', 'async-select-field'),
        scssFile('molecules/_async-multi-select-field.scss', 'async-multi-select-field'),
        scssFile('molecules/_chart.scss',            'chart'),
        scssFile('components/_sparkline.scss',       'sparkline'),
        scssFile('components/_star-rating.scss',     'star-rating'),
        scssFile('components/_toggle.scss',          'toggle'),
        scssFile('components/_toggle-group.scss',    'toggle-group'),
        scssFile('components/_collapsible.scss',     'collapsible'),
        scssFile('components/_scroll-area.scss',     'scroll-area'),
        scssFile('components/_slider.scss',          'slider'),
        scssFile('molecules/_tree-view.scss',        'tree-view'),
        scssFile('molecules/_annotation-thread.scss','annotation-thread'),
        scssFile('components/_text-inline.scss',     'text-inline'),
        scssFile('molecules/_uptime-bars.scss',      'uptime-bars'),
      ],
    },
    /*
     * Tokens legibles desde JS/TS: un único JSON plano con TODOS los tokens de
     * `tokens/**`, con los valores ya resueltos. Comparte `transformGroup` con
     * la plataforma css, así que cada valor es literalmente el mismo que emite
     * el `:root` generado — el JSON no es una segunda fuente que pueda
     * desincronizarse, es la misma pasada de transformación.
     *
     * Los `surface-dark-*` se filtran igual que en SCSS: se publican con el
     * nombre de su par claro, así que meterlos aquí sobrescribiría el valor
     * claro de esa misma clave. Un consumidor que necesite los dos temas
     * (el correo) los deriva de los roles semánticos `*-on-dark`, que sí son
     * tokens normales.
     */
    js: {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [
        { destination: 'tokens.json', format: 'json/css-variables', filter: (t) => !isDarkToken(t) },
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
  'modal.close-size':      '--site-shell-close-size',
  'modal.close-icon-size': '--site-shell-close-icon-size',
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

/* ---------------------------------------------------------------------------
 * Superficie oscura derivada: `.surface-dark`
 *
 * Mismo problema que la superficie pública, y misma solución. Un token de
 * componente que referencia a otro (`sheet.title-color` → `{modal.title-color}`)
 * se resuelve en `:root`: cuando `.surface-dark` remapea `--modal-title-color`,
 * `--sheet-title-color` ya trae el valor claro y no se entera. Los componentes
 * que no declaran pares `surface-dark-*` propios porque «heredan del que
 * componen» no heredaban nada.
 *
 * Este bloque lo arregla por la regla de derivación: se parte de los tokens que
 * SÍ tienen par oscuro y, por punto fijo, se vuelve a declarar todo token que
 * los referencie, con el nombre claro de su referencia — que dentro de este
 * mismo selector ya vale el valor oscuro. Un token con par `surface-dark-*`
 * propio no se toca: su valor explícito manda.
 * ------------------------------------------------------------------------- */
const DARK_PREFIX = 'surface-dark-';
const darkPairs = new Set();
for (const { path } of allTokens) {
  const last = path[path.length - 1];
  if (typeof last === 'string' && last.startsWith(DARK_PREFIX)) {
    darkPairs.add([...path.slice(0, -1), last.slice(DARK_PREFIX.length)].join('.'));
  }
}

const derivedDark = new Map();
const darkKnown = new Set(darkPairs);
for (let changed = true; changed; ) {
  changed = false;
  for (const { path, value } of allTokens) {
    const dotted = path.join('.');
    if (darkKnown.has(dotted)) continue;
    if (path.some((segment) => segment.startsWith(DARK_PREFIX))) continue;
    const ref = typeof value === 'string' && value.match(/^\{(.+)\}$/)?.[1];
    if (!ref || !darkKnown.has(ref)) continue;
    derivedDark.set(dotted, `var(${cssName(ref.split('.'))})`);
    darkKnown.add(dotted);
    changed = true;
  }
}

const darkLines = [
  '/**',
  ' * Do not edit directly, this file was auto-generated.',
  ' *',
  ' * Modo oscuro derivado: los tokens que heredan de otro token que sí tiene par',
  ' * oscuro. Se vuelven a declarar aquí porque un var() dentro de una custom',
  ' * property se resuelve en el elemento que la declara, no en el que la usa.',
  ' */',
  '',
  '.surface-dark,',
  '[data-theme="dark"],',
  'html.dark {',
  ...[...derivedDark].map(([path, value]) => `  ${cssName(path.split('.'))}: ${value};`),
  '}',
  '',
];
writeFileSync('src/tokens/surface-dark-derived.css', darkLines.join('\n'));
console.log('✔︎ src/tokens/surface-dark-derived.css');

const surfaceMap = new Map(
  Object.entries(surfaceSeeds).map(([path, target]) => [path, `var(${target})`]),
);
for (let changed = true; changed; ) {
  changed = false;
  for (const { path, value } of allTokens) {
    const dotted = path.join('.');
    if (surfaceMap.has(dotted)) continue;
    if (path[0] === 'site-shell') continue;
    // El correo no está dentro de un SiteShell ni de nada: sus tokens no salen
    // a CSS, así que arrastrarlos aquí solo deja custom properties muertas.
    if (path[0] === 'email') continue;
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

/* ---------------------------------------------------------------------------
 * Los tokens del correo, junto a sus componentes
 *
 * `src/stories/email/` no puede importar de `src/tokens/`: `tsconfig.lib.json`
 * infiere el rootDir de las declaraciones del árbol de ficheros de entrada, y
 * un import que salga de `src/stories/` lo sube a `src/`, desplazando TODAS las
 * rutas de `dist/_types` y rompiendo los `types` de cada entrada de `exports`.
 *
 * Así que los tokens del correo se copian aquí, generados: son 30 y pico, no
 * los 2.900 del sistema. De paso queda mejor de lo que quedaría el import — un
 * correo necesita los valores en píxeles absolutos y sin `var()`, y eso es
 * justo lo que sale de este fichero.
 * ------------------------------------------------------------------------- */
{
  const tokens = JSON.parse(readFileSync('src/tokens/tokens.json', 'utf-8'));
  // El sistema no toca el font-size del <html>, así que 1rem son 16px. Fuera
  // del navegador `rem` no significa nada: Outlook lo resuelve contra su propio
  // contexto y el correo sale con otro tamaño.
  const ROOT_FONT_SIZE = 16;
  const toPx = (value) => {
    const rem = value.match(/^(-?[\d.]+)rem$/);
    return rem ? `${Number(rem[1]) * ROOT_FONT_SIZE}px` : value;
  };

  // Comillas simples, como el resto del repo: hay valores que llevan comillas
  // dobles dentro (la pila de la fuente).
  const quote = (value) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

  const emailEntries = Object.entries(tokens)
    .filter(([name]) => name.startsWith('--email-'))
    .map(([name, value]) => `  ${quote(name)}: ${quote(toPx(value))},`);

  const emailLines = [
    '/*',
    ' * Do not edit directly, this file was auto-generated.',
    ' *',
    ' * Los tokens de `tokens/component/email.json`, resueltos y en píxeles',
    ' * absolutos. Un correo no puede leer una custom property (Outlook no',
    ' * resuelve `var()`) ni entiende `rem`, así que sus valores tienen que',
    ' * llegar así: como datos, listos para ir inline.',
    ' */',
    'export const emailTokens = {',
    ...emailEntries,
    '} as const;',
    '',
    'export type EmailTokenName = keyof typeof emailTokens;',
    '',
  ];
  writeFileSync('src/stories/email/emailTokens.ts', emailLines.join('\n'));
  console.log('✔︎ src/stories/email/emailTokens.ts');
}
