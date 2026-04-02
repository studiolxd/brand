import type { ReactNode } from 'react';
import './Accordion.css';
interface AccordionSingleProps {
    type: 'single';
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Permite cerrar todos los items (por defecto true). */
    collapsible?: boolean;
}
interface AccordionMultipleProps {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    collapsible?: never;
}
type AccordionRootProps = (AccordionSingleProps | AccordionMultipleProps) & {
    id?: string;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
};
export declare function Accordion({ className, children, ...props }: AccordionRootProps): import("react/jsx-runtime").JSX.Element;
interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
}
export declare function AccordionItem({ className, children, ...props }: AccordionItemProps): import("react/jsx-runtime").JSX.Element;
interface AccordionTriggerProps {
    className?: string;
    children: ReactNode;
}
export declare function AccordionTrigger({ className, children }: AccordionTriggerProps): import("react/jsx-runtime").JSX.Element;
interface AccordionContentProps {
    className?: string;
    children: ReactNode;
}
export declare function AccordionContent({ className, children }: AccordionContentProps): import("react/jsx-runtime").JSX.Element;
export {};
