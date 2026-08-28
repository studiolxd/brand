import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './StatTile.css';
export type StatTileDirection = 'up' | 'down' | 'flat';
export type StatTileTone = 'positive' | 'negative' | 'neutral';
export interface StatTileDelta {
    /** La variación, ya formateada: «+12 %», «−3», «igual». */
    value: ReactNode;
    /** Hacia dónde se ha movido la cifra. Pone la flecha. */
    direction?: StatTileDirection;
    /**
     * Si el movimiento es bueno o malo. Por defecto subir es bueno; en una
     * métrica donde subir es malo (errores, latencia, bajas), se invierte.
     */
    tone?: StatTileTone;
    /**
     * Cómo se lee la dirección para un lector de pantalla, que no ve la flecha.
     * Default castellano según `direction`.
     */
    label?: string;
}
export interface StatTileProps extends Omit<ComponentPropsWithoutRef<'div'>, 'title'> {
    /** Qué se está midiendo. */
    label: ReactNode;
    /** La cifra, ya formateada por quien la tiene (moneda, separadores, unidades). */
    value: ReactNode;
    /** Variación respecto al periodo anterior. */
    delta?: StatTileDelta;
    /** Una línea de contexto bajo la cifra: el periodo, la fuente, la salvedad. */
    description?: ReactNode;
    /** Icono junto a la etiqueta. Decorativo: la etiqueta ya dice qué es. */
    icon?: ReactNode;
    /** Talla de la baldosa. */
    size?: 'sm' | 'md';
}
/**
 * La baldosa de una cifra: qué se mide, cuánto vale, cómo se ha movido y qué
 * matiza esa lectura. Es la pieza de los paneles de KPIs; la rejilla la pone
 * `Columns`, que no sabe nada de cifras.
 *
 * La baldosa **no calcula ni formatea**: recibe la cifra y el delta ya
 * escritos. El formato de un número depende de la moneda, del idioma y de la
 * unidad, y todo eso lo sabe el producto, no el sistema.
 *
 * Reenvía el resto de props del elemento (`data-*`, `aria-*`, `id`…) y
 * concatena `className` tras las clases propias.
 */
export declare const StatTile: import("react").ForwardRefExoticComponent<StatTileProps & import("react").RefAttributes<HTMLDivElement>>;
