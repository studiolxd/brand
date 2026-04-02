import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectGrid } from './ProjectGrid';
import { projects } from '../../data/home';

const meta: Meta<typeof ProjectGrid> = {
  title: 'Organisms/ProjectGrid',
  component: ProjectGrid,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ProjectGrid>;

export const Default: Story = {
  args: {
    projects,
  },
};

export const WithoutTags: Story = {
  args: {
    projects,
    hideTags: true,
  },
};
