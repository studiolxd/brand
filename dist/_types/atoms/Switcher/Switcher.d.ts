import { Switch as BaseSwitch } from '@base-ui-components/react/switch';
import './Switcher.css';
type BaseSwitchRootProps = Omit<React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>, 'className'>;
export interface SwitcherProps extends Omit<BaseSwitchRootProps, 'onCheckedChange'> {
    /** Cambio de estado. Solo el estado: el DS no expone los detalles del evento. */
    onCheckedChange?: (checked: boolean) => void;
    size?: 'sm' | 'md' | 'lg';
    /** Marca el estado de error: aplica la clase `switcher--error` y `aria-invalid`. */
    error?: boolean;
    /** Valor enviado con el formulario cuando está activo. Default del navegador: `"on"`. */
    value?: string;
    className?: string;
}
/**
 * Switcher (Base UI Switch). `ref` y `{...rest}` se reenvían al **Root de Base UI** —
 * el elemento interactivo con `role="switch"` — para soportar react-hook-form
 * (`Controller`) y la inyección de props del consumidor (`aria-*`, `data-*`, `id`,
 * `name`, `checked`, `onCheckedChange`…). `className` se concatena tras las propias.
 * Para componer con otro elemento, usa la prop `render` de Base UI.
 */
export declare const Switcher: import("react").ForwardRefExoticComponent<SwitcherProps & import("react").RefAttributes<HTMLElement>>;
export {};
