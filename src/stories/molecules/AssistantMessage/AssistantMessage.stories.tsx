import type { Meta, StoryObj } from '@storybook/react-vite';
import { AssistantMessage } from './AssistantMessage';

const meta = {
  title: 'Molecules/AssistantMessage',
  component: AssistantMessage,
  args: {
    children: 'Hola, soy tu asistente. ¿En qué puedo ayudarte hoy?',
    model: 'GPT-4o',
  },
} satisfies Meta<typeof AssistantMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTimestamp: Story = {
  args: { timestamp: '14:33' },
};

export const Streaming: Story = {
  args: { isStreaming: true, children: undefined },
};

export const WithoutModel: Story = {
  args: { model: undefined },
};
