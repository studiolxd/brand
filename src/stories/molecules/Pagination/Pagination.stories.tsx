import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Pagination } from './Pagination';
import { Button } from '../../atoms/Button/Button';

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    total:           { control: { type: 'number' } },
    page:            { control: { type: 'number' } },
    pageSize:        { control: { type: 'number' } },
    showTotal:       { control: { type: 'boolean' } },
    size:            { control: { type: 'inline-radio' }, options: ['sm', 'md', 'lg'] },
    ariaLabel:       { control: { type: 'text' } },
    onPageChange:    { control: false },
    onPageSizeChange:{ control: false },
    hrefBuilder:     { control: false },
    pageSizeOptions: { control: false },
  },
  args: {
    total: 100,
    page: 1,
    pageSize: 10,
    showTotal: false,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

/**
 * Test: sin props de etiqueta se siguen emitiendo los textos por defecto en castellano
 * (retrocompatibilidad — nadie que ya use el componente debe ver un cambio).
 */
export const EtiquetasPorDefecto: Story = {
  name: 'Test — etiquetas por defecto (castellano)',
  tags: ['!dev'],
  args: { total: 100, page: 3, pageSize: 10 },
  render: (args) => (
    <Pagination {...args} onPageChange={() => {}} onPageSizeChange={() => {}} showTotal />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Página 3')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Página anterior')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Página siguiente')).toBeInTheDocument();
    await expect(canvas.getByRole('group', { name: 'Páginas' })).toBeInTheDocument();
    await expect(canvas.getByLabelText('Registros por página')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.pagination__summary')).toHaveTextContent(
      '100 resultados',
    );
    await expect(canvas.getByRole('navigation', { name: 'Paginación' })).toBeInTheDocument();
  },
};

/**
 * Test: pasando las props de etiqueta, se usan en los `aria-label` y en el sumario
 * (caso de una app multiidioma que inyecta sus traducciones).
 */
export const EtiquetasTraducidas: Story = {
  name: 'Test — etiquetas traducidas',
  tags: ['!dev'],
  args: { total: 100, page: 3, pageSize: 10 },
  render: (args) => (
    <Pagination
      {...args}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      showTotal
      ariaLabel="Pagination"
      pageLabel={(p) => `Page ${p}`}
      previousLabel="Previous page"
      nextLabel="Next page"
      pagesGroupLabel="Pages"
      pageSizeLabel="Rows per page"
      totalLabel={(t) => `${t} results`}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText('Page 3')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Previous page')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Next page')).toBeInTheDocument();
    await expect(canvas.getByRole('group', { name: 'Pages' })).toBeInTheDocument();
    await expect(canvas.getByLabelText('Rows per page')).toBeInTheDocument();
    await expect(canvasElement.querySelector('.pagination__summary')).toHaveTextContent(
      '100 results',
    );
    await expect(canvas.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    // ninguna etiqueta en castellano sobrevive
    await expect(canvas.queryByLabelText('Página 3')).toBeNull();
    await expect(canvas.queryByLabelText('Página anterior')).toBeNull();
  },
};

export const ConTotal: Story = {
  name: 'Con total de resultados',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} showTotal />;
  },
};

export const ConSelectorDePagina: Story = {
  name: 'Con selector de registros por página',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    const [pageSize, setPageSize] = useState(String(args.pageSize));
    const size = pageSize === 'all' ? 0 : Number(pageSize);
    return (
      <Pagination
        {...args}
        page={page}
        pageSize={size}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
      />
    );
  },
};

export const Completo: Story = {
  name: 'Completo — total + selector de página',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    const [pageSize, setPageSize] = useState(String(args.pageSize));
    const size = pageSize === 'all' ? 0 : Number(pageSize);
    return (
      <Pagination
        {...args}
        page={page}
        pageSize={size}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        showTotal
      />
    );
  },
};

/**
 * `afterPageSize` es la ranura que va pegada al selector: acciones sobre el
 * conjunto —exportar, imprimir—, no sobre una fila. Los botones de página se
 * quedan solos al otro extremo.
 */
export const ConRanuraTrasElSelector: Story = {
  name: 'Con acciones tras el selector',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    const [pageSize, setPageSize] = useState(String(args.pageSize));
    const size = pageSize === 'all' ? 0 : Number(pageSize);
    return (
      <Pagination
        {...args}
        page={page}
        pageSize={size}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        showTotal
        afterPageSize={<Button variant="outline">Exportar</Button>}
      />
    );
  },
};

