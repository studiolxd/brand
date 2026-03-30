import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel, CarouselSlide } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Atoms/Carousel',
  component: Carousel,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const colors = [
  'var(--color-secondary)',
  'var(--color-tertiary)',
  'var(--color-quaternary)',
  'var(--color-quinary)',
  'var(--color-secondary)',
];

const labels = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4', 'Slide 5'];

const slideContent = labels.map((label, i) => (
  <CarouselSlide key={label}>
    <div
      style={{
        background: colors[i],
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {label}
    </div>
  </CarouselSlide>
));

/** Tamaño por defecto — 1.5 slides en móvil, 2.5 en tablet, 3.5 en desktop */
export const Default: Story = {
  render: () => (
    <div style={{ padding: '2rem 0' }}>
      <Carousel>{slideContent}</Carousel>
    </div>
  ),
};

/** slideSize personalizado — siempre 1 slide completo */
export const OnePorView: Story = {
  name: '1 slide por vista',
  render: () => (
    <div style={{ padding: '2rem 0' }}>
      <Carousel slideSize="100%">{slideContent}</Carousel>
    </div>
  ),
};

/** Sobre fondo oscuro — gradientColor para el degradado correcto */
export const DarkBackground: Story = {
  name: 'Fondo oscuro',
  render: () => (
    <div className="dark" style={{ background: 'var(--color-background-dark)', padding: '2rem 0' }}>
      <Carousel gradientColor="var(--color-background-dark)">{slideContent}</Carousel>
    </div>
  ),
  globals: { backgrounds: { value: 'dark' } },
};
