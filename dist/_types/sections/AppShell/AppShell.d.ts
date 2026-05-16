import type { ReactNode } from 'react';
import './AppShell.css';
export interface AppShellProps {
    sidebar: ReactNode;
    children: ReactNode;
}
export declare function AppShell({ sidebar, children }: AppShellProps): import("react/jsx-runtime").JSX.Element;
