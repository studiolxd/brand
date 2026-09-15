import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SiteShell } from './SiteShell';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { SiteNav } from '../../molecules/SiteNav/SiteNav';
import { LegalFooter } from '../LegalFooter/LegalFooter';
import { Container } from '../../atoms/Container/Container';
import { Heading } from '../../atoms/Heading/Heading';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Alert } from '../../molecules/Alert/Alert';
import { Hero } from '../Hero/Hero';
import { Highlight } from '../Highlight/Highlight';
import { SiteFooter } from '../SiteFooter/SiteFooter';
import { Button } from '../../atoms/Button/Button';
import { FilterBar } from '../../molecules/FilterBar/FilterBar';
import { InputField } from '../../molecules/InputField/InputField';
import { SelectField } from '../../molecules/SelectField/SelectField';
import { MultiSelectField } from '../../molecules/MultiSelectField/MultiSelectField';
import { DatePickerField } from '../../molecules/DatePickerField/DatePickerField';
import { SwitcherField } from '../../molecules/SwitcherField/SwitcherField';

const indice = [{ id: 'sitio', label: 'Sitio', href: '#sitio', items: [{ id: 'inicio', label: 'Inicio', href: '#inicio' }, { id: 'precios', label: 'Precios', href: '#precios' }] }];
const legal = [
  { id: 'aviso', label: 'Aviso legal', href: '#aviso-legal' },
  { id: 'privacidad', label: 'Privacidad', href: '#privacidad' },
];

const meta: Meta<typeof SiteShell> = {
  title: 'Sections/SiteShell',
  component: SiteShell,
  parameters: { layout: 'fullscreen' },
  args: {
    header: <SiteHeader><SiteNav groups={indice} /></SiteHeader>,
    footer: <LegalFooter links={legal} />,
  },
  argTypes: { header: { table: { disable: true } }, footer: { table: { disable: true } }, children: { table: { disable: true } }, className: { table: { disable: true } } },
};
export default meta;
type Story = StoryObj<typeof SiteShell>;

/** Poco contenido: el pie baja hasta el borde inferior de la pantalla. */
export const PocoContenido: Story = {
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={1} size={7}>Una página corta</Heading>
        <Paragraph>El pie no flota a media pantalla: el marco lo empuja abajo.</Paragraph>
      </Container>
    ),
  },
};

/** Mucho contenido: la página entera hace scroll y el pie va al final del documento. */
export const MuchoContenido: Story = {
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={1} size={7}>Una página larga</Heading>
        {Array.from({ length: 24 }, (_, i) => (
          <Paragraph key={i}>Párrafo {i + 1}: el documento crece y el scroll es el de la página, no el de un contenedor interno.</Paragraph>
        ))}
      </Container>
    ),
  },
};

export const Contrato: Story = {
  name: 'Test — el pie queda en el borde inferior con poco contenido',
  tags: ['!dev'],
  args: PocoContenido.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shell = canvasElement.querySelector('.site-shell') as HTMLElement;
    await expect(shell.getBoundingClientRect().height).toBeGreaterThanOrEqual(window.innerHeight - 1);
    const pie = canvas.getByRole('contentinfo');
    await expect(Math.round(pie.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(Math.round(shell.getBoundingClientRect().bottom) - 1);
    await expect(canvas.getByRole('main')).toBeInTheDocument();
    // la superficie pública lee a 20px (font-size.3)
    await expect(getComputedStyle(canvas.getByText(/no flota/)).fontSize).toBe('20px');
  },
};

export const ContratoTipografia: Story = {
  name: 'Test — la superficie pública lee un peldaño más arriba',
  tags: ['!dev'],
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={5}>Un título de nivel 5</Heading>
        <Heading level={2} size={4}>Un título con el tamaño desacoplado</Heading>
        <Paragraph>El cuerpo de la superficie pública.</Paragraph>
        <Paragraph size="large">Una entradilla.</Paragraph>
        <Paragraph size="small">Una nota al pie.</Paragraph>
        <Alert title="Un aviso" description="Con su descripción." />
      </Container>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const px = (el: Element) => parseFloat(getComputedStyle(el).fontSize);

    // El cuerpo va a 20px (font-size.3), la talla de los controles lg.
    const cuerpo = px(canvas.getByText('El cuerpo de la superficie pública.'));
    await expect(cuerpo).toBe(20);

    // Un H5 mide más que el cuerpo: la escala de títulos sube con él.
    await expect(px(canvas.getByRole('heading', { level: 5 }))).toBeGreaterThan(cuerpo);

    // El tamaño desacoplado bebe de la misma escala, así que sube igual.
    await expect(px(canvas.getByText('Un título con el tamaño desacoplado'))).toBe(24);

    // Los peldaños del párrafo son relativos al cuerpo, no absolutos.
    await expect(px(canvas.getByText('Una entradilla.'))).toBeGreaterThan(cuerpo);
    await expect(px(canvas.getByText('Una nota al pie.'))).toBeLessThan(cuerpo);

    // El texto corriente de los componentes hereda el cuerpo de la superficie.
    await expect(px(canvas.getByText('Un aviso'))).toBe(20);
    await expect(px(canvas.getByText('Con su descripción.'))).toBe(20);
  },
};

