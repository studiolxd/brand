import * as RadixPopover from '@radix-ui/react-popover';
import './AsyncSelect.css';
export interface AsyncSelectOption {
    value: string;
    label: string;
}
export interface AsyncSelectProps {
    onSearch: (query: string) => Promise<AsyncSelectOption[]>;
    value?: string | null;
    onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
    /** Label of the currently selected option — required when `value` is set so the component can display it */
    selectedOption?: AsyncSelectOption | null;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    'aria-label'?: string;
    'aria-describedby'?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown (reenviado a Radix
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * AsyncSelect vive dentro de un `.surface-dark` **anidado** (no en la
     * raíz), ya que ese contexto no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof RadixPopover.Portal>['container'];
}
export declare function AsyncSelect({ onSearch, value, onValueChange, selectedOption, placeholder, disabled, readOnly, size, id, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, container, }: AsyncSelectProps): import("react/jsx-runtime").JSX.Element;
