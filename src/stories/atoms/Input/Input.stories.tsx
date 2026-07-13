import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slot } from '@radix-ui/react-slot';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'datetime-local'],
      description: 'Tipo HTML del input (unión nativa completa).',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Texto de placeholder.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el input.',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Input de solo lectura.',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input.',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Estado de error.',
    },
  },
  args: {
    placeholder: 'Escribe algo…',
    size: 'md',
    disabled: false,
    readOnly: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

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

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Input placeholder="Small" size="sm" />
      <Input placeholder="Medium" size="md" />
      <Input placeholder="Large" size="lg" />
    </div>
  ),
};

/** Navega con Tab hasta el input para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};

/**
 * Test: `forwardRef`. react-hook-form registra el campo con `{...register("x")}`,
 * que esparce `ref` — debe apuntar al `<input>` real para leer el valor (uncontrolled).
 */
export const RefForwarding: Story = {
  name: 'Test — forwardRef (react-hook-form)',
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div>
        <Input ref={ref} name="email" aria-label="email" />
        <button
          type="button"
          onClick={() => {
            const probe = document.getElementById('ref-probe');
            if (probe) probe.textContent = `${ref.current?.tagName}:${ref.current?.value}`;
          }}
        >
          probe
        </button>
        <span id="ref-probe" data-testid="ref-probe" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'email' });
    await userEvent.type(input, 'hola@studiolxd.com');
    await userEvent.click(canvas.getByRole('button', { name: 'probe' }));
    // el ref apunta al <input> real y lee el valor tecleado
    await expect(canvas.getByTestId('ref-probe')).toHaveTextContent('INPUT:hola@studiolxd.com');
  },
};

/**
 * Test: inyección estilo FormControl vía Radix Slot. `id`, `aria-describedby` y
 * `aria-invalid` inyectados por el Slot exterior aterrizan en el `<input>` real.
 */
export const SlotInjection: Story = {
  name: 'Test — inyección Slot (FormControl)',
  render: () => (
    <Slot id="email-input" aria-describedby="email-help" aria-invalid>
      <Input aria-label="email" />
    </Slot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'email' });
    await expect(input.tagName).toBe('INPUT');
    await expect(input).toHaveAttribute('id', 'email-input');
    await expect(input).toHaveAttribute('aria-describedby', 'email-help');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

/**
 * Test: `className` del consumidor al final, `data-*` passthrough y `type` nativo
 * completo (`date`).
 */
export const PropPassthrough: Story = {
  name: 'Test — className + data-* + type=date',
  render: () => (
    <Input type="date" className="extra" data-slot="input" aria-label="fecha" />
  ),
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')!;
    await expect(input).toHaveAttribute('type', 'date');
    await expect(input).toHaveClass('input', 'extra');
    // el className del consumidor va al final (añade, no sustituye)
    await expect(input.className.trim().endsWith('extra')).toBe(true);
    await expect(input).toHaveAttribute('data-slot', 'input');
  },
};
