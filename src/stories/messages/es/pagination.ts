import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `pagination` (ver `../brandMessagesEs.ts`). */
export const paginationEs: CompleteBrandMessages['pagination'] = {
  label: 'Paginación',
  pagesGroup: 'Páginas',
  previous: 'Página anterior',
  next: 'Página siguiente',
  goToPage: (page) => `Página ${page}`,
  perPage: 'Registros por página',
  total: (total) => `${total} resultados`,
  allOption: 'Todos',
};
