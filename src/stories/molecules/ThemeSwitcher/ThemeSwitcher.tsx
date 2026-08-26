'use client';

import { DropdownField } from '../DropdownField/DropdownField';
import { Menu } from '../Menu/Menu';
import { Button } from '../../atoms/Button/Button';
import { Icon, type IconName } from '../../atoms/Icon/Icon';
import './ThemeSwitcher.css';

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeSwitcherLabels {
  /** Nombre accesible del control. */
  group?: string;
  light?: string;
  dark?: string;
  system?: string;
}

export interface ThemeSwitcherProps {
  /** Tema elegido. `system` sigue la preferencia del sistema operativo. */
  value: Theme;
  /** Cambio de tema. Aplicarlo (clase en `html`) y persistirlo es del producto. */
  onChange?: (theme: Theme) => void;
  labels?: ThemeSwitcherLabels;
  /** `id` del control en compacto (enlaza la etiqueta). */
  id?: string;
  /**
   * `compact`: un `DropdownField` (etiqueta + control rectangular) con el icono y el nombre del tema actual — el del panel.
   * `list`: las tres opciones desplegadas en línea — el del pie.
   * `icon`: solo el icono del tema actual, como botón de icono que abre el menú — para una barra sin sitio.
   */
  variant?: 'compact' | 'list' | 'icon';
  /** Talla del control compacto (32/40/48): `lg` en superficies públicas, `md` en las aplicaciones. */
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const OPTIONS: Array<{ value: Theme; icon: IconName }> = [
  { value: 'light', icon: 'sun' },
  { value: 'dark', icon: 'moon' },
  { value: 'system', icon: 'device-desktop' },
];

/**
 * Selector de tema: claro, oscuro o el del sistema. Mismo patrón que el
 * selector de idioma: en compacto, un campo desplegable con etiqueta y
 * opciones exclusivas; en lista, las opciones desplegadas para el pie. Aplicar el tema y
 * recordarlo es del producto; el componente solo muestra y elige.
 */
export function ThemeSwitcher({ value, onChange, labels, id = 'theme-switcher', variant = 'compact', size = 'md', className }: ThemeSwitcherProps) {
  const text = { group: 'Tema', light: 'Claro', dark: 'Oscuro', system: 'Sistema', ...labels };
  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[2];

  if (variant === 'list') {
    const classes = ['theme-switcher', 'theme-switcher--list', className].filter(Boolean).join(' ');
    return (
      <div className={classes} role="group" aria-label={text.group}>
        <ul className="theme-switcher__list">
          {OPTIONS.map(({ value: option, icon }) => {
            const isCurrent = option === value;
            const cls = ['theme-switcher__option', isCurrent ? 'theme-switcher__option--current' : ''].filter(Boolean).join(' ');
            return (
              <li key={option}>
                {isCurrent ? (
                  // La actual no se pulsa: es un dato, no una acción
                  <span className={cls} aria-current="true">
                    <Icon name={icon} size="sm" />
                    <span>{text[option]}</span>
                  </span>
                ) : (
                  <button type="button" className={cls} onClick={() => onChange?.(option)}>
                    <Icon name={icon} size="sm" />
                    <span>{text[option]}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const items = OPTIONS.map(({ value: option, icon }) => ({
    type: 'radio' as const,
    value: option,
    label: (
      <span className="theme-switcher__item">
        <Icon name={icon} size="sm" />
        {text[option]}
      </span>
    ),
  }));

  if (variant === 'icon') {
    return (
      <Menu
        className={className}
        align="end"
        value={value}
        onValueChange={(next) => onChange?.(next as Theme)}
        items={items}
        trigger={
          <Button variant="ghost" size={size} iconOnly aria-label={`${text.group}: ${text[current.value]}`}>
            <Icon name={current.icon} size="md" />
          </Button>
        }
      />
    );
  }

  const classes = ['theme-switcher', 'theme-switcher--compact', className].filter(Boolean).join(' ');
  return (
    <DropdownField
      id={id}
      label={text.group}
      inline
      size={size}
      className={classes}
      value={value}
      onValueChange={(next) => onChange?.(next as Theme)}
      items={items}
    >
      <Icon name={current.icon} size="sm" />
      {text[current.value]}
    </DropdownField>
  );
}
