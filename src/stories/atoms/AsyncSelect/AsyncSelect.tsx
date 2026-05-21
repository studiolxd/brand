'use client';

import { useState, useRef, useId, useCallback } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { DismissableLayerBranch } from '@radix-ui/react-dismissable-layer';
import './AsyncSelect.css';

export interface AsyncSelectOption {
  value: string;
  label: string;
}

export interface AsyncSelectProps {
  onSearch: (query: string) => Promise<AsyncSelectOption[]>;
  value?: string | null;
  onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
  /** Label of the currently selected option — required when `value` is set so the component can display it */
  selectedOption?: AsyncSelectOption | null;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function AsyncSelect({
  onSearch,
  value,
  onValueChange,
  selectedOption,
  placeholder = 'Buscar…',
  disabled,
  readOnly,
  dark,
  size = 'md',
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: AsyncSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AsyncSelectOption[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const [internalSelectedOption, setInternalSelectedOption] = useState<AsyncSelectOption | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const currentValue = value !== undefined ? value : internalValue;
  const currentSelectedOption = selectedOption !== undefined ? selectedOption : internalSelectedOption;

  const runSearch = useCallback(async (q: string) => {
    setLoading(true);
    setHasSearched(false);
    try {
      const opts = await onSearch(q);
      setResults(opts);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }, [onSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => void runSearch(q), 300);
  }

  function handleInputFocus() {
    if (disabled || readOnly) return;
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setOpen(true);
    void runSearch('');
  }

  function handleInputBlur() {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      const inInput = inputRef.current === active;
      const inPopover = document.getElementById(listboxId)?.contains(active);
      if (!inInput && !inPopover) setOpen(false);
    });
  }

  function handleSelect(option: AsyncSelectOption) {
    if (value === undefined) {
      setInternalValue(option.value);
      setInternalSelectedOption(option);
    }
    onValueChange?.(option.value, option);
    setOpen(false);
    setQuery('');
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    if (value === undefined) {
      setInternalValue(null);
      setInternalSelectedOption(null);
    }
    onValueChange?.(null, null);
    setQuery('');
    setResults([]);
    setHasSearched(false);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      const first = document.getElementById(listboxId)?.querySelector<HTMLElement>('[role="option"]');
      first?.focus();
    }
  }

  const displayValue = open ? query : (currentSelectedOption?.label ?? '');

  const triggerClass = [
    'async-select',
    size !== 'md' ? `async-select--${size}` : '',
    disabled ? 'async-select--disabled' : '',
  ].filter(Boolean).join(' ');

  const contentClass = [
    'async-select__content',
    size !== 'md' ? `async-select__content--${size}` : '',
    dark ? 'async-select__content--dark' : '',
  ].filter(Boolean).join(' ');

  return (
    <RadixPopover.Root open={open} modal={false} onOpenChange={next => { if (!next) setOpen(false); }}>
      <RadixPopover.Anchor asChild>
        <div className={triggerClass} data-state={open ? 'open' : 'closed'}>
          <input
            ref={inputRef}
            id={id}
            type="text"
            className="async-select__input"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-label={ariaLabel ?? placeholder}
            aria-describedby={ariaDescribedby}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            autoComplete="off"
            role="combobox"
          />
          {loading && <span className="async-select__spinner" aria-hidden="true" />}
          {!loading && currentValue && !disabled && !readOnly && (
            <button
              type="button"
              className="async-select__clear"
              aria-label="Limpiar selección"
              tabIndex={-1}
              onMouseDown={handleClear}
            >
              ×
            </button>
          )}
        </div>
      </RadixPopover.Anchor>

      <RadixPopover.Portal>
        <DismissableLayerBranch>
        <RadixPopover.Content
          className={contentClass}
          align="start"
          sideOffset={-1}
          onOpenAutoFocus={e => e.preventDefault()}
          onInteractOutside={() => setOpen(false)}
        >
          <div
            role="listbox"
            aria-label={ariaLabel ?? placeholder}
            id={listboxId}
            onKeyDown={e => {
              const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'));
              const idx = items.indexOf(document.activeElement as HTMLElement);
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                items[Math.min(idx + 1, items.length - 1)]?.focus();
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (idx <= 0) inputRef.current?.focus();
                else items[idx - 1]?.focus();
              } else if (e.key === 'Escape') {
                setOpen(false);
                inputRef.current?.focus();
              }
            }}
          >
            {loading && (
              <div className="async-select__loading" role="status" aria-label="Buscando…">
                <span className="async-select__spinner" aria-hidden="true" />
              </div>
            )}
            {!loading && hasSearched && results.length === 0 && (
              <div className="async-select__empty">Sin resultados</div>
            )}
            {!loading && results.map(option => {
              const isSelected = option.value === currentValue;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={['async-select__item', isSelected ? 'async-select__item--selected' : ''].filter(Boolean).join(' ')}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </RadixPopover.Content>
        </DismissableLayerBranch>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
