import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { MultiSelect } from './MultiSelect';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';

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

/**
 * Test: el teclado del `Select` múltiple de Base UI. Al abrir, el foco pasa a
 * la lista (no hay foco virtual): la opción activa es la enfocada, y Base UI
 * la marca con `data-highlighted`. Escape cierra y devuelve el foco a la caja.
 */
export const ContratoTeclado: Story = {
  name: 'Test — teclado del combobox',
  tags: ['!dev'],
  render: () => <MultiSelect options={options} aria-label="Servicios" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole('combobox', { name: 'Servicios' });
    // El panel se monta en un portal de Base UI, fuera del canvas de la story
    const body = within(canvasElement.ownerDocument.body);
    const activa = () => canvasElement.ownerDocument.activeElement;

    combobox.focus();
    await expect(combobox).toHaveAttribute('aria-expanded', 'false');

    // La flecha abajo abre y activa la primera opción
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(combobox).toHaveAttribute('aria-expanded', 'true'));
    const opciones = await body.findAllByRole('option');
    await expect(opciones).toHaveLength(options.length);
    await waitFor(() => expect(activa()).toBe(opciones[0]));
    await expect(opciones[0]).toHaveAttribute('data-highlighted');

    // Fin e Inicio saltan a los extremos
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(activa()).toBe(opciones.at(-1)));
    await userEvent.keyboard('{Home}');
    await waitFor(() => expect(activa()).toBe(opciones[0]));

    // Escribir una letra salta a la opción que empieza por ella
    await userEvent.keyboard('b');
    await waitFor(() =>
      expect(activa()).toBe(opciones[options.findIndex((o) => o.label === 'Branding')]),
    );

    // Intro marca la activa, y la lista sigue abierta (selección múltiple)
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(canvas.getByText('Branding')).toBeInTheDocument());
    await expect(opciones[options.findIndex((o) => o.label === 'Branding')]).toHaveAttribute('aria-selected', 'true');
    await expect(combobox).toHaveAttribute('aria-expanded', 'true');

    // Escape cierra y devuelve el foco a la caja
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(combobox).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(combobox).toHaveFocus());
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

/**
 * El marcador de sitio y el nombre del aspa de cada ficha son cromo del
 * sistema y **no tienen valor por defecto**: salen del `BrandMessagesProvider`.
 * Esta story lo tapa con uno en inglés — fíjate en que la etiqueta de la ficha
 * («Diseño») sigue en castellano: es un dato de las opciones, no un texto del
 * catálogo.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <MultiSelect options={options} defaultValue={['design']} aria-label="Skills" />
    </BrandMessagesProvider>
  ),
};

/** Test: sin props, el marcador y el aspa leen del proveedor. */
export const ContratoProveedor: Story = {
  name: 'Test — el marcador y el aspa leen del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <MultiSelect options={options} defaultValue={['design']} aria-label="Skills" />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Remove Diseño' })).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: 'Quitar Diseño' })).toBeNull();
  },
};
