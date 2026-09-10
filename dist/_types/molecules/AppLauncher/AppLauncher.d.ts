import './AppLauncher.css';
export interface LauncherApp {
    id: string;
    name: string;
    url: string;
    /**
     * Color de acento de la app. Es un color de dato (cada app externa trae el
     * suyo, fuera del control del DS), no un token. La rejilla vive en un portal
     * y solo existe en cliente, así que el acento se escribe por el CSSOM sobre
     * `.app-launcher__tile-icon`: en un atributo `style` una app con
     * `style-src 'self'` lo descartaría sin avisar.
     */
    accent: string;
    isNew?: boolean;
}
export interface AppLauncherLabels {
    /** Texto accesible del trigger («Abrir launcher de apps»). Solo se usa como `aria-label` cuando no hay `trigger`: con texto visible, el nombre accesible es ese texto. */
    open: string;
    /** Texto del badge de app nueva. */
    new: string;
    /**
     * Texto visible del disparador (p. ej. «Aplicaciones»), a la derecha del
     * icono de rejilla. Sin él, el disparador se queda como hoy: solo icono,
     * con `open` de nombre accesible.
     */
    trigger?: string;
}
export interface AppLauncherProps {
    apps: LauncherApp[];
    labels: AppLauncherLabels;
    /** Id de la app actual — se marca en la rejilla. */
    currentAppId?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export declare function AppLauncher({ apps, labels, currentAppId, open, defaultOpen, onOpenChange, }: AppLauncherProps): import("react/jsx-runtime").JSX.Element;
