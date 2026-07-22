import * as RadixPopover from '@radix-ui/react-popover';
import './MultiSelect.css';
export interface MultiSelectOption {
    value: string;
    label: string;
    'aria-label'?: string;
}
export interface MultiSelectProps {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onValueChange?: (value: string[]) => void;
    id?: string;
    'aria-label'?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Radix
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * MultiSelect vive dentro de un `.surface-dark` **anidado** (no en la
     * raíz), ya que ese contexto no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof RadixPopover.Portal>['container'];
}
export declare function MultiSelect({ options, value, defaultValue, placeholder, disabled, readOnly, size, onValueChange, id, 'aria-label': ariaLabel, container, }: MultiSelectProps): import("react/jsx-runtime").JSX.Element;
