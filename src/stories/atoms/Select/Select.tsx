/* eslint-disable react-refresh/only-export-components --
   Partes re-exportadas de Base UI (`SelectGroup`), contexto de etiquetas y
   namespace compuesto (`Object.assign`): fast-refresh no las reconoce como
   componentes. El patrón es intencional (DX cliente + RSC-safe) y fast-refresh
   no aplica a source de librería. */
import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
} from 'react';
import type { ReactNode } from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import type { SeparatorProps as BaseSeparatorProps } from '@base-ui/react/separator';
import { Icon } from '../Icon/Icon';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
  /** Etiqueta accesible de la opción. Si no se pasa, usa label. */
  'aria-label'?: string;
}

/** Nodo DOM donde montar el portal del dropdown (reenviado a `Select.Portal`). */
export type SelectPortalContainer = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Portal
>['container'];

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
  /** Nombre del campo en el formulario: Base UI monta un input oculto con el valor. */
  name?: string;
  required?: boolean;
  /** Se llama al salir del disparador (react-hook-form lo usa para validar). */
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  /** Nombre accesible cuando el Select va suelto. En un campo lo nombra la etiqueta (`htmlFor`), que este atributo pisaría: no lo pongas ahí. */
  'aria-label'?: string;
  /** Ids de ayuda/error que describen el control (lo pone el campo). */
  'aria-describedby'?: string;
  /** Estado de error accesible (lo pone el campo). */
  'aria-invalid'?: boolean;
  /**
   * Nodo DOM donde montar el portal del dropdown (reenviado a `Select.Portal`
   * de Base UI). Por defecto el portal se monta en `document.body`, que hereda
   * el tema activado a nivel raíz (`html.dark`/`[data-theme="dark"]`) sin
   * configuración adicional. Solo hace falta pasar `container` cuando el Select
   * vive dentro de un `.surface-dark` **anidado** (no en la raíz): ese contexto
   * no llega a `document.body` por la cascada, así que hay que montar el portal
   * dentro del propio contenedor con la clase.
   */
  container?: SelectPortalContainer;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Partes compuestas — un motor (Base UI), dos capas. Cada parte reenvía las
 * props del primitivo Base UI + `{...rest}` (para `data-*`/`aria-*` inyectados
 * por el consumidor) y concatena `className` al final.
 * ───────────────────────────────────────────────────────────────────────────── */

/**
 * Etiquetas de las opciones, indexadas por valor. Base UI muestra en el trigger
 * el valor crudo salvo que se le pasen los `items`; el Root las recoge del árbol
 * de `Select.Item` y `Select.Value` las resuelve desde aquí.
 */
const SelectLabelsContext = createContext<Map<string, ReactNode> | null>(null);

function collectItemLabels(node: ReactNode, acc: Map<string, ReactNode>): void {
  Children.forEach(node, (child) => {
    if (!isValidElement(child)) return;
    const props = (child.props ?? {}) as { value?: unknown; children?: ReactNode };
    // Una opción es cualquier elemento con `value` de texto: el propio
    // `Select.Item` o un wrapper del producto que lo envuelva.
    if (child.type === SelectItem || (typeof props.value === 'string' && child.type !== SelectRoot)) {
      if (typeof props.value === 'string') acc.set(props.value, props.children);
      return;
    }
    if (props.children != null) collectItemLabels(props.children, acc);
  });
}

type BaseSelectRootProps = React.ComponentProps<typeof BaseSelect.Root<string>>;

export interface SelectRootProps
  extends Omit<BaseSelectRootProps, 'onValueChange' | 'multiple'> {
  onValueChange?: (value: string) => void;
}

/** Raíz del Select (Base UI Root + índice de etiquetas de las opciones). */
export function SelectRoot({ children, onValueChange, ...rest }: SelectRootProps) {
  const labels = useMemo(() => {
    const map = new Map<string, ReactNode>();
    collectItemLabels(children, map);
    return map;
  }, [children]);

  return (
    <SelectLabelsContext.Provider value={labels}>
      <BaseSelect.Root
        onValueChange={onValueChange ? (value) => onValueChange(value as string) : undefined}
        {...rest}
      >
        {children}
      </BaseSelect.Root>
    </SelectLabelsContext.Provider>
  );
}

export interface SelectValueProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseSelect.Value>, 'children'> {
  /** Texto mostrado cuando no hay valor seleccionado. */
  placeholder?: ReactNode;
  children?: ReactNode | ((value: string | null) => ReactNode);
}

/** Valor/placeholder del trigger. */
export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(
  { placeholder, children, ...rest }, ref) {
  const labels = useContext(SelectLabelsContext);

  return (
    <BaseSelect.Value ref={ref} {...rest}>
      {(value: string | null) => {
        if (typeof children === 'function') return children(value);
        if (children != null) return children;
        if (value == null || value === '') return placeholder ?? null;
        return labels?.get(value) ?? value;
      }}
    </BaseSelect.Value>
  );
});

