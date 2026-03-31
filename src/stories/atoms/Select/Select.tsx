import * as RadixSelect from '@radix-ui/react-select';
import { Chevron } from '../Chevron/Chevron';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  /** Etiqueta accesible de la opción. Si no se pasa, usa label. */
  'aria-label'?: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  dark?: boolean;
  onValueChange?: (value: string) => void;
  id?: string;
  /** Etiqueta accesible del trigger. Si no se pasa, usa el placeholder. */
  'aria-label'?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  placeholder = 'Seleccionar…',
  disabled,
  dark,
  onValueChange,
  id,
  'aria-label': ariaLabel,
}: SelectProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      onValueChange={onValueChange}
    >
      <RadixSelect.Trigger className="select" id={id} aria-label={ariaLabel ?? placeholder}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon asChild>
          <Chevron className="select__icon" size="sm" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={['select__content', dark ? 'select__content--dark' : ''].filter(Boolean).join(' ')} position="popper">
          <RadixSelect.Viewport>
            {options.map(({ value: v, label, 'aria-label': optionAriaLabel }) => (
              <RadixSelect.Item key={v} value={v} className="select__item" aria-label={optionAriaLabel}>
                <RadixSelect.ItemText>{label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
