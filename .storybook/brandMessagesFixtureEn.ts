import type { BrandMessages } from '../src/stories/messages/BrandMessages';

/**
 * El mismo catálogo que `brandMessagesFixture`, **en inglés**, para las
 * stories «Textos desde el proveedor (otro idioma)».
 *
 * Existe por economía, no por capricho: cada ola de la campaña del proveedor
 * añade espacios al tipo `BrandMessages`, y con el literal copiado dentro de
 * cada story eso obligaba a completar a mano el mismo objeto en una docena de
 * ficheros. Aquí se escribe una vez; el tipo obliga a que esté entero, así que
 * una ola que se deje un espacio no compila.
 *
 * Vale lo mismo que para el castellano: vive **fuera de `src/`**, no es punto
 * de entrada de la librería, no lo importa ningún componente y
 * `package.json#files` no publica `.storybook/`. Ningún código de un
 * consumidor puede caer aquí. Lo vigila
 * `src/stories/messages/BrandMessages.test.ts`.
 *
 * Solo lo importan `.stories.tsx` —que tampoco viajan en el paquete—, nunca un
 * componente.
 */
export const brandMessagesFixtureEn: BrandMessages = {
  pagination: {
    label: 'Pagination',
    pagesGroup: 'Pages',
    previous: 'Previous page',
    next: 'Next page',
    goToPage: (page) => `Page ${page}`,
    perPage: 'Rows per page',
    total: (total) => `${total} results`,
    allOption: 'All',
  },
  table: {
    actions: 'Actions',
    sortable: 'Activate sorting',
    sortedAscending: 'Sorted ascending',
    sortedDescending: 'Sorted descending',
  },
  dataTable: {
    empty: 'No results.',
    search: 'Search…',
  },
  inputField: {
    clear: 'Clear',
  },
  passwordField: {
    show: 'Show password',
    hide: 'Hide password',
  },
  select: {
    placeholder: 'Select…',
  },
  multiSelect: {
    placeholder: 'Select…',
    remove: (label) => `Remove ${label}`,
  },
};
