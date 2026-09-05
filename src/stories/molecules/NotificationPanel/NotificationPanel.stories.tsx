import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn, screen, userEvent, waitFor, within } from 'storybook/test';
import { NotificationPanel, type NotificationPanelItem } from './NotificationPanel';

const items: NotificationPanelItem[] = [
  {
    id: '1',
    title: 'Marta Ruiz ha comentado tu propuesta',
    body: '«Me cuadra el enfoque, pero revisemos el calendario de la fase 2 antes de enviarla al cliente.»',
    time: 'hace 5 min',
    unread: true,
    link: '/proyectos/9/comentarios/33',
  },
  {
    id: '2',
    title: 'Tu solicitud de vacaciones está aprobada',
    body: 'Del 4 al 15 de agosto.',
    time: 'hace 2 h',
    unread: true,
    link: '/ausencias/181',
  },
  {
    id: '3',
    title: 'Quedan 3 días para cerrar el parte de horas',
    time: 'ayer',
    unread: false,
  },
  {
    id: '4',
    title: 'Nueva factura disponible',
    body: 'Factura F-2026-0184 del proveedor Nordeste Servicios, pendiente de validación.',
    time: 'hace 3 días',
    unread: false,
    link: '/facturas/184',
  },
];

const meta = {
  title: 'Molecules/NotificationPanel',
  component: NotificationPanel,
  parameters: { layout: 'centered' },
  args: {
    items,
    count: 2,
    allHref: '/notificaciones',
    preferencesHref: '/notificaciones/preferencias',
    onRead: fn(),
  },
  argTypes: { className: { table: { disable: true } } },
} satisfies Meta<typeof NotificationPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * El adelanto con dos notificaciones sin leer: punto rojo, título en énfasis y
 * el enlace «Ver» en las que tienen destino.
 */
export const ConNoLeidas: Story = {
  name: 'Con no leídas',
  args: { defaultOpen: true },
};

/** Todo leído: sin puntos y con la lista entera en tinta atenuada. */
export const TodoLeido: Story = {
  name: 'Con todo leído',
  args: {
    defaultOpen: true,
    count: 0,
    items: items.map((item) => ({ ...item, unread: false })),
  },
};

/** Sin nada que enseñar, el hueco de la lista lo ocupa el mensaje de al día. */
export const Vacio: Story = {
  name: 'Vacío',
  args: { defaultOpen: true, count: 0, items: [] },
};

/** Con `onMarkAllRead` el pie estrena su botón; sin la prop no se pinta. */
export const ConMarcarTodas: Story = {
  name: 'Con «Marcar todas»',
  args: { defaultOpen: true, onMarkAllRead: fn() },
};

/**
 * En la barra oscura de la aplicación. El panel flota fuera del árbol de la
 * story, así que el tema se lee del `<html>`: en el catálogo, con el fondo
 * oscuro del switcher.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: { defaultOpen: true, onMarkAllRead: fn() },
  parameters: { surface: 'dark' },
};

export const ContratoApertura: Story = {
  name: 'Test — abrir, cerrar con Escape y devolver el foco',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const bell = within(canvasElement).getByRole('button', { name: 'Notificaciones: 2 sin leer' });
    await expect(bell).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(bell);
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    await expect(bell).toHaveAttribute('aria-expanded', 'true');
    await expect(bell).toHaveAttribute('aria-controls', panel.id);
    // La lista se llama con el título visible de la cabecera.
    await expect(screen.getByRole('list', { name: 'Notificaciones' })).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(bell).toHaveAttribute('aria-expanded', 'false'));
    // El foco vuelve cuando termina la animación de salida del panel, no en el
    // mismo tick en que se marca cerrado.
    await waitFor(() => expect(bell).toHaveFocus());
  },
};

export const ContratoFoco: Story = {
  name: 'Test — el foco entra por la primera notificación',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const bell = within(canvasElement).getByRole('button', { name: 'Notificaciones: 2 sin leer' });
    await userEvent.click(bell);
    await screen.findByRole('dialog', { name: 'Notificaciones' });

    const primera = screen.getByRole('button', {
      name: /Marta Ruiz ha comentado tu propuesta/,
    });
    await waitFor(() => expect(primera).toHaveFocus());
  },
};

export const ContratoMarcarLeido: Story = {
  name: 'Test — marcar leído no cierra el panel ni mueve la fila',
  tags: ['!dev'],
  args: { defaultOpen: true },
  render: (args) => {
    // El consumidor no reordena la lista con el panel abierto: el estado de
    // «leída» se ve en el sitio, y el dato sigue diciendo lo mismo hasta que
    // se cierre.
    const [leidas, setLeidas] = useState<string[]>([]);
    return (
      <NotificationPanel
        {...args}
        onRead={(id) => {
          setLeidas((previous) => [...previous, id]);
          args.onRead(id);
        }}
        markAllReadLabel={`Marcar todas como leídas (${leidas.length})`}
      />
    );
  },
  play: async ({ args }) => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    const filas = () => within(panel).getAllByRole('button');

    const primera = filas()[0];
    await expect(primera).toHaveAccessibleName(/Sin leer/);

    await userEvent.click(primera);
    await expect(args.onRead).toHaveBeenCalledWith('1');

    // Sigue abierto y la fila sigue siendo la primera, ya sin el «Sin leer».
    await expect(screen.getByRole('dialog', { name: 'Notificaciones' })).toBeInTheDocument();
    await waitFor(() => expect(filas()[0]).not.toHaveAccessibleName(/Sin leer/));
    await expect(filas()[0]).toHaveAccessibleName(/Marta Ruiz/);
    await expect(filas()[0]).toHaveAttribute('aria-disabled', 'true');
  },
};

export const ContratoVer: Story = {
  name: 'Test — «Ver» solo en las que tienen destino, y con nombre propio',
  tags: ['!dev'],
  args: { defaultOpen: true },
  play: async () => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    // El nombre del enlace se compone de su rótulo y del título de la
    // notificación: tres «Ver» sueltos no se distinguirían en una lista de
    // enlaces. Los otros dos del panel son los del pie.
    const enlaces = within(panel).getAllByRole('link');
    await expect(enlaces.map((a) => a.textContent)).toEqual([
      'Ver',
      'Ver',
      'Ver',
      'Ver todas las notificaciones',
      'Preferencias de notificaciones',
    ]);
    const ver = within(panel).getByRole('link', { name: 'Ver Marta Ruiz ha comentado tu propuesta' });
    await expect(ver).toHaveAttribute('href', '/proyectos/9/comentarios/33');
    // La tercera notificación no tiene destino: no estrena enlace.
    await expect(within(panel).queryByRole('link', { name: /parte de horas/ })).toBeNull();
  },
};
