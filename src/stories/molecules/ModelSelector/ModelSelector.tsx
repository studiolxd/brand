import { Select } from '../../atoms/Select/Select';
import type { SelectOption } from '../../atoms/Select/Select';
import './ModelSelector.css';

export interface ModelSelectorProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
}

export function ModelSelector({ options, value, onValueChange, disabled, id }: ModelSelectorProps) {
  return (
    <div className="model-selector">
      <Select
        options={options}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        size="sm"
        id={id}
        aria-label="Modelo"
      />
    </div>
  );
}
