import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor, within } from 'storybook/test';
import { Steps, Step } from './Steps';
import { Code } from '../../atoms/Code/Code';
import { List } from '../../atoms/List/List';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const metodologia = [
  { id: 'escuchar', title: 'Escuchamos', description: 'Entendemos el problema de formación antes de proponer nada: a quién, para qué y con qué medios.', icon: 'headset' as const },
  { id: 'disenar', title: 'Diseñamos', description: 'Convertimos el objetivo en un itinerario con actividades, evaluación y ritmo.', icon: 'sparkles' as const },
  { id: 'producir', title: 'Producimos', description: 'Construimos los contenidos y la plataforma que los sostiene, accesibles desde el primer día.', icon: 'briefcase' as const },
  { id: 'medir', title: 'Medimos', description: 'Publicamos, observamos qué pasa y ajustamos con datos, no con impresiones.', icon: 'dashboard' as const },
];

const meta: Meta<typeof Steps> = {
  title: 'Organisms/Steps',
  component: Steps,
  parameters: { layout: 'padded' },
  args: { items: metodologia },
  argTypes: { className: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof Steps>;

/** Uno debajo de otro, con la línea que los une. */
export const PorDefecto: Story = {};

/** En fila: el número encima del texto, la línea entre columnas. */
export const Horizontal: Story = { args: { orientation: 'horizontal' } };

/** Solo títulos: sin descripción, el proceso se lee de un vistazo. */
export const SoloTitulos: Story = {
  name: 'Solo títulos',
  args: { items: metodologia.map(({ id, title }) => ({ id, title })) },
};

/** Sin iconos: el número basta para ordenar. */
export const SinIconos: Story = {
  args: { items: metodologia.map(({ id, title, description }) => ({ id, title, description })) },
};

/**
 * Los mismos cuatro textos que `Stepper` › «Lado a lado»: la misma marca
 * cuadrada y el mismo conector, pero aquí sin estado —ningún paso es «el
 * actual»— donde `Stepper` acompaña un flujo en marcha.
 */
export const LadoALado: Story = {
  name: 'Lado a lado',
  args: {
    items: [
      { id: 'datos', title: 'Datos' },
      { id: 'verificacion', title: 'Verificación' },
      { id: 'pago', title: 'Pago' },
      { id: 'confirmacion', title: 'Confirmación' },
    ],
    orientation: 'horizontal',
  },
};

/**
 * Forma compuesta: un `Step` por paso, con el cuerpo que haga falta dentro
 * (varios párrafos, una lista, un fragmento de código). Es la forma para MDX,
 * donde un paso no cabe en una cadena. El número lo sigue poniendo la lista.
 */
export const Compuesto: Story = {
  name: 'Compuesto por children',
  args: { items: undefined },
  render: () => (
    <Steps>
      <Step title="Instala el paquete" icon="briefcase">
        <Paragraph>
          El paquete se distribuye por git, así que se pinea a un tag concreto:
        </Paragraph>
        <Paragraph>
          <Code>pnpm add github:studiolxd/brand#v25.14.0</Code>
        </Paragraph>
      </Step>
      <Step title="Importa los estilos">
        <Paragraph>Una sola vez, en el punto de entrada de la aplicación.</Paragraph>
        <List>
          <li><Code>@studiolxd/brand/tokens.css</Code> — solo los tokens.</li>
          <li><Code>@studiolxd/brand/brand.css</Code> — tokens y componentes.</li>
        </List>
      </Step>
      <Step title="Usa los componentes">
        <Paragraph>Cada componente tiene su subruta, para que el bundle no cargue de más.</Paragraph>
      </Step>
    </Steps>
  ),
};

/**
 * Test: la forma compuesta pinta la misma lista ordenada, numera sola y deja
 * pasar el cuerpo rico del consumidor.
 */
export const ContratoCompuesto: Story = {
  name: 'Test — forma compuesta',
  tags: ['!dev'],
  args: { items: undefined },
  render: () => (
    <Steps label="Instalación">
      <Step title="Instala el paquete" data-paso="uno">
        <Paragraph>Primero.</Paragraph>
        <List>
          <li>Un detalle</li>
        </List>
      </Step>
      <Step title="Importa los estilos">
        <Paragraph>Después.</Paragraph>
      </Step>
    </Steps>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lista = canvas.getByRole('list', { name: 'Instalación' });
    await expect(lista.tagName).toBe('OL');

    // Solo los hijos directos: la lista de dentro del primer paso también
    // tiene `li`, y no son pasos.
    const pasos = lista.querySelectorAll(':scope > li');
    await expect(pasos).toHaveLength(2);
    await expect(pasos[0]).toHaveClass('steps__item');
    await expect(pasos[0]).toHaveAttribute('data-paso', 'uno');

    // El número lo pone la lista, no el consumidor, y sigue siendo decorativo.
    const marcadores = lista.querySelectorAll('.step-marker');
    await expect(marcadores[0]).toHaveTextContent('1');
    await expect(marcadores[1]).toHaveTextContent('2');
    await expect(marcadores[0]).toHaveAttribute('aria-hidden', 'true');

    // El cuerpo rico entra tal cual: párrafo y lista dentro del mismo paso.
    const cuerpo = pasos[0].querySelector('.steps__body')!;
    await expect(cuerpo.querySelector('p')).toHaveTextContent('Primero.');
    await expect(cuerpo.querySelector('ul')).not.toBeNull();

    // Y el título sigue siendo un encabezado de verdad.
    await expect(canvas.getByRole('heading', { level: 3, name: 'Instala el paquete' })).toBeInTheDocument();
  },
};

export const Contrato: Story = {
  name: 'Test — lista ordenada con el número decorativo',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lista = canvas.getByRole('list');
    await expect(lista.tagName).toBe('OL');
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);

    // El número es decorativo: la posición ya la da el `ol`. Con icono, la
    // marca lo muestra a él en vez de la cifra (`metodologia` trae icono en
    // los cuatro pasos).
    const marcador = canvasElement.querySelector('.step-marker')!;
    await expect(marcador).toHaveAttribute('aria-hidden', 'true');
    await expect(marcador.querySelector('svg')).not.toBeNull();

    // Cada paso es un encabezado de verdad, al nivel que se le pase.
    await expect(canvas.getByRole('heading', { level: 3, name: /Escuchamos/ })).toBeInTheDocument();
  },
};

