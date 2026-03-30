import StyleDictionary from 'style-dictionary';
import { writeFileSync } from 'fs';

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
  form:        (t) => t.path[0] === 'form',
  text:        (t) => t.path[0] === 'text',
  control:     (t) => t.path[0] === 'control',
  input:       (t) => t.path[0] === 'input',
  button:      (t) => t.path[0] === 'button',
  textarea:    (t) => t.path[0] === 'textarea',
  checkbox:    (t) => t.path[0] === 'checkbox',
  hamburger:   (t) => t.path[0] === 'hamburger',
  header:      (t) => t.path[0] === 'header',
  label:       (t) => t.path[0] === 'label',
  link:        (t) => t.path[0] === 'link',
  tag:         (t) => t.path[0] === 'tag',
  card:        (t) => t.path[0] === 'card',
  'highlight-section': (t) => t.path[0] === 'highlight-section',
  select:      (t) => t.path[0] === 'select',
  carousel:    (t) => t.path[0] === 'carousel',
  'card-square': (t) => t.path[0] === 'card-square',
  'card-split':  (t) => t.path[0] === 'card-split',
  avatar:      (t) => t.path[0] === 'avatar',
  'input-phone': (t) => t.path[0] === 'input-phone' || t.path[0] === 'phone-input',
  arrow:         (t) => t.path[0] === 'arrow',
  chevron:       (t) => t.path[0] === 'chevron',
  'input-field':    (t) => t.path[0] === 'input-field',
  'textarea-field': (t) => t.path[0] === 'textarea-field',
  'checkbox-field':  (t) => t.path[0] === 'checkbox-field',
  'clients-section': (t) => t.path[0] === 'clients-section',
  section:           (t) => t.path[0] === 'section',
};

function cssFile(destination, filterKey) {
  return { destination, format: 'css/variables', filter: filters[filterKey], options: cssOptions };
}

function scssFile(destination, filterKey) {
  return { destination, format: 'scss/variables', filter: filters[filterKey], options: scssOptions };
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
        cssFile('global/form.css',      'form'),
        cssFile('global/section.css',   'section'),
        cssFile('components/text.css',             'text'),
        cssFile('components/control.css',          'control'),
        cssFile('components/input.css',            'input'),
        cssFile('components/button.css',           'button'),
        cssFile('components/textarea.css',         'textarea'),
        cssFile('components/checkbox.css',         'checkbox'),
        cssFile('components/hamburger.css',        'hamburger'),
        cssFile('components/header.css',           'header'),
        cssFile('components/label.css',            'label'),
        cssFile('components/link.css',             'link'),
        cssFile('components/tag.css',              'tag'),
        cssFile('components/card.css',             'card'),
        cssFile('components/highlight-section.css','highlight-section'),
        cssFile('components/select.css',           'select'),
        cssFile('components/carousel.css',         'carousel'),
        cssFile('components/card-square.css',      'card-square'),
        cssFile('components/card-split.css',       'card-split'),
        cssFile('components/avatar.css',           'avatar'),
        cssFile('components/input-phone.css',      'input-phone'),
        cssFile('components/arrow.css',            'arrow'),
        cssFile('components/chevron.css',          'chevron'),
        cssFile('molecules/input-field.css',       'input-field'),
        cssFile('molecules/textarea-field.css',    'textarea-field'),
        cssFile('molecules/checkbox-field.css',    'checkbox-field'),
        cssFile('components/clients-section.css',  'clients-section'),
      ],
    },
    scss: {
      transformGroup: 'scss',
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
        scssFile('global/_form.scss',      'form'),
        scssFile('global/_section.scss',   'section'),
        scssFile('components/_text.scss',             'text'),
        scssFile('components/_control.scss',          'control'),
        scssFile('components/_input.scss',            'input'),
        scssFile('components/_button.scss',           'button'),
        scssFile('components/_textarea.scss',         'textarea'),
        scssFile('components/_checkbox.scss',         'checkbox'),
        scssFile('components/_hamburger.scss',        'hamburger'),
        scssFile('components/_header.scss',           'header'),
        scssFile('components/_label.scss',            'label'),
        scssFile('components/_link.scss',             'link'),
        scssFile('components/_tag.scss',              'tag'),
        scssFile('components/_card.scss',             'card'),
        scssFile('components/_highlight-section.scss','highlight-section'),
        scssFile('components/_select.scss',           'select'),
        scssFile('components/_carousel.scss',         'carousel'),
        scssFile('components/_card-square.scss',      'card-square'),
        scssFile('components/_card-split.scss',       'card-split'),
        scssFile('components/_avatar.scss',           'avatar'),
        scssFile('components/_input-phone.scss',      'input-phone'),
        scssFile('components/_arrow.scss',            'arrow'),
        scssFile('components/_chevron.scss',          'chevron'),
        scssFile('molecules/_input-field.scss',       'input-field'),
        scssFile('molecules/_textarea-field.scss',    'textarea-field'),
        scssFile('molecules/_checkbox-field.scss',    'checkbox-field'),
        scssFile('components/_clients-section.scss',  'clients-section'),
      ],
    },
  },
});

await sd.buildAllPlatforms();

// Genera el entrypoint legacy (@import) para consumidores que no soportan @use/@forward
const scssDestinations = sd.options.platforms.scss.files.map((f) => f.destination);
const toImportPath = (dest) =>
  dest.replace(/(?:^|\/)_([^/]+)\.scss$/, (_, name) => `/${name}`).replace(/^\//, '');
const legacyLines = [
  '// Do not edit directly, this file was auto-generated.',
  '// Legacy entrypoint — usa @import para compiladores que no soportan @use/@forward.',
  '',
  ...scssDestinations.map((dest) => `@import '${toImportPath(dest)}';`),
  '',
];
writeFileSync('src/tokens/scss/_index.legacy.scss', legacyLines.join('\n'));
console.log('✔︎ src/tokens/scss/_index.legacy.scss');
