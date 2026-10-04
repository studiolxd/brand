'use client';

import { forwardRef, useCallback, useRef } from 'react';
import { useDirection } from '@base-ui/react/direction-provider';
import { useCssProperties } from '../../constants/css-properties';

/** Saturación y brillo, de 0 a 100. */
export interface AreaValue {
  s: number;
  v: number;
}

interface ColorAreaProps {
  /** Tono del fondo del área, ya en hex opaco. */
  hueColor: string;
  saturation: number;
  brightness: number;
  /** Mientras se arrastra o con cada tecla. */
  onChange: (value: AreaValue) => void;
  /** Al soltar el puntero, o con cada tecla. */
  onCommit: (value: AreaValue) => void;
  label: string;
  roleDescription: string;
  valueText: string;
  disabled?: boolean;
}

/** Paso de una flecha y salto grande (Mayús+flecha, RePág/AvPág). */
const STEP = 1;
const LARGE_STEP = 10;

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * El área de saturación × brillo: la única pieza del selector que no sale de
 * Base UI, porque Base UI no tiene un deslizador de dos dimensiones.
 *
 * Accesibilidad: la APG de WAI-ARIA no define un patrón de deslizador 2D, así
 * que se sigue su **patrón Slider** extendido a dos ejes, que es lo que hacen
 * los selectores de color accesibles: el pulgar es **un** `role="slider"`
 * enfocable, con `aria-roledescription` que dice que es bidimensional,
 * `aria-valuenow` en el eje horizontal (saturación) y `aria-valuetext` con los
 * dos valores, que es lo que lee el lector de pantalla en cada cambio.
 *
 * Teclado —el del patrón Slider, en dos ejes—:
 * - `←`/`→`: saturación ±1 (en RTL, `→` resta: la flecha va hacia donde se
 *   mueve el pulgar). `↑`/`↓`: brillo ±1.
 * - `Mayús`+flecha: el mismo eje ±10.
 * - `RePág`/`AvPág`: brillo ±10. Con `Mayús`, saturación ±10.
 * - `Inicio`/`Fin`: saturación al mínimo y al máximo. Con `Ctrl`, el brillo.
 *
 * Puntero (ratón, lápiz y táctil): el área captura el puntero al pulsar
 * (`setPointerCapture`), así que el arrastre sigue aunque se salga del área
 * —y no cuenta como clic fuera del panel, porque empezó dentro—. El foco pasa
 * al pulgar al pulsar, para que el teclado siga donde se dejó el ratón.
 *
 * La dirección es la de Base UI (`DirectionProvider`), la misma que invierte
 * las bandas: en RTL la saturación crece hacia la izquierda.
 *
 * La posición del pulgar y el tono del fondo se escriben por el CSSOM
 * (`useCssProperties`): el área solo existe dentro del panel, que se pinta en
 * cliente, así que no hay HTML de servidor que la CSP pudiera descartar.
 */
export const ColorArea = forwardRef<HTMLDivElement, ColorAreaProps>(function ColorArea(
  {
    hueColor,
    saturation,
    brightness,
    onChange,
    onCommit,
    label,
    roleDescription,
    valueText,
    disabled = false,
  },
  thumbRef,
) {
  const rtl = useDirection() === 'rtl';
  const areaRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef<number | null>(null);
  // El último punto del arrastre: lo escriben `pointerdown` y `pointermove`, y
  // lo lee `pointerup` para guardar.
  const last = useRef<AreaValue>({ s: 0, v: 0 });

  const writeProperties = useCssProperties({
    // `left` físico: la dirección ya está resuelta aquí, así que el pulgar y el
    // degradado se ponen de acuerdo sin depender del `dir` del documento.
    '--color-picker-area-x': `${rtl ? 100 - saturation : saturation}%`,
    '--color-picker-area-y': `${100 - brightness}%`,
    '--color-picker-area-hue': hueColor,
  });

  const setAreaRef = useCallback(
    (element: HTMLDivElement | null) => {
      areaRef.current = element;
      writeProperties(element);
    },
    [writeProperties],
  );

  const fromPointer = (event: React.PointerEvent<HTMLDivElement>): AreaValue => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.width ? (event.clientX - rect.left) / rect.width : 0;
    const y = rect.height ? (event.clientY - rect.top) / rect.height : 0;
    const s = clamp((rtl ? 1 - x : x) * 100);
    const v = clamp((1 - y) * 100);
    return { s, v };
  };

  const focusThumb = () => {
    const thumb = typeof thumbRef === 'function' ? null : thumbRef?.current;
    (thumb ?? areaRef.current?.querySelector<HTMLElement>('[role="slider"]'))?.focus({ preventScroll: true });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || event.button !== 0) return;
    // Sin el `preventDefault` el navegador seleccionaría texto al arrastrar y
    // se llevaría el foco al área en vez de al pulgar.
    event.preventDefault();
    // Un puntero sintético (un test, una herramienta de accesibilidad) no está
    // «activo» para el navegador y la captura lanza: el arrastre sigue igual
    // mientras los eventos lleguen al área.
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {
      /* sin captura */
    }
    dragging.current = event.pointerId;
    focusThumb();
    const next = fromPointer(event);
    last.current = next;
    onChange(next);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current !== event.pointerId) return;
    const next = fromPointer(event);
    last.current = next;
    onChange(next);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current !== event.pointerId) return;
    dragging.current = null;
    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {
      /* sin captura */
    }
    onCommit(last.current);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const step = event.shiftKey ? LARGE_STEP : STEP;
    let { s, v } = { s: saturation, v: brightness };
    switch (event.key) {
      case 'ArrowRight':
        s += rtl ? -step : step;
        break;
      case 'ArrowLeft':
        s += rtl ? step : -step;
        break;
      case 'ArrowUp':
        v += step;
        break;
      case 'ArrowDown':
        v -= step;
        break;
      case 'PageUp':
        if (event.shiftKey) s += LARGE_STEP;
        else v += LARGE_STEP;
        break;
      case 'PageDown':
        if (event.shiftKey) s -= LARGE_STEP;
        else v -= LARGE_STEP;
        break;
      case 'Home':
        if (event.ctrlKey || event.metaKey) v = 0;
        else s = 0;
        break;
      case 'End':
        if (event.ctrlKey || event.metaKey) v = 100;
        else s = 100;
        break;
      default:
        return;
    }
    event.preventDefault();
    const next = { s: clamp(s), v: clamp(v) };
    onChange(next);
    onCommit(next);
  };

  return (
    <div
      ref={setAreaRef}
      className="color-picker__area"
      data-direction={rtl ? 'rtl' : 'ltr'}
      data-disabled={disabled ? '' : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div
        ref={thumbRef}
        className="color-picker__area-thumb"
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={label}
        aria-roledescription={roleDescription}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(saturation)}
        aria-valuetext={valueText}
        aria-disabled={disabled || undefined}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});
