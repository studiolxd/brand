import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Prose } from './Prose';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const meta = {
  title: 'Molecules/Prose',
  component: Prose,
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

/** El HTML que produce un markdown corriente: nada de esto lleva clase. */
const documento = (
  <>
    <h2>Instalar el paquete</h2>
    <p>
      El design system se distribuye por git. Fija la versión en un tag: un{' '}
      <code>major</code> rompe a todos los consumidores a la vez, así que el pin
      es parte del contrato.
    </p>
    <pre>
      <code>pnpm add @studiolxd/brand@github:studiolxd/brand#v25.8.0</code>
    </pre>
    <h3>Qué entra en el paquete</h3>
    <ul>
      <li>Los componentes React, con su CSS.</li>
      <li>
        Los tokens SCSS con valores resueltos, para lo que no es React.
        <ul>
          <li>Entrypoint moderno, con <code>@forward</code>.</li>
          <li>Entrypoint <em>legacy</em>, con <code>@import</code>.</li>
        </ul>
      </li>
    </ul>
    <blockquote>
      <p>
        Un breaking change aquí rompe la web, las diez aplicaciones de la suite
        y el starter de Keycloak. Los <em>majors</em>, con cuidado.
      </p>
    </blockquote>
    <h3>Salidas de build</h3>
    <table>
      <thead>
        <tr>
          <th>Salida</th>
          <th>Para quién</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>dist/index.js</code></td>
          <td>Cualquier aplicación React</td>
        </tr>
        <tr>
          <td><code>src/tokens/scss/</code></td>
          <td>PHP, servidor, herramientas de diseño</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h4>Y después</h4>
    <ol>
      <li>Importa <code>brand.css</code> una sola vez.</li>
      <li>Monta <code>AppRoot</code> en la raíz.</li>
      <li>
        Lee las <a href="#foundations">Foundations</a> antes de escribir CSS.
      </li>
    </ol>
  </>
);

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: { as: 'article', children: documento },
};

/**
 * `size="sm"` baja el cuerpo un peldaño y aprieta el ritmo: para textos largos
 * que viven en una columna estrecha (un panel lateral, una nota legal al pie).
 */
export const TallaPequena: Story = {
  name: 'Talla sm',
  args: { as: 'article', size: 'sm', children: documento },
};

/**
 * `measure={false}` suelta el ancho de lectura y deja que el documento ocupe
 * todo su contenedor: para páginas con tablas anchas o figuras a sangre.
 */
export const SinMedida: Story = {
  name: 'Sin medida de lectura',
  args: { as: 'article', measure: false, children: documento },
};

/**
 * Test: el contenedor toma el elemento de `as`, la clase de talla y la de
 * medida, y el contenido crudo conserva su semántica (títulos, listas, tabla).
 */
export const TestSemantica: Story = {
  name: 'Test — semántica y variantes',
  tags: ['!dev'],
  args: { as: 'article', size: 'sm', measure: false, children: documento },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const article = canvasElement.querySelector('article.prose');
    await expect(article).not.toBeNull();
    await expect(article).toHaveClass('prose--sm');
    await expect(article).toHaveClass('prose--full');

    await expect(canvas.getByRole('heading', { level: 2, name: 'Instalar el paquete' })).toBeInTheDocument();
    await expect(canvas.getAllByRole('list').length).toBeGreaterThan(0);
    await expect(canvas.getByRole('table')).toBeInTheDocument();
    await expect(canvas.getByRole('separator')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Foundations' })).toHaveAttribute('href', '#foundations');
  },
};

/** El HTML que devuelve el parser de un `.docx`: etiquetas crudas, sin clases. */
const htmlDeDocx =
  '<h2>Objetivos de aprendizaje</h2>' +
  '<p>Al terminar el módulo, el alumnado será capaz de <strong>identificar</strong> los huecos ' +
  'de un ladrillo cerámico y de <em>justificar</em> su elección en un cerramiento.</p>' +
  '<ul><li>Reconocer los formatos normalizados.</li><li>Calcular el peso propio del muro.</li></ul>' +
  '<blockquote><p>El ladrillo perforado no es un ladrillo hueco: cambia la dirección de los huecos.</p></blockquote>';

/**
 * El uso real: contenido que no viene de React —lo que devuelve un parser de
 * `.docx`/`.pdf`, un campo de un CMS, un markdown ya compilado— entra por
 * `html`, **ya saneado por la aplicación**, y sale vestido con la escala, el
 * ritmo y la medida del sistema. Sin esta prop, cada producto acababa con su
 * propio `dangerouslySetInnerHTML` en un `<div>` desnudo, fuera de la hoja.
 */
export const ContenidoHtml: Story = {
  name: 'Contenido en HTML (ya saneado)',
  args: { html: htmlDeDocx },
};

/**
 * `html` es excluyente con `children`, pero nada impide componer: el bloque de
 * HTML y los nodos de React conviven como hermanos dentro de la misma tarjeta
 * —el texto del documento arriba, la firma del sistema debajo—.
 */
export const HtmlJuntoAReact: Story = {
  name: 'HTML y nodos de React, hermanos',
  args: { children: null },
  render: () => (
    <div>
      <Prose size="sm" measure={false} html={'<p>&ldquo;El ladrillo perforado no es un ladrillo hueco.&rdquo;</p>'} />
      <Paragraph size="small">— Manual de construcción, cap. 4</Paragraph>
    </div>
  ),
};

/**
 * Test: el HTML se pinta dentro del contenedor —que es quien lo viste— y
 * conserva su semántica; las variantes (`as`, `size`, `measure`) mandan igual
 * que con `children`.
 */
export const TestContenidoHtml: Story = {
  name: 'Test — contenido en HTML',
  tags: ['!dev'],
  args: { as: 'article', size: 'sm', html: htmlDeDocx },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const article = canvasElement.querySelector('article.prose');
    await expect(article).not.toBeNull();
    await expect(article).toHaveClass('prose--sm');

    const titulo = canvas.getByRole('heading', { level: 2, name: 'Objetivos de aprendizaje' });
    await expect(titulo.closest('.prose')).toBe(article);
    await expect(canvas.getByRole('list')).toBeInTheDocument();

    // Lo pinta la hoja del sistema, no el marcado que viene de fuera.
    await expect(getComputedStyle(titulo).fontFamily).toBe(
      getComputedStyle(canvasElement.querySelector('article.prose p')!).fontFamily,
    );
  },
};
