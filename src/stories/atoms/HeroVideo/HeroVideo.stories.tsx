import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroVideo } from './HeroVideo';

const meta: Meta<typeof HeroVideo> = {
  title: 'Atoms/HeroVideo',
  component: HeroVideo,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeroVideo>;

export const Default: Story = {
  args: {
    landscape: {
      mp4: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    portrait: {
      mp4: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  },
};
