import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ChatShell } from './ChatShell';
import { ConversationList } from '../../molecules/ConversationList/ConversationList';
import type { ConversationItem } from '../../molecules/ConversationList/ConversationList';
import { ConversationThread } from '../../organisms/ConversationThread/ConversationThread';
import type { ConversationMessage } from '../../organisms/ConversationThread/ConversationThread';
import { MessageComposer } from '../../molecules/MessageComposer/MessageComposer';
import { EmptyState } from '../../molecules/EmptyState/EmptyState';
import { Heading } from '../../atoms/Heading/Heading';
import { SelectField } from '../../molecules/SelectField/SelectField';
import { STORY_TODAY } from '../../utils/storyDate';

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

/**
 * La conversación recién abierta, sin mensajes: la pantalla mete un bloque en
 * el hilo en lugar de los globos y el hilo lo **centra** en el alto
 * disponible. Ver **Organisms › ConversationThread → «La conversación sin
 * mensajes»**.
 */
export const ConversacionVacia: Story = {
  name: 'Conversación sin mensajes',
  args: {
    ...PorDefecto.args,
    children: (
      <ConversationThread messages={[]}>
        <EmptyState
          title="Empieza la conversación"
          description="Escribe abajo para preguntar lo que necesites."
        />
      </ConversationThread>
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

/**
 * El mismo cajón, ya desplegado. Es lo que se ve al tocar el botón: la lista
 * ocupa el ancho del armazón, el chat queda detrás del velo y el disparador
 * **no se mueve** —ni de tamaño ni de sitio—, porque el cajón repite la fila
 * de cabecera del armazón y anula el relleno propio del `Sheet`. Vuelve a
 * tocarlo para plegarla: es el mismo control, el mismo glifo y el mismo punto
 * de la pantalla.
 *
 * El armazón va aquí con aire alrededor, que es como lo monta una aplicación:
 * el cajón se mide contra el armazón, no contra la ventana, así que la
 * coincidencia se mantiene con o sin relleno de quien compone.
 *
 * El anillo que rodea al glifo es el **foco**: la story arranca con el cajón
 * ya abierto y el diálogo lleva el foco a su primer control. Abriéndolo con el
 * dedo o el ratón no aparece — se ve tocando el botón dos veces.
 */
export const CajonAbierto: Story = {
  name: 'Cajón desplegado en pantalla estrecha',
  globals: { viewport: { value: 'mobile1' } },
  args: PorDefecto.args,
  render: (args) => {
    const [abierto, setAbierto] = useState(true);
    return (
      <div style={{ blockSize: '100%', padding: '24px' }}>
        <ChatShell {...args} listOpen={abierto} onListOpenChange={setAbierto} />
      </div>
    );
  },
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
      const ahora = STORY_TODAY;
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
                  timestamp: STORY_TODAY,
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

/**
 * Test: el armazón no se rellena ni se raya — ninguna de sus tres zonas pone
 * padding y no queda ninguna línea interior. Lo único que espacia es el `gap`
 * entre las dos columnas.
 */
export const ContratoSinRelleno: Story = {
  name: 'Test — ni rellenos ni líneas',
  tags: ['!dev'],
  args: PorDefecto.args,
  play: async ({ canvasElement }) => {
    const zona = (clase: string) => canvasElement.querySelector(clase) as HTMLElement;

    for (const clase of ['.chat-shell__list', '.chat-shell__header', '.chat-shell__composer']) {
      const estilo = getComputedStyle(zona(clase));
      await expect(`${clase} ${estilo.paddingBlockStart} ${estilo.paddingBlockEnd}`).toBe(`${clase} 0px 0px`);
      await expect(`${clase} ${estilo.paddingInlineStart} ${estilo.paddingInlineEnd}`).toBe(`${clase} 0px 0px`);
    }
    // El hilo ya no entra aquí: desde el 2026-09-14 lleva relleno lateral a
    // propósito —es donde cabe la cola del globo sin cortarse— y el vertical
    // lo pone la ranura. Ese contrato lo mide «el aire de la ranura del hilo».

    // Ninguna línea interior: la del composer era la última y se retiró.
    const composer = getComputedStyle(zona('.chat-shell__composer'));
    await expect(composer.borderBlockStartWidth).toBe('0px');

    // Y lo que separa la columna del hilo es el aire del contenedor.
    const armazon = getComputedStyle(zona('.chat-shell'));
    await expect(parseFloat(armazon.columnGap)).toBeGreaterThan(0);
  },
};

/**
 * Test: el aire de la ranura del hilo. Arriba y abajo lo pone el envoltorio,
 * así que el primer globo no arranca pegado a la cabecera ni el último a la
 * caja de escribir; a los lados va por dentro del desplazamiento, que es el
 * único sitio donde la cola del globo —que nace fuera de su caja— cabe sin
 * cortarse.
 */
export const ContratoPasillo: Story = {
  name: 'Test — el aire de la ranura del hilo',
  tags: ['!dev'],
  args: { ...PorDefecto.args },
  play: async ({ canvasElement }) => {
    const ranura = canvasElement.querySelector('.chat-shell__thread') as HTMLElement;
    const hilo = canvasElement.querySelector('.conversation-thread') as HTMLElement;
    const entrante = canvasElement.querySelector('.message-bubble--assistant') as HTMLElement;
    const saliente = canvasElement.querySelector('.message-bubble--user') as HTMLElement;

    // El aire vertical va fuera del desplazamiento: es de la ranura.
    const ranuraEstilo = getComputedStyle(ranura);
    expect(parseFloat(ranuraEstilo.paddingBlockStart)).toBeGreaterThan(0);
    expect(parseFloat(ranuraEstilo.paddingBlockEnd)).toBeGreaterThan(0);

    // El horizontal va dentro, en el elemento que recorta.
    const cola = parseFloat(getComputedStyle(entrante).getPropertyValue('--message-bubble-tail-size'));
    const pasillo = parseFloat(getComputedStyle(hilo).paddingInlineStart);
    expect(pasillo).toBeGreaterThanOrEqual(cola);
    expect(parseFloat(getComputedStyle(hilo).paddingInlineEnd)).toBeGreaterThanOrEqual(cola);

    // Y con él, los dos picos caben: el del globo entrante por el lado de
    // inicio y el del saliente por el de fin, dentro de la caja del hilo.
    const caja = hilo.getBoundingClientRect();
    expect(entrante.getBoundingClientRect().left - caja.left).toBeGreaterThanOrEqual(cola);
    expect(caja.right - saliente.getBoundingClientRect().right).toBeGreaterThanOrEqual(cola);

    // Sin barra horizontal: lo que cae en el relleno no desborda.
    expect(hilo.scrollWidth).toBeLessThanOrEqual(hilo.clientWidth);
  },
};

/**
 * El cajón de conversaciones es de la pantalla de chat: se abre DENTRO del
 * armazón, con su velo, en vez de taparlo todo. Y su rótulo no se pinta —la
 * lista se explica sola— aunque sigue nombrando el diálogo para quien lo
 * escucha.
 */
export const ContratoCajonEnElArmazon: Story = {
  name: 'Test — el cajón se queda dentro del armazón',
  tags: ['!dev'],
  globals: { viewport: { value: 'mobile1' } },
  args: PorDefecto.args,
  render: (args) => (
    // El armazón NO llena la ventana: es la única forma de ver la diferencia
    // entre medirse contra él y medirse contra la pantalla.
    <div style={{ blockSize: '100dvh', paddingBlock: '80px' }}>
      <ChatShell {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir conversaciones' }));

    const armazon = canvasElement.querySelector<HTMLElement>('.chat-shell')!;
    const cajon = await waitFor(() => {
      const el = canvasElement.querySelector<HTMLElement>('.chat-shell__drawer');
      expect(el).not.toBeNull();
      return el!;
    });

    // Dentro del armazón, en el árbol y en la pantalla.
    await expect(armazon.contains(cajon)).toBe(true);
    const caja = armazon.getBoundingClientRect();
    const suya = cajon.getBoundingClientRect();
    await expect(Math.round(suya.top)).toBe(Math.round(caja.top));
    await expect(Math.round(suya.bottom)).toBe(Math.round(caja.bottom));

    // El diálogo sigue teniendo nombre aunque no se pinte el rótulo.
    const dialogo = within(armazon).getByRole('dialog');
    await expect(dialogo).toHaveAccessibleName('Conversaciones');
  },
};

/**
 * Test: el disparador del cajón no se mueve al abrirlo. Hay dos elementos —el
 * de la cabecera y el que el cajón repite en su propia fila— y tienen que dar
 * la MISMA caja: mismo tamaño y mismo punto de la pantalla, para que el glifo
 * no salte al desplegar.
 *
 * Dos condiciones que el armazón no controla y con las que tiene que salir
 * igual: el aire que ponga alrededor quien lo monta, y una cabecera MÁS ALTA
 * que el botón —aquí, un título más un selector de modelo—, que es lo que en
 * la aplicación de verdad hay dentro.
 */
export const ContratoDisparador: Story = {
  name: 'Test — el disparador no salta al abrir el cajón',
  tags: ['!dev'],
  globals: { viewport: { value: 'mobile1' } },
  args: {
    ...PorDefecto.args,
    header: (
      <>
        <Heading level={2} size={6}>Autenticación JWT</Heading>
        <SelectField
          id="modelo-test"
          label="Modelo"
          labelHidden
          options={MODELOS}
          value="opus"
          onValueChange={() => {}}
        />
      </>
    ),
  },
  render: (args) => (
    <div style={{ blockSize: '100dvh', padding: '24px' }}>
      <ChatShell {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cerrado = canvas.getByRole('button', { name: 'Abrir conversaciones' });
    const antes = cerrado.getBoundingClientRect();

    await userEvent.click(cerrado);
    const cajon = await canvas.findByRole('dialog', { name: 'Conversaciones' });
    // Se espera al valor final, no a `animationend`: donde las animaciones
    // están apagadas ese evento no llega nunca. El cajón ha terminado de
    // entrar cuando su canto coincide con el del armazón.
    const armazon = canvasElement.querySelector<HTMLElement>('.chat-shell')!;
    const abierto = await waitFor(() => {
      const el = within(cajon).getByRole('button', { name: 'Abrir conversaciones' });
      expect(Math.round(cajon.getBoundingClientRect().left)).toBe(
        Math.round(armazon.getBoundingClientRect().left),
      );
      return el;
    });
    const despues = abierto.getBoundingClientRect();

    // Mismo tamaño.
    await expect(Math.round(despues.width)).toBe(Math.round(antes.width));
    await expect(Math.round(despues.height)).toBe(Math.round(antes.height));
    // Y el mismo punto: misma línea horizontal y misma columna.
    await expect(Math.round(despues.top)).toBe(Math.round(antes.top));
    await expect(Math.round(despues.left)).toBe(Math.round(antes.left));
  },
};
