import { type ReactNode } from 'react';
import './Sidebar.css';
export { useSidebar } from './SidebarContext';
/**
 * Lo que la barra dice por su cuenta, y todo es **cromo**: su nombre de región,
 * el nombre del asa que la ensancha y cómo se lee su ancho. Ninguno depende de
 * qué haya dentro —eso lo escribe el producto en `children`—, así que los tres
 * van al catálogo.
 */
export interface SidebarMessages {
    /** Nombre accesible del `aside`. */
    label: string;
    /** Nombre accesible del asa de redimensión. */
    resizer: string;
    /** Valor hablado del asa: el ancho con su unidad. */
    resizerValue: (width: number) => string;
}
export interface SidebarProps {
    /** Arriba del todo (un `Logo`). */
    logo?: ReactNode;
    /** El panel: `OrgSwitcher`, `SidebarNav`, secciones… */
    children: ReactNode;
    /** Pie fijo, fuera del scroll del panel. */
    footer?: ReactNode;
    id?: string;
    /**
     * Nombre accesible del `aside`. **Sin default**: sin él, sale de
     * `sidebar.label` del `BrandMessagesProvider`.
     */
    label?: string;
    /**
     * Nombre accesible del asa de redimensión. **Sin default**: sale de
     * `sidebar.resizer`. Solo se lee cuando el asa existe (escritorio, dentro de
     * un `AppShell`, con la barra no cerrada).
     */
    resizerLabel?: string;
    /**
     * Valor hablado del asa: el ancho con su unidad. **Sin default**: sale de
     * `sidebar.resizerValue`. Interpola el ancho, así que es una función.
     */
    resizerValueText?: (width: number) => string;
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
export declare function Sidebar({ logo, children, footer, id, label, resizerLabel, resizerValueText, mode, }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
/** Sección del panel: agrupa un bloque (p. ej. el árbol de carpetas) con su propio aire vertical. */
export declare function SidebarGroup({ className, ...props }: SidebarGroupProps): import("react/jsx-runtime").JSX.Element;
/** Contenido de una sección — la lista en sí, sin el aire del grupo. */
export declare function SidebarGroupContent({ className, ...props }: SidebarGroupProps): import("react/jsx-runtime").JSX.Element;
/** Línea divisoria entre secciones del panel. */
export declare function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>): import("react/jsx-runtime").JSX.Element;
