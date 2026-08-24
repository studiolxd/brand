import './AppLauncher.css';
export interface LauncherApp {
    id: string;
    name: string;
    url: string;
    /** Color de acento de la app (llega por datos, no del sistema de tokens). */
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
