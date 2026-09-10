import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { Button } from '../../atoms/Button/Button';
import { NotificationList, type NotificationListItem } from './NotificationList';

const items: NotificationListItem[] = [
  {
    id: '1',
    title: 'Marta Ruiz ha comentado tu propuesta',
    body: '«Me cuadra el enfoque general y el reparto de fases, pero antes de enviársela al cliente revisemos el calendario de la fase 2: las dos semanas de validación se solapan con el cierre de agosto.»',
    time: 'hace 5 min',
    timeDateTime: '2026-09-10T09:12:00Z',
    unread: true,
    href: '/propuestas/48#comentario-12',
  },
  {
    id: '2',
    title: 'Tu solicitud de vacaciones está aprobada',
    body: 'Del 4 al 15 de agosto.',
    time: 'hace 2 h',
    timeDateTime: '2026-09-10T07:20:00Z',
    unread: true,
    href: '/ausencias/312',
  },
  {
    id: '3',
    title: 'Quedan 3 días para cerrar el parte de horas',
    time: 'ayer',
    timeDateTime: '2026-09-09T08:00:00Z',
    unread: false,
  },
  {
    id: '4',
    title: 'Nueva factura disponible',
    body: 'Factura F-2026-0184 del proveedor Nordeste Servicios, pendiente de validación.',
    time: 'hace 3 días',
    timeDateTime: '2026-09-07T11:45:00Z',
    unread: false,
    href: '/facturas/F-2026-0184',
  },
];

const onEliminar = fn();

/** Lo que pasa el producto: sus propias acciones de fila, en `Button variant="text"`. */
const eliminar = () => (
  <Button variant="text" size="sm" onClick={onEliminar}>
    Eliminar
  </Button>
);

const meta = {
  title: 'Molecules/NotificationList',
  component: NotificationList,
  parameters: { layout: 'padded' },
  args: {
    items,
    onMarkRead: fn(),
    renderActions: eliminar,
  },
  argTypes: { className: { table: { disable: true } } },
} satisfies Meta<typeof NotificationList>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * La bandeja: filas a sangre separadas solo por su propio aire, dos sin leer y
 * dos leídas, con y sin cuerpo, con y sin enlace. La columna del punto se
 * reserva en todas, así que los títulos alinean; la hora de cada fila cierra
 * abajo, en una línea propia por debajo del cuerpo.
 */
export const Bandeja: Story = {};

/** Sin `onMarkRead` ni `renderActions`, la fila se queda con el texto y la hora debajo. */
export const SinAcciones: Story = {
  name: 'Sin acciones',
  args: { onMarkRead: undefined, renderActions: undefined },
};

/** Todo leído: sin puntos y sin «Marcar como leída», que solo sale en las no leídas. */
export const TodoLeido: Story = {
  name: 'Con todo leído',
  args: { items: items.map((item) => ({ ...item, unread: false })) },
};

/**
 * A 375 px las acciones caen bajo el texto y la hora, debajo de ellas: tres
 * líneas, todas al final de línea.
 */
export const EnMovil: Story = {
  name: 'En móvil',
  globals: { viewport: { value: { width: '375px', height: '720px' } } },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const ContratoIndicador: Story = {
  name: 'Test — la columna del punto se reserva también en las leídas',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const filas = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.notification-list__item'),
    );
    await expect(filas).toHaveLength(4);

    const indicadores = filas.map(
      (fila) => fila.querySelector('.notification-list__indicator') as HTMLElement,
    );
    // El hueco está en todas las filas, con bolita o sin ella…
    for (const indicador of indicadores) {
      await expect(indicador).not.toBeNull();
      await expect(indicador.getBoundingClientRect().width).toBeGreaterThan(0);
    }
    await expect(indicadores[0].querySelector('.notification-list__dot')).not.toBeNull();
    await expect(indicadores[2].querySelector('.notification-list__dot')).toBeNull();

    // …así que los títulos de todas las filas empiezan en la misma vertical.
    const titulos = filas.map(
      (fila) => fila.querySelector('.notification-list__title') as HTMLElement,
    );
    const inicio = titulos[0].getBoundingClientRect().left;
    for (const titulo of titulos) {
      await expect(titulo.getBoundingClientRect().left).toBeCloseTo(inicio, 0);
    }
  },
};

