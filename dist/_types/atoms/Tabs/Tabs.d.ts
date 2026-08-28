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
export declare function Tabs({ orientation, className, children, onValueChange, ...props }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface TabsListProps extends React.ComponentPropsWithoutRef<'div'> {
    variant?: 'underline' | 'pill';
    className?: string;
    children: ReactNode;
}
/**
 * La barra de pestañas. `{...rest}` (`aria-label`, `aria-labelledby`, `id`,
 * `data-*`…) se reenvía al `role="tablist"`: es la forma de darle nombre
 * accesible cuando hay más de un juego de pestañas en la página.
 */
export declare function TabsList({ variant, className, children, ...rest }: TabsListProps): import("react/jsx-runtime").JSX.Element;
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
