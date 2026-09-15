import './AppLauncher.css';
/**
 * El cromo del lanzador, y **solo el cromo**: el nombre accesible del
 * disparador, el título del diálogo y la marca de app nueva. Las tres valen
 * igual en todas las apps de la suite —el lanzador es el mismo mueble en
 * todas— y ninguna nombra una aplicación concreta: eso viaja en `apps`.
 *
 * **`trigger` no está aquí** y sigue siendo prop. No es un texto de más: su
 * presencia decide la cara del disparador —solo icono, o icono con rótulo—, y
 * un texto de catálogo está siempre presente, así que ponerlo aquí obligaría a
 * todos los lanzadores de la suite a llevar rótulo. Es una decisión de
 * maqueta que se toma en el sitio donde se monta.
 */
export interface AppLauncherMessages {
    /** Nombre accesible del disparador cuando es solo icono («Abrir launcher de apps»). */
    open: string;
    /** Texto del distintivo de app nueva. */
    new: string;
    /** Título del diálogo con `presentation="modal"`. */
    title: string;
}
export interface LauncherApp {
    id: string;
    name: string;
    url: string;
    isNew?: boolean;
}
export interface AppLauncherLabels {
    /**
     * Texto accesible del trigger («Abrir launcher de apps»). Solo se usa como
     * `aria-label` cuando no hay `trigger`: con texto visible, el nombre
     * accesible es ese texto. **Sin default**: sin él, sale de
     * `appLauncher.open` del `BrandMessagesProvider`.
     */
    open?: string;
    /**
     * Texto del badge de app nueva. **Sin default**: sin él, sale de
     * `appLauncher.new` del proveedor.
     */
    new?: string;
    /**
     * Texto visible del disparador (p. ej. «Aplicaciones»), a la derecha del
     * icono de rejilla. Sin él, el disparador se queda como hoy: solo icono,
     * con `open` de nombre accesible.
     */
    trigger?: string;
    /**
     * Título del diálogo cuando `presentation="modal"`. **Sin default**: sin él,
     * sale de `appLauncher.title` del proveedor. Sin uso en
     * `presentation="popover"`, que no lleva título.
     */
    title?: string;
}
export interface AppLauncherProps {
    apps: LauncherApp[];
    /**
     * Anulaciones puntuales de los textos del lanzador. **Ya no es
     * obligatoria**: sin ella, el cromo sale del espacio `appLauncher` del
     * `BrandMessagesProvider`. Sigue haciendo falta para `trigger`, que no es
     * catálogo.
     */
    labels?: AppLauncherLabels;
    /** Id de la app actual — se marca en la rejilla. */
    currentAppId?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    /**
     * Contenedor del panel. `'modal'` (por defecto): diálogo centrado, como
     * `CommandPalette` — foco atrapado, más sitio para crecer y el mismo lugar
     * de la suite para descripciones o más aplicaciones. `'popover'`: el panel
     * flotante anclado al disparador que tenía el componente antes de v35 —
     * quien lo prefiera lo pide explícitamente.
     */
    presentation?: 'modal' | 'popover';
}
export declare function AppLauncher({ presentation, labels, ...rest }: AppLauncherProps): import("react/jsx-runtime").JSX.Element;
