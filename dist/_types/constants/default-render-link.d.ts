import type { AnchorHTMLAttributes } from 'react';
/**
 * El enlace por defecto de los componentes con `renderLink`: un `<a>` que
 * recibe **todas** las props que le llegan. Reenviarlas todas no es un
 * detalle: en un menú, el motor de conducta inyecta rol, `tabIndex` y
 * manejadores de teclado en el enlace, y un `renderLink` que solo copie
 * `href`/`className` lo rompe. El enlace del router del producto tiene que
 * hacer lo mismo (`<Link {...props} />`).
 *
 * Los que reenvían solo una lista cerrada de atributos (`LanguageSwitcher`,
 * `SiteNav`) conservan su versión local: no son la misma función.
 */
export declare function defaultRenderLink(props: AnchorHTMLAttributes<HTMLAnchorElement>): import("react/jsx-runtime").JSX.Element;
