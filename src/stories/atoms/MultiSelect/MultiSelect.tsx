'use client';

import { useState, useRef, useEffect, useId } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
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
  'aria-label'?: string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Radix
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el
   * MultiSelect vive dentro de un `.surface-dark` **anidado** (no en la
   * raíz), ya que ese contexto no llega a `document.body` por la cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof RadixPopover.Portal>['container'];
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  placeholder = 'Seleccionar…',
  disabled,
  readOnly,
  size = 'md',
  onValueChange,
  id,
  'aria-label': ariaLabel,
  container,
}: MultiSelectProps) {
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
  ].filter(Boolean).join(' ');

  const contentClass = [
    'multi-select__content',
    size !== 'md' ? `multi-select__content--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <RadixPopover.Root open={open} onOpenChange={handleOpenChange}>
      <RadixPopover.Trigger asChild>
        <div
          className={triggerClass}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-label={ariaLabel ?? placeholder}
          aria-disabled={disabled || undefined}
          aria-readonly={readOnly || undefined}
          id={id}
          data-state={open ? 'open' : 'closed'}
          onKeyDown={e => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleOpenChange(!open);
            }
          }}
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
                        aria-label={`Quitar ${option.label}`}
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
        </div>
      </RadixPopover.Trigger>

      <RadixPopover.Portal container={container}>
        <RadixPopover.Content
          className={contentClass}
          align="start"
          sideOffset={-1}
          onOpenAutoFocus={e => e.preventDefault()}
        >
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
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
