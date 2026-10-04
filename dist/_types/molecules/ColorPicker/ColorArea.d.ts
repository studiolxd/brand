/** Saturación y brillo, de 0 a 100. */
export interface AreaValue {
    s: number;
    v: number;
}
interface ColorAreaProps {
    /** Tono del fondo del área, ya en hex opaco. */
    hueColor: string;
    saturation: number;
    brightness: number;
    /** Mientras se arrastra o con cada tecla. */
    onChange: (value: AreaValue) => void;
    /** Al soltar el puntero, o con cada tecla. */
    onCommit: (value: AreaValue) => void;
    label: string;
    roleDescription: string;
    valueText: string;
    disabled?: boolean;
}
/**
 * El área de saturación × brillo: la única pieza del selector que no sale de
 * Base UI, porque Base UI no tiene un deslizador de dos dimensiones.
 *
 * Accesibilidad: la APG de WAI-ARIA no define un patrón de deslizador 2D, así
 * que se sigue su **patrón Slider** extendido a dos ejes, que es lo que hacen
 * los selectores de color accesibles: el pulgar es **un** `role="slider"`
 * enfocable, con `aria-roledescription` que dice que es bidimensional,
 * `aria-valuenow` en el eje horizontal (saturación) y `aria-valuetext` con los
 * dos valores, que es lo que lee el lector de pantalla en cada cambio.
 *
 * Teclado —el del patrón Slider, en dos ejes—:
 * - `←`/`→`: saturación ±1 (en RTL, `→` resta: la flecha va hacia donde se
 *   mueve el pulgar). `↑`/`↓`: brillo ±1.
 * - `Mayús`+flecha: el mismo eje ±10.
 * - `RePág`/`AvPág`: brillo ±10. Con `Mayús`, saturación ±10.
 * - `Inicio`/`Fin`: saturación al mínimo y al máximo. Con `Ctrl`, el brillo.
 *
 * Puntero (ratón, lápiz y táctil): el área captura el puntero al pulsar
 * (`setPointerCapture`), así que el arrastre sigue aunque se salga del área
 * —y no cuenta como clic fuera del panel, porque empezó dentro—. El foco pasa
 * al pulgar al pulsar, para que el teclado siga donde se dejó el ratón.
 *
 * La dirección es la de Base UI (`DirectionProvider`), la misma que invierte
 * las bandas: en RTL la saturación crece hacia la izquierda.
 *
 * La posición del pulgar y el tono del fondo se escriben por el CSSOM
 * (`useCssProperties`): el área solo existe dentro del panel, que se pinta en
 * cliente, así que no hay HTML de servidor que la CSP pudiera descartar.
 */
export declare const ColorArea: import("react").ForwardRefExoticComponent<ColorAreaProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
