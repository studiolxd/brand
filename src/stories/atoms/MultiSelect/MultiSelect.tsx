'use client';

import { forwardRef, useState, useRef } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { Icon } from '../Icon/Icon';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './MultiSelect.css';
import { usePortalContainer } from '../../constants/portal-container';
import { assignRef } from '../../constants/assign-ref';

/**
 * Los dos textos que el control emite por su cuenta: el marcador de sitio sin
 * nada elegido y el nombre del aspa de cada ficha. Los dos son cromo — dicen
 * lo mismo en toda la suite, y el segundo solo interpola la etiqueta de la
 * opción, que es un dato.
 */
export interface MultiSelectMessages {
  /** Marcador de sitio de la caja sin valores elegidos. */
  placeholder: string;
  /** Nombre accesible del aspa de una ficha, con la etiqueta de su opción. */
  remove: (label: string) => string;
}

export interface MultiSelectOption {
  value: string;
  label: string;
  'aria-label'?: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  /**
   * Marcador de sitio sin valores elegidos. **Sin default**: sale de
   * `multiSelect.placeholder` del `BrandMessagesProvider`.
   */
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
  /**
   * Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye).
   * **Va al disparador, que pinta el componente**: el panel sale por un
   * portal y se personaliza con tokens (regla de `className` en componentes
   * con portal, CLAUDE.md § Base UI).
   */
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
  /**
   * aria-label del botón que quita un valor. **Sin default**: sale de
   * `multiSelect.remove` del `BrandMessagesProvider`.
   */
  removeLabel?: (label: string) => string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Base UI `Portal.container`).
   * Por defecto, el nodo de la superficie que llegue por contexto:
   * `SiteShell` publica el suyo, de modo que la capa hereda la talla de la
   * superficie pública en vez de abrirse a la de aplicación. Si no hay
   * superficie, `document.body` — que ya hereda el tema activado en la raíz
   * (`html.dark`/`[data-theme="dark"]`) sin configuración adicional. Pásalo
   * solo para llevar la capa a otro sitio: un `.surface-dark` **anidado**, el
   * cajón de un shell propio. Gana siempre.
   */
  container?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>['container'];
}


/**
 * Selección múltiple sin campo de texto, sobre el `Select` múltiple de Base UI
 * (no sobre su `Combobox`: sin `<input>`, la guía de Base UI manda al
 * `Select`). El teclado es suyo: flechas, Intro y Espacio abren; dentro de la
 * lista las flechas y Inicio/Fin recorren, Intro y Espacio marcan y desmarcan,
 * escribir salta a la opción que empieza por lo tecleado y Escape cierra y
 * devuelve el foco a la caja. La lista **sí recibe el foco** (es una lista de
 * Base UI, no un foco virtual). El `ref` va al elemento con `role="combobox"`,
 * que es lo enfocable, para que react-hook-form pueda enfocarlo al fallar la
 * validación.
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(function MultiSelect({
  options,
  value,
  defaultValue = [],
  placeholder,
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
  removeLabel,
  container,
}: MultiSelectProps, ref) {
  const t = useBrandMessages('multiSelect');
  const portalContainer = usePortalContainer(container);
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  const anchorRef = useRef<HTMLDivElement>(null);
  const comboboxRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const currentValues = value !== undefined ? value : internalValues;

  function commit(next: string[]) {
    if (value === undefined) setInternalValues(next);
    onValueChange?.(next);
  }

  function removeValue(v: string) {
    commit(currentValues.filter(x => x !== v));
  }

  /**
   * El clic en el aire de la caja (fuera de la parte con `role="combobox"`,
   * que ya abre Base UI) también abre y cierra; el aspa de una píldora es un
   * control propio y se deja pasar.
   */
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || readOnly) return;
    if (!(e.target instanceof Element)) return;
    if (e.target.closest('.multi-select__pill-remove')) return;
    if (comboboxRef.current?.contains(e.target)) return;
    e.preventDefault();
    comboboxRef.current?.focus();
    setOpen(!open);
  }

  /**
   * Abrir lleva el foco a la lista, que es parte del control: el aviso de
   * salida (`onBlur`, con el que valida react-hook-form) solo se da cuando el
   * foco deja la caja y la lista a la vez.
   */
  function isInside(node: EventTarget | null) {
    return node instanceof Node
      && (!!comboboxRef.current?.contains(node) || !!popupRef.current?.contains(node));
  }

  function handleBlur(e: React.FocusEvent<HTMLElement>) {
    if (isInside(e.relatedTarget)) return;
    onBlur?.(e as React.FocusEvent<HTMLDivElement>);
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
    <BaseSelect.Root<string, true>
      multiple
      value={currentValues}
      onValueChange={commit}
      open={open}
      onOpenChange={setOpen}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      // Como el resto de desplegables de la familia: la página sigue viva con
      // la lista abierta.
      modal={false}
    >
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
                    aria-label={t('remove', removeLabel)(option.label)}
                    tabIndex={-1}
                    onClick={e => { e.stopPropagation(); removeValue(v); comboboxRef.current?.focus(); }}
                  >
                    <Icon name="close" size="xs" />
                  </button>
                )}
              </span>
            );
          })}
          <BaseSelect.Trigger
            // Base UI tipa la parte como `<button>`; aquí se pinta un `div`.
            ref={(node: HTMLElement | null) => {
              comboboxRef.current = node as HTMLDivElement | null;
              assignRef(ref, node as HTMLDivElement | null);
            }}
            // Un `div` y no un `<button>`: la caja se pinta con las clases del
            // componente, sin los estilos propios de un botón.
            render={<div />}
            nativeButton={false}
            className="multi-select__combobox"
            id={id}
            aria-label={ariaLabelledBy ? undefined : (ariaLabel ?? t('placeholder', placeholder))}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            aria-invalid={error || undefined}
            aria-readonly={readOnly || undefined}
            onBlur={handleBlur}
          >
            {currentValues.length === 0 && (
              <span className="multi-select__placeholder">{t('placeholder', placeholder)}</span>
            )}
          </BaseSelect.Trigger>
        </div>
        <Icon
          name="chevron"
          className="multi-select__icon"
        />
      </div>

      <BaseSelect.Portal container={portalContainer}>
        <BaseSelect.Positioner
          className="multi-select__positioner"
          anchor={anchorRef}
          align="start"
          sideOffset={-1}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup
            ref={popupRef}
            className={contentClass}
            aria-label={ariaLabel ?? placeholder}
            onBlur={handleBlur}
          >
            {options.map(option => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                aria-label={option['aria-label'] ?? option.label}
                className="multi-select__item"
              >
                <span className="multi-select__item-check" aria-hidden="true">
                  <span className="multi-select__item-check-mark" />
                </span>
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
});
