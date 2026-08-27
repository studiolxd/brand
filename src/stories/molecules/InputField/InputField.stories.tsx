import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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
