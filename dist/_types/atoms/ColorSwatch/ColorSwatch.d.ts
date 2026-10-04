import './ColorSwatch.css';
export interface ColorSwatchProps {
    /**
     * El color que se enseña: **cualquier color CSS** (`#111e30`, `#11223380`,
     * `rgb(…)`, `transparent`, un nombre). Viene del documento, así que no se
     * valida: lo que el navegador no entiende se pinta como vacío. Sin color
     * (`null`, `undefined` o cadena vacía) solo asoma el damero.
     */
    color?: string | null;
    /** Talla: `sm` (16px), `md` (24px, por defecto) o `lg` (48px). */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Nombre accesible. Con él la muestra es una imagen con nombre
     * (`role="img"`): «Lavanda», «Color de fondo: #baabff». Sin él es
     * decorativa (`aria-hidden`), que es lo correcto cuando el color ya se dice
     * en el texto de al lado.
     */
    label?: string;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Una muestra de color: enseña un color que viene de un documento —el de un
 * tema, una categoría, una celda—, sin interacción. Para elegirlo,
 * `ColorPicker`.
 *
 * Detrás del color va siempre un damero, que solo se ve cuando el color tiene
 * transparencia: así `transparent` o `#ffffff80` no se confunden con el blanco.
 *
 * **Sin atributo `style`.** El color llega al HTML como atributo de
 * presentación de SVG (`fill`), que la CSP `style-src 'self'` no bloquea y que
 * ya está en el primer render del servidor; el damero sale de la hoja, con
 * tokens.
 */
export declare function ColorSwatch({ color, size, label, className }: ColorSwatchProps): import("react/jsx-runtime").JSX.Element;
