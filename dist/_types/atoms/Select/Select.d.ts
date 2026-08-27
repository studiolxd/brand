import type { ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui-components/react/select';
import type { SeparatorProps as BaseSeparatorProps } from '@base-ui-components/react/separator';
import './Select.css';
export interface SelectOption {
    value: string;
    label: string;
    /** Etiqueta accesible de la opción. Si no se pasa, usa label. */
    'aria-label'?: string;
}
/** Nodo DOM donde montar el portal del dropdown (reenviado a `Select.Portal`). */
export type SelectPortalContainer = React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
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
    /** Nombre del campo en el formulario: Base UI monta un input oculto con el valor. */
    name?: string;
    required?: boolean;
    /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
    onBlur?: React.FocusEventHandler<HTMLButtonElement>;
    /** Nombre accesible cuando el Select va suelto. En un campo lo nombra la etiqueta (`htmlFor`), que este atributo pisaría: no lo pongas ahí. */
    'aria-label'?: string;
    /** Ids de ayuda/error que describen el control (lo pone el campo). */
    'aria-describedby'?: string;
    /** Estado de error accesible (lo pone el campo). */
    'aria-invalid'?: boolean;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a `Select.Portal`
     * de Base UI). Por defecto el portal se monta en `document.body`, que hereda
     * el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`) sin
     * configuración adicional. Solo hace falta pasar `container` cuando el Select
     * vive dentro de un `.surface-dark` **anidado** (no en la raíz): ese contexto
     * no llega a `document.body` por la cascada, así que hay que montar el portal
     * dentro del propio contenedor con la clase.
     */
    container?: SelectPortalContainer;
}
type BaseSelectRootProps = React.ComponentProps<typeof BaseSelect.Root<string>>;
export interface SelectRootProps extends Omit<BaseSelectRootProps, 'onValueChange' | 'multiple'> {
    onValueChange?: (value: string) => void;
}
/** Raíz del Select (Base UI Root + índice de etiquetas de las opciones). */
export declare function SelectRoot({ children, onValueChange, ...rest }: SelectRootProps): import("react/jsx-runtime").JSX.Element;
export interface SelectValueProps extends Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Value>, 'children'> {
    /** Texto mostrado cuando no hay valor seleccionado. */
    placeholder?: ReactNode;
    children?: ReactNode | ((value: string | null) => ReactNode);
}
/** Valor/placeholder del trigger. */
export declare const SelectValue: import("react").ForwardRefExoticComponent<SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
/** Agrupa opciones (Base UI Group, no visual). */
export declare const SelectGroup: import("react").ForwardRefExoticComponent<import("@base-ui-components/react/select").SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> {
    size?: 'sm' | 'md' | 'lg';
}
/** Trigger del Select: botón `.select` con el chevron del DS. Los children son el `Select.Value`. */
export declare const SelectTrigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> {
    size?: 'sm' | 'md' | 'lg';
    /** Ver `SelectProps.container`. */
    container?: SelectPortalContainer;
    /** Lado del trigger donde se despliega. */
    side?: React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>['side'];
    /** Alineación respecto al trigger. */
    align?: React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>['align'];
    sideOffset?: number;
}
/** Dropdown del Select: Portal → Positioner → Popup (`.select__content`). */
export declare const SelectContent: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Item>;
/** Opción del Select (`.select__item`). Los children (texto o JSX) van en `ItemText`. */
export declare const SelectItem: import("react").ForwardRefExoticComponent<Omit<import("@base-ui-components/react/select").SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>;
/** Etiqueta de grupo (`.select__label`, tipografía del label del DS). */
export declare const SelectLabel: import("react").ForwardRefExoticComponent<Omit<import("@base-ui-components/react/select").SelectGroupLabelProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export type SelectSeparatorProps = Omit<BaseSeparatorProps, 'className'> & {
    className?: string;
};
/** Separador entre grupos (`.select__separator`). */
export declare const SelectSeparator: React.ForwardRefExoticComponent<SelectSeparatorProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Select. Dos formas de uso:
 * - **Cerrada (data-driven)**: `<Select options={[…]} value onValueChange … />`.
 * - **Compuesta**: `<Select.Root><Select.Trigger><Select.Value/></Select.Trigger>
 *   <Select.Content><Select.Item/>…</Select.Content></Select.Root>` — para labels
 *   JSX, grupos, o inyección de props del consumidor (FormControl) en el trigger.
 *
 * Ambas comparten el mismo motor Base UI y las mismas clases: la cerrada está
 * implementada sobre las partes.
 *
 * Las partes están disponibles también como **named exports** (`SelectTrigger`,
 * `SelectContent`, `SelectItem`…): en **Server Components (RSC)** usa los named
 * exports — el namespace (`Select.Trigger`) requiere contexto cliente.
 */
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLButtonElement>> & {
    Root: typeof SelectRoot;
    Trigger: import("react").ForwardRefExoticComponent<SelectTriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Value: import("react").ForwardRefExoticComponent<SelectValueProps & import("react").RefAttributes<HTMLSpanElement>>;
    Content: import("react").ForwardRefExoticComponent<SelectContentProps & import("react").RefAttributes<HTMLDivElement>>;
    Group: import("react").ForwardRefExoticComponent<import("@base-ui-components/react/select").SelectGroupProps & import("react").RefAttributes<HTMLDivElement>>;
    Label: import("react").ForwardRefExoticComponent<Omit<import("@base-ui-components/react/select").SelectGroupLabelProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Item: import("react").ForwardRefExoticComponent<Omit<import("@base-ui-components/react/select").SelectItemProps & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Separator: import("react").ForwardRefExoticComponent<Omit<BaseSeparatorProps, "className"> & {
        className?: string;
    } & import("react").RefAttributes<HTMLDivElement>>;
};
export {};
