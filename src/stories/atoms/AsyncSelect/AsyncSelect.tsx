'use client';

import { useState, useRef, useId, useCallback, useEffect } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { DismissableLayerBranch } from '@radix-ui/react-dismissable-layer';
import { Close } from '../Close/Close';
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const [internalSelectedOption, setInternalSelectedOption] = useState<AsyncSelectOption | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const itemIdPrefix = useId();

  const currentValue = value !== undefined ? value : internalValue;
  const currentSelectedOption = selectedOption !== undefined ? selectedOption : internalSelectedOption;

  const itemId = (i: number) => `${itemIdPrefix}-opt-${i}`;

  // Reset active index when results change or popover closes
  useEffect(() => { setActiveIndex(-1); }, [results]);

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

  function handleInputPointerDown(e: React.PointerEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    if (open) return;
    e.preventDefault();
    inputRef.current?.focus();
    setActiveIndex(-1);
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setOpen(true);
    void runSearch('');
  }

  function handleSelect(option: AsyncSelectOption) {
    if (value === undefined) {
      setInternalValue(option.value);
      setInternalSelectedOption(option);
    }
    onValueChange?.(option.value, option);
    setOpen(false);
    setActiveIndex(-1);
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
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        void runSearch(query);
      } else {
        setActiveIndex(i => Math.min(i + 1, results.length - 1));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      e.preventDefault();
      handleSelect(results[activeIndex]);
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      setActiveIndex(-1);
    } else if (e.key === 'Tab') {
      setOpen(false);
      setActiveIndex(-1);
    } else if (!open && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setQuery(e.key);
      setOpen(true);
      setResults([]);
      setHasSearched(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => void runSearch(e.key), 300);
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
    <RadixPopover.Root open={open} modal={false} onOpenChange={() => {}}>
      <RadixPopover.Anchor asChild>
        <div ref={anchorRef} className={triggerClass} data-state={open ? 'open' : 'closed'}>
          <input
            ref={inputRef}
            id={id}
            type="text"
            className="async-select__input"
            value={displayValue}
            onChange={handleInputChange}
            onPointerDown={handleInputPointerDown}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            aria-label={ariaLabel ?? placeholder}
            aria-describedby={ariaDescribedby}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={activeIndex >= 0 ? itemId(activeIndex) : undefined}
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
              <Close size="xs" />
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
          onInteractOutside={e => { if (anchorRef.current?.contains(e.target as Node)) return; setOpen(false); }}
        >
          <div
            role="listbox"
            aria-label={ariaLabel ?? placeholder}
            id={listboxId}
          >
            {loading && (
              <div className="async-select__loading" role="status" aria-label="Buscando…">
                <span className="async-select__spinner" aria-hidden="true" />
              </div>
            )}
            {!loading && hasSearched && results.length === 0 && (
              <div className="async-select__empty">Sin resultados</div>
            )}
            {!loading && results.map((option, index) => {
              const isSelected = option.value === currentValue;
              const isActive = activeIndex === index;
              return (
                <div
                  key={option.value}
                  id={itemId(index)}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'async-select__item',
                    isSelected ? 'async-select__item--selected' : '',
                    isActive ? 'async-select__item--active' : '',
                  ].filter(Boolean).join(' ')}
                  onPointerDown={e => e.preventDefault()}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </RadixPopover.Content>
        </DismissableLayerBranch>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
