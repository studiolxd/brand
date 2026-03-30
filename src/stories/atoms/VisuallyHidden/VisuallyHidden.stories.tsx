import type { Meta, StoryObj } from '@storybook/react-vite';
import { VisuallyHidden } from './VisuallyHidden';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

/**
 * El texto está oculto visualmente pero presente en el DOM.
 * Los lectores de pantalla lo anuncian. Inspecciona el DOM para verlo.
 */
export const Default: Story = {
  render: () => (
    <p>
      Este párrafo tiene un texto visible y
      <VisuallyHidden> (y este texto solo lo leen los lectores de pantalla)</VisuallyHidden>
      {' '}sin texto oculto aparente.
    </p>
  ),
};

/** Caso de uso típico: texto accesible para un CTA sin etiqueta visible */
export const CTALabel: Story = {
  name: 'Accessible CTA label',
  render: () => (
    <a href="#">
      Ver proyecto<VisuallyHidden> — Diseño de identidad corporativa</VisuallyHidden>
    </a>
  ),
};
