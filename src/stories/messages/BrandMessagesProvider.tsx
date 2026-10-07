'use client';

import type { ReactNode } from 'react';
import { BrandMessagesContext, BrandMessagesFallbackContext } from './BrandMessagesContext';
import type { BrandMessages } from './BrandMessages';

export interface BrandMessagesProviderProps {
  /**
   * El catálogo en el idioma vigente. Es `BrandMessages`, **todo opcional**:
   * lo que no traiga sale en el castellano que lleva el paquete, con un aviso
   * en la consola en desarrollo (una vez por clave).
   *
   * Para que olvidar un texto sea un error de compilación y no un «Cancelar»
   * castellano dentro de una página en francés, escribe el catálogo con
   * `satisfies CompleteBrandMessages`.
   *
   * Opcional solo para la app que va **entera en castellano** y monta el
   * proveedor con `fallback="es"` sin catálogo propio.
   */
  messages?: BrandMessages;
  /**
   * Declara que el castellano de respaldo es **intencionado** (D71): lo que el
   * catálogo no traiga sale en castellano igual que sin la prop, pero sin el
   * aviso de desarrollo «falta X en el catálogo; sale en castellano». Para la
   * app que solo existe en castellano, con o sin `messages` (o con uno
   * parcial para cambiar algún texto). Una app multiidioma no la pone: esos
   * avisos son los que le dicen qué le falta a su catálogo.
   */
  fallback?: 'es';
  children: ReactNode;
}

/**
 * Los textos que los componentes emiten por su cuenta, montado **una vez en
 * la raíz de la aplicación** y alimentado desde el catálogo de la app (en la
 * suite, `@slxd/messages`).
 *
 * El orden de resolución de cada texto es **prop → proveedor → castellano de
 * respaldo** (D5). La prop suelta sigue existiendo como anulación puntual —el
 * `ariaLabel` de un paginador concreto no es el de todos—; cuando no se pasa,
 * el texto sale del proveedor, y si el proveedor no lo trae (o no hay
 * proveedor), del castellano del paquete, avisando en desarrollo de qué
 * clave faltaba.
 *
 * ```tsx
 * // app/[locale]/layout.tsx
 * const t = await getTranslations();
 *
 * <BrandMessagesProvider
 *   messages={{
 *     pagination: {
 *       label: t('pagination.label'),
 *       pagesGroup: t('pagination.pagesGroup'),
 *       previous: t('pagination.previous'),
 *       next: t('pagination.next'),
 *       goToPage: (page) => t('pagination.goToPage', { page }),
 *       perPage: t('pagination.perPage'),
 *       total: (count) => t('pagination.total', { count }),
 *       allOption: t('pagination.allOption'),
 *     },
 *   }}
 * >
 *   {children}
 * </BrandMessagesProvider>
 * ```
 *
 * Una app solo en castellano lo declara y se ahorra los avisos:
 *
 * ```tsx
 * <BrandMessagesProvider fallback="es">{children}</BrandMessagesProvider>
 * ```
 */
export function BrandMessagesProvider({ messages, fallback, children }: BrandMessagesProviderProps) {
  return (
    <BrandMessagesContext.Provider value={messages ?? null}>
      <BrandMessagesFallbackContext.Provider value={fallback === 'es'}>
        {children}
      </BrandMessagesFallbackContext.Provider>
    </BrandMessagesContext.Provider>
  );
}
