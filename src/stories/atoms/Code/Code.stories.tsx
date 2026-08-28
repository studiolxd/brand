import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Code } from './Code';
import { Paragraph } from '../Paragraph/Paragraph';

const meta: Meta<typeof Code> = {
  title: 'Atoms/Code',
  component: Code,
  parameters: { layout: 'padded' },
  args: { children: 'pnpm build:tokens' },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const PorDefecto: Story = {
  name: 'Por defecto',
};

/** En su sitio natural: dentro de un párrafo, sin romper el interlineado. */
export const EnUnParrafo: Story = {
  name: 'En un párrafo',
  render: () => (
    <Paragraph>
      Cada vez que se toca un JSON de tokens hay que ejecutar{' '}
      <Code>pnpm build:tokens</Code> antes de commitear: los CSS bajo{' '}
      <Code>src/tokens/</Code> son auto-generados y se sobreescriben en el
      siguiente build. La prop se llama <Code>ratio</Code>.
    </Paragraph>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <Paragraph>
      El fondo del fragmento es un par autocontenido: se ve igual sobre{' '}
      <Code>.surface-dark</Code> que en claro, como el de <Code>CodeBlock</Code>.
    </Paragraph>
  ),
};

/** Test: es un `<code>` con la clase del sistema y no rompe la línea del párrafo. */
export const Contrato: Story = {
  name: 'Test — elemento, clase y altura de línea',
  tags: ['!dev'],
  render: () => (
    <Paragraph data-testid="parrafo">
      Ejecuta <Code id="fragmento" data-zona="docs">pnpm build:tokens</Code> antes de commitear.
    </Paragraph>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fragmento = canvas.getByText('pnpm build:tokens');
    await expect(fragmento.tagName).toBe('CODE');
    await expect(fragmento).toHaveClass('code');
    await expect(fragmento).toHaveAttribute('id', 'fragmento');
    await expect(fragmento).toHaveAttribute('data-zona', 'docs');
    // Monoespaciada y sin aire vertical: la línea del párrafo no crece.
    await expect(getComputedStyle(fragmento).paddingBlockStart).toBe('0px');
    await expect(getComputedStyle(fragmento).paddingBlockEnd).toBe('0px');
    const parrafo = canvas.getByTestId('parrafo');
    await expect(parrafo.getBoundingClientRect().height)
      .toBeLessThanOrEqual(parseFloat(getComputedStyle(parrafo).lineHeight) + 1);
  },
};
