import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { MultiSelect } from './MultiSelect';

const options = [
  { value: 'design', label: 'Diseño' },
  { value: 'dev', label: 'Desarrollo' },
  { value: 'branding', label: 'Branding' },
  { value: 'strategy', label: 'Estrategia' },
  { value: 'motion', label: 'Motion' },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Atoms/MultiSelect',
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

/** Sobre banda oscura: caja, píldoras y desplegable con su par oscuro. */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { defaultValue: ['design', 'dev'] },
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

/** Test: el teclado completo del patrón combobox, sin mover el foco del DOM. */
export const ContratoTeclado: Story = {
  name: 'Test — teclado del combobox',
  tags: ['!dev'],
  render: () => <MultiSelect options={options} aria-label="Servicios" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', { name: 'Servicios' });
    // El panel se monta en un portal de Base UI, fuera del canvas de la story
    const body = within(canvasElement.ownerDocument.body);

    combobox.focus();
    await expect(combobox).toHaveAttribute('aria-expanded', 'false');

    // La flecha abajo abre y activa la primera opción
    await userEvent.keyboard('{ArrowDown}');
    await expect(combobox).toHaveAttribute('aria-expanded', 'true');
    const opciones = body.getAllByRole('option');
    await expect(opciones).toHaveLength(options.length);
    // El foco no se mueve del combobox: la opción activa va por activedescendant
    await expect(combobox).toHaveFocus();
    await expect(combobox).toHaveAttribute('aria-activedescendant', opciones[0].id);

    // Fin e Inicio saltan a los extremos
    await userEvent.keyboard('{End}');
    await expect(combobox).toHaveAttribute('aria-activedescendant', opciones.at(-1)!.id);
    await userEvent.keyboard('{Home}');
    await expect(combobox).toHaveAttribute('aria-activedescendant', opciones[0].id);

    // Escribir una letra salta a la opción que empieza por ella
    await userEvent.keyboard('b');
    await expect(combobox).toHaveAttribute(
      'aria-activedescendant',
      opciones[options.findIndex((o) => o.label === 'Branding')].id,
    );

    // Intro marca la activa
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('Branding')).toBeInTheDocument();

    // Escape cierra sin perder el foco
    await userEvent.keyboard('{Escape}');
    await expect(combobox).toHaveAttribute('aria-expanded', 'false');
    await expect(combobox).toHaveFocus();
  },
};

/** Test: el aspa de una píldora es un control y vive fuera del `role="combobox"`. */
export const ContratoPildorasFuera: Story = {
  name: 'Test — el aspa de la píldora queda fuera del combobox',
  tags: ['!dev'],
  render: () => <MultiSelect options={options} defaultValue={['design']} aria-label="Servicios" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', { name: 'Servicios' });
    const aspa = canvas.getByRole('button', { name: 'Quitar Diseño' });
    // Un combobox no admite controles dentro: el aspa es hermana, no hija
    await expect(combobox.contains(aspa)).toBe(false);
    await userEvent.click(aspa);
    await expect(canvas.queryByText('Diseño')).toBeNull();
  },
};
