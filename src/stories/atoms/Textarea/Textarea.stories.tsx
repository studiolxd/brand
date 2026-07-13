import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder.',
    },
    rows: {
      control: { type: 'number' },
      description: 'Número de filas visibles.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el textarea.',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Textarea de solo lectura.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error.',
    },
  },
  args: {
    placeholder: 'Escribe algo…',
    disabled: false,
    readOnly: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
};

export const Error: Story = {
  args: { error: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ReadOnly: Story = {
  name: 'Read only',
  args: { readOnly: true, value: 'Valor de solo lectura' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Textarea placeholder="Small" size="sm" />
      <Textarea placeholder="Medium" size="md" />
      <Textarea placeholder="Large" size="lg" />
    </div>
  ),
};

/** Navega con Tab hasta el textarea para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

/**
 * Test: `className` del consumidor al final, `data-*` passthrough y atributos
 * nativos (`maxLength`, `aria-describedby`) que la lista cerrada anterior descartaba.
 */
export const PropPassthrough: Story = {
  name: 'Test — className + data-* passthrough',
  render: () => (
    <Textarea
      className="extra"
      data-slot="textarea"
      aria-label="mensaje"
      aria-describedby="msg-help"
      maxLength={200}
    />
  ),
  play: async ({ canvasElement }) => {
    const textarea = canvasElement.querySelector('textarea')!;
    await expect(textarea).toHaveClass('textarea', 'extra');
    await expect(textarea.className.trim().endsWith('extra')).toBe(true);
    await expect(textarea).toHaveAttribute('data-slot', 'textarea');
    await expect(textarea).toHaveAttribute('aria-describedby', 'msg-help');
    await expect(textarea).toHaveAttribute('maxlength', '200');
  },
};
