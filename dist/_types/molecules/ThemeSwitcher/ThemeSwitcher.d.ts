import './ThemeSwitcher.css';
export type Theme = 'light' | 'dark' | 'system';
export interface ThemeSwitcherLabels {
    /** Nombre accesible del control. */
    group?: string;
    light?: string;
    dark?: string;
    system?: string;
}
export interface ThemeSwitcherProps {
    /** Tema elegido. `system` sigue la preferencia del sistema operativo. */
    value: Theme;
    /** Cambio de tema. Aplicarlo (clase en `html`) y persistirlo es del producto. */
    onChange?: (theme: Theme) => void;
    labels?: ThemeSwitcherLabels;
    /** `id` del control en compacto (enlaza la etiqueta). */
    id?: string;
    /**
     * `compact`: un `DropdownField` (etiqueta + control rectangular) con el icono y el nombre del tema actual — el del panel.
     * `list`: las tres opciones desplegadas en línea — el del pie.
     */
    variant?: 'compact' | 'list';
    className?: string;
}
/**
 * Selector de tema: claro, oscuro o el del sistema. Mismo patrón que el
 * selector de idioma: en compacto, un campo desplegable con etiqueta y
 * opciones exclusivas; en lista, las opciones desplegadas para el pie. Aplicar el tema y
 * recordarlo es del producto; el componente solo muestra y elige.
 */
export declare function ThemeSwitcher({ value, onChange, labels, id, variant, className }: ThemeSwitcherProps): import("react/jsx-runtime").JSX.Element;
