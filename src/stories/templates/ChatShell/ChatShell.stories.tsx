import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ChatShell } from './ChatShell';
import { ConversationList } from '../../molecules/ConversationList/ConversationList';
import type { ConversationItem } from '../../molecules/ConversationList/ConversationList';
import { ConversationThread } from '../../organisms/ConversationThread/ConversationThread';
import type { ConversationMessage } from '../../organisms/ConversationThread/ConversationThread';
import { MessageComposer } from '../../molecules/MessageComposer/MessageComposer';
import { Heading } from '../../atoms/Heading/Heading';
import { SelectField } from '../../molecules/SelectField/SelectField';

const MODELOS = [
  { value: 'opus', label: 'Claude Opus 5' },
  { value: 'sonnet', label: 'Claude Sonnet 5' },
  { value: 'haiku', label: 'Claude Haiku 4.5' },
];

const CONVERSACIONES: ConversationItem[] = [
  { id: 'c1', label: 'Autenticación JWT' },
  { id: 'c2', label: 'Diseño de base de datos' },
  { id: 'c3', label: 'Configurar CI/CD con GitHub Actions' },
  { id: 'c4', label: 'Revisión de pull request' },
  { id: 'c5', label: 'Optimización de consultas SQL' },
];

const MENSAJES: ConversationMessage[] = [
  {
    id: '1',
    role: 'user',
    content: '¿Puedes explicarme cómo funciona la autenticación con JWT?',
    timestamp: new Date('2026-08-27T10:14:00Z'),
  },
  {
    id: '2',
    role: 'assistant',
    model: 'Claude Opus 5',
    content:
      'JWT es un estándar para transmitir información firmada entre dos partes. Tiene tres piezas separadas por puntos: la cabecera (algoritmo y tipo), la carga (los datos, como el identificador de usuario o la caducidad) y la firma.',
    timestamp: new Date('2026-08-27T10:14:00Z'),
  },
  {
    id: '3',
    role: 'user',
    content: '¿Y cuál es la diferencia entre el token de acceso y el de refresco?',
    timestamp: new Date('2026-08-27T10:17:00Z'),
  },
  {
    id: '4',
    role: 'assistant',
    model: 'Claude Opus 5',
    content:
      'El de acceso vive poco (5–15 minutos) y viaja en cada petición. El de refresco dura días y solo sirve para pedir uno de acceso nuevo cuando el anterior caduca. Si interceptan el de acceso, el daño está acotado en el tiempo.',
    timestamp: new Date('2026-08-27T10:17:00Z'),
  },
];