const columnasDelPie = [
  { title: 'Producto', links: [{ label: 'Qué hacemos', href: '#producto' }, { label: 'Precios', href: '#precios' }] },
  { title: 'Estudio', links: [{ label: 'Quiénes somos', href: '#estudio' }, { label: 'Contacto', href: '#contacto' }] },
];

/**
 * La portada de referencia: cabecera, portada, dos bandas y pie, **apilados
 * sin envoltorio**. Cada sección trae su propio aire —vertical y lateral—, así
 * que la página solo las pone una detrás de otra. Es la maqueta que copian las
 * webs del estudio; meter las secciones en un `Container space="…"` les suma
 * un aire que no es suyo y las descuadra respecto a las de otra web.
 */
export const PortadaDeReferencia: Story = {
  name: 'Portada de referencia',
  args: {
    footer: <SiteFooter tagline="Formación que se termina." columns={columnasDelPie} legal={<LegalFooter links={legal} width="full" />} />,
    children: (
      <main id="main-content" tabIndex={-1}>
        <Hero
          title="Aprender es lo primero"
          description="La suite de Studio LXD para diseñar, impartir y gestionar formación: un solo acceso, una sola marca."
          actions={<Button size="lg" href="#empezar">Empezar</Button>}
        />
        <Highlight
          title="La formación que no se abandona a la semana"
          description="Diseñamos itinerarios que la gente termina, con contenidos propios y una plataforma que no estorba."
          actions={<Button size="lg" href="#contacto">Hablemos</Button>}
        />
        <Highlight
          surface="light"
          title="Y una suite que la sostiene"
          description="Campus, catálogo, analítica y gestión: las mismas piezas, la misma marca, un solo acceso."
        />
      </main>
    ),
  },
};

export const ContratoPortada: Story = {
  name: 'Test — las secciones apiladas caen en la misma columna',
  tags: ['!dev'],
  args: PortadaDeReferencia.args,
  play: async ({ canvasElement }) => {
    const columna = (selector: string) =>
      canvasElement.querySelector(selector)!.getBoundingClientRect();

    const barra = columna('.site-header__bar');
    const portada = columna('.hero .container__inner');
    const banda = columna('.highlight .container__inner');
    const pie = columna('.site-footer__inner');

    // Todas las secciones acotan su contenido en la misma columna, sin que la
    // página ponga ningún envoltorio.
    for (const caja of [portada, banda, pie]) {
      await expect(Math.round(caja.left)).toBe(Math.round(barra.left));
      await expect(Math.round(caja.width)).toBe(Math.round(barra.width));
    }

    // Y cada una trae su propio aire vertical.
    for (const seccion of ['.hero', '.highlight', '.site-footer']) {
      const aire = getComputedStyle(canvasElement.querySelector(seccion)!);
      await expect(parseFloat(aire.paddingBlockStart)).toBeGreaterThan(0);
      await expect(parseFloat(aire.paddingBlockEnd)).toBeGreaterThan(0);
    }
  },
};

/* ── Los controles de la superficie pública ──────────────────────────────── */

const ESTADOS = [
  { value: 'todos', label: 'Todos los estados' },
  { value: 'abierta', label: 'Abierta' },
  { value: 'cerrada', label: 'Cerrada' },
];

