import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Átomos/Label',
  component: Label,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    hidden: {
      control: { type: 'boolean' },
      description: 'Oculta el label visualmente pero lo mantiene accesible para lectores de pantalla.',
    },
    dark: {
      control: { type: 'boolean' },
      description: 'Variante para usar sobre fondo oscuro.',
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
    dark: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Visible: Story = {
  name: 'Visible',
};

export const Dark: Story = {
  name: 'Oscuro',
  args: { dark: true },
  globals: {
    backgrounds: { value: 'dark' },
  },
};
