'use client';

import { useState, useRef, useId, useCallback } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { DismissableLayerBranch } from '@radix-ui/react-dismissable-layer';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
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
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Radix
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el
   * AsyncMultiSelect vive dentro de un `.surface-dark` **anidado** (no en
   * la raíz), ya que ese contexto no llega a `document.body` por la
   * cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof RadixPopover.Portal>['container'];
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
  size = 'md',
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  container,
}: AsyncMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AsyncMultiSelectOption[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const itemIdPrefix = useId();

  const currentValues = value !== undefined ? value : internalValues;

  const itemId = (i: number) => `${itemIdPrefix}-opt-${i}`;

  const runSearch = useCallback(async (q: string) => {
    setLoading(true);
    setHasSearched(false);
    try {
      const opts = await onSearch(q);
      setResults(opts);
      setActiveIndex(-1); // reset active index when results change
    } catch {
      setResults([]);
      setActiveIndex(-1);
    } finally {
      setLoading(false);
      setHasSearched(true);
    }
  }, [onSearch]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    if (!open) setOpen(true);
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

  function toggleValue(v: string) {
    const next = currentValues.includes(v)
      ? currentValues.filter(x => x !== v)
      : [...currentValues, v];
    if (value === undefined) setInternalValues(next);
    onValueChange?.(next);
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
      toggleValue(results[activeIndex].value);
      inputRef.current?.focus();
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      setActiveIndex(-1);
    } else if (e.key === 'Tab') {
      setOpen(false);
      setActiveIndex(-1);
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
  ].filter(Boolean).join(' ');

  return (
    <RadixPopover.Root open={open} modal={false} onOpenChange={() => {}}>
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
                    <Icon name="close" size="xs" />
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
              onPointerDown={handleInputPointerDown}
              onKeyDown={handleKeyDown}
              placeholder={currentValues.length === 0 ? placeholder : undefined}
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
          </div>
          {loading && <Spinner size="sm" aria-hidden />}
        </div>
      </RadixPopover.Anchor>

      <RadixPopover.Portal container={container}>
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
          >
            {loading && (
              <div className="async-multi-select__loading">
                <Spinner size="sm" label="Buscando…" />
              </div>
            )}
            {!loading && hasSearched && results.length === 0 && (
              <div className="async-multi-select__empty">Sin resultados</div>
            )}
            {!loading && results.map((option, index) => {
              const isSelected = currentValues.includes(option.value);
              const isActive = activeIndex === index;
              return (
                <div
                  key={option.value}
                  id={itemId(index)}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'async-multi-select__item',
                    isSelected ? 'async-multi-select__item--selected' : '',
                    isActive ? 'async-multi-select__item--active' : '',
                  ].filter(Boolean).join(' ')}
                  onPointerDown={e => e.preventDefault()}
                  onClick={() => { toggleValue(option.value); inputRef.current?.focus(); }}
                >
                  <span className="async-multi-select__item-check" aria-hidden="true">
                    <span className="async-multi-select__item-check-mark" />
                  </span>
                  <span>{option.label}</span>
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
