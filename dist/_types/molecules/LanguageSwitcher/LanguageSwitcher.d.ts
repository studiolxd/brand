import type { ReactNode } from 'react';
import './LanguageSwitcher.css';
export interface Language {
    /** Código BCP 47 (`es`, `en`, `pt-BR`). Es el valor; en el control se muestra el nombre. */
    code: string;
    /** Nombre del idioma **en ese idioma**: "Español", "English", "Deutsch". Es como cada quien reconoce el suyo. */
    label: string;
}
export type LanguageSwitcherRenderLinkProps = {
    href: string;
    lang: string;
    children: ReactNode;
    className: string;
    'aria-current'?: 'true';
};
export interface LanguageSwitcherProps {
    languages: Language[];
    /** Código del idioma actual. */
    value: string;
    /** Cambio de idioma. Qué hacer con él (enrutar, persistir) es del producto. */
    onChange?: (code: string) => void;
    /** Nombre accesible del control (la etiqueta del campo). */
    label?: string;
    /** `id` del control en compacto (enlaza la etiqueta). */
    id?: string;
    /** Oculta la etiqueta (visible por defecto: en el panel va con su nombre, como el de tema). */
    labelHidden?: boolean;
    /**
     * `compact`: un campo desplegable con el nombre del idioma actual, en su idioma, que abre un menú — el de los ajustes y la barra.
     * `list`: los idiomas desplegados en línea — el del pie.
     */
    variant?: 'compact' | 'list';
    /**
     * Solo en `list`: enlace por idioma (para que cada versión tenga su URL).
     * Sin él, la lista es de botones y usa `onChange`.
     */
    hrefFor?: (code: string) => string;
    renderLink?: (props: LanguageSwitcherRenderLinkProps) => ReactNode;
    /**
     * Disposición de la etiqueta. `inline` (por defecto) la pone delante del
     * control, que es como va en la barra y en el panel; `stacked` la pone
     * encima con el control a todo el ancho, que es la forma del resto de
     * campos de un formulario — la de «Mi cuenta», donde este selector es un
     * ajuste más y no un control de chrome.
     */
    layout?: 'inline' | 'stacked';
    /** Talla del control compacto (32/40/48): `lg` en superficies públicas, `md` en las aplicaciones. */
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}
/**
 * Selector de idioma: el mismo campo desplegable que el de tema (`DropdownField`),
 * con su etiqueta visible. Nunca un icono: el código de dos letras lo lee cualquiera
 * aunque no entienda la interfaz, y las opciones van en su propio idioma. Es un
 * componente del sistema porque aparece en el menú y en el pie de todos los
 * sitios; el enrutado y la persistencia se quedan en el producto.
 */
export declare function LanguageSwitcher({ languages, value, onChange, label, id, labelHidden, variant, layout, size, hrefFor, renderLink, className, }: LanguageSwitcherProps): import("react/jsx-runtime").JSX.Element;
