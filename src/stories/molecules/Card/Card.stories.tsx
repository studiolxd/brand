import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Inline } from '../../atoms/Inline/Inline';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Tag } from '../../atoms/Tag/Tag';

const foto = {
  src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=960&q=80',
  alt: 'Un aula con un grupo trabajando alrededor de una mesa',
};

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
    variant: {
      control: { type: 'inline-radio' },
      options: ['default', 'square', 'split'],
      description: 'Maqueta de la tarjeta.',
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
/** Cuadrada: la imagen arriba, en cuadrado, y el texto debajo. */
export const Cuadrada: Story = {
  args: {
    variant: 'square',
    color: 'accent-1',
    media: foto,
    title: 'Formación presencial',
    description: 'Talleres y sesiones en aula, con materiales propios.',
    ctaLabel: 'Ver más sobre formación presencial',
  },
};

/** Partida: el panel de color y la foto al mismo ancho. En móvil se apila. */
export const Partida: Story = {
  args: {
    variant: 'split',
    color: 'support-1',
    media: foto,
    title: 'Consultoría de aprendizaje',
    description: 'Acompañamos el diseño del plan de formación de punta a punta.',
    ctaLabel: 'Ver más sobre consultoría',
  },
};

/** La maqueta por defecto también acepta imagen: va sobre el texto. */
export const ConImagen: Story = {
  name: 'Con imagen',
  args: {
    color: 'outline',
    media: foto,
    title: 'Contenidos a medida',
    description: 'Producción de contenidos multimedia accesibles.',
    ctaLabel: 'Ver más sobre contenidos a medida',
  },
};

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
  tags: ['!dev'],
  render: () => (
    <Card data-tarjeta="card" aria-labelledby="card-t" className="extra">
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
    await expect(card).toHaveAttribute('data-tarjeta', 'card');
    await expect(card).toHaveAttribute('aria-labelledby', 'card-t');
    // el contenido interactivo funciona dentro
    await expect(canvas.getByRole('button', { name: 'Guardar' })).toBeInTheDocument();
  },
};

/**
 * La descripción admite marcado: aquí, dos párrafos del sistema y una etiqueta.
 * Con una cadena la tarjeta pone su `<p>`; con un nodo, el marcado lo trae quien
 * lo pasa.
 */
export const DescripcionRica: Story = {
  name: 'Descripción con marcado',
  args: {
    href: '#',
    color: 'outline',
    title: 'Contenidos elearning',
    description: (
      <>
        <Paragraph size="small">SCORM, xAPI y cmi5, con el player que haga falta.</Paragraph>
        <Paragraph size="small">Auditoría de accesibilidad incluida.</Paragraph>
      </>
    ),
    ctaLabel: 'Ver más sobre contenidos elearning',
  },
};

/**
 * En modo enlace, `children` va debajo de la descripción y encima de la flecha:
 * es el hueco para lo que no cabe en `title`/`description`. Nada interactivo —
 * todo el bloque ya es un enlace.
 */
export const EnlaceConHijos: Story = {
  name: 'Enlace con hijos',
  render: () => (
    <Card href="#" color="accent-1" title="Curso de Moodle" ctaLabel="Ver el curso de Moodle">
      <Inline gap="sm">
        <Tag variant="neutral">12 h</Tag>
        <Tag variant="neutral">Nivel medio</Tag>
      </Inline>
    </Card>
  ),
};

/**
 * Test: en modo enlace la descripción-nodo se pinta sin `<p>` extra y los
 * `children` entran en el enlace, antes de la flecha.
 */
export const ContratoHijosEnEnlace: Story = {
  name: 'Test — hijos y descripción rica en modo enlace',
  tags: ['!dev'],
  render: () => (
    <Card
      href="#"
      title="Curso de Moodle"
      description={<Paragraph size="small">Dos párrafos y una etiqueta.</Paragraph>}
      ctaLabel="Ver el curso"
    >
      <Tag variant="neutral">12 h</Tag>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const enlace = canvasElement.querySelector('a.card')!;
    // La descripción-nodo se pinta tal cual: un solo párrafo, el del consumidor.
    const parrafos = enlace.querySelectorAll('p');
    await expect(parrafos).toHaveLength(1);
    await expect(parrafos[0]).toHaveClass('paragraph');
    // Los hijos viven dentro del enlace…
    const etiqueta = canvas.getByText('12 h');
    await expect(enlace.contains(etiqueta)).toBe(true);
    // …antes de la flecha, que sigue cerrando la tarjeta.
    const flecha = enlace.querySelector('.arrow')!;
    await expect(etiqueta.compareDocumentPosition(flecha) & Node.DOCUMENT_POSITION_FOLLOWING)
      .toBeTruthy();
    // Y el CTA accesible sigue nombrando el enlace.
    await expect(enlace).toHaveAccessibleName(/Ver el curso/);
  },
};

