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
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string) => void;
    id?: string;
    /** Etiqueta accesible del trigger. Si no se pasa, usa el placeholder. */
    'aria-label'?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Radix
     * `Portal.container`). Por defecto Radix lo monta en `document.body`,
     * que hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasar `container` cuando
     * el Select vive dentro de un `.surface-dark` **anidado** (no en la raíz):
     * ese contexto no llega a `document.body` por la cascada, así que hay que
     * montar el portal dentro del propio contenedor con la clase.
     */
    container?: React.ComponentPropsWithoutRef<typeof RadixSelect.Portal>['container'];
}
/** Raíz del Select (Radix Root re-exportado). */
export declare const SelectRoot: import("react").FC<RadixSelect.SelectProps>;
/** Valor/placeholder del trigger (Radix Value re-exportado). */
export declare const SelectValue: import("react").ForwardRefExoticComponent<RadixSelect.SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
/** Agrupa opciones (Radix Group, no visual). */
export declare const SelectGroup: import("react").ForwardRefExoticComponent<RadixSelect.SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> {
    size?: 'sm' | 'md' | 'lg';
}
/** Trigger del Select: botón `.select` con el chevron del DS. Los children son el `Select.Value`. */
export declare const SelectTrigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof RadixSelect.Content> {
    size?: 'sm' | 'md' | 'lg';
    /** Ver `SelectProps.container`. */
    container?: React.ComponentPropsWithoutRef<typeof RadixSelect.Portal>['container'];
}
/** Dropdown del Select: Portal → Content (`.select__content`) → Viewport. `position`/`sideOffset` del DS. */
export declare const SelectContent: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Item>;
/** Opción del Select (`.select__item`). Los children (texto o JSX) van en `ItemText`. */
export declare const SelectItem: import("react").ForwardRefExoticComponent<Omit<RadixSelect.SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Label>;
/** Etiqueta de grupo (`.select__label`, tipografía del label del DS). */
export declare const SelectLabel: import("react").ForwardRefExoticComponent<Omit<RadixSelect.SelectLabelProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>;
/** Separador entre grupos (`.select__separator`). */
export declare const SelectSeparator: import("react").ForwardRefExoticComponent<Omit<RadixSelect.SelectSeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
declare function SelectClosed({ options, value, defaultValue, placeholder, disabled, readOnly, size, onValueChange, id, 'aria-label': ariaLabel, container, }: SelectProps): import("react/jsx-runtime").JSX.Element;
/**
 * Select. Dos formas de uso:
 * - **Cerrada (data-driven)**: `<Select options={[…]} value onValueChange … />`.
 * - **Compuesta**: `<Select.Root><Select.Trigger><Select.Value/></Select.Trigger>
 *   <Select.Content><Select.Item/>…</Select.Content></Select.Root>` — para labels
 *   JSX, grupos, o inyección de props del consumidor (FormControl) en el trigger.
 *
 * Ambas comparten el mismo motor Radix y las mismas clases: la cerrada está
 * implementada sobre las partes.
 *
 * Las partes están disponibles también como **named exports** (`SelectTrigger`,
 * `SelectContent`, `SelectItem`…): en **Server Components (RSC)** usa los named
 * exports — el namespace (`Select.Trigger`) requiere contexto cliente.
 */
export declare const Select: typeof SelectClosed & {
    Root: import("react").FC<RadixSelect.SelectProps>;
    Trigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Value: import("react").ForwardRefExoticComponent<RadixSelect.SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
    Content: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
    Group: import("react").ForwardRefExoticComponent<RadixSelect.SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
    Label: import("react").ForwardRefExoticComponent<Omit<RadixSelect.SelectLabelProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Item: import("react").ForwardRefExoticComponent<Omit<RadixSelect.SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Separator: import("react").ForwardRefExoticComponent<Omit<RadixSelect.SelectSeparatorProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
};
export {};
