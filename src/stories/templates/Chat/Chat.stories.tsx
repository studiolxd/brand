import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from '../../sections/AppShell/AppShell';
import { Sidebar } from '../../sections/Sidebar/Sidebar';
import { Logo } from '../../atoms/Logo/Logo';
import { UserMenu } from '../../molecules/UserMenu/UserMenu';
import { SelectField } from '../../molecules/SelectField/SelectField';
import { ConversationList } from '../../molecules/ConversationList/ConversationList';
import type { ConversationItem } from '../../molecules/ConversationList/ConversationList';
import { ConversationThread } from '../../organisms/ConversationThread/ConversationThread';
import { MessageComposer } from '../../molecules/MessageComposer/MessageComposer';
import type { ConversationMessage } from '../../organisms/ConversationThread/ConversationThread';

const meta: Meta = {
  title: 'Templates/Chat',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

const modelOptions = [
  { value: 'claude-opus', label: 'Claude Opus 4' },
  { value: 'claude-sonnet', label: 'Claude Sonnet 4' },
  { value: 'claude-haiku', label: 'Claude Haiku 4' },
];

const userMenuItems = [
  { type: 'button' as const, label: 'Configuración', onClick: () => {} },
  { type: 'separator' as const },
  { type: 'button' as const, label: 'Cerrar sesión', onClick: () => {}, destructive: true },
];

const INITIAL_MESSAGES: ConversationMessage[] = [
  {
    id: '1',
    role: 'user',
    content: '¿Puedes explicarme cómo funciona la autenticación con JWT?',
    timestamp: '10:14',
  },
  {
    id: '2',
    role: 'assistant',
    model: 'Claude Sonnet 4',
    content:
      'JWT (JSON Web Token) es un estándar para transmitir información de forma segura entre partes como un objeto JSON. Tiene tres partes separadas por puntos: el header (algoritmo y tipo), el payload (los claims, como el userId o la expiración) y la firma.\n\nEl flujo típico es: el usuario se autentica, el servidor genera un JWT firmado con una clave secreta y lo devuelve al cliente. El cliente lo almacena (normalmente en memoria o en una cookie httpOnly) y lo envía en cada request en el header Authorization: Bearer <token>. El servidor verifica la firma sin necesidad de consultar la base de datos.',
    timestamp: '10:14',
  },
  {
    id: '3',
    role: 'user',
    content: '¿Y cuál es la diferencia entre access token y refresh token?',
    timestamp: '10:17',
  },
  {
    id: '4',
    role: 'assistant',
    model: 'Claude Sonnet 4',
    content:
      'El access token tiene vida corta (5–15 minutos) y es el que se envía en cada request. El refresh token dura mucho más (días o semanas) y solo se usa para pedir un nuevo access token cuando el anterior expira. Así, si un access token es interceptado, el daño está acotado en el tiempo.',
    timestamp: '10:17',
  },
];

const INITIAL_CHATS: ConversationItem[] = [
  { id: 'c1', label: 'Autenticación JWT' },
  { id: 'c2', label: 'Diseño de base de datos' },
  { id: 'c3', label: 'Configurar CI/CD con GitHub Actions' },
  { id: 'c4', label: 'Revisión de pull request' },
  { id: 'c5', label: 'Optimización de consultas SQL' },
];

interface ChatSidebarProps {
  conversations: ConversationItem[];
  activeId: string;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

function ChatSidebar({ conversations, activeId, onNew, onSelect, onDelete }: ChatSidebarProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBlock: 'var(--spacing-3)' }}>
        <ConversationList
          conversations={conversations}
          activeId={activeId}
          onNew={onNew}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      </div>

      <div style={{ borderBlockStart: '1px solid var(--sidebar-border-color, var(--color-border-subtle))', paddingBlockStart: 'var(--spacing-1)' }}>
        <UserMenu
          name="Ana García"
          email="ana.garcia@studiolxd.com"
          items={userMenuItems}
        />
      </div>
    </div>
  );
}

interface ChatMainProps {
  messages: ConversationMessage[];
  onSend: (text: string) => void;
  isStreaming?: boolean;
  model: string;
  onModelChange: (value: string) => void;
}

