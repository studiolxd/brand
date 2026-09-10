import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { CodeBlock, CodeToken } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    language: { control: 'text', description: 'Etiqueta de lenguaje de la cabecera.' },
    copyable: { control: 'boolean', description: 'Añade el botón de copiar.' },
    singleLine: {
      control: 'boolean',
      description: 'Fuerza la variante de una línea o la multilínea. Sin ella, se detecta del contenido.',
    },
    copyLabel: { control: 'text', description: 'Etiqueta accesible del botón de copiar.' },
    copiedLabel: { control: 'text', description: 'Anuncio para lectores de pantalla tras copiar.' },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const PorDefecto: Story = {
  args: {
    children: `npm install @studiolxd/brand`,
  },
};

export const ConLenguaje: Story = {
  args: {
    language: 'bash',
    children: `npm run storybook`,
  },
};

export const ConBotonCopiar: Story = {
  args: {
    copyable: true,
    children: `const saludo = 'Hola mundo';`,
  },
};

export const ConLenguajeYCopiar: Story = {
  args: {
    language: 'tsx',
    copyable: true,
    children: `export function Button({ children }: ButtonProps) {\n  return <button>{children}</button>;\n}`,
  },
};

export const CodigoMultilinea: Story = {
  args: {
    language: 'tsx',
    copyable: true,
    children:
      `import { Button } from '@studiolxd/brand';\n\n` +
      `export function Example() {\n` +
      `  return (\n` +
      `    <Button variant="primary" onClick={() => console.log('click')}>\n` +
      `      Guardar cambios\n` +
      `    </Button>\n` +
      `  );\n` +
      `}`,
  },
};

/** Línea larga sin saltos — el `<pre>` hace su propio scroll horizontal. */
export const LineaLarga: Story = {
  args: {
    language: 'bash',
    copyable: true,
    children: `curl -s "https://api.ejemplo.com/v1/usuarios?page=1&limit=50&sort=created_at&order=desc&include=profile,settings" | jq '.data[]'`,
  },
  render: (args) => (
    <div style={{ maxWidth: '24rem' }}>
      <CodeBlock {...args} />
    </div>
  ),
};

/**
 * Sin saltos de línea, el bloque se detecta solo como una línea: el código a
 * la izquierda con su propio scroll horizontal y, a la derecha, el botón de
 * copiar centrado en vertical — sin la cabecera aparte que dejaba un hueco
 * vacío encima del texto.
 */
export const UnaLinea: Story = {
  name: 'Una línea',
  args: {
    copyable: true,
    children: 'https://api.ejemplo.com/mcp/aipricing',
  },
  render: (args) => (
    <div style={{ maxWidth: '24rem' }}>
      <CodeBlock {...args} />
    </div>
  ),
};

/** La misma variante de una línea, en superficie oscura: su propio par oscuro. */
export const UnaLineaSuperficieOscura: Story = {
  name: 'Una línea — en superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    copyable: true,
    children: 'https://api.ejemplo.com/mcp/aipricing',
  },
  render: (args) => (
    <div style={{ maxWidth: '24rem' }}>
      <CodeBlock {...args} />
    </div>
  ),
};

/** `children` como nodos ya resaltados por un highlighter externo, no como texto plano. */
export const ConNodosResaltados: Story = {
  render: () => (
    <CodeBlock language="tsx" copyable>
      <CodeToken type="keyword">const</CodeToken> <CodeToken type="variable">mensaje</CodeToken>{' '}
      <CodeToken type="operator">=</CodeToken>{' '}
      <CodeToken type="string">&apos;resaltado externo&apos;</CodeToken>
      <CodeToken type="punctuation">;</CodeToken>
    </CodeBlock>
  ),
};

/* El fragmento de las dos stories de resaltado, marcado a mano: aquí no hay
   resaltador, que es justo lo que se quiere enseñar — el vocabulario de clases
   con el que un producto traduce la salida del suyo. */
