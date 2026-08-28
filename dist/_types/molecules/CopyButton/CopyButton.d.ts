import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './CopyButton.css';
export interface CopyButtonProps extends Omit<ComponentPropsWithoutRef<'button'>, 'value' | 'children' | 'onClick' | 'onCopy'> {
    /**
     * Lo que se copia. Como función, se evalúa en el momento del clic: para
     * copiar algo que puede haber cambiado desde el render (el contenido de un
     * campo, el texto de un bloque de código).
     */
    value: string | (() => string);
    /**
     * Rótulo visible junto al icono. Sin él, el botón es solo icono y `label`
     * se queda como nombre accesible.
     */
    children?: ReactNode;
    /**
     * Nombre accesible del botón. Default castellano.
     * @default 'Copiar'
     */
    label?: string;
    /**
     * Acuse tras copiar: se anuncia en una región viva y, si hay rótulo visible,
     * lo sustituye mientras dura. Default castellano.
     * @default 'Copiado'
     */
    copiedLabel?: string;
    /**
     * Aviso cuando el portapapeles no está disponible (contexto no seguro,
     * permiso denegado). Default castellano.
     * @default 'No se pudo copiar'
     */
    errorLabel?: string;
    /** Variante del botón. */
    variant?: 'ghost' | 'outline' | 'text';
    /** Talla del botón. */
    size?: 'sm' | 'md' | 'lg';
    /** Cuánto dura el acuse, en milisegundos. */
    feedbackDuration?: number;
    /** Se llama con el texto copiado cuando la copia sale bien. */
    onCopy?: (text: string) => void;
    /** Se llama cuando el portapapeles falla. */
    onCopyError?: (error: unknown) => void;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * Copiar al portapapeles con acuse: una clave de API, un identificador, un
 * fragmento de código. Es el `Button` del sistema con el icono de copiar y la
 * conducta del acuse; no aporta cara propia.
 *
 * El acuse es doble: el icono pasa a un tic para quien ve, y una región viva
 * (`role="status"`) lo anuncia para quien escucha. Un cambio de icono solo no
 * es feedback accesible.
 *
 * Si el portapapeles no está disponible —contexto no seguro, permiso
 * denegado— el botón lo dice en vez de fingir que ha copiado.
 */
export declare function CopyButton({ value, children, label, copiedLabel, errorLabel, variant, size, feedbackDuration, onCopy, onCopyError, className, ...rest }: CopyButtonProps): import("react/jsx-runtime").JSX.Element;
