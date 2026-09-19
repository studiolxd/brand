import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  SiteSearch,
  type SiteSearchProps,
  type SiteSearchResult,
  type SiteSearchStatus,
} from './SiteSearch';
import { Pagination } from '../../molecules/Pagination/Pagination';
import { SOLO_OSCURO } from '../../utils/chromaticModes';

const meta = {
  title: 'Organisms/SiteSearch',
  component: SiteSearch,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SiteSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Resultados **inventados** para el catálogo: no salen de ningún índice, pero
 * son los de la suite (documentación, blog, páginas de producto) para que la
 * maqueta se mire con textos del tamaño que va a tener de verdad.
 */
const RESULTADOS: SiteSearchResult[] = [
  {
    href: '/es/docs/creator/facturas/rectificativas',
    title: 'Emitir una factura rectificativa',
    section: 'Documentación › Creator',
    excerpt: (
      <>
        Una <mark>factura</mark> emitida no se edita: se rectifica. Desde el detalle de la{' '}
        <mark>factura</mark>, «Rectificar» abre una nueva con el importe en negativo y la
        referencia a la original…
      </>
    ),
    displayUrl: 'studiolxd.com/es/docs/creator/facturas/rectificativas',
  },
  {
    href: '/es/docs/finance/facturacion-recurrente',
    title: 'Facturación recurrente',
    section: 'Documentación › Finance',
    excerpt: (
      <>
        Las series de <mark>facturación</mark> periódica se configuran por cliente y por
        producto. Cada vencimiento genera un borrador que se revisa antes de emitirse…
      </>
    ),
    displayUrl: 'studiolxd.com/es/docs/finance/facturacion-recurrente',
  },
  {
    href: '/es/blog/verifactu-que-cambia',
    title: 'Verifactu: qué cambia en tus facturas a partir de 2026',
    section: 'Blog',
    excerpt: (
      <>
        El reglamento obliga a que cada <mark>factura</mark> lleve su huella y su código QR.
        Repasamos qué hay que tocar y qué hace ya la suite por su cuenta…
      </>
    ),
    displayUrl: 'studiolxd.com/es/blog/verifactu-que-cambia',
  },
  {
    href: '/es/finance',
    title: 'Finance',
    section: 'Producto',
    excerpt: (
      <>
        Presupuestos, <mark>facturas</mark> y cobros en el mismo sitio que los proyectos que
        los originan.
      </>
    ),
    displayUrl: 'studiolxd.com/es/finance',
  },
  {
    href: '/es/docs/creator/plantillas-de-factura',
    title: 'Plantillas de factura',
    section: 'Documentación › Creator',
    excerpt: (
      <>
        La plantilla decide qué se ve en el PDF de la <mark>factura</mark>: logotipo, pie
        legal, desglose de impuestos y la forma de pago…
      </>
    ),
    displayUrl: 'studiolxd.com/es/docs/creator/plantillas-de-factura',
  },
];

const SUGERENCIAS = ['facturación', 'control horario', 'permisos y vacaciones', 'exportar a Holded'];

const comun = {
  query: '',
  onQueryChange: () => {},
} satisfies Partial<SiteSearchProps>;

export const EnReposo: Story = {
  name: 'En reposo',
  args: {
    ...comun,
    status: 'idle',
    suggestions: SUGERENCIAS,
    onSuggestionSelect: () => {},
  },
};

export const Escribiendo: Story = {
  args: {
    ...comun,
    query: 'f',
    status: 'typing',
    minLength: 3,
  },
};

export const Buscando: Story = {
  args: {
    ...comun,
    query: 'factura',
    status: 'loading',
  },
};

export const ConResultados: Story = {
  name: 'Con resultados',
  args: {
    ...comun,
    query: 'factura',
    status: 'ready',
    results: RESULTADOS,
    total: 23,
    footer: (
      <Pagination
        pageCount={5}
        page={1}
        hrefBuilder={(n) => `?q=factura&page=${n}`}
      />
    ),
  },
};

export const SinResultados: Story = {
  name: 'Sin resultados',
  args: {
    ...comun,
    query: 'factura rectificativa en klingon',
    status: 'ready',
    results: [],
  },
};

export const ConError: Story = {
  name: 'Con error',
  args: {
    ...comun,
    query: 'factura',
    status: 'error',
    onRetry: () => {},
  },
};

export const AnchoDeMovil: Story = {
  name: 'A ancho de móvil',
  args: ConResultados.args,
  globals: { viewport: { value: { width: '400px', height: '900px' } } },
};

export const SuperficieOscura: Story = {
  name: 'En superficie oscura',
  args: ConResultados.args,
  parameters: { surface: 'dark', chromatic: SOLO_OSCURO },
};

/**
 * El recorrido entero con un índice de mentira: se escribe, se rebota, se
 * carga y se responde. Es la story para probar el buscador a mano; las
 * anteriores son cada estado congelado, que es lo que fotografía Chromatic.
 */
function BuscadorVivo({ fallar = false }: { fallar?: boolean }) {
  const [query, setQuery] = useState('');
  // Una sola pieza de estado, con la consulta a la que pertenece: mientras no
  // coincida con lo escrito, lo que hay en pantalla es de la búsqueda de
  // antes. Así el efecto solo asigna estado en sus temporizadores —nunca
  // durante el render— y el estado del buscador se deduce, no se lleva.
  const [fase, setFase] = useState<{
    query: string;
    estado: 'loading' | 'ready' | 'error';
    results: SiteSearchResult[];
  } | null>(null);
  // «Reintentar» no cambia la consulta, así que hace falta algo que sí cambie
  // para que el efecto vuelva a lanzar la búsqueda.
  const [intento, setIntento] = useState(0);

  const consulta = query.trim();

  useEffect(() => {
    if (consulta.length < 3) return;
    let respuesta: ReturnType<typeof setTimeout>;
    const rebote = setTimeout(() => {
      setFase({ query: consulta, estado: 'loading', results: [] });
      respuesta = setTimeout(() => {
        setFase({
          query: consulta,
          estado: fallar ? 'error' : 'ready',
          results: fallar
            ? []
            : RESULTADOS.filter((resultado) =>
                `${resultado.title} ${resultado.section}`
                  .toLowerCase()
                  .includes(consulta.toLowerCase()),
              ),
        });
      }, 600);
    }, 300);
    return () => {
      clearTimeout(rebote);
      clearTimeout(respuesta);
    };
  }, [consulta, fallar, intento]);

  const status: SiteSearchStatus =
    !consulta ? 'idle'
    : consulta.length < 3 ? 'typing'
    : fase?.query === consulta ? fase.estado
    : 'typing';

  return (
    <SiteSearch
      query={query}
      onQueryChange={setQuery}
      status={status}
      results={fase?.query === consulta ? fase.results : []}
      minLength={3}
      suggestions={SUGERENCIAS}
      onSuggestionSelect={setQuery}
      onRetry={() => {
        setFase(null);
        setIntento((n) => n + 1);
      }}
    />
  );
}

export const Vivo: Story = {
  name: 'El recorrido entero',
  args: comun,
  render: () => <BuscadorVivo />,
};

export const VivoConIndiceCaido: Story = {
  name: 'El recorrido con el índice caído',
  args: comun,
  render: () => <BuscadorVivo fallar />,
};

export const TestRecuento: Story = {
  name: 'Test — el recuento se anuncia y nombra la consulta',
  tags: ['!dev'],
  args: ConResultados.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aviso = canvas.getByRole('status');
    expect(aviso).toHaveTextContent('23 resultados para «factura»');
    expect(aviso).toHaveAttribute('aria-live', 'polite');

    const campo = canvas.getByRole('textbox', { name: 'Buscar en el sitio' });
    expect(campo).toHaveAttribute('aria-describedby', aviso.id);
  },
};

export const TestTeclado: Story = {
  name: 'Test — del campo se llega a los resultados con el tabulador',
  tags: ['!dev'],
  args: ConResultados.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const campo = canvas.getByRole('textbox', { name: 'Buscar en el sitio' });
    campo.focus();

    // Campo → aspa de borrado → botón de buscar → primer resultado.
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();

    await waitFor(() =>
      expect(canvas.getByRole('link', { name: 'Emitir una factura rectificativa' })).toHaveFocus(),
    );
  },
};

export const TestVacioNoEsError: Story = {
  name: 'Test — el vacío no se pinta como un error',
  tags: ['!dev'],
  args: SinResultados.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('status')).toHaveTextContent(
      '0 resultados para «factura rectificativa en klingon»',
    );
    expect(canvas.getByText('Sin resultados')).toBeInTheDocument();
    expect(canvas.queryByRole('alert')).not.toBeInTheDocument();
    expect(canvas.queryByRole('button', { name: 'Reintentar' })).not.toBeInTheDocument();
  },
};
