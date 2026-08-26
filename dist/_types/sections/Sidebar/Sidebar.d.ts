import { type ReactNode } from 'react';
import './Sidebar.css';
export { useSidebar } from './SidebarContext';
export interface SidebarProps {
    /** Arriba del todo (un `Logo`). */
    logo?: ReactNode;
    /** El panel: `OrgSwitcher`, `SidebarNav`, secciones… */
    children: ReactNode;
    /** Pie fijo, fuera del scroll del panel. */
    footer?: ReactNode;
    id?: string;
    /** Nombre accesible del `aside`. */
    label?: string;
    /** Texto accesible del asa de redimensión. */
    resizerLabel?: string;
    /** Fuerza el modo sin `AppShell` (Storybook, pruebas). Con shell, lo decide el shell. */
    mode?: 'open' | 'rail';
}
/**
 * La barra lateral de la aplicación. En escritorio es una columna con tres
 * estados que gobierna el `AppShell`: desplegada (ancho redimensionable
 * arrastrando su borde o con el teclado en el asa), rail (solo iconos; los
 * grupos de navegación se abren como menú) y cerrada. En móvil es un cajón
 * que entra por la izquierda y se cierra al navegar.
 */
export declare function Sidebar({ logo, children, footer, id, label, resizerLabel, mode, }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
/** Sección del panel: agrupa un bloque (p. ej. el árbol de carpetas) con su propio aire vertical. */
export declare function SidebarGroup({ className, ...props }: SidebarGroupProps): import("react/jsx-runtime").JSX.Element;
/** Contenido de una sección — la lista en sí, sin el aire del grupo. */
export declare function SidebarGroupContent({ className, ...props }: SidebarGroupProps): import("react/jsx-runtime").JSX.Element;
/** Línea divisoria entre secciones del panel. */
export declare function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>): import("react/jsx-runtime").JSX.Element;
