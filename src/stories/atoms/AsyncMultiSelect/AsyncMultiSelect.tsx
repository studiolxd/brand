'use client';

import { forwardRef, useState, useRef, useId, useCallback, type Ref } from 'react';
import { Popover as BasePopover } from '@base-ui-components/react/popover';
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
  /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
  name?: string;
  /** Marca el estado de error: aplica la clase `async-multi-select--error` y `aria-invalid`. */
  error?: boolean;
  /** Se llama al salir del control (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
  /**
   * Nombre accesible cuando el control va suelto. En un campo lo nombra la
   * etiqueta (`htmlFor`), que este atributo pisaría: no lo pongas ahí.
   */
  'aria-label'?: string;
  'aria-describedby'?: string;
  /** aria-label del botón que quita un valor. Default: `Quitar ${etiqueta}` (castellano). */
  removeLabel?: (label: string) => string;
  /**
   * Texto mostrado cuando la búsqueda no devuelve opciones. Default: "Sin resultados"
   * (castellano). Es texto **visible**: una app multiidioma debe pasarlo traducido.
   */
  emptyMessage?: string;
  /**
   * Etiqueta accesible del spinner mientras se busca. Default: "Buscando…" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  loadingLabel?: string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el
   * AsyncMultiSelect vive dentro de un `.surface-dark` **anidado** (no en
   * la raíz), ya que ese contexto no llega a `document.body` por la
   * cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}

function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as React.RefObject<T | null>).current = node;
}

/**
 * Búsqueda con resultados asíncronos y varios valores. El `ref` va al
 * `<input>` de búsqueda, que es lo que se enfoca.
 */
export const AsyncMultiSelect = forwardRef<HTMLInputElement, AsyncMultiSelectProps>(function AsyncMultiSelect({
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
  name,
  error = false,
  onBlur,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  removeLabel = (label) => `Quitar ${label}`,
  emptyMessage = 'Sin resultados',
  loadingLabel = 'Buscando…',
  container,
}: AsyncMultiSelectProps, ref) {
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

  /**
   * Base UI notifica los cierres (Escape, click fuera). Se ignora el click
   * fuera cuando nace dentro del propio control: sin `Trigger`, el input y
   * las píldoras cuentan como "fuera" para el gestor de dismissal.
   */
  function handleOpenChange(next: boolean, details: BasePopover.Root.ChangeEventDetails) {
    if (next) return;
    if (details.reason === 'outside-press') {
      const target = details.event?.target;
      if (target instanceof Node && anchorRef.current?.contains(target)) return;
    }
    setOpen(false);
    setQuery('');
    setActiveIndex(-1);
  }

  const triggerClass = [
    'async-multi-select',
    size !== 'md' ? `async-multi-select--${size}` : '',
    disabled ? 'async-multi-select--disabled' : '',
    open ? 'async-multi-select--open' : '',
    error ? 'async-multi-select--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const contentClass = [
    'async-multi-select__content',
    size !== 'md' ? `async-multi-select__content--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <BasePopover.Root open={open} onOpenChange={handleOpenChange}>
      <div ref={anchorRef} className={triggerClass} data-popup-open={open || undefined}>
        <div className="async-multi-select__input-area">
          {selectedOptions.map(opt => (
            <span key={opt.value} className="async-multi-select__pill">
              <span className="async-multi-select__pill-label">{opt.label}</span>
              {!disabled && !readOnly && (
                <button
                  type="button"
                  className="async-multi-select__pill-remove"
                  aria-label={removeLabel(opt.label)}
                  tabIndex={-1}
                  onMouseDown={e => { e.preventDefault(); toggleValue(opt.value); }}
                >
                  <Icon name="close" size="xs" />
                </button>
              )}
            </span>
          ))}
          <input
            ref={(node) => { inputRef.current = node; assignRef(ref, node); }}
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
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-invalid={error || undefined}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={activeIndex >= 0 ? itemId(activeIndex) : undefined}
            autoComplete="off"
            role="combobox"
            onBlur={onBlur}
          />
          {/* Lo que se envía con el formulario: un input oculto por valor. */}
          {name && currentValues.map((v) => (
            <input key={v} type="hidden" name={name} value={v} />
          ))}
        </div>
        {loading && <Spinner size="sm" aria-hidden />}
      </div>

      <BasePopover.Portal container={container}>
        <BasePopover.Positioner
          className="async-multi-select__positioner"
          anchor={anchorRef}
          align="start"
          sideOffset={-1}
        >
          <BasePopover.Popup className={contentClass} initialFocus={false} finalFocus={false}>
            <div
              role="listbox"
              aria-multiselectable="true"
              aria-label={ariaLabel ?? placeholder}
              id={listboxId}
            >
              {loading && (
                <div className="async-multi-select__loading">
                  <Spinner size="sm" label={loadingLabel} />
                </div>
              )}
              {!loading && hasSearched && results.length === 0 && (
                <div className="async-multi-select__empty">{emptyMessage}</div>
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
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
});
