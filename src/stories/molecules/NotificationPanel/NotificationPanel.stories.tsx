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
  },
  {
    id: '2',
    title: 'Tu solicitud de vacaciones está aprobada',
    body: 'Del 4 al 15 de agosto.',
    time: 'hace 2 h',
    unread: true,
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
 * El adelanto con dos notificaciones sin leer: punto rojo, título en énfasis,
 * el cuerpo debajo y la hora cerrando la fila, alineada al extremo final.
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

/**
 * Con el cuerpo largo, recortado a dos líneas: la hora sigue siendo la última
 * línea de la fila, alineada al final, y no se mete entre el título y el texto.
 */
export const ConCuerpoLargo: Story = {
  name: 'Con cuerpo largo',
  args: {
    defaultOpen: true,
    items: [
      {
        id: '1',
        title: 'Marta Ruiz ha comentado tu propuesta',
        body: '«Me cuadra el enfoque general y el reparto de fases, pero antes de enviársela al cliente revisemos el calendario de la fase 2: las dos semanas de validación se solapan con el cierre de agosto y no llegamos.»',
        time: 'hace 5 min',
        unread: true,
      },
      {
        id: '2',
        title: 'Sin cuerpo, la hora va justo debajo del título',
        time: 'ayer',
        unread: false,
      },
    ],
    count: 1,
  },
};

/** Sin nada que enseñar, el hueco de la lista lo ocupa el mensaje de al día. */
export const Vacio: Story = {
  name: 'Vacío',
  args: { defaultOpen: true, count: 0, items: [] },
};

/**
 * Con `onMarkAllRead` aparece el botón a ancho completo entre la lista y los
 * enlaces del pie; sin la prop no se pinta.
 */
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
    // La lista se llama con el título del panel, que ya no se pinta.
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

export const ContratoMarcarTodasBajoLaLista: Story = {
  name: 'Test — «Marcar todas» va bajo la lista, a ancho completo',
  tags: ['!dev'],
  args: { defaultOpen: true, onMarkAllRead: fn() },
  play: async () => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    const boton = within(panel).getByRole('button', { name: 'Marcar todas como leídas' });
    const primeraFila = within(panel).getByRole('button', {
      name: /Marta Ruiz ha comentado tu propuesta/,
    });
    const [primerEnlace] = within(panel).getAllByRole('link');

    // El orden del panel: lista → botón → enlaces del pie.
    await expect(
      primeraFila.compareDocumentPosition(boton) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    await expect(
      boton.compareDocumentPosition(primerEnlace) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // A ancho completo: ocupa el contenido de su bloque de canto a canto. Se
    // mide en píxeles de maqueta (`clientWidth`/`offsetWidth`) y no con los
    // rectángulos, que vienen escalados por la animación de entrada del
    // `Popover`.
    const bloque = boton.closest('.notification-panel__mark-all') as HTMLElement;
    await expect(bloque).not.toBeNull();
    const estilo = getComputedStyle(bloque);
    const contenido =
      bloque.clientWidth -
      parseFloat(estilo.paddingInlineStart) -
      parseFloat(estilo.paddingInlineEnd);
    // `offsetWidth`, no `clientWidth`: la caja del botón incluye su contorno.
    await expect(Math.abs(boton.offsetWidth - contenido)).toBeLessThanOrEqual(1);

    // Y sigue entrando el foco por la primera notificación, no por el botón.
    await waitFor(() => expect(primeraFila).toHaveFocus());
  },
};

export const ContratoHoverSinBarra: Story = {
  name: 'Test — bajo el puntero la fila no pinta ninguna barra',
  tags: ['!dev'],
  args: { defaultOpen: true },
  play: async () => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    const fila = within(panel).getByRole('button', {
      name: /Marta Ruiz ha comentado tu propuesta/,
    });

    await userEvent.hover(fila);
    // Ni barra de inicio ni relleno: lo único que cambia es el cursor.
    const estilo = getComputedStyle(fila);
    await expect(estilo.boxShadow).toBe('none');
    await expect(estilo.cursor).toBe('pointer');
  },
};

export const ContratoHoraBajoElCuerpo: Story = {
  name: 'Test — la hora va después del cuerpo, alineada al final',
  tags: ['!dev'],
  args: { defaultOpen: true },
  play: async () => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    const fila = within(panel).getByRole('button', {
      name: /Marta Ruiz ha comentado tu propuesta/,
    });
    const cuerpo = fila.querySelector('.notification-panel__item-body') as HTMLElement;
    const hora = fila.querySelector('.notification-panel__item-time') as HTMLElement;
    await expect(cuerpo).not.toBeNull();
    await expect(hora).not.toBeNull();

    // Después del cuerpo en el documento…
    await expect(
      cuerpo.compareDocumentPosition(hora) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    // …y también debajo, en su propia línea.
    await expect(hora.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      cuerpo.getBoundingClientRect().bottom - 1,
    );

    // Pegada al extremo final de la columna de texto.
    const columna = fila.querySelector('.notification-panel__item-text') as HTMLElement;
    await expect(
      Math.abs(hora.getBoundingClientRect().right - columna.getBoundingClientRect().right),
    ).toBeLessThanOrEqual(1);
  },
};

export const ContratoPie: Story = {
  name: 'Test — los únicos enlaces son los dos del pie, en tinta',
  tags: ['!dev'],
  args: { defaultOpen: true },
  play: async () => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    // Ninguna fila navega: los únicos enlaces del panel son los del pie.
    const enlaces = within(panel).getAllByRole('link');
    await expect(enlaces.map((a) => a.textContent)).toEqual([
      'Ver todas las notificaciones',
      'Preferencias de notificaciones',
    ]);
    for (const enlace of enlaces) {
      await expect(enlace).toHaveClass('link--ink');
    }
  },
};

export const ContratoSinCabecera: Story = {
  name: 'Test — el título no se ve, pero sigue nombrando panel y lista',
  tags: ['!dev'],
  args: { defaultOpen: true },
  play: async () => {
    const panel = await screen.findByRole('dialog', { name: 'Notificaciones' });
    const titulo = within(panel).getByRole('heading', { name: 'Notificaciones' });
    // El título vive dentro de `VisuallyHidden`: nombra la lista y no ocupa.
    const oculto = titulo.closest('.visually-hidden') as HTMLElement;
    await expect(oculto).not.toBeNull();
    await expect(oculto.getBoundingClientRect().height).toBeLessThan(2);
    await expect(within(panel).getByRole('list', { name: 'Notificaciones' })).toBeInTheDocument();
    // Lo primero que se ve es la primera notificación, sin hueco encima.
    const primera = within(panel).getAllByRole('button')[0];
    await expect(primera.getBoundingClientRect().top - panel.getBoundingClientRect().top)
      .toBeLessThan(24);
  },
};
