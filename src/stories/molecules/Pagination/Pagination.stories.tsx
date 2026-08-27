import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Por revisar/Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    total:           { control: { type: 'number' } },
    page:            { control: { type: 'number' } },
    pageSize:        { control: { type: 'number' } },
    showTotal:       { control: { type: 'boolean' } },
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
    // la actual no es un enlace (sin href): es un dato marcado con aria-current
    await expect(pages.getByText('2').closest('[aria-current="page"]')).not.toBeNull();
  },
};
