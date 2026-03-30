import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClientsSection } from './ClientsSection';
import { clients } from '../../data/home';

const meta: Meta<typeof ClientsSection> = {
  title: 'Sections/ClientsSection',
  component: ClientsSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ClientsSection>;

export const Default: Story = {
  args: {
    title: 'Hemos trabajado junto a...',
    clients,
  },
};
