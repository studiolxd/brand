import type { ReactNode } from 'react';
import './Stepper.css';
export interface StepperStep {
    /** Clave de React. Sin ella se usa la posición. */
    id?: string;
    /** Etiqueta del paso: una o dos palabras («Perfil», «Invitaciones»). */
    label: ReactNode;
    /** Línea corta bajo la etiqueta. Solo se pinta en la forma horizontal. */
    description?: ReactNode;
    /**
     * Si se puede **ir a este paso** haciendo clic en él. Es una propiedad del
     * paso, no del componente: solo el flujo sabe si el suyo se puede completar
     * ya (en un alta, los pasos que vienen después de crear la organización no
     * existen sin ella).
     *
     * Sin declararlo vale lo de siempre: **alcanzables los completados**, porque
     * volver sobre lo hecho siempre se puede. Ponerlo a `true` abre un pendiente;
     * a `false`, cierra un completado. Nada de esto aplica sin `onStepSelect`:
     * sin callback el progreso solo informa. El paso actual nunca es alcanzable
     * —ya se está en él—, se declare lo que se declare.
     *
     * La regla típica —«hacia delante solo con el paso actual completo»— la pone
     * el flujo: el componente no valida nada. Un paso no alcanzable queda
     * **inerte**, no deshabilitado: sin `role` de botón, sin foco y sin cursor de
     * mano, porque un destino al que aún no se puede llegar no es un destino.
     */
    reachable?: boolean;
}
/** Estado de un paso dentro del flujo. Lo deduce el componente de `current`. */
export type StepperStatus = 'completed' | 'current' | 'pending';
export interface StepperLabels {
    /** Se antepone, solo para lectores de pantalla, a la etiqueta de un paso ya hecho. Default: «Completado». */
    completed?: string;
    /** Ídem para el paso actual. Default: «Paso actual». */
    current?: string;
    /** Ídem para un paso que aún no toca. Default: «Pendiente». */
    pending?: string;
}
export interface StepperProps {
    /** Los pasos, en orden. El número lo pone el componente. */
    steps: StepperStep[];
    /** Índice (base 0) del paso actual. Los anteriores quedan completados; los siguientes, pendientes. */
    current: number;
    /**
     * Ir a otro paso. Sin este callback ningún paso es interactivo: el progreso
     * solo informa. Qué pasos se pueden alcanzar lo dice cada paso con su
     * `reachable`; por defecto, los completados.
     */
    onStepSelect?: (index: number, step: StepperStep) => void;
    /** Nombre accesible de la lista. Default: «Progreso» (castellano). */
    label?: string;
    /**
     * El texto de la forma compacta (por debajo de `md`), donde no caben las
     * etiquetas. Recibe el número de paso (base 1) y el total.
     * Default: «Paso 2 de 4» (castellano).
     */
    compactLabel?: (current: number, total: number) => string;
    /** Textos de estado para lectores de pantalla. Todos con default castellano. */
    labels?: StepperLabels;
    className?: string;
    id?: string;
}
/**
 * El progreso de un flujo por pasos: dónde está el usuario, qué lleva hecho y
 * qué le queda. Es una lista ordenada de verdad (`ol`) con `aria-current="step"`
 * en el paso actual, así que el orden y la posición los anuncia el navegador
 * sin que nadie los escriba.
 *
 * **No es `Steps`.** `Steps` documenta un proceso (una lista numerada con
 * título y descripción, sin noción de «dónde estoy»); `Stepper` acompaña a un
 * flujo en marcha y tiene estado.
 *
 * Se adapta a lo que hay:
 *
 * - En escritorio, los pasos en fila con su etiqueta; por debajo de `md`
 *   degrada a la forma compacta («Paso 2 de 4» y la etiqueta del paso actual),
 *   que es lo único que cabe.
 * - **Con un solo paso no pinta nada**: un «paso 1 de 1» es ruido. Es lo que
 *   permite que una plantilla monte siempre el hueco del progreso y sea el
 *   flujo quien decida si hay algo que contar.
 *
 * Con `onStepSelect` los pasos alcanzables son botones. Cuáles lo son no lo
 * decide el componente: por defecto los completados —volver sobre lo hecho
 * siempre se puede—, y el flujo abre o cierra los que quiera con el
 * `reachable` de cada paso, porque solo él sabe cuáles se pueden completar ya.
 * El paso actual nunca es un botón: ya se está en él.
 */
export declare function Stepper({ steps, current, onStepSelect, label, compactLabel, labels, className, id, }: StepperProps): import("react/jsx-runtime").JSX.Element | null;