/**
 * Items con y sin descripción alternados: el alto del cuerpo varía de un
 * paso a otro, que es justo lo que rompía el conector (v37.3.0, B15) al
 * depender de la altura intrínseca del propio marcador para estirarse.
 */
const pasosAlturaVariable = [
  { id: 'uno', title: 'Uno', description: 'Con descripción, para que el cuerpo sea más alto que la marca.' },
  { id: 'dos', title: 'Dos' },
  { id: 'tres', title: 'Tres', description: 'Otra vez con descripción.' },
  { id: 'cuatro', title: 'Cuatro' },
];

/**
 * El tramo entre dos marcas consecutivas —el conector es un `::after` fuera
 * de flujo, así que no se puede tomar su propio `getBoundingClientRect`—: se
 * reconstruye su rectángulo a partir del `top`/`left`/`width`/`height` ya
 * resueltos que da `getComputedStyle` sobre `.steps__marker` (position:
 * absolute con valores explícitos, nunca `auto`) más la posición de esa
 * celda, y se compara contra las marcas real y siguiente con el margen de
 * 1px que pide el brief. Envuelto en `waitFor` porque en Chromatic el primer
 * marco no es de fiar (ver CLAUDE.md § «play» y Chromatic).
 */
function comprobarConector(canvasElement: HTMLElement, eje: 'vertical' | 'horizontal') {
  return waitFor(() => {
    const items = Array.from(canvasElement.querySelectorAll<HTMLElement>('.steps__item'));
    expect(items.length).toBeGreaterThan(1);

    for (let i = 0; i < items.length - 1; i++) {
      const actual = items[i];
      const siguiente = items[i + 1];
      const celdaActual = actual.querySelector<HTMLElement>('.steps__marker')!;
      const marcaActual = actual.querySelector('.step-marker')!;
      const marcaSiguiente = siguiente.querySelector('.step-marker')!;
      const celdaRect = celdaActual.getBoundingClientRect();
      const after = getComputedStyle(celdaActual, '::after');

      if (eje === 'vertical') {
        const inicio = celdaRect.top + parseFloat(after.top);
        const fin = inicio + parseFloat(after.height);
        expect(inicio).toBeLessThanOrEqual(marcaActual.getBoundingClientRect().bottom + 1);
        expect(fin).toBeGreaterThanOrEqual(marcaSiguiente.getBoundingClientRect().top - 1);
      } else {
        const inicio = celdaRect.left + parseFloat(after.left);
        const fin = inicio + parseFloat(after.width);
        expect(inicio).toBeLessThanOrEqual(marcaActual.getBoundingClientRect().right + 1);
        expect(fin).toBeGreaterThanOrEqual(marcaSiguiente.getBoundingClientRect().left - 1);
      }
    }
  });
}

export const ContratoConectorVertical: Story = {
  name: 'Test — el conector llega de una marca a la siguiente (vertical)',
  tags: ['!dev'],
  args: { items: pasosAlturaVariable },
  play: async ({ canvasElement }) => {
    await comprobarConector(canvasElement, 'vertical');
  },
};

export const ContratoConectorHorizontal: Story = {
  name: 'Test — el conector llega de una marca a la siguiente (horizontal)',
  tags: ['!dev'],
  args: { items: pasosAlturaVariable, orientation: 'horizontal' },
  play: async ({ canvasElement }) => {
    await comprobarConector(canvasElement, 'horizontal');
  },
};
