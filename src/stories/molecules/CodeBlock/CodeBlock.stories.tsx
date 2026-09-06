import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { CodeBlock } from './CodeBlock';

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
      <span style={{ color: 'var(--color-accent-1)' }}>const</span> mensaje ={' '}
      <span style={{ color: 'var(--color-support-1)' }}>&apos;resaltado externo&apos;</span>;
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
