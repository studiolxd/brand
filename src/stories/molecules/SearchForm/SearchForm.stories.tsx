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

/** Con la etiqueta a la vista, la flecha se queda a la altura del campo. */
export const ConEtiquetaVisible: Story = {
  name: 'Con etiqueta visible',
  args: { label: 'Buscar en el sitio', labelHidden: false, onSubmit: fn() },
};

/** El campo con texto: no hay aspa de borrado, ni la del navegador ni propia. La flecha sigue al final, dentro del borde. */
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
      <SearchForm {...args} id="search-xl" size="xl" />
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

/** Su sitio real: el panel del menú del sitio, a talla `xl` y sobre superficie oscura. */
export const EnElPanelDelMenu: Story = {
  name: 'En el panel del menú',
  parameters: { surface: 'dark' },
  args: { size: 'xl', onSubmit: fn() },
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

export const TestFlechaDentroDelCampo: Story = {
  name: 'Test — la flecha vive dentro del campo, sin caja propia',
  tags: ['!dev'],
  args: { onSubmit: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByRole('textbox', { name: 'Buscar' }).getBoundingClientRect();
    const boton = canvas.getByRole('button', { name: 'Buscar' });
    const flecha = boton.getBoundingClientRect();

    // Encajada al final del campo, por dentro de su borde y no a continuación
    await expect(flecha.right).toBeLessThanOrEqual(campo.right + 1);
    await expect(flecha.left).toBeGreaterThan(campo.left);
    await expect(flecha.top).toBeGreaterThanOrEqual(campo.top - 1);
    await expect(flecha.bottom).toBeLessThanOrEqual(campo.bottom + 1);

    // Sin caja: ni fondo ni borde, en reposo ni en hover
    const estilo = getComputedStyle(boton);
    await expect(estilo.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(estilo.borderTopWidth).toBe('0px');
    await userEvent.hover(boton);
    await expect(getComputedStyle(boton).backgroundColor).toBe('rgba(0, 0, 0, 0)');
  },
};

export const TestTallaLg: Story = {
  name: 'Test — la talla lg escala el campo, la letra y la flecha',
  tags: ['!dev'],
  args: { onSubmit: fn() },
  render: (args) => (
    <Stack gap="md">
      <SearchForm {...args} id="talla-md" size="md" label="Buscar md" />
      <SearchForm {...args} id="talla-lg" size="lg" label="Buscar lg" />
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const medida = (id: string) => {
      const input = canvas.getByRole('textbox', { name: `Buscar ${id}` });
      const glifo = canvasElement.querySelector(`#talla-${id}`)!
        .closest('.search-form')!.querySelector('.search-form__submit-glyph')!;
      return {
        alto: input.getBoundingClientRect().height,
        letra: parseFloat(getComputedStyle(input).fontSize),
        glifo: glifo.getBoundingClientRect().height,
      };
    };
    const md = medida('md');
    const lg = medida('lg');

    await expect(lg.alto).toBeGreaterThan(md.alto);
    await expect(lg.letra).toBeGreaterThan(md.letra);
    await expect(lg.glifo).toBeGreaterThan(md.glifo);
  },
};

export const TestTallaXl: Story = {
  name: 'Test — la talla xl es mayor que lg en alto y en letra',
  tags: ['!dev'],
  args: { onSubmit: fn() },
  render: (args) => (
    <Stack gap="md">
      <SearchForm {...args} id="talla-lg" size="lg" label="Buscar lg" />
      <SearchForm {...args} id="talla-xl" size="xl" label="Buscar xl" />
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const medida = (id: string) => {
      const input = canvas.getByRole('textbox', { name: `Buscar ${id}` });
      const glifo = canvasElement.querySelector(`#talla-${id}`)!
        .closest('.search-form')!.querySelector('.search-form__submit-glyph')!;
      return {
        alto: input.getBoundingClientRect().height,
        letra: parseFloat(getComputedStyle(input).fontSize),
        glifo: glifo.getBoundingClientRect().height,
      };
    };
    const lg = medida('lg');
    const xl = medida('xl');

    await expect(xl.alto).toBeGreaterThan(lg.alto);
    await expect(xl.letra).toBeGreaterThan(lg.letra);
    await expect(xl.glifo).toBeGreaterThan(lg.glifo);
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
