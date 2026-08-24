import type { ReactNode } from 'react';
import './Sidebar.css';
export interface SidebarProps {
    logo?: ReactNode;
    children: ReactNode;
    /** Slot inferior fijo (p. ej. UserMenu), fuera del scroll del panel. */
    footer?: ReactNode;
    id?: string;
    /** Mantiene el rail siempre desplegado en escritorio, sin depender de hover/foco. */
    expanded?: boolean;
}
export declare function Sidebar({ logo, children, footer, id, expanded }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
/**
 * Sección del panel: agrupa un bloque de navegación (p. ej. el árbol de
 * carpetas) separándolo del resto por su propio espacio vertical.
 */
export declare function SidebarGroup({ className, ...props }: SidebarGroupProps): import("react/jsx-runtime").JSX.Element;
/** Contenido de una sección — la lista en sí, sin el espacio del grupo. */
export declare function SidebarGroupContent({ className, ...props }: SidebarGroupProps): import("react/jsx-runtime").JSX.Element;
/** Línea divisoria entre secciones del panel. */
export declare function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>): import("react/jsx-runtime").JSX.Element;
