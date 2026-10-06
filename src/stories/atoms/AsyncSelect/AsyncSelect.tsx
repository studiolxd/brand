'use client';

import { forwardRef, useState } from 'react';
import { Combobox } from '@base-ui/react/combobox';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { useAsyncOptions } from '../_shared/useAsyncOptions';
import './AsyncSelect.css';
import { usePortalContainer } from '../../constants/portal-container';

export interface AsyncSelectOption {
  value: string;
  label: string;
}

/**
 * Los textos que el control emite por su cuenta. Todos son cromo: dicen lo
 * mismo en toda la suite y no hablan de lo que se busca. Lo que sí es de esta
 * pantalla —las opciones que devuelve `onSearch`— no pasa por aquí.
 */
export interface AsyncSelectMessages {
  /** Pista dentro del campo de búsqueda. */
  placeholder: string;
  /** Aviso cuando la búsqueda no devuelve opciones. */
  empty: string;
  /** Nombre accesible del spinner mientras se busca. */
  loading: string;
  /** Nombre accesible del botón que vacía la selección. */
  clear: string;
}

export interface AsyncSelectProps {
  onSearch: (query: string) => Promise<AsyncSelectOption[]>;
  value?: string | null;
  onValueChange?: (value: string | null, option: AsyncSelectOption | null) => void;
  /** Label of the currently selected option — required when `value` is set so the component can display it */
  selectedOption?: AsyncSelectOption | null;
  /**
   * Pista dentro del campo de búsqueda. **Sin default**: sale de la clave
   * `placeholder` del espacio de este control.
   */
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /**
   * Milisegundos de rebote entre la última tecla y la llamada a `onSearch`.
   * Default: 300. A 0 se busca en cada tecla.
   */
  debounceMs?: number;
  id?: string;
  /** Nombre del campo en el formulario: se monta un input oculto con el valor. */
  name?: string;
  /** Marca el estado de error: aplica la clase `async-select--error` y `aria-invalid`. */
  error?: boolean;
  /**
   * Marca el control como obligatorio: pone `aria-required` en el combobox.
   * No se traslada a un `required` nativo porque lo que viaja en el formulario
   * es un input oculto —un control no enfocable con `required` bloquea el envío
   * sin poder enseñar el mensaje—: la validación la lleva el consumidor (o
   * react-hook-form), como en el resto de campos compuestos del sistema.
   */
  required?: boolean;
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
   * Texto mostrado cuando la búsqueda no devuelve opciones. **Sin default**:
   * sale de la clave `empty` del espacio de este control en el
   * `BrandMessagesProvider`.
   */
  emptyMessage?: string;
  /**
   * Etiqueta accesible del spinner mientras se busca. **Sin default**: sale de
   * la clave `loading` del espacio de este control.
   */
  loadingLabel?: string;
  /**
   * aria-label del botón de limpiar selección. **Sin default**: sale de
   * `asyncSelect.clear`.
   */
  clearLabel?: string;
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
  container?: React.ComponentPropsWithoutRef<typeof Combobox.Portal>['container'];
}

const NO_OPTIONS: AsyncSelectOption[] = [];
const sameOption = (a: AsyncSelectOption, b: AsyncSelectOption) => a.value === b.value;

/**
 * Búsqueda con resultados asíncronos y un solo valor, sobre el `Combobox` de
 * Base UI: el teclado, el foco virtual (`aria-activedescendant`), los anuncios
 * y el cierre son suyos. El componente decide qué opciones hay (carga con
 * rebote, `useAsyncOptions`) y qué texto enseña el campo: abierto, lo que se
 * escribe; cerrado, la etiqueta de lo elegido. El `ref` va al `<input>` de
 * búsqueda, que es lo que se enfoca.
 */
