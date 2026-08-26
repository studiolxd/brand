import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'design', label: 'Diseño' },
  { value: 'dev', label: 'Desarrollo' },
  { value: 'branding', label: 'Branding' },
  { value: 'strategy', label: 'Estrategia' },
  { value: 'motion', label: 'Motion' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Por revisar/Atoms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
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

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><MultiSelect size="sm" options={options} aria-label="sm" /></div>
      <div data-t="md"><MultiSelect size="md" options={options} aria-label="md" /></div>
      <div data-t="lg"><MultiSelect size="lg" options={options} aria-label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    // sin pills, el trigger mide exactamente la talla; con varias líneas de pills crece
    await expect(alto('[data-t="sm"] .multi-select')).toBe(32);
    await expect(alto('[data-t="md"] .multi-select')).toBe(40);
    await expect(alto('[data-t="lg"] .multi-select')).toBe(48);
  },
};
