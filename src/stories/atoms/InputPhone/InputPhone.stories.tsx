import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputPhone } from './InputPhone';

const meta: Meta<typeof InputPhone> = {
  title: 'Atoms/InputPhone',
  component: InputPhone,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    disabled:       { control: { type: 'boolean' } },
    error:          { control: { type: 'boolean' } },
    dark: {
      control: { type: 'boolean' },
      description: 'Aplica estilos oscuros al dropdown de país (portal Radix fuera del árbol DOM — no hereda `.surface-dark` por cascade).',
    },
    defaultCountry: { control: { type: 'text' } },
    placeholder:    { control: { type: 'text' } },
  },
  args: {
    defaultCountry: 'ES',
    placeholder:    'Escribe tu número de teléfono',
    disabled:       false,
    error:          false,
    dark:           false,
  },
};

export default meta;
type Story = StoryObj<typeof InputPhone>;

export const Default: Story = {};

export const Error: Story = {
  args: { error: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Navega con Tab hasta el input para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
