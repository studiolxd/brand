import { Select as BaseSelect } from '@base-ui/react/select';
import type { Country } from 'react-phone-number-input';
import './InputPhone.css';
export interface InputPhoneProps {
    value?: string;
    defaultCountry?: Country;
    placeholder?: string;
    disabled?: boolean;
    error?: boolean;
    size?: 'sm' | 'md' | 'lg';
    id?: string;
    name?: string;
    /** @deprecated Usa el atributo nativo `aria-describedby`. */
    describedBy?: string;
    /** Ids de ayuda/error que describen el control (lo pone el campo). */
    'aria-describedby'?: string;
    /** Nombre accesible cuando el control va suelto. */
    'aria-label'?: string;
    /** Autocompletado del navegador (`tel`, `off`…). */
    autoComplete?: string;
    required?: boolean;
    readOnly?: boolean;
    onChange?: (value: string | undefined) => void;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    /**
     * aria-label del selector de país. Default: "País" (castellano).
     * Una app multiidioma debe pasarla traducida.
     */
    countryLabel?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown de país (reenviado a
     * `Select.Portal` de Base UI). Por defecto se monta en `document.body`, que
     * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
     * sin configuración adicional. Solo hace falta pasarlo cuando el
     * InputPhone vive dentro de un `.surface-dark` **anidado** (no en la
     * raíz), ya que ese contexto no llega a `document.body` por la cascada.
     */
    container?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
}
/**
 * Campo de teléfono con selector de país. El `ref` va al `<input>` real del
 * número, para que react-hook-form pueda registrarlo y enfocarlo.
 */
export declare const InputPhone: import("react").ForwardRefExoticComponent<InputPhoneProps & import("react").RefAttributes<HTMLInputElement>>;