export const ContratoColumnaFinal: Story = {
  name: 'Test — acciones y hora, después del texto y al extremo final',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const fila = canvasElement.querySelector('.notification-list__item') as HTMLElement;
    const texto = fila.querySelector('.notification-list__text') as HTMLElement;
    const acciones = fila.querySelector('.notification-list__actions') as HTMLElement;
    const hora = fila.querySelector('.notification-list__time') as HTMLElement;

    // En el documento: primero el texto, después las acciones y la hora al final.
    await expect(
      texto.compareDocumentPosition(acciones) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    await expect(
      acciones.compareDocumentPosition(hora) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();

    // Las dos, pegadas al extremo final de la fila.
    const final = fila.getBoundingClientRect().right;
    await expect(Math.abs(acciones.getBoundingClientRect().right - final)).toBeLessThanOrEqual(1);
    await expect(Math.abs(hora.getBoundingClientRect().right - final)).toBeLessThanOrEqual(1);
  },
};

export const ContratoHoraAlFinalDeLaFila: Story = {
  name: 'Test — la hora va en su propia línea, por debajo del cuerpo',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    // La primera fila es la del cuerpo largo: la hora tiene que empezar por
    // debajo de su última línea, no compartirla.
    const fila = canvasElement.querySelector('.notification-list__item') as HTMLElement;
    const texto = fila.querySelector('.notification-list__text') as HTMLElement;
    const acciones = fila.querySelector('.notification-list__actions') as HTMLElement;
    const hora = fila.querySelector('.notification-list__time') as HTMLElement;

    // Una línea propia: empieza por debajo del borde inferior del cuerpo…
    await expect(hora.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      texto.getBoundingClientRect().bottom - 1,
    );
    // …y también por debajo de las acciones, que se quedan arriba, a la altura
    // del título.
    await expect(hora.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      acciones.getBoundingClientRect().bottom - 1,
    );
    await expect(
      Math.abs(acciones.getBoundingClientRect().top - texto.getBoundingClientRect().top),
    ).toBeLessThanOrEqual(2);

    // Y sigue cerrando la fila por su extremo final.
    await expect(
      Math.abs(hora.getBoundingClientRect().right - fila.getBoundingClientRect().right),
    ).toBeLessThanOrEqual(1);
  },
};

export const ContratoTituloASuAncho: Story = {
  name: 'Test — el enlace del título mide su texto, no la columna',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    // La segunda fila lleva un título corto y enlace: si el enlace se estirara,
    // toda la línea sería clicable.
    const filas = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.notification-list__item'),
    );
    const fila = filas[1];
    const texto = fila.querySelector('.notification-list__text') as HTMLElement;
    const titulo = fila.querySelector('.notification-list__title') as HTMLElement;

    await expect(titulo.tagName).toBe('A');
    await expect(titulo.getBoundingClientRect().width).toBeLessThan(
      texto.getBoundingClientRect().width,
    );
    // Y empieza donde empieza la columna: mide su texto, no se centra.
    await expect(titulo.getBoundingClientRect().left).toBeCloseTo(
      texto.getBoundingClientRect().left,
      0,
    );
  },
};

export const ContratoEnMovil: Story = {
  name: 'Test — bajo md, acciones y hora caen bajo el texto, cada una en su línea',
  tags: ['!dev'],
  globals: { viewport: { value: 'mobile1' } },
  play: async ({ canvasElement }) => {
    const fila = canvasElement.querySelector('.notification-list__item') as HTMLElement;
    const texto = fila.querySelector('.notification-list__text') as HTMLElement;
    const acciones = fila.querySelector('.notification-list__actions') as HTMLElement;
    const hora = fila.querySelector('.notification-list__time') as HTMLElement;

    // Debajo del texto, no a su lado…
    await expect(acciones.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      texto.getBoundingClientRect().bottom - 1,
    );
    // …y la hora en su propia línea, debajo de las acciones.
    await expect(hora.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      acciones.getBoundingClientRect().bottom - 1,
    );

    // Las dos empiezan en la misma columna que el texto: el hueco del punto se
    // respeta también aquí.
    for (const bloque of [acciones, hora]) {
      await expect(bloque.getBoundingClientRect().left).toBeCloseTo(
        texto.getBoundingClientRect().left,
        0,
      );
      await expect(
        Math.abs(bloque.getBoundingClientRect().right - fila.getBoundingClientRect().right),
      ).toBeLessThanOrEqual(1);
    }
  },
};

export const ContratoSinTarjeta: Story = {
  name: 'Test — filas a sangre, sin Card y sin línea entre ellas',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const lista = canvasElement.querySelector('.notification-list') as HTMLElement;
    await expect(lista.querySelector('.card')).toBeNull();

    const filas = Array.from(
      canvasElement.querySelectorAll<HTMLElement>('.notification-list__item'),
    );
    // Ninguna fila lleva borde por ningún lado: lo que las separa es su aire.
    for (const fila of filas) {
      const estilo = getComputedStyle(fila);
      await expect(parseFloat(estilo.borderBlockStartWidth)).toBe(0);
      await expect(parseFloat(estilo.borderBlockEndWidth)).toBe(0);
      await expect(parseFloat(estilo.borderInlineStartWidth)).toBe(0);
      await expect(parseFloat(estilo.borderInlineEndWidth)).toBe(0);
      await expect(parseFloat(estilo.paddingBlockStart)).toBeGreaterThan(0);
      await expect(parseFloat(estilo.paddingBlockEnd)).toBeGreaterThan(0);
    }
  },
};

export const ContratoMarcarLeida: Story = {
  name: 'Test — «Marcar como leída» solo en las filas sin leer',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Dos sin leer, dos leídas: dos botones de marcar y cuatro de eliminar.
    await expect(canvas.getAllByRole('button', { name: 'Marcar como leída' })).toHaveLength(2);
    await expect(canvas.getAllByRole('button', { name: 'Eliminar' })).toHaveLength(4);

    // Y en la fila, el de marcar va antes que los del producto.
    const fila = canvasElement.querySelector('.notification-list__item') as HTMLElement;
    const [primero, segundo] = Array.from(fila.querySelectorAll('.button'));
    await expect(primero).toHaveTextContent('Marcar como leída');
    await expect(segundo).toHaveTextContent('Eliminar');
  },
};
