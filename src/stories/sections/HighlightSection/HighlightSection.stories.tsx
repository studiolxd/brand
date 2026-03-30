import type { Meta, StoryObj } from '@storybook/react-vite';
import { HighlightSection } from './HighlightSection';

const meta: Meta<typeof HighlightSection> = {
  title: 'Sections/HighlightSection',
  component: HighlightSection,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    textAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
  args: {
    text: 'Fórmate en la academia de Studio LXD. Aprende sobre diseño instruccional y herramientas para crear contenidos elearning con nuestros cursos.',
    align: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof HighlightSection>;

export const Default: Story = {};

export const Dark: Story = {
  decorators: [
    (Story) => <div className="dark"><Story /></div>,
  ],
};
