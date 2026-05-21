'use client';

import { useState, useRef, useId, useCallback } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { DismissableLayerBranch } from '@radix-ui/react-dismissable-layer';
import './AsyncMultiSelect.css';

export interface AsyncMultiSelectOption {
  value: string;
  label: string;
}

export interface AsyncMultiSelectProps {
  onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Labels for the currently selected values — the parent is responsible for providing these */
  selectedOptions?: AsyncMultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export function AsyncMultiSelect({
  onSearch,
  value,
  defaultValue = [],
  onValueChange,
  selectedOptions = [],
  placeholder = 'Buscar…',
  disabled,
  readOnly,
  dark,
  size = 'md',
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}: AsyncMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AsyncMultiSelectOption[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  const currentValues = value !== undefined ? value : internalValues;

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

  function toggleValue(v: string) {
    const next = currentValues.includes(v)
      ? currentValues.filter(x => x !== v)
      : [...currentValues, v];
    if (value === undefined) setInternalValues(next);
    onValueChange?.(next);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    } else if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      const first = document.getElementById(listboxId)?.querySelector<HTMLElement>('[role="option"]');
      first?.focus();
    } else if (e.key === 'Backspace' && query === '' && currentValues.length > 0) {
      const last = currentValues[currentValues.length - 1];
      toggleValue(last);
    }
  }

  const triggerClass = [
    'async-multi-select',
    size !== 'md' ? `async-multi-select--${size}` : '',
    disabled ? 'async-multi-select--disabled' : '',
    open ? 'async-multi-select--open' : '',
  ].filter(Boolean).join(' ');

  const contentClass = [
    'async-multi-select__content',
    size !== 'md' ? `async-multi-select__content--${size}` : '',
    dark ? 'async-multi-select__content--dark' : '',
  ].filter(Boolean).join(' ');

  return (
    <RadixPopover.Root open={open} modal={false} onOpenChange={next => { if (!next) setOpen(false); }}>
      <RadixPopover.Anchor asChild>
        <div ref={anchorRef} className={triggerClass} data-state={open ? 'open' : 'closed'}>
          <div className="async-multi-select__input-area">
            {selectedOptions.map(opt => (
              <span key={opt.value} className="async-multi-select__pill">
                <span className="async-multi-select__pill-label">{opt.label}</span>
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    className="async-multi-select__pill-remove"
                    aria-label={`Quitar ${opt.label}`}
                    tabIndex={-1}
                    onMouseDown={e => { e.preventDefault(); toggleValue(opt.value); }}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
            <input
              ref={inputRef}
              id={id}
              type="text"
              className="async-multi-select__input"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              placeholder={currentValues.length === 0 ? placeholder : undefined}
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
          </div>
          {loading && <span className="async-multi-select__spinner" aria-hidden="true" />}
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
            aria-multiselectable="true"
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
              <div className="async-multi-select__loading" role="status" aria-label="Buscando…">
                <span className="async-multi-select__spinner" aria-hidden="true" />
              </div>
            )}
            {!loading && hasSearched && results.length === 0 && (
              <div className="async-multi-select__empty">Sin resultados</div>
            )}
            {!loading && results.map((option, index) => {
              const isSelected = currentValues.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={['async-multi-select__item', isSelected ? 'async-multi-select__item--selected' : ''].filter(Boolean).join(' ')}
                  tabIndex={index === 0 ? 0 : -1}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => { toggleValue(option.value); inputRef.current?.focus(); }}
                >
                  <span className="async-multi-select__item-check" aria-hidden="true">
                    <span className="async-multi-select__item-check-mark" />
                  </span>
                  <span>{option.label}</span>
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
