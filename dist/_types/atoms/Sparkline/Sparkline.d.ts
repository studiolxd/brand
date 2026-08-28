import './Sparkline.css';
export interface SparklineProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'values' | 'color'> {
    /** Serie a dibujar, en orden. Doce puntos es la longitud de referencia. */
    values: number[];
    /** Trazo suelto o trazo con velo por debajo. Default `line`. */
    type?: 'line' | 'area';
    /** Ancho en px. Default 80, espejo de `--sparkline-width`. */
    width?: number;
    /** Alto en px. Default 24, espejo de `--sparkline-height`. */
    height?: number;
    /** Punto al final de la serie, en el color de acento. Default `true`. */
    marker?: boolean;
    /** Línea del cero cuando la serie lo cruza. Default `true`. */
    baseline?: boolean;
    /**
     * Color del trazo. Solo una referencia a token (`'var(--chart-series-3)'`).
     * Sin este dato, la chispa va en el gris de atenuación: el dato que se lee es
     * la cifra que tiene al lado.
     */
    color?: string;
    /**
     * Descripción para lectores de pantalla. Sin ella la chispa se marca como
     * decorativa —lo correcto dentro de un `StatTile`, donde la cifra y su
     * variación ya dicen lo que la chispa enseña—.
     */
    ariaLabel?: string;
    /** Se añade DESPUÉS de las clases propias. */
    className?: string;
}
/**
 * La chispa: una serie diminuta sin ejes ni rótulos, para acompañar a una cifra
 * dentro de un `StatTile`. No es un gráfico —no se leen valores en ella—, es la
 * forma de la tendencia.
 */
export declare const Sparkline: import("react").ForwardRefExoticComponent<SparklineProps & import("react").RefAttributes<SVGSVGElement>>;
