import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Átomos/Botón',
  component: Button,  
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'primary-dark', 'ghost', 'form'],
      description: 'Variante visual del botón.',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Ocupa todo el ancho del contenedor.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el botón.',
    },
    children: {
      control: { type: 'text' },
      description: 'Texto del botón.',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML del botón.',
    },
  },
  args: {
    children: 'Botón',
    disabled: false,
    block: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const PrimaryDark: Story = {
  name: 'Primary oscuro',
  args: { variant: 'primary-dark' },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const Form: Story = {
  args: { variant: 'form' },
};

export const Bloque: Story = {
  name: 'En bloque',
  args: { variant: 'primary', block: true },
};

export const Deshabilitado: Story = {
  args: { variant: 'primary', disabled: true },
};
