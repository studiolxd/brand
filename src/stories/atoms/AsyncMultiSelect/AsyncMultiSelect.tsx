'use client';

import { forwardRef, useState } from 'react';
import { Combobox } from '@base-ui/react/combobox';
import { Icon } from '../Icon/Icon';
import { Spinner } from '../Spinner/Spinner';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { useAsyncOptions } from '../_shared/useAsyncOptions';
import './AsyncMultiSelect.css';
import { usePortalContainer } from '../../constants/portal-container';

export interface AsyncMultiSelectOption {
  value: string;
  label: string;
}

/**
 * Los textos que el control emite por su cuenta. Todos son cromo: dicen lo
 * mismo en toda la suite y no hablan de lo que se busca. Lo que sí es de esta
 * pantalla —las opciones que devuelve `onSearch`— no pasa por aquí.
 */
export interface AsyncMultiSelectMessages {
  /** Pista dentro del campo de búsqueda. */
  placeholder: string;
  /** Aviso cuando la búsqueda no devuelve opciones. */
  empty: string;
  /** Nombre accesible del spinner mientras se busca. */
  loading: string;
  /** Nombre accesible del aspa de cada ficha, con la etiqueta de su opción. */
  remove: (label: string) => string;
}

export interface AsyncMultiSelectProps {
  onSearch: (query: string) => Promise<AsyncMultiSelectOption[]>;
  value?: string[];
  /**
   * Valores iniciales en modo no controlado. Sus etiquetas no se conocen hasta
   * que se buscan: para enseñarlas desde el primer pintado hay que pasar
   * también `selectedOptions`. Sin ellas la pill muestra el valor crudo.
   */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /**
   * Etiquetas de los valores elegidos. En modo controlado es la vía normal de
   * dárselas al componente. En modo no controlado no hace falta para lo que se
   * elige con el ratón o el teclado —esas opciones vienen de `onSearch` y el
   * componente las recuerda—, solo para los valores de `defaultValue`.
   */
  selectedOptions?: AsyncMultiSelectOption[];
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
  /** Nombre del campo en el formulario: se monta un input oculto por valor elegido. */
  name?: string;
  /** Marca el estado de error: aplica la clase `async-multi-select--error` y `aria-invalid`. */
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
   * aria-label del botón que quita un valor. **Sin default**: sale de
   * `asyncMultiSelect.remove`.
   */
  removeLabel?: (label: string) => string;
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

const NO_OPTIONS: AsyncMultiSelectOption[] = [];
const sameOption = (a: AsyncMultiSelectOption, b: AsyncMultiSelectOption) => a.value === b.value;

/**
 * Búsqueda con resultados asíncronos y varios valores, sobre el `Combobox`
 * múltiple de Base UI: el teclado (flechas, Intro para marcar y desmarcar,
 * Retroceso para quitar la última ficha, flechas laterales para recorrerlas),
 * el foco virtual, los anuncios y el cierre son suyos. El componente decide qué
 * opciones hay (carga con rebote, `useAsyncOptions`) y qué etiqueta lleva cada
 * ficha. El `ref` va al `<input>` de búsqueda, que es lo que se enfoca.
 */
export const AsyncMultiSelect = forwardRef<HTMLInputElement, AsyncMultiSelectProps>(function AsyncMultiSelect({
  onSearch,
  value,
  defaultValue = [],
  onValueChange,
  selectedOptions,
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
  removeLabel,
  emptyMessage,
  loadingLabel,
  container,
}: AsyncMultiSelectProps, ref) {
  const t = useBrandMessages('asyncMultiSelect');
  const portalContainer = usePortalContainer(container);
  const { results, loading, hasSearched, search, schedule } = useAsyncOptions(onSearch, debounceMs);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue);
  // Etiquetas de las opciones que han pasado por el control: son el respaldo
  // cuando el consumidor no lleva él mismo `selectedOptions`.
  const [knownOptions, setKnownOptions] = useState<AsyncMultiSelectOption[]>([]);

  const currentValues = value !== undefined ? value : internalValues;

  /**
   * Las pills se pintan desde los valores vigentes, no desde `selectedOptions`:
   * así el modo no controlado enseña lo elegido sin que el consumidor tenga que
   * llevar la lista de etiquetas. Para un valor del que nadie sabe la etiqueta
   * —un `defaultValue` que nunca se ha buscado— se pinta el valor crudo, que es
   * lo que el formulario va a enviar. Es también lo que Base UI tiene por
   * elegido: con ello marca las opciones y monta un input oculto por valor.
   */
  const pills: AsyncMultiSelectOption[] = currentValues.map(v =>
    selectedOptions?.find(o => o.value === v)
    ?? knownOptions.find(o => o.value === v)
    ?? { value: v, label: v },
  );

  function handleValueChange(nextOptions: AsyncMultiSelectOption[]) {
    setKnownOptions(prev => {
      const nuevas = nextOptions.filter(o => !prev.some(p => p.value === o.value));
      return nuevas.length ? [...prev, ...nuevas] : prev;
    });
    const next = nextOptions.map(o => o.value);
    if (value === undefined) setInternalValues(next);
    onValueChange?.(next);
  }

  /**
   * Abrir arranca una búsqueda limpia con la consulta vacía. Si lo que abre es
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
    // Cerrado, Escape no vacía todas las fichas (lo que haría Base UI): sube
    // tal cual, para que cierre el diálogo que contenga al campo.
    if (e.key === 'Escape' && !open) e.preventBaseUIHandler?.();
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
    <Combobox.Root<AsyncMultiSelectOption, true>
      multiple
      items={loading ? NO_OPTIONS : results}
      // Las opciones ya vienen filtradas por `onSearch`.
      filter={null}
      value={pills}
      onValueChange={handleValueChange}
      isItemEqualToValue={sameOption}
      inputValue={query}
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
        <Combobox.Chips className="async-multi-select__input-area">
          {pills.map(opt => (
            <Combobox.Chip key={opt.value} className="async-multi-select__pill">
              <span className="async-multi-select__pill-label">{opt.label}</span>
              {!disabled && !readOnly && (
                <Combobox.ChipRemove
                  className="async-multi-select__pill-remove"
                  aria-label={t('remove', removeLabel)(opt.label)}
                >
                  <Icon name="close" size="xs" />
                </Combobox.ChipRemove>
              )}
            </Combobox.Chip>
          ))}
          <Combobox.Input
            ref={ref}
            id={id}
            className="async-multi-select__input"
            onKeyDown={handleKeyDown}
            placeholder={currentValues.length === 0 ? t('placeholder', placeholder) : undefined}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedby}
            aria-invalid={error || undefined}
            aria-required={required || undefined}
            onBlur={onBlur}
          />
        </Combobox.Chips>
        {loading && <Spinner size="sm" aria-hidden />}
      </Combobox.InputGroup>

      <Combobox.Portal container={portalContainer}>
        <Combobox.Positioner className="async-multi-select__positioner" align="start" sideOffset={-1}>
          <Combobox.Popup className={contentClass} aria-busy={loading || undefined}>
            <Combobox.Status>
              {loading && (
                <div className="async-multi-select__loading">
                  <Spinner size="sm" aria-hidden />
                  <VisuallyHidden>{t('loading', loadingLabel)}</VisuallyHidden>
                </div>
              )}
            </Combobox.Status>
            <Combobox.Empty>
              {!loading && hasSearched && (
                <div className="async-multi-select__empty">{t('empty', emptyMessage)}</div>
              )}
            </Combobox.Empty>
            <Combobox.List aria-label={ariaLabel ?? t('placeholder', placeholder)}>
              {(option: AsyncMultiSelectOption) => (
                <Combobox.Item key={option.value} value={option} className="async-multi-select__item">
                  <span className="async-multi-select__item-check" aria-hidden="true">
                    <span className="async-multi-select__item-check-mark" />
                  </span>
                  <span>{option.label}</span>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
});
