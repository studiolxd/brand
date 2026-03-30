import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectsSection } from './ProjectsSection';
import { projects } from '../../data/home';

const meta: Meta<typeof ProjectsSection> = {
  title: 'Sections/ProjectsSection',
  component: ProjectsSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ProjectsSection>;

export const Default: Story = {
  args: {
    title: 'Proyectos',
    projects,
  },
};
