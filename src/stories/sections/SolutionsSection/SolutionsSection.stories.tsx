import type { Meta, StoryObj } from '@storybook/react-vite';
import { SolutionsSection } from './SolutionsSection';
import { solutionItems } from '../../data/home';

const meta: Meta<typeof SolutionsSection> = {
  title: 'Sections/SolutionsSection',
  component: SolutionsSection,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SolutionsSection>;

export const Default: Story = {
  args: {
    items: solutionItems,
  },
};
