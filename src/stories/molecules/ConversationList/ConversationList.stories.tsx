import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
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

/**
 * Títulos largos y cortos en la misma lista. El que no cabe se corta con
 * puntos suspensivos y **solo ese** enseña el título entero en un bocadillo al
 * apuntarlo o al enfocarlo con el teclado; los que caben no lo enseñan, porque
 * repetir un texto que ya se lee es ruido que además estorba al apuntar.
 */
export const TitulosLargos: Story = {
  name: 'Títulos largos y cortos',
  args: {
    conversations: [
      { id: 'c1', label: 'Hola' },
      { id: 'c2', label: 'Migración del esquema de facturación a la nueva pasarela de pagos' },
      { id: 'c3', label: 'Bug #412' },
      { id: 'c4', label: 'Revisión de la política de retención de copias de seguridad cifradas' },
    ],
    activeId: 'c2',
  },
};

/**
 * Sin conversaciones, la lista pinta **ella** el estado vacío, con su texto
 * castellano por defecto («Todavía no hay conversaciones»): quien no pase
 * `emptyMessage` se lleva ese, así que la pantalla no tiene que añadir un
 * aviso propio —si lo añade, se ven dos—.
 */
export const SinConversaciones: Story = {
  name: 'Sin conversaciones',
  args: { conversations: [], activeId: undefined },
};

/** Con `emptyMessage`, el mismo hueco con el texto del producto (o traducido). */
export const SinConversacionesTraducida: Story = {
  name: 'Sin conversaciones — texto propio',
  args: {
    conversations: [],
    activeId: undefined,
    emptyMessage: 'No conversations yet',
    navLabel: 'Conversations',
    newLabel: 'New conversation',
  },
};

/** Cargando: en el hueco de la lista van marcadores y el `<nav>` se anuncia ocupado. */
export const Cargando: Story = {
  args: { conversations: [], isLoading: true },
};

/** Error: en el hueco de la lista va un `Alert` de error con el mensaje del producto. */
export const ConError: Story = {
  name: 'Con error',
  args: {
    conversations: [],
    error: 'Vuelve a intentarlo en unos segundos.',
  },
};

export const Internacionalizado: Story = {
  args: {
    newLabel: 'New conversation',
    navLabel: 'Conversations',
    deleteLabel: (label) => `Delete conversation "${label}"`,
  },
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
/**
 * Test: los tres estados se turnan en el mismo hueco, con la prioridad
 * error → carga → vacío → lista.
 */
export const ContratoEstados: Story = {
  name: 'Test — carga, error y lista vacía',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="cargando">
        <ConversationList conversations={[]} isLoading onNew={fn()} onSelect={fn()} onDelete={fn()} navLabel="Cargando" />
      </div>
      <div data-testid="error">
        <ConversationList conversations={SAMPLE} error="No hay red." onNew={fn()} onSelect={fn()} onDelete={fn()} navLabel="Con error" />
      </div>
      <div data-testid="vacia">
        <ConversationList conversations={[]} onNew={fn()} onSelect={fn()} onDelete={fn()} navLabel="Vacía" />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const zona = (testid: string) => canvasElement.querySelector(`[data-testid="${testid}"]`) as HTMLElement;

    // Carga: marcadores decorativos y el nav ocupado.
    const cargando = zona('cargando');
    await expect(cargando.querySelectorAll('.skeleton')).toHaveLength(4);
    await expect(canvas.getByRole('navigation', { name: 'Cargando' })).toHaveAttribute('aria-busy', 'true');
    await expect(cargando.querySelector('.conversation-list__items')).toBeNull();

    // Error: manda sobre la lista, aunque haya conversaciones.
    const error = zona('error');
    await expect(error.querySelector('.alert')).not.toBeNull();
    await expect(error).toHaveTextContent('No hay red.');
    await expect(error.querySelector('.conversation-list__items')).toBeNull();

    // Vacía: el estado vacío del sistema, no un hueco en blanco.
    const vacia = zona('vacia');
    await expect(vacia.querySelector('.empty-state')).not.toBeNull();
    await expect(vacia).toHaveTextContent('Todavía no hay conversaciones');

    // Y el botón de conversación nueva sigue estando en los tres.
    await expect(canvas.getAllByRole('button', { name: 'Nueva conversación' })).toHaveLength(3);
  },
};

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
    // Y se ve: sin esto el foco caía en un botón invisible (la opacidad
    // entra con transición, de ahí la espera).
    await waitFor(() => expect(getComputedStyle(aspa).opacity).toBe('1'));
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

/**
 * Test: el bocadillo aparece **solo** cuando el título no cabe. Se mide en el
 * propio evento que lo abriría (`scrollWidth` contra `clientWidth`), así que
 * un título corto no abre nada por mucho que se apunte.
 */
export const ContratoBocadillo: Story = {
  name: 'Test — el bocadillo solo sale con el título cortado',
  tags: ['!dev'],
  args: {
    conversations: [
      { id: 'corto', label: 'Hola' },
      { id: 'largo', label: 'Migración del esquema de facturación a la nueva pasarela de pagos' },
    ],
    activeId: 'corto',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const corto = canvas.getByRole('button', { name: 'Hola' });
    const largo = canvas.getByRole('button', { name: /Migración del esquema/ });

    // El corto cabe: no hay bocadillo por mucho que se apunte.
    await userEvent.hover(corto);
    await expect(document.querySelector('[role="tooltip"]')).toBeNull();
    await userEvent.unhover(corto);

    // El largo está cortado: el bocadillo lo lee entero.
    await userEvent.hover(largo);
    const bocadillo = await waitFor(() => {
      const el = document.querySelector('[role="tooltip"]');
      expect(el).not.toBeNull();
      return el!;
    });
    await expect(bocadillo).toHaveTextContent('Migración del esquema de facturación a la nueva pasarela de pagos');

    // Y no le roba el nombre al disparador ni lo describe con lo mismo que ya
    // lo nombra: el texto entero sigue en el DOM para el lector de pantalla.
    await expect(largo).not.toHaveAttribute('aria-describedby');
  },
};

/** Test: con el teclado, enfocar un título cortado también abre el bocadillo. */
export const ContratoBocadilloTeclado: Story = {
  name: 'Test — el bocadillo también se ve con el teclado',
  tags: ['!dev'],
  args: {
    conversations: [{ id: 'largo', label: 'Migración del esquema de facturación a la nueva pasarela de pagos' }],
    activeId: 'largo',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab(); // Nueva conversación
    await userEvent.tab(); // el título

    await expect(canvas.getByRole('button', { name: /Migración del esquema/ })).toHaveFocus();
    await waitFor(() => expect(document.querySelector('[role="tooltip"]')).not.toBeNull());
  },
};