const fragmentoResaltado = (
  <>
    <CodeToken type="comment">{'// Precio del plan, en céntimos'}</CodeToken>{'\n'}
    <CodeToken type="keyword">export</CodeToken> <CodeToken type="keyword">const</CodeToken>{' '}
    <CodeToken type="variable">PRECIO</CodeToken> <CodeToken type="operator">=</CodeToken>{' '}
    <CodeToken type="number">2900</CodeToken><CodeToken type="punctuation">;</CodeToken>{'\n\n'}
    <CodeToken type="keyword">export</CodeToken> <CodeToken type="keyword">function</CodeToken>{' '}
    <CodeToken type="function">formatea</CodeToken><CodeToken type="punctuation">(</CodeToken>
    <CodeToken type="variable">céntimos</CodeToken><CodeToken type="punctuation">)</CodeToken>{' '}
    <CodeToken type="punctuation">{'{'}</CodeToken>{'\n  '}
    <CodeToken type="keyword">if</CodeToken> <CodeToken type="punctuation">(</CodeToken>
    <CodeToken type="variable">céntimos</CodeToken> <CodeToken type="operator">==</CodeToken>{' '}
    <CodeToken type="constant">null</CodeToken><CodeToken type="punctuation">)</CodeToken>{' '}
    <CodeToken type="keyword">return</CodeToken>{' '}
    <CodeToken type="string">&apos;—&apos;</CodeToken><CodeToken type="punctuation">;</CodeToken>{'\n  '}
    <CodeToken type="keyword">return</CodeToken> <CodeToken type="variable">euros</CodeToken>
    <CodeToken type="punctuation">.</CodeToken><CodeToken type="property">format</CodeToken>
    <CodeToken type="punctuation">(</CodeToken><CodeToken type="variable">céntimos</CodeToken>{' '}
    <CodeToken type="operator">/</CodeToken> <CodeToken type="number">100</CodeToken>
    <CodeToken type="punctuation">);</CodeToken>{'\n'}
    <CodeToken type="punctuation">{'}'}</CodeToken>
  </>
);

/**
 * El vocabulario de clases, con un fragmento marcado a mano. El resaltador es
 * del producto: `CodeBlock` solo pone los tipos y su tinta.
 */
export const Resaltado: Story = {
  name: 'Resaltado de sintaxis',
  render: () => (
    <CodeBlock language="ts" copyable singleLine={false}>{fragmentoResaltado}</CodeBlock>
  ),
};

/** Las mismas tintas en superficie oscura: cada tipo pasa a su par por token. */
export const ResaltadoSuperficieOscura: Story = {
  name: 'Resaltado de sintaxis — en superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <CodeBlock language="ts" copyable singleLine={false}>{fragmentoResaltado}</CodeBlock>
  ),
};

/** Las dos líneas de un diff van como relleno, no como tinta suelta. */
export const ResaltadoDiff: Story = {
  name: 'Resaltado de sintaxis — diff',
  render: () => (
    <CodeBlock language="diff" singleLine={false}>
      <CodeToken type="deleted">- const precio = 29;</CodeToken>
      <CodeToken type="inserted">+ const precio = 2900;</CodeToken>
    </CodeBlock>
  ),
};

/**
 * Superficie oscura: fondo, borde y tinta pasan a su par oscuro (la misma
 * superficie clara secundaria que usan `Kbd` y el pie de `Table`, en su
 * variante para `.surface-dark`).
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: {
    language: 'tsx',
    copyable: true,
    children: `<CodeBlock language="tsx" copyable>{codigo}</CodeBlock>`,
  },
};

/**
 * Test: el `aria-label` del botón de copiar y el nombre del área de código usan
 * el castellano por defecto y se sustituyen cuando el consumidor los traduce.
 */
export const Etiquetas: Story = {
  name: 'Test — etiquetas por defecto y traducidas',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="default">
        <CodeBlock copyable language="ts">const a = 1;</CodeBlock>
      </div>
      <div data-testid="traducido">
        <CodeBlock
          copyable
          language="ts"
          copyLabel="Copy code"
          copiedLabel="Copied"
          codeLabel={(lang) => (lang ? `${lang} code block` : 'Code block')}
        >
          const a = 1;
        </CodeBlock>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Copiar código')).toBeInTheDocument();
    await expect(def.getByRole('region', { name: 'Bloque de código ts' })).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByLabelText('Copy code')).toBeInTheDocument();
    await expect(en.queryByLabelText('Copiar código')).toBeNull();
    await expect(en.getByRole('region', { name: 'ts code block' })).toBeInTheDocument();
  },
};

/** Test: copiar lleva el texto plano al portapapeles y lo anuncia por la región live. */
export const ContratoCopiar: Story = {
  name: 'Test — copiar lleva el texto plano y lo anuncia',
  tags: ['!dev'],
  render: () => (
    <CodeBlock copyable language="ts">
      <span>const</span> a = 1;
    </CodeBlock>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let copiado = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async (text: string) => { copiado = text; } },
    });

    const boton = canvas.getByRole('button', { name: 'Copiar código' });
    await userEvent.click(boton);

    await expect(copiado).toBe('const a = 1;');
    // el nombre accesible del botón no cambia: el cambio lo canta la región live
    await expect(boton).toHaveAccessibleName('Copiar código');
    await expect(canvas.getByRole('status')).toHaveTextContent('Copiado');
  },
};

