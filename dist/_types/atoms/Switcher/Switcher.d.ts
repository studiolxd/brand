import * as RadixSwitch from '@radix-ui/react-switch';
import './Switcher.css';
export interface SwitcherProps extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
    size?: 'sm' | 'md' | 'lg';
}
/**
 * Switcher (Radix Switch). `ref` y `{...rest}` se reenvían al **Radix Root** — el
 * elemento interactivo con `role="switch"` — para soportar react-hook-form
 * (`Controller`) y la inyección de props del consumidor (`aria-*`, `data-*`, `id`,
 * `name`, `checked`, `onCheckedChange`…). `className` se concatena tras las propias.
 */
export declare const Switcher: import("react").ForwardRefExoticComponent<SwitcherProps & import("react").RefAttributes<HTMLButtonElement>>;
