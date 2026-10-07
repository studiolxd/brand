import { Autocomplete as BaseAutocomplete } from '@base-ui/react/autocomplete';
import './Autocomplete.css';
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
export declare const Autocomplete: import("react").ForwardRefExoticComponent<AutocompleteProps & import("react").RefAttributes<HTMLInputElement>>;
