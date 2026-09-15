import { Select as BaseSelect } from '@base-ui/react/select';
import type { Country } from 'react-phone-number-input';
import './InputPhone.css';
/**
 * El único texto que el campo emite por su cuenta: el nombre accesible del
 * selector de país. Los **nombres de los países** no están aquí: los resuelve
 * `Intl` desde el `locale`, como los meses y las fechas.
 */
export interface InputPhoneMessages {
    /** Nombre accesible del selector de prefijo/país. */
    country: string;
}
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
     * aria-label del selector de país. **Sin default**: sale de
     * `inputPhone.country` del `BrandMessagesProvider`.
     */
    countryLabel?: string;
    /**
     * Lo que enseña el selector cuando no hay país elegido (número en formato
     * internacional). Default: "🌐". **No pasa por el catálogo de textos a
     * propósito**: un glifo no se traduce, dice lo mismo en los seis idiomas y
     * meterlo en el catálogo obligaría a repetirlo seis veces. Una app que no
     * quiera el emoji pasa aquí su propio texto o glifo.
     */
    internationalLabel?: string;
    /**
     * Nodo DOM donde montar el portal del dropdown de país (reenviado a
     * `Select.Portal` de Base UI).
     * Por defecto, el nodo de la superficie que llegue por contexto:
     * `SiteShell` publica el suyo, de modo que la capa hereda la talla de la
     * superficie pública en vez de abrirse a la de aplicación. Si no hay
     * superficie, `document.body` — que ya hereda el tema activado en la raíz
     * (`html.dark`/`[data-theme="dark"]`) sin configuración adicional. Pásalo
     * solo para llevar la capa a otro sitio: un `.surface-dark` **anidado**, el
     * cajón de un shell propio. Gana siempre.
     */
    container?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
}
/**
 * Campo de teléfono con selector de país. El `ref` va al `<input>` real del
 * número, para que react-hook-form pueda registrarlo y enfocarlo.
 */
export declare const InputPhone: import("react").ForwardRefExoticComponent<InputPhoneProps & import("react").RefAttributes<HTMLInputElement>>;
