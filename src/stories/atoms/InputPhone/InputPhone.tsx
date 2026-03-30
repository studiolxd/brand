import * as RadixSelect from '@radix-ui/react-select';
import { getCountryCallingCode } from 'libphonenumber-js';
import PhoneInputLib from 'react-phone-number-input';
import type { Country } from 'react-phone-number-input';
import { Chevron } from '../Chevron/Chevron';
import './InputPhone.css';

interface CountrySelectProps {
  value?: Country;
  onChange: (value: Country) => void;
  options: { value: Country | undefined; label: string }[];
  disabled?: boolean;
  dark?: boolean;
}

function CountrySelect({ value, onChange, options, disabled, dark }: CountrySelectProps) {
  const INTL = '__intl__';
  const toVal = (c: Country | undefined) => c ?? INTL;
  const fromVal = (v: string): Country => (v === INTL ? (undefined as unknown as Country) : (v as Country));

  return (
    <RadixSelect.Root
      value={toVal(value)}
      onValueChange={(v) => onChange(fromVal(v))}
      disabled={disabled}
    >
      <RadixSelect.Trigger className="input-phone__country" aria-label="País">
        <RadixSelect.Value>
          {value ? `+${getCountryCallingCode(value)}` : '🌐'}
        </RadixSelect.Value>
        <RadixSelect.Icon asChild>
          <Chevron className="input-phone__country-icon" size="sm" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={['input-phone__country-content', dark ? 'input-phone__country-content--dark' : ''].filter(Boolean).join(' ')}
          position="popper"
        >
          <RadixSelect.Viewport>
            {options.map(({ value: code, label }) => (
              <RadixSelect.Item
                key={toVal(code)}
                value={toVal(code)}
                className="input-phone__country-item"
              >
                <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

interface InputPhoneProps {
  value?: string;
  defaultCountry?: Country;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  dark?: boolean;
  id?: string;
  name?: string;
  describedBy?: string;
  onChange?: (value: string | undefined) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

export function InputPhone({
  value,
  defaultCountry = 'ES',
  placeholder,
  disabled,
  error = false,
  dark,
  id,
  name,
  describedBy,
  onChange,
  onBlur,
}: InputPhoneProps) {
  const classes = [
    'input-phone',
    error ? 'input-phone--error' : '',
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
      countrySelectProps={{ dark }}
      onChange={(v) => onChange?.(v)}
      onBlur={onBlur}
      numberInputProps={{ 'aria-describedby': describedBy }}
    />
  );
}

const InputPhoneField = ({
  className: _className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input className="input-phone__number" {...props} />
);
InputPhoneField.displayName = 'InputPhoneField';
