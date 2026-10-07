import type { AnchorHTMLAttributes, ComponentType, ReactNode } from 'react';
/**
 * El enlace por defecto de los componentes con `renderLink`: un `<a>` que
 * recibe **todas** las props que le llegan. Reenviarlas todas no es un
 * detalle: en un menú, el motor de conducta inyecta rol, `tabIndex` y
 * manejadores de teclado en el enlace, y un `renderLink` que solo copie
 * `href`/`className` lo rompe. El enlace del router del producto tiene que
 * hacer lo mismo (`<Link {...props} />`).
 *
 * Quien lo use pasa al `renderLink` **solo atributos de `<a>`**: una prop
 * interna se quita antes de llamarlo, no se filtra aquí dentro.
 */
export declare function defaultRenderLink(props: AnchorHTMLAttributes<HTMLAnchorElement>): import("react/jsx-runtime").JSX.Element;
/**
 * Puente del alias obsoleto `linkComponent` (v51, se retira en la v52) a
 * `renderLink`: el componente `Link` del router recibe, tal cual, las props
 * que recibiría el `renderLink`. Lo usan `Pagination`, `PrevNextNav` y
 * `CalendarRoster` mientras conviven las dos formas.
 */
export declare function renderLinkFromComponent<P extends AnchorHTMLAttributes<HTMLAnchorElement>>(LinkComponent: ComponentType<P>): (props: P) => ReactNode;
