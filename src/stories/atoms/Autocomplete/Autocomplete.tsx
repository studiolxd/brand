'use client';

import { forwardRef, useState } from 'react';
import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import { Spinner } from '../Spinner/Spinner';
import { useAsyncOptions } from '../_shared/useAsyncOptions';
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
  /**
   * Se añade DESPUÉS de las clases propias (el consumidor añade, no sustituye).
   * **Va al disparador, que pinta el componente** (el campo): el panel sale por un
   * portal y se personaliza con tokens (regla de `className` en componentes
   * con portal, CLAUDE.md § Base UI).
   */
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
  container?: React.ComponentPropsWithoutRef<typeof BaseAutocomplete.Portal>['container'];
}

/** Minúsculas y sin tildes: «cafe» encuentra «Café». */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const noSearch = (): AutocompleteOption[] => [];

/**
 * Campo de texto con sugerencias, sobre el `Autocomplete` de Base UI. A
 * diferencia de `AsyncSelect`, **no obliga a elegir**: el valor es el texto
 * escrito y una sugerencia es solo una forma de escribirlo más deprisa. El
 * teclado, el foco virtual (`aria-activedescendant`: el foco no sale nunca del
 * `<input>`), los anuncios y el cierre son de Base UI; el componente decide qué
 * sugerencias hay —filtrando `options` o pidiéndolas a `onSearch` con rebote
 * (`useAsyncOptions`)— y cuándo merece la pena abrir la lista. El `ref` va al
 * `<input>`.
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
  const remote = useAsyncOptions(onSearch ?? noSearch, debounceMs);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [wantsOpen, setWantsOpen] = useState(false);
  // Lo último que se pidió sugerir: con `options`, el filtro se calcula de ahí.
  const [query, setQuery] = useState('');

  const text = value !== undefined ? value : internalValue;
  const results: AutocompleteOption[] = onSearch
    ? remote.results
    : (options ?? []).filter(o => normalize(o.label).includes(normalize(query)));
  // Sin sugerencias no hay lista: no hay «sin resultados» que decir, porque
  // quedarse con lo escrito es una respuesta válida.
  const open = wantsOpen && results.length > 0;

  function suggest(next: string) {
    setWantsOpen(true);
    setQuery(next);
    if (onSearch) remote.schedule(next);
  }

  function close() {
    // Lo que venga de una búsqueda en vuelo ya no interesa.
    remote.cancel();
    setWantsOpen(false);
  }

  function setText(next: string) {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  }

  function pick(option: AutocompleteOption) {
    onSelect?.(option);
    close();
    remote.clear();
  }

  function handleValueChange(next: string, details: BaseAutocomplete.Root.ChangeEventDetails) {
    if (details.reason === 'item-press') {
      // Elegir rellena el texto; cuál se eligió lo avisa el `onClick` del ítem.
      setText(next);
      return;
    }
    if (details.reason !== 'input-change') return;
    setText(next);
    if (next.length < minChars) close();
    else suggest(next);
  }

  /**
   * Base UI pide abrir (flecha abajo, aunque no se llegue a `minChars`) y
   * cerrar (Escape, Tab, clic fuera, Intro sin sugerencia marcada). Abrir
   * pide sugerencias para lo escrito; la lista solo aparece si las hay.
   */
  function handleOpenChange(next: boolean, details: BaseAutocomplete.Root.ChangeEventDetails) {
    if (!next) {
      close();
      return;
    }
    if (details.reason !== 'input-change') suggest(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement> & { preventBaseUIHandler?: () => void }) {
    // Sin lista, Escape no borra lo escrito (lo que haría Base UI): sube tal
    // cual, para que cierre el diálogo que contenga al campo.
    if (e.key === 'Escape' && !open) e.preventBaseUIHandler?.();
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
    <BaseAutocomplete.Root
      items={results}
      // Las sugerencias ya llegan filtradas (por `options` o por `onSearch`).
      filter={null}
      value={text}
      onValueChange={handleValueChange}
      open={open}
      onOpenChange={handleOpenChange}
      disabled={disabled}
      readOnly={readOnly}
    >
      <BaseAutocomplete.InputGroup className={rootClass}>
        <BaseAutocomplete.Input
          ref={ref}
          id={id}
          name={name}
          className="autocomplete__input"
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          aria-invalid={error || undefined}
          onKeyDown={handleKeyDown}
          onBlur={onBlur}
        />
        {remote.loading && <Spinner size="sm" aria-hidden />}
      </BaseAutocomplete.InputGroup>

      <BaseAutocomplete.Portal container={portalContainer}>
        <BaseAutocomplete.Positioner className="autocomplete__positioner" align="start" sideOffset={-1}>
          <BaseAutocomplete.Popup className={contentClass}>
            <BaseAutocomplete.List aria-label={ariaLabel ?? placeholder}>
              {(option: AutocompleteOption) => (
                <BaseAutocomplete.Item
                  key={option.value}
                  value={option}
                  className={[
                    'autocomplete__item',
                    option.label === text ? 'autocomplete__item--selected' : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => pick(option)}
                  // Base UI no marca la sugerencia activa con `aria-selected` en
                  // un autocompletado (no hay selección que guardar); el patrón
                  // de lista con `aria-activedescendant` de la APG sí lo pide.
                  render={(props, state) => <div {...props} aria-selected={state.highlighted} />}
                >
                  {option.label}
                </BaseAutocomplete.Item>
              )}
            </BaseAutocomplete.List>
          </BaseAutocomplete.Popup>
        </BaseAutocomplete.Positioner>
      </BaseAutocomplete.Portal>
    </BaseAutocomplete.Root>
  );
});
