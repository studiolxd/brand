import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { FloatingDock } from './FloatingDock';
import { ChatShell } from '../../templates/ChatShell/ChatShell';
import { ConversationThread, type ConversationMessage } from '../../organisms/ConversationThread/ConversationThread';
import { MessageComposer } from '../../molecules/MessageComposer/MessageComposer';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Icon } from '../../atoms/Icon/Icon';

const meta = {
  title: 'Sections/FloatingDock',
  component: FloatingDock,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FloatingDock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Una página cualquiera detrás: el dock se ancla sobre ella, no la sustituye. */
function Pagina() {
  return (
    <div style={{ padding: 'var(--spacing-6)', maxInlineSize: '48rem' }}>
      <Heading level={1}>Licitación 2026/0148</Heading>
      <Paragraph>
        El dock vive sobre esta página. El panel que abre es un diálogo no modal:
        no hay velo, el foco no queda atrapado y se puede seguir leyendo y
        escribiendo aquí detrás mientras está abierto.
      </Paragraph>
      <Paragraph>
        Por eso tampoco se cierra al pulsar fuera — un ayudante que desaparece al
        primer clic en el contenido no acompaña a nadie.
      </Paragraph>
    </div>
  );
}

const mensajes: ConversationMessage[] = [
  { id: '1', role: 'user', content: '¿Qué plazo de presentación tiene esta licitación?' },
  {
    id: '2',
    role: 'assistant',
    content: 'El plazo termina el 14 de octubre a las 14:00. Quedan 12 días hábiles.',
    model: 'Claude',
  },
];

/** El chat de ejemplo que el consumidor mete por `children`. */
function ChatDeEjemplo() {
  const [texto, setTexto] = useState('');
  return (
    <ChatShell
      composer={
        <MessageComposer
          value={texto}
          onChange={setTexto}
          onSend={() => setTexto('')}
          placeholder="Pregunta sobre esta licitación"
          inputLabel="Mensaje para el asistente"
          rows={2}
        />
      }
    >
      <ConversationThread messages={mensajes} />
    </ChatShell>
  );
}

function Demo(args: Parameters<typeof FloatingDock>[0]) {
  return (
    <>
      <Pagina />
      <FloatingDock {...args} />
    </>
  );
}

export const Default: Story = {
  name: 'Asistente anclado',
  args: {
    label: 'Abrir el asistente',
    title: 'Asistente',
    description: 'Responde sobre la licitación abierta.',
    children: <ChatDeEjemplo />,
  },
  render: Demo,
};

export const ConContador: Story = {
  name: 'Con novedades sin ver',
  args: { ...Default.args, badge: 3 },
  render: Demo,
};

export const AbajoIzquierda: Story = {
  name: 'Anclado a la izquierda',
  args: { ...Default.args, position: 'bottom-start' },
  render: Demo,
};

export const Arriba: Story = {
  name: 'Anclado arriba',
  args: { ...Default.args, position: 'top-end' },
  render: Demo,
};

/** El lanzador acepta otro glifo: el asistente no siempre es un chat. */
export const OtroGlifo: Story = {
  name: 'Con otro glifo',
  args: {
    ...Default.args,
    label: 'Abrir las sugerencias',
    title: 'Sugerencias',
    description: undefined,
    icon: <Icon name="sparkles" size="md" />,
  },
  render: Demo,
};

export const Controlado: Story = {
  name: 'Estado controlado',
  args: { ...Default.args },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <Pagina />
        <FloatingDock {...args} open={open} onOpenChange={setOpen} />
      </>
    );
  },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: Default.args,
  render: Demo,
};

/* ── Tests ────────────────────────────────────────────────────── */

export const ContratoTeclado: Story = {
  name: 'Test — abre, cierra con Escape y devuelve el foco al lanzador',
  tags: ['!dev'],
  args: Default.args,
  render: Demo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lanzador = canvas.getByRole('button', { name: 'Abrir el asistente' });

    await expect(lanzador).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(lanzador).toHaveAttribute('aria-expanded', 'false');

    // Se abre desde el teclado, sin ratón.
    lanzador.focus();
    await userEvent.keyboard('{Enter}');

    const panel = await canvas.findByRole('dialog', { name: 'Asistente' });
    await expect(lanzador).toHaveAttribute('aria-expanded', 'true');
    // `aria-controls` apunta al panel que de verdad está en el DOM.
    await expect(lanzador.getAttribute('aria-controls')).toBe(panel.getAttribute('id'));
    // No modal: la página de detrás sigue en el árbol de accesibilidad.
    await expect(panel).not.toHaveAttribute('aria-modal', 'true');
    // El foco entra al panel al abrirlo.
    await waitFor(() => expect(panel.contains(document.activeElement)).toBe(true));

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(panel).not.toBeInTheDocument());
    await expect(lanzador).toHaveFocus();
    await expect(lanzador).toHaveAttribute('aria-expanded', 'false');
  },
};

export const ContratoAspa: Story = {
  name: 'Test — el aspa cierra y devuelve el foco',
  tags: ['!dev'],
  args: Default.args,
  render: Demo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lanzador = canvas.getByRole('button', { name: 'Abrir el asistente' });
    await userEvent.click(lanzador);

    const panel = await canvas.findByRole('dialog', { name: 'Asistente' });
    const aspa = within(panel).getByRole('button', { name: 'Cerrar' });
    await userEvent.click(aspa);

    await waitFor(() => expect(panel).not.toBeInTheDocument());
    await expect(lanzador).toHaveFocus();
  },
};

/** Test: un clic en la página no cierra el panel — el dock acompaña. */
export const ContratoClicFuera: Story = {
  name: 'Test — el clic fuera no cierra',
  tags: ['!dev'],
  args: Default.args,
  render: Demo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir el asistente' }));
    const panel = await canvas.findByRole('dialog', { name: 'Asistente' });

    await userEvent.click(canvas.getByRole('heading', { name: 'Licitación 2026/0148' }));
    await expect(panel).toBeInTheDocument();
  },
};

/** Test: el contador se lee por `aria-live`, y el lanzador conserva su nombre. */
export const ContratoContador: Story = {
  name: 'Test — el contador se anuncia sin tocar el nombre del lanzador',
  tags: ['!dev'],
  args: { ...Default.args, badge: 3 },
  render: Demo,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lanzador = canvas.getByRole('button', { name: 'Abrir el asistente' });
    await expect(lanzador).toBeInTheDocument();

    const aviso = canvasElement.querySelector('[aria-live="polite"]') as HTMLElement;
    await expect(aviso).toHaveTextContent('3 mensajes nuevos');
  },
};

/** Test: el ancla es fija y se separa del borde por el token, no por un `style`. */
export const ContratoAnclaje: Story = {
  name: 'Test — anclaje fijo por token',
  tags: ['!dev'],
  args: Default.args,
  render: Demo,
  play: async ({ canvasElement }) => {
    const dock = canvasElement.querySelector('.floating-dock') as HTMLElement;
    const cs = getComputedStyle(dock);
    await expect(cs.position).toBe('fixed');
    // 24px = spacing.5, el valor del token de aire al borde (safe-area 0 en el navegador de prueba).
    await expect(cs.insetBlockEnd).toBe('24px');
    await expect(cs.insetInlineEnd).toBe('24px');
    await expect(cs.zIndex).toBe('100');
  },
};