export const AsyncSelect = forwardRef<HTMLInputElement, AsyncSelectProps>(function AsyncSelect({
  onSearch,
  value,
  onValueChange,
  selectedOption,
  placeholder,
  disabled,
  readOnly,
  size = 'md',
  debounceMs = 300,
  id,
  name,
  error = false,
  required,
  onBlur,
  className,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  emptyMessage,
  loadingLabel,
  clearLabel,
  container,
}: AsyncSelectProps, ref) {
  const t = useBrandMessages('asyncSelect');
  const portalContainer = usePortalContainer(container);
  const { results, loading, hasSearched, search, schedule, clear } = useAsyncOptions(onSearch, debounceMs);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const [internalSelectedOption, setInternalSelectedOption] = useState<AsyncSelectOption | null>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const currentSelectedOption = selectedOption !== undefined ? selectedOption : internalSelectedOption;
  const selectedLabel = currentSelectedOption?.label ?? '';
  // Lo que Base UI tiene por elegido: con él marca la opción (`aria-selected`)
  // y rellena el input oculto del formulario con su `value`.
  const selected: AsyncSelectOption | null = currentValue
    ? { value: currentValue, label: selectedLabel }
    : null;

  function commit(option: AsyncSelectOption | null) {
    if (value === undefined) {
      setInternalValue(option?.value ?? null);
      setInternalSelectedOption(option);
    }
    onValueChange?.(option?.value ?? null, option);
  }

  function clearSelection() {
    commit(null);
    setQuery('');
    clear();
  }

  /**
   * Abrir arranca una búsqueda limpia con la consulta vacía (el campo pasa a
   * enseñar lo que se escribe, no la etiqueta elegida). Si lo que abre es
   * escribir, la búsqueda ya la lanza el cambio de texto.
   */
  function handleOpenChange(next: boolean, details: Combobox.Root.ChangeEventDetails) {
    if (next === open) return;
    setOpen(next);
    if (next && details.reason === 'input-change') return;
    setQuery('');
    if (next) search('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement> & { preventBaseUIHandler?: () => void }) {
    if (disabled || readOnly) return;
    if (e.key === 'Escape' && !open) {
      // Cerrado, Escape no vacía la selección (lo que haría Base UI): sube tal
      // cual, para que cierre el diálogo que contenga al campo.
      e.preventBaseUIHandler?.();
    } else if ((e.key === 'Backspace' || e.key === 'Delete') && query === '' && currentValue) {
      // El aspa es un atajo de ratón (fuera del tabulador, como en el resto de
      // la familia): la salida con teclado es Retroceso sobre el hueco vacío,
      // el mismo gesto que quita la última píldora en AsyncMultiSelect.
      e.preventDefault();
      e.preventBaseUIHandler?.();
      clearSelection();
    } else if (!open && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Cerrado, el campo enseña la etiqueta elegida: la primera tecla empieza
      // una búsqueda nueva en vez de escribirse detrás de esa etiqueta.
      e.preventDefault();
      e.preventBaseUIHandler?.();
      setOpen(true);
      setQuery(e.key);
      clear();
      schedule(e.key);
    }
  }

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
    <Combobox.Root<AsyncSelectOption>
      items={loading ? NO_OPTIONS : results}
      // Las opciones ya vienen filtradas por `onSearch`.
      filter={null}
      value={selected}
      onValueChange={(next) => {
        commit(next);
        setQuery('');
      }}
      isItemEqualToValue={sameOption}
      inputValue={open ? query : selectedLabel}
      onInputValueChange={(next, details) => {
        if (details.reason !== 'input-change') return;
        setQuery(next);
        schedule(next);
      }}
      open={open}
      onOpenChange={handleOpenChange}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
    >
      <Combobox.InputGroup className={triggerClass}>
        <Combobox.Input
          ref={ref}
          id={id}
          className="async-select__input"
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder', placeholder)}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={error || undefined}
          aria-required={required || undefined}
          onBlur={onBlur}
        />
        {loading && <Spinner size="sm" aria-hidden />}
        {!loading && !disabled && !readOnly && (
          <Combobox.Clear className="async-select__clear" aria-label={t('clear', clearLabel)}>
            <Icon name="close" size="xs" />
          </Combobox.Clear>
        )}
      </Combobox.InputGroup>

      <Combobox.Portal container={portalContainer}>
        <Combobox.Positioner className="async-select__positioner" align="start" sideOffset={-1}>
          <Combobox.Popup className={contentClass} aria-busy={loading || undefined}>
            <Combobox.Status>
              {loading && (
                <div className="async-select__loading">
                  <Spinner size="sm" aria-hidden />
                  <VisuallyHidden>{t('loading', loadingLabel)}</VisuallyHidden>
                </div>
              )}
            </Combobox.Status>
            <Combobox.Empty>
              {!loading && hasSearched && (
                <div className="async-select__empty">{t('empty', emptyMessage)}</div>
              )}
            </Combobox.Empty>
            <Combobox.List aria-label={ariaLabel ?? t('placeholder', placeholder)}>
              {(option: AsyncSelectOption) => (
                <Combobox.Item key={option.value} value={option} className="async-select__item">
                  {option.label}
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
});