export const PocasPaginas: Story = {
  name: 'Pocas páginas (sin ellipsis)',
  args: { total: 30, pageSize: 10 },
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const PaginaDelMedio: Story = {
  name: 'Página en el centro',
  args: { total: 200, page: 10, pageSize: 10 },
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const UltimasPaginas: Story = {
  name: 'Páginas finales',
  args: { total: 200, page: 19, pageSize: 10 },
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

export const ConLinks: Story = {
  name: 'Con links (hrefBuilder)',
  args: { total: 100, page: 1, pageSize: 10 },
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return (
      <Pagination
        {...args}
        page={page}
        hrefBuilder={(p) => `/resultados?page=${p}`}
        onPageChange={(p) => { setPage(p); }}
      />
    );
  },
};

/**
 * Las tres tallas, emparejadas con las del `Button`: `sm` (32px) para una tabla
 * densa, `md` (40px, la de por defecto) para la aplicación y `lg` (48px) para la
 * superficie pública. En cada fila se ven a la vez el **reposo**, el **activo**
 * (la página vigente, con el relleno del hover y el peso enfático) y el
 * **deshabilitado** (el chevron anterior, que en la página 1 no lleva a ningún
 * sitio). El **hover** invierte el outline: pásale el puntero por encima.
 */
export const Tallas: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {(['sm', 'md', 'lg'] as const).map((talla) => (
        <Pagination
          key={talla}
          size={talla}
          total={200}
          page={1}
          pageSize={10}
          ariaLabel={`Paginación ${talla}`}
        />
      ))}
    </div>
  ),
};

export const Sm: Story = {
  name: 'Sm — compacto',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    const [pageSize, setPageSize] = useState(String(args.pageSize));
    const ps = pageSize === 'all' ? 0 : Number(pageSize);
    return (
      <Pagination
        {...args}
        size="sm"
        page={page}
        pageSize={ps}
        onPageChange={setPage}
        onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        showTotal
      />
    );
  },
};

export const Lg: Story = {
  name: 'Lg — la talla pública',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return (
      <Pagination {...args} size="lg" total={200} page={page} pageSize={10} onPageChange={setPage} />
    );
  },
};

/** Listados por cursor: no se sabe cuántas páginas hay; solo anterior y siguiente, por enlace o por manejador. */
export const PorCursor: Story = {
  args: { mode: 'cursor', nextHref: '?cursor=abc', previousHref: undefined },
};

export const ContratoCursorYHrefs: Story = {
  name: 'Test — modo cursor y enlaces precalculados',
  tags: ['!dev'],
  render: () => (
    <>
      <Pagination mode="cursor" nextHref="?cursor=abc" ariaLabel="Cursor" />
      <Pagination pageCount={3} page={2} hrefs={{ 1: '?p=1', 2: '?p=2', 3: '?p=3' }} ariaLabel="Páginas" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cursor = within(canvas.getByRole('navigation', { name: 'Cursor' }));
    await expect(cursor.getByRole('button', { name: 'Página anterior' })).toBeDisabled();
    await expect(cursor.getByRole('link', { name: 'Página siguiente' })).toHaveAttribute('href', '?cursor=abc');
    const pages = within(canvas.getByRole('navigation', { name: 'Páginas' }));
    await expect(pages.getByRole('link', { name: 'Página 3' })).toHaveAttribute('href', '?p=3');
    // la actual no lleva a ningún sitio: es un botón con aria-current, nunca un
    // <a> sin href — que no sería enfocable ni se anunciaría como enlace
    const actual = pages.getByRole('button', { name: 'Página 2' });
    await expect(actual).toHaveAttribute('aria-current', 'page');
    await expect(pages.queryByRole('link', { name: 'Página 2' })).toBeNull();
  },
};

/** Test: ningún botón envía el formulario que envuelva la paginación. */
export const ContratoTypeButton: Story = {
  name: 'Test — los botones no envían el formulario',
  tags: ['!dev'],
  render: () => (
    <form onSubmit={(e) => e.preventDefault()}>
      <Pagination total={100} page={2} pageSize={10} ariaLabel="Páginas" />
      <Pagination mode="cursor" onNext={() => {}} ariaLabel="Cursor" />
    </form>
  ),
  play: async ({ canvasElement }) => {
    const botones = canvasElement.querySelectorAll('.pagination__btn');
    await expect(botones.length).toBeGreaterThan(0);
    botones.forEach((b) => {
      if (b.tagName === 'BUTTON') expect(b).toHaveAttribute('type', 'button');
    });
  },
};

