'use client';

import { cloneElement, forwardRef, useCallback, useId, useRef, useState } from 'react';
import type { ForwardedRef } from 'react';
import type { ReactElement } from 'react';
import { useDirection } from '@base-ui/react/direction-provider';
import { useRender } from '@base-ui/react/use-render';
import { Button } from '../../atoms/Button/Button';
import { ColorSwatch } from '../../atoms/ColorSwatch/ColorSwatch';
import { Input } from '../../atoms/Input/Input';
import { Popover } from '../../atoms/Popover/Popover';
import type { PopoverAnchor, PopoverChangeDetails } from '../../atoms/Popover/Popover';
import { Slider } from '../../atoms/Slider/Slider';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { useCssProperties } from '../../constants/css-properties';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import { colorPickerEs } from '../../messages/es/colorPicker';
import { RequiredInput } from '../_shared/requiredInput';
import { ColorArea, type AreaValue } from './ColorArea';
import { hexToHsva, hsvaToHex, hueStops, normalizeHex, type Hsva } from './colorModel';
import './ColorPicker.css';

/**
 * El cromo del selector de color. Ninguno trae el castellano puesto: salen
 * del `BrandMessagesProvider` (espacio `colorPicker`), y cada uno se lee
 * **donde se pinta** —un selector sin transparencia no exige `alpha`, uno sin
 * predefinidos no exige `presets`—.
 *
 * Las cifras no son texto: saturación y brillo llegan como números a
 * `areaValue`, y el tono y la opacidad los formatea `Intl` con `locale`.
 */
export interface ColorPickerMessages {
  /** Nombre del disparador cuando va suelto, sin etiqueta ni `aria-label`. */
  trigger: string;
  /** El valor actual, que describe el disparador. Recibe el hex. */
  value: (hex: string) => string;
  /** Descripción del disparador cuando no hay color. */
  empty: string;
  /** Nombre del panel (`role="dialog"`) cuando el selector va suelto. */
  dialog: string;
  /** Nombre del área de saturación y brillo. */
  area: string;
  /** `aria-roledescription` del área: dice que el deslizador tiene dos ejes. */
  areaDescription: string;
  /** Lo que anuncia el área: saturación y brillo, de 0 a 100, ya redondeados. */
  areaValue: (saturation: number, brightness: number) => string;
  /** Nombre de la banda de tono. */
  hue: string;
  /** Nombre de la banda de opacidad (solo con `alpha`). */
  alpha: string;
  /** Nombre del campo hexadecimal. */
  hex: string;
  /** Nombre del grupo de predefinidos (solo con `presets`). */
  presets: string;
  /** Botón de quitar el color (solo con `clearable`). */
  clear: string;
}

/** Un color predefinido: el valor y el nombre con que se anuncia. */
export interface ColorPickerPreset {
  /** Hex de 3, 4, 6 u 8 dígitos. Lo que no sea hex no se ofrece. */
  color: string;
  /** Nombre accesible y rótulo emergente: «Lavanda», «Texto». */
  title: string;
}

