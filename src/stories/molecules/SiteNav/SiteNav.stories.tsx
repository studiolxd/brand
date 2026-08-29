import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SiteNav, type SiteNavGroup } from './SiteNav';
import { Container } from '../../atoms/Container/Container';

const groups: SiteNavGroup[] = [
  { id: 'soluciones', label: 'Soluciones', href: '#soluciones', items: [
    { id: 'contenidos', label: 'Contenidos elearning', href: '#contenidos', current: true },
    { id: 'plataformas', label: 'Plataformas LMS', href: '#plataformas' },
    { id: 'diseno', label: 'Diseño instruccional', href: '#diseno' },
  ] },
  { id: 'productos', label: 'Productos', items: [
    { id: 'bricks', label: 'Bricks', href: '#bricks' },
    { id: 'tender', label: 'Tender', href: '#tender' },
    { id: 'localizia', label: 'Localizia', href: '#localizia' },
    { id: 'lrs', label: 'LRS', href: '#lrs' },
  ] },
  { id: 'estudio', label: 'Estudio', items: [
    { id: 'proyectos', label: 'Proyectos', href: '#proyectos' },
    { id: 'equipo', label: 'Equipo', href: '#equipo' },
    { id: 'contacto', label: 'Contacto', href: '#contacto' },
    { id: 'estado', label: 'Estado del servicio', href: 'https://status.example.com', target: '_blank' },
  ] },
];

const cincoGrupos: SiteNavGroup[] = [
  ...groups,
  { id: 'recursos', label: 'Recursos', items: [
    { id: 'blog', label: 'Blog', href: '#blog' },
    { id: 'guias', label: 'Guías', href: '#guias' },
  ] },
  { id: 'cuenta', label: 'Cuenta', items: [
    { id: 'entrar', label: 'Entrar', href: '#entrar' },
    { id: 'soporte', label: 'Soporte', href: '#soporte' },
  ] },
];

const meta: Meta<typeof SiteNav> = {
  title: 'Molecules/SiteNav',
  component: SiteNav,
  parameters: { layout: 'padded' },
  args: { groups },
  argTypes: { renderLink: { table: { disable: true } }, className: { table: { disable: true } } },
};
export default meta;

type Story = StoryObj<typeof SiteNav>;

/**
 * Tres grupos: en escritorio, tres columnas; en móvil, apilados. «Estado del
 * servicio» vive en otro dominio y abre en pestaña nueva (`target: '_blank'`).
 */
export const PorDefecto: Story = {};

/** Sobre superficie oscura. */
export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="lg">
      <SiteNav {...args} />
    </Container>
  ),
};

/**
 * Cinco grupos: en el breakpoint ancho ganan su propia columna cada uno, en
 * vez de que el quinto («Cuenta») caiga solo a una segunda fila.
 */
export const CincoGrupos: Story = {
  name: 'Cinco grupos',
  args: { groups: cincoGrupos },
};

export const ContratoCincoColumnas: Story = {
  name: 'Test — cinco grupos, cinco columnas en el breakpoint ancho',
  tags: ['!dev'],
  args: { groups: cincoGrupos },
  play: async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('.site-nav')!;
    // el runner de story-tests renderiza a >= 1280px (--breakpoint-xl)
    await expect(window.innerWidth).toBeGreaterThanOrEqual(1280);
    const cols = getComputedStyle(nav).gridTemplateColumns.split(' ').length;
    await expect(cols).toBe(5);
  },
};

export const Contrato: Story = {
  name: 'Test — semántica y columnas',
  tags: ['!dev'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Navegación del sitio' });
    // cabeceras de grupo: una es enlace (tiene href), las otras no
    await expect(canvas.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    await expect(canvas.getByRole('link', { name: 'Soluciones' })).toBeInTheDocument();
    // página actual
    const actual = canvas.getByRole('link', { name: 'Contenidos elearning' });
    await expect(actual).toHaveAttribute('aria-current', 'page');
    // ítem externo: pestaña nueva con rel de seguridad por defecto
    const externo = canvas.getByRole('link', { name: 'Estado del servicio' });
    await expect(externo).toHaveAttribute('target', '_blank');
    await expect(externo).toHaveAttribute('rel', 'noopener noreferrer');
    // columnas según el ancho: en el runner (>=1280) son cuatro pistas
    const cols = getComputedStyle(nav).gridTemplateColumns.split(' ').length;
    await expect(cols).toBeGreaterThanOrEqual(2);
  },
};
