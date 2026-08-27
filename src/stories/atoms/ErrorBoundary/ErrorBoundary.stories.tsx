import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ErrorBoundary } from './ErrorBoundary';
import { Paragraph } from '../Paragraph/Paragraph';
import { Alert } from '../../molecules/Alert/Alert';

function Explota(): never {
  throw new Error('Este hijo lanza al renderizar');
}

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Atoms/ErrorBoundary',
  component: ErrorBoundary,
  parameters: { layout: 'padded' },
  argTypes: { children: { table: { disable: true } }, fallback: { table: { disable: true } }, onError: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof ErrorBoundary>;

/** Un hijo lanza y no hay `fallback`: no se pinta nada, pero el resto de la página sigue. */
export const SinFallback: Story = {
  render: () => (
    <>
      <ErrorBoundary>
        <Explota />
      </ErrorBoundary>
      <Paragraph>Este párrafo está fuera del límite y se sigue viendo.</Paragraph>
    </>
  ),
};

/** Con `fallback`: lo que se pinta en lugar del hijo que ha fallado. */
export const ConFallback: Story = {
  render: () => (
    <ErrorBoundary fallback={<Alert variant="error" title="Esta parte no se ha podido cargar" />}>
      <Explota />
    </ErrorBoundary>
  ),
};

export const Contrato: Story = {
  name: 'Test — el hijo que lanza desaparece y el resto sigue vivo',
  tags: ['!dev'],
  render: () => (
    <>
      <ErrorBoundary>
        <Explota />
      </ErrorBoundary>
      <ErrorBoundary fallback={<span>fallback</span>}>
        <Explota />
      </ErrorBoundary>
      <Paragraph>Sigo aquí</Paragraph>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Sigo aquí')).toBeInTheDocument();
    await expect(canvas.getByText('fallback')).toBeInTheDocument();
    await expect(canvas.queryByText(/lanza al renderizar/)).not.toBeInTheDocument();
  },
};
