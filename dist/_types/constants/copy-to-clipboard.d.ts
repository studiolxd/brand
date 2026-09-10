/**
 * Cómo fue el último intento de copiar. `idle` es también el estado al que se
 * vuelve cuando el acuse caduca.
 */
export type CopyStatus = 'idle' | 'copied' | 'error';
/** Cuánto dura el acuse por defecto, en milisegundos. */
export declare const COPY_FEEDBACK_MS = 1500;
/**
 * La conducta de copiar al portapapeles: escribir el texto, acusar un rato y
 * volver al estado inicial. No dibuja nada — el botón, el icono y el anuncio
 * los pone quien la usa.
 *
 * Vive fuera de `CopyButton` porque hay tres sitios que copian con el mismo
 * acuse (`CopyButton`, `CodeBlock` y `DescriptionDetails` con `copyable`) y el
 * `CopyButton` es una molécula: un átomo no puede colgar de él sin invertir
 * las capas. Lo que comparten es la conducta, así que es la conducta lo que se
 * comparte.
 *
 * Si el portapapeles no está disponible —contexto no seguro, permiso
 * denegado— el estado pasa a `error` en vez de fingir que copió; quien la usa
 * decide si lo dice o se calla.
 */
export declare function useCopyToClipboard(feedbackDuration?: number): {
    status: CopyStatus;
    copy: (value: string | (() => string)) => Promise<{
        ok: true;
        text: string;
        error?: undefined;
    } | {
        ok: false;
        text: string;
        error: unknown;
    }>;
};
