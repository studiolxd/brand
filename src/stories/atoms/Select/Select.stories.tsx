import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Select, SelectRoot, SelectTrigger, SelectValue, SelectContent, SelectItem } from './Select';
import { Container } from '../Container/Container';

const options = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    container: { table: { disable: true } },
  },
  args: { options, placeholder: 'Seleccionar…', 'aria-label': 'Idioma' },
  render: (args) => <div style={{ inlineSize: '16rem' }}><Select {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof Select>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { defaultValue: 'es' } };

/** Las tres tallas del sistema: 32, 40 y 48 de alto. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '16rem' }}>
      <Select {...args} size="sm" defaultValue="es" />
      <Select {...args} size="md" defaultValue="es" />
      <Select {...args} size="lg" defaultValue="es" />
    </div>
  ),
};

/** Controlado: `value` + `onValueChange`. */
export const Controlado: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', inlineSize: '16rem' }}>
        <Select {...args} value={value} onValueChange={setValue} />
        <p style={{ margin: 0 }}>Valor: <strong>{value || '(ninguno)'}</strong></p>
      </div>
    );
  },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'es' } };

/** Compuesto: grupos, etiquetas de grupo, separadores y opciones con JSX. */
export const Compuesto: Story = {
  render: () => (
    <div style={{ inlineSize: '16rem' }}>
      <Select.Root defaultValue="es">
        <Select.Trigger aria-label="Idioma"><Select.Value placeholder="Elige" /></Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Europa</Select.Label>
            <Select.Item value="es">Español</Select.Item>
            <Select.Item value="fr">Français</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>América</Select.Label>
            <Select.Item value="pt-BR"><em>Português</em> (Brasil)</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  ),
};

export const SuperficieOscura: Story = {
  args: { defaultValue: 'es' },
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ inlineSize: '16rem' }}><Select {...args} /></div>
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — talla, combobox con nombre, elegir por teclado',
  tags: ['!dev'],
  render: (args) => (
    <div style={{ inlineSize: '16rem' }}>
      <Select {...args} size="sm" aria-label="Pequeño" />
      <Select {...args} aria-label="Idioma" aria-describedby="ayuda" aria-invalid />
      <Select {...args} size="lg" aria-label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(Math.round(canvas.getByRole('combobox', { name: 'Pequeño' }).getBoundingClientRect().height)).toBe(32);
    const md = canvas.getByRole('combobox', { name: 'Idioma' });
    await expect(Math.round(md.getBoundingClientRect().height)).toBe(40);
    await expect(Math.round(canvas.getByRole('combobox', { name: 'Grande' }).getBoundingClientRect().height)).toBe(48);
    await expect(md).toHaveAttribute('aria-describedby', 'ayuda');
    await expect(md).toHaveAttribute('aria-invalid', 'true');
    await userEvent.click(md);
    const listbox = await within(document.body).findByRole('listbox');
    await expect(within(listbox).getAllByRole('option')).toHaveLength(4);
    await userEvent.click(within(listbox).getByRole('option', { name: 'Français' }));
    await waitFor(() => expect(within(document.body).queryByRole('listbox')).toBeNull());
    await expect(md.textContent).toContain('Français');
  },
};

export const ContratoPartes: Story = {
  name: 'Test — partes compuestas y named exports (RSC)',
  tags: ['!dev'],
  render: () => (
    <SelectRoot defaultValue="a">
      <SelectTrigger aria-label="Opción" data-testid="trigger"><SelectValue /></SelectTrigger>
      <SelectContent>
        <SelectItem value="a"><em>rica</em></SelectItem>
        <SelectItem value="b">plana</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
  play: async ({ canvasElement }) => {
    await expect(Select.Trigger).toBe(SelectTrigger);
    const trigger = within(canvasElement).getByRole('combobox');
    await expect(trigger).toHaveClass('select');
    await expect(trigger).toHaveAttribute('data-testid', 'trigger');
    // el trigger muestra la etiqueta de la opción, no el valor crudo
    await expect(trigger.textContent).toContain('rica');
    await userEvent.click(trigger);
    const listbox = await within(document.body).findByRole('listbox');
    await expect(within(listbox).getByText('rica').tagName).toBe('EM');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(within(document.body).queryByRole('listbox')).toBeNull());
  },
};
