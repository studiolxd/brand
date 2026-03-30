import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewsSection } from './ReviewsSection';
import { reviews } from '../../data/home';

const meta: Meta<typeof ReviewsSection> = {
  title: 'Sections/ReviewsSection',
  component: ReviewsSection,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ReviewsSection>;

export const Default: Story = {
  args: {
    title: 'Lo que dice nuestro alumnado',
    reviews,
  },
};
