import type { CompleteBrandMessages } from '../BrandMessages';

/** El castellano de respaldo del espacio `siteSearch` (ver `../brandMessagesEs.ts`). */
export const siteSearchEs: CompleteBrandMessages['siteSearch'] = {
  label: 'Buscar en el sitio',
  placeholder: '¿Qué estás buscando?',
  submit: 'Buscar',
  idle: 'Escribe para buscar en todo el sitio',
  minLength: (min) => `Escribe al menos ${min} caracteres`,
  pending: 'Pulsa Intro para buscar',
  loading: 'Buscando…',
  results: (count, query) =>
    count === 1 ? `1 resultado para «${query}»` : `${count} resultados para «${query}»`,
  resultsLabel: 'Resultados de la búsqueda',
  emptyTitle: 'Sin resultados',
  emptyDescription: 'Revisa la ortografía o prueba con menos palabras.',
  suggestionsLabel: 'Búsquedas frecuentes',
  errorTitle: 'No se ha podido buscar',
  errorDescription: 'El buscador no ha respondido. Vuelve a intentarlo en unos segundos.',
  retry: 'Reintentar',
};
