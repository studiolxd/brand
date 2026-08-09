import type { ReactNode } from 'react';
import './Popover.css';
export interface PopoverProps {
    trigger: ReactNode;
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    className?: string;
}
export declare function Popover({ trigger, children, open, defaultOpen, onOpenChange, side, align, sideOffset, className, }: PopoverProps): import("react/jsx-runtime").JSX.Element;
