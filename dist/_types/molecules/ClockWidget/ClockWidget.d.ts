import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { type ClockEntry } from './clockDuration';
import './ClockWidget.css';
export type { ClockEntry } from './clockDuration';
/**
 * El estado del día. `working` es el único en el que se ficha: en los otros
 * tres el widget enseña por qué no hay nada que fichar y no pinta el botón.
 */
export type ClockWidgetDayState = 'working' | 'non-working' | 'vacation' | 'absence';
/**
 * Los textos del fichaje. Todo es **cromo**: el título del widget, los dos
 * botones, los encabezados de la tabla de tramos y cómo se nombran los tres
 * días en los que no se ficha. Las horas no pasan por aquí —son formato, y
 * salen de `locale` con `Intl`—, pero la **duración** sí: «2 h 14 min» se
 * escribe distinto en cada idioma, así que es una función del catálogo.
 */
export interface ClockWidgetMessages {
    /** Título del widget. */
    title: string;
    /** Botón que abre el turno. */
    clockIn: string;
    /** Botón que lo cierra. */
    clockOut: string;
    /** Lo que dice el botón mientras la acción está en vuelo. */
    pending: string;
    /** Etiqueta de la cifra grande: el tiempo trabajado hoy. */
    elapsed: string;
    /** Nombre accesible de la tabla de tramos. */
    entries: string;
    /** Encabezado de la columna de entrada. */
    in: string;
    /** Encabezado de la columna de salida. */
    out: string;
    /** Encabezado de la columna de duración. */
    duration: string;
    /** Lo que se pone en la salida del tramo todavía abierto. */
    running: string;
    /** Etiqueta de la fila de total. */
    total: string;
    /** Un día no laborable. */
    nonWorking: string;
    /** Un día de vacaciones. */
    vacation: string;
    /** Un día de ausencia. */
    absence: string;
    /** Cómo se escribe una duración a partir de sus horas y sus minutos. */
    durationValue: (hours: number, minutes: number) => string;
}
export interface ClockWidgetProps extends Omit<ComponentPropsWithoutRef<'section'>, 'children' | 'onError'> {
    /** Los tramos del día, en orden. El que no tenga salida es el turno abierto. */
    entries: ClockEntry[];
    /**
     * El día, **ya escrito** («Jueves, 19 de septiembre»). El widget no formatea
     * fechas: eso es `Intl`, y sabe de idiomas y de husos.
     */
    date?: ReactNode;
    /** Estado del día. Default `working`: el único en el que se ficha. */
    dayState?: ClockWidgetDayState;
    /** Se llama al pulsar «fichar entrada». Sin él, el botón no se pinta. */
    onClockIn?: () => void;
    /** Se llama al pulsar «fichar salida». Sin él, el botón no se pinta. */
    onClockOut?: () => void;
    /** La acción está en vuelo: el botón se deshabilita y cambia de texto. */
    pending?: boolean;
    /** Deshabilita el botón sin que la acción esté en vuelo (sin permiso, fuera de horario…). */
    disabled?: boolean;
    /** Lo que falló al fichar. Se pinta como `Alert` de error, que ya se anuncia. */
    error?: ReactNode;
    /**
     * El instante contra el que se mide el turno abierto. **Sin él el reloj
     * corre solo**, un tic por segundo, mientras haya un tramo abierto. Pasarlo
     * lo congela: es lo que usan los tests y las capturas.
     */
    now?: Date;
    /** Locale de la hora de cada tramo. Default `'es-ES'`. */
    locale?: string;
    /** Zona horaria de la hora de cada tramo. Sin ella, la del navegador. */
    timeZone?: string;
    /** Nivel del título del widget. Default 2. */
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    /** Enseña la tabla de tramos del día. Default `true`. */
    showEntries?: boolean;
    /** El pie del widget: el enlace al histórico de fichajes, por ejemplo. */
    footer?: ReactNode;
    /**
     * Título del widget. Sin él, sale de `clockWidget.title`. Se llama
     * `titleLabel` y no `title` porque `title` ya es un atributo nativo de
     * `<section>` —el bocadillo del navegador— y el widget lo sigue reenviando.
     */
    titleLabel?: string;
    /** Texto del botón de entrada. Sin él, sale de `clockWidget.clockIn`. */
    clockInLabel?: string;
    /** Texto del botón de salida. Sin él, sale de `clockWidget.clockOut`. */
    clockOutLabel?: string;
    /** Texto del botón mientras la acción está en vuelo. Sin él, sale de `clockWidget.pending`. */
    pendingLabel?: string;
    /** Etiqueta de la cifra grande. Sin ella, sale de `clockWidget.elapsed`. */
    elapsedLabel?: string;
    /** Texto del estado del día. Sin él, sale del espacio según `dayState`. */
    dayStateLabel?: ReactNode;
    /** Cómo se escribe una duración. Sin ella, sale de `clockWidget.durationValue`. */
    formatDuration?: (hours: number, minutes: number) => string;
}
/**
 * El fichaje del día: en qué estado está, cuánto se lleva trabajado y los
 * tramos ya fichados.
 *
 * **No ficha, ni sabe de permisos, ni de husos.** Recibe los tramos y llama a
 * `onClockIn`/`onClockOut`; quien lo usa decide qué pasa después y le vuelve a
 * pasar los tramos. Tampoco decide si hoy se trabaja: eso llega en `dayState`.
 *
 * El reloj corre solo mientras haya un tramo abierto —un tic por segundo— y se
 * para al cerrarlo. `now` lo congela, que es lo que hacen los tests y las
 * capturas de regresión visual.
 */
export declare const ClockWidget: import("react").ForwardRefExoticComponent<ClockWidgetProps & import("react").RefAttributes<HTMLElement>>;
