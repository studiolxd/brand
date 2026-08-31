'use client';

import { forwardRef, useState, useRef, useEffect, useId, type Ref } from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
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

function assignRef<T>(target: Ref<T> | undefined, node: T | null): void {
  if (typeof target === 'function') target(node);
  else if (target) (target as React.RefObject<T | null>).current = node;
}

/** Milisegundos que se acumulan las teclas del salto por letra antes de reiniciar. */
const TYPEAHEAD_RESET_MS = 500;

/**
 * Selección múltiple. El `ref` va al elemento con `role="combobox"`, que es lo
 * enfocable, para que react-hook-form pueda enfocarlo al fallar la validación.
 *
 * Teclado del patrón combobox (el mismo que `AsyncSelect`): flechas abren y
 * recorren, Inicio/Fin saltan a los extremos, Intro/Espacio marcan y desmarcan,
 * Escape cierra y escribir una letra salta a la opción que empieza por ella. El
 * foco del DOM no se mueve nunca de la caja: la opción activa se señala con
 * `aria-activedescendant`.
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const anchorRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const itemIdPrefix = useId();
  // Salto por letra: lo que se lleva escrito y cuándo se escribió la última.
  const typedRef = useRef('');
  const typedAtRef = useRef(0);

  const currentValues = value !== undefined ? value : internalValues;

  const itemId = (i: number) => `${itemIdPrefix}-opt-${i}`;

  function toggleValue(v: string) {
    const next = currentValues.includes(v)
      ? currentValues.filter(x => x !== v)
      : [...currentValues, v];
    if (value === undefined) setInternalValues(next);
    onValueChange?.(next);
  }

  function openAt(index: number) {
    if (disabled || readOnly) return;
    setOpen(true);
    setActiveIndex(options.length === 0 ? -1 : index);
  }

  function close() {
    setOpen(false);
    setActiveIndex(-1);
    typedRef.current = '';
  }

  /**
   * Base UI notifica los cierres (Escape, clic fuera). Se ignora el clic fuera
   * nacido dentro del propio control: sin `Trigger`, la caja cuenta como
   * "fuera" para el gestor de dismissal.
   */
  function handleOpenChange(next: boolean, details: BasePopover.Root.ChangeEventDetails) {
    if (next) return;
    if (details.reason === 'outside-press') {
      const target = details.event?.target;
      if (target instanceof Node && anchorRef.current?.contains(target)) return;
    }
    close();
  }

  /** Salta a la primera opción que empieza por lo tecleado, dando la vuelta. */
  function typeahead(char: string) {
    if (options.length === 0) return;
    const now = Date.now();
    const typed = now - typedAtRef.current > TYPEAHEAD_RESET_MS ? char : typedRef.current + char;
    typedRef.current = typed;
    typedAtRef.current = now;
    // Con una sola letra se recorren las coincidencias una a una; con varias se
    // busca desde la activa, que puede seguir valiendo para el prefijo largo.
    const from = typed.length === 1 ? activeIndex + 1 : Math.max(activeIndex, 0);
    const needle = typed.toLowerCase();
    for (let step = 0; step < options.length; step++) {
      const index = (from + step) % options.length;
      if (options[index].label.toLowerCase().startsWith(needle)) {
        setActiveIndex(index);
        if (!open) setOpen(true);
        return;
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled || readOnly) return;
    const last = options.length - 1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) openAt(0);
      else setActiveIndex(i => Math.min(i + 1, last));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) openAt(last);
      else setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      if (!open) openAt(0);
      else setActiveIndex(options.length === 0 ? -1 : 0);
    } else if (e.key === 'End') {
      e.preventDefault();
      if (!open) openAt(last);
      else setActiveIndex(last);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) openAt(0);
      else if (activeIndex >= 0 && activeIndex < options.length) toggleValue(options[activeIndex].value);
    } else if (e.key === 'Escape') {
      if (!open) return;
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      if (open) close();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      typeahead(e.key);
    }
  }

  /**
   * El clic en cualquier punto de la caja abre y cierra; el aspa de una píldora
   * es un control propio y se deja pasar. Se enfoca siempre la caja: el foco no
   * viaja al panel, que la opción activa la marca `aria-activedescendant`.
   */
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || readOnly) return;
    if (e.target instanceof Element && e.target.closest('.multi-select__pill-remove')) return;
    e.preventDefault();
    comboboxRef.current?.focus();
    if (open) close();
    else openAt(0);
  }

  // La opción activa no tiene el foco del DOM: hay que traerla a la vista a mano.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    document.getElementById(itemId(activeIndex))?.scrollIntoView({ block: 'nearest' });
    // `itemId` se deriva de `itemIdPrefix`, estable durante toda la vida del componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeIndex, itemIdPrefix]);

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
      <div
        ref={anchorRef}
        className={triggerClass}
        data-popup-open={open || undefined}
        onPointerDown={handlePointerDown}
      >
        <div className="multi-select__values">
          {/* Las píldoras y sus aspas viven FUERA del `role="combobox"`: un
              combobox no admite controles dentro, y un botón anidado ahí no lo
              anuncia ningún lector. */}
          {currentValues.map(v => {
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
                    onClick={e => { e.stopPropagation(); toggleValue(v); comboboxRef.current?.focus(); }}
                  >
                    <Icon name="close" size="xs" />
                  </button>
                )}
              </span>
            );
          })}
          <div
            ref={(node) => { comboboxRef.current = node; assignRef(ref, node); }}
            className="multi-select__combobox"
            tabIndex={disabled ? -1 : 0}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="listbox"
            // El listbox vive en un portal que solo existe abierto: cerrado, un
            // `aria-controls` a un id inexistente es una referencia rota.
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={open && activeIndex >= 0 ? itemId(activeIndex) : undefined}
            aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? placeholder)}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={error || undefined}
            aria-disabled={disabled || undefined}
            aria-readonly={readOnly || undefined}
            id={id}
            onKeyDown={handleKeyDown}
            onBlur={onBlur}
          >
            {currentValues.length === 0 && (
              <span className="multi-select__placeholder">{placeholder}</span>
            )}
          </div>
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

      <BasePopover.Portal container={container}>
        <BasePopover.Positioner
          className="multi-select__positioner"
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
              {options.map((option, index) => {
                const isSelected = currentValues.includes(option.value);
                const isActive = activeIndex === index;
                return (
                  <div
                    key={option.value}
                    id={itemId(index)}
                    role="option"
                    aria-selected={isSelected}
                    aria-label={option['aria-label'] ?? option.label}
                    className={[
                      'multi-select__item',
                      isSelected ? 'multi-select__item--selected' : '',
                      isActive ? 'multi-select__item--active' : '',
                    ].filter(Boolean).join(' ')}
                    onPointerDown={e => { e.preventDefault(); e.stopPropagation(); }}
                    onClick={() => { toggleValue(option.value); setActiveIndex(index); comboboxRef.current?.focus(); }}
                  >
                    <span className="multi-select__item-check" aria-hidden="true">
                      <span className="multi-select__item-check-mark" />
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
