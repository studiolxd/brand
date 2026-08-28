import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { DocsSearch, type DocsSearchResult } from './DocsSearch';

const meta = {
  title: 'Molecules/DocsSearch',
  component: DocsSearch,
} satisfies Meta<typeof DocsSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

const corpus: DocsSearchResult[] = [
  {
    href: '/docs/brand/instalacion',
    title: 'Instalación',
    product: 'brand',
    excerpt: 'El paquete se distribuye por git: fija la versión en un tag.',
  },
  {
    href: '/docs/brand/tokens',
    title: 'Tokens de diseño',
    product: 'brand',
    excerpt: 'Style Dictionary genera el CSS y el SCSS desde los JSON de tokens.',
  },
  {
    href: '/docs/brand/superficie-oscura',
    title: 'Superficie oscura',
    product: 'brand',
    excerpt: 'Los tokens surface-dark-* remapean la misma custom property.',
  },
  {
    href: '/docs/360/api',
    title: 'API de 360',
    product: '360',
    excerpt: 'Autenticación, paginación y cuotas de la API pública.',
  },
];

export const PorDefecto: Story = {
  name: 'Por defecto',
  args: { query: 'tokens', results: corpus.slice(0, 3), onQueryChange: () => {} },
};

/**
 * El buscador no busca: recibe `results` ya resueltos. Aquí el filtro vive en
 * la story, que es exactamente donde vive en producción (Pagefind, Algolia o
 * una ruta propia), con su rebote y su cancelación de respuestas tardías.
 */
export const Interactivo: Story = {
  name: 'Con un índice detrás',
  args: { query: '', results: [], onQueryChange: () => {} },
  render: (args) => {
    const [query, setQuery] = useState('');
    const results = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (q.length < 2) return [];
      return corpus.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          String(item.excerpt).toLowerCase().includes(q),
      );
    }, [query]);
    return <DocsSearch {...args} query={query} onQueryChange={setQuery} results={results} />;
  },
};

/** Las coincidencias llegan resaltadas con `<mark>` dentro del extracto. */
export const ConResaltado: Story = {
  name: 'Con coincidencias resaltadas',
  args: {
    query: 'tokens',
    onQueryChange: () => {},
    results: [
      {
        href: '/docs/brand/tokens',
        title: 'Tokens de diseño',
        product: 'brand',
        excerpt: (
          <>
            Style Dictionary genera el CSS y el SCSS desde los JSON de{' '}
            <mark>tokens</mark>.
          </>
        ),
      },
      {
        href: '/docs/brand/superficie-oscura',
        title: 'Superficie oscura',
        product: 'brand',
        excerpt: (
          <>
            Los <mark>tokens</mark> <code>surface-dark-*</code> remapean la misma
            custom property.
          </>
        ),
      },
    ],
  },
};

export const Buscando: Story = {
  args: { query: 'tokens', results: [], loading: true, onQueryChange: () => {} },
};

export const SinResultados: Story = {
  name: 'Sin resultados',
  args: { query: 'zzz-no-existe', results: [], onQueryChange: () => {} },
};

/** Con la etiqueta oculta, el campo usa su texto como pista visible. */
export const EtiquetaOculta: Story = {
  name: 'Etiqueta oculta',
  args: { query: '', results: [], labelHidden: true, onQueryChange: () => {} },
};

export const EnSuperficieOscura: Story = {
  name: 'En superficie oscura',
  parameters: { surface: 'dark' },
  args: { query: 'tokens', results: corpus.slice(0, 3), onQueryChange: () => {} },
};

/**
 * Test: el campo es un `combobox` con nombre, la lista un `listbox` con
 * nombre, y hay un `option` por resultado — sin que el componente filtre nada.
 */
export const TestSemantica: Story = {
  name: 'Test — semántica y resultados',
  tags: ['!dev'],
  args: { query: 'tokens', results: corpus, onQueryChange: () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox', { name: 'Buscar en la documentación' });
    await expect(input).toHaveValue('tokens');
    await expect(canvas.getByRole('listbox', { name: 'Resultados' })).toBeInTheDocument();

    const opciones = canvas.getAllByRole('option');
    await expect(opciones).toHaveLength(corpus.length);
    await expect(opciones[0]).toHaveAttribute('href', '/docs/brand/instalacion');
  },
};

/** Test: ↑↓ mueven el resaltado sin sacar el foco del campo. */
export const TestTeclado: Story = {
  name: 'Test — teclado',
  tags: ['!dev'],
  args: { query: 'tokens', results: corpus, onQueryChange: () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    const opciones = canvas.getAllByRole('option');

    await userEvent.click(input);
    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute('aria-activedescendant', opciones[0].id);
    await expect(input).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute('aria-activedescendant', opciones[1].id);
  },
};

/** Test: el estado vacío vive en una región viva. */
export const TestEstadoVacio: Story = {
  name: 'Test — estado vacío',
  tags: ['!dev'],
  args: { query: 'zzz-no-existe', results: [], onQueryChange: () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('status')).toHaveTextContent('Sin resultados.');
    await expect(canvas.queryAllByRole('option')).toHaveLength(0);
  },
};
