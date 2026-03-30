import StyleDictionary from 'style-dictionary';

const fileOptions = { selector: ':root', outputReferences: true };

const sd = new StyleDictionary({
  usesDtcg: true,
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/',
      files: [
        {
          destination: 'colors.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'color',
          options: fileOptions,
        },
        {
          destination: 'breakpoint.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'breakpoint',
          options: fileOptions,
        },
        {
          destination: 'typography.css',
          format: 'css/variables',
          filter: (token) => ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing'].includes(token.path[0]),
          options: fileOptions,
        },
        {
          destination: 'spacing.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'spacing',
          options: fileOptions,
        },
        {
          destination: 'border.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'border-radius' || token.path[0] === 'border-width',
          options: fileOptions,
        },
        {
          destination: 'shadow.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'shadow',
          options: fileOptions,
        },
        {
          destination: 'size.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'size-component' || token.path[0] === 'content',
          options: fileOptions,
        },
        {
          destination: 'motion.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'motion',
          options: fileOptions,
        },
        {
          destination: 'opacity.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'opacity',
          options: fileOptions,
        },
        {
          destination: 'components/text.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'text',
          options: fileOptions,
        },
        {
          destination: 'components/control.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'control',
          options: fileOptions,
        },
        {
          destination: 'components/input.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'input',
          options: fileOptions,
        },
        {
          destination: 'components/button.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'button',
          options: fileOptions,
        },
        {
          destination: 'components/textarea.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'textarea',
          options: fileOptions,
        },
        {
          destination: 'components/checkbox.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'checkbox',
          options: fileOptions,
        },
        {
          destination: 'components/hamburger.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'hamburger',
          options: fileOptions,
        },
        {
          destination: 'components/header.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'header',
          options: fileOptions,
        },
        {
          destination: 'components/label.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'label',
          options: fileOptions,
        },
        {
          destination: 'components/link.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'link',
          options: fileOptions,
        },
        {
          destination: 'form.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'form',
          options: fileOptions,
        },
        {
          destination: 'molecules/input-field.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'input-field',
          options: fileOptions,
        },
        {
          destination: 'molecules/textarea-field.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'textarea-field',
          options: fileOptions,
        },
        {
          destination: 'molecules/checkbox-field.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'checkbox-field',
          options: fileOptions,
        },
        {
          destination: 'components/tag.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'tag',
          options: fileOptions,
        },
        {
          destination: 'components/card.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'card',
          options: fileOptions,
        },
        {
          destination: 'components/highlight-section.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'highlight-section',
          options: fileOptions,
        },
        {
          destination: 'components/select.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'select',
          options: fileOptions,
        },
        {
          destination: 'components/carousel.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'carousel',
          options: fileOptions,
        },
        {
          destination: 'components/card-square.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'card-square',
          options: fileOptions,
        },
        {
          destination: 'components/card-split.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'card-split',
          options: fileOptions,
        },
        {
          destination: 'components/avatar.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'avatar',
          options: fileOptions,
        },
        {
          destination: 'components/input-phone.css',
          format: 'css/variables',
          filter: (token) => token.path[0] === 'input-phone',
          options: fileOptions,
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
