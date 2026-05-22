import { type ReactNode } from 'react';
import './AppShell.css';
export { useSidebar } from './SidebarContext';
export type { SidebarContextValue } from './SidebarContext';
export interface AppShellProps {
    sidebar: ReactNode;
    children: ReactNode;
    defaultCollapsed?: boolean;
    storageKey?: string;
}
export declare function AppShell({ sidebar, children, defaultCollapsed, storageKey }: AppShellProps): import("react/jsx-runtime").JSX.Element;
