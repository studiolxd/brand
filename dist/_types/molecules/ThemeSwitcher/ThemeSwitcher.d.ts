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
     * `icon`: solo el icono del tema actual, como botón de icono que abre el menú — para una barra sin sitio.
     */
    variant?: 'compact' | 'list' | 'icon';
    /** Talla del control compacto (32/40/48): `lg` en superficies públicas, `md` en las aplicaciones. */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
/**
 * Selector de tema: claro, oscuro o el del sistema. Mismo patrón que el
 * selector de idioma: en compacto, un campo desplegable con etiqueta y
 * opciones exclusivas; en lista, las opciones desplegadas para el pie. Aplicar el tema y
 * recordarlo es del producto; el componente solo muestra y elige.
 */
export declare function ThemeSwitcher({ value, onChange, labels, id, variant, size, className }: ThemeSwitcherProps): import("react/jsx-runtime").JSX.Element;
