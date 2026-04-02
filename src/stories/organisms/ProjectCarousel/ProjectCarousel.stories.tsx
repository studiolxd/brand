import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCarousel } from './ProjectCarousel';
import { projects } from '../../data/home';

const meta: Meta<typeof ProjectCarousel> = {
  title: 'Organisms/ProjectCarousel',
  component: ProjectCarousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCarousel>;

export const Default: Story = {
  args: {
    projects,
  },
};
