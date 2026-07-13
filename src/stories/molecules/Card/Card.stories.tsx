import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Card } from './Card';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'outline', 'accent-1', 'accent-2', 'support-1', 'support-2'],
      description: 'Color de fondo.',
    },
  },
  args: {
    href: '#',
    ctaLabel: 'Ver más',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    color: 'primary',
    title: 'Diseño instruccional',
    description: 'Creamos experiencias de aprendizaje efectivas y atractivas centradas en el usuario.',
    ctaLabel: 'Ver más sobre diseño instruccional',
  },
};

export const Outline: Story = {
  args: {
    color: 'outline',
    title: 'Plataformas LMS',
    description: 'Desarrollamos plataformas de aprendizaje adaptadas a tu identidad visual.',
    ctaLabel: 'Ver más sobre plataformas LMS',
  },
};

export const Accent1: Story = {
  args: {
    color: 'accent-1',
    title: 'Contenidos elearning',
    description: 'Diseñamos contenidos multimedia interactivos para formación online, utilizando estándares como SCORM y xAPI.',
    ctaLabel: 'Ver más sobre contenidos elearning',
  },
};

export const Accent2: Story = {
  args: {
    color: 'accent-2',
    title: 'Plataformas elearning',
    description: 'Desarrollamos plataformas elearning adaptadas a tu identidad visual y centradas en las personas usuarias para lograr una experiencia de aprendizaje gratificante.',
    ctaLabel: 'Ver más sobre plataformas elearning',
  },
};

export const Support1: Story = {
  args: {
    color: 'support-1',
    title: 'Título de ejemplo',
    description: 'Descripción de ejemplo para la variante support-1 (emerald).',
    ctaLabel: 'Ver más',
  },
};

export const Support2: Story = {
  args: {
    color: 'support-2',
    title: 'Título de ejemplo',
    description: 'Descripción de ejemplo para la variante support-2 (cayenne).',
    ctaLabel: 'Ver más',
  },
};

/**
 * Modo contenedor (sin `href`): superficie de app con contenido interactivo dentro
 * (no es un enlace, así que se permiten botones/formularios). Sin flecha ni heading impuesto.
 */
export const Container: Story = {
  name: 'Contenedor (sin href)',
  render: () => (
    <Card style={{ maxWidth: '24rem' }}>
      <Heading level={3} size={6}>Ajustes de cuenta</Heading>
      <Paragraph>Gestiona tu plan y método de pago.</Paragraph>
      <Button variant="outline">Cambiar plan</Button>
    </Card>
  ),
};

/**
 * Test: modo contenedor (`<form>` + `<Button>` dentro), `data-*`/`aria-*`/`className`
 * en el `<div>`, sin `<a>` ni flecha (criterios 2, 3, 4).
 */
export const ContainerMode: Story = {
  name: 'Test — contenedor + passthrough',
  render: () => (
    <Card data-slot="card" aria-labelledby="card-t" className="extra">
      <Heading level={3} size={6} id="card-t">Formulario</Heading>
      <form aria-label="demo">
        <Button>Guardar</Button>
      </form>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // no es un enlace y no hay flecha
    await expect(canvasElement.querySelector('a')).toBeNull();
    await expect(canvasElement.querySelector('.arrow')).toBeNull();
    // el <div> lleva las clases (color default outline) + className al final + rest
    const card = canvasElement.querySelector('.card')!;
    await expect(card.tagName).toBe('DIV');
    await expect(card).toHaveClass('card', 'card--outline', 'extra');
    await expect(card.className.trim().endsWith('extra')).toBe(true);
    await expect(card).toHaveAttribute('data-slot', 'card');
    await expect(card).toHaveAttribute('aria-labelledby', 'card-t');
    // el contenido interactivo funciona dentro
    await expect(canvas.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  },
};

/** Test: modo link (con `href`) — sigue renderizando `<a class="card card--…">` + flecha (criterio 1). */
export const LinkModeUnchanged: Story = {
  name: 'Test — link mode intacto',
  args: { href: '#', color: 'primary', title: 'Servicio', ctaLabel: 'Ver más' },
  play: async ({ canvasElement }) => {
    const link = canvasElement.querySelector('a.card')!;
    await expect(link).not.toBeNull();
    await expect(link).toHaveClass('card', 'card--primary');
    await expect(canvasElement.querySelector('.arrow')).not.toBeNull();
  },
};
