import { useEffect, useState, type ReactNode } from 'react';
import './Consent.css';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Separator } from '../../atoms/Separator/Separator';
import { SwitcherField } from '../SwitcherField/SwitcherField';
import { Sheet } from '../Sheet/Sheet';
import { Modal } from '../Modal/Modal';

/** Una categoría de tecnologías sobre la que se pide (o no) consentimiento. */
export interface ConsentCategory {
  /** Identificador de la categoría. Es la clave dentro de `value`. */
  id: string;
  /** Nombre visible de la categoría. */
  name: string;
  /** Qué hace esa categoría. Se muestra como ayuda del interruptor. */
  description?: string;
  /**
   * Categoría necesaria: siempre activa y sin interruptor operable. No se
   * incluye en el objeto que devuelven `onSave`/`onChange` como algo que
   * decidir — se guarda siempre a `true`.
   */
  required?: boolean;
}

/** La decisión: qué categorías están aceptadas, por `id`. */
export type ConsentValue = Record<string, boolean>;

export interface ConsentBannerProps
  extends Omit<React.ComponentPropsWithoutRef<'aside'>, 'title' | 'children' | 'onChange'> {
  /**
   * Muestra la banda. Es la primera visita, o la decisión ha caducado: quién lo
   * sabe es el consumidor, que es también quien guarda la cookie. Default: `true`.
   */
  open?: boolean;
  /** Acepta todas las categorías. */
  onAcceptAll: () => void;
  /** Rechaza todas las opcionales. Tiene exactamente el mismo peso visual que aceptar. */
  onRejectAll: () => void;
  /** Abre el panel de preferencias. Sin ella no se pinta el botón. */
  onOpenPreferences?: () => void;
  /** Título de la banda. Default castellano: `'Cookies'`. */
  title?: ReactNode;
  /** Texto de la banda. Default castellano. */
  description?: ReactNode;
  /** URL de la política de cookies. Sin ella no se pinta el enlace. */
  policyHref?: string;
  /** Texto del enlace a la política. Default castellano: `'Política de cookies'`. */
  policyLabel?: string;
  /** Abre la política en otra pestaña (la política suele vivir en la web pública). */
  policyExternal?: boolean;
  /** Etiqueta del botón de aceptar. Default castellano: `'Aceptar todas'`. */
  acceptAllLabel?: string;
  /** Etiqueta del botón de rechazar. Default castellano: `'Rechazar'`. */
  rejectAllLabel?: string;
  /** Etiqueta del botón de preferencias. Default castellano: `'Preferencias'`. */
  preferencesLabel?: string;
  /**
   * Nombre accesible de la región. Default: el propio `title` cuando es texto;
   * si el título lleva JSX, pásalo. Default castellano: `'Consentimiento de cookies'`.
   */
  regionLabel?: string;
}

/**
 * La banda de consentimiento: qué se quiere guardar y tres salidas —aceptar,
 * rechazar, decidir por categorías—. **No es un diálogo**: no atrapa el foco, no
 * bloquea la página y no lleva velo. Rechazar cuesta exactamente lo mismo que
 * aceptar (un clic, el mismo peso visual), que es lo que pide la ePrivacy.
 *
 * El DS no toca cookies ni `localStorage`: la decisión, su persistencia y su
 * caducidad las lleva el consumidor. Aquí solo están la superficie y las
 * llamadas.
 */
export function ConsentBanner({
  open = true,
  onAcceptAll,
  onRejectAll,
  onOpenPreferences,
  title = 'Cookies',
  description = 'Usamos cookies propias y de terceros para que el sitio funcione y para entender cómo se usa. Puedes aceptarlas todas, rechazarlas o elegir por categorías.',
  policyHref,
  policyLabel = 'Política de cookies',
  policyExternal = false,
  acceptAllLabel = 'Aceptar todas',
  rejectAllLabel = 'Rechazar',
  preferencesLabel = 'Preferencias',
  regionLabel = 'Consentimiento de cookies',
  className,
  ...rest
}: ConsentBannerProps) {
  if (!open) return null;

  return (
    <aside
      className={['consent-banner', className].filter(Boolean).join(' ')}
      role="region"
      aria-label={regionLabel}
      {...rest}
    >
      <div className="consent-banner__inner">
        <div className="consent-banner__text">
          <Heading level={2} size={3} className="consent-banner__title">{title}</Heading>
          <Paragraph className="consent-banner__description">
            {description}
            {policyHref !== undefined && (
              <>
                {' '}
                <Link href={policyHref} external={policyExternal}>{policyLabel}</Link>
              </>
            )}
          </Paragraph>
        </div>

        <div className="consent-banner__actions">
          <Button onClick={onAcceptAll}>{acceptAllLabel}</Button>
          <Button onClick={onRejectAll}>{rejectAllLabel}</Button>
          {onOpenPreferences && (
            <Button variant="outline" onClick={onOpenPreferences}>{preferencesLabel}</Button>
          )}
        </div>
      </div>
    </aside>
  );
}

