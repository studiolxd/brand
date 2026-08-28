import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Figure } from './Figure';

const foto = 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=960&q=80';

const meta: Meta<typeof Figure> = {
  title: 'Atoms/Figure',
  component: Figure,
  parameters: { layout: 'padded' },
  argTypes: {
    ratio: { control: { type: 'select' }, options: ['auto', '1:1', '4:3', '3:2', '16:9', '21:9'] },
    fit: { control: { type: 'inline-radio' }, options: ['cover', 'contain'] },
    render: { table: { disable: true } },
  },
  args: {
    src: foto,
    alt: 'Un aula con un grupo trabajando alrededor de una mesa',
    caption: 'Taller de diseño instruccional, Madrid, marzo de 2026.',
  },
};

export default meta;
type Story = StoryObj<typeof Figure>;

export const PorDefecto: Story = {
  name: 'Por defecto',
};

/** Sin `caption` no se pinta pie: la figura es solo la imagen. */
export const SinPie: Story = {
  name: 'Sin pie',
  args: { caption: undefined },
};

/** Con proporción fija la caja manda y la imagen se recorta para llenarla. */
export const Proporciones: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 'var(--spacing-5)', gridTemplateColumns: 'repeat(2, 1fr)' }}>
      <Figure {...args} ratio="1:1" caption="1:1" />
      <Figure {...args} ratio="4:3" caption="4:3" />
      <Figure {...args} ratio="16:9" caption="16:9" />
      <Figure {...args} ratio="21:9" caption="21:9" />
    </div>
  ),
};

/** `fit="contain"` mete la imagen entera y deja ver el fondo de la caja. */
export const Contain: Story = {
  name: 'Encaje contain',
  args: { ratio: '21:9', fit: 'contain' },
};

/**
 * `render` pone la imagen del consumidor (el `next/image` de una web Next.js)
 * en lugar del `<img>` propio: la clase, el encaje y la proporción los sigue
 * poniendo el sistema.
 */
export const ConImagenDelConsumidor: Story = {
  name: 'Con la imagen de la aplicación',
  render: (args) => (
    <Figure
      {...args}
      ratio="16:9"
      render={<img data-next-image="" src={foto} alt="Un aula con un grupo trabajando alrededor de una mesa" />}
    />
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { ratio: '16:9' },
};

/** Test: la figura es semántica, el pie cuelga de ella y la proporción sale del token. */
export const Contrato: Story = {
  name: 'Test — semántica, pie y proporción',
  tags: ['!dev'],
  args: { ratio: '16:9' },
  render: (args) => <Figure {...args} id="figura" data-zona="galeria" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const figura = canvasElement.querySelector('figure.figure')!;
    await expect(figura).toHaveAttribute('id', 'figura');
    await expect(figura).toHaveAttribute('data-zona', 'galeria');

    const imagen = canvas.getByRole('img', { name: /Un aula/ });
    await expect(imagen).toHaveClass('figure__img');

    const pie = figura.querySelector('figcaption.figure__caption')!;
    await expect(pie).toHaveTextContent('Taller de diseño instruccional');

    // La proporción la pone el token, no una cifra escrita en el CSS.
    const caja = figura.querySelector('.figure__media') as HTMLElement;
    await expect(caja).toHaveClass('figure__media--ratio-16-9');
    const alto = caja.getBoundingClientRect().height;
    const ancho = caja.getBoundingClientRect().width;
    await expect(Math.abs(ancho / alto - 16 / 9)).toBeLessThan(0.05);
    await expect(getComputedStyle(imagen).objectFit).toBe('cover');
  },
};

/** Test: `render` sustituye al `<img>` propio y hereda su clase. */
export const ContratoRender: Story = {
  name: 'Test — render sobre la imagen del consumidor',
  tags: ['!dev'],
  render: () => (
    <Figure
      ratio="4:3"
      src="/ignorada.jpg"
      render={<img data-next-image="" src={foto} alt="Aula" />}
      caption="Pie"
    />
  ),
  play: async ({ canvasElement }) => {
    const imagenes = canvasElement.querySelectorAll('img');
    await expect(imagenes).toHaveLength(1);
    await expect(imagenes[0]).toHaveAttribute('data-next-image');
    await expect(imagenes[0]).toHaveClass('figure__img');
    await expect(imagenes[0].getAttribute('src')).toBe(foto);
  },
};
