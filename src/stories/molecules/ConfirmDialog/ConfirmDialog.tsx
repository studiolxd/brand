'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Button } from '../../atoms/Button/Button';
import { InputField } from '../InputField/InputField';
import { Modal, type ModalProps } from '../Modal/Modal';
import { useBrandMessages } from '../../messages/BrandMessagesContext';
import './ConfirmDialog.css';

/**
 * El cromo de la confirmación, y **solo el cromo**. Aquí la línea entre
 * cromo y contenido cae en medio del pie, así que conviene decirla entera:
 *
 * - **`cancel` es cromo.** La salida segura no cambia de una pantalla a otra:
 *   se sale de todas igual, y «Cancelar» describe lo único que hace el botón
 *   —no seguir—. No nombra ninguna consecuencia porque no la tiene.
 * - **`pending` es cromo.** Es un estado, no una decisión: se pinta sobre el
 *   botón ya deshabilitado, mientras la acción corre. Nadie elige nada
 *   leyéndolo, así que no tiene que nombrar el verbo de la acción.
 * - **`confirmLabel` NO está aquí y es una prop obligatoria.** Es la única
 *   parte del diálogo donde se toma la decisión, y por eso tiene que nombrar
 *   lo que va a pasar: «Eliminar la organización», «Revocar la clave»,
 *   «Expulsar del equipo». Un default de catálogo lo haría decir «Confirmar»
 *   en todas partes sin que nada fallara, que es exactamente el rótulo que el
 *   sistema no quiere — y, siendo opcional, nadie llegaría a escribir el
 *   bueno. Obligatoria, como el `confirmLabel` del `ImageCropDialog`.
 */
export interface ConfirmDialogMessages {
  /** Rótulo del botón que cancela. */
  cancel: string;
  /** Rótulo del botón de confirmar mientras la acción está en curso. */
  pending: string;
}

export interface ConfirmDialogBaseProps {
  open: boolean;
  /** Título del diálogo: la pregunta, no «Confirmar». */
  title: string;
  /** El cuerpo de la pregunta: qué va a pasar y qué no se puede deshacer. */
  description?: ReactNode;
  /** Contenido extra bajo la descripción (un aviso, la lista de lo que se borra). */
  children?: ReactNode;
  /**
   * Se llama al confirmar. Si devuelve una promesa, el diálogo se queda
   * abierto y ocupado hasta que resuelve; si rechaza, sigue abierto para que
   * el consumidor cuente qué ha fallado.
   */
  onConfirm: () => void | Promise<void>;
  /** Se llama al cancelar, al cerrar con el aspa y al pulsar `Esc`. */
  onCancel: () => void;
  /**
   * Se llama cuando la promesa de `onConfirm` rechaza. El diálogo se queda
   * abierto y no cuenta nada por su cuenta: el error lo explica el consumidor,
   * que es quien sabe qué ha pasado (un `Toast`, un `Alert` en `children`).
   */
  onConfirmError?: (error: unknown) => void;
  /**
   * Rótulo de una **tercera acción**, que se coloca entre la de cancelar y la
   * de confirmar: la variante de la respuesta afirmativa que no es la que se
   * ofrece por defecto («Permitir siempre» junto a «Permitir», «Guardar como
   * copia» junto a «Guardar»). No tiene default —es texto del producto, como
   * `title`— y solo se pinta si viene con `onSecondaryAction`.
   */
  secondaryActionLabel?: string;
  /**
   * Se llama al pulsar la acción intermedia. Cerrar el diálogo es del
   * consumidor, igual que en `onConfirm` sin promesa: el diálogo no supone que
   * la tercera acción termine la conversación.
   */
  onSecondaryAction?: () => void;
  /**
   * La acción destructiva no se puede deshacer: el botón de confirmar cambia
   * al lenguaje destructivo del sistema.
   */
  destructive?: boolean;
  /**
   * Rótulo del botón que confirma. **Obligatorio y sin default**: es donde se
   * toma la decisión, así que tiene que nombrar lo que va a pasar («Eliminar
   * la organización»), y eso lo sabe la pantalla, no el diálogo. No sale del
   * catálogo a propósito — ver `ConfirmDialogMessages`.
   */
  confirmLabel: string;
  /**
   * Rótulo del botón que cancela. **Sin default**: sin él, sale de
   * `confirmDialog.cancel` del `BrandMessagesProvider`.
   */
  cancelLabel?: string;
  /**
   * Rótulo del botón de confirmar mientras la acción está en curso. **Sin
   * default**: sin él, sale de `confirmDialog.pending`. Solo se lee mientras
   * la acción corre.
   */
  pendingLabel?: string;
  /**
   * Nombre accesible del aspa de cierre. **Reenvío puro al `Modal`**: sin él,
   * el aspa lee `modal.close` del proveedor, como cualquier otro diálogo.
   */
  closeLabel?: string;
  /** Nodo donde montar el portal, como en `Modal`. */
  container?: ModalProps['container'];
  /** Se añade DESPUÉS de las clases propias del pie del diálogo. */
  className?: string;
}