/**
 * Enlace externo: `external` añade `target="_blank"` y el `rel` seguro, igual
 * que en `Button` y `Link`.
 */
export const Externa: Story = {
  name: 'Enlace externo',
  args: {
    href: 'https://studiolxd.com',
    external: true,
    color: 'outline',
    title: 'Studio LXD',
    description: 'Se abre en una pestaña nueva.',
    ctaLabel: 'Ir a studiolxd.com (se abre en una pestaña nueva)',
  },
};

/** Test: `external` pone `target` y `rel` en el `<a>`; sin él no hay ninguno de los dos. */
export const ContratoExterna: Story = {
  name: 'Test — external pone target y rel',
  tags: ['!dev'],
  render: () => (
    <>
      <Card href="https://studiolxd.com" external title="Externa" ctaLabel="Ver más" data-caso="externa" />
      <Card href="/interna" title="Interna" ctaLabel="Ver más" data-caso="interna" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const externa = canvasElement.querySelector('a[data-caso="externa"]')!;
    await expect(externa).toHaveAttribute('target', '_blank');
    await expect(externa).toHaveAttribute('rel', 'noopener noreferrer');
    const interna = canvasElement.querySelector('a[data-caso="interna"]')!;
    await expect(interna).not.toHaveAttribute('target');
    await expect(interna).not.toHaveAttribute('rel');
  },
};

/** Test: modo link (con `href`) — sigue renderizando `<a class="card card--…">` + flecha (criterio 1). */
export const LinkModeUnchanged: Story = {
  name: 'Test — link mode intacto',
  tags: ['!dev'],
  args: { href: '#', color: 'primary', title: 'Servicio', ctaLabel: 'Ver más' },
  play: async ({ canvasElement }) => {
    const link = canvasElement.querySelector('a.card')!;
    await expect(link).not.toBeNull();
    await expect(link).toHaveClass('card', 'card--primary');
    await expect(canvasElement.querySelector('.arrow')).not.toBeNull();
  },
};

/**
 * Composición con subpartes: cabecera con acción, cuerpo y pie. El título es un
 * encabezado de verdad y la descripción, un párrafo del sistema.
 */
export const ConSubpartes: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Clave de API</CardTitle>
        <CardDescription>Solo lectura</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Rotar</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Paragraph>
          Creada el 12 de marzo. Se usa para autenticar las llamadas del conector.
        </Paragraph>
      </CardContent>
      <CardFooter>
        <Button size="sm">Copiar</Button>
        <Button variant="outline" size="sm" destructive>Revocar</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * El nivel del título es independiente de su tamaño: el nivel dice de qué
 * encabezado cuelga la tarjeta, el tamaño cómo se ve.
 */
export const NivelDelTitulo: Story = {
  name: 'Nivel del título',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)' }}>
      <Heading level={2}>Integraciones</Heading>
      <Card>
        <CardHeader>
          <CardTitle level={3}>Webhook de facturación</CardTitle>
          <CardDescription>Cuelga del h2 de la sección.</CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle level={3} size={6}>Webhook de altas</CardTitle>
          <CardDescription>Mismo nivel, un tamaño mayor.</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

/**
 * `render` pone la tarjeta sobre el elemento de navegación de la aplicación
 * (el `Link` del router): mismas clases, mismo contenido, y la navegación la
 * lleva el router. Es el modo enlace cuando `href` no basta.
 */
