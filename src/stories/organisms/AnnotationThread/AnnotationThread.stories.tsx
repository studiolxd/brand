import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import {
  AnnotationThread,
  type AnnotationEntry,
  type AnnotationThreadStatus,
} from './AnnotationThread';
import { Button } from '../../atoms/Button/Button';
import { Figure } from '../../atoms/Figure/Figure';
import { Inline } from '../../atoms/Inline/Inline';
import { Link } from '../../atoms/Link/Link';
import { Stack } from '../../atoms/Stack/Stack';

const meta: Meta<typeof AnnotationThread> = {
  title: 'Organisms/AnnotationThread',
  component: AnnotationThread,
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: { type: 'inline-radio' }, options: ['open', 'acknowledged', 'resolved'] },
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

/** Atendido: alguien ya lo ha mirado, pero el asunto no está cerrado. */
export const Atendido: Story = {
  args: {
    annotation: raiz,
    replies: respuestas,
    status: 'acknowledged',
    actions: (
      <Inline gap="sm">
        <Button size="sm" variant="outline">Resolver</Button>
        <Button size="sm" variant="ghost">Reabrir</Button>
      </Inline>
    ),
  },
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

export const TestEstructura: Story = {
  name: 'Test — estado, autor, fecha legible por máquina y recuento',
  tags: ['!dev'],
  args: { annotation: raiz, replies: respuestas },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hilo = canvas.getByRole('article', { name: 'Hilo de anotaciones' });

    await expect(within(hilo).getByText('Abierta')).toBeInTheDocument();
    // Marta escribe la raíz y también la última respuesta: se comprueba la
    // anotación que abre el hilo, no «alguna con ese nombre».
    const raizPintada = within(hilo).getAllByRole('article')[0] as HTMLElement;
    await expect(within(raizPintada).getByText('Marta Ruiz')).toBeInTheDocument();
    await expect(within(hilo).getByText('2 respuestas')).toBeInTheDocument();
    await expect(hilo.querySelector('time')).toHaveAttribute('datetime', '2026-08-24T10:12:00.000Z');
  },
};

const ROTULOS: Record<AnnotationThreadStatus, string> = {
  open: 'Abierta',
  acknowledged: 'Atendida',
  resolved: 'Resuelta',
};

const ESTADOS = Object.keys(ROTULOS) as AnnotationThreadStatus[];

/**
 * Los tres estados y las transiciones entre ellos: el pie ofrece **a dónde se
 * puede ir desde donde se está**, que es como lo pinta un panel de revisión.
 */
function HiloConTransiciones() {
  const [status, setStatus] = useState<AnnotationThreadStatus>('open');
  return (
    <AnnotationThread
      annotation={raiz}
      replies={respuestas}
      status={status}
      actions={
        <Inline gap="sm">
          {ESTADOS.filter((otro) => otro !== status).map((otro) => (
            <Button key={otro} size="sm" variant="outline" onClick={() => setStatus(otro)}>
              Marcar como {ROTULOS[otro].toLowerCase()}
            </Button>
          ))}
        </Inline>
      }
    />
  );
}

export const Transiciones: Story = {
  render: () => <HiloConTransiciones />,
};

/** Los tres, uno al lado del otro: la presencia baja según avanza el estado. */
export const LosTresEstados: Story = {
  name: 'Los tres estados',
  render: () => (
    <Stack>
      {ESTADOS.map((status) => (
        <AnnotationThread key={status} annotation={raiz} status={status} />
      ))}
    </Stack>
  ),
};

/**
 * Lo que un comentario de revisión lleva además del texto —una **captura** y un
 * **enlace a la lección**— entra por las ranuras que ya hay: la captura es un
 * `Figure` dentro de `body`, y el enlace, un `Link` en las acciones de la
 * anotación. El organismo no necesita ranuras propias para esto.
 */
export const ConCapturaYEnlace: Story = {
  name: 'Con captura y enlace a la lección',
  args: {
    status: 'acknowledged',
    annotation: {
      ...raiz,
      body: (
        <Stack gap="md">
          <p>El botón de la lección se sale de la caja a partir de 900px de ancho.</p>
          <Figure
            ratio="16:9"
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=960&q=80"
            alt="Captura de la lección con el botón desbordado"
          />
        </Stack>
      ),
      actions: (
        <Inline gap="sm">
          <Link href="#leccion-4">Ir a la lección «Evaluación por rúbrica»</Link>
        </Inline>
      ),
    },
    actions: <Button size="sm" variant="outline">Resolver</Button>,
  },
};

export const TestTransiciones: Story = {
  name: 'Test — el pie ofrece los otros dos estados y el rótulo cambia',
  tags: ['!dev'],
  render: () => <HiloConTransiciones />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hilo = canvas.getByRole('article', { name: 'Hilo de anotaciones' });

    await expect(within(hilo).getByText('Abierta')).toBeInTheDocument();
    await expect(within(hilo).queryByRole('button', { name: 'Marcar como abierta' })).toBeNull();

    await userEvent.click(within(hilo).getByRole('button', { name: 'Marcar como atendida' }));
    await expect(within(hilo).getByText('Atendida')).toBeInTheDocument();
    await expect(hilo).toHaveClass('annotation-thread--acknowledged');

    await userEvent.click(within(hilo).getByRole('button', { name: 'Marcar como resuelta' }));
    await expect(within(hilo).getByText('Resuelta')).toBeInTheDocument();
    await expect(hilo).toHaveClass('annotation-thread--resolved');
  },
};