/**
 * La frase de confirmación y sus dos textos viajan juntos: sin `confirmPhrase`
 * no hay campo que rotular ni discrepancia que contar, y con ella los dos
 * textos los pasa el producto —dicen QUÉ hay que teclear—, así que no llevan
 * default castellano.
 */
export type ConfirmDialogPhraseProps =
  | {
      /**
       * Exige teclear una frase exacta —el nombre de la organización, el del
       * plugin— antes de poder confirmar. El botón de confirmar nace apagado y
       * solo se enciende cuando lo tecleado coincide.
       */
      confirmPhrase?: undefined;
      confirmPhraseLabel?: string;
      confirmPhraseMismatch?: string;
    }
  | {
      /**
       * La frase exacta que hay que teclear para poder confirmar. Se compara
       * sin los espacios de los extremos —un espacio pegado al pegar no es un
       * error de la persona— pero sin tocar nada más: ni la caja ni los
       * acentos, que es de lo que vive esta barrera.
       */
      confirmPhrase: string;
      /**
       * Rótulo del campo. **Obligatorio** con `confirmPhrase`, sin default: es
       * donde el producto dice qué hay que teclear («Escribe *acme* para
       * confirmar»), y eso el diálogo no lo sabe.
       */
      confirmPhraseLabel: string;
      /**
       * Mensaje cuando lo tecleado no coincide. **Obligatorio** con
       * `confirmPhrase`, sin default, por lo mismo.
       */
      confirmPhraseMismatch: string;
    };

export type ConfirmDialogProps = ConfirmDialogBaseProps & ConfirmDialogPhraseProps;

/**
 * La pregunta antes de una acción que no se puede deshacer: borrar una
 * organización, revocar una clave, expulsar a alguien de un equipo.
 *
 * Es el `Modal` del sistema con dos botones —tres si el producto pasa una
 * acción intermedia— y una decisión de diseño: **el foco arranca en
 * «Cancelar»**. Un diálogo destructivo que abre con el foco en
 * el botón que destruye convierte un `Enter` de más en una pérdida de datos.
 *
 * `onConfirm` puede devolver una promesa. Mientras está en curso el diálogo se
 * queda abierto y ocupado —no se cierra en falso ni deja pulsar dos veces— y
 * se cierra solo al resolver. Si rechaza, sigue abierto: el error lo cuenta el
 * consumidor, que es quien sabe qué ha pasado.
 *
 * Con `confirmPhrase` monta además la **barrera de teclear el identificador**
 * —el patrón de «escribe el nombre de la organización para borrarla»—: un campo
 * bajo la pregunta y el botón de confirmar apagado hasta que coincida.
 */
