'use client';

import { forwardRef, useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { useCssProperties } from '../../constants/css-properties';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
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

const acota = (valor: number, min: number, max: number) => Math.min(max, Math.max(min, valor));

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
export const OrgChart = forwardRef<HTMLDivElement, OrgChartProps>(function OrgChart({
  nodes,
  collapsed,
  defaultCollapsed,
  onCollapsedChange,
  zoom,
  defaultZoom = 1,
  onZoomChange,
  minZoom = 0.5,
  maxZoom = 1.5,
  zoomStep = 0.1,
  showZoom = true,
  toolbar,
  showPeople = true,
  label,
  managersLabel,
  membersLabel,
  className,
  ...rest
}, ref) {
  const t = useBrandMessages('orgChart');

  const [plegadosPropios, setPlegadosPropios] = useState<string[]>(defaultCollapsed ?? []);
  const plegados = collapsed ?? plegadosPropios;

  const [zoomPropio, setZoomPropio] = useState(defaultZoom);
  const zoomActual = acota(zoom ?? zoomPropio, minZoom, maxZoom);

  const canvas = useCssProperties({ '--org-chart-zoom': String(zoomActual) });

  const alternar = (id: string) => {
    const siguiente = plegados.includes(id) ? plegados.filter((x) => x !== id) : [...plegados, id];
    if (collapsed === undefined) setPlegadosPropios(siguiente);
    onCollapsedChange?.(siguiente);
  };

  const cambiaZoom = (siguiente: number) => {
    const acotado = acota(Number(siguiente.toFixed(4)), minZoom, maxZoom);
    if (zoom === undefined) setZoomPropio(acotado);
    onZoomChange?.(acotado);
  };

  const grupo = (personas: OrgChartPerson[] | undefined, rótulo: string, vacío: string) => (
    <div className="org-chart__group">
      <span className="org-chart__group-label">{rótulo}</span>
      {personas && personas.length > 0 ? (
        <ul className="org-chart__people">
          {personas.map((persona) => (
            <li className="org-chart__person" key={persona.id}>
              {persona.label ?? persona.name}
              {persona.role ? <span className="org-chart__role">{persona.role}</span> : null}
            </li>
          ))}
        </ul>
      ) : (
        <span className="org-chart__empty">{vacío}</span>
      )}
    </div>
  );

  const pintaNivel = (lista: OrgChartNode[], raíz: boolean): ReactNode => (
    <ul className={['org-chart__level', raíz ? 'org-chart__level--root' : 'org-chart__level--children'].join(' ')}>
      {lista.map((node) => {
        const hijos = node.children ?? [];
        const plegado = plegados.includes(node.id);
        const abierto = hijos.length > 0 && !plegado;

        return (
          <li className="org-chart__node" key={node.id}>
            <div className="org-chart__card">
              <div className="org-chart__header">
                <p className="org-chart__name">{node.label ?? node.name}</p>
                {hijos.length > 0 ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    iconOnly
                    aria-label={plegado ? t('expand')(node.name) : t('collapse')(node.name)}
                    aria-expanded={!plegado}
                    onClick={() => alternar(node.id)}
                  >
                    <Icon name={plegado ? 'chevron-right' : 'chevron-down'} size="sm" />
                  </Button>
                ) : null}
              </div>

              {showPeople ? (
                <div>
                  {grupo(node.managers, t('managers', managersLabel), t('noManagers'))}
                  {grupo(node.members, t('members', membersLabel), t('noMembers'))}
                </div>
              ) : null}
            </div>

            {abierto ? pintaNivel(hijos, false) : null}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div ref={ref} className={['org-chart', className].filter(Boolean).join(' ')} {...rest}>
      {showZoom || toolbar ? (
        <div className="org-chart__toolbar">
          {showZoom ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconOnly
                aria-label={t('zoomOut')}
                disabled={zoomActual <= minZoom}
                onClick={() => cambiaZoom(zoomActual - zoomStep)}
              >
                <Icon name="zoom-out" size="sm" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                iconOnly
                aria-label={t('zoomIn')}
                disabled={zoomActual >= maxZoom}
                onClick={() => cambiaZoom(zoomActual + zoomStep)}
              >
                <Icon name="zoom-in" size="sm" />
              </Button>
              <Button
                type="button"
                variant="text"
                size="sm"
                disabled={zoomActual === 1}
                onClick={() => cambiaZoom(1)}
              >
                {t('zoomReset')}
              </Button>
            </>
          ) : null}
          {toolbar}
        </div>
      ) : null}

      {/* El lienzo recibe el foco para poder recorrerlo con el teclado: un
          contenedor con desplazamiento que no lo recibe deja fuera a quien no
          usa ratón. */}
      <div
        className="org-chart__viewport"
        tabIndex={0}
        role="group"
        aria-label={t('label', label)}
      >
        <div className="org-chart__canvas" ref={canvas}>
          {pintaNivel(nodes, true)}
        </div>
      </div>
    </div>
  );
});
