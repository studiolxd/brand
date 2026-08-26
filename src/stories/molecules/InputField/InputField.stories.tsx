import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { InputField } from './InputField';
import { Container } from '../../atoms/Container/Container';

const meta: Meta<typeof InputField> = {
  title: 'Molecules/InputField',
  component: InputField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'nombre', label: 'Nombre completo', labelHidden: false },
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

export const SuperficieOscura: Story = {
  args: { errorMessage: 'Este campo es obligatorio.' },
  render: (args) => (
    <Container surface="dark" space="md">
      <div style={{ inlineSize: '20rem' }}><InputField {...args} /></div>
    </Container>
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
