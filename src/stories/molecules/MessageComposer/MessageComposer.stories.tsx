import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageComposer } from './MessageComposer';

const meta = {
  title: 'Molecules/MessageComposer',
  component: MessageComposer,
  args: {
    onSend: (message: string) => console.log('Enviado:', message),
    placeholder: 'Escribe un mensaje…',
  },
} satisfies Meta<typeof MessageComposer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};
