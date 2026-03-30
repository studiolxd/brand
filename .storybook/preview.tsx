import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/index.css'
import './preview.css'
import studiolxdTheme from './studiolxdTheme'

const withDarkBackground: Decorator = (Story, context) => {
  const isDark = context.globals.backgrounds?.value === 'dark';
  if (!isDark) return <Story />;
  return (
    <div className="surface-dark" style={{ background: 'var(--color-background-dark)', minHeight: '100%' }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withDarkBackground],
  initialGlobals: {
    backgrounds: { value: '#ffffff' },
  },
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'Light',  value: '#ffffff' },
        dark:  { name: 'Dark', value: '#111e30' },
      },
    },
    docs: {
      theme: studiolxdTheme,
      toc: {
        headingSelector: 'h2, h3',
        ignoreSelector: '#primary',
        title: 'Contenido',
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: ['Foundations', 'Atoms', 'Molecules', 'Organisms', 'Sections', 'Templates', 'Pages'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
