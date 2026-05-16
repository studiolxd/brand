import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

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

export const DarkMode: Story = {
  name: 'Dark mode',
  render: (args) => {
    const [page, setPage] = useState(args.page);
    return (
      <div
        className="surface-dark"
        style={{ padding: '2rem', backgroundColor: 'var(--color-background-dark)' }}
      >
        <Pagination {...args} page={page} onPageChange={setPage} showTotal />
      </div>
    );
  },
};
