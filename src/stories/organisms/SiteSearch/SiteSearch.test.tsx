import { describe, it, expect, vi } from 'vitest';
import { render as renderRTL, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { SiteSearch, type SiteSearchResult } from './SiteSearch';
import { BrandMessagesProvider } from '../../messages/BrandMessagesProvider';
import { brandMessagesFixture as ES } from '../../../../.storybook/brandMessagesFixture';

const Catalogo = ({ children }: { children: ReactNode }) => (
  <BrandMessagesProvider messages={ES}>{children}</BrandMessagesProvider>
);

function render(ui: React.ReactElement) {
  return renderRTL(ui, { wrapper: Catalogo });
}

const RESULTADOS: SiteSearchResult[] = [
  {
    href: '/es/docs/creator/facturas',
    title: 'Emitir una factura',
    section: 'Documentación › Creator',
    excerpt: 'Una factura emitida no se edita: se rectifica.',
    displayUrl: 'studiolxd.com/es/docs/creator/facturas',
  },
  {
    href: '/es/blog/verifactu',
    title: 'Verifactu: qué cambia',
    section: 'Blog',
  },
];

const campo = () => screen.getByRole('textbox', { name: ES.siteSearch.label });

describe('SiteSearch', () => {
  it('el campo y el botón viven dentro de una región de búsqueda', () => {
    render(<SiteSearch query="" onQueryChange={() => {}} />);
    const región = screen.getByRole('search', { name: ES.siteSearch.label });
    expect(within(región).getByRole('textbox', { name: ES.siteSearch.label })).toBeInTheDocument();
    expect(within(región).getByRole('button', { name: ES.siteSearch.submit })).toBeInTheDocument();
  });

  it('el aviso de estado existe desde el primer render: una región viva que nace con el cambio no se anuncia', () => {
    render(<SiteSearch query="" onQueryChange={() => {}} />);
    const aviso = screen.getByRole('status');
    expect(aviso).toHaveAttribute('aria-live', 'polite');
    expect(aviso).toHaveTextContent(ES.siteSearch.idle);
    expect(campo()).toHaveAttribute('aria-describedby', expect.stringContaining(aviso.id));
  });

  it('con resultados, el aviso dice cuántos hay y para qué consulta', () => {
    render(
      <SiteSearch query=" factura " onQueryChange={() => {}} status="ready" results={RESULTADOS} total={23} />,
    );
    expect(screen.getByRole('status')).toHaveTextContent(ES.siteSearch.results(23, 'factura'));
  });

  it('sin `total`, el recuento es el de los resultados que llegan', () => {
    render(<SiteSearch query="factura" onQueryChange={() => {}} status="ready" results={RESULTADOS} />);
    expect(screen.getByRole('status')).toHaveTextContent(ES.siteSearch.results(2, 'factura'));
  });

  it('escribiendo por debajo del mínimo se pide el mínimo; alcanzado, se pide Intro', () => {
    const { rerender } = render(
      <SiteSearch query="fa" onQueryChange={() => {}} status="typing" minLength={3} />,
    );
    expect(screen.getByRole('status')).toHaveTextContent(ES.siteSearch.minLength(3));

    rerender(
      <Catalogo>
        <SiteSearch query="fact" onQueryChange={() => {}} status="typing" minLength={3} />
      </Catalogo>,
    );
    expect(screen.getByRole('status')).toHaveTextContent(ES.siteSearch.pending);
  });

  it('los resultados son una lista de verdad, con su nombre y un título por resultado', () => {
    render(<SiteSearch query="factura" onQueryChange={() => {}} status="ready" results={RESULTADOS} headingLevel={3} />);
    const lista = screen.getByRole('list', { name: ES.siteSearch.resultsLabel });
    expect(within(lista).getAllByRole('listitem')).toHaveLength(2);

    const título = screen.getByRole('heading', { level: 3, name: 'Emitir una factura' });
    expect(within(título).getByRole('link')).toHaveAttribute('href', '/es/docs/creator/facturas');
  });

  it('el vacío no es un error: se dice que no hay nada y no se ofrece reintentar', () => {
    render(<SiteSearch query="klingon" onQueryChange={() => {}} status="ready" results={[]} onRetry={() => {}} />);
    // El vacío no repite la consulta: ya la dice el recuento de arriba.
    expect(screen.getByRole('status')).toHaveTextContent(ES.siteSearch.results(0, 'klingon'));
    expect(screen.getByText(ES.siteSearch.emptyTitle)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: ES.siteSearch.retry })).not.toBeInTheDocument();
    expect(screen.queryByRole('list', { name: ES.siteSearch.resultsLabel })).not.toBeInTheDocument();
  });

  it('el error se dice como error y ofrece reintentar', async () => {
    const reintentar = vi.fn();
    render(<SiteSearch query="factura" onQueryChange={() => {}} status="error" onRetry={reintentar} />);

    // El aviso es un `role="alert"`: se anuncia solo, así que la región viva
    // se calla para no decirlo dos veces.
    expect(screen.getByRole('alert')).toHaveTextContent(ES.siteSearch.errorTitle);
    expect(screen.getByRole('status')).toHaveTextContent('');
    await userEvent.click(screen.getByRole('button', { name: ES.siteSearch.retry }));
    expect(reintentar).toHaveBeenCalledOnce();
  });

  it('sin `onRetry` el error no inventa un botón que no lleva a ningún sitio', () => {
    render(<SiteSearch query="factura" onQueryChange={() => {}} status="error" />);
    expect(screen.queryByRole('button', { name: ES.siteSearch.retry })).not.toBeInTheDocument();
  });

  it('cada tecla llega a `onQueryChange`: el componente no guarda la consulta', async () => {
    const cambiar = vi.fn();
    render(<SiteSearch query="" onQueryChange={cambiar} />);
    await userEvent.type(campo(), 'fa');
    expect(cambiar).toHaveBeenCalledTimes(2);
  });

  it('al enviar llega la consulta recortada, y con el campo vacío no se envía nada', async () => {
    const enviar = vi.fn();
    const { rerender } = render(<SiteSearch query="  factura  " onQueryChange={() => {}} onSubmit={enviar} />);
    await userEvent.click(screen.getByRole('button', { name: ES.siteSearch.submit }));
    expect(enviar).toHaveBeenCalledWith('factura');

    rerender(
      <Catalogo>
        <SiteSearch query="   " onQueryChange={() => {}} onSubmit={enviar} />
      </Catalogo>,
    );
    await userEvent.click(screen.getByRole('button', { name: ES.siteSearch.submit }));
    expect(enviar).toHaveBeenCalledOnce();
  });

  it('en reposo, las sugerencias son botones y devuelven su texto', async () => {
    const elegir = vi.fn();
    render(
      <SiteSearch
        query=""
        onQueryChange={() => {}}
        suggestions={['facturación', 'control horario']}
        onSuggestionSelect={elegir}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'control horario' }));
    expect(elegir).toHaveBeenCalledWith('control horario');
  });

  it('las sugerencias solo se pintan en reposo: con resultados a la vista serían ruido', () => {
    render(
      <SiteSearch
        query="factura"
        onQueryChange={() => {}}
        status="ready"
        results={RESULTADOS}
        suggestions={['facturación']}
        onSuggestionSelect={() => {}}
      />,
    );
    expect(screen.queryByRole('button', { name: 'facturación' })).not.toBeInTheDocument();
  });

  it('el pie solo aparece con resultados: no se pagina un vacío', () => {
    const { rerender } = render(
      <SiteSearch
        query="factura"
        onQueryChange={() => {}}
        status="ready"
        results={RESULTADOS}
        footer={<span>paginación</span>}
      />,
    );
    expect(screen.getByText('paginación')).toBeInTheDocument();

    rerender(
      <Catalogo>
        <SiteSearch
          query="factura"
          onQueryChange={() => {}}
          status="ready"
          results={[]}
          footer={<span>paginación</span>}
        />
      </Catalogo>,
    );
    expect(screen.queryByText('paginación')).not.toBeInTheDocument();
  });

  it('los fantasmas de la carga quedan fuera del árbol de accesibilidad: lo que se anuncia es el «Buscando…»', () => {
    const { container } = render(<SiteSearch query="factura" onQueryChange={() => {}} status="loading" />);
    expect(screen.getByRole('status')).toHaveTextContent(ES.siteSearch.loading);
    expect(container.querySelector('.site-search__loading')).toHaveAttribute('aria-hidden', 'true');
  });

  it('`renderLink` recibe todo lo que el resultado necesita y se usa para el enlace del router', () => {
    render(
      <SiteSearch
        query="factura"
        onQueryChange={() => {}}
        status="ready"
        results={RESULTADOS}
        renderLink={(props) => <a {...props} data-router="si" />}
      />,
    );
    expect(screen.getByRole('link', { name: 'Emitir una factura' })).toHaveAttribute('data-router', 'si');
  });

  it('ningún elemento emite un atributo `style`', () => {
    const { container } = render(
      <SiteSearch query="factura" onQueryChange={() => {}} status="ready" results={RESULTADOS} />,
    );
    expect(container.querySelectorAll('[style]')).toHaveLength(0);
  });
});
