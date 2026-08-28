import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Steps } from './Steps';

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

/** Sobre superficie oscura: el número y la línea voltean con la superficie. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};

export const Contrato: Story = {
  name: 'Test — lista ordenada con el número decorativo',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lista = canvas.getByRole('list');
    await expect(lista.tagName).toBe('OL');
    await expect(canvas.getAllByRole('listitem')).toHaveLength(4);

    // El número es decorativo: la posición ya la da el `ol`.
    const marcador = canvasElement.querySelector('.steps__marker')!;
    await expect(marcador).toHaveAttribute('aria-hidden', 'true');
    await expect(marcador.querySelector('.number-badge')).toHaveTextContent('1');

    // Cada paso es un encabezado de verdad, al nivel que se le pase.
    await expect(canvas.getByRole('heading', { level: 3, name: /Escuchamos/ })).toBeInTheDocument();
  },
};