const MATERIAS = [
  { value: 'diseno', label: 'Diseño' },
  { value: 'datos', label: 'Datos' },
  { value: 'gestion', label: 'Gestión' },
];

/** Los cinco controles de la barra, tal cual los escribe una página: sin `size`. */
function FiltrosDelCatalogo({ prefijo }: { prefijo: string }) {
  return (
    <FilterBar
      search={
        <InputField
          id={`${prefijo}-buscar`}
          kind="search"
          label="Buscar"
          labelHidden
          placeholder="Buscar en el catálogo…"
        />
      }
      actions={<Button variant="outline">Limpiar filtros</Button>}
    >
      <SelectField id={`${prefijo}-estado`} label="Estado" options={ESTADOS} defaultValue="todos" />
      <MultiSelectField
        id={`${prefijo}-materias`}
        label="Materias"
        options={MATERIAS}
        defaultValue={['diseno', 'datos']}
      />
      <DatePickerField id={`${prefijo}-desde`} label="Desde" />
      <SwitcherField id={`${prefijo}-plazas`} label="Con plazas" />
    </FilterBar>
  );
}

/**
 * **Los controles de una página pública arrancan en talla `lg`**, igual que el
 * texto arranca a 20px: la página no pasa `size` a ninguno. El bloque
 * `.site-shell` redefine la talla de partida de cada control apuntándola a su
 * propio token `lg-*` —el mismo del que bebe el modificador `--lg`—, así que
 * suben a la vez y siguen cuadrando entre sí: los rótulos, la caja de los
 * campos, las fichas del selector múltiple, el interruptor centrado contra esa
 * caja y el botón de las acciones.
 *
 * Un `size="sm"` dentro del shell sigue mandando: su modificador declara la
 * variable en el propio elemento y gana a la que hereda de la superficie.
 *
 * Lo que sale por un portal (la lista de un `Select`, el calendario de un
 * `DatePicker`) monta en `document.body` y no es descendiente de `.site-shell`,
 * así que no hereda la superficie — el mismo caso que ya documenta `SiteShell`
 * para `Modal`/`Sheet`, y la misma respuesta: apuntar ahí el `container`.
 */
export const ControlesEnSuperficiePublica: Story = {
  name: 'Los controles arrancan en talla lg',
  args: {
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <Heading level={1} size={7}>Catálogo</Heading>
        <Paragraph>Los campos leen a la misma talla que el texto que los rodea.</Paragraph>
        <FiltrosDelCatalogo prefijo="publico" />
      </Container>
    ),
  },
};

/**
 * Test: la talla de los controles dentro del shell es la misma que la de esos
 * mismos controles con `size="lg"` fuera, y distinta de la de partida (`md`).
 * Se mide el alto y el cuerpo de cada uno, más el ancho del interruptor —que
 * no tiene alto de campo— y su centrado contra la caja del campo de al lado.
 */
