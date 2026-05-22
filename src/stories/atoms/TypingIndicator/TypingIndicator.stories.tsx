import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypingIndicator } from './TypingIndicator';

const meta = {
  title: 'Atoms/TypingIndicator',
  component: TypingIndicator,
  args: {
    label: 'El asistente está escribiendo…',
  },
} satisfies Meta<typeof TypingIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
