import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Select } from './Select';

const options = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    dark: {
      control: { type: 'boolean' },
      description: 'Aplica estilos oscuros al dropdown (portal Radix fuera del árbol DOM — no hereda `.surface-dark` por cascade).',
    },
  },
  args: {
    options,
    placeholder: 'Seleccionar…',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

/**
 * Test: API compuesta. El `data-*`/`aria-*` del consumidor aterriza en el trigger
 * (criterio 2); una opción renderiza JSX libre (criterio 3); mismas clases que el
 * Select cerrado.
 */
export const Composition: Story = {
  name: 'Test — partes compuestas',
  render: () => (
    <Select.Root defaultValue="a">
      <Select.Trigger data-slot="select-trigger" aria-label="Idioma" aria-describedby="help" aria-invalid>
        <Select.Value placeholder="Elige" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Idiomas</Select.Label>
          <Select.Item value="a"><em>rico</em></Select.Item>
          <Select.Item value="b">plano</Select.Item>
        </Select.Group>
        <Select.Separator />
      </Select.Content>
    </Select.Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    // mismas clases que el cerrado + rest del consumidor en el trigger
    await expect(trigger).toHaveClass('select');
    await expect(trigger).toHaveAttribute('data-slot', 'select-trigger');
    await expect(trigger).toHaveAttribute('aria-describedby', 'help');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');
    // abrir el dropdown (portal en document.body) y verificar el JSX de la opción
    await userEvent.click(trigger);
    const listbox = within(document.body).getByRole('listbox');
    await expect(within(listbox).getByText('rico').tagName).toBe('EM');
    // la opción usa la clase del DS
    await expect(within(listbox).getByText('plano').closest('.select__item')).not.toBeNull();
    // cerrar el dropdown: el escaneo a11y corre al final; con el Select abierto Radix
    // marca el fondo con aria-hidden (estado transitorio, no un defecto del componente)
    await userEvent.keyboard('{Escape}');
    await expect(within(document.body).queryByRole('listbox')).toBeNull();
  },
};

/** Uso controlado con onValueChange — el valor seleccionado se muestra debajo */
export const Controlled: Story = {
  name: 'Controlled (onValueChange)',
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Select options={options} placeholder="Seleccionar…" value={value} onValueChange={setValue} />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Valor: <strong>{value || '(ninguno)'}</strong>
        </p>
      </div>
    );
  },
};

export const WithValue: Story = {
  args: { defaultValue: 'es' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'es' },
};

/** Navega con Tab hasta el select para verificar el focus ring */
export const FocusVisible: Story = {
  name: 'Focus visible',
  parameters: { pseudo: { focusVisible: true } },
};
