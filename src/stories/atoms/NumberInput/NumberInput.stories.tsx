import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { useState } from 'react';
import { NumberInput } from './NumberInput';

const meta = {
  title: 'Atoms/NumberInput',
  component: NumberInput,
  parameters: { layout: 'centered' },
  args: {
    defaultValue: 0,
    step: 1,
    disabled: false,
    readOnly: false,
    error: false,
    size: 'md',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithMinMax: Story = {
  args: {
    defaultValue: 5,
    min: 0,
    max: 10,
  },
};

export const Error: Story = {
  args: { error: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 3 },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 7 },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <NumberInput {...args} size="sm" defaultValue={0} />
      <NumberInput {...args} size="md" defaultValue={0} />
      <NumberInput {...args} size="lg" defaultValue={0} />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <NumberInput {...args} value={val} onChange={setVal} />
        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>valor: {val}</span>
      </div>
    );
  },
};

/**
 * Test: las etiquetas accesibles de los botones usan el castellano por defecto
 * y se sustituyen por completo cuando el consumidor las pasa traducidas.
 */
export const Etiquetas: Story = {
  name: 'Test — etiquetas accesibles',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <NumberInput defaultValue={1} />
      </div>
      <div data-testid="traducido">
        <NumberInput defaultValue={1} decrementLabel="Decrease" incrementLabel="Increase" />
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Decrementar')).toBeInTheDocument();
    await expect(def.getByLabelText('Incrementar')).toBeInTheDocument();

    const es = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(es.getByLabelText('Decrease')).toBeInTheDocument();
    await expect(es.getByLabelText('Increase')).toBeInTheDocument();
    await expect(es.queryByLabelText('Decrementar')).toBeNull();
  },
};

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><NumberInput size="sm" defaultValue={0} aria-label="sm" /></div>
      <div data-t="md"><NumberInput size="md" defaultValue={0} aria-label="md" /></div>
      <div data-t="lg"><NumberInput size="lg" defaultValue={0} aria-label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    await expect(alto('[data-t="sm"] .number-input')).toBe(32);
    await expect(alto('[data-t="md"] .number-input')).toBe(40);
    await expect(alto('[data-t="lg"] .number-input')).toBe(48);
  },
};

/** El campo hereda el modo oscuro del `Input`; los botones +/− llevan par propio. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { defaultValue: 5, min: 0, max: 10 },
};
