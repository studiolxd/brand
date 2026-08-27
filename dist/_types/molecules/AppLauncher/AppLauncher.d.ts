import './AppLauncher.css';
export interface LauncherApp {
    id: string;
    name: string;
    url: string;
    /**
     * Color de acento de la app. Es un color de dato (cada app externa trae el suyo,
     * fuera del control del DS), no un token: se aplica con `style` inline sobre
     * `.app-launcher__tile-icon`, no con una clase ni una custom property del sistema.
     */
    accent: string;
    isNew?: boolean;
}
export interface AppLauncherLabels {
    /** Texto accesible del trigger («Abrir launcher de apps»). */
    open: string;
    /** Texto del badge de app nueva. */
    new: string;
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