export function ConfirmDialog({
  open,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  onConfirmError,
  secondaryActionLabel,
  onSecondaryAction,
  destructive = false,
  confirmLabel,
  cancelLabel,
  pendingLabel,
  closeLabel,
  confirmPhrase,
  confirmPhraseLabel,
  confirmPhraseMismatch,
  container,
  className,
}: ConfirmDialogProps) {
  const t = useBrandMessages('confirmDialog');
  const cancelRef = useRef<HTMLElement>(null);
  const phraseRef = useRef<HTMLInputElement>(null);
  const campoId = useId();
  const [pending, setPending] = useState(false);
  const [tecleado, setTecleado] = useState('');
  // Si el error del campo se pintara mientras se teclea, la persona vería
  // «no coincide» desde la primera letra de una frase que está escribiendo
  // bien. Solo se pinta tras un INTENTO: salir del campo o pulsar Intro.
  const [intento, setIntento] = useState(false);

  // Se compara sin los espacios de los extremos —uno pegado al pegar no es un
  // error de la persona—, pero sin normalizar caja ni acentos: la barrera vive
  // justo de que haya que escribirlo igual.
  const coincide = confirmPhrase === undefined || tecleado.trim() === confirmPhrase;
  const discrepa = intento && !coincide;

  // Una acción que falla deja el diálogo abierto; al cerrarlo, el botón vuelve
  // a estar disponible para el siguiente intento y la barrera se rearma.
  useEffect(() => {
    if (open) return;
    setPending(false);
    setTecleado('');
    setIntento(false);
  }, [open]);

  const handleCancel = () => {
    if (pending) return;
    onCancel();
  };

  const handleConfirm = async () => {
    if (pending || !coincide) return;
    const result = onConfirm();
    if (!(result instanceof Promise)) return;
    setPending(true);
    try {
      await result;
    } catch (error) {
      // La promesa ya la consume el diálogo, así que aquí muere: dejarla
      // rechazar sería un unhandled rejection en la aplicación del consumidor.
      onConfirmError?.(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      title={title}
      {...(closeLabel !== undefined ? { closeLabel } : {})}
      container={container}
      // El foco entra en la salida segura, no en la acción que destruye. Se lo
      // pide al gestor de foco de Base UI (por `Modal`) en vez de moverlo a
      // mano tras el montaje: él corre el último y ganaría él.
      //
      // Con la barrera de la frase entra en el campo, que es lo que hay que
      // hacer y NO es la acción que destruye: el botón de confirmar nace
      // apagado, así que el `Enter` de más contra el que protege la regla ya no
      // puede llegar a ninguna parte.
      initialFocus={confirmPhrase !== undefined ? phraseRef : cancelRef}
      {...(description != null ? { description } : {})}
      // El pie lo reparte `Modal`: fila a la derecha, y apilado a todo el
      // ancho con la acción principal arriba por debajo del punto de ruptura.
      footerClassName={['confirm-dialog__actions', className].filter(Boolean).join(' ')}
      footer={
        <>
          <Button ref={cancelRef} variant="outline" onClick={handleCancel} disabled={pending}>
            {t('cancel', cancelLabel)}
          </Button>
          {/* La tercera acción va ENTRE las otras dos, nunca en el cuerpo: el
              orden del pie es descartar → intermedia → principal, y de ese
              orden sale solo la colocación en las dos maquetas (fila a la
              derecha en escritorio; apilada con la principal arriba por debajo
              del punto de ruptura, que el pie invierte). Va en `outline` como
              la de descartar porque el pie solo tiene dos niveles de énfasis:
              la principal y el resto. */}
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction} disabled={pending}>
              {secondaryActionLabel}
            </Button>
          )}
          <Button
            variant={destructive ? 'outline' : 'primary'}
            destructive={destructive}
            onClick={handleConfirm}
            disabled={pending || !coincide}
          >
            {pending ? t('pending', pendingLabel) : confirmLabel}
          </Button>
        </>
      }
    >
      {children}
      {confirmPhrase !== undefined && (
        <InputField
          ref={phraseRef}
          id={`${campoId}-confirm-phrase`}
          className="confirm-dialog__phrase"
          label={confirmPhraseLabel ?? ''}
          value={tecleado}
          disabled={pending}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          error={discrepa}
          {...(discrepa ? { errorMessage: confirmPhraseMismatch } : {})}
          onChange={(event) => {
            setTecleado(event.target.value);
            // Vuelve a tecleares: se retira el error y se espera al próximo intento.
            setIntento(false);
          }}
          onBlur={() => {
            // Salir del campo en blanco no es un intento fallido: es no haber
            // empezado.
            if (tecleado !== '') setIntento(true);
          }}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            // El botón de confirmar nace apagado, así que el envío implícito
            // del formulario no llegaría: el Intro lo atiende el campo.
            event.preventDefault();
            if (coincide) void handleConfirm();
            else if (tecleado !== '') setIntento(true);
          }}
        />
      )}
    </Modal>
  );
}
