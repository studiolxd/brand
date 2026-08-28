import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Stack } from '../../atoms/Stack/Stack';
import { SearchForm } from './SearchForm';

const meta = {
  title: 'Molecules/SearchForm',
  component: SearchForm,
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: { onSubmit: fn() },
};

/** Con la etiqueta a la vista, el botón se queda a la altura del campo. */
export const ConEtiquetaVisible: Story = {
  name: 'Con etiqueta visible',
  args: { label: 'Buscar en el sitio', labelHidden: false, onSubmit: fn() },
};

/** El campo con texto: no hay aspa de borrado, ni la del navegador ni propia. */
export const ConValor: Story = {
  name: 'Con valor',
  args: { defaultValue: 'diseño de sistemas', onSubmit: fn() },
};

export const Deshabilitado: Story = {
  args: { defaultValue: 'diseño de sistemas', disabled: true, onSubmit: fn() },
};

export const Tallas: Story = {
  args: { onSubmit: fn() },
  render: (args) => (
    <Stack gap="md">
      <SearchForm {...args} id="search-sm" size="sm" />
      <SearchForm {...args} id="search-md" size="md" />
      <SearchForm {...args} id="search-lg" size="lg" />
    </Stack>
  ),
};

/**
 * El buscador ocupa el ancho de su contenedor: dentro del panel del menú se
 * estira con él, y en una caja acotada se queda en su medida.
 */
export const AnchuraAcotada: Story = {
  name: 'Anchura acotada',
  args: { onSubmit: fn() },
  render: (args) => (
    <div style={{ maxWidth: '20rem' }}>
      <SearchForm {...args} />
    </div>
  ),
};

/** Su sitio real: el panel del menú del sitio, sobre superficie oscura. */
export const EnElPanelDelMenu: Story = {
  name: 'En el panel del menú',
  parameters: { surface: 'dark' },
  args: { onSubmit: fn() },
};

/**
 * Sin `onSubmit`, el formulario envía como cualquier otro: `GET` a `action`
 * con la consulta en `q`. Es lo que hace que el buscador funcione en una
 * página servida sin JavaScript.
 */
export const EnvioSinJS: Story = {
  name: 'Envío sin JS',
  args: { action: '/buscar', method: 'get' },
};

/** Controlado: quien lo usa guarda la consulta y decide qué hacer al enviar. */
export const Controlado: Story = {
  args: {},
  render: function Controlado(args) {
    const [query, setQuery] = useState('');
    const [enviado, setEnviado] = useState<string | null>(null);

    return (
      <Stack gap="md">
        <SearchForm
          {...args}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onSubmit={setEnviado}
        />
        <p>{enviado === null ? 'Sin enviar todavía.' : `Buscando: «${enviado}»`}</p>
      </Stack>
    );
  },
};

export const TestEnvio: Story = {
  name: 'Test — envía la consulta recortada',
  tags: ['!dev'],
  args: { onSubmit: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name: 'Buscar' });

    await userEvent.type(input, '  diseño de sistemas  ');
    await userEvent.click(canvas.getByRole('button', { name: 'Buscar' }));

    await expect(args.onSubmit).toHaveBeenCalledWith('diseño de sistemas');
  },
};

export const TestVacioNoEnvia: Story = {
  name: 'Test — el campo vacío no envía',
  tags: ['!dev'],
  args: { onSubmit: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button', { name: 'Buscar' }));
    await expect(args.onSubmit).not.toHaveBeenCalled();

    // Solo espacios tampoco es una consulta.
    await userEvent.type(canvas.getByRole('textbox', { name: 'Buscar' }), '   ');
    await userEvent.click(canvas.getByRole('button', { name: 'Buscar' }));
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const TestEnter: Story = {
  name: 'Test — Enter envía desde el campo',
  tags: ['!dev'],
  args: { onSubmit: fn() },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByRole('textbox', { name: 'Buscar' }), 'tokens{Enter}');

    await expect(args.onSubmit).toHaveBeenCalledWith('tokens');
  },
};
