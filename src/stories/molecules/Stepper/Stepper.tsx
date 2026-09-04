'use client';

import type { ReactNode } from 'react';
import { Icon } from '../../atoms/Icon/Icon';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import './Stepper.css';

export interface StepperStep {
  /** Clave de React. Sin ella se usa la posición. */
  id?: string;
  /** Etiqueta del paso: una o dos palabras («Perfil», «Invitaciones»). */
  label: ReactNode;
  /** Línea corta bajo la etiqueta. Solo se pinta en la forma horizontal. */
  description?: ReactNode;
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
   * Volver a un paso ya completado. Sin este callback ningún paso es
   * interactivo: el progreso solo informa. Los pendientes **nunca** son
   * alcanzables, tampoco con callback — un flujo no se salta hacia delante.
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
 * Volver atrás sí, saltar adelante no: con `onStepSelect` los pasos ya
 * completados son botones; el actual y los pendientes nunca lo son.
 */
export function Stepper({
  steps,
  current,
  onStepSelect,
  label = 'Progreso',
  compactLabel = (paso, total) => `Paso ${paso} de ${total}`,
  labels,
  className,
  id,
}: StepperProps) {
  // Un solo paso (o ninguno) no es un progreso: no hay nada que anunciar.
  if (steps.length < 2) return null;

  const texto = { completed: 'Completado', current: 'Paso actual', pending: 'Pendiente', ...labels };
  const total = steps.length;
  const activo = Math.min(Math.max(current, 0), total - 1);
  const pasoActual = steps[activo];

  return (
    <div id={id} className={['stepper', className].filter(Boolean).join(' ')}>
      <p className="stepper__compact">
        <span className="stepper__compact-count">{compactLabel(activo + 1, total)}</span>
        <span className="stepper__compact-label">{pasoActual.label}</span>
      </p>

      <ol className="stepper__list" aria-label={label}>
        {steps.map((step, index) => {
          const status: StepperStatus = index < activo ? 'completed' : index === activo ? 'current' : 'pending';
          const alcanzable = status === 'completed' && onStepSelect !== undefined;
          const contenido = (
            <>
              <span className="stepper__marker" aria-hidden="true">
                {status === 'completed' ? <Icon name="check" size="sm" className="stepper__check" /> : index + 1}
              </span>
              <span className="stepper__text">
                <VisuallyHidden>{texto[status]}: </VisuallyHidden>
                <span className="stepper__label">{step.label}</span>
                {step.description && <span className="stepper__description">{step.description}</span>}
              </span>
            </>
          );

          return (
            <li key={step.id ?? index} className={`stepper__step stepper__step--${status}`}>
              {alcanzable ? (
                <button type="button" className="stepper__item stepper__item--action" onClick={() => onStepSelect(index, step)}>
                  {contenido}
                </button>
              ) : (
                <span className="stepper__item" aria-current={status === 'current' ? 'step' : undefined}>
                  {contenido}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
