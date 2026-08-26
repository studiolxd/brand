import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { TextareaField } from './TextareaField';
import { Container } from '../../atoms/Container/Container';

const meta: Meta<typeof TextareaField> = {
  title: 'Molecules/TextareaField',
  component: TextareaField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'mensaje', label: 'Mensaje' },
  render: (args) => <div style={{ inlineSize: '24rem' }}><TextareaField {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof TextareaField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { defaultValue: 'Buenos días:' } };

export const ConAyuda: Story = {
  args: { helperText: 'Máximo 500 caracteres.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Este campo es obligatorio.', helperText: 'Máximo 500 caracteres.' },
};

export const Deshabilitado: Story = { args: { disabled: true, defaultValue: 'No se puede editar' } };

/** Etiqueta oculta a la vista, presente para el lector de pantalla. Al ocultarla, el placeholder toma su texto. */
export const EtiquetaOculta: Story = { args: { labelHidden: true } };

/** Las tallas cambian el cuerpo de letra y el aire; la altura la manda el contenido. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '24rem' }}>
      <TextareaField {...args} id="talla-sm" size="sm" label="Pequeño" />
      <TextareaField {...args} id="talla-md" size="md" label="Mediano" />
      <TextareaField {...args} id="talla-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const SuperficieOscura: Story = {
  args: { errorMessage: 'Este campo es obligatorio.' },
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ inlineSize: '24rem' }}><TextareaField {...args} /></div>
    </Container>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('textbox', { name: 'Mensaje' });
    await expect(control.tagName).toBe('TEXTAREA');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'mensaje-error mensaje-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'mensaje-helper');
  },
};

export const ContratoEtiqueta: Story = {
  name: 'Test — la etiqueta se ve por defecto',
  tags: ['!dev'],
  render: () => (
    <div style={{ inlineSize: '24rem' }}>
      <TextareaField id="e-visible" label="Visible" />
      <TextareaField id="e-oculta" label="Oculta" labelHidden />
      <TextareaField id="e-oculta-ph" label="Oculta con placeholder" labelHidden placeholder="Propio" />
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