export interface ConsentPreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Las categorías, en el orden en que se enseñan. Las `required` van primero por convención. */
  categories: ConsentCategory[];
  /** La decisión vigente. Es lo que se lee al abrir el panel. */
  value: ConsentValue;
  /**
   * Cambio de un interruptor. **Si se pasa, el panel es controlado**: `value`
   * manda en todo momento y el consumidor decide qué hacer con cada cambio. Sin
   * ella el panel lleva su propio borrador y solo devuelve la decisión al guardar.
   */
  onChange?: (value: ConsentValue) => void;
  /** Guardar. Recibe la decisión completa, categorías necesarias incluidas (siempre `true`). */
  onSave: (value: ConsentValue) => void;
  /** Aceptar todas desde el panel. Sin ella no se pinta el botón. */
  onAcceptAll?: () => void;
  /** Rechazar todas las opcionales desde el panel. Sin ella no se pinta el botón. */
  onRejectAll?: () => void;
  /** Superficie sobre la que se abre el panel. Default: `'sheet'`. */
  surface?: 'sheet' | 'modal';
  /** Borde por el que entra el panel (solo con `surface="sheet"`). Default: `'right'`. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Título del panel. Default castellano: `'Preferencias de cookies'`. */
  title?: ReactNode;
  /** Texto bajo el título. Default castellano. */
  description?: ReactNode;
  /** Etiqueta del botón de guardar. Default castellano: `'Guardar preferencias'`. */
  saveLabel?: string;
  /** Etiqueta del botón de aceptar todas. Default castellano: `'Aceptar todas'`. */
  acceptAllLabel?: string;
  /** Etiqueta del botón de rechazar. Default castellano: `'Rechazar todas'`. */
  rejectAllLabel?: string;
  /** Etiqueta del botón de cerrar. Default castellano: `'Cerrar'`. */
  closeLabel?: string;
  /** Marca de una categoría necesaria. Default castellano: `'Siempre activa'`. */
  alwaysOnLabel?: string;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/** Toda categoría necesaria vale `true`, decida lo que decida quien navega. */
function withRequired(value: ConsentValue, categories: ConsentCategory[]): ConsentValue {
  const next = { ...value };
  for (const category of categories) {
    if (category.required) next[category.id] = true;
  }
  return next;
}

/**
 * El panel de preferencias por categorías: un interruptor por categoría
 * opcional y una fila fija para las necesarias. Se abre sobre `Sheet` (default)
 * o sobre `Modal`; el foco, el cierre con Escape y el velo los pone Base UI.
 *
 * Sin `onChange` el panel lleva un **borrador**: los interruptores se mueven
 * dentro del panel y la decisión no sale hasta pulsar guardar. El borrador se
 * siembra de `value` cada vez que el panel se abre, así que cerrar sin guardar
 * descarta los cambios.
 */
export function ConsentPreferences({
  open,
  onOpenChange,
  categories,
  value,
  onChange,
  onSave,
  onAcceptAll,
  onRejectAll,
  surface = 'sheet',
  side = 'right',
  title = 'Preferencias de cookies',
  description = 'Las cookies necesarias no se pueden desactivar: sin ellas el sitio no funciona. El resto son cosa tuya.',
  saveLabel = 'Guardar preferencias',
  acceptAllLabel = 'Aceptar todas',
  rejectAllLabel = 'Rechazar todas',
  closeLabel = 'Cerrar',
  alwaysOnLabel = 'Siempre activa',
  className,
}: ConsentPreferencesProps) {
  const controlled = onChange !== undefined;
  const [draft, setDraft] = useState<ConsentValue>(() => withRequired(value, categories));

  // El borrador se resiembra al abrir: lo que se ve siempre parte de la
  // decisión guardada, y cerrar sin guardar no deja rastro.
  useEffect(() => {
    if (open && !controlled) setDraft(withRequired(value, categories));
    // `value`/`categories` se leen solo en el momento de abrir, a propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, controlled]);

  const current = controlled ? withRequired(value, categories) : draft;

  const toggle = (id: string, checked: boolean) => {
    const next = { ...current, [id]: checked };
    if (controlled) onChange(next);
    else setDraft(next);
  };

  const body = (
    <div className={['consent-preferences', className].filter(Boolean).join(' ')}>
      <ul className="consent-preferences__list">
        {categories.map((category, index) => (
          <li key={category.id} className="consent-preferences__category">
            {index > 0 && <Separator spacing="sm" />}
            <SwitcherField
              label={
                category.required ? (
                  <>
                    {category.name}{' '}
                    <span className="consent-preferences__always">{alwaysOnLabel}</span>
                  </>
                ) : (
                  category.name
                )
              }
              helperText={category.description}
              checked={category.required ? true : current[category.id] === true}
              disabled={category.required}
              onCheckedChange={(checked) => toggle(category.id, checked)}
            />
          </li>
        ))}
      </ul>
    </div>
  );

  const footer = (
    <>
      <Button onClick={() => onSave(current)}>{saveLabel}</Button>
      {onRejectAll && (
        <Button onClick={onRejectAll}>{rejectAllLabel}</Button>
      )}
      {onAcceptAll && (
        <Button variant="outline" onClick={onAcceptAll}>{acceptAllLabel}</Button>
      )}
    </>
  );

  if (surface === 'modal') {
    return (
      <Modal
        open={open}
        onClose={() => onOpenChange(false)}
        title={typeof title === 'string' ? title : undefined}
        closeLabel={closeLabel}
        description={description}
      >
        {body}
        <div className="consent-preferences__footer">{footer}</div>
      </Modal>
    );
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side={side}
      title={title}
      description={description}
      closeLabel={closeLabel}
      footer={footer}
    >
      {body}
    </Sheet>
  );
}
