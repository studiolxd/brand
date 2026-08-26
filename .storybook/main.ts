import type { StorybookConfig } from '@storybook/react-vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    // "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    {
      // Sin remark-gfm, MDX no parsea las tablas con pipes: se renderizan como
      // un párrafo corrido. La documentación del DS las usa a mano en 14
      // ficheros (anchos, escalas, matrices de props), aparte de las que pintan
      // TokenTable y ArgTypes como componentes.
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: { remarkPlugins: [remarkGfm] },
        },
      },
    },
    "@storybook/addon-mcp",
    "storybook-addon-pseudo-states"
  ],
  "framework": "@storybook/react-vite"
};
export default config;