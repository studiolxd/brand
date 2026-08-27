import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Kbd } from './Kbd';
import { Paragraph } from '../Paragraph/Paragraph';

const meta: Meta<typeof Kbd> = {
  title: 'Atoms/Kbd',
  component: Kbd,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Talla de la tecla.',
    },
    children: {
      control: { type: 'text' },
      description: 'Símbolo o etiqueta de la tecla.',
    },
  },
  args: {
    size: 'md',
    children: 'K',
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

const fila: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--spacing-2)',
};

export const PorDefecto: Story = {};

/** Tres tallas. Cambian cuerpo y aire; la tecla de un carácter sigue cuadrada. */
export const Tallas: Story = {
  render: () => (
    <div style={{ ...fila, gap: 'var(--spacing-4)' }}>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Esc</Kbd>
      <Kbd size="lg">Esc</Kbd>
    </div>
  ),
};

/** Símbolos, flechas y etiquetas de texto. */
export const TeclasSueltas: Story = {
  name: 'Teclas sueltas',
  render: () => (
    <div style={fila}>
      <Kbd>⌘</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⌃</Kbd>
      <Kbd>↵</Kbd>
      <Kbd>⌫</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
    </div>
  ),
};

/** Una combinación se compone: varias teclas con su separador entre ellas. */
export const Combinaciones: Story = {
  render: () => {
    const sep: React.CSSProperties = {
      color: 'var(--color-text-muted-on-light)',
      fontFamily: 'var(--font-family-mono)',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <span style={fila}>
          <Kbd>⌘</Kbd>
          <span style={sep}>+</span>
          <Kbd>K</Kbd>
        </span>
        <span style={fila}>
          <Kbd>Ctrl</Kbd>
          <span style={sep}>+</span>
          <Kbd>⇧</Kbd>
          <span style={sep}>+</span>
          <Kbd>P</Kbd>
        </span>
        <span style={fila}>
          <Kbd size="sm">⌘</Kbd>
          <span style={sep}>+</span>
          <Kbd size="sm">,</Kbd>
        </span>
      </div>
    );
  },
};

/** Dentro de un párrafo, la talla `sm` se alinea con el texto que la rodea. */
export const EnLinea: Story = {
  name: 'En línea',
  render: () => (
    <Paragraph>
      Pulsa <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> para abrir la paleta de comandos,
      o <Kbd size="sm">Esc</Kbd> para cerrarla.
    </Paragraph>
  ),
};

/** Sobre superficie oscura el keycap remapea fondo, símbolo y borde por token. */
export const SuperficieOscura: Story = {
  name: 'Superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={fila}>
      <Kbd size="sm">Esc</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd size="lg">Tab</Kbd>
    </div>
  ),
};

/** Test: elemento semántico, clases de talla y paso de props. */
export const Contrato: Story = {
  name: 'Test — elemento, talla y paso de props',
  tags: ['!dev'],
  render: () => (
    <>
      <Kbd className="extra" data-tecla="cmd" aria-label="Comando">⌘</Kbd>
      <Kbd size="sm">S</Kbd>
      <Kbd size="lg">L</Kbd>
    </>
  ),
  play: async ({ canvasElement }) => {
    const cmd = within(canvasElement).getByText('⌘');
    await expect(cmd.tagName).toBe('KBD');
    await expect(cmd).toHaveClass('kbd', 'extra');
    await expect(cmd.className).not.toContain('kbd--md');
    await expect(cmd).toHaveAttribute('data-tecla', 'cmd');
    await expect(cmd).toHaveAttribute('aria-label', 'Comando');
    await expect(within(canvasElement).getByText('S')).toHaveClass('kbd--sm');
    await expect(within(canvasElement).getByText('L')).toHaveClass('kbd--lg');
  },
};

/** Test: una tecla de un carácter es cuadrada — el ancho mínimo es su altura. */
export const ContratoCuadrado: Story = {
  name: 'Test — la tecla de un carácter es cuadrada',
  tags: ['!dev'],
  render: () => (
    <>
      <Kbd size="sm">S</Kbd>
      <Kbd>M</Kbd>
      <Kbd size="lg">L</Kbd>
    </>
  ),
  play: async ({ canvasElement }) => {
    for (const texto of ['S', 'M', 'L']) {
      const tecla = within(canvasElement).getByText(texto).getBoundingClientRect();
      await expect(Math.round(tecla.width)).toBe(Math.round(tecla.height));
    }
  },
};
