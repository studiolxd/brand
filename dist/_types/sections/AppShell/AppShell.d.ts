import { type ReactNode } from 'react';
import './AppShell.css';
export { useAppShell } from './AppShellContext';
export type { AppShellContextValue } from './AppShellContext';
export interface AppShellProps {
    /** Chrome de escritorio (≥1024px): un <Sidebar>. */
    sidebar: ReactNode;
    /** Chrome móvil (<1024px): un <AppHeader>. */
    header?: ReactNode;
    children: ReactNode;
}
export declare function AppShell({ sidebar, header, children }: AppShellProps): import("react/jsx-runtime").JSX.Element;
