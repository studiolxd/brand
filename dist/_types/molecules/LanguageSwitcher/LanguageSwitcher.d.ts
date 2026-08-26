import type { ReactNode } from 'react';
import './LanguageSwitcher.css';
export interface Language {
    /** Código BCP 47 (`es`, `en`, `pt-BR`). Es el valor y lo que se muestra en la barra. */
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
    /** En compacto, la etiqueta va oculta por defecto: el código del idioma ya dice qué es. */
    labelHidden?: boolean;
    /**
     * `compact`: un botón con el código (ES) que abre un menú — el de la barra.
     * `list`: los idiomas desplegados en línea — el del pie.
     */
    variant?: 'compact' | 'list';
    /**
     * Solo en `list`: enlace por idioma (para que cada versión tenga su URL).
     * Sin él, la lista es de botones y usa `onChange`.
     */
    hrefFor?: (code: string) => string;
    renderLink?: (props: LanguageSwitcherRenderLinkProps) => ReactNode;
    className?: string;
}
/**
 * Selector de idioma: el mismo campo desplegable que el de tema (`DropdownField`),
 * con la etiqueta oculta. Nunca un icono: el código de dos letras lo lee cualquiera
 * aunque no entienda la interfaz, y las opciones van en su propio idioma. Es un
 * componente del sistema porque aparece en la barra y en el pie de todos los
 * sitios; el enrutado y la persistencia se quedan en el producto.
 */
export declare function LanguageSwitcher({ languages, value, onChange, label, id, labelHidden, variant, hrefFor, renderLink, className, }: LanguageSwitcherProps): import("react/jsx-runtime").JSX.Element;
