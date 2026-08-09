import * as RadixSelect from '@radix-ui/react-select';
import type { Country } from 'react-phone-number-input';
import './InputPhone.css';
interface InputPhoneProps {
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    name?: string;
    describedBy?: string;
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * Nodo DOM donde montar el portal del dropdown de país (reenviado a Radix
     * `Portal.container`). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * InputPhone vive dentro de un `.surface-dark` **anidado** (no en la
     * raíz), ya que ese contexto no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof RadixSelect.Portal>['container'];
}
export declare function InputPhone({ value, defaultCountry, placeholder, disabled, error, size, id, name, describedBy, onChange, onBlur, container, }: InputPhoneProps): import("react/jsx-runtime").JSX.Element;
export {};
