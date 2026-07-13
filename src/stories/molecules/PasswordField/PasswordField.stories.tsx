import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slot } from '@radix-ui/react-slot';
import { expect, userEvent, within } from 'storybook/test';
import { PasswordField } from './PasswordField';

const meta: Meta<typeof PasswordField> = {
  title: 'Molecules/PasswordField',
  component: PasswordField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: { control: { type: 'text' } },
    labelHidden: { control: { type: 'boolean' } },
    placeholder: { control: { type: 'text' } },
    helperText: { control: { type: 'text' } },
    errorMessage: { control: { type: 'text' } },
    error: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    showPasswordLabel: { control: { type: 'text' } },
    hidePasswordLabel: { control: { type: 'text' } },
  },
  args: {
    id: 'password',
    label: 'Contraseña',
    labelHidden: true,
    disabled: false,
    error: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

export const LabelVisible: Story = {
  args: { labelHidden: false },
};

export const WithHelper: Story = {
  args: {
    helperText: 'Mínimo 8 caracteres, una mayúscula y un número.',
  },
};

export const WithError: Story = {
  args: {
    error: true,
    errorMessage: 'La contraseña es incorrecta.',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'secreto123' },
};

export const ToggleVisibility: Story = {
  args: { defaultValue: 'mi-contraseña-secreta' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Contraseña');
    const toggle = canvas.getByRole('button', { name: 'Mostrar contraseña' });

    await expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'text');
    await expect(canvas.getByRole('button', { name: 'Ocultar contraseña' })).toBeInTheDocument();

    await userEvent.click(toggle);
    await expect(input).toHaveAttribute('type', 'password');
  },
};

/**
 * Test: modo "solo campo" (sin `label`) + `forwardRef` (react-hook-form).
 * No se renderiza ningún `<label>` ni error/helper propio; el `ref` apunta al
 * `<input>` real y lee el valor tecleado.
 */
export const FieldOnly: Story = {
  name: 'Test — field-only + forwardRef',
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <div>
        <PasswordField ref={ref} name="password" aria-label="password" className="extra" data-slot="pw" />
        <button
          type="button"
          onClick={() => {
            const probe = document.getElementById('pw-probe');
            if (probe) probe.textContent = `${ref.current?.tagName}:${ref.current?.type}:${ref.current?.value}`;
          }}
        >
          probe
        </button>
        <span id="pw-probe" data-testid="pw-probe" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // sin label → cero <label> ni texto propio de error/helper
    await expect(canvasElement.querySelector('label')).toBeNull();
    // className al final del wrapper raíz; data-* al input
    await expect(canvasElement.querySelector('.password-field')).toHaveClass('password-field', 'extra');
    const input = canvas.getByLabelText('password');
    await expect(input).toHaveAttribute('data-slot', 'pw');
    await userEvent.type(input, 'secreto');
    await userEvent.click(canvas.getByRole('button', { name: 'probe' }));
    // el ref apunta al <input> real y lee el valor
    await expect(canvas.getByTestId('pw-probe')).toHaveTextContent('INPUT:password:secreto');
  },
};

/**
 * Test: inyección estilo FormControl vía Radix Slot en modo solo-campo. `id`,
 * `aria-describedby` y `aria-invalid` aterrizan en el `<input>`; el toggle sigue
 * cableado (`aria-controls`) al `id` inyectado.
 */
export const SlotInjection: Story = {
  name: 'Test — inyección Slot (FormControl)',
  render: () => (
    <Slot id="pw-input" aria-describedby="pw-desc" aria-invalid>
      <PasswordField aria-label="password" />
    </Slot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('password');
    await expect(input.tagName).toBe('INPUT');
    await expect(input).toHaveAttribute('id', 'pw-input');
    await expect(input).toHaveAttribute('aria-describedby', 'pw-desc');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
    await expect(input).toHaveAttribute('type', 'password');
    await expect(canvas.getByRole('button', { name: 'Mostrar contraseña' })).toHaveAttribute('aria-controls', 'pw-input');
  },
};

/** Test: labels del toggle configurables (i18n) sustituyen los textos por defecto. */
export const CustomToggleLabels: Story = {
  name: 'Test — toggle labels i18n',
  args: {
    label: 'Password',
    showPasswordLabel: 'Show password',
    hidePasswordLabel: 'Hide password',
    defaultValue: 'secret',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('button', { name: 'Show password' });
    await userEvent.click(toggle);
    await expect(canvas.getByRole('button', { name: 'Hide password' })).toBeInTheDocument();
  },
};
