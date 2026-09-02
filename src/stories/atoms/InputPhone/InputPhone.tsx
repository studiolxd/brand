import { forwardRef, useMemo, type Ref } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
// `getCountryCallingCode` se toma de `react-phone-number-input`, que lo
// reexporta ya atado a sus metadatos: una sola librería en el componente y
// ninguna posibilidad de cargar dos tablas de países distintas.
import PhoneInputLib, { getCountryCallingCode } from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import { Icon } from '../Icon/Icon';
import './InputPhone.css';

interface CountrySelectProps {
  value?: Country;
  onChange: (value: Country) => void;
  options: { value: Country | undefined; label: string }[];
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /** Ver `InputPhoneProps.countryLabel`. */
  countryLabel?: string;
  /** Ver `InputPhoneProps.internationalLabel`. */
  internationalLabel?: string;
  /** Ver `InputPhoneProps.container`. */
  container?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
}

function CountrySelect({ value, onChange, options, disabled, size = 'md', countryLabel = 'País', internationalLabel = '🌐', container }: CountrySelectProps) {
  const INTL = '__intl__';
  const toVal = (c: Country | undefined) => c ?? INTL;
  const fromVal = (v: string): Country => (v === INTL ? (undefined as unknown as Country) : (v as Country));
  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';
  const contentClass = [
    'input-phone__country-content',
    size !== 'md' ? `input-phone__country-content--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <BaseSelect.Root
      value={toVal(value)}
      onValueChange={(v) => onChange(fromVal(v as string))}
      disabled={disabled}
    >
      <BaseSelect.Trigger className="input-phone__country" aria-label={countryLabel}>
        <BaseSelect.Value>
          {value ? `+${getCountryCallingCode(value)}` : internationalLabel}
        </BaseSelect.Value>
        <Icon name="chevron" className="input-phone__country-icon" size={chevronSize} />
      </BaseSelect.Trigger>

      <BaseSelect.Portal container={container}>
        <BaseSelect.Positioner
          className="input-phone__country-positioner"
          side="bottom"
          align="start"
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup className={contentClass}>
            {options.map(({ value: code, label }) => (
              <BaseSelect.Item
                key={toVal(code)}
                value={toVal(code)}
                className="input-phone__country-item"
              >
                <BaseSelect.ItemText>{label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
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
   * aria-label del selector de país. Default: "País" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  countryLabel?: string;
  /**
   * Lo que enseña el selector cuando no hay país elegido (número en formato
   * internacional). Default: "🌐". Es contenido visible: una app que no quiera
   * el emoji pasa aquí su propio texto o glifo.
   */
  internationalLabel?: string;
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
export const InputPhone = forwardRef<HTMLInputElement, InputPhoneProps>(function InputPhone({
  value,
  defaultCountry = 'ES',
  placeholder,
  disabled,
  error = false,
  size = 'md',
  id,
  name,
  describedBy,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  autoComplete,
  required,
  readOnly,
  onChange,
  onBlur,
  onFocus,
  countryLabel,
  internationalLabel,
  container,
}: InputPhoneProps, ref) {
  const classes = [
    'input-phone',
    error ? 'input-phone--error' : '',
    size !== 'md' ? `input-phone--${size}` : '',
  ].filter(Boolean).join(' ');

  // `react-phone-number-input` da su `ref` al componente entero, no al input
  // del número: el nuestro se cuela por el `inputComponent` y se fusiona con el
  // que la librería inyecta para poder enfocar.
  const numberInput = useMemo(
    () =>
      forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
        function InputPhoneNumber(props, libRef) {
          return (
            <input
              {...props}
              ref={(node) => { assignRef(libRef, node); assignRef(ref, node); }}
              className="input-phone__number"
            />
          );
        },
      ),
    [ref],
  );

  return (
    <PhoneInputLib
      className={classes}
      value={value}
      defaultCountry={defaultCountry}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      autoComplete={autoComplete}
      id={id}
      name={name}
      inputComponent={numberInput}
      countrySelectComponent={CountrySelect}
      countrySelectProps={{ size, countryLabel, internationalLabel, container }}
      onChange={(v) => onChange?.(v)}
      onBlur={onBlur}
      onFocus={onFocus}
      numberInputProps={{
        'aria-describedby': ariaDescribedBy ?? describedBy,
        'aria-label': ariaLabel,
        'aria-invalid': error || undefined,
      }}
    />
  );
});

function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as React.RefObject<T | null>).current = node;
}
