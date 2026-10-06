import './ThemeSwitcher.css';
export type Theme = 'light' | 'dark' | 'system';
/**
 * El cromo del selector de tema: el nombre del control, los tres temas y la
 * frase que nombra el botón de icono con el tema vigente. Todo es igual en
 * cualquier pantalla de la suite, así que va al catálogo una sola vez.
 */
export interface ThemeSwitcherMessages {
    /** Nombre del control: la etiqueta del compacto y el nombre del grupo en lista. */
    group: string;
    /** El tema claro. */
    light: string;
    /** El tema oscuro. */
    dark: string;
    /** El tema que sigue al sistema operativo. */
    system: string;
    /**
     * Nombre accesible del botón de la variante `icon`, que solo enseña el
     * icono del tema vigente: «Tema: Claro». Recibe el nombre del control y el
     * del tema vigente, ya resueltos, y es función porque el orden y la
     * puntuación de la frase son de cada idioma.
     */
    trigger: (group: string, theme: string) => string;
}
/**
 * Anulaciones puntuales del catálogo, clave a clave. Las que no se pasen
 * salen de `themeSwitcher.*` del `BrandMessagesProvider`.
 */
export interface ThemeSwitcherLabels {
    /** Anulación puntual de `themeSwitcher.group`. */
    group?: string;
    /** Anulación puntual de `themeSwitcher.light`. */
    light?: string;
    /** Anulación puntual de `themeSwitcher.dark`. */
    dark?: string;
    /** Anulación puntual de `themeSwitcher.system`. */
    system?: string;
    /** Anulación puntual de `themeSwitcher.trigger`. */
    trigger?: (group: string, theme: string) => string;
}
export interface ThemeSwitcherProps {
    /** Tema elegido. `system` sigue la preferencia del sistema operativo. */
    value: Theme;
    /** Cambio de tema. Aplicarlo (clase en `html`) y persistirlo es del producto. */
    onChange?: (theme: Theme) => void;
    /**
     * Textos del control, clave a clave. **Sin defaults**: los que no se pasen
     * salen de `themeSwitcher.*` del `BrandMessagesProvider`.
     */
    labels?: ThemeSwitcherLabels;
    /** `id` del control en compacto (enlaza la etiqueta). Por defecto, uno único por instancia (`useId`). */
    id?: string;
    /**
     * `compact`: un `DropdownField` (etiqueta + control rectangular) con el icono y el nombre del tema actual — el del panel.
     * `list`: las tres opciones desplegadas en línea — el del pie.
     * `icon`: solo el icono del tema actual, como botón de icono que abre el menú — para una barra sin sitio.
     */
    variant?: 'compact' | 'list' | 'icon';
    /** Talla del control compacto (32/40/48): `lg` en superficies públicas, `md` en las aplicaciones. */
    /**
     * Disposición de la etiqueta. `inline` (por defecto) la pone delante del
     * control, que es como va en la barra y en el panel; `stacked` la pone
     * encima con el control a todo el ancho, que es la forma del resto de
     * campos de un formulario — la de «Mi cuenta», donde este selector es un
     * ajuste más y no un control de chrome.
     */
    layout?: 'inline' | 'stacked';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
/**
 * Selector de tema: claro, oscuro o el del sistema. Mismo patrón que el
 * selector de idioma: en compacto, un campo desplegable con etiqueta y
 * opciones exclusivas; en lista, las opciones desplegadas para el pie. Aplicar el tema y
 * recordarlo es del producto; el componente solo muestra y elige.
 */
export declare function ThemeSwitcher({ value, onChange, labels, id: idProp, variant, layout, size, className }: ThemeSwitcherProps): import("react/jsx-runtime").JSX.Element;
