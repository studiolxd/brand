import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SiteNav, type SiteNavGroup } from './SiteNav';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixtureEn as EN } from '../../../../.storybook/brandMessagesFixtureEn';
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

const cuatroGrupos: SiteNavGroup[] = cincoGrupos.slice(0, 4);

const seisGrupos: SiteNavGroup[] = [
  ...cincoGrupos,
  { id: 'legal', label: 'Legal', items: [
    { id: 'aviso', label: 'Aviso legal', href: '#aviso' },
    { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
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
 * vez de que el quinto («Cuenta») caiga solo a una segunda fila. Por debajo de
 * `xl` —tres por fila en `lg`— los dos que quedan en la última fila **se
 * reparten el ancho entero** en vez de dejar el tercio derecho vacío.
 */
export const CincoGrupos: Story = {
  name: 'Cinco grupos',
  args: { groups: cincoGrupos },
};

/** Cuatro grupos: la fila se completa en `xl` y en `lg` el cuarto ocupa él solo la segunda. */
export const CuatroGrupos: Story = {
  name: 'Cuatro grupos',
  args: { groups: cuatroGrupos },
};

/**
 * Seis grupos: pasado el tope de columnas (`site-nav.columns-max`), el sexto
 * cae a la fila siguiente y la ocupa entera. Es el efecto buscado del reparto
 * —la última fila queda más ancha y deja de alinearse con las de arriba— y se
 * prefiere al hueco a la derecha.
 */
export const SeisGrupos: Story = {
  name: 'Seis grupos',
  args: { groups: seisGrupos },
};

export const ContratoCincoColumnas: Story = {
  name: 'Test — cinco grupos, tope de columnas en el breakpoint ancho',
  tags: ['!dev'],
  args: { groups: cincoGrupos },
  play: async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('.site-nav')!;
    // El runner no garantiza el ancho de --breakpoint-xl (1280px): se
    // comprueba el atributo que fija el tope de columnas para ese breakpoint,
    // no el número de columnas realmente pintado a un ancho dado.
    await expect(nav.getAttribute('data-columns')).toBe('5');
  },
};

export const ContratoTopeDeColumnas: Story = {
  name: 'Test — el tope de columnas no supera site-nav.columns-max',
  tags: ['!dev'],
  args: { groups: [...cincoGrupos, { id: 'extra', label: 'Extra', items: [{ id: 'x', label: 'X', href: '#x' }] }] },
  play: async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('.site-nav')!;
    // Seis grupos: el tope sigue en 5, no sigue creciendo.
    await expect(nav.getAttribute('data-columns')).toBe('5');
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
    // Sigue siendo una rejilla; lo que cambió es su base: doce tramos en vez
    // de una columna por grupo (en el runner, >=1280, manda `data-columns`).
    await expect(getComputedStyle(nav).display).toBe('grid');
    await expect(getComputedStyle(nav).gridTemplateColumns.split(' ').length).toBeGreaterThanOrEqual(3);
  },
};

/**
 * Test: no queda hueco a la derecha. Sea cual sea el ancho de la ventana del
 * runner —y con él cuántos grupos caben por fila—, la ÚLTIMA fila llega al
 * canto: sus grupos se han repartido el sobrante, así que miden lo mismo que
 * los de arriba (fila completa) o más (fila incompleta), nunca menos.
 */
export const ContratoReparto: Story = {
  name: 'Test — la última fila reparte el sobrante',
  tags: ['!dev'],
  args: { groups: cincoGrupos },
  play: async ({ canvasElement }) => {
    const nav = canvasElement.querySelector('.site-nav') as HTMLElement;
    const grupos = Array.from(nav.querySelectorAll('.site-nav__group')) as HTMLElement[];

    // Las filas se leen por la vertical: la maqueta no las declara.
    const filas = new Map<number, HTMLElement[]>();
    for (const g of grupos) {
      const y = Math.round(g.getBoundingClientRect().top);
      filas.set(y, [...(filas.get(y) ?? []), g]);
    }

    const caja = nav.getBoundingClientRect();
    const ancho = (el: HTMLElement) => el.getBoundingClientRect().width;
    const porFila = [...filas.values()];
    const primera = porFila[0]!;
    const ultima = porFila[porFila.length - 1]!;

    // Ninguna fila deja hueco a la derecha: la última, tampoco.
    for (const fila of porFila) {
      const derecha = fila[fila.length - 1]!.getBoundingClientRect().right;
      await expect(Math.abs(derecha - caja.right)).toBeLessThan(2);
    }

    // Y los de la última no son más estrechos que los de la primera: o la fila
    // estaba completa (miden igual) o se han repartido el sobrante (miden más).
    await expect(ancho(ultima[0]!)).toBeGreaterThanOrEqual(ancho(primera[0]!) - 1);
  },
};

/**
 * El único texto propio del índice es el nombre de su región, y sale de
 * `siteNav.label`. Los grupos y sus enlaces son contenido del sitio.
 */
export const TextosDelProveedor: Story = {
  name: 'Textos desde el proveedor (otro idioma)',
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <SiteNav groups={groups} />
    </BrandMessagesProvider>
  ),
};

/** Test: el nombre del `nav` sale de `siteNav.label`. */
export const ContratoProveedor: Story = {
  name: 'Test — el índice lee su nombre del proveedor',
  tags: ['!dev'],
  render: () => (
    <BrandMessagesProvider messages={EN}>
      <SiteNav groups={groups} />
    </BrandMessagesProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Site navigation' })).toBeInTheDocument();
    await expect(canvas.queryByRole('navigation', { name: 'Navegación del sitio' })).toBeNull();
  },
};
