import type { Meta, StoryObj } from '@storybook/react-vite';
import { Kbd } from './Kbd';

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
      description: 'Tamaño de la tecla.',
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

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Kbd size="sm">Esc</Kbd>
      <Kbd size="md">Esc</Kbd>
      <Kbd size="lg">Esc</Kbd>
    </div>
  ),
};

export const SingleKeys: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
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

/**
 * Para una combinación de teclas se componen varios `Kbd` con un separador
 * entre ellos (`+` o `·`). El propio átomo representa siempre una sola tecla.
 */
export const Combinations: Story = {
  render: () => {
    const sep: React.CSSProperties = {
      color: 'var(--color-text-muted-on-light)',
      fontFamily: 'var(--font-family-mono)',
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Kbd>⌘</Kbd>
          <span style={sep}>+</span>
          <Kbd>K</Kbd>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Kbd>Ctrl</Kbd>
          <span style={sep}>+</span>
          <Kbd>⇧</Kbd>
          <span style={sep}>+</span>
          <Kbd>P</Kbd>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Kbd size="sm">⌘</Kbd>
          <span style={sep}>+</span>
          <Kbd size="sm">,</Kbd>
        </span>
      </div>
    );
  },
};

/**
 * Uso inline dentro de un párrafo: la tecla se alinea con el texto que la rodea.
 */
export const Inline: Story = {
  render: () => (
    <p style={{ fontFamily: 'var(--font-family-sans)', fontSize: 'var(--font-size-2)', maxWidth: '42ch', lineHeight: 1.6 }}>
      Pulsa <Kbd size="sm">⌘</Kbd> <Kbd size="sm">K</Kbd> para abrir la paleta de
      comandos, o <Kbd size="sm">Esc</Kbd> para cerrarla.
    </p>
  ),
};
