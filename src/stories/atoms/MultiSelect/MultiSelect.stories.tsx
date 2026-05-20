import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'design', label: 'Diseño' },
  { value: 'dev', label: 'Desarrollo' },
  { value: 'branding', label: 'Branding' },
  { value: 'strategy', label: 'Estrategia' },
  { value: 'motion', label: 'Motion' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Atoms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    dark: {
      control: { type: 'boolean' },
      description: 'Aplica estilos oscuros al dropdown (portal Radix fuera del árbol DOM — no hereda `.surface-dark` por cascade).',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    options,
    placeholder: 'Seleccionar…',
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {};

/** Uso controlado con onValueChange */
export const Controlled: Story = {
  name: 'Controlled (onValueChange)',
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <MultiSelect options={options} placeholder="Seleccionar…" value={value} onValueChange={setValue} />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Valores: <strong>{value.length ? value.join(', ') : '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};

/** Con valores preseleccionados — pills visibles en el trigger */
export const WithDefaultValue: Story = {
  name: 'With default value',
  args: { defaultValue: ['design', 'dev'] },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['design', 'branding'] },
};

export const ReadOnly: Story = {
  name: 'Read only',
  args: { readOnly: true, defaultValue: ['design', 'dev'] },
};

export const SmSize: Story = {
  name: 'Size sm',
  args: { size: 'sm', defaultValue: ['design'] },
};

export const LgSize: Story = {
  name: 'Size lg',
  args: { size: 'lg', defaultValue: ['design', 'dev'] },
};
