import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProjectCard } from './ProjectCard';

const meta: Meta<typeof ProjectCard> = {
  title: 'Molecules/ProjectCard',
  component: ProjectCard,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: {
      id: 'onboarding-randstad',
      category: 'E-learning',
      tagVariant: 'secondary',
      photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&fit=crop',
      title: 'Onboarding digital para Randstad',
      description: 'Diseñamos un itinerario de incorporación 100% online para 1.200 nuevos empleados al año.',
      href: '#',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
};