/** Agrupa opciones (Base UI Group, no visual). */
export const SelectGroup = BaseSelect.Group;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Trigger> {
  size?: 'sm' | 'md' | 'lg';
}

/** Trigger del Select: botón `.select` con el chevron del DS. Los children son el `Select.Value`. */
export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(
  { size = 'md', className, children, ...rest }, ref) {
  const classes = ['select', size !== 'md' ? `select--${size}` : '', className ?? '']
    .filter(Boolean).join(' ');
  return (
    <BaseSelect.Trigger ref={ref} className={classes} {...rest}>
      {children}
      <Icon
        name="chevron"
        className="select__icon"
        size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'}
      />
    </BaseSelect.Trigger>
  );
});

export interface SelectContentProps
  extends React.ComponentPropsWithoutRef<typeof BaseSelect.Popup> {
  size?: 'sm' | 'md' | 'lg';
  /** Ver `SelectProps.container`. */
  container?: SelectPortalContainer;
  /** Lado del trigger donde se despliega. */
  side?: React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>['side'];
  /** Alineación respecto al trigger. */
  align?: React.ComponentPropsWithoutRef<typeof BaseSelect.Positioner>['align'];
  sideOffset?: number;
}

/** Dropdown del Select: Portal → Positioner → Popup (`.select__content`). */
export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(
  { size = 'md', container, className, children, side = 'bottom', align = 'start', sideOffset = -1, ...rest }, ref) {
  const classes = [
    'select__content',
    size !== 'md' ? `select__content--${size}` : '',
    className ?? '',
  ].filter(Boolean).join(' ');
  return (
    <BaseSelect.Portal container={container}>
      <BaseSelect.Positioner
        className="select__positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignItemWithTrigger={false}
      >
        <BaseSelect.Popup ref={ref} className={classes} {...rest}>
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
});

export type SelectItemProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Item>;

/** Opción del Select (`.select__item`). Los children (texto o JSX) van en `ItemText`. */
export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { className, children, ...rest }, ref) {
  const classes = ['select__item', className ?? ''].filter(Boolean).join(' ');
  return (
    <BaseSelect.Item ref={ref} className={classes} {...rest}>
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  );
});

export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof BaseSelect.GroupLabel>;

/** Etiqueta de grupo (`.select__label`, tipografía del label del DS). */
export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(function SelectLabel(
  { className, children, ...rest }, ref) {
  const classes = ['select__label', className ?? ''].filter(Boolean).join(' ');
  return (
    <BaseSelect.GroupLabel ref={ref} className={classes} {...rest}>
      {children}
    </BaseSelect.GroupLabel>
  );
});

export type SelectSeparatorProps = Omit<BaseSeparatorProps, 'className'> & { className?: string };

/** Separador entre grupos (`.select__separator`). */
export const SelectSeparator: React.ForwardRefExoticComponent<
  SelectSeparatorProps & React.RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, SelectSeparatorProps>(function SelectSeparator(
  { className, ...rest }, ref) {
  const classes = ['select__separator', className ?? ''].filter(Boolean).join(' ');
  return <BaseSelect.Separator ref={ref} className={classes} {...rest} />;
});

/* ─────────────────────────────────────────────────────────────────────────────
 * API cerrada (data-driven) — rebasada SOBRE las partes: una sola fuente de
 * estilos/estructura. La API pública es idéntica a la anterior.
 * ───────────────────────────────────────────────────────────────────────────── */

const SelectClosed = forwardRef<HTMLButtonElement, SelectProps>(function SelectClosed({
  options,
  value,
  defaultValue,
  placeholder = 'Seleccionar…',
  disabled,
  readOnly,
  size = 'md',
  onValueChange,
  id,
  name,
  required,
  onBlur,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  container,
}: SelectProps, ref) {
  return (
    <SelectRoot
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      readOnly={readOnly}
      name={name}
      required={required}
      onValueChange={onValueChange}
    >
      <SelectTrigger ref={ref} size={size} id={id} onBlur={onBlur} aria-label={ariaLabel} aria-describedby={ariaDescribedBy} aria-invalid={ariaInvalid || undefined}>
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
});

/**
 * Select. Dos formas de uso:
 * - **Cerrada (data-driven)**: `<Select options={[…]} value onValueChange … />`.
 * - **Compuesta**: `<Select.Root><Select.Trigger><Select.Value/></Select.Trigger>
 *   <Select.Content><Select.Item/>…</Select.Content></Select.Root>` — para labels
 *   JSX, grupos, o inyección de props del consumidor (FormControl) en el trigger.
 *
 * Ambas comparten el mismo motor Base UI y las mismas clases: la cerrada está
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
