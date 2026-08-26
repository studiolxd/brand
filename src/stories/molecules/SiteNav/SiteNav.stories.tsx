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

/** Tres grupos: en escritorio, tres columnas; en móvil, apilados. */
export const PorDefecto: Story = {};

/** En móvil los grupos van en una sola columna. */
export const Movil: Story = {
  globals: { viewport: { value: 'mobile1' } },
};

/** Sobre superficie oscura. */
export const SuperficieOscura: Story = {
  render: (args) => (
    <Container surface="dark" space="lg">
      <SiteNav {...args} />
    </Container>
  ),
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
    // columnas según el ancho: en el runner (>=1280) son cuatro pistas
    const cols = getComputedStyle(nav).gridTemplateColumns.split(' ').length;
    await expect(cols).toBeGreaterThanOrEqual(2);
  },
};
