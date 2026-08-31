import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Carousel, CarouselSlide } from './Carousel';
import { Card } from '../Card/Card';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Logo } from '../../atoms/Logo/Logo';

const proyectos = [
  { id: 'junta', title: 'Formación para la Junta de Andalucía', description: 'Catálogo de cursos y tutorías para 4.000 empleados públicos.' },
  { id: 'randstad', title: 'Onboarding de Randstad', description: 'Itinerario de bienvenida en cinco módulos, medido de punta a punta.' },
  { id: 'mayo', title: 'Escuela de Grupo Mayo', description: 'Campus propio, con certificaciones y ruta de carrera.' },
  { id: 'meridianos', title: 'Meridianos', description: 'Programa de habilidades para equipos de intervención social.' },
];

const resenas = [
  { id: 'ana', quote: 'Entendieron el problema antes que nosotros. El curso salió en seis semanas.', author: 'Ana Ruiz', role: 'Directora de Personas' },
  { id: 'jorge', quote: 'La plataforma dejó de ser un obstáculo para pasar a ser parte del método.', author: 'Jorge Salas', role: 'Responsable de Formación' },
  { id: 'lucia', quote: 'Hicieron accesible lo que llevábamos años posponiendo.', author: 'Lucía Ferrer', role: 'Coordinadora académica' },
];

const meta: Meta<typeof Carousel> = {
  title: 'Molecules/Carousel',
  component: Carousel,
  parameters: { layout: 'padded' },
  argTypes: { className: { table: { disable: true } }, id: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

/** Una diapositiva a la vista: el ancho por defecto es la pista entera. */
export const PorDefecto: Story = {
  args: {
    label: 'Reseñas de clientes',
    indicators: true,
    children: resenas.map((resena) => (
      <CarouselSlide key={resena.id}>
        <Paragraph size="large">«{resena.quote}»</Paragraph>
        <Paragraph size="small">{resena.author} — {resena.role}</Paragraph>
      </CarouselSlide>
    )),
  },
};

/** Tarjetas: `slideSize` fija el ancho de cada diapositiva y se ven varias a la vez. */
export const Proyectos: Story = {
  args: {
    label: 'Proyectos',
    slideSize: 'min(20rem, 80%)',
    indicators: true,
    children: proyectos.map((proyecto) => (
      <CarouselSlide key={proyecto.id}>
        <Card href={`#${proyecto.id}`} title={proyecto.title} description={proyecto.description} ctaLabel="Ver el proyecto" />
      </CarouselSlide>
    )),
  },
};

/**
 * Logotipos de clientes: diapositivas estrechas, sin botones y con avance
 * automático. Es el caso «marquesina» — el carrusel se mueve solo y se para
 * al pasar el puntero o al entrar el foco.
 */
export const LogotiposEnMarcha: Story = {
  name: 'Logotipos en marcha',
  args: {
    label: 'Clientes',
    slideSize: 'min(12rem, 45%)',
    controls: false,
    autoplay: 2000,
    children: ['junta', 'randstad', 'mayo', 'meridianos', 'linkup', 'sanitas'].map((id) => (
      <CarouselSlide key={id}>
        <Logo size="lg" />
      </CarouselSlide>
    )),
  },
};

/** Test: WCAG 2.2.2 — el avance automático se puede parar, y al pararse la
 *  región viva empieza a anunciar la diapositiva vigente. */
export const ContratoPausa: Story = {
  name: 'Test — pausa del avance automático y región viva',
  tags: ['!dev'],
  args: { ...LogotiposEnMarcha.args, controls: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const estado = canvas.getByRole('status');
    // Mientras avanza solo, la región calla: anunciar cada salto sería ruido
    await expect(estado).toHaveAttribute('aria-live', 'off');
    await expect(estado).toHaveTextContent('Diapositiva 1 de 6');

    await userEvent.click(canvas.getByRole('button', { name: 'Pausar' }));
    await expect(canvas.getByRole('button', { name: 'Reproducir' })).toBeInTheDocument();
    await expect(estado).toHaveAttribute('aria-live', 'polite');

    // Y se reanuda desde el mismo botón
    await userEvent.click(canvas.getByRole('button', { name: 'Reproducir' }));
    await expect(canvas.getByRole('button', { name: 'Pausar' })).toBeInTheDocument();
  },
};

/** Sobre superficie oscura: indicadores, botones y texto voltean con la superficie. */
export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: PorDefecto.args,
};

/** Sin indicadores ni botones: queda el desplazamiento nativo, que sigue funcionando. */
export const SoloPista: Story = {
  name: 'Solo pista',
  args: { ...Proyectos.args, controls: false, indicators: false },
};

export const Contrato: Story = {
  name: 'Test — región, pista con foco e indicadores',
  tags: ['!dev'],
  args: PorDefecto.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole('region', { name: 'Reseñas de clientes' });
    await expect(region).toHaveAttribute('aria-roledescription', 'carrusel');

    const track = canvas.getByRole('group', { name: 'Diapositivas' });
    await expect(track).toHaveAttribute('tabindex', '0');
    await expect(track.children).toHaveLength(3);
    await expect(track.children[0]).toHaveAttribute('aria-roledescription', 'diapositiva');

    const indicadores = canvas.getAllByRole('button', { name: /Ir a la diapositiva/ });
    await expect(indicadores).toHaveLength(3);
    await expect(indicadores[0]).toHaveAttribute('aria-current', 'true');

    // El botón «siguiente» desplaza la pista: en jsdom el scroll no se anima,
    // pero el contrato es que exista y sea pulsable sin abrir nada.
    const siguiente = canvas.getByRole('button', { name: 'Siguiente' });
    await userEvent.click(siguiente);
    await expect(siguiente).toBeInTheDocument();
  },
};
