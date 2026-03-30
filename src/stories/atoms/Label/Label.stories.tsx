import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atoms/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    hidden: {
      control: { type: 'boolean' },
      description: 'Oculta el label visualmente pero lo mantiene accesible para lectores de pantalla.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del label.',
    },
  },
  args: {
    htmlFor: 'ejemplo',
    children: 'Nombre completo',
    hidden: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Visible: Story = {
  name: 'Visible',
};

export const Dark: Story = {
  name: 'Oscuro',
  decorators: [(Story) => <div className="dark" style={{ padding: '1rem' }}><Story /></div>],
  globals: {
    backgrounds: { value: 'dark' },
  },
};
