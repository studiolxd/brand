import type { BrandMessages } from '../src/stories/messages/BrandMessages';

/**
 * Los textos del catálogo, en castellano, **para el Storybook y solo para él**.
 *
 * No es el default que se retiró de los componentes, y la diferencia no es de
 * matiz: un default viaja DENTRO del paquete publicado y se alcanza en
 * ejecución desde cualquier app que olvide un texto; este fichero vive fuera
 * de `src/`, no es punto de entrada de la librería, no lo importa ningún
 * componente y `package.json#files` solo publica `dist/`, `src/tokens/` y el
 * `CHANGELOG` — así que ningún código de un consumidor puede caer aquí.
 * Lo vigila `src/stories/messages/BrandMessages.test.ts`.
 *
 * El Storybook necesita un catálogo porque es la aplicación que monta los
 * componentes: sin proveedor, un paginador sin props revienta — que es
 * exactamente lo que queremos que le pase a una app que se deja un texto.
 */
export const brandMessagesFixture: BrandMessages = {
  pagination: {
    label: 'Paginación',
    pagesGroup: 'Páginas',
    previous: 'Página anterior',
    next: 'Página siguiente',
    goToPage: (page) => `Página ${page}`,
    perPage: 'Registros por página',
    total: (total) => `${total} resultados`,
    allOption: 'Todos',
  },
  table: {
    actions: 'Acciones',
    sortable: 'Activar ordenación',
    sortedAscending: 'Ordenado ascendente',
    sortedDescending: 'Ordenado descendente',
  },
  dataTable: {
    empty: 'Sin resultados.',
    search: 'Buscar…',
  },
  inputField: {
    clear: 'Borrar',
  },
  passwordField: {
    show: 'Mostrar contraseña',
    hide: 'Ocultar contraseña',
  },
  select: {
    placeholder: 'Seleccionar…',
  },
  multiSelect: {
    placeholder: 'Seleccionar…',
    remove: (label) => `Quitar ${label}`,
  },
  numberInput: {
    decrement: 'Decrementar',
    increment: 'Incrementar',
  },
  otpInput: {
    group: 'Código de verificación',
    digit: (index, length) => `Dígito ${index} de ${length}`,
  },
  inputPhone: {
    country: 'País',
  },
  asyncSelect: {
    placeholder: 'Buscar…',
    empty: 'Sin resultados',
    loading: 'Buscando…',
    clear: 'Limpiar selección',
  },
  asyncMultiSelect: {
    placeholder: 'Buscar…',
    empty: 'Sin resultados',
    loading: 'Buscando…',
    remove: (label) => `Quitar ${label}`,
  },
};
