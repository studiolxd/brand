import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Container } from './Container';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    width: {
      control: { type: 'select' },
      options: ['md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Ancho máximo del contenido interior.',
    },
    space: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Aire vertical de la banda.',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Container>;

const Demo = () => (
  <>
    <Heading level={3} size={6}>Contenido acotado</Heading>
    <Paragraph>
      La banda ocupa todo el ancho de la ventana; este texto se queda dentro de
      la medida y se centra.
    </Paragraph>
  </>
);

/** Por defecto: banda a sangre, contenido a 1280px. */
export const PorDefecto: Story = {
  args: { space: 'xl', children: <Demo /> },
};

/** El fondo llega de lado a lado aunque el contenido esté acotado. */
export const ConFondoASangre: Story = {
  args: {
    as: 'section',
    space: '2xl',
    surface: 'dark',
    children: <Demo />,
  },
};

/** Variante estrecha: formularios de acceso, páginas legales, avisos. */
export const Estrecho: Story = {
  args: { width: 'md', space: 'lg', children: <Demo /> },
};

/**
 * Test: el exterior ocupa el 100% y es quien pinta el fondo; el interior es el
 * que limita y centra. `full` no impone límite.
 */
export const Comportamiento: Story = {
  name: 'Test — sangra fuera, acota dentro',
  tags: ['!dev'],
  render: () => (
    <>
      <Container as="section" width="xl" space="xl" data-testid="banda">
        <p>acotado</p>
      </Container>
      <Container width="full" data-testid="sin-limite">
        <p>sin límite</p>
      </Container>
    </>
  ),
  play: async ({ canvasElement }) => {
    const banda = canvasElement.querySelector('[data-testid="banda"]')!;
    const inner = banda.querySelector('.container__inner')!;

    // la banda ocupa todo el ancho disponible: el fondo puede sangrar
    await expect(banda.getBoundingClientRect().width).toBe(
      canvasElement.getBoundingClientRect().width,
    );
    // el interior acota y se centra
    await expect(getComputedStyle(inner).maxInlineSize).toBe('1280px');
    await expect(getComputedStyle(inner).marginInlineStart).toBe(
      getComputedStyle(inner).marginInlineEnd,
    );
    // el aire vertical va en el exterior, no en el contenido
    await expect(getComputedStyle(banda).paddingBlockStart).not.toBe('0px');
    // `full` no impone medida
    const libre = canvasElement.querySelector('[data-testid="sin-limite"] .container__inner')!;
    await expect(libre.classList.contains('container__inner--full')).toBe(false);
    await expect(getComputedStyle(libre).maxInlineSize).toBe('100%');
  },
};

/** Test: `surface="dark"` pinta el lienzo oscuro y el texto voltea con él. */
export const SuperficieEmparejada: Story = {
  name: 'Test — fondo y color voltean juntos',
  tags: ['!dev'],
  render: () => (
    <Container surface="dark" data-testid="oscura">
      <p>texto</p>
    </Container>
  ),
  play: async ({ canvasElement }) => {
    const banda = canvasElement.querySelector('[data-testid="oscura"]')!;
    const cs = getComputedStyle(banda);
    const oscuro = getComputedStyle(banda).getPropertyValue('--color-background-dark').trim();
    const claro = getComputedStyle(banda).getPropertyValue('--color-text-on-dark').trim();
    const toRgb = (hex: string) => {
      const v = hex.replace('#', '');
      return `rgb(${parseInt(v.slice(0, 2), 16)}, ${parseInt(v.slice(2, 4), 16)}, ${parseInt(v.slice(4, 6), 16)})`;
    };
    await expect(cs.backgroundColor).toBe(toRgb(oscuro));
    await expect(cs.color).toBe(toRgb(claro));
  },
};
