import type { ReactNode } from 'react';
import './RecoveryCodes.css';
export interface RecoveryCodesLabels {
    /** Nombre accesible de la lista numerada. */
    list: string;
    /** Rótulo visible del botón que copia todos los códigos. */
    copy: string;
    /** Acuse del botón de copiar, mientras dura. */
    copied: string;
}
export interface RecoveryCodesProps {
    /** Los códigos, en el orden en que se numeran. */
    codes: string[];
    /** Columnas de la rejilla en pantallas anchas. En móvil siempre es 1. */
    columns?: 1 | 2 | 3;
    /**
     * Textos del componente. Sin default: los códigos de recuperación son
     * credenciales de seguridad y el texto que las rodea no debe quedar a
     * medias traducir — quien lo use pasa los tres.
     */
    labels: RecoveryCodesLabels;
    /**
     * Acciones propias del producto (descargar, imprimir…), a continuación del
     * botón de copiar. `brand` no implementa descarga ni impresión: ese gesto
     * depende de cómo genera y sirve el archivo cada producto.
     */
    actions?: ReactNode;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
    id?: string;
}
/**
 * Códigos de recuperación de un solo uso (2FA): una lista numerada,
 * monoespaciada, que se enseña una vez. No es un `CodeBlock` — no hay
 * lenguaje que resaltar ni código que ejecutar, son credenciales — y no
 * ofrece "ver otra vez": quien la monta decide si el usuario ya los guardó.
 *
 * La numeración es real (`<ol>`), no decorativa: un lector de pantalla
 * anuncia "código 3 de 10" en vez de una lista plana. La rejilla es CSS
 * `columns`, así que el orden de lectura sigue siendo el del documento
 * (arriba a abajo dentro de una columna, luego la siguiente) — no un grid que
 * numeraría en zigzag.
 *
 * Solo trae el botón de copiar todos; descargar o imprimir el archivo es
 * decisión de producto (nombre de archivo, formato, disparo de
 * `window.print()`…) y entra por el slot `actions`.
 */
export declare function RecoveryCodes({ codes, columns, labels, actions, className, id, }: RecoveryCodesProps): import("react/jsx-runtime").JSX.Element;
