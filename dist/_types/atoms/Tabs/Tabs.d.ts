import type { ReactNode } from 'react';
import './Tabs.css';
export interface TabsProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    children: ReactNode;
}
export declare function Tabs({ orientation, className, children, ...props }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface TabsListProps {
    variant?: 'underline' | 'pill';
    className?: string;
    children: ReactNode;
}
export declare function TabsList({ variant, className, children }: TabsListProps): import("react/jsx-runtime").JSX.Element;
export interface TabsTriggerProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
}
export declare function TabsTrigger({ value, disabled, className, children }: TabsTriggerProps): import("react/jsx-runtime").JSX.Element;
export interface TabsContentProps {
    value: string;
    className?: string;
    children: ReactNode;
}
export declare function TabsContent({ value, className, children }: TabsContentProps): import("react/jsx-runtime").JSX.Element;
