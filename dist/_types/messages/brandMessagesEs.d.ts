import type { CompleteBrandMessages } from './BrandMessages';
/**
 * El catálogo castellano **entero**, ensamblado desde los espacios de `es/`.
 *
 * Es el respaldo de la librería (D5): cuando un texto no llega ni por prop ni
 * por el catálogo de la app, sale en castellano. Pero ese respaldo no viaja
 * entero: cada componente importa **solo su espacio**
 * (`useBrandMessages('pagination', paginationEs)`), así que el bundle de una
 * app que importa el paginador lleva el castellano del paginador y nada más.
 *
 * Este objeto ensamblado no lo importa ningún componente ni ningún punto de
 * entrada (lo vigila `BrandMessages.test.ts`): si lo hiciera, cada espacio
 * pasaría a compartirse entre dos entradas y el build lo partiría en un chunk
 * por espacio. Lo usan el Storybook (`.storybook/brandMessagesFixture.ts`,
 * que lo reexporta) y los tests. El tipo `CompleteBrandMessages` obliga a
 * que esté entero: un espacio nuevo sin su castellano no compila.
 */
export declare const brandMessagesEs: CompleteBrandMessages;