function ChatMain({ messages, onSend, isStreaming, model, onModelChange }: ChatMainProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBlock: 'var(--spacing-3)',
          paddingInline: 'var(--spacing-6)',
          borderBlockEnd: '1px solid var(--color-border-subtle)',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 'var(--font-size-body)', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Autenticación JWT
        </span>
        <SelectField
          id="model-selector"
          label="Modelo"
          labelHidden
          options={modelOptions}
          value={model}
          onValueChange={onModelChange}
        />
      </header>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        <ConversationThread
          messages={messages}
          streamingLabel="El asistente está escribiendo"
        />
      </div>

      <div
        style={{
          flexShrink: 0,
          paddingBlock: 'var(--spacing-4)',
          paddingInline: 'var(--spacing-6)',
          borderBlockStart: '1px solid var(--color-border-subtle)',
        }}
      >
          <MessageComposer onSend={onSend} disabled={isStreaming} />
      </div>
    </div>
  );
}

function useChatState(initialMessages: ConversationMessage[]) {
  const [conversations, setConversations] = useState<ConversationItem[]>(INITIAL_CHATS);
  const [activeId, setActiveId] = useState('c1');
  const [messages, setMessages] = useState<ConversationMessage[]>(initialMessages);
  const [isStreaming, setIsStreaming] = useState(false);
  const [model, setModel] = useState('claude-sonnet');

  function handleNew() {
    const id = `c${Date.now()}`;
    setConversations((prev) => [{ id, label: 'Nueva conversación' }, ...prev]);
    setActiveId(id);
    setMessages([]);
  }

  function handleSelect(id: string) {
    setActiveId(id);
    setMessages([]);
  }

  function handleDelete(id: string) {
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (activeId === id) {
        setActiveId(next[0]?.id ?? '');
        setMessages([]);
      }
      return next;
    });
  }

  function handleSend(text: string) {
    const modelLabel = modelOptions.find((o) => o.value === model)?.label;
    const userMsg: ConversationMessage = {
      id: String(Date.now()),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
    };
    const streamingId = String(Date.now() + 1);
    const streamingMsg: ConversationMessage = { id: streamingId, role: 'assistant', model: modelLabel, isStreaming: true };

    setMessages((prev) => [...prev, userMsg, streamingMsg]);
    setIsStreaming(true);

    setTimeout(() => {
      const reply: ConversationMessage = {
        id: streamingId,
        role: 'assistant',
        model: modelLabel,
        content: 'Esta es una respuesta simulada del asistente. En una integración real, aquí llegaría el contenido generado por el modelo.',
        timestamp: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => prev.map((m) => (m.id === streamingId ? reply : m)));
      setIsStreaming(false);
    }, 2000);
  }

  return { conversations, activeId, messages, isStreaming, model, setModel, handleNew, handleSelect, handleDelete, handleSend };
}

export const Default: Story = {
  render: () => {
    const { conversations, activeId, messages, isStreaming, model, setModel, handleNew, handleSelect, handleDelete, handleSend } = useChatState(INITIAL_MESSAGES);

    return (
      <AppShell sidebar={
        <Sidebar logo={<Logo height={24} />}>
          <ChatSidebar
            conversations={conversations}
            activeId={activeId}
            onNew={handleNew}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </Sidebar>
      }>
        <ChatMain messages={messages} onSend={handleSend} isStreaming={isStreaming} model={model} onModelChange={setModel} />
      </AppShell>
    );
  },
};

export const Vacia: Story = {
  render: () => {
    const { conversations, activeId, messages, isStreaming, model, setModel, handleNew, handleSelect, handleDelete, handleSend } = useChatState([]);

    return (
      <AppShell sidebar={
        <Sidebar logo={<Logo height={24} />}>
          <ChatSidebar
            conversations={conversations}
            activeId={activeId}
            onNew={handleNew}
            onSelect={handleSelect}
            onDelete={handleDelete}
          />
        </Sidebar>
      }>
        <ChatMain messages={messages} onSend={handleSend} isStreaming={isStreaming} model={model} onModelChange={setModel} />
      </AppShell>
    );
  },
};
