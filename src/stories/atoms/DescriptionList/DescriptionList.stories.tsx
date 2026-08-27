import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { DescriptionList } from './DescriptionList';

const meta = {
  title: 'Atoms/DescriptionList',
  component: DescriptionList,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ficha de datos: cada fila es un término y su valor. */
export const PorDefecto: Story = {
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Cliente</dt><dd>Studio LXD</dd>
      <dt>Servicio</dt><dd>Diseño de producto y marca</dd>
      <dt>Año</dt><dd>2024</dd>
      <dt>Sector</dt><dd>Tecnología creativa</dd>
      <dt>Sitio web</dt><dd>studiolxd.com</dd>
    </DescriptionList>
  ),
};

/** El valor puede ocupar varias líneas: la columna del término no se mueve. */
export const ConTextoLargo: Story = {
  name: 'Con texto largo',
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Descripción</dt>
      <dd>
        Estudio de diseño especializado en identidad visual, sistemas de diseño y
        desarrollo de producto digital para empresas tecnológicas.
      </dd>
      <dt>Tecnologías</dt>
      <dd>React, TypeScript, Figma, Storybook, Style Dictionary</dd>
      <dt>Estado</dt><dd>Activo</dd>
    </DescriptionList>
  ),
};

/** Un término puede tener varios valores: se encadenan `<dd>` bajo el mismo `<dt>`. */
export const VariosValores: Story = {
  name: 'Varios valores',
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Idiomas</dt>
      <dd>Castellano</dd>
      <dd>Inglés</dd>
      <dt>Formato</dt>
      <dd>SCORM 1.2</dd>
    </DescriptionList>
  ),
};

/** Sobre superficie oscura los bordes y los dos textos pasan a blanco por token. */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark' },
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Cliente</dt><dd>Studio LXD</dd>
      <dt>Servicio</dt><dd>Diseño de producto y marca</dd>
      <dt>Año</dt><dd>2024</dd>
    </DescriptionList>
  ),
};

/** Por debajo de `md` término y descripción se apilan en una columna: con
 * términos largos, dos columnas apretaba el valor contra el borde. */
export const Estrecha: Story = {
  globals: { viewport: { value: 'mobile1' } },
  args: { children: null },
  render: () => (
    <DescriptionList>
      <dt>Cliente</dt><dd>Studio LXD</dd>
      <dt>Servicio</dt><dd>Diseño de producto y marca</dd>
      <dt>Año</dt><dd>2024</dd>
    </DescriptionList>
  ),
};

/** Test: el elemento es un `<dl>`, las props se reenvían y `className` va al final. */
export const Contrato: Story = {
  name: 'Test — elemento y paso de props',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <DescriptionList className="extra" data-ficha="proyecto" aria-label="Ficha del proyecto">
      <dt>Cliente</dt><dd>Studio LXD</dd>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const lista = within(canvasElement).getByLabelText('Ficha del proyecto');
    await expect(lista.tagName).toBe('DL');
    await expect(lista).toHaveClass('description-list', 'extra');
    await expect(lista.className.trim().endsWith('extra')).toBe(true);
    await expect(lista).toHaveAttribute('data-ficha', 'proyecto');
    await expect(lista.querySelectorAll('dt')).toHaveLength(1);
    await expect(lista.querySelectorAll('dd')).toHaveLength(1);
  },
};
