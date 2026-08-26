'use client';

import type { ReactNode } from 'react';
import { Label } from '../../atoms/Label/Label';
import { Icon } from '../../atoms/Icon/Icon';
import { Menu, type MenuItem } from '../Menu/Menu';
import './DropdownField.css';

export interface DropdownFieldProps {
  /** `id` del control; enlaza la etiqueta. */
  id: string;
  /** Etiqueta visible. Si no hay, es obligatorio `aria-label`. */
  label?: string;
  /** Oculta la etiqueta visualmente sin quitarla a los lectores de pantalla. */
  labelHidden?: boolean;
  /** Nombre accesible cuando no hay etiqueta visible. */
  'aria-label'?: string;
  /** Opciones del menú (radio para elección exclusiva, botones, enlaces…). */
  items: MenuItem[];
  /** Valor elegido (para los ítems `radio`). */
  value?: string;
  onValueChange?: (value: string) => void;
  /** Lo que muestra el control: el nombre de la opción actual, con icono si lo hay. */
  children: ReactNode;
  /** `inline`: etiqueta delante del control, en línea. Por defecto, encima como el resto de campos. */
  inline?: boolean;
  /** Talla del sistema (32/40/48). En superficies públicas, `lg`; dentro de las aplicaciones, `md`. */
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
  disabled?: boolean;
  className?: string;
}

/**
 * Campo desplegable: una etiqueta (visible u oculta) y un control rectangular
 * a la altura del sistema que abre un `Menu`. Es el Select cuando las
 * opciones no son un `<select>` — llevan icono, son enlaces o acciones — y
 * su cara es la misma que la del Select para que convivan en un formulario.
 */
export function DropdownField({
  id,
  label,
  labelHidden = false,
  'aria-label': ariaLabel,
  items,
  value,
  onValueChange,
  children,
  inline = false,
  size = 'md',
  align = 'start',
  disabled = false,
  className,
}: DropdownFieldProps) {
  const classes = ['dropdown-field', inline ? 'dropdown-field--inline' : '', size !== 'md' ? `dropdown-field--${size}` : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {label && <Label htmlFor={id} hidden={labelHidden} size={size}>{label}</Label>}
      <Menu
        align={align}
        value={value}
        onValueChange={onValueChange}
        items={items}
        trigger={
          <button type="button" id={id} className="dropdown-field__control" aria-label={label ? undefined : ariaLabel} disabled={disabled}>
            <span className="dropdown-field__value">{children}</span>
            <Icon name="chevron" size="sm" className="dropdown-field__icon" aria-hidden="true" />
          </button>
        }
      />
    </div>
  );
}
