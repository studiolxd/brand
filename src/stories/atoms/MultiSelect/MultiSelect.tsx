'use client';

import { forwardRef, useState, useRef, useEffect, useId } from 'react';
import { Popover as BasePopover } from '@base-ui-components/react/popover';
import { Icon } from '../Icon/Icon';
import './MultiSelect.css';

export interface MultiSelectOption {
  value: string;
  label: string;
  'aria-label'?: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onValueChange?: (value: string[]) => void;
  id?: string;
  /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
  name?: string;
  /** Marca el estado de error: aplica la clase `multi-select--error` y `aria-invalid`. */
  error?: boolean;
  /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
  /**
   * Nombre accesible cuando el control va suelto. En un campo lo nombra la
   * etiqueta por `aria-labelledby`: no lo pongas ahí.
   */
  'aria-label'?: string;
  /** Id de la etiqueta que nombra el control (lo pone el campo). */
  'aria-labelledby'?: string;
  /** Ids de ayuda/error que describen el control (lo pone el campo). */
  'aria-describedby'?: string;
  /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
  removeLabel?: (label: string) => string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el
   * MultiSelect vive dentro de un `.surface-dark` **anidado** (no en la
   * raíz), ya que ese contexto no llega a `document.body` por la cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}

/**
 * Selección múltiple. El `ref` va al **disparador** (el `div` con
 * `role="combobox"`), para que react-hook-form pueda enfocarlo al fallar la
 * validación.
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(function MultiSelect({
  options,
  value,
  defaultValue = [],
  placeholder = 'Seleccionar…',
  disabled,
  readOnly,
  size = 'md',
  onValueChange,
  id,
  name,
  error = false,
  onBlur,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  removeLabel = (label) => `Quitar ${label}`,
  container,
}: MultiSelectProps, ref) {
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const listboxRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const currentValues = value !== undefined ? value : internalValues;

  function toggleValue(v: string) {
    const next = currentValues.includes(v)
      ? currentValues.filter(x => x !== v)
      : [...currentValues, v];
    if (value === undefined) setInternalValues(next);
    onValueChange?.(next);
  }

  function handleOpenChange(next: boolean) {
    if (disabled || readOnly) return;
    setOpen(next);
    if (next) setFocusedIndex(0);
  }

  useEffect(() => {
    if (!open || !listboxRef.current) return;
    const items = listboxRef.current.querySelectorAll<HTMLElement>('[role="option"]');
    items[focusedIndex]?.focus();
  }, [focusedIndex, open]);

  function handleListboxKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(i => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < options.length) {
        toggleValue(options[focusedIndex].value);
      }
    }
  }

  const triggerClass = [
    'multi-select',
    size !== 'md' ? `multi-select--${size}` : '',
    disabled ? 'multi-select--disabled' : '',
    error ? 'multi-select--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const contentClass = [
    'multi-select__content',
    size !== 'md' ? `multi-select__content--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <BasePopover.Root open={open} onOpenChange={handleOpenChange}>
      <BasePopover.Trigger
        nativeButton={false}
        render={
        <div
          ref={ref}
          className={triggerClass}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? placeholder)}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-invalid={error || undefined}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          id={id}
          onBlur={onBlur}
        >
          <div className="multi-select__values">
            {currentValues.length === 0 ? (
              <span className="multi-select__placeholder">{placeholder}</span>
            ) : (
              currentValues.map(v => {
                const option = options.find(o => o.value === v);
                if (!option) return null;
                return (
                  <span key={v} className="multi-select__pill">
                    <span className="multi-select__pill-label">{option.label}</span>
                    {!disabled && !readOnly && (
                      <button
                        type="button"
                        className="multi-select__pill-remove"
                        aria-label={removeLabel(option.label)}
                        tabIndex={-1}
                        onClick={e => { e.stopPropagation(); toggleValue(v); }}
                      >
                        <Icon name="close" size="xs" />
</button>
                    )}
                  </span>
                );
              })
            )}
          </div>
          <Icon
            name="chevron"
            className="multi-select__icon"
            size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
          />
          {/* Lo que se envía con el formulario: un input oculto por valor. */}
          {name && currentValues.map((v) => (
            <input key={v} type="hidden" name={name} value={v} />
          ))}
        </div>
        }
      />

      <BasePopover.Portal container={container}>
        <BasePopover.Positioner className="multi-select__positioner" align="start" sideOffset={-1}>
          <BasePopover.Popup className={contentClass} initialFocus={false}>
            <div
              ref={listboxRef}
              role="listbox"
              aria-multiselectable="true"
              aria-label={ariaLabel ?? placeholder}
              id={listboxId}
              onKeyDown={handleListboxKeyDown}
            >
              {options.map((option, index) => {
                const isSelected = currentValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-label={option['aria-label'] ?? option.label}
                    className={['multi-select__item', isSelected ? 'multi-select__item--selected' : ''].filter(Boolean).join(' ')}
                    tabIndex={index === focusedIndex ? 0 : -1}
                    onClick={() => toggleValue(option.value)}
                    onFocus={() => setFocusedIndex(index)}
                  >
                    <span className="multi-select__item-check" aria-hidden="true">
                      <span className="multi-select__item-check-mark" />
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
});
