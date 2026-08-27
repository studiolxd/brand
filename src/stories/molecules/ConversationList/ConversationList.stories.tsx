import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConversationList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {};

export const SinConversaciones: Story = {
  name: 'Sin conversaciones',
  args: { conversations: [], activeId: undefined },
};

export const Internacionalizado: Story = {
  args: {
    newLabel: 'New conversation',
    navLabel: 'Conversations',
    deleteLabel: (label) => `Delete conversation "${label}"`,
  },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
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
      <div style={{ width: '260px' }}>
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

/** Test: el aspa de borrar está en el orden de tabulación y se ve al recibir el foco. */
export const ContratoTeclado: Story = {
  name: 'Test — el aspa se alcanza con el tabulador',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.tab(); // Nueva conversación
    await userEvent.tab(); // título de la primera
    await userEvent.tab(); // su aspa

    const aspa = canvas.getByRole('button', { name: 'Eliminar conversación "Autenticación JWT"' });
    await expect(aspa).toHaveFocus();
    // Y se ve: sin esto el foco caía en un botón invisible.
    await expect(getComputedStyle(aspa).opacity).toBe('1');
  },
};

/** Test: la conversación abierta se dice con tinta y peso, no con un fondo. */
export const ContratoActiva: Story = {
  name: 'Test — la conversación abierta no lleva fondo',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const activa = canvas.getByRole('button', { name: 'Autenticación JWT' });
    const otra = canvas.getByRole('button', { name: 'Revisión de pull request' });

    await expect(activa).toHaveAttribute('aria-current', 'page');
    await expect(getComputedStyle(activa).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(getComputedStyle(activa.parentElement as HTMLElement).backgroundColor)
      .toBe('rgba(0, 0, 0, 0)');
    // Se distingue por peso y tinta.
    await expect(getComputedStyle(activa).fontWeight)
      .not.toBe(getComputedStyle(otra).fontWeight);
    await expect(getComputedStyle(activa).color)
      .not.toBe(getComputedStyle(otra).color);
  },
};