/** Test: la ranura va tras el selector y los botones de página, aparte. */
export const ContratoRanuraTrasElSelector: Story = {
  name: 'Test — la ranura va tras el selector',
  tags: ['!dev'],
  render: (args) => (
    <Pagination
      {...args}
      showTotal
      onPageSizeChange={() => {}}
      afterPageSize={<button type="button">Exportar</button>}
    />
  ),
  play: async ({ canvasElement }) => {
    const meta = canvasElement.querySelector('.pagination__meta') as HTMLElement;
    const selector = meta.querySelector('.pagination__size-selector') as HTMLElement;
    const ranura = meta.querySelector('.pagination__after-page-size') as HTMLElement;
    await expect(selector.nextElementSibling).toBe(ranura);
    const controles = canvasElement.querySelector('.pagination__controls') as HTMLElement;
    await expect(controles.getBoundingClientRect().left)
      .toBeGreaterThan(ranura.getBoundingClientRect().right);
  },
};

/** Test: con la ranura llena el nav se pinta aunque no haya nada que paginar. */
export const ContratoRanuraSinPaginas: Story = {
  name: 'Test — la ranura se pinta sin páginas',
  tags: ['!dev'],
  render: () => (
    <Pagination total={0} afterPageSize={<button type="button">Exportar</button>} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: 'Exportar' })).toBeInTheDocument();
    // Sin páginas no hay botones de página que recorrer.
    await expect(canvasElement.querySelector('.pagination__controls')).toBeNull();
  },
};

/** Test: `md` es la talla por defecto y cada talla pone su clase en el `nav`. */
export const ContratoTallas: Story = {
  name: 'Test — la talla por defecto es md',
  tags: ['!dev'],
  render: () => (
    <>
      <Pagination total={100} page={2} pageSize={10} ariaLabel="Por defecto" />
      <Pagination total={100} page={2} pageSize={10} size="sm" ariaLabel="Compacta" />
      <Pagination total={100} page={2} pageSize={10} size="lg" ariaLabel="Pública" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('navigation', { name: 'Por defecto' })).toHaveClass('pagination--md');
    await expect(canvas.getByRole('navigation', { name: 'Compacta' })).toHaveClass('pagination--sm');
    await expect(canvas.getByRole('navigation', { name: 'Pública' })).toHaveClass('pagination--lg');
  },
};

/**
 * Test: el chevron ocupa la misma caja que un número —cuadrada, del lado de la
 * altura de la talla— para que la fila de botones no se descuadre en los
 * extremos. Y el botón es un outline: sin subrayado en ninguno de sus estados.
 */
export const ContratoCajaCuadrada: Story = {
  name: 'Test — el chevron mide lo mismo que un número',
  tags: ['!dev'],
  render: () => (
    <>
      <Pagination total={100} page={2} pageSize={10} size="sm" ariaLabel="Compacta" />
      <Pagination total={100} page={2} pageSize={10} ariaLabel="Media" />
      <Pagination total={100} page={2} pageSize={10} size="lg" ariaLabel="Pública" />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const nombre of ['Compacta', 'Media', 'Pública']) {
      const nav = canvas.getByRole('navigation', { name: nombre });
      const numero = nav.querySelector('.pagination__btn:not(.pagination__btn--nav)') as HTMLElement;
      const chevron = nav.querySelector('.pagination__btn--nav') as HTMLElement;
      const cajaNumero = numero.getBoundingClientRect();
      const cajaChevron = chevron.getBoundingClientRect();
      // misma caja, y cuadrada
      await expect(Math.round(cajaChevron.width)).toBe(Math.round(cajaNumero.width));
      await expect(Math.round(cajaChevron.width)).toBe(Math.round(cajaChevron.height));
      // outline, no enlace: ni subrayado de sombra ni text-decoration
      const estilo = getComputedStyle(numero);
      await expect(estilo.boxShadow).toBe('none');
      await expect(estilo.textDecorationLine).toBe('none');
    }
  },
};

/** Test: la página vigente y el chevron sin destino llevan su estado en el DOM. */
export const ContratoEstados: Story = {
  name: 'Test — activo y deshabilitado',
  tags: ['!dev'],
  render: () => <Pagination total={100} page={1} pageSize={10} ariaLabel="Páginas" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole('navigation', { name: 'Páginas' });
    const actual = within(nav).getByRole('button', { name: 'Página 1' });
    await expect(actual).toHaveClass('pagination__btn--current');
    await expect(actual).toHaveAttribute('aria-current', 'page');
    // sobre el activo, el hover no cambia nada: no hay nada a lo que navegar
    await expect(getComputedStyle(actual).pointerEvents).toBe('none');
    await expect(within(nav).getByRole('button', { name: 'Página anterior' })).toBeDisabled();
    await expect(within(nav).getByRole('button', { name: 'Página siguiente' })).toBeEnabled();
  },
};
