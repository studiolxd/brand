import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { Autocomplete } from './Autocomplete';
import type { AutocompleteOption } from './Autocomplete';

const PRODUCTOS: AutocompleteOption[] = [
  { value: 'leche', label: 'Leche entera' },
  { value: 'lentejas', label: 'Lentejas pardinas' },
  { value: 'lechuga', label: 'Lechuga' },
  { value: 'cafe', label: 'Café molido' },
  { value: 'pan', label: 'Pan de molde' },
  { value: 'platano', label: 'Plátano de Canarias' },
];

function buscar(query: string): Promise<AutocompleteOption[]> {
  return new Promise(resolve =>
    setTimeout(() => {
      const q = query.toLowerCase();
      resolve(PRODUCTOS.filter(p => p.label.toLowerCase().includes(q)));
    }, 400),
  );
}

const meta: Meta<typeof Autocomplete> = {
  title: 'Atoms/Autocomplete',
  component: Autocomplete,
  parameters: { layout: 'padded' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: {
    options: PRODUCTOS,
    placeholder: 'Añadir producto…',
    'aria-label': 'Producto',
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

/** Sugerencias síncronas: la lista es fija y el control la filtra por lo escrito. */
export const Default: Story = {};

/** Sugerencias que llegan de un servidor: `onSearch` con rebote y un spinner mientras tarda. */
export const Asincrono: Story = {
  name: 'Asíncrono',
  args: { options: undefined, onSearch: buscar },
};

/** El valor es lo escrito: se puede quedar con un texto que no coincide con ninguna sugerencia. */
export const TextoLibre: Story = {
  name: 'Texto libre',
  render: (args) => {
    const [texto, setTexto] = useState('');
    const [elegida, setElegida] = useState<AutocompleteOption | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
        <Autocomplete
          {...args}
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

export const ConValorInicial: Story = {
  name: 'Con valor inicial',
  args: { defaultValue: 'Pan de molde' },
};

export const Deshabilitado: Story = { args: { defaultValue: 'Café molido', disabled: true } };

export const ConError: Story = { args: { defaultValue: 'xx', error: true } };

/** Las tres tallas del sistema: el control mide 32, 40 y 48. */
export const Tallas: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', inlineSize: '22rem' }}>
      <Autocomplete {...args} size="sm" aria-label="Pequeño" />
      <Autocomplete {...args} size="md" aria-label="Mediano" />
      <Autocomplete {...args} size="lg" aria-label="Grande" />
    </div>
  ),
};

export const TestTeclado: Story = {
  name: 'Test — teclado de combobox y texto libre',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const input = canvas.getByRole('combobox', { name: 'Producto' });

    await userEvent.type(input, 'le');
    // La lista sale por un portal que puede no existir aún: se espera, no se busca.
    const lista = await body.findByRole('listbox');
    await waitFor(() => expect(input).toHaveAttribute('aria-controls', lista.id));
    await expect(await body.findAllByRole('option')).toHaveLength(3);

    await userEvent.keyboard('{ArrowDown}{ArrowDown}');
    const activa = (await body.findAllByRole('option'))[1];
    await waitFor(() => expect(input).toHaveAttribute('aria-activedescendant', activa.id));
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(input).toHaveValue('Lentejas pardinas'));
    await waitFor(() => expect(body.queryByRole('listbox')).toBeNull());

    // Texto libre: lo que no coincide con nada se queda tal cual.
    await userEvent.clear(input);
    await userEvent.type(input, 'zzz');
    await expect(input).toHaveValue('zzz');
    await expect(body.queryByRole('listbox')).toBeNull();
  },
};
