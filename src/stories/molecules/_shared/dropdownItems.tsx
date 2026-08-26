import type { ReactNode } from 'react';
import { Menu as BaseMenu } from '@base-ui-components/react/menu';

/* ─────────────────────────────────────────────────────────────────────────────
 * Vocabulario de ítems de TODOS los menús del sistema (Menu, ContextMenu,
 * UserMenu, OrgSwitcher, DropdownField…), rendido sobre el Menu de Base UI.
 * Cada menú pone sus clases; aquí se define el dato y se traduce al primitivo.
 * ───────────────────────────────────────────────────────────────────────────── */

export type MenuButtonItem = {
  type: 'button';
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  /**
   * `false` mantiene el menú abierto tras elegir el ítem — para acciones que
   * se encadenan (marcar varias cosas) o que dejan al usuario donde estaba.
   * Por defecto el menú se cierra.
   */
  closeOnSelect?: boolean;
};

export type MenuLinkItem = {
  type: 'link';
  label: string;
  icon?: ReactNode;
  href: string;
  disabled?: boolean;
  destructive?: boolean;
};

export type MenuSeparatorItem = {
  type: 'separator';
};

/** Rótulo de sección dentro del menú. No es interactivo. */
export type MenuLabelItem = {
  type: 'label';
  label: string;
};

/**
 * Ítem de elección exclusiva. El valor activo lo lleva el menú
 * (`value`/`onValueChange`), como en cualquier grupo de radio.
 */
export type MenuRadioItem = {
  type: 'radio';
  /** Texto del ítem; admite un nodo para, por ejemplo, marcar el idioma con `lang`. */
  label: ReactNode;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  /** `false` deja el menú abierto tras elegir (para marcar varias cosas seguidas). Por defecto se cierra. */
  closeOnSelect?: boolean;
};

export type MenuItem = MenuButtonItem | MenuLinkItem | MenuSeparatorItem | MenuLabelItem | MenuRadioItem;

/**
 * Props del enlace de un ítem. Además de `href`, `children` y `className`,
 * el motor de menú inyecta atributos (role, tabIndex, handlers de teclado…):
 * el `renderLink` del producto debe **propagarlos todos** a su enlace.
 */
export type MenuRenderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  className: string;
};

/** Reenvía TODO lo que inyecta Base UI: un renderLink que solo copie href/className rompe el menú. */
export function defaultRenderLink({ children, ...props }: MenuRenderLinkProps) {
  return <a {...props}>{children}</a>;
}

interface RenderDropdownItemsOptions {
  items: MenuItem[];
  itemClass: (destructive?: boolean) => string;
  separatorClass: string;
  renderLink: (props: MenuRenderLinkProps) => ReactNode;
  /** Clase del rótulo de sección (ítems `label`). Sin ella, no se renderizan. */
  labelClass?: string;
  /** Valor activo del grupo de radio. */
  radioValue?: string;
  onRadioValueChange?: (value: string) => void;
}

function itemContent(label: ReactNode, icon?: ReactNode) {
  if (!icon) return <>{label}</>;
  return (
    <>
      <span aria-hidden="true">{icon}</span>
      {label}
    </>
  );
}

/* Agrupa los ítems `radio` consecutivos: el primitivo exige que vivan dentro
   de un RadioGroup, y una lista puede intercalar radios con otros ítems. */
function chunkByRadio(items: MenuItem[]): Array<{ radio: boolean; items: MenuItem[] }> {
  return items.reduce<Array<{ radio: boolean; items: MenuItem[] }>>((chunks, item) => {
    const radio = item.type === 'radio';
    const last = chunks[chunks.length - 1];
    if (last && last.radio === radio) last.items.push(item);
    else chunks.push({ radio, items: [item] });
    return chunks;
  }, []);
}

export function renderDropdownItems({
  items,
  itemClass,
  separatorClass,
  renderLink,
  labelClass,
  radioValue,
  onRadioValueChange,
}: RenderDropdownItemsOptions): ReactNode {
  const renderOne = (item: MenuItem, key: number): ReactNode => {
    if (item.type === 'separator') {
      return <BaseMenu.Separator key={key} className={separatorClass} />;
    }
    if (item.type === 'label') {
      if (!labelClass) return null;
      return (
        <BaseMenu.Group key={key}>
          <BaseMenu.GroupLabel className={labelClass}>{item.label}</BaseMenu.GroupLabel>
        </BaseMenu.Group>
      );
    }
    if (item.type === 'radio') {
      return (
        <BaseMenu.RadioItem
          key={key}
          className={itemClass()}
          value={item.value}
          disabled={item.disabled}
          // Base UI deja abierto el menú al elegir un radio; en el sistema, elegir cierra
          closeOnClick={item.closeOnSelect !== false}
        >
          {itemContent(item.label, item.icon)}
        </BaseMenu.RadioItem>
      );
    }
    const content = itemContent(item.label, item.icon);
    if (item.type === 'link') {
      if (item.disabled) {
        return (
          <BaseMenu.Item key={key} className={itemClass(item.destructive)} disabled>
            {content}
          </BaseMenu.Item>
        );
      }
      // El enlace lo pone el producto (router); el primitivo le inyecta sus
      // props a través de la función de render.
      return (
        <BaseMenu.Item
          key={key}
          className={itemClass(item.destructive)}
          render={(props) =>
            renderLink({
              ...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>),
              href: item.href,
              className: (props as { className?: string }).className ?? itemClass(item.destructive),
              children: content,
            }) as React.ReactElement
          }
        />
      );
    }
    return (
      <BaseMenu.Item
        key={key}
        className={itemClass(item.destructive)}
        disabled={item.disabled}
        closeOnClick={item.closeOnSelect !== false}
        onClick={
          item.disabled
            ? undefined
            : () => {
                if (item.closeOnSelect === false) {
                  item.onClick();
                  return;
                }
                // Diferido: si la acción abre un diálogo, que el menú termine
                // de cerrarse y devolver el foco antes de que el diálogo lo tome.
                setTimeout(() => item.onClick(), 0);
              }
        }
      >
        {content}
      </BaseMenu.Item>
    );
  };

  const list = items as MenuItem[];
  if (!list.some((item) => item.type === 'radio')) {
    return list.map(renderOne);
  }
  let offset = 0;
  return chunkByRadio(list).map((chunk, index) => {
    const start = offset;
    offset += chunk.items.length;
    const rendered = chunk.items.map((item, i) => renderOne(item, start + i));
    if (!chunk.radio) return rendered;
    return (
      <BaseMenu.RadioGroup
        key={`radio-${index}`}
        value={radioValue}
        onValueChange={(value) => onRadioValueChange?.(String(value))}
      >
        {rendered}
      </BaseMenu.RadioGroup>
    );
  });
}
