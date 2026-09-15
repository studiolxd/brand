import type { ReactNode } from 'react';
import type { BrandMessages } from './BrandMessages';
export interface BrandMessagesProviderProps {
    /**
     * El catálogo entero, en el idioma vigente. Es `BrandMessages`, con todas
     * sus claves: si falta una, no compila. Ese es el punto del proveedor —
     * olvidar un texto tiene que ser un error de compilación y no un
     * «Cancelar» castellano dentro de una página en francés.
     */
    messages: BrandMessages;
    children: ReactNode;
}
/**
 * Los textos que los componentes emiten por su cuenta, montado **una vez en
 * la raíz de la aplicación** y alimentado desde el catálogo de la app (en la
 * suite, `@slxd/messages`).
 *
 * El orden de resolución de cada texto es **prop → proveedor → error**, y no
 * hay un cuarto escalón: ningún componente trae el castellano puesto. La prop
 * suelta sigue existiendo como anulación puntual —el `ariaLabel` de un
 * paginador concreto no es el de todos—, pero cuando no se pasa, el texto
 * sale del proveedor o revienta con un mensaje que dice qué falta.
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
 */
export declare function BrandMessagesProvider({ messages, children }: BrandMessagesProviderProps): import("react/jsx-runtime").JSX.Element;
