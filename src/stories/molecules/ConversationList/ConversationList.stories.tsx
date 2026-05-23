import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ConversationList } from './ConversationList';
import type { ConversationItem } from './ConversationList';

const SAMPLE: ConversationItem[] = [
  { id: 'c1', label: 'Autenticación JWT' },
  { id: 'c2', label: 'Diseño de base de datos relacional' },
  { id: 'c3', label: 'Configurar CI/CD con GitHub Actions' },
  { id: 'c4', label: 'Revisión de pull request' },
  { id: 'c5', label: 'Optimización de consultas SQL muy largas que desbordan el contenedor' },
];

const meta = {
  title: 'Molecules/ConversationList',
  component: ConversationList,
  args: {
    conversations: SAMPLE,
    activeId: 'c1',
    onNew: fn(),
    onSelect: fn(),
    onDelete: fn(),
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '240px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SinConversaciones: Story = {
  args: { conversations: [], activeId: undefined },
};

export const Interactivo: Story = {
  render: (args) => {
    const [conversations, setConversations] = useState(SAMPLE);
    const [activeId, setActiveId] = useState('c1');
    let counter = conversations.length + 1;

    function handleNew() {
      const id = `c${++counter}`;
      setConversations((prev) => [{ id, label: `Nueva conversación ${counter}` }, ...prev]);
      setActiveId(id);
    }

    function handleDelete(id: string) {
      setConversations((prev) => prev.filter((c) => c.id !== id));
      setActiveId((prev) => (prev === id ? conversations.find((c) => c.id !== id)?.id ?? '' : prev));
    }

    return (
      <div style={{ width: '240px' }}>
        <ConversationList
          {...args}
          conversations={conversations}
          activeId={activeId}
          onNew={handleNew}
          onSelect={setActiveId}
          onDelete={handleDelete}
        />
      </div>
    );
  },
};
