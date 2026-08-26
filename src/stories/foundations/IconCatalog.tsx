import { Icon, ICON_NAMES } from '../atoms/Icon/Icon';
import './IconCatalog.css';

/** Todos los iconos del sistema, por nombre. */
export function IconCatalog() {
  return (
    <ul className="icon-catalog">
      {ICON_NAMES.map((name) => (
        <li key={name} className="icon-catalog__item">
          <Icon name={name} size="md" />
          <code>{name}</code>
        </li>
      ))}
    </ul>
  );
}

/** Una misma forma en las cinco tallas: el trazo no crece con el icono. */
export function IconSizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  return (
    <ul className="icon-sizes">
      {sizes.map((size) => (
        <li key={size} className="icon-sizes__item">
          <Icon name="bell" size={size} />
          <code>{size}</code>
        </li>
      ))}
    </ul>
  );
}
