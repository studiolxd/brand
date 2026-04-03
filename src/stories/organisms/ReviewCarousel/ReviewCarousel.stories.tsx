import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewCarousel } from './ReviewCarousel';
import { reviews } from '../../data/home';

const meta: Meta<typeof ReviewCarousel> = {
  title: 'Organisms/ReviewCarousel',
  component: ReviewCarousel,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-dark" style={{ background: 'var(--color-background-dark)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewCarousel>;

export const Default: Story = {
  args: {
    reviews,
  },
};
