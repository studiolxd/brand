import type { PaginationMessages } from '../molecules/Pagination/Pagination';

/**
 * El contrato de textos de la librería: un espacio por componente, y dentro
 * de cada espacio **todas las claves obligatorias**.
 *
 * El tipo nace aquí, en el DS, y es el catálogo de la aplicación el que lo
 * satisface — nunca al revés. Si el tipo se generase desde el JSON de una
 * suite concreta, el DS pasaría a depender de un paquete de producto para
 * declarar su propio contrato y dejaría de sostenerse solo.
 *
 * Anidado por componente, no plano: son 310 textos en 111 componentes, y una
 * lista plana de claves sueltas (`paginationPrevious`, `modalClose`…) no se
 * puede escribir ni revisar. Los espacios calcan además los que el catálogo
 * de la suite ya tiene (`pagination`, `table`, `common`…), así que montar el
 * proveedor es mapear namespaces, no inventarlos.
 *
 * Cada interfaz de espacio vive **junto a su componente** (como
 * `RecoveryCodesLabels`), no aquí: aquí solo se ensamblan. Un componente que
 * gana textos declara su interfaz al lado de sus props y añade una línea a
 * este tipo; a partir de ese momento, una aplicación que no la rellene no
 * compila.
 */
export interface BrandMessages {
  pagination: PaginationMessages;
}

export type { PaginationMessages };