/** Test: el área de código es una región focalizable con scroll horizontal propio. */
export const ContratoScroll: Story = {
  name: 'Test — el área de código es una región focalizable con scroll',
  tags: ['!dev'],
  render: () => (
    <div style={{ maxWidth: '16rem' }}>
      <CodeBlock language="bash">
        {`curl -s "https://api.ejemplo.com/v1/usuarios?page=1&limit=50&sort=created_at" | jq '.data[]'`}
      </CodeBlock>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const pre = canvasElement.querySelector('.code-block__pre') as HTMLElement;
    await expect(pre).toHaveAttribute('tabindex', '0');
    await expect(pre).toHaveAccessibleName('Bloque de código bash');
    await expect(getComputedStyle(pre).overflowX).toBe('auto');
    // la línea larga desborda dentro del <pre>, no del contenedor
    await expect(pre.scrollWidth).toBeGreaterThan(pre.clientWidth);
    await expect(canvasElement.scrollWidth).toBe(canvasElement.clientWidth);
  },
};

/**
 * Test: sin saltos de línea, el bloque es una fila (código + controles), sin
 * cabecera aparte ni hueco encima del texto; con saltos de línea, o forzando
 * `singleLine={false}`, sigue siendo la cabecera de siempre.
 */
export const ContratoUnaLinea: Story = {
  name: 'Test — variante de una línea: fila, sin cabecera aparte',
  tags: ['!dev'],
  render: () => (
    <>
      <div data-testid="una-linea" style={{ maxWidth: '20rem' }}>
        <CodeBlock copyable language="bash">https://ejemplo.com/x</CodeBlock>
      </div>
      <div data-testid="multilinea">
        <CodeBlock copyable language="bash">{'línea uno\nlínea dos'}</CodeBlock>
      </div>
      <div data-testid="forzada-multilinea">
        <CodeBlock copyable singleLine={false}>https://ejemplo.com/x</CodeBlock>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const unaLinea = canvasElement.querySelector('[data-testid="una-linea"]') as HTMLElement;
    const root = unaLinea.querySelector('.code-block') as HTMLElement;
    await expect(root).toHaveClass('code-block--single-line');
    await expect(root.querySelector('.code-block__header')).toBeNull();
    const fila = root.querySelector('.code-block__row') as HTMLElement;
    await expect(fila).not.toBeNull();

    // Código a la izquierda, controles a la derecha, sin hueco encima del texto.
    const pre = fila.querySelector('.code-block__pre') as HTMLElement;
    const controles = fila.querySelector('.code-block__controls') as HTMLElement;
    await expect(pre.compareDocumentPosition(controles) & Node.DOCUMENT_POSITION_FOLLOWING)
      .toBeTruthy();
    await expect(pre.getBoundingClientRect().top - root.getBoundingClientRect().top)
      .toBeLessThan(24);

    // El botón queda centrado en vertical respecto a la fila.
    const boton = within(controles).getByRole('button', { name: 'Copiar código' });
    const filaRect = fila.getBoundingClientRect();
    const botonRect = boton.getBoundingClientRect();
    const centroFila = filaRect.top + filaRect.height / 2;
    const centroBoton = botonRect.top + botonRect.height / 2;
    await expect(Math.abs(centroFila - centroBoton)).toBeLessThan(2);

    const multilinea = canvasElement.querySelector('[data-testid="multilinea"] .code-block') as HTMLElement;
    await expect(multilinea).not.toHaveClass('code-block--single-line');
    await expect(multilinea.querySelector('.code-block__header')).not.toBeNull();

    const forzada = canvasElement.querySelector('[data-testid="forzada-multilinea"] .code-block') as HTMLElement;
    await expect(forzada).not.toHaveClass('code-block--single-line');
    await expect(forzada.querySelector('.code-block__header')).not.toBeNull();
  },
};

/** Test: sin `language` ni `copyable` no hay cabecera; el código sigue siendo región. */
export const ContratoSinCabecera: Story = {
  name: 'Test — sin lenguaje ni copiar no hay cabecera',
  tags: ['!dev'],
  render: () => <CodeBlock>npm i</CodeBlock>,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.code-block__header')).toBeNull();
    await expect(within(canvasElement).getByRole('region', { name: 'Bloque de código' })).toBeInTheDocument();
  },
};

export const ContratoCodeToken: Story = {
  name: 'Test — CodeToken pone las clases del tipo y ningún estilo inline',
  tags: ['!dev'],
  render: () => (
    <div data-testid="resaltado">
      <CodeBlock language="ts" singleLine={false}>
        <CodeToken type="keyword">const</CodeToken>
        <CodeToken type="string">&apos;hola&apos;</CodeToken>
        <CodeToken type="inserted">+ añadida</CodeToken>
      </CodeBlock>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const bloque = canvas.getByTestId('resaltado');

    const keyword = canvas.getByText('const');
    await expect(keyword.tagName).toBe('SPAN');
    await expect(keyword).toHaveClass('code-block__token');
    await expect(keyword).toHaveClass('code-block__token--keyword');

    // La razón de existir del componente: el color sale de un token, no de un
    // `style` inline como el que hoy pone el consumidor.
    for (const token of bloque.querySelectorAll('.code-block__token')) {
      await expect(token.getAttribute('style')).toBeNull();
    }

    await expect(canvas.getByText('+ añadida')).toHaveClass('code-block__token--inserted');
  },
};
