import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { AutocompleteField } from './AutocompleteField';
import type { AutocompleteOption } from './AutocompleteField';

const PRODUCTOS: AutocompleteOption[] = [
  { value: 'leche', label: 'Leche entera' },
  { value: 'lentejas', label: 'Lentejas pardinas' },
  { value: 'lechuga', label: 'Lechuga' },
  { value: 'cafe', label: 'Café molido' },
  { value: 'pan', label: 'Pan de molde' },
];

function buscar(query: string): Promise<AutocompleteOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(PRODUCTOS.filter(p => p.label.toLowerCase().includes(q)));
    }, 400),
  );
}

const meta: Meta<typeof AutocompleteField> = {
  title: 'Molecules/AutocompleteField',
  component: AutocompleteField,
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  parameters: { layout: 'padded' },
  args: {
    id: 'producto',
    label: 'Producto',
    options: PRODUCTOS,
    placeholder: 'Añadir producto…',
  },
};

export default meta;
type Story = StoryObj<typeof AutocompleteField>;

export const PorDefecto: Story = {};

export const Asincrono: Story = {
  name: 'Asíncrono',
  args: { options: undefined, onSearch: buscar },
};

export const ConValor: Story = { args: { defaultValue: 'Pan de molde' } };

export const ConAyuda: Story = {
  args: { helperText: 'Elige una sugerencia o escribe el nombre que quieras.' },
};

/** El error se dice en texto y en el borde; nunca solo en color. */
export const ConError: Story = {
  args: {
    defaultValue: '',
    errorMessage: 'Escribe un producto.',
    helperText: 'Elige una sugerencia o escribe el nombre que quieras.',
  },
};

export const Deshabilitado: Story = { args: { defaultValue: 'Café molido', disabled: true } };

export const EtiquetaOculta: Story = { args: { labelHidden: true } };

export const Controlado: Story = {
  render: (args) => {
    const [texto, setTexto] = useState('');
    const [elegida, setElegida] = useState<AutocompleteOption | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
        <AutocompleteField
          {...args}
          id="producto-controlado"
          value={texto}
          onValueChange={(v) => { setTexto(v); setElegida(null); }}
          onSelect={setElegida}
        />
        <p style={{ margin: 0, fontSize: '0.875rem' }}>
          Texto: <strong>{texto || '(vacío)'}</strong><br />
          Sugerencia elegida: <strong>{elegida?.value ?? '(ninguna: texto libre)'}</strong>
        </p>
      </div>
    );
  },
};

/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
      <AutocompleteField {...args} id="ac-sm" size="sm" label="Pequeño" />
      <AutocompleteField {...args} id="ac-md" size="md" label="Mediano" />
      <AutocompleteField {...args} id="ac-lg" size="lg" label="Grande" />
    </div>
  ),
};

export const Contrato: Story = {
  name: 'Test — etiqueta, ayuda y error enlazados al control',
  tags: ['!dev'],
  args: { helperText: 'Ayuda', errorMessage: 'Obligatorio' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const control = canvas.getByRole('combobox', { name: 'Producto' });
    await expect(control).toHaveAttribute('id', 'producto');
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    await expect(control).toHaveAttribute('aria-describedby', 'producto-error producto-helper');
    await expect(canvasElement.querySelector('.autocomplete')).toHaveClass('autocomplete--error');
    await expect(canvas.getByRole('alert')).toHaveTextContent('Obligatorio');
    await expect(canvas.getByText('Ayuda')).toHaveAttribute('id', 'producto-helper');
  },
};

export const ContratoElegir: Story = {
  name: 'Test — elegir rellena el texto y el texto libre se queda',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Producto' });
    await userEvent.type(input, 'caf');
    const opcion = await within(document.body).findByRole('option', { name: 'Café molido' });
    await userEvent.click(opcion);
    await waitFor(() => expect(input).toHaveValue('Café molido'));
    await userEvent.clear(input);
    await userEvent.type(input, 'Bizcochos');
    await expect(input).toHaveValue('Bizcochos');
  },
};
