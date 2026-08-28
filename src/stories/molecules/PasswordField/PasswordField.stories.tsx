import type React from 'react';
import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRender } from '@base-ui-components/react/use-render';
import { expect, userEvent, within } from 'storybook/test';
import { PasswordField } from './PasswordField';

/**
 * Inyecta props sobre su hijo con `useRender` de Base UI, igual que hace el
 * `FormControl` del DS.
 */
function RenderInjector({
  children,
  ...props
}: { children: React.ReactElement<Record<string, unknown>> } & Record<string, unknown>) {
  return useRender({ render: children, props });
}

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

/** Con una acción bajo el campo: el enlace de recuperación, como enlace normal y con su aire. */
export const ConAccion: Story = {
  args: { label: 'Contraseña', labelHidden: false, action: <a href="#recuperar">¿Olvidaste tu contraseña?</a> },
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
  tags: ['!dev'],
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
 * Test: inyección estilo FormControl vía `useRender` de Base UI en modo
 * solo-campo. `id`, `aria-describedby` y `aria-invalid` aterrizan en el
 * `<input>`; el toggle sigue cableado (`aria-controls`) al `id` inyectado.
 */
export const RenderInjection: Story = {
  name: 'Test — inyección render (FormControl)',
  tags: ['!dev'],
  render: () => (
    <RenderInjector id="pw-input" aria-describedby="pw-desc" aria-invalid>
      <PasswordField aria-label="password" />
    </RenderInjector>
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
  tags: ['!dev'],
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

/** Test: el control mide la talla del sistema (32/40/48), como Button y Select. */
export const ContratoTalla: Story = {
  name: 'Test — talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div>
      <div data-t="sm"><PasswordField size="sm" label="sm" /></div>
      <div data-t="md"><PasswordField size="md" label="md" /></div>
      <div data-t="lg"><PasswordField size="lg" label="lg" /></div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const alto = (sel: string) =>
      Math.round(canvasElement.querySelector(sel)!.getBoundingClientRect().height);
    // el campo mide la talla y el botón de ver/ocultar es cuadrado a esa misma talla
    for (const [t, h] of [['sm', 32], ['md', 40], ['lg', 48]] as const) {
      await expect(alto(`[data-t="${t}"] .input`)).toBe(h);
      await expect(alto(`[data-t="${t}"] .password-field__toggle`)).toBe(h);
    }
  },
};

export const ContratoError: Story = {
  name: 'Test — errorMessage marca el control en error',
  tags: ['!dev'],
  args: { label: 'Contraseña', labelHidden: false, errorMessage: 'Incluye al menos un número.' },
  play: async ({ canvasElement }) => {
    const input = canvasElement.querySelector('input')!;
    await expect(input).toHaveClass('input--error');
    await expect(canvasElement.querySelector('[role="alert"]')).toHaveTextContent('Incluye al menos un número.');
  },
};

/** Campo, etiqueta y ayuda heredan el modo oscuro del `InputField`; el ojo es un `Button ghost`. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
};
