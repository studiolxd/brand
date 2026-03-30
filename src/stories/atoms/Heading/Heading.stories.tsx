import type { Meta, StoryObj } from '@storybook/react-vite';
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
    children: {
      control: { type: 'text' },
      description: 'Contenido del encabezado.',
    },
  },
  args: {
    children: 'Heading example',
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

export const AllLevels: Story = {
  render: () => (
    <>
      {([1, 2, 3, 4, 5, 6] as const).map((lvl) => (
        <Heading key={lvl} level={lvl}>Heading {lvl}</Heading>
      ))}
    </>
  ),
};
