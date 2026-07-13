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
  dark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onValueChange?: (value: string) => void;
  id?: string;
  /** Etiqueta accesible del trigger. Si no se pasa, usa el placeholder. */
  'aria-label'?: string;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Partes compuestas — un motor (Radix), dos capas. Cada parte reenvía las props
 * del primitivo Radix + `{...rest}` (para `data-*`/`aria-*` inyectados por el
 * consumidor, p. ej. FormControl vía Slot) y concatena `className` al final.
 * ───────────────────────────────────────────────────────────────────────────── */

/** Raíz del Select (Radix Root re-exportado). */
const SelectRoot = RadixSelect.Root;

/** Valor/placeholder del trigger (Radix Value re-exportado). */
const SelectValue = RadixSelect.Value;

/** Agrupa opciones (Radix Group, no visual). */
const SelectGroup = RadixSelect.Group;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger> {
  size?: 'sm' | 'md' | 'lg';
}

/** Trigger del Select: botón `.select` con el chevron del DS. Los children son el `Select.Value`. */
const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
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
  dark?: boolean;
}

/** Dropdown del Select: Portal → Content (`.select__content`) → Viewport. `position`/`sideOffset` del DS. */
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { size = 'md', dark = false, className, children, position = 'popper', sideOffset = -1, ...rest }, ref) {
  const classes = [
    'select__content',
    size !== 'md' ? `select__content--${size}` : '',
    dark ? 'select__content--dark' : '',
    className ?? '',
  ].filter(Boolean).join(' ');
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content ref={ref} className={classes} position={position} sideOffset={sideOffset} {...rest}>
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
});

export interface SelectItemProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Item> {}

/** Opción del Select (`.select__item`). Los children (texto o JSX) van en `ItemText`. */
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...rest }, ref) {
  const classes = ['select__item', className ?? ''].filter(Boolean).join(' ');
  return (
    <RadixSelect.Item ref={ref} className={classes} {...rest}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

export interface SelectLabelProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Label> {}

/** Etiqueta de grupo (`.select__label`, tipografía del label del DS). */
const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, children, ...rest }, ref) {
  const classes = ['select__label', className ?? ''].filter(Boolean).join(' ');
  return (
    <RadixSelect.Label ref={ref} className={classes} {...rest}>
      {children}
    </RadixSelect.Label>
  );
});

export interface SelectSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Separator> {}

/** Separador entre grupos (`.select__separator`). */
const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator(
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
  dark,
  size = 'md',
  onValueChange,
  id,
  'aria-label': ariaLabel,
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
      <SelectContent size={size} dark={dark}>
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