export interface ColorPickerProps {
  /**
   * Valor (controlado): un hex. `null` es «sin color». Si llega algo que no es
   * hex (`transparent`, un nombre), la muestra lo pinta tal cual y el panel
   * arranca en negro.
   */
  value?: string | null;
  /** Valor al montar (no controlado). */
  defaultValue?: string | null;
  /**
   * Se llama mientras se elige —en cada paso del arrastre, con cada tecla—,
   * con el hex en minúsculas: `#rrggbb`, o `#rrggbbaa` con `alpha`. Es el sitio
   * de la vista previa.
   */
  onValueChange?: (hex: string) => void;
  /**
   * Se llama al terminar un gesto: al soltar el área o una banda, con cada
   * tecla, al elegir un predefinido o al escribir un hex válido. Es el sitio
   * del guardado.
   */
  onValueCommitted?: (hex: string) => void;
  /**
   * Con transparencia: pinta la banda de opacidad y emite `#rrggbbaa`. Por
   * defecto `false`: emite `#rrggbb` y descarta el alfa de lo que entre.
   */
  alpha?: boolean;
  /** Colores predefinidos, con su nombre: la paleta de un tema. */
  presets?: ColorPickerPreset[];
  /** Añade «Quitar color» al pie del panel. */
  clearable?: boolean;
  /**
   * Se llama al quitar el color, y el panel se cierra (con `open` controlado,
   * lo cierra quien lo controla, aquí mismo). Sin controlar, el valor pasa a
   * `null`.
   */
  onClear?: () => void;
  /**
   * Panel abierto (controlado). Sin él, el panel se abre con el disparador y
   * se cierra con Escape, con un clic fuera o al quitar el color; elegir un
   * color **no** lo cierra. Controlado, quien lo usa puede cerrarlo en
   * `onValueCommitted`.
   */
  open?: boolean;
  /** Panel abierto al montar (no controlado). */
  defaultOpen?: boolean;
  /**
   * Se llama al abrirse y al cerrarse por el disparador, Escape o un clic
   * fuera. El segundo argumento es el detalle de Base UI, como en `Popover`.
   */
  onOpenChange?: (open: boolean, details: PopoverChangeDetails) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Pone el disparador en error (lo hace el campo cuando trae `errorMessage`). */
  error?: boolean;
  /** Locale con que `Intl` formatea el tono y la opacidad. */
  locale?: string;
  /** `id` del disparador: lo apunta el `htmlFor` de la etiqueta. */
  id?: string;
  /** Nombre en el formulario: se monta un input oculto con el hex. */
  name?: string;
  /**
   * El `<form>` no se envía sin color: el campo que sincroniza el hex lleva
   * `required` (y, si se enfoca para avisar, devuelve el foco al disparador).
   * El disparador es un botón y no admite `aria-required`: quien lo anuncia es
   * el grupo de `ColorPickerField`. Suelto, el obligatorio se dice en el texto.
   */
  required?: boolean;
  /** Nombre accesible del disparador cuando va suelto. */
  'aria-label'?: string;
  /** Lo pone el campo: la etiqueta nombra el disparador. */
  'aria-labelledby'?: string;
  /** Ids de ayuda/error que describen el disparador (lo pone el campo). */
  'aria-describedby'?: string;
  /**
   * Nombre del panel. **Sin default**: sin él, sale de `colorPicker.dialog`.
   * En un campo lo pone la etiqueta.
   */
  dialogLabel?: string;
  /** Texto de «Quitar color». **Sin default**: sin él, `colorPicker.clear`. */
  clearLabel?: string;
  /**
   * Disparador propio en lugar de la muestra: un `Toggle` con icono, un
   * `Button`… Como el `trigger` de `Popover`, recibe las props del disparador
   * por `render`, así que tiene que reenviarlas (y el `ref`) a su elemento.
   * El selector le añade `id`, `disabled`, `aria-haspopup`, `aria-expanded`,
   * `aria-invalid`, `aria-label` / `aria-labelledby` y la descripción con el
   * valor actual; lo que el elemento ya traiga gana, salvo la descripción, que
   * se suma, y `disabled`, que basta con que lo diga uno. Lo que pinte dentro
   * (y su `pressed`, si es un `Toggle`) lo decide quien lo usa.
   */
  trigger?: ReactElement<Record<string, unknown>>;
  /**
   * Coloca el panel contra un elemento que no es el disparador —la celda de una
   * tabla— (la prop `anchor` de `Popover`). Sin `trigger`, no se pinta ningún
   * disparador: el panel se abre solo con `open`, y al cerrarse el foco vuelve
   * a donde estaba antes de abrir.
   */
  anchor?: PopoverAnchor;
  /**
   * Va al **disparador** cuando lo pinta el selector (la muestra) y al
   * **panel** cuando el disparador lo trae el consumidor (`trigger`) o no hay
   * ninguno (`anchor`): un disparador propio ya lleva sus clases (D65; hasta
   * la v50 iba al contenedor). Se añade DESPUÉS de las clases propias. El
   * panel se personaliza con tokens.
   */
  className?: string;
}

