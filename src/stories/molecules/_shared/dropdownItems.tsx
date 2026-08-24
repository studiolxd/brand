import type { ReactNode } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ContextMenuItem, ContextMenuRenderLinkProps } from '../ContextMenu/ContextMenu';
import type { MenuItem } from '../Menu/Menu';

interface RenderDropdownItemsOptions {
  items: ContextMenuItem[] | MenuItem[];
  itemClass: (destructive?: boolean) => string;
  separatorClass: string;
  renderLink: (props: ContextMenuRenderLinkProps) => ReactNode;
  /** Clase de los ítems de tipo `label`. Sin ella, los `label` se ignoran. */
  labelClass?: string;
  /** Clase del glifo decorativo de los ítems de tipo `radio`. */
  radioIndicatorClass?: string;
  /** Valor activo del grupo de radio, para pintar el glifo. */
  radioValue?: string;
  onRadioValueChange?: (value: string) => void;
}

function itemContent(label: string, icon?: ReactNode) {
  if (!icon) return <>{label}</>;
  return (
    <>
      <span aria-hidden="true">{icon}</span>
      {label}
    </>
  );
}

/**
 * Agrupa los ítems `radio` consecutivos: Radix exige que vivan dentro de un
 * `RadioGroup`, que es quien conoce el valor activo y emite el cambio.
 */
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
  radioIndicatorClass,
  radioValue,
  onRadioValueChange,
}: RenderDropdownItemsOptions): ReactNode {
  const renderOne = (item: MenuItem, key: number): ReactNode => {
    if (item.type === 'separator') {
      return <DropdownMenu.Separator key={key} className={separatorClass} />;
    }

    if (item.type === 'label') {
      if (!labelClass) return null;
      return (
        <DropdownMenu.Label key={key} className={labelClass}>
          {item.label}
        </DropdownMenu.Label>
      );
    }

    if (item.type === 'radio') {
      return (
        <DropdownMenu.RadioItem
          key={key}
          className={itemClass()}
          value={item.value}
          disabled={item.disabled}
        >
          {/* Decorativo: el estado real y la selección viven en el propio
              RadioItem (role="menuitemradio"). Un input de verdad para que el
              glifo se pinte; Radix expone su estado en `data-state`, que un
              `<input type="radio">` no sabe leer — de ahí el `checked`
              derivado del valor del grupo. */}
          <input
            type="radio"
            checked={radioValue === item.value}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            className={radioIndicatorClass}
          />
          {itemContent(item.label, item.icon)}
        </DropdownMenu.RadioItem>
      );
    }

    const content = itemContent(item.label, item.icon);

    if (item.type === 'link') {
      if (item.disabled) {
        return (
          <DropdownMenu.Item key={key} className={itemClass(item.destructive)} disabled>
            {content}
          </DropdownMenu.Item>
        );
      }
      return (
        <DropdownMenu.Item key={key} asChild>
          {renderLink({ href: item.href, children: content, className: itemClass(item.destructive) })}
        </DropdownMenu.Item>
      );
    }

    return (
      <DropdownMenu.Item
        key={key}
        className={itemClass(item.destructive)}
        disabled={item.disabled}
        onSelect={
          item.disabled
            ? undefined
            : (event) => {
                // Radix cierra el menú salvo que se cancele el evento.
                if (item.closeOnSelect === false) {
                  event.preventDefault();
                  item.onClick();
                  return;
                }
                // Diferido al siguiente tick: si el onClick abre un diálogo
                // modal mientras el menú aún se está cerrando, el bloqueo de
                // pointer-events del menú se queda pegado al <body> y la
                // página entera deja de responder a clics (bug conocido de
                // Radix DropdownMenu+Dialog).
                setTimeout(() => item.onClick(), 0);
              }
        }
      >
        {content}
      </DropdownMenu.Item>
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
      <DropdownMenu.RadioGroup
        key={`radio-${index}`}
        value={radioValue}
        onValueChange={onRadioValueChange}
      >
        {rendered}
      </DropdownMenu.RadioGroup>
    );
  });
}
