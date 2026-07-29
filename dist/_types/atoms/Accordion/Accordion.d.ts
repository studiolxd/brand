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
export declare function Accordion({ className, children, ...props }: AccordionRootProps): import("react").JSX.Element;
interface AccordionItemProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children: ReactNode;
}
export declare function AccordionItem({ className, children, ...props }: AccordionItemProps): import("react").JSX.Element;
interface AccordionTriggerProps {
    className?: string;
    /** Tamaño del chevron indicador. */
    chevronSize?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}
export declare function AccordionTrigger({ className, chevronSize, children }: AccordionTriggerProps): import("react").JSX.Element;
interface AccordionContentProps {
    className?: string;
    children: ReactNode;
}
export declare function AccordionContent({ className, children }: AccordionContentProps): import("react").JSX.Element;
export {};
