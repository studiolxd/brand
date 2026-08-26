import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
      description: 'Nivel semántico del encabezado (h1–h6).',
    },
    size: {
      control: { type: 'select' },
      options: [undefined, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      description: 'Tamaño tipográfico. Sin valor usa el tamaño del nivel.',
    },
    children: {
      control: { type: 'text' },
      description: 'Contenido del encabezado.',
    },
    className: { table: { disable: true } },
  },
  args: {
    children: 'Ejemplo de encabezado',
    level: 2,
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const H1: Story = { args: { level: 1 } };
export const H2: Story = { args: { level: 2 } };
export const H3: Story = { args: { level: 3 } };
export const H4: Story = { args: { level: 4 } };
export const H5: Story = { args: { level: 5 } };
export const H6: Story = { args: { level: 6 } };

export const TodosLosNiveles: Story = {
  render: () => (
    <>
      {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
        <Heading key={lvl} level={lvl}>Heading {lvl}</Heading>
      ))}
    </>
  ),
};

export const Tamanos: Story = {
  render: () => (
    <>
      {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((s) => (
        <Heading key={s} level={2} size={s}>size-{s}</Heading>
      ))}
    </>
  ),
};

export const Contrato: Story = {
  name: 'Test — nivel semántico y tamaño desacoplado',
  tags: ['!dev'],
  render: () => (
    <>
      <Heading level={2}>Nivel dos</Heading>
      <Heading level={2} size={9}>Nivel dos, tamaño de display</Heading>
    </>
  ),
  play: async ({ canvasElement }) => {
    const [normal, grande] = canvasElement.querySelectorAll('h2');
    const peso = getComputedStyle(normal).fontWeight;
    await expect(peso).toBe(getComputedStyle(normal).getPropertyValue('--font-weight-emphasis').trim());
    await expect(parseFloat(getComputedStyle(grande).fontSize)).toBeGreaterThan(parseFloat(getComputedStyle(normal).fontSize));
    await expect(getComputedStyle(grande).fontWeight).toBe(peso);
  },
};
