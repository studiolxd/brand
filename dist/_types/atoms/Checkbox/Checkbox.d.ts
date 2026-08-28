import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import './Checkbox.css';
type BaseCheckboxRootProps = Omit<React.ComponentPropsWithoutRef<typeof BaseCheckbox.Root>, 'checked' | 'onCheckedChange' | 'className'>;
export interface CheckboxProps extends BaseCheckboxRootProps {
    size?: 'sm' | 'md' | 'lg';
    /** Estado controlado. `'indeterminate'` se traduce al estado mixto de Base UI. */
    checked?: boolean | 'indeterminate';
    /** Callback al cambiar el estado. */
    onCheckedChange?: (checked: boolean) => void;
    /** Marca el estado de error: aplica la clase `checkbox--error` y `aria-invalid`. */
    error?: boolean;
    className?: string;
}
/**
 * Checkbox (Base UI). `ref` y `{...rest}` se reenvían al **Root de Base UI** — el
 * elemento interactivo con `role="checkbox"` — para soportar react-hook-form
 * (`Controller`) y la inyección de props del consumidor (`aria-*`, `data-*`, `id`,
 * `name`, `checked`, `onCheckedChange`…). `className` se concatena tras las clases
 * propias. Para componer con otro elemento, usa la prop `render` de Base UI.
 */
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLElement>>;
export {};
