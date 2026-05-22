import type { Meta, StoryObj } from '@storybook/react-vite';
import { UserMessage } from './UserMessage';

const meta = {
  title: 'Molecules/UserMessage',
  component: UserMessage,
  args: {
    children: 'Necesito ayuda con mi proyecto.',
  },
} satisfies Meta<typeof UserMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTimestamp: Story = {
  args: { timestamp: '14:32' },
};
