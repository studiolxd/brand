export interface SidebarContextValue {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}
export declare const SidebarContext: import("react").Context<SidebarContextValue | null>;
export declare function useSidebar(): SidebarContextValue;
