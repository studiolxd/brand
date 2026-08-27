import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SelectField } from './SelectField';

const options = [
  { value: '', label: 'Selecciona un tipo' },
  { value: 'full-time', label: 'Jornada completa' },
  { value: 'part-time', label: 'Media jornada' },
  { value: 'freelance', label: 'Autónomo' },
];

const meta: Meta<typeof SelectField> = {
  title: 'Molecules/SelectField',
  component: SelectField,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: { id: 'tipo-contrato', label: 'Tipo de contrato', options },
  render: (args) => <div style={{ inlineSize: '20rem' }}><SelectField {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof SelectField>;

export const PorDefecto: Story = {};

export const ConValor: Story = { args: { value: 'full-time' } };

export const ConAyuda: Story = {
  args: { helperText: 'El tipo de contrato determina la duración y las condiciones.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: { errorMessage: 'Este campo es obligatorio.', helperText: 'El tipo de contrato determina la duración y las condiciones.' },
};

export const Deshabilitado: Story = { args: { disabled: true, value: 'part-time' } };

/** Etiqueta oculta a la vista, presente para el lector de pantalla. */
export const EtiquetaOculta: Story = { args: { labelHidden: true } };

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Tipo de contrato' });
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'tipo-contrato-error tipo-contrato-helper');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'tipo-contrato-helper');
    await expect(Math.round(control.getBoundingClientRect().height)).toBe(40);
  },
};
