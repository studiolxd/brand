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

/**
 * Anidar bandas no duplica el aire lateral. La de fuera pone el aire; la de
 * dentro —que suele estar ahí para acotar el contenido o pintar su propia
 * superficie— sale a cero sola, sin `flush`.
 */
export const Anidado: Story = {
  name: 'Banda dentro de banda',
  render: () => (
    <Container space="lg" data-testid="fuera">
      <Heading level={2}>Sección</Heading>
      <Paragraph>El aire lateral lo pone esta banda.</Paragraph>
      <Container surface="dark" space="md" width="lg" data-testid="dentro">
        <Heading level={3}>Banda oscura anidada</Heading>
        <Paragraph>No repite el aire lateral: el texto no se estrecha el doble.</Paragraph>
      </Container>
    </Container>
  ),
};

/** Test: la banda anidada pierde el aire lateral; dentro de una `flush`, lo conserva. */
export const ContratoAnidado: Story = {
  name: 'Test — el aire lateral no se duplica al anidar',
  tags: ['!dev'],
  render: () => (
    <>
      <Container space="md" data-testid="fuera">
        <Container data-testid="dentro">
          <p>anidada</p>
        </Container>
      </Container>
      <Container flush data-testid="fuera-flush">
        <Container data-testid="dentro-de-flush">
          <p>anidada en una banda a sangre</p>
        </Container>
      </Container>
    </>
  ),
  play: async ({ canvasElement }) => {
    const aire = (testid: string) =>
      getComputedStyle(canvasElement.querySelector(`[data-testid="${testid}"]`)!).paddingInlineStart;

    // La de fuera pone el aire del sistema…
    await expect(parseFloat(aire('fuera'))).toBeGreaterThan(0);
    // …y la de dentro no lo repite.
    await expect(aire('dentro')).toBe('0px');
    // Dentro de una banda a sangre, en cambio, la de dentro sí lleva el suyo:
    // es justo para lo que se anida ahí.
    await expect(aire('fuera-flush')).toBe('0px');
    await expect(parseFloat(aire('dentro-de-flush'))).toBeGreaterThan(0);
  },
};

/**
 * Una sección del sistema se monta a sangre: su aire vertical es suyo y el
 * lateral lo pone su `Container` interior. Un `Container` anidado dentro de
 * ella —para acotar un bloque o pintar una superficie— no repite ese aire.
 */
export const SeccionASangre: Story = {
  name: 'Sección a sangre',
  render: () => (
    <section style={{ paddingBlock: 'var(--section-padding-block-2xl)' }} data-testid="seccion">
      <Container data-testid="aire-de-la-seccion">
        <Heading level={2}>Una sección con su propio aire</Heading>
        <Paragraph>El vertical es de la sección; el lateral, de este Container.</Paragraph>
        <Container surface="dark" space="md" width="lg" data-testid="anidado">
          <Paragraph>Un bloque anidado: no repite el aire lateral.</Paragraph>
        </Container>
      </Container>
    </section>
  ),
};

/**
 * Test: dentro de una sección a sangre, el `Container` interior pone el aire
 * lateral una sola vez; el que se anide dentro de él sale a cero. Es el mismo
 * contrato de anidamiento, con la sección de por medio.
 */
export const ContratoSeccionASangre: Story = {
  name: 'Test — dentro de una sección a sangre el aire lateral no se duplica',
  tags: ['!dev'],
  render: SeccionASangre.render,
  play: async ({ canvasElement }) => {
    const aire = (testid: string) =>
      getComputedStyle(canvasElement.querySelector(`[data-testid="${testid}"]`)!).paddingInlineStart;

    // La sección no pone aire lateral: lo pone su Container interior…
    await expect(aire('seccion')).toBe('0px');
    await expect(parseFloat(aire('aire-de-la-seccion'))).toBeGreaterThan(0);
    // …y una banda anidada dentro de él no lo repite.
    await expect(aire('anidado')).toBe('0px');

    // El contenido de la banda anidada cae en la misma columna que el resto.
    const interior = (testid: string) =>
      canvasElement.querySelector(`[data-testid="${testid}"] > .container__inner`)!.getBoundingClientRect();
    await expect(Math.round(interior('anidado').left)).toBeGreaterThanOrEqual(
      Math.round(interior('aire-de-la-seccion').left),
    );
  },
};
