import type { Meta, StoryObj } from '@storybook/react-vite';
import { Content } from './Content';

const meta: Meta<typeof Content> = {
  title: 'Templates/Content',
  component: Content,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Default: Story = {
  args: {
    title: 'Contenidos elearning',
    description: 'Descubre nuestra colección de recursos y materiales para el aprendizaje digital.',
  },
};
