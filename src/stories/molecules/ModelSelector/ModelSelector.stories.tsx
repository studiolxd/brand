import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModelSelector } from './ModelSelector';

const MODEL_OPTIONS = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
  { value: 'claude-sonnet', label: 'Claude Sonnet' },
  { value: 'claude-haiku', label: 'Claude Haiku' },
];

const meta = {
  title: 'Molecules/ModelSelector',
  component: ModelSelector,
  args: {
    options: MODEL_OPTIONS,
    value: 'gpt-4o',
  },
} satisfies Meta<typeof ModelSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
