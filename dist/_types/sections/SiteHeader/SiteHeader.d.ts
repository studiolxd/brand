import { type ReactNode } from 'react';
import { type ContainerWidth } from '../../atoms/Container/Container';
import { type LogoSize } from '../../atoms/Logo/Logo';
import './SiteHeader.css';
export type SiteHeaderLogoLinkProps = {
    href: string;
    className: string;
    'aria-label': string;
    children: ReactNode;
};
export interface SiteHeaderProps {
    /** Destino del logotipo. */
    logoHref?: string;
    /** Texto accesible del enlace del logotipo. */
    logoLabel?: string;
    /** aria-label del botón de menú. */
    menuLabel?: string;
    /** aria-label del botón de menú cuando está abierto («Cerrar menú»). */
    menuCloseLabel?: string;
    /** La marca. Por defecto el `Logo` de Studio LXD a `logoSize`; un producto de la suite pone la suya. */
    logo?: ReactNode;
    /** Talla del logotipo por defecto. `xl` (64px): la cabecera es el sitio de la marca. */
    logoSize?: LogoSize;
    /** Talla del botón de menú. `lg` (48px) acompaña al logotipo grande. */
    menuButtonSize?: 'sm' | 'md' | 'lg';
    /**
     * Enlace del logotipo para el router del producto. Recibe `href`, `className`,
     * `aria-label` y `children`, y debe reenviarlos todos.
     */
    renderLogoLink?: (props: SiteHeaderLogoLinkProps) => ReactNode;
    /** Ancho del contenido; el fondo siempre llega de lado a lado. */
    width?: ContainerWidth;
    /** Estado del menú cuando lo gobierna el producto. Si se omite, es interno. */
    open?: boolean;
    /** Notifica el cambio de estado del menú. */
    onOpenChange?: (open: boolean) => void;
    /** Índice del sitio dentro del panel: normalmente un `SiteNav`. */
    children?: ReactNode;
    /** Ajustes del sitio al final del panel (el selector de tema). */
    settings?: ReactNode;
    /** id del panel — `aria-controls` del botón de menú. */
    panelId?: string;
    /** Controles del producto en la barra (acceso, CTA…). */
    actions?: ReactNode;
    /** El selector de idioma, entre las acciones y el botón de menú: un `LanguageSwitcher` compacto. */
    language?: ReactNode;
}
/**
 * Cabecera de las páginas públicas: logotipo, controles del producto y botón
 * de menú, con el contenido acotado por `Container` y el fondo a sangre. El
 * menú es siempre un panel a pantalla completa bajo la barra —no hay
 * navegación en línea— con el índice del sitio y, al final, sus ajustes.
 * El enlace de salto al contenido no va aquí: lo pone `AppRoot`, una vez por
 * documento.
 */
export declare function SiteHeader({ logoHref, logoLabel, menuLabel, menuCloseLabel, logoSize, logo, menuButtonSize, renderLogoLink, width, open, onOpenChange, children, settings, panelId, actions, language, }: SiteHeaderProps): import("react/jsx-runtime").JSX.Element;
