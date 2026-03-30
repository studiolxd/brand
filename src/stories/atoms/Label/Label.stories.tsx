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

/** El label está oculto visualmente pero presente en el DOM para lectores de pantalla */
export const Hidden: Story = {
  name: 'Visually hidden',
  args: { hidden: true },
};
