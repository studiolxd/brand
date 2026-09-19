import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import './OrgChart.css';
/**
 * Los textos del organigrama. Todo es **cromo**: cómo se llama el lienzo, cómo
 * se nombran los dos grupos de personas de una tarjeta, cómo se dice que no
 * hay nadie en uno de ellos y los cuatro nombres de los controles. Los nombres
 * de departamentos y personas son contenido y los escribe quien los pasa.
 */
export interface OrgChartMessages {
    /** Nombre accesible del lienzo. */
    label: string;
    /** Rótulo del grupo de responsables de una tarjeta. */
    managers: string;
    /** Rótulo del grupo de personas de una tarjeta. */
    members: string;
    /** Cómo se dice que un departamento no tiene responsable. */
    noManagers: string;
    /** Cómo se dice que un departamento no tiene equipo. */
    noMembers: string;
    /** Nombre accesible del botón que pliega un departamento. */
    collapse: (name: string) => string;
    /** Nombre accesible del botón que lo despliega. */
    expand: (name: string) => string;
    /** Nombre accesible del botón de acercar. */
    zoomIn: string;
    /** Nombre accesible del botón de alejar. */
    zoomOut: string;
    /** Nombre accesible del botón que devuelve el zoom a su sitio. */
    zoomReset: string;
}
/** Una persona dentro de un departamento. */
export interface OrgChartPerson {
    id: string;
    /** El nombre, en texto plano. */
    name: string;
    /** Cómo se pinta el nombre. Sin ella, el propio `name`. Admite un enlace a la ficha. */
    label?: ReactNode;
    /** El puesto, bajo el nombre. */
    role?: ReactNode;
}
/** Un departamento: su gente y los departamentos que cuelgan de él. */
export interface OrgChartNode {
    id: string;
    /** El nombre, **en texto plano**: con él se nombra el botón de plegado. */
    name: string;
    /** Cómo se pinta el nombre. Sin ella, el propio `name`. */
    label?: ReactNode;
    /** Quien responde del departamento. */
    managers?: OrgChartPerson[];
    /** El resto del equipo. */
    members?: OrgChartPerson[];
    /** Los departamentos que cuelgan de este. */
    children?: OrgChartNode[];
}
export interface OrgChartProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
    /** Las raíces del árbol. Normalmente una, pero admite varias. */
    nodes: OrgChartNode[];
    /** Los departamentos plegados (controlado). */
    collapsed?: string[];
    /** Los departamentos plegados al montar (no controlado). */
    defaultCollapsed?: string[];
    /** Se llama con la lista entera de plegados. */
    onCollapsedChange?: (collapsed: string[]) => void;
    /** El zoom (controlado). 1 es el tamaño natural. */
    zoom?: number;
    /** El zoom al montar (no controlado). Default 1. */
    defaultZoom?: number;
    /** Se llama con el zoom nuevo. */
    onZoomChange?: (zoom: number) => void;
    /** Zoom mínimo. Default 0.5. */
    minZoom?: number;
    /** Zoom máximo. Default 1.5. */
    maxZoom?: number;
    /** Cuánto cambia el zoom en cada paso. Default 0.1. */
    zoomStep?: number;
    /** Pinta los tres botones de zoom. Default `true`. */
    showZoom?: boolean;
    /** Lo que va al final de la barra de controles, junto a los botones de zoom. */
    toolbar?: ReactNode;
    /** Enseña los grupos de personas dentro de cada tarjeta. Default `true`. */
    showPeople?: boolean;
    /** Nombre accesible del lienzo. Sin él, sale de `orgChart.label`. */
    label?: string;
    /** Rótulo del grupo de responsables. Sin él, sale de `orgChart.managers`. */
    managersLabel?: string;
    /** Rótulo del grupo de equipo. Sin él, sale de `orgChart.members`. */
    membersLabel?: string;
}
/**
 * El organigrama de departamentos: quién responde de cada uno, quién está
 * dentro y de quién cuelga. Plegable, con zoom y con desplazamiento.
 *
 * **Es un árbol de listas anidadas, no un lienzo de dibujo.** Las líneas las
 * pintan pseudoelementos, así que el orden del documento y el del árbol son el
 * mismo: un lector de pantalla recorre la jerarquía de verdad, no una
 * alternativa en texto escrita aparte. El zoom usa `zoom` y no `transform`
 * porque `zoom` cambia la maqueta: el lienzo sigue sabiendo cuánto mide lo que
 * tiene dentro, y el desplazamiento sigue llegando al final.
 *
 * **No coloca nada**: no hay motor de disposición, ni aristas, ni posiciones.
 * Un árbol se dibuja centrando cada nodo sobre sus hijos, que es lo que hace
 * el CSS solo.
 */
export declare const OrgChart: import("react").ForwardRefExoticComponent<OrgChartProps & import("react").RefAttributes<HTMLDivElement>>;
