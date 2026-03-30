import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    dark: {
      control: { type: 'boolean' },
      description: 'Aplica estilos oscuros al dropdown (portal Radix fuera del árbol DOM — no hereda `.surface-dark` por cascade).',
    },
  },
  args: {
    options,
    placeholder: 'Seleccionar…',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

/** Uso controlado con onValueChange — el valor seleccionado se muestra debajo */
export const Controlled: Story = {
  name: 'Controlled (onValueChange)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Select options={options} placeholder="Seleccionar…" value={value} onValueChange={setValue} />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Valor: <strong>{value || '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};

export const WithValue: Story = {
  args: { defaultValue: 'es' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'es' },
};

/** Navega con Tab hasta el select para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
