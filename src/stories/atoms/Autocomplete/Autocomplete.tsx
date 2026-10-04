'use client';

import { forwardRef, useState, useRef, useId, useEffect, useCallback, type Ref } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { Spinner } from '../Spinner/Spinner';
import './Autocomplete.css';
import { usePortalContainer } from '../../constants/portal-container';

export interface AutocompleteOption {
  /** Identifica la sugerencia: es lo que recibe `onSelect` para saber cuál se eligió. */
  value: string;
  /** El texto de la sugerencia: es lo que se escribe en el campo al elegirla. */
  label: string;
}

export interface AutocompleteProps {
  /**
   * El texto del campo (controlado). **El valor es el texto escrito**, haya o
   * no una sugerencia que coincida: elegir una sugerencia solo lo rellena.
   */
  value?: string;
  /** Texto inicial cuando el campo no está controlado. */
  defaultValue?: string;
  /** Se llama con el texto nuevo, tanto al escribir como al elegir una sugerencia. */
  onValueChange?: (value: string) => void;
  /**
   * Se llama, además de `onValueChange`, cuando el usuario **elige** una
   * sugerencia: sirve para saber cuál fue (su `value`) frente a un texto libre.
   */
  onSelect?: (option: AutocompleteOption) => void;
  /**
   * Sugerencias **síncronas**: una lista fija que el propio control filtra por
   * lo escrito (sin distinguir mayúsculas ni tildes). Es excluyente con
   * `onSearch`.
   */
  options?: AutocompleteOption[];
  /**
   * Sugerencias **asíncronas** (o síncronas, calculadas por el consumidor): se
   * llama con lo escrito, tras `debounceMs`, y devuelve la lista. Si lanza,
   * simplemente no hay sugerencias: el texto escrito sigue valiendo.
   */
  onSearch?: (query: string) => AutocompleteOption[] | Promise<AutocompleteOption[]>;
  /**
   * Milisegundos de rebote entre la última tecla y `onSearch`. Default: 200.
   * A 0 se busca en cada tecla. No afecta a `options`.
   */
  debounceMs?: number;
  /**
   * Caracteres mínimos para sugerir al escribir. Default: 1. La flecha abajo
   * abre la lista aunque no se llegue al mínimo.
   */
  minChars?: number;
  /** Pista dentro del campo. El control no emite más texto por su cuenta. */
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  /** Nombre del campo en el formulario: el propio `<input>` lleva el texto. */
  name?: string;
  /** Marca el estado de error: aplica la clase `autocomplete--error` y `aria-invalid`. */
  error?: boolean;
  /** Campo obligatorio: `required` nativo, porque lo que se envía es el propio texto. */
  required?: boolean;
  maxLength?: number;
  /** Se llama al salir del control (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
  /**
   * Nombre accesible cuando el control va suelto, y de la lista de
   * sugerencias. En un campo lo nombra la etiqueta (`htmlFor`), que este
   * atributo pisaría: no lo pongas ahí.
   */
  'aria-label'?: string;
  'aria-describedby'?: string;
  /**
   * Nodo DOM donde montar el portal de la lista (reenviado a Base UI
   * `Portal.container`). Mismo contrato que `AsyncSelect`: por defecto, el nodo
   * de la superficie que llegue por contexto, o `document.body`.
   */
  container?: React.ComponentPropsWithoutRef<typeof BasePopover.Portal>['container'];
}

function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as React.RefObject<T | null>).current = node;
}

/** Minúsculas y sin tildes: «cafe» encuentra «Café». */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/**
 * Campo de texto con sugerencias. A diferencia de `AsyncSelect`, **no obliga a
 * elegir**: el valor es el texto escrito y una sugerencia es solo una forma de
 * escribirlo más deprisa. Patrón ARIA de combobox con lista (`aria-activedescendant`):
 * el foco no sale nunca del `<input>`. El `ref` va a ese `<input>`.
 */
