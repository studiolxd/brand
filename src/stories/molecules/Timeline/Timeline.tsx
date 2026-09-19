'use client';

import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { StepMarker, type StepMarkerTone } from '../../atoms/StepMarker/StepMarker';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import type { IconName } from '../../atoms/Icon/Icon';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './Timeline.css';

/**
 * Los dos textos del historial, y los dos son **cromo**: cómo se llama la
 * lista y cómo se dice, para quien no ve la marca rellena, que un hito es el
 * estado vigente. Ni las fechas ni los nombres pasan por aquí — son contenido,
 * y los escribe quien pasa los hitos.
 */
export interface TimelineMessages {
  /** Nombre accesible del historial cuando la pantalla no le da uno propio. */
  label: string;
  /** Lo que se lee tras el título del hito vigente: «estado actual». */
  current: string;
}

/** El tono de la marca: los mismos ocho que `StepMarker`, sin traducción. */
export type TimelineTone = StepMarkerTone;

/** Un hito del historial: un cambio de estado, con su fecha y quien lo firmó. */
export interface TimelineItem {
  id: string;
  /** El estado al que se pasó: «En revisión», «Contratado». */
  title: ReactNode;
  /**
   * Cuándo pasó, **ya escrito** por quien lo pasa («14 de marzo, 09:12»). El
   * historial no formatea fechas: eso es `Intl` y sabe de idiomas y de husos,
   * cosas que un sistema de diseño no tiene por qué saber.
   */
  date?: ReactNode;
  /** Quién lo hizo. */
  author?: ReactNode;
  /** La nota que se dejó al cambiar de estado. */
  note?: ReactNode;
  /** Tono de la marca. Default `neutral`. */
  tone?: TimelineTone;
  /** Icono dentro de la marca, en vez del punto. */
  icon?: IconName;
  /**
   * El estado vigente. Pinta la marca rellena de su tono y añade el texto de
   * `timeline.current` para quien no la ve. Como mucho uno: si vienen varios,
   * el historial pinta todos (no es él quien decide qué expediente es
   * coherente), pero quien lo usa marca el último.
   */
  current?: boolean;
  /** Acciones del hito (un enlace al documento, un botón de deshacer). */
  actions?: ReactNode;
}

export interface TimelineProps extends Omit<ComponentPropsWithoutRef<'ol'>, 'children'> {
  /** Los hitos, en el orden en que se pintan. */
  items: TimelineItem[];
  /**
   * Nombre accesible del historial. **Sin default**: sin él, sale de
   * `timeline.label` del `BrandMessagesProvider`.
   */
  label?: string;
  /**
   * Lo que se lee tras el título del hito vigente. **Sin default**: sin él,
   * sale de `timeline.current`. Solo se lee cuando hay un hito `current`.
   */
  currentLabel?: string;
  /** Talla de la marca. Default `sm`: el historial es cromo, no un asistente. */
  markerSize?: 'sm' | 'md';
}

/**
 * El historial vertical de un expediente: un hito por cambio de estado, con su
 * fecha, quien lo firmó y la nota que dejó. Es lo que lleva la ficha de un
 * ticket y la de una candidatura.
 *
 * **No ordena ni interpreta.** Pinta los hitos en el orden en que llegan —el
 * más reciente arriba o abajo, lo decide quien lo usa— y no deduce cuál es el
 * estado vigente: se marca con `current`.
 *
 * La lista es una `<ol>`, así que el orden y el número de hitos se anuncian
 * solos; el carril y el color de la marca no son la única señal, porque el
 * estado va escrito en el título de cada hito.
 */
export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline({
  items,
  label,
  currentLabel,
  markerSize = 'sm',
  className,
  ...rest
}, ref) {
  const t = useBrandMessages('timeline');

  return (
    <ol
      ref={ref}
      className={['timeline', className].filter(Boolean).join(' ')}
      aria-label={t('label', label)}
      {...rest}
    >
      {items.map((item, index) => (
        <li className="timeline__item" key={item.id}>
          <span className="timeline__marker">
            <StepMarker
              state={item.current ? 'current' : 'neutral'}
              tone={item.tone ?? 'neutral'}
              size={markerSize}
              icon={item.icon ?? 'dot'}
            />
            {index < items.length - 1 ? <span className="timeline__rail" /> : null}
          </span>

          <div className="timeline__body">
            <p className="timeline__title">
              {item.title}
              {item.current ? <VisuallyHidden>{` (${t('current', currentLabel)})`}</VisuallyHidden> : null}
            </p>

            {item.date || item.author ? (
              <p className="timeline__meta">
                {item.date ? <span className="timeline__date">{item.date}</span> : null}
                {item.author ? <span className="timeline__author">{item.author}</span> : null}
              </p>
            ) : null}

            {item.note ? <p className="timeline__note">{item.note}</p> : null}

            {item.actions ? <div className="timeline__actions">{item.actions}</div> : null}
          </div>
        </li>
      ))}
    </ol>
  );
});
