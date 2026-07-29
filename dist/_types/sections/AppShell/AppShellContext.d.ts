export interface AppShellContextValue {
    /** Menú de navegación móvil desplegado (solo aplica <1024px; en desktop siempre false). */
    menuOpen: boolean;
    setMenuOpen: (open: boolean) => void;
}
export declare const AppShellContext: import("react").Context<AppShellContextValue | null>;
export declare function useAppShell(): AppShellContextValue;
