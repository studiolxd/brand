import * as RadixSelect from '@radix-ui/react-select';
import './Select.css';
export interface SelectOption {
    value: string;
    label: string;
    /** Etiqueta accesible de la opción. Si no se pasa, usa label. */
    'aria-label'?: string;
}
export interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    /** Placeholder del trigger. Default: "Seleccionar…" (en la API compuesta lo pone cada consumidor vía `Select.Value`). */
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    dark?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string) => void;
    id?: string;
    /** Etiqueta accesible del trigger. Si no se pasa, usa el placeholder. */
    'aria-label'?: string;
}
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> {
    size?: 'sm' | 'md' | 'lg';
}
export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Content> {
    size?: 'sm' | 'md' | 'lg';
    dark?: boolean;
}
export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {
}
export interface SelectLabelProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Label> {
}
export interface SelectSeparatorProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Separator> {
}
declare function SelectClosed({ options, value, defaultValue, placeholder, disabled, readOnly, dark, size, onValueChange, id, 'aria-label': ariaLabel, }: SelectProps): import("react/jsx-runtime").JSX.Element;
/**
 * Select. Dos formas de uso:
 * - **Cerrada (data-driven)**: `<Select options={[…]} value onValueChange … />`.
 * - **Compuesta**: `<Select.Root><Select.Trigger><Select.Value/></Select.Trigger>
 *   <Select.Content><Select.Item/>…</Select.Content></Select.Root>` — para labels
 *   JSX, grupos, o inyección de props del consumidor (FormControl) en el trigger.
 *
 * Ambas comparten el mismo motor Radix y las mismas clases: la cerrada está
 * implementada sobre las partes.
 */
export declare const Select: typeof SelectClosed & {
    Root: import("react").FC<RadixSelect.SelectProps>;
    Trigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Value: import("react").ForwardRefExoticComponent<RadixSelect.SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
    Content: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
    Group: import("react").ForwardRefExoticComponent<RadixSelect.SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
    Label: import("react").ForwardRefExoticComponent<SelectLabelProps & import("react").RefAttributes<HTMLDivElement>>;
    Item: import("react").ForwardRefExoticComponent<SelectItemProps & import("react").RefAttributes<HTMLDivElement>>;
    Separator: import("react").ForwardRefExoticComponent<SelectSeparatorProps & import("react").RefAttributes<HTMLDivElement>>;
};
export {};
