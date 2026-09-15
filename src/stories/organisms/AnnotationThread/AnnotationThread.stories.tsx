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

/* Las acciones del pie se pasan sueltas: es el pie quien les da la línea
   entera, y un `Inline` por medio se la quedaría él. */
const accionesDeHilo = (
  <>
    <Button size="sm" variant="outline">Resolver</Button>
    <Button size="sm" variant="ghost">Responder</Button>
  </>
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
      <>
        <Button size="sm" variant="outline">Resolver</Button>
        <Button size="sm" variant="ghost">Reabrir</Button>
      </>
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
      actions={ESTADOS.filter((otro) => otro !== status).map((otro) => (
        <Button key={otro} size="sm" variant="outline" onClick={() => setStatus(otro)}>
          Marcar como {ROTULOS[otro].toLowerCase()}
        </Button>
      ))}
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
 * Lo que un comentario de revisión lleva además del texto: la **captura** entra
 * por `body` —un `Figure`, que es quien tiene la proporción—, y el **enlace a la
 * lección** por `meta`, al lado de la fecha, porque es la coordenada de la
 * anotación y no una acción sobre ella.
 */
export const ConCapturaYEnlace: Story = {
  name: 'Con captura y enlace a la lección',
  args: {
    status: 'acknowledged',
    annotation: {
      ...raiz,
      meta: <Link href="#leccion-4">Evaluación por rúbrica</Link>,
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
          <Button size="sm" variant="ghost">Editar</Button>
          <Button size="sm" variant="ghost" destructive>Borrar</Button>
        </Inline>
      ),
    },
    actions: <Button size="sm" variant="outline">Resolver</Button>,
  },
};

/**
 * `meta` es **por anotación**: cada una tiene su fecha y su coordenada, y la
 * respuesta puede apuntar a otro sitio que la anotación que abre el hilo.
 */
export const CoordenadaPorAnotacion: Story = {
  name: 'Coordenada por anotación',
  args: {
    annotation: {
      ...raiz,
      meta: <Link href="#leccion-4">Evaluación por rúbrica</Link>,
    },
    replies: [
      {
        ...respuestas[0],
        meta: <Link href="#glosario">Glosario del proyecto</Link>,
      },
      respuestas[1],
    ],
    actions: accionesDeHilo,
  },
};

/**
 * Una coordenada larga no echa la fecha de la vista: va la última de la fila,
 * así que baja de línea, y si es un texto sin espacios se parte dentro. El hilo
 * va aquí dentro de una caja estrecha para enseñarlo sin redimensionar nada.
 */
export const CoordenadaLarga: Story = {
  name: 'Coordenada larga',
  render: () => (
    <div style={{ maxInlineSize: '20rem' }}>
      <AnnotationThread
        annotation={{
          ...raiz,
          edited: true,
          meta: (
            <Link href="#leccion-4">
              Módulo 3 · Evaluación por rúbrica y retroalimentación entre iguales
            </Link>
          ),
        }}
        actions={accionesDeHilo}
      />
    </div>
  ),
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

/**
 * Test: el pie da la línea entera a cada acción, y lo hace también en
 * escritorio —la ventana del test es ancha—: el hilo vive en un panel de
 * revisión, así que lo que mide el hueco no lo dice la anchura de la pantalla.
 */
export const TestAccionesALaLinea: Story = {
  name: 'Test — el pie da la línea entera a cada acción',
  tags: ['!dev'],
  args: { annotation: raiz, actions: accionesDeHilo },
  play: async ({ canvasElement }) => {
    const pie = canvasElement.querySelector('.annotation-thread__actions') as HTMLElement;
    const botones = Array.from(pie.querySelectorAll<HTMLElement>('.button'));
    await expect(botones).toHaveLength(2);

    // Cada botón, la ranura entera…
    for (const boton of botones) {
      await expect(boton.getBoundingClientRect().width).toBeCloseTo(
        pie.getBoundingClientRect().width,
        0,
      );
    }
    // …y uno debajo de otro, no en fila.
    await expect(botones[1].getBoundingClientRect().top).toBeGreaterThanOrEqual(
      botones[0].getBoundingClientRect().bottom,
    );
  },
};

export const TestCoordenada: Story = {
  name: 'Test — la coordenada va en la fila de la fecha, no en el pie',
  tags: ['!dev'],
  args: {
    annotation: {
      ...raiz,
      meta: <Link href="#leccion-4">Evaluación por rúbrica</Link>,
      actions: <Button size="sm" variant="ghost">Editar</Button>,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enlace = canvas.getByRole('link', { name: 'Evaluación por rúbrica' });

    // La coordenada vive en la cabecera, con la fecha; no en las acciones.
    const cabecera = enlace.closest('.annotation-thread__header');
    await expect(cabecera).not.toBeNull();
    await expect(cabecera!.querySelector('time')).not.toBeNull();
    await expect(enlace.closest('.annotation-thread__item-actions')).toBeNull();

    // Y va DESPUÉS de la fecha: al estrecharse baja ella, no la fecha.
    const fecha = cabecera!.querySelector('time')!;
    await expect(
      fecha.compareDocumentPosition(enlace) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  },
};

export const TestCoordenadaEstrecha: Story = {
  name: 'Test — al estrecharse baja la coordenada, no la fecha',
  tags: ['!dev'],
  render: () => (
    <div style={{ maxInlineSize: '20rem' }}>
      <AnnotationThread
        annotation={{
          ...raiz,
          meta: (
            <Link href="#leccion-4">
              Módulo 3 · Evaluación por rúbrica y retroalimentación entre iguales
            </Link>
          ),
        }}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cabecera = canvas
      .getByRole('link', { name: /Módulo 3/ })
      .closest('.annotation-thread__header') as HTMLElement;
    const fecha = cabecera.querySelector('time') as HTMLElement;
    const coordenada = cabecera.querySelector('.annotation-thread__meta') as HTMLElement;

    // La fecha se queda en la primera línea de la fila; la coordenada baja.
    await expect(coordenada.offsetTop).toBeGreaterThan(fecha.offsetTop);
    // Y no desborda el hilo: se parte dentro de la ranura.
    const hilo = canvas.getByRole('article', { name: 'Hilo de anotaciones' });
    await expect(coordenada.getBoundingClientRect().right).toBeLessThanOrEqual(
      Math.ceil(hilo.getBoundingClientRect().right),
    );
  },
};
