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
        color: 'var(--color-text-default)',
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
  name: '1 slide per view',
  render: () => (
    <div style={{ padding: '2rem 0' }}>
      <Carousel slideSize="100%">{slideContent}</Carousel>
    </div>
  ),
};

/** Sobre fondo oscuro — gradientColor para que el degradado se funda con el contenedor */
export const OnDark: Story = {
  name: 'On dark background',
  render: () => (
    <div
      className="surface-dark"
      style={{ backgroundColor: 'var(--color-background-dark)', padding: '2rem 0' }}
    >
      <Carousel gradientColor="var(--color-background-dark)">{slideContent}</Carousel>
    </div>
  ),
};

/** Sin botones prev/next — útil cuando el scroll se gestiona externamente */
export const HideButtons: Story = {
  name: 'Without buttons',
  render: () => (
    <div style={{ padding: '2rem 0' }}>
      <Carousel hideButtons>{slideContent}</Carousel>
    </div>
  ),
};
