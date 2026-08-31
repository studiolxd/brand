'use client';

import { forwardRef, useState, useRef, useId, useCallback, type Ref } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
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
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
  name?: string;
  /** Marca el estado de error: aplica la clase `async-select--error` y `aria-invalid`. */
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
   * aria-label del botón de limpiar selección. Default: "Limpiar selección" (castellano).
   * Una app multiidioma debe pasarla traducida.
   */
  clearLabel?: string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI
   * `Portal.container`). Por defecto se monta en `document.body`, que
   * hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasarlo cuando el
   * AsyncSelect vive dentro de un `.surface-dark` **anidado** (no en la
   * raíz), ya que ese contexto no llega a `document.body` por la cascada.
   */
  container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}

function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as React.RefObject<T | null>).current = node;
}

/**
 * Búsqueda con resultados asíncronos y un solo valor. El `ref` va al `<input>`
 * de búsqueda, que es lo que se enfoca.
 */
export const AsyncSelect = forwardRef<HTMLInputElement, AsyncSelectProps>(function AsyncSelect({
  onSearch,
  value,
  onValueChange,
  selectedOption,
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
  emptyMessage = 'Sin resultados',
  loadingLabel = 'Buscando…',
  clearLabel = 'Limpiar selección',
  container,
}: AsyncSelectProps, ref) {
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

  /**
   * Base UI notifica los cierres (Escape, click fuera). Se ignora el click
   * fuera cuando nace dentro del propio control: sin `Trigger`, el input
   * cuenta como "fuera" para el gestor de dismissal.
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

  const displayValue = open ? query : (currentSelectedOption?.label ?? '');

  const triggerClass = [
    'async-select',
    size !== 'md' ? `async-select--${size}` : '',
    disabled ? 'async-select--disabled' : '',
    error ? 'async-select--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const contentClass = [
    'async-select__content',
    size !== 'md' ? `async-select__content--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <BasePopover.Root open={open} onOpenChange={handleOpenChange}>
      <div ref={anchorRef} className={triggerClass} data-popup-open={open || undefined}>
        <input
          ref={(node) => { inputRef.current = node; assignRef(ref, node); }}
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
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={error || undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          // El listbox vive en un portal que solo existe abierto: cerrado, un
          // `aria-controls` a un id inexistente es una referencia rota.
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={activeIndex >= 0 ? itemId(activeIndex) : undefined}
          autoComplete="off"
          role="combobox"
          onBlur={onBlur}
        />
        {/* Lo que se envía con el formulario. */}
        {name && <input type="hidden" name={name} value={currentValue ?? ''} />}
        {loading && <Spinner size="sm" aria-hidden />}
        {!loading && currentValue && !disabled && !readOnly && (
          <button
            type="button"
            className="async-select__clear"
            aria-label={clearLabel}
            tabIndex={-1}
            onMouseDown={handleClear}
          >
            <Icon name="close" size="xs" />
          </button>
        )}
      </div>

      <BasePopover.Portal container={container}>
        <BasePopover.Positioner
          className="async-select__positioner"
          anchor={anchorRef}
          align="start"
          sideOffset={-1}
        >
          <BasePopover.Popup className={contentClass} initialFocus={false} finalFocus={false}>
            <div
              role="listbox"
              aria-label={ariaLabel ?? placeholder}
              id={listboxId}
            >
              {loading && (
                <div className="async-select__loading">
                  <Spinner size="sm" label={loadingLabel} />
                </div>
              )}
              {!loading && hasSearched && results.length === 0 && (
                <div className="async-select__empty">{emptyMessage}</div>
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
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
});
