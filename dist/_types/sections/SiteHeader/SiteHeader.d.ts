import { type ReactNode } from 'react';
import { type ContainerWidth } from '../../atoms/Container/Container';
import './SiteHeader.css';
export interface SiteHeaderProps {
    /** Destino del logotipo. */
    logoHref?: string;
    /** Texto accesible del enlace del logotipo. */
    logoLabel?: string;
    /** aria-label del botón de menú. */
    menuLabel?: string;
    /** Texto del enlace de salto al contenido. Omítelo para no renderizarlo. */
    skipLabel?: string;
    /** Destino del enlace de salto. */
    skipHref?: string;
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
 */
export declare function SiteHeader({ logoHref, logoLabel, menuLabel, skipLabel, skipHref, width, open, onOpenChange, children, settings, panelId, actions, language, }: SiteHeaderProps): import("react/jsx-runtime").JSX.Element;
