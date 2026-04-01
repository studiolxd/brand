import type { Meta, StoryObj } from '@storybook/react-vite';
import { Highlight } from './Highlight';

const meta: Meta<typeof Highlight> = {
  title: 'Atoms/Highlight',
  component: Highlight,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Texto destacado.',
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      description: 'Tamaño tipográfico. Sin valor usa el token del componente.',
    },
    weight: {
      control: { type: 'select' },
      options: [undefined, 'thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      description: 'Peso tipográfico. Sin valor usa el token del componente.',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Alineación horizontal del bloque.',
    },
    textAlign: {
      control: { type: 'select' },
      options: [undefined, 'left', 'center', 'right'],
      description: 'Alineación del texto dentro del bloque.',
    },
    className: { table: { disable: true } },
  },
  args: {
    text: 'Diseñamos marcas que conectan con las personas y perduran en el tiempo.',
  },
};

export default meta;
type Story = StoryObj<typeof Highlight>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((s) => (
        <Highlight key={s} size={s} text={`size-${s} — Diseñamos marcas que conectan.`} />
      ))}
    </>
  ),
};

export const Weights: Story = {
  render: () => (
    <>
      {(['thin', 'extralight', 'light', 'regular', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const).map((w) => (
        <Highlight key={w} weight={w} text={`${w} — Diseñamos marcas que conectan.`} />
      ))}
    </>
  ),
};
