import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { AnnotationThread, type AnnotationEntry } from './AnnotationThread';
import { Button } from '../../atoms/Button/Button';
import { Inline } from '../../atoms/Inline/Inline';
import { Stack } from '../../atoms/Stack/Stack';

const meta: Meta<typeof AnnotationThread> = {
  title: 'Organisms/AnnotationThread',
  component: AnnotationThread,
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: { type: 'inline-radio' }, options: ['open', 'resolved'] },
  },
};

export default meta;
type Story = StoryObj<typeof AnnotationThread>;

const raiz: AnnotationEntry = {
  id: 'a1',
  author: 'Marta Ruiz',
  date: '2026-08-24T10:12:00Z',
  body: 'En el segundo párrafo la traducción usa «formación» donde el original dice «training»; en este curso venimos usando «capacitación».',
};

const respuestas: AnnotationEntry[] = [
  {
    id: 'a2',
    author: 'Luis Peña',
    date: '2026-08-24T11:40:00Z',
    body: 'De acuerdo, lo unifico con el glosario del proyecto.',
  },
  {
    id: 'a3',
    author: 'Marta Ruiz',
    date: '2026-08-24T12:02:00Z',
    body: 'Gracias. Reviso el resto de la lección por si aparece en más sitios.',
    edited: true,
  },
];

const accionesDeHilo = (
  <Inline gap="sm">
    <Button size="sm" variant="outline">Resolver</Button>
    <Button size="sm" variant="ghost">Responder</Button>
  </Inline>
);

/** Un hilo abierto: estado, autor, fecha y acciones. */
export const PorDefecto: Story = {
  args: { annotation: raiz, replies: respuestas, actions: accionesDeHilo },
};

/** Sin respuestas todavía. */
export const SinRespuestas: Story = {
  args: { annotation: raiz, actions: accionesDeHilo },
};

/** Resuelto: sigue ahí, pero deja de pedir atención. */
export const Resuelto: Story = {
  args: {
    annotation: raiz,
    replies: respuestas,
    status: 'resolved',
    actions: <Button size="sm" variant="outline">Reabrir</Button>,
  },
};

/** Cada anotación puede llevar sus propias acciones. */
export const ConAccionesPorAnotacion: Story = {
  args: {
    annotation: {
      ...raiz,
      actions: (
        <Inline gap="sm">
          <Button size="sm" variant="ghost">Editar</Button>
          <Button size="sm" variant="ghost" destructive>Borrar</Button>
        </Inline>
      ),
    },
    replies: respuestas,
  },
};

/** Varios hilos, como se ven en un panel de revisión. */
export const PanelDeRevision: Story = {
  render: () => (
    <Stack>
      <AnnotationThread annotation={raiz} replies={respuestas} actions={accionesDeHilo} />
      <AnnotationThread
        annotation={{
          id: 'b1',
          author: 'Ana Gil',
          date: '2026-08-22T09:00:00Z',
          body: 'La imagen de la portada no tiene texto alternativo.',
        }}
        status="resolved"
        actions={<Button size="sm" variant="outline">Reabrir</Button>}
      />
    </Stack>
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { annotation: raiz, replies: respuestas, actions: accionesDeHilo },
};

export const TestEstructura: Story = {
  name: 'Test — estado, autor, fecha legible por máquina y recuento',
  tags: ['!dev'],
  args: { annotation: raiz, replies: respuestas },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hilo = canvas.getByRole('article', { name: 'Hilo de anotaciones' });

    await expect(within(hilo).getByText('Abierta')).toBeInTheDocument();
    await expect(within(hilo).getByText('Marta Ruiz')).toBeInTheDocument();
    await expect(within(hilo).getByText('2 respuestas')).toBeInTheDocument();
    await expect(hilo.querySelector('time')).toHaveAttribute('datetime', '2026-08-24T10:12:00.000Z');
  },
};
