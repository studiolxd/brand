import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelectField } from './MultiSelectField';

const options = [
  { value: 'design', label: 'Diseño' },
  { value: 'dev', label: 'Desarrollo' },
  { value: 'branding', label: 'Branding' },
  { value: 'strategy', label: 'Estrategia' },
  { value: 'motion', label: 'Motion' },
];

const meta: Meta<typeof MultiSelectField> = {
  title: 'Molecules/MultiSelectField',
  component: MultiSelectField,
  parameters: {
    layout: 'padded',
  },
  args: {
    id: 'services',
    label: 'Servicios',
    options,
    placeholder: 'Seleccionar servicios…',
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectField>;

export const Default: Story = {};

export const WithValue: Story = {
  name: 'With default value',
  args: { defaultValue: ['design', 'dev'] },
};

export const WithHelper: Story = {
  name: 'With helper text',
  args: { helperText: 'Puedes seleccionar varios servicios.' },
};

export const WithError: Story = {
  name: 'With error',
  args: {
    error: true,
    errorMessage: 'Selecciona al menos un servicio.',
    helperText: 'Este campo es obligatorio.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['design', 'branding'] },
};

export const LabelHidden: Story = {
  name: 'Label hidden',
  args: { labelHidden: true, defaultValue: ['dev'] },
};

export const Controlled: Story = {
  name: 'Controlled',
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <MultiSelectField
          id="services-controlled"
          label="Servicios"
          options={options}
          placeholder="Seleccionar servicios…"
          value={value}
          onValueChange={setValue}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Seleccionados: <strong>{value.length ? value.join(', ') : '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};
