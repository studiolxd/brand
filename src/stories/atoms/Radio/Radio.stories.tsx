import type { Meta, StoryObj } from '@storybook/react-vite';
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
  name: 'Grupo sin selección',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo" value="a" aria-label="Opción A" />
      <Radio name="demo" value="b" aria-label="Opción B" />
      <Radio name="demo" value="c" aria-label="Opción C" />
    </div>
  ),
};

export const Checked: Story = {
  name: 'Con selección',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo-checked" value="a" aria-label="Opción A" defaultChecked />
      <Radio name="demo-checked" value="b" aria-label="Opción B" />
      <Radio name="demo-checked" value="c" aria-label="Opción C" />
    </div>
  ),
};

export const Disabled: Story = {
  name: 'Deshabilitado',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Radio name="demo-disabled" value="a" aria-label="Opción A" disabled />
      <Radio name="demo-disabled" value="b" aria-label="Opción B" disabled />
      <Radio name="demo-disabled" value="c" aria-label="Opción C" disabled />
    </div>
  ),
};

export const DisabledChecked: Story = {
  name: 'Deshabilitado con selección',
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
