import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
    className: { table: { disable: true } },
  },
  args: {
    src: 'https://i.pravatar.cc/96?img=47',
    name: 'Ana García',
    size: 'md',
    shape: 'circle',
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const PorDefecto: Story = {};

/** Las tres tallas del sistema —32, 40 y 48— más las dos de marca: 64 y 96. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
      <Avatar {...args} size="2xl" />
    </div>
  ),
};

/** Sin imagen —o si falla al cargar— salen las iniciales del nombre. */
export const Iniciales: Story = {
  args: { src: undefined },
};

/** Organizaciones: cuadrado con el radio del sistema. */
export const Organizacion: Story = {
  args: { src: undefined, name: 'Studio LXD', shape: 'square' },
};

export const Contrato: Story = {
  name: 'Test — talla, iniciales y nombre accesible',
  tags: ['!dev'],
  render: () => (
    <>
      <Avatar name="Ana García" size="sm" />
      <Avatar name="Alejandro" size="md" />
      <Avatar name="Studio LXD" alt="" size="lg" shape="square" />
      <Avatar src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" name="Con imagen" />
      <Avatar name="Chus Pi" size="xl" />
      <Avatar name="Lu Ma" size="2xl" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ana = canvas.getByRole('img', { name: 'Ana García' });
    await expect(ana.textContent).toBe('AG');
    await expect(Math.round(ana.getBoundingClientRect().width)).toBe(32);
    await expect(canvas.getByRole('img', { name: 'Alejandro' }).textContent).toBe('AL');
    // alt="" → decorativo: no es una imagen para el lector de pantalla
    await expect(canvas.queryByRole('img', { name: 'Studio LXD' })).toBeNull();
    await expect(canvas.getByRole('img', { name: 'Con imagen' }).tagName).toBe('IMG');
    const lg = canvasElement.querySelector('.avatar--lg')!;
    await expect(Math.round(lg.getBoundingClientRect().width)).toBe(48);
    const xl = canvasElement.querySelector('.avatar--xl')!;
    await expect(Math.round(xl.getBoundingClientRect().width)).toBe(64);
    const xxl = canvasElement.querySelector('.avatar--2xl')!;
    await expect(Math.round(xxl.getBoundingClientRect().width)).toBe(96);
  },
};

/** Sin tokens de color propios: el retrato y las iniciales viven sobre su propio relleno. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};
