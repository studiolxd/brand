import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Molecules/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const SoloCodigo: Story = {
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

/** Línea larga sin saltos — verifica que `overflow-x: auto` no rompe el layout del contenedor. */
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

/** `children` como nodos ya resaltados por un highlighter externo, no como texto plano. */
export const ConNodosResaltados: Story = {
  render: () => (
    <CodeBlock language="tsx" copyable>
      <span style={{ color: '#BAABFF' }}>const</span> mensaje = <span style={{ color: '#20E38E' }}>&apos;resaltado externo&apos;</span>;
    </CodeBlock>
  ),
};

/**
 * Test: el `aria-label` del botón de copiar usa el castellano por defecto y se
 * sustituye cuando el consumidor lo pasa traducido.
 */
export const Etiquetas: Story = {
  name: 'Test — etiqueta del botón de copiar',
  render: () => (
    <>
      <div data-testid="default">
        <CodeBlock copyable language="ts">const a = 1;</CodeBlock>
      </div>
      <div data-testid="traducido">
        <CodeBlock copyable language="ts" copyLabel="Copy code" copiedLabel="Copied">
          const a = 1;
        </CodeBlock>
      </div>
    </>
  ),
  play: async ({ canvasElement }) => {
    const def = within(canvasElement.querySelector('[data-testid="default"]') as HTMLElement);
    await expect(def.getByLabelText('Copiar código')).toBeInTheDocument();

    const en = within(canvasElement.querySelector('[data-testid="traducido"]') as HTMLElement);
    await expect(en.getByLabelText('Copy code')).toBeInTheDocument();
    await expect(en.queryByLabelText('Copiar código')).toBeNull();
  },
};