const meta = {
  title: 'Templates/ChatShell',
  component: ChatShell,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChatShell>;

export default meta;
type Story = StoryObj<typeof meta>;

/** El armazón con sus tres zonas y contenido estático: solo maqueta. */
export const PorDefecto: Story = {
  args: {
    listLabel: 'Conversaciones',
    list: (
      <ConversationList
        conversations={CONVERSACIONES}
        activeId="c1"
        onNew={() => {}}
        onSelect={() => {}}
        onDelete={() => {}}
      />
    ),
    header: <Heading level={2} size={6}>Autenticación JWT</Heading>,
    children: <ConversationThread messages={MENSAJES} />,
    composer: (
      <MessageComposer value="" onChange={() => {}} onSend={() => {}} inputLabel="Mensaje" />
    ),
  },
};

/** Sin `list`, el armazón es hilo y composer: la columna vive en el `Sidebar` del `AppShell`. */
export const SinColumna: Story = {
  name: 'Sin columna de conversaciones',
  args: {
    header: <Heading level={2} size={6}>Autenticación JWT</Heading>,
    children: <ConversationThread messages={MENSAJES} />,
    composer: (
      <MessageComposer value="" onChange={() => {}} onSend={() => {}} inputLabel="Mensaje" />
    ),
  },
};

/** Sin cabecera ni columna: el chat mínimo, un hilo y una caja de escribir. */
export const Minimo: Story = {
  name: 'Mínimo',
  args: {
    children: <ConversationThread messages={MENSAJES} />,
    composer: (
      <MessageComposer value="" onChange={() => {}} onSend={() => {}} inputLabel="Mensaje" />
    ),
  },
};

/**
 * Por debajo de `--breakpoint-lg` la lista no se encoge ni se convierte en una
 * tira: se pliega a un cajón (`Sheet`) que abre el botón de la cabecera. Es el
 * mismo control, con el mismo nombre accesible, esté donde esté.
 */
export const CajonDeConversaciones: Story = {
  name: 'Cajón en pantalla estrecha',
  globals: { viewport: { value: 'mobile1' } },
  args: PorDefecto.args,
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: PorDefecto.args,
};

/**
 * La pantalla entera funcionando: abrir conversaciones, borrarlas, escribir y
 * recibir respuesta. El estado lo lleva la story, que es el papel del producto;
 * el armazón solo coloca.
 */
export const Integracion: Story = {
  name: 'Integración',
  args: { children: null },
  render: () => {
    const [conversaciones, setConversaciones] = useState(CONVERSACIONES);
    const [activeId, setActiveId] = useState('c1');
    const [mensajes, setMensajes] = useState(MENSAJES);
    const [borrador, setBorrador] = useState('');
    const [generando, setGenerando] = useState(false);
    const [modelo, setModelo] = useState('opus');
    const [listaAbierta, setListaAbierta] = useState(false);

    const modeloLabel = MODELOS.find((m) => m.value === modelo)?.label;
    const titulo = conversaciones.find((c) => c.id === activeId)?.label ?? 'Nueva conversación';

    function nueva() {
      const id = `c${conversaciones.length + 1}-${activeId}`;
      setConversaciones((prev) => [{ id, label: 'Nueva conversación' }, ...prev]);
      setActiveId(id);
      setMensajes([]);
      setListaAbierta(false);
    }

    function abrir(id: string) {
      setActiveId(id);
      setMensajes(id === 'c1' ? MENSAJES : []);
      // En pantalla estrecha la lista es un cajón: abrir una conversación lo
      // cierra. El armazón avisa por `onListOpenChange`; cerrarlo es del
      // producto, que es quien sabe que la navegación ha terminado.
      setListaAbierta(false);
    }

    function borrar(id: string) {
      setConversaciones((prev) => {
        const resto = prev.filter((c) => c.id !== id);
        if (id === activeId) {
          setActiveId(resto[0]?.id ?? '');
          setMensajes([]);
        }
        return resto;
      });
    }

    function enviar() {
      const ahora = new Date();
      const enCurso = `a-${mensajes.length}`;
      setMensajes((prev) => [
        ...prev,
        { id: `u-${prev.length}`, role: 'user', content: borrador, timestamp: ahora },
        { id: enCurso, role: 'assistant', model: modeloLabel, isStreaming: true },
      ]);
      setBorrador('');
      setGenerando(true);

      setTimeout(() => {
        setMensajes((prev) =>
          prev.map((m) =>
            m.id === enCurso
              ? {
                  id: enCurso,
                  role: 'assistant',
                  model: modeloLabel,
                  content:
                    'Esta es una respuesta simulada. En una integración real aquí llegaría lo que genere el modelo.',
                  timestamp: new Date(),
                }
              : m,
          ),
        );
        setGenerando(false);
      }, 1500);
    }

    return (
      <ChatShell
        listOpen={listaAbierta}
        onListOpenChange={setListaAbierta}
        list={
          <ConversationList
            conversations={conversaciones}
            activeId={activeId}
            onNew={nueva}
            onSelect={abrir}
            onDelete={borrar}
          />
        }
        header={
          <>
            <Heading level={2} size={6}>{titulo}</Heading>
            <SelectField
              id="modelo"
              label="Modelo"
              labelHidden
              options={MODELOS}
              value={modelo}
              onValueChange={setModelo}
            />
          </>
        }
        composer={
          <MessageComposer
            value={borrador}
            onChange={setBorrador}
            onSend={enviar}
            disabled={generando}
            inputLabel="Mensaje"
          />
        }
      >
        <ConversationThread
          messages={mensajes}
          streamingLabel="El asistente está escribiendo"
        />
      </ChatShell>
    );
  },
};

/** Test: las tres zonas están, y el scroll vive en el hilo, no en el armazón. */
export const ContratoZonas: Story = {
  name: 'Test — el scroll vive en el hilo',
  tags: ['!dev'],
  args: PorDefecto.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('complementary', { name: 'Conversaciones' })).toBeInTheDocument();
    await expect(canvas.getByRole('log', { name: 'Conversación' })).toBeInTheDocument();
    await expect(canvas.getByRole('textbox', { name: 'Mensaje' })).toBeInTheDocument();

    const armazon = canvasElement.querySelector('.chat-shell') as HTMLElement;
    const zonaHilo = canvasElement.querySelector('.chat-shell__thread') as HTMLElement;
    await expect(getComputedStyle(armazon).overflowY).not.toBe('auto');
    await expect(getComputedStyle(zonaHilo).overflowY).toBe('auto');
  },
};
