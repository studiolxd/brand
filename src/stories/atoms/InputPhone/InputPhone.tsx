import * as RadixSelect from '@radix-ui/react-select';
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
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function CountrySelect({ value, onChange, options, disabled, dark, size = 'md' }: CountrySelectProps) {
  const INTL = '__intl__';
  const toVal = (c: Country | undefined) => c ?? INTL;
  const fromVal = (v: string): Country => (v === INTL ? (undefined as unknown as Country) : (v as Country));
  const chevronSize = size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm';
  const contentClass = [
    'input-phone__country-content',
    size !== 'md' ? `input-phone__country-content--${size}` : '',
    dark ? 'input-phone__country-content--dark' : '',
  ].filter(Boolean).join(' ');

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
          <Icon name="chevron" className="input-phone__country-icon" size={chevronSize} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={contentClass}
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
  size?: 'sm' | 'md' | 'lg';
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
  size = 'md',
  id,
  name,
  describedBy,
  onChange,
  onBlur,
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
      countrySelectProps={{ dark, size }}
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