/** Escribe `node` en un `ref` reenviado, sea función u objeto. */
function assignRef<T>(ref: ForwardedRef<T>, node: T | null) {
  if (typeof ref === 'function') ref(node);
  else if (ref) ref.current = node;
}

/** El origen del modelo cuando no hay color que leer: negro opaco. */
const ORIGIN: Hsva = { h: 0, s: 0, v: 0, a: 1 };

/**
 * Selector de color: una muestra que abre un panel con el área de saturación
 * y brillo, la banda de tono, la de opacidad (con `alpha`), el campo hex y los
 * predefinidos. Emite siempre hex en minúsculas.
 *
 * Todo es Base UI salvo el área 2D: el `Popover` (foco, portal, cierre), las
 * bandas (`Slider`) y el campo (`Input`) son los de brand. El `ref` va al
 * disparador, sea la muestra o el `trigger` propio.
 */
export const ColorPicker = forwardRef<HTMLButtonElement, ColorPickerProps>(function ColorPicker(
  {
    value,
    defaultValue = null,
    onValueChange,
    onValueCommitted,
    alpha = false,
    presets,
    clearable = false,
    onClear,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    size = 'md',
    disabled = false,
    error = false,
    locale = 'es-ES',
    id,
    name,
    required = false,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    dialogLabel,
    clearLabel,
    trigger: customTrigger,
    anchor,
    className,
  },
  ref,
) {
  const t = useBrandMessages('colorPicker', colorPickerEs);
  const rtl = useDirection() === 'rtl';
  const [openInner, setOpenInner] = useState(defaultOpen);
  const open = openProp ?? openInner;

  const controlled = value !== undefined;
  const [inner, setInner] = useState<string | null>(defaultValue);
  const current = controlled ? value : inner;
  const currentHex = current ? normalizeHex(current, alpha) : null;

  // El estado vivo es HSV: ida y vuelta por hex se pierde el tono de un gris.
  // Solo se vuelve a leer del valor cuando el de fuera deja de coincidir con
  // él —otro valor, no el eco del que se acaba de emitir—.
  const [hsva, setHsva] = useState<Hsva>(() => (currentHex && hexToHsva(currentHex)) || ORIGIN);
  const [lastHex, setLastHex] = useState(currentHex);
  if (currentHex !== lastHex) {
    setLastHex(currentHex);
    if (currentHex && hsvaToHex(hsva, alpha) !== currentHex) {
      setHsva(hexToHsva(currentHex) ?? ORIGIN);
    }
  }
  const hex = hsvaToHex(hsva, alpha);
  const opaqueHex = hsvaToHex({ ...hsva, a: 1 }, false);

  const emit = useCallback(
    (next: Hsva, commit: boolean) => {
      const settled = alpha ? next : { ...next, a: 1 };
      setHsva(settled);
      const nextHex = hsvaToHex(settled, alpha);
      if (!controlled) setInner(nextHex);
      onValueChange?.(nextHex);
      if (commit) onValueCommitted?.(nextHex);
    },
    [alpha, controlled, onValueChange, onValueCommitted],
  );

  // El hex mientras se escribe; `null` es «enseña el valor». Se descarta al
  // cerrarse el panel, lo cierre el selector o quien lo controla.
  const [draft, setDraft] = useState<string | null>(null);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setDraft(null);
  }

  const applyDraft = (text: string, commit: boolean) => {
    const normal = normalizeHex(text, alpha);
    const parsed = normal ? hexToHsva(normal) : null;
    if (!parsed) return false;
    // Un hex escrito sin alfa en un selector con alfa es opaco: `parseHex`
    // ya lo lee así.
    emit(parsed, commit);
    return true;
  };

  const handleDraftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setDraft(text);
    const digits = text.trim().replace(/^#/, '').length;
    // Solo se aplica lo que ya es un color completo de la forma que se emite:
    // `#ff` a medio escribir no salta a otro color.
    if (digits === 6 || (alpha && digits === 8)) applyDraft(text, true);
  };

  const settleDraft = () => {
    if (draft !== null) applyDraft(draft, true);
    setDraft(null);
  };

  const handleClear = () => {
    if (!controlled) setInner(null);
    onClear?.();
    if (openProp === undefined) setOpenInner(false);
  };

  const handleOpenChange = (next: boolean, details: PopoverChangeDetails) => {
    if (next && disabled) return;
    if (openProp === undefined) setOpenInner(next);
    onOpenChange?.(next, details);
  };

  const areaThumbRef = useRef<HTMLDivElement | null>(null);
  const valueId = useId();

  const writePanelProperties = useCssProperties({
    // El degradado de tono sale del modelo, no de una lista de colores escrita
    // a mano; y va en la dirección de las bandas de Base UI.
    '--color-picker-hue-gradient': `linear-gradient(to ${rtl ? 'left' : 'right'}, ${hueStops().join(', ')})`,
    '--color-picker-alpha-gradient': `linear-gradient(to ${rtl ? 'left' : 'right'}, transparent, ${opaqueHex})`,
  });

  const areaChange = (next: AreaValue) => emit({ ...hsva, s: next.s, v: next.v }, false);
  const areaCommit = (next: AreaValue) => emit({ ...hsva, s: next.s, v: next.v }, true);

  const normalPresets = (presets ?? [])
    .map((preset) => ({ ...preset, hex: normalizeHex(preset.color, alpha) }))
    .filter((preset): preset is ColorPickerPreset & { hex: string } => preset.hex !== null);

  const rootClass = [
    'color-picker',
    size !== 'md' ? `color-picker--${size}` : '',
    error ? 'color-picker--error' : '',
  ].filter(Boolean).join(' ');

  // El selector pinta su disparador solo sin `trigger` y sin `anchor`: entonces
  // `className` va a la muestra; si no, al panel.
  const paintsTrigger = customTrigger === undefined && anchor === undefined;

  const describedBy = [valueId, ariaDescribedBy].filter(Boolean).join(' ');

  // El disparador, sea la muestra o el propio: a él vuelve el foco cuando el
  // navegador enfoca el campo obligatorio para avisar.
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const setTriggerRef = useCallback(
    (node: HTMLButtonElement | null) => {
      triggerRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );

  const swatchTrigger = (
    <button
      ref={setTriggerRef}
      id={id}
      type="button"
      className={['color-picker__trigger', paintsTrigger ? className : undefined].filter(Boolean).join(' ')}
      disabled={disabled}
      aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : t('trigger'))}
      aria-labelledby={ariaLabel ? undefined : ariaLabelledBy}
      aria-describedby={describedBy}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-invalid={error || undefined}
    >
      <ColorSwatch color={current} className="color-picker__swatch" />
      <VisuallyHidden id={valueId}>
        {current ? t('value')(currentHex ?? current) : t('empty')}
      </VisuallyHidden>
    </button>
  );

  // El disparador propio recibe sus props como el `render` de `Button`: lo
  // que el elemento ya traiga gana, y su `ref` se suma al del selector —el del
  // campo es el que enfoca react-hook-form al fallar la validación—. La
  // descripción se suma, y `disabled` basta con que lo diga uno.
  const ownProps = customTrigger?.props ?? {};
  const renderedTrigger = useRender({
    render: customTrigger && cloneElement(customTrigger, {
      disabled: disabled || ownProps.disabled || undefined,
      'aria-describedby': [describedBy, ownProps['aria-describedby']].filter(Boolean).join(' '),
    }),
    ref: setTriggerRef,
    enabled: customTrigger !== undefined,
    props: {
      id,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabel ? undefined : ariaLabelledBy,
      'aria-haspopup': 'dialog',
      'aria-expanded': open,
      'aria-invalid': error || undefined,
    },
  });

  let trigger: ReactElement | undefined;
  if (renderedTrigger) {
    trigger = renderedTrigger;
  } else if (anchor === undefined) {
    trigger = swatchTrigger;
  }

  return (
    <div className={rootClass}>
      <RequiredInput name={name} value={currentHex ?? ''} required={required} focusTarget={() => triggerRef.current} />
      {customTrigger && (
        // La descripción del disparador propio: no puede ir dentro de un
        // elemento que no es nuestro.
        <VisuallyHidden id={valueId}>
          {current ? t('value')(currentHex ?? current) : t('empty')}
        </VisuallyHidden>
      )}
      <Popover
        trigger={trigger}
        anchor={anchor}
        label={t('dialog', dialogLabel)}
        open={open}
        onOpenChange={handleOpenChange}
        side="bottom"
        align="start"
        initialFocus={areaThumbRef}
        className={['color-picker__popover', paintsTrigger ? undefined : className].filter(Boolean).join(' ')}
      >
        <div ref={writePanelProperties} className="color-picker__panel">
          <ColorArea
            ref={areaThumbRef}
            hueColor={hsvaToHex({ h: hsva.h, s: 100, v: 100, a: 1 }, false)}
            saturation={hsva.s}
            brightness={hsva.v}
            onChange={areaChange}
            onCommit={areaCommit}
            label={t('area')}
            roleDescription={t('areaDescription')}
            valueText={t('areaValue')(Math.round(hsva.s), Math.round(hsva.v))}
          />
          <Slider
            className="color-picker__channel color-picker__channel--hue"
            label={t('hue')}
            min={0}
            max={360}
            step={1}
            value={Math.round(hsva.h)}
            format={{ style: 'unit', unit: 'degree' }}
            locale={locale}
            onValueChange={(h) => emit({ ...hsva, h: h as number }, false)}
            onValueCommitted={(h) => emit({ ...hsva, h: h as number }, true)}
          />
          {alpha && (
            <Slider
              className="color-picker__channel color-picker__channel--alpha"
              label={t('alpha')}
              min={0}
              max={100}
              step={1}
              value={Math.round(hsva.a * 100)}
              format={{ style: 'unit', unit: 'percent' }}
              locale={locale}
              onValueChange={(a) => emit({ ...hsva, a: (a as number) / 100 }, false)}
              onValueCommitted={(a) => emit({ ...hsva, a: (a as number) / 100 }, true)}
            />
          )}
          <Input
            className="color-picker__hex"
            type="text"
            size={size}
            aria-label={t('hex')}
            autoComplete="off"
            spellCheck={false}
            maxLength={alpha ? 9 : 7}
            value={draft ?? hex}
            onChange={handleDraftChange}
            onBlur={settleDraft}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                settleDraft();
              }
            }}
          />
          {normalPresets.length > 0 && (
            <div className="color-picker__presets" role="group" aria-label={t('presets')}>
              {normalPresets.map((preset) => (
                <button
                  key={`${preset.hex}-${preset.title}`}
                  type="button"
                  className="color-picker__preset"
                  title={preset.title}
                  aria-label={preset.title}
                  aria-pressed={preset.hex === hex}
                  onClick={() => emit(hexToHsva(preset.hex) ?? ORIGIN, true)}
                >
                  <ColorSwatch color={preset.hex} className="color-picker__preset-swatch" />
                </button>
              ))}
            </div>
          )}
          {clearable && (
            <Button variant="ghost" size="sm" className="color-picker__clear" onClick={handleClear}>
              {t('clear', clearLabel)}
            </Button>
          )}
        </div>
      </Popover>
    </div>
  );
});
