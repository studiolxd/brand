import { useEffect, useState, type ReactNode } from 'react';
import './Consent.css';
import { Button } from '../../atoms/Button/Button';
import { Heading } from '../../atoms/Heading/Heading';
import { Link } from '../../atoms/Link/Link';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { VisuallyHidden } from '../../atoms/VisuallyHidden/VisuallyHidden';
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
   * Cambio de categorías: se llama con la decisión completa cada vez que se
   * conmuta un interruptor — el panel no lleva botón «Guardar», persiste al
   * instante. **Si se pasa, el panel es controlado**: `value` manda en todo
   * momento y el consumidor decide qué hacer con cada cambio (normalmente,
   * guardarlo). Sin ella el panel lleva su propio estado interno, sembrado de
   * `value` cada vez que se abre.
   */
  onChange?: (value: ConsentValue) => void;
  /**
   * @deprecated Alias de `onChange`, por compatibilidad con quien ya lo
   * pasaba. Desde que el panel dejó de tener botón «Guardar» (v25.32.0),
   * `onSave` se llama en el mismo momento y con la misma decisión que
   * `onChange` — en cada conmutación de interruptor y en «Aceptar
   * todas»/«Rechazar todas», no solo al pulsar un guardado explícito que ya
   * no existe. Pasa a `onChange`.
   */
  onSave?: (value: ConsentValue) => void;
  /**
   * Se llama, además de `onChange`/`onSave`, tras aplicar «Aceptar todas» y
   * cerrar el panel. Opcional: para lógica extra del consumidor (p. ej.
   * marcar que ya hay una decisión). El botón se muestra siempre, la tenga o
   * no.
   */
  onAcceptAll?: () => void;
  /**
   * Se llama, además de `onChange`/`onSave`, tras aplicar «Rechazar todas» y
   * cerrar el panel. Opcional, igual que `onAcceptAll`.
   */
  onRejectAll?: () => void;
  /** Superficie sobre la que se abre el panel. Default: `'sheet'`. */
  surface?: 'sheet' | 'modal';
  /** Borde por el que entra el panel (solo con `surface="sheet"`, la alternativa lateral que el sistema conserva para otros usos). Default: `'right'`. */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Título del panel. Default castellano: `'Preferencias de cookies'`. */
  title?: ReactNode;
  /** Etiqueta del botón de aceptar todas. Default castellano: `'Aceptar todas'`. */
  acceptAllLabel?: string;
  /** Etiqueta del botón de rechazar todas. Default castellano: `'Rechazar todas'`. */
  rejectAllLabel?: string;
  /** Etiqueta del botón de cerrar. Default castellano: `'Cerrar'`. */
  closeLabel?: string;
  /** Marca de una categoría necesaria. Default castellano: `'Siempre activa'`. */
  alwaysOnLabel?: string;
  /**
   * Nodo DOM donde montar el portal del panel, reenviado a `Modal`/`Sheet`.
   * Necesario cuando el panel se abre dentro de `SiteShell`: por defecto el
   * portal monta en `document.body`, que no hereda los tokens de la
   * superficie pública (a diferencia del tema oscuro, que se activa en
   * `<html>`) — pásale el nodo de `SiteShell` (su `ref`).
   */
  container?: React.ComponentPropsWithoutRef<typeof Modal>['container'];
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
 * El panel de preferencias por categorías: título, la lista de categorías —un
 * interruptor por categoría opcional y una fila fija para las necesarias— y
 * el pie con las dos únicas acciones («Aceptar todas»/«Rechazar todas»). Sin
 * párrafo de descripción bajo el título: la propia lista explica qué se
 * decide. Se abre sobre `Modal` (default) o sobre `Sheet`; el foco, el cierre
 * con Escape y el velo los pone Base UI.
 *
 * **No hay botón «Guardar»**: cada interruptor persiste al instante — se
 * conmuta y `onChange` (u `onSave`, su alias) se llama en el momento con la
 * decisión completa. Sin `onChange` el panel lleva su propio estado interno,
 * sembrado de `value` cada vez que se abre, y sigue disparando `onSave` en
 * cada cambio.
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
  surface = 'modal',
  side = 'right',
  title = 'Preferencias de cookies',
  acceptAllLabel = 'Aceptar todas',
  rejectAllLabel = 'Rechazar todas',
  closeLabel = 'Cerrar',
  alwaysOnLabel = 'Siempre activa',
  container,
  className,
}: ConsentPreferencesProps) {
  const controlled = onChange !== undefined;
  const [draft, setDraft] = useState<ConsentValue>(() => withRequired(value, categories));

  // El estado interno se resiembra al abrir: lo que se ve siempre parte de la
  // decisión vigente.
  useEffect(() => {
    if (open && !controlled) setDraft(withRequired(value, categories));
    // `value`/`categories` se leen solo en el momento de abrir, a propósito.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, controlled]);

  const current = controlled ? withRequired(value, categories) : draft;

  /** Persiste `next` al instante: `onChange` si el panel es controlado, si no el estado interno; `onSave` se dispara siempre, alias incluido. */
  const commit = (next: ConsentValue) => {
    if (controlled) onChange(next);
    else setDraft(next);
    onSave?.(next);
  };

  const toggle = (id: string, checked: boolean) => {
    commit({ ...current, [id]: checked });
  };

  const applyAll = (accept: boolean, extra?: () => void) => {
    const next: ConsentValue = {};
    for (const category of categories) {
      next[category.id] = category.required ? true : accept;
    }
    commit(next);
    extra?.();
    onOpenChange(false);
  };

  const body = (
    <div className={['consent-preferences', className].filter(Boolean).join(' ')}>
      <ul className="consent-preferences__list">
        {categories.map((category) => (
          <li key={category.id} className="consent-preferences__category">
            <SwitcherField
              label={
                category.required ? (
                  <>
                    {category.name}
                    {/* Coma explícita, no un espacio: un espacio en el límite entre
                    dos elementos en línea puede colapsarse al calcular el nombre
                    accesible y dejar "NecesariasSiempre activa" pegado (detectado
                    en producción por public-shell). La coma no se colapsa nunca. */}
                    <VisuallyHidden>{`, ${alwaysOnLabel}`}</VisuallyHidden>
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
      <Button onClick={() => applyAll(true, onAcceptAll)}>{acceptAllLabel}</Button>
      <Button onClick={() => applyAll(false, onRejectAll)}>{rejectAllLabel}</Button>
    </>
  );

  if (surface === 'modal') {
    return (
      <Modal
        open={open}
        onClose={() => onOpenChange(false)}
        title={typeof title === 'string' ? title : undefined}
        closeLabel={closeLabel}
        container={container}
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
      closeLabel={closeLabel}
      footer={footer}
      container={container}
    >
      {body}
    </Sheet>
  );
}
