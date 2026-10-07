import type { ReactElement } from 'react';
import type { PopoverAnchor, PopoverChangeDetails } from '../../atoms/Popover/Popover';
import './ColorPicker.css';
/**
 * El cromo del selector de color. Ninguno trae el castellano puesto: salen
 * del `BrandMessagesProvider` (espacio `colorPicker`), y cada uno se lee
 * **donde se pinta** —un selector sin transparencia no exige `alpha`, uno sin
 * predefinidos no exige `presets`—.
 *
 * Las cifras no son texto: saturación y brillo llegan como números a
 * `areaValue`, y el tono y la opacidad los formatea `Intl` con `locale`.
 */
export interface ColorPickerMessages {
    /** Nombre del disparador cuando va suelto, sin etiqueta ni `aria-label`. */
    trigger: string;
    /** El valor actual, que describe el disparador. Recibe el hex. */
    value: (hex: string) => string;
    /** Descripción del disparador cuando no hay color. */
    empty: string;
    /** Nombre del panel (`role="dialog"`) cuando el selector va suelto. */
    dialog: string;
    /** Nombre del área de saturación y brillo. */
    area: string;
    /** `aria-roledescription` del área: dice que el deslizador tiene dos ejes. */
    areaDescription: string;
    /** Lo que anuncia el área: saturación y brillo, de 0 a 100, ya redondeados. */
    areaValue: (saturation: number, brightness: number) => string;
    /** Nombre de la banda de tono. */
    hue: string;
    /** Nombre de la banda de opacidad (solo con `alpha`). */
    alpha: string;
    /** Nombre del campo hexadecimal. */
    hex: string;
    /** Nombre del grupo de predefinidos (solo con `presets`). */
    presets: string;
    /** Botón de quitar el color (solo con `clearable`). */
    clear: string;
}
/** Un color predefinido: el valor y el nombre con que se anuncia. */
export interface ColorPickerPreset {
    /** Hex de 3, 4, 6 u 8 dígitos. Lo que no sea hex no se ofrece. */
    color: string;
    /** Nombre accesible y rótulo emergente: «Lavanda», «Texto». */
    title: string;
}
export interface ColorPickerProps {
    /**
     * Valor (controlado): un hex. `null` es «sin color». Si llega algo que no es
     * hex (`transparent`, un nombre), la muestra lo pinta tal cual y el panel
     * arranca en negro.
     */
    value?: string | null;
    /** Valor al montar (no controlado). */
    defaultValue?: string | null;
    /**
     * Se llama mientras se elige —en cada paso del arrastre, con cada tecla—,
     * con el hex en minúsculas: `#rrggbb`, o `#rrggbbaa` con `alpha`. Es el sitio
     * de la vista previa.
     */
    onValueChange?: (hex: string) => void;
    /**
     * Se llama al terminar un gesto: al soltar el área o una banda, con cada
     * tecla, al elegir un predefinido o al escribir un hex válido. Es el sitio
     * del guardado.
     */
    onValueCommitted?: (hex: string) => void;
    /**
     * Con transparencia: pinta la banda de opacidad y emite `#rrggbbaa`. Por
     * defecto `false`: emite `#rrggbb` y descarta el alfa de lo que entre.
     */
    alpha?: boolean;
    /** Colores predefinidos, con su nombre: la paleta de un tema. */
    presets?: ColorPickerPreset[];
    /** Añade «Quitar color» al pie del panel. */
    clearable?: boolean;
    /**
     * Se llama al quitar el color, y el panel se cierra (con `open` controlado,
     * lo cierra quien lo controla, aquí mismo). Sin controlar, el valor pasa a
     * `null`.
     */
    onClear?: () => void;
    /**
     * Panel abierto (controlado). Sin él, el panel se abre con el disparador y
     * se cierra con Escape, con un clic fuera o al quitar el color; elegir un
     * color **no** lo cierra. Controlado, quien lo usa puede cerrarlo en
     * `onValueCommitted`.
     */
    open?: boolean;
    /** Panel abierto al montar (no controlado). */
    defaultOpen?: boolean;
    /**
     * Se llama al abrirse y al cerrarse por el disparador, Escape o un clic
     * fuera. El segundo argumento es el detalle de Base UI, como en `Popover`.
     */
    onOpenChange?: (open: boolean, details: PopoverChangeDetails) => void;
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    /** Pone el disparador en error (lo hace el campo cuando trae `errorMessage`). */
    error?: boolean;
    /** Locale con que `Intl` formatea el tono y la opacidad. */
    locale?: string;
    /** `id` del disparador: lo apunta el `htmlFor` de la etiqueta. */
    id?: string;
    /** Nombre en el formulario: se monta un input oculto con el hex. */
    name?: string;
    /**
     * El `<form>` no se envía sin color: el campo que sincroniza el hex lleva
     * `required` (y, si se enfoca para avisar, devuelve el foco al disparador).
     * El disparador es un botón y no admite `aria-required`: quien lo anuncia es
     * `ColorPickerField`, con un «obligatorio» oculto en la descripción del
     * disparador. Suelto, el obligatorio se dice en el texto.
     */
    required?: boolean;
    /** Nombre accesible del disparador cuando va suelto. */
    'aria-label'?: string;
    /** Lo pone el campo: la etiqueta nombra el disparador. */
    'aria-labelledby'?: string;
    /** Ids de ayuda/error que describen el disparador (lo pone el campo). */
    'aria-describedby'?: string;
    /**
     * Nombre del panel. **Sin default**: sin él, sale de `colorPicker.dialog`.
     * En un campo lo pone la etiqueta.
     */
    dialogLabel?: string;
    /** Texto de «Quitar color». **Sin default**: sin él, `colorPicker.clear`. */
    clearLabel?: string;
    /**
     * Disparador propio en lugar de la muestra: un `Toggle` con icono, un
     * `Button`… Como el `trigger` de `Popover`, recibe las props del disparador
     * por `render`, así que tiene que reenviarlas (y el `ref`) a su elemento.
     * El selector le añade `id`, `disabled`, `aria-haspopup`, `aria-expanded`,
     * `aria-invalid`, `aria-label` / `aria-labelledby` y la descripción con el
     * valor actual; lo que el elemento ya traiga gana, salvo la descripción, que
     * se suma, y `disabled`, que basta con que lo diga uno. Lo que pinte dentro
     * (y su `pressed`, si es un `Toggle`) lo decide quien lo usa.
     */
    trigger?: ReactElement<Record<string, unknown>>;
    /**
     * Coloca el panel contra un elemento que no es el disparador —la celda de una
     * tabla— (la prop `anchor` de `Popover`). Sin `trigger`, no se pinta ningún
     * disparador: el panel se abre solo con `open`, y al cerrarse el foco vuelve
     * a donde estaba antes de abrir.
     */
    anchor?: PopoverAnchor;
    /**
     * Va al **disparador** cuando lo pinta el selector (la muestra) y al
     * **panel** cuando el disparador lo trae el consumidor (`trigger`) o no hay
     * ninguno (`anchor`): un disparador propio ya lleva sus clases (D65; hasta
     * la v50 iba al contenedor). Se añade DESPUÉS de las clases propias. El
     * panel se personaliza con tokens.
     */
    className?: string;
}
/**
 * Selector de color: una muestra que abre un panel con el área de saturación
 * y brillo, la banda de tono, la de opacidad (con `alpha`), el campo hex y los
 * predefinidos. Emite siempre hex en minúsculas.
 *
 * Todo es Base UI salvo el área 2D: el `Popover` (foco, portal, cierre), las
 * bandas (`Slider`) y el campo (`Input`) son los de brand. El `ref` va al
 * disparador, sea la muestra o el `trigger` propio.
 */
export declare const ColorPicker: import("react").ForwardRefExoticComponent<ColorPickerProps & import("react").RefAttributes<HTMLButtonElement>>;
