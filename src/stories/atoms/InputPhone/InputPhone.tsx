import { Select as BaseSelect } from '@base-ui-components/react/select';
import { getCountryCallingCode } from 'libphonenumber-js';
import PhoneInputLib from 'react-phone-number-input';
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
  /** Ver `InputPhoneProps.container`. */
  container?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
}

function CountrySelect({ value, onChange, options, disabled, size = 'md', countryLabel = 'País', container }: CountrySelectProps) {
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
          {value ? `+${getCountryCallingCode(value)}` : '🌐'}
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

export function InputPhone({
  value,
  defaultCountry = 'ES',
  placeholder,
  disabled,
  error = false,
  size = 'md',
  id,
  name,
  describedBy,
  onChange,
  onBlur,
  countryLabel,
  container,
}: InputPhoneProps) {
  const classes = [
    'input-phone',
    error ? 'input-phone--error' : '',
    size !== 'md' ? `input-phone--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <PhoneInputLib
      className={classes}
      value={value}
      defaultCountry={defaultCountry}
      placeholder={placeholder}
      disabled={disabled}
      id={id}
      name={name}
      inputComponent={InputPhoneField}
      countrySelectComponent={CountrySelect}
      countrySelectProps={{ size, countryLabel, container }}
      onChange={(v) => onChange?.(v)}
      onBlur={onBlur}
      numberInputProps={{ 'aria-describedby': describedBy }}
    />
  );
}

const InputPhoneField = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className="input-phone__number" />
);
InputPhoneField.displayName = 'InputPhoneField';