export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(function Autocomplete({
  value,
  defaultValue = '',
  onValueChange,
  onSelect,
  options,
  onSearch,
  debounceMs = 200,
  minChars = 1,
  placeholder,
  disabled,
  readOnly,
  size = 'md',
  id,
  name,
  error = false,
  required,
  maxLength,
  onBlur,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  container,
}: AutocompleteProps, ref) {
  const portalContainer = usePortalContainer(container);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [wantsOpen, setWantsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AutocompleteOption[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Cada búsqueda lleva número: solo la última manda.
  const requestRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const itemIdPrefix = useId();

  const text = value !== undefined ? value : internalValue;
  // Sin sugerencias no hay lista: no hay «sin resultados» que decir, porque
  // quedarse con lo escrito es una respuesta válida.
  const open = wantsOpen && results.length > 0;
  const itemId = (i: number) => `${itemIdPrefix}-opt-${i}`;

  const suggest = useCallback((query: string) => {
    const requestId = ++requestRef.current;
    if (onSearch) {
      setLoading(true);
      Promise.resolve()
        .then(() => onSearch(query))
        .then(
          (opts) => opts,
          () => [] as AutocompleteOption[],
        )
        .then((opts) => {
          if (requestId !== requestRef.current) return;
          setResults(opts);
          setActiveIndex(-1);
          setLoading(false);
        });
      return;
    }
    const needle = normalize(query);
    setResults((options ?? []).filter(o => normalize(o.label).includes(needle)));
    setActiveIndex(-1);
  }, [onSearch, options]);

  // Al desmontar: se cancela el rebote pendiente y se invalida la búsqueda en vuelo.
  useEffect(() => () => {
    requestRef.current += 1;
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  function schedule(query: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (onSearch && debounceMs > 0) {
      debounceRef.current = setTimeout(() => suggest(query), debounceMs);
    } else {
      suggest(query);
    }
  }

  function close() {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    // Lo que venga de una búsqueda en vuelo ya no interesa.
    requestRef.current += 1;
    setLoading(false);
    setWantsOpen(false);
    setActiveIndex(-1);
  }

  function setText(next: string) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    setText(next);
    if (next.length < minChars) {
      close();
      return;
    }
    setWantsOpen(true);
    schedule(next);
  }

  function pick(option: AutocompleteOption) {
    setText(option.label);
    onSelect?.(option);
    close();
    setResults([]);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled || readOnly) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setWantsOpen(true);
        schedule(text);
      } else {
        setActiveIndex(i => Math.min(i + 1, results.length - 1));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (open) setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      if (open && activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault();
        pick(results[activeIndex]);
      } else if (open) {
        // Sin sugerencia marcada, Enter se queda con lo escrito: cierra la
        // lista y deja que el formulario, si lo hay, se envíe.
        close();
      }
    } else if (e.key === 'Escape') {
      if (open) {
        // Cierra la lista y no un diálogo que la contenga.
        e.preventDefault();
        e.stopPropagation();
        close();
      }
    } else if (e.key === 'Tab') {
      close();
    }
  }

  /**
   * Base UI notifica los cierres (Escape, click fuera). El click que nace en el
   * propio campo no cuenta como «fuera»: sin `Trigger`, el input lo sería.
   */
  function handleOpenChange(next: boolean, details: BasePopover.Root.ChangeEventDetails) {
    if (next) return;
    if (details.reason === 'outside-press') {
      const target = details.event?.target;
      if (target instanceof Node && anchorRef.current?.contains(target)) return;
    }
    close();
  }

  const rootClass = [
    'autocomplete',
    size !== 'md' ? `autocomplete--${size}` : '',
    disabled ? 'autocomplete--disabled' : '',
    error ? 'autocomplete--error' : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  const contentClass = [
    'autocomplete__content',
    size !== 'md' ? `autocomplete__content--${size}` : '',
  ].filter(Boolean).join(' ');

  return (
    <BasePopover.Root open={open} onOpenChange={handleOpenChange}>
      <div ref={anchorRef} className={rootClass} data-popup-open={open || undefined}>
        <input
          ref={(node) => { inputRef.current = node; assignRef(ref, node); }}
          id={id}
          name={name}
          type="text"
          className="autocomplete__input"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={error || undefined}
          aria-expanded={open}
          aria-haspopup="listbox"
          // El listbox vive en un portal que solo existe abierto: cerrado, un
          // `aria-controls` a un id inexistente es una referencia rota.
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={open && activeIndex >= 0 ? itemId(activeIndex) : undefined}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          onBlur={onBlur}
        />
        {loading && <Spinner size="sm" aria-hidden />}
      </div>

      <BasePopover.Portal container={portalContainer}>
        <BasePopover.Positioner
          className="autocomplete__positioner"
          anchor={anchorRef}
          align="start"
          sideOffset={-1}
        >
          <BasePopover.Popup className={contentClass} initialFocus={false} finalFocus={false}>
            <div role="listbox" aria-label={ariaLabel ?? placeholder} id={listboxId}>
              {results.map((option, index) => {
                const isSelected = option.label === text;
                const isActive = activeIndex === index;
                return (
                  <div
                    key={option.value}
                    id={itemId(index)}
                    role="option"
                    aria-selected={isActive}
                    className={[
                      'autocomplete__item',
                      isSelected ? 'autocomplete__item--selected' : '',
                      isActive ? 'autocomplete__item--active' : '',
                    ].filter(Boolean).join(' ')}
                    // El foco se queda en el campo: el puntero no se lo quita.
                    onPointerDown={e => e.preventDefault()}
                    onClick={() => pick(option)}
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
