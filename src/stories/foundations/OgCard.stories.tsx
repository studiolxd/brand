import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { ogCard } from '../og/ogCard';

import { OgPreview } from './OgPreview';

const meta: Meta<typeof OgPreview> = {
  title: 'Foundations/Tarjeta social',
  component: OgPreview,
  parameters: {
    layout: 'padded',
  },
};
export default meta;

type Story = StoryObj<typeof OgPreview>;

export const Completa: Story = {
  name: 'Con eyebrow y subtítulo',
  render: () => (
    <OgPreview>
      {ogCard({
        eyebrow: 'Documentación',
        title: 'Cómo montar una lección con plantillas',
        subtitle: 'De la plantilla al alumno, en cinco pasos.',
      })}
    </OgPreview>
  ),
};

export const SoloTitulo: Story = {
  name: 'Solo el título',
  render: () => <OgPreview>{ogCard({ title: 'Panel de operaciones' })}</OgPreview>,
};

export const TestElArbolEsElQueSePinta: Story = {
  name: 'Test — el árbol lleva los textos que se le pasan',
  tags: ['!dev'],
  render: () => (
    <OgPreview>
      {ogCard({
        eyebrow: 'Documentación',
        title: 'Cómo montar una lección',
        subtitle: 'De la plantilla al alumno.',
      })}
    </OgPreview>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Documentación')).toBeInTheDocument();
    await expect(canvas.getByText('Cómo montar una lección')).toBeInTheDocument();
    await expect(canvas.getByText('De la plantilla al alumno.')).toBeInTheDocument();
  },
};
