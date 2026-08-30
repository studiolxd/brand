import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'nombre', label: 'Nombre completo' },
  render: (args) => <div style={{ inlineSize: '20rem' }}><InputField {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { defaultValue: 'Ada Lovelace' } };

export const ConAyuda: Story = {
  args: { helperText: 'Escríbelo tal como aparece en tu DNI.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Este campo es obligatorio.', helperText: 'Escríbelo tal como aparece en tu DNI.' },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'Ada Lovelace' } };

/** Etiqueta oculta a la vista, presente para el lector de pantalla. Al ocultarla, el placeholder toma su texto. */
export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
      <InputField {...args} id="talla-sm" size="sm" label="Pequeño" />
      <InputField {...args} id="talla-md" size="md" label="Mediano" />
      <InputField {...args} id="talla-lg" size="lg" label="Grande" />
    </div>
  ),
};

/**
 * Campo de búsqueda: `type="text"` con la lupa fija al inicio — nunca
 * `type="search"`, que pinta el aspa del navegador. La lupa dice, sin texto,
 * que lo que se escribe filtra.
 */
export const Busqueda: Story = {
  args: { kind: 'search', label: 'Buscar', labelHidden: true },
};

/** Con `clearable`, el aspa —nuestra, del mismo trazo del set— aparece solo cuando hay texto: vacía el campo y devuelve el foco. */
export const BusquedaConBorrado: Story = {
  args: { kind: 'search', clearable: true, label: 'Buscar', labelHidden: true, defaultValue: 'Ada Lovelace' },
};

/** Las tres tallas de la variante: la lupa y el aspa acompañan a la altura del campo. */
export const BusquedaTallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '20rem' }}>
      <InputField id="b-sm" size="sm" kind="search" clearable label="Pequeño" labelHidden defaultValue="Ada" />
      <InputField id="b-md" size="md" kind="search" clearable label="Mediano" labelHidden defaultValue="Ada" />
      <InputField id="b-lg" size="lg" kind="search" clearable label="Grande" labelHidden defaultValue="Ada" />
    </div>
  ),
};

/** La misma variante sobre el lienzo oscuro: lupa y aspa toman la tinta blanca por token. */
export const BusquedaEnSuperficieOscura: Story = {
  name: 'Búsqueda en superficie oscura',
  parameters: { surface: 'dark' },
  args: { kind: 'search', clearable: true, label: 'Buscar', labelHidden: true, defaultValue: 'Ada Lovelace' },
};

export const ContratoBusqueda: Story = {
  name: 'Test — la variante de búsqueda no usa el campo nativo',
  tags: ['!dev'],
  args: { kind: 'search', label: 'Buscar', labelHidden: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Buscar' });
    // Nunca `type="search"`: el aspa del navegador está prohibida en todo brand
    await expect(control).toHaveAttribute('type', 'text');
    await expect(control).toHaveAttribute('autocomplete', 'off');
    await expect(control).toHaveAttribute('enterkeyhint', 'search');
    // La lupa va siempre a la vista, aunque el campo esté vacío
    await expect(canvasElement.querySelector('.input-field__search-icon')).toBeInTheDocument();
    // Sin `clearable` no hay botón de borrado
    await expect(canvas.queryByRole('button', { name: 'Borrar' })).not.toBeInTheDocument();
  },
};

export const ContratoBorrado: Story = {
  name: 'Test — el aspa vacía el campo y devuelve el foco',
  tags: ['!dev'],
  args: { kind: 'search', clearable: true, label: 'Buscar', labelHidden: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Buscar' });
    // Vacío no hay nada que borrar: el aspa no está
    await expect(canvas.queryByRole('button', { name: 'Borrar' })).not.toBeInTheDocument();
    await userEvent.type(control, 'Ada');
    const clear = await canvas.findByRole('button', { name: 'Borrar' });
    await userEvent.click(clear);
    await expect(control).toHaveValue('');
    await expect(control).toHaveFocus();
    // Sin texto, el aspa vuelve a desaparecer
    await expect(canvas.queryByRole('button', { name: 'Borrar' })).not.toBeInTheDocument();
  },
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Nombre completo' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'nombre-error nombre-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'nombre-helper');
    await expect(Math.round(control.getBoundingClientRect().height)).toBe(40);
  },
};

export const ContratoTallas: Story = {
  name: 'Test — el control mide la talla del sistema',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '20rem' }}>
      <InputField id="c-sm" size="sm" label="Pequeño" />
      <InputField id="c-md" size="md" label="Mediano" />
      <InputField id="c-lg" size="lg" label="Grande" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(Math.round(canvas.getByRole('textbox', { name: 'Pequeño' }).getBoundingClientRect().height)).toBe(32);
    await expect(Math.round(canvas.getByRole('textbox', { name: 'Mediano' }).getBoundingClientRect().height)).toBe(40);
    await expect(Math.round(canvas.getByRole('textbox', { name: 'Grande' }).getBoundingClientRect().height)).toBe(48);
  },
};

export const ContratoEtiqueta: Story = {
  name: 'Test — la etiqueta se ve por defecto',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '20rem' }}>
      <InputField id="e-visible" label="Visible" />
      <InputField id="e-oculta" label="Oculta" labelHidden />
      <InputField id="e-oculta-ph" label="Oculta con placeholder" labelHidden placeholder="Propio" />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Por defecto la etiqueta es visible: sin `visually-hidden` y sin placeholder prestado
    const visible = canvasElement.querySelector('label[for="e-visible"]')!;
    await expect(visible).not.toHaveClass('visually-hidden');
    await expect(canvas.getByRole('textbox', { name: 'Visible' })).not.toHaveAttribute('placeholder');
    // Oculta: sigue nombrando el control y le presta su texto como placeholder
    await expect(canvasElement.querySelector('label[for="e-oculta"]')).toHaveClass('visually-hidden');
    await expect(canvas.getByRole('textbox', { name: 'Oculta' })).toHaveAttribute('placeholder', 'Oculta');
    // Un placeholder propio manda sobre la etiqueta
    await expect(canvas.getByRole('textbox', { name: 'Oculta con placeholder' })).toHaveAttribute('placeholder', 'Propio');
  },
};

/**
 * Test (B4, auditoría 2026-08-30): el aspa de borrar tenía `outline: none` y un
 * color de foco idéntico al de reposo — ningún indicador visible. Ahora el foco
 * de teclado pinta el anillo del sistema.
 */
export const ContratoFocoDelAspa: Story = {
  name: 'Test — anillo de foco del aspa',
  tags: ['!dev'],
  args: { kind: 'search', clearable: true, label: 'Buscar', labelHidden: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Buscar' });
    await userEvent.type(control, 'Ada');
    const aspa = await canvas.findByRole('button', { name: 'Borrar' });
    const enReposo = getComputedStyle(aspa).outlineStyle;
    await expect(enReposo).toBe('none');

    // El foco viene del teclado (venimos de escribir), que es lo que activa
    // `:focus-visible`.
    await userEvent.tab();
    await expect(aspa).toHaveFocus();

    const enFoco = getComputedStyle(aspa);
    await expect(enFoco.outlineStyle).toBe('solid');
    await expect(enFoco.outlineStyle).not.toBe(enReposo);
    await expect(parseFloat(enFoco.outlineWidth)).toBeGreaterThan(0);
    const fondo = getComputedStyle(control).backgroundColor;
    await expect(enFoco.outlineColor).not.toBe(fondo);
  },
};
