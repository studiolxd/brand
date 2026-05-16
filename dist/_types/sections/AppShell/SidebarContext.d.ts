export interface SidebarContextValue {
    open: boolean;
    setOpen: (open: boolean) => void;
}
export declare const SidebarContext: import("react").Context<SidebarContextValue | null>;
export declare function useSidebar(): SidebarContextValue;
