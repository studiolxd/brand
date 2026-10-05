import { useId } from 'react';
import { Button } from '../../atoms/Button/Button';
import { Spinner } from '../../atoms/Spinner/Spinner';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import type { EmptyStateAction } from '../EmptyState/EmptyState';
import './LoadingState.css';

export interface LoadingStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role' | 'children'> {
  /**
   * Lo que se espera, con puntos suspensivos («Cargando revisión…»: ver
   * Foundations → Redacción). **No se ve**: es el nombre accesible de la
   * espera y lo que anuncian los lectores de pantalla. **Sin default**: sin
   * él, sale de `spinner.label` del `BrandMessagesProvider` — el mismo texto
   * que el `Spinner`.
   */
  label?: string;
  /**
   * Pinta el `label` bajo el girador, centrado, con el texto atenuado de la
   * descripción de `EmptyState`. Para esperas **largas con pasos** («Procesando
   * el documento: paso 2 de 5…»), donde el texto informa de por dónde va. Es el
   * mismo nodo que da el nombre accesible: no se anuncia dos veces, y cuando
   * `label` cambia la región lo anuncia con cortesía (`polite`). **Sin `label`
   * propio no pinta nada**: el texto genérico del catálogo («Cargando…») no se
   * ve nunca. Por defecto `false`: en una espera corta el texto es ruido.
   */
  labelVisible?: boolean;
  /**
   * `md` para una página o una zona; `sm` para el cuerpo de un diálogo, una
   * hoja, un popover o una barra lateral.
   */
  size?: 'sm' | 'md';
  /**
   * A página completa: la caja toma el alto visible bajo la cabecera del
   * `AppShell` (la ventana menos el cromo del armazón y el relleno del
   * contenido) y centra el girador en él, sin provocar desplazamiento. Para el
   * `loading.tsx` de una ruta cuya forma no se conoce. Sin `fill`, la caja ya
   * ocupa el alto de una zona que lo tenga definido y, si no, reserva el
   * mínimo de su talla.
   */
  fill?: boolean;
  /** Una salida mientras se espera (cancelar un proceso largo). */
  action?: EmptyStateAction;
}

/**
 * La espera de un bloque cuya forma no se conoce: un girador centrado en una
 * caja que **reserva alto** y, si hace falta, una salida. A la vista solo está
 * el girador; el texto de la espera es solo para los lectores de pantalla,
 * salvo con `labelVisible` (esperas largas con pasos). Cuando la forma sí se conoce (tabla, lista, ficha), la respuesta es
 * `LoadingRegion` con esqueletos.
 *
 * Anuncia: la caja es `role="status"` con `aria-busy`, y su nombre es el texto
 * de la espera, oculto a la vista. El girador va decorativo, para no
 * anunciarla dos veces.
 */
export function LoadingState({
  label,
  labelVisible = false,
  size = 'md',
  fill = false,
  action,
  className,
  ...rest
}: LoadingStateProps) {
  const t = useBrandMessages('spinner');
  const labelId = useId();
  const texto = t('label', label);
  const mostrarTexto = labelVisible && Boolean(label);
  const classes = ['loading-state', size === 'sm' ? 'loading-state--sm' : '', fill ? 'loading-state--fill' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} role="status" aria-busy="true" aria-labelledby={labelId}
      aria-live="polite"
      aria-atomic="false"
      {...rest}
    >
      <span className="loading-state__spinner">
        <Spinner size={size === 'sm' ? 'md' : 'lg'} aria-hidden />
      </span>
      {mostrarTexto ? (
        <p id={labelId} className="loading-state__label">{texto}</p>
      ) : (
        <VisuallyHidden id={labelId}>{texto}</VisuallyHidden>
      )}
      {action && (
        <Button variant="outline" size={size === 'sm' ? 'sm' : 'md'} onClick={action.onClick} href={action.href}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