export const ContratoControlesLg: Story = {
  name: 'Test — los controles crecen a lg y siguen cuadrando',
  tags: ['!dev'],
  args: {
    header: undefined,
    footer: undefined,
    children: (
      <Container as="main" id="main-content" tabIndex={-1} space="xl">
        <FiltrosDelCatalogo prefijo="dentro" />
        {/* Una barra corta —un campo con rótulo, un interruptor sin él y las
            acciones— para medir el centrado sin depender de en qué renglón de
            la rejilla caiga cada filtro. */}
        <div data-testid="alineacion">
          <FilterBar
            ariaLabel="Alineación"
            actions={<Button variant="outline">Limpiar filtros</Button>}
          >
            <DatePickerField id="alineacion-desde" label="Desde" />
            <SwitcherField id="alineacion-plazas" label="Con plazas" />
          </FilterBar>
        </div>
      </Container>
    ),
  },
  render: (args) => (
    <>
      <div data-testid="fuera-md">
        <FiltrosDelCatalogo prefijo="fuera-md" />
      </div>
      <div data-testid="fuera-lg">
        <FilterBar
          search={<InputField id="fuera-lg-buscar" size="lg" kind="search" label="Buscar" labelHidden />}
          actions={<Button size="lg" variant="outline">Limpiar filtros</Button>}
        >
          <SelectField id="fuera-lg-estado" size="lg" label="Estado" options={ESTADOS} defaultValue="todos" />
          <MultiSelectField id="fuera-lg-materias" size="lg" label="Materias" options={MATERIAS} defaultValue={['diseno', 'datos']} />
          <DatePickerField id="fuera-lg-desde" size="lg" label="Desde" />
          <SwitcherField id="fuera-lg-plazas" size="lg" label="Con plazas" />
        </FilterBar>
      </div>
      <SiteShell {...args} />
    </>
  ),
  play: async ({ canvasElement }) => {
    const raiz = (testid: string) =>
      canvasElement.querySelector<HTMLElement>(`[data-testid="${testid}"]`)!;
    const dentro = canvasElement.querySelector<HTMLElement>('.site-shell')!;

    /** Alto y cuerpo de un control, redondeados al píxel. */
    const medir = (contenedor: HTMLElement, selector: string) => {
      const nodo = contenedor.querySelector<HTMLElement>(selector)!;
      const estilo = getComputedStyle(nodo);
      return {
        alto: Math.round(nodo.getBoundingClientRect().height),
        cuerpo: Math.round(parseFloat(estilo.fontSize)),
      };
    };

    const CONTROLES = [
      ['el campo de texto', '.input-field__search .input'],
      ['el selector', '.select'],
      ['el selector múltiple', '.multi-select'],
      ['el campo de fecha', '.date-picker-field .input'],
      ['el rótulo de un filtro', '.filter-bar__filter .label'],
      ['el botón de las acciones', '.filter-bar__actions .button'],
    ] as const;

    for (const [que, selector] of CONTROLES) {
      const md = medir(raiz('fuera-md'), selector);
      const lg = medir(raiz('fuera-lg'), selector);
      const publico = medir(dentro, selector);
      // Dentro del shell mide lo que mide en lg…
      await expect(`${que}: ${JSON.stringify(publico)}`).toBe(`${que}: ${JSON.stringify(lg)}`);
      // …y eso es más que la talla de partida de la superficie de aplicación.
      await expect(lg.cuerpo).toBeGreaterThan(md.cuerpo);
    }

    // El chevron del selector también: se mide con un token del control, así que
    // la superficie lo sube igual que a la caja.
    const chevron = (contenedor: HTMLElement) =>
      Math.round(contenedor.querySelector<HTMLElement>('.select__icon')!.getBoundingClientRect().width);
    await expect(chevron(dentro)).toBe(chevron(raiz('fuera-lg')));
    await expect(chevron(dentro)).toBeGreaterThan(chevron(raiz('fuera-md')));

    // El interruptor no tiene caja de campo: se mide su track.
    const track = (contenedor: HTMLElement) => {
      const caja = contenedor.querySelector<HTMLElement>('.switcher')!.getBoundingClientRect();
      return { ancho: Math.round(caja.width), alto: Math.round(caja.height) };
    };
    await expect(track(dentro)).toEqual(track(raiz('fuera-lg')));
    await expect(track(dentro).ancho).toBeGreaterThan(track(raiz('fuera-md')).ancho);

    // Y sigue centrado contra la caja del campo que tiene al lado, que ahora
    // mide 48px: el token con el que la barra lo centra sube con el control.
    const centro = (nodo: HTMLElement) => {
      const caja = nodo.getBoundingClientRect();
      return caja.top + caja.height / 2;
    };
    const barra = raiz('alineacion');
    const celdas = Array.from(barra.querySelectorAll<HTMLElement>('.filter-bar__filter'));
    const celdaInterruptor = celdas.at(-1)!;
    const cajaDelCampo = celdas[0].querySelector<HTMLElement>('.label')!
      .nextElementSibling as HTMLElement;
    await expect(Math.round(cajaDelCampo.getBoundingClientRect().height)).toBe(48);
    await expect(centro(celdaInterruptor.querySelector<HTMLElement>('.switcher')!))
      .toBeCloseTo(centro(cajaDelCampo), 0);
    await expect(centro(barra.querySelector<HTMLElement>('.filter-bar__actions .button')!))
      .toBeCloseTo(centro(cajaDelCampo), 0);
  },
};