export const ComoEnlaceDelRouter: Story = {
  name: 'Como enlace del router',
  render: () => (
    <Card
      render={<a data-router-link="" href="/servicios/lms" />}
      color="outline"
      title="Plataformas LMS"
      description="La navegación la lleva el router de la aplicación."
      ctaLabel="Ver más sobre plataformas LMS"
    />
  ),
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '24rem' }}>
      <Card href="#" color="primary" title="Diseño instruccional" description="Fondo lavanda autocontenido, como Button primary." ctaLabel="Ver más" />
      <Card href="#" color="outline" title="Plataformas LMS" description="Borde y fondo con par oscuro propio." ctaLabel="Ver más" />
      <Card href="#" color="accent-1" title="Contenidos elearning" description="Color saturado: mismo aspecto en ambos temas." ctaLabel="Ver más" />
      <Card href="#" color="support-2" title="Título de ejemplo" description="Variante support-2 (cayenne)." ctaLabel="Ver más" />
    </div>
  ),
};

/** Test: las subpartes son los elementos semánticos del sistema y se colocan en la rejilla. */
export const ContratoSubpartes: Story = {
  name: 'Test — subpartes: semántica y rejilla',
  tags: ['!dev'],
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle level={4} className="extra" data-parte="titulo">Clave de API</CardTitle>
        <CardDescription>Solo lectura</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">Rotar</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Paragraph>Creada el 12 de marzo.</Paragraph>
      </CardContent>
      <CardFooter>
        <Button size="sm">Copiar</Button>
      </CardFooter>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // El título es un encabezado real, del nivel pedido, con su clase BEM.
    const titulo = canvas.getByRole('heading', { name: 'Clave de API' });
    await expect(titulo.tagName).toBe('H4');
    await expect(titulo).toHaveClass('heading', 'card__title', 'extra');
    await expect(titulo).toHaveAttribute('data-parte', 'titulo');
    await expect(getComputedStyle(titulo).marginBlockStart).toBe('0px');
    // La descripción es el párrafo del sistema, no un div.
    const descripcion = canvas.getByText('Solo lectura');
    await expect(descripcion.tagName).toBe('P');
    await expect(descripcion).toHaveClass('paragraph', 'card__description');
    // La cabecera es una rejilla y la acción se va a la segunda columna.
    const header = canvasElement.querySelector('.card__header')!;
    await expect(getComputedStyle(header).display).toBe('grid');
    const accion = canvasElement.querySelector('.card__action')!;
    await expect(accion.getBoundingClientRect().right)
      .toBeGreaterThan(titulo.getBoundingClientRect().right);
    // El pie alinea sus acciones en fila.
    await expect(getComputedStyle(canvasElement.querySelector('.card__footer')!).display).toBe('flex');
  },
};

/** Test: `render` pinta la tarjeta sobre el elemento del consumidor, con su contenido de link-card. */
export const ContratoRender: Story = {
  name: 'Test — render sobre el enlace del consumidor',
  tags: ['!dev'],
  render: () => (
    <Card
      render={<a data-router-link="" href="/destino" />}
      href="/ignorado"
      color="primary"
      title="Servicio"
      ctaLabel="Ver más"
      data-card=""
    />
  ),
  play: async ({ canvasElement }) => {
    const enlace = canvasElement.querySelector('a.card')!;
    await expect(enlace).toHaveClass('card', 'card--primary');
    await expect(enlace).toHaveAttribute('data-router-link');
    await expect(enlace).toHaveAttribute('data-card');
    // `render` manda sobre `href`: el destino es el del elemento pasado.
    await expect(enlace.getAttribute('href')).toBe('/destino');
    // Y trae el contenido de link-card: encabezado, CTA accesible y flecha.
    await expect(within(canvasElement).getByRole('heading', { name: 'Servicio' })).toBeInTheDocument();
    await expect(canvasElement.querySelector('.arrow')).not.toBeNull();
  },
};

export const ContratoMaquetas: Story = {
  name: 'Test — square y split ponen imagen y caja de texto',
  tags: ['!dev'],
  args: Partida.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvasElement.querySelector('a.card')!;
    await expect(card).toHaveClass('card--split');
    await expect(card).toHaveClass('card--support-1');

    const imagen = canvas.getByRole('img', { name: /Un aula/ });
    await expect(imagen.parentElement).toHaveClass('card__media');
    await expect(canvas.getByRole('heading', { level: 2 }).parentElement).toHaveClass('card__body');
  },
};
