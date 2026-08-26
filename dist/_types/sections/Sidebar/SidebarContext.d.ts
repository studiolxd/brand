export interface SidebarContextValue {
    /** La sidebar está en rail: solo iconos. `SidebarNav` lo lee para cambiar de modo. */
    rail: boolean;
}
export declare const SidebarContext: import("react").Context<SidebarContextValue>;
export declare function useSidebar(): SidebarContextValue;
