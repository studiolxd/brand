import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Estado controlado — seleccionado o no.',
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: 'Estado inicial sin controlar.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el radio.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  name: 'Unchecked',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo" value="a" aria-label="Opción A" />
      <Radio name="demo" value="b" aria-label="Opción B" />
      <Radio name="demo" value="c" aria-label="Opción C" />
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo-checked" value="a" aria-label="Opción A" defaultChecked />
      <Radio name="demo-checked" value="b" aria-label="Opción B" />
      <Radio name="demo-checked" value="c" aria-label="Opción C" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo-disabled" value="a" aria-label="Opción A" disabled />
      <Radio name="demo-disabled" value="b" aria-label="Opción B" disabled />
      <Radio name="demo-disabled" value="c" aria-label="Opción C" disabled />
    </div>
  ),
};

export const DisabledChecked: Story = {
  name: 'Disabled checked',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo-disabled-checked" value="a" aria-label="Opción A" defaultChecked disabled />
      <Radio name="demo-disabled-checked" value="b" aria-label="Opción B" disabled />
      <Radio name="demo-disabled-checked" value="c" aria-label="Opción C" disabled />
    </div>
  ),
};

/** Navega con Tab hasta el radio para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo-focus" value="a" aria-label="Opción A" />
      <Radio name="demo-focus" value="b" aria-label="Opción B" />
      <Radio name="demo-focus" value="c" aria-label="Opción C" />
    </div>
  ),
  parameters: { pseudo: { focusVisible: true } },
};

/**
 * Test: `className` del consumidor al final, `data-*` passthrough y que el
 * elemento sigue siendo `input[type=radio]` (type fijo, no sobreescribible).
 */
export const PropPassthrough: Story = {
  name: 'Test — className + data-* passthrough',
  render: () => (
    <Radio name="pp" value="a" aria-label="opción" className="extra" data-slot="radio" />
  ),
  play: async ({ canvasElement }) => {
    const radio = canvasElement.querySelector('input')!;
    await expect(radio).toHaveAttribute('type', 'radio');
    await expect(radio).toHaveClass('radio', 'extra');
    await expect(radio.className.trim().endsWith('extra')).toBe(true);
    await expect(radio).toHaveAttribute('data-slot', 'radio');
  },
};
