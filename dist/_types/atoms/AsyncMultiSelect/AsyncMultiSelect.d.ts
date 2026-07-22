import * as RadixPopover from '@radix-ui/react-popover';
import './AsyncMultiSelect.css';
export interface AsyncMultiSelectOption {
    value: string;
    label: string;
}
export interface AsyncMultiSelectProps {
    onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    /** Labels for the currently selected values — the parent is responsible for providing these */
    selectedOptions?: AsyncMultiSelectOption[];
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
     * AsyncMultiSelect vive dentro de un `.surface-dark` **anidado** (no en
     * la raíz), ya que ese contexto no llega a `document.body` por la
     * cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof RadixPopover.Portal>['container'];
}
export declare function AsyncMultiSelect({ onSearch, value, defaultValue, onValueChange, selectedOptions, placeholder, disabled, readOnly, size, id, 'aria-label': ariaLabel, 'aria-describedby': ariaDescribedby, container, }: AsyncMultiSelectProps): import("react/jsx-runtime").JSX.Element;
