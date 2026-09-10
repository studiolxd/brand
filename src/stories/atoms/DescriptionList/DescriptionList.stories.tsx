import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { DescriptionList, DescriptionTerm, DescriptionDetails } from './DescriptionList';

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
      <DescriptionTerm>Cliente</DescriptionTerm><DescriptionDetails>Studio LXD</DescriptionDetails>
      <DescriptionTerm>Servicio</DescriptionTerm><DescriptionDetails>Diseño de producto y marca</DescriptionDetails>
      <DescriptionTerm>Año</DescriptionTerm><DescriptionDetails>2024</DescriptionDetails>
      <DescriptionTerm>Sector</DescriptionTerm><DescriptionDetails>Tecnología creativa</DescriptionDetails>
      <DescriptionTerm>Sitio web</DescriptionTerm><DescriptionDetails>studiolxd.com</DescriptionDetails>
    </DescriptionList>
  ),
};

/** El valor puede ocupar varias líneas: la columna del término no se mueve. */
export const ConTextoLargo: Story = {
  name: 'Con texto largo',
  args: { children: null },
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Descripción</DescriptionTerm>
      <DescriptionDetails>
        Estudio de diseño especializado en identidad visual, sistemas de diseño y
        desarrollo de producto digital para empresas tecnológicas.
      </DescriptionDetails>
      <DescriptionTerm>Tecnologías</DescriptionTerm>
      <DescriptionDetails>React, TypeScript, Figma, Storybook, Style Dictionary</DescriptionDetails>
      <DescriptionTerm>Estado</DescriptionTerm><DescriptionDetails>Activo</DescriptionDetails>
    </DescriptionList>
  ),
};

/** Un término puede tener varios valores: se encadenan `<dd>` bajo el mismo `<dt>`. */
export const VariosValores: Story = {
  name: 'Varios valores',
  args: { children: null },
  render: () => (
    <DescriptionList>
      <DescriptionTerm>Idiomas</DescriptionTerm>
      <DescriptionDetails>Castellano</DescriptionDetails>
      <DescriptionDetails>Inglés</DescriptionDetails>
      <DescriptionTerm>Formato</DescriptionTerm>
      <DescriptionDetails>SCORM 1.2</DescriptionDetails>
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
      <DescriptionTerm>Cliente</DescriptionTerm><DescriptionDetails>Studio LXD</DescriptionDetails>
      <DescriptionTerm>Servicio</DescriptionTerm><DescriptionDetails>Diseño de producto y marca</DescriptionDetails>
      <DescriptionTerm>Año</DescriptionTerm><DescriptionDetails>2024</DescriptionDetails>
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
      <DescriptionTerm>Cliente</DescriptionTerm><DescriptionDetails>Studio LXD</DescriptionDetails>
      <DescriptionTerm>Servicio</DescriptionTerm><DescriptionDetails>Diseño de producto y marca</DescriptionDetails>
      <DescriptionTerm>Año</DescriptionTerm><DescriptionDetails>2024</DescriptionDetails>
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

/**
 * Test: los subcomponentes ponen su clase, respetan `as`, reenvían props y
 * dibujan exactamente igual que un `<dt>`/`<dd>` suelto.
 */
export const ContratoTerminoYValor: Story = {
  name: 'Test — DescriptionTerm y DescriptionDetails',
  tags: ['!dev'],
  args: { children: null },
  render: () => (
    <>
      <DescriptionList aria-label="con clase">
        <DescriptionTerm className="extra" data-uso="prueba">Cliente</DescriptionTerm>
        <DescriptionDetails className="extra" data-uso="prueba">Studio LXD</DescriptionDetails>
      </DescriptionList>
      <DescriptionList aria-label="sin clase">
        <dt>Cliente</dt>
        <dd>Studio LXD</dd>
      </DescriptionList>
      <DescriptionList aria-label="con as">
        <DescriptionTerm as="div" role="term">Cliente</DescriptionTerm>
        <DescriptionDetails as="div" role="definition">Studio LXD</DescriptionDetails>
      </DescriptionList>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const conClase = canvas.getByLabelText('con clase');
    const termino = conClase.querySelector('dt')!;
    const valor = conClase.querySelector('dd')!;
    await expect(termino.tagName).toBe('DT');
    await expect(termino).toHaveClass('description-list__term', 'extra');
    await expect(termino).toHaveAttribute('data-uso', 'prueba');
    await expect(valor.tagName).toBe('DD');
    await expect(valor).toHaveClass('description-list__details', 'extra');

    // El dibujo es el mismo con clase y sin ella: las clases no pintan nada nuevo.
    const sinClase = canvas.getByLabelText('sin clase');
    const terminoSuelto = sinClase.querySelector('dt')!;
    const valorSuelto = sinClase.querySelector('dd')!;
    const propiedades = [
      'paddingBlockStart',
      'paddingInlineStart',
      'fontFamily',
      'fontSize',
      'fontWeight',
      'lineHeight',
      'color',
      'borderBlockEndWidth',
      'borderInlineEndWidth',
    ] as const;
    for (const propiedad of propiedades) {
      await expect(getComputedStyle(termino)[propiedad])
        .toBe(getComputedStyle(terminoSuelto)[propiedad]);
      await expect(getComputedStyle(valor)[propiedad])
        .toBe(getComputedStyle(valorSuelto)[propiedad]);
    }

    const conAs = canvas.getByLabelText('con as');
    const [terminoDiv, valorDiv] = Array.from(conAs.children);
    await expect(terminoDiv.tagName).toBe('DIV');
    await expect(terminoDiv).toHaveClass('description-list__term');
    await expect(valorDiv.tagName).toBe('DIV');
    await expect(valorDiv).toHaveClass('description-list__details');
  },
};
