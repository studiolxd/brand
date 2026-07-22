/* eslint-disable react-refresh/only-export-components --
   Partes re-exportadas de Radix (`SelectRoot`/`Value`/`Group`) + namespace
   compuesto (`Object.assign`): fast-refresh no las reconoce como componentes. El
   patrón es intencional (DX cliente + RSC-safe) y fast-refresh no aplica a source
   de librería. */
import { forwardRef } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Icon } from '../Icon/Icon';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  /** Etiqueta accesible de la opción. Si no se pasa, usa label. */
  'aria-label'?: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  /** Placeholder del trigger. Default: "Seleccionar…" (en la API compuesta lo pone cada consumidor vía `Select.Value`). */
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onValueChange?: (value: string) => void;
  id?: string;
  /** Etiqueta accesible del trigger. Si no se pasa, usa el placeholder. */
  'aria-label'?: string;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a Radix
   * `Portal.container`). Por defecto Radix lo monta en `document.body`,
   * que hereda el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`)
   * sin configuración adicional. Solo hace falta pasar `container` cuando
   * el Select vive dentro de un `.surface-dark` **anidado** (no en la raíz):
   * ese contexto no llega a `document.body` por la cascada, así que hay que
   * montar el portal dentro del propio contenedor con la clase.
   */
  container?: React.ComponentPropsWithoutRef<typeof RadixSelect.Portal>['container'];
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Partes compuestas — un motor (Radix), dos capas. Cada parte reenvía las props
 * del primitivo Radix + `{...rest}` (para `data-*`/`aria-*` inyectados por el
 * consumidor, p. ej. FormControl vía Slot) y concatena `className` al final.
 * ───────────────────────────────────────────────────────────────────────────── */

/** Raíz del Select (Radix Root re-exportado). */
export const SelectRoot = RadixSelect.Root;

/** Valor/placeholder del trigger (Radix Value re-exportado). */
export const SelectValue = RadixSelect.Value;

/** Agrupa opciones (Radix Group, no visual). */
export const SelectGroup = RadixSelect.Group;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> {
  size?: 'sm' | 'md' | 'lg';
}

/** Trigger del Select: botón `.select` con el chevron del DS. Los children son el `Select.Value`. */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { size = 'md', className, children, ...rest }, ref) {
  const classes = ['select', size !== 'md' ? `select--${size}` : '', className ?? '']
    .filter(Boolean).join(' ');
  return (
    <RadixSelect.Trigger ref={ref} className={classes} {...rest}>
      {children}
      <RadixSelect.Icon asChild>
        <Icon
          name="chevron"
          className="select__icon"
          size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
        />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
});

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Content> {
  size?: 'sm' | 'md' | 'lg';
  /** Ver `SelectProps.container`. */
  container?: React.ComponentPropsWithoutRef<typeof RadixSelect.Portal>['container'];
}

/** Dropdown del Select: Portal → Content (`.select__content`) → Viewport. `position`/`sideOffset` del DS. */
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { size = 'md', container, className, children, position = 'popper', sideOffset = -1, ...rest }, ref) {
  const classes = [
    'select__content',
    size !== 'md' ? `select__content--${size}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');
  return (
    <RadixSelect.Portal container={container}>
      <RadixSelect.Content ref={ref} className={classes} position={position} sideOffset={sideOffset} {...rest}>
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Item>;

/** Opción del Select (`.select__item`). Los children (texto o JSX) van en `ItemText`. */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...rest }, ref) {
  const classes = ['select__item', className ?? ''].filter(Boolean).join(' ');
  return (
    <RadixSelect.Item ref={ref} className={classes} {...rest}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Label>;

/** Etiqueta de grupo (`.select__label`, tipografía del label del DS). */
export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, children, ...rest }, ref) {
  const classes = ['select__label', className ?? ''].filter(Boolean).join(' ');
  return (
    <RadixSelect.Label ref={ref} className={classes} {...rest}>
      {children}
    </RadixSelect.Label>
  );
});

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>;

/** Separador entre grupos (`.select__separator`). */
export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator(
  { className, ...rest }, ref) {
  const classes = ['select__separator', className ?? ''].filter(Boolean).join(' ');
  return <RadixSelect.Separator ref={ref} className={classes} {...rest} />;
});

/* ─────────────────────────────────────────────────────────────────────────────
 * API cerrada (data-driven) — rebasada SOBRE las partes: una sola fuente de
 * estilos/estructura. La API pública es idéntica a la anterior.
 * ───────────────────────────────────────────────────────────────────────────── */

function SelectClosed({
  options,
  value,
  defaultValue,
  placeholder = 'Seleccionar…',
  disabled,
  readOnly,
  size = 'md',
  onValueChange,
  id,
  'aria-label': ariaLabel,
  container,
}: SelectProps) {
  return (
    <SelectRoot
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      open={readOnly ? false : undefined}
      onOpenChange={readOnly ? () => {} : undefined}
      onValueChange={readOnly ? undefined : onValueChange}
    >
      <SelectTrigger size={size} id={id} aria-label={ariaLabel ?? placeholder} aria-readonly={readOnly || undefined}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent size={size} container={container}>
        {options.map(({ value: v, label, 'aria-label': optionAriaLabel }) => (
          <SelectItem key={v} value={v} aria-label={optionAriaLabel}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

/**
 * Select. Dos formas de uso:
 * - **Cerrada (data-driven)**: `<Select options={[…]} value onValueChange … />`.
 * - **Compuesta**: `<Select.Root><Select.Trigger><Select.Value/></Select.Trigger>
 *   <Select.Content><Select.Item/>…</Select.Content></Select.Root>` — para labels
 *   JSX, grupos, o inyección de props del consumidor (FormControl) en el trigger.
 *
 * Ambas comparten el mismo motor Radix y las mismas clases: la cerrada está
 * implementada sobre las partes.
 *
 * Las partes están disponibles también como **named exports** (`SelectTrigger`,
 * `SelectContent`, `SelectItem`…): en **Server Components (RSC)** usa los named
 * exports — el namespace (`Select.Trigger`) requiere contexto cliente.
 */
export const Select = Object.assign(SelectClosed, {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Content: SelectContent,
  Group: SelectGroup,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
});
