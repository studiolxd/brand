import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { MessageBubble } from './MessageBubble';

const meta = {
  title: 'Atoms/MessageBubble',
  component: MessageBubble,
  parameters: { layout: 'padded' },
  argTypes: {
    role: {
      control: 'inline-radio',
      options: ['user', 'assistant'],
      description: 'Quién envía el mensaje. Decide el lado y la esquina donde nace la cola.',
    },
  },
  args: {
    children: 'Hola, ¿en qué puedo ayudarte hoy?',
    role: 'assistant',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-5)', maxWidth: '32rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MessageBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Asistente: Story = {};

export const Usuario: Story = {
  args: {
    role: 'user',
    children: 'Necesito ayuda con mi proyecto.',
  },
};

/**
 * Ningún globo lleva relleno. Lo que separa a un emisor del otro es la
 * alineación y el lado por el que sale la cola: el mismo contorno, la misma
 * tinta, el mismo aire.
 */
export const LosDosEmisores: Story = {
  name: 'Los dos emisores',
  render: () => (
    <>
      <MessageBubble role="assistant">Hola, ¿en qué puedo ayudarte hoy?</MessageBubble>
      <MessageBubble role="user">Necesito ayuda con mi proyecto.</MessageBubble>
      <MessageBubble role="assistant">Cuéntame de qué trata y por dónde vas.</MessageBubble>
    </>
  ),
};

export const MensajeLargo: Story = {
  name: 'Mensaje largo',
  args: {
    role: 'assistant',
    children:
      'Esta es una respuesta más larga para mostrar cómo el globo se adapta al contenido de texto extenso manteniendo el ancho máximo definido y el interlineado apropiado para facilitar la lectura.',
  },
};

/**
 * El contorno y el vaciado de la cola tienen par oscuro: el mismo globo sobre
 * una superficie prusia. La cola sigue siendo puro contorno porque su triángulo
 * interior se pinta con el color de la superficie de detrás.
 */
export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <>
      <MessageBubble role="assistant">Hola, ¿en qué puedo ayudarte hoy?</MessageBubble>
      <MessageBubble role="user">Necesito ayuda con mi proyecto.</MessageBubble>
    </>
  ),
};

/** Test: el globo no pinta relleno y sí contorno en las dos superficies. */
export const ContratoSinRelleno: Story = {
  name: 'Test — el globo es contorno, no relleno',
  tags: ['!dev'],
  render: () => (
    <>
      <MessageBubble role="assistant" data-testid="asistente">Asistente</MessageBubble>
      <MessageBubble role="user" data-testid="usuario">Usuario</MessageBubble>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const id of ['asistente', 'usuario']) {
      const bubble = canvas.getByTestId(id);
      const style = getComputedStyle(bubble);
      // Sin relleno y sin sombra: el contorno es el único separador.
      await expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
      await expect(style.boxShadow).toBe('none');
      // Cuatro esquinas rectas.
      await expect(style.borderTopLeftRadius).toBe('0px');
      await expect(style.borderBottomRightRadius).toBe('0px');
      // Contorno de 1px.
      await expect(style.borderTopWidth).toBe('1px');
    }
  },
};

/** Test: la cola sale por el lado del emisor y es de contorno, no maciza. */
export const ContratoCola: Story = {
  name: 'Test — la cola nace del lado del emisor',
  tags: ['!dev'],
  render: () => (
    <>
      <MessageBubble role="assistant" data-testid="asistente">Asistente</MessageBubble>
      <MessageBubble role="user" data-testid="usuario">Usuario</MessageBubble>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const asistente = canvas.getByTestId('asistente');
    const usuario = canvas.getByTestId('usuario');

    const borde = getComputedStyle(asistente).borderTopColor;

    // El triángulo exterior lleva el color del borde; el interior, el de la
    // superficie: dos colores distintos, o la cola sería maciza.
    const fueraA = getComputedStyle(asistente, '::before');
    const dentroA = getComputedStyle(asistente, '::after');
    await expect(fueraA.borderRightColor).toBe(borde);
    await expect(dentroA.borderRightColor).not.toBe(borde);

    // Y sale por el lado contrario en cada emisor.
    const fueraU = getComputedStyle(usuario, '::before');
    await expect(fueraU.borderLeftColor).toBe(borde);
    await expect(fueraU.borderRightColor).not.toBe(borde);
  },
};
