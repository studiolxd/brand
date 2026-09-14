'use client';

import type { ReactNode } from 'react';
import { ConnectorAuthShell, type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { Button } from '../../atoms/Button/Button';
import { Code } from '../../atoms/Code/Code';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';

/**
 * Por qué no se ha conectado nada. Son los cinco errores que el servidor de
 * autorización devuelve hoy en crudo —`invalid_client`,
 * `invalid_redirect_uri`, `access_denied`, `invalid_request`,
 * `login_required`—, uno por uno y con el nombre que entiende quien los lee.
 */
export type ConnectorRejectionReason =
  | 'invalid-client'
  | 'invalid-redirect-uri'
  | 'invalid-request'
  | 'access-denied'
  | 'session-expired';

/** Lo que cambia de un rechazo a otro: qué pasó, qué se puede hacer y cómo se llama la salida. */
interface RejectionCopy {
  title: string;
  description: string;
  hint: string;
  retryLabel: string;
}

/**
 * Los cinco textos. Es lo ÚNICO que distingue una variante de otra: la
 * maqueta, el orden y el foco son los mismos en las cinco, que es la razón de
 * que sean una plantilla con variantes y no cinco pantallas.
 */
const COPY: Record<ConnectorRejectionReason, RejectionCopy> = {
  'invalid-client': {
    title: 'Esta herramienta no está registrada',
    description: 'La aplicación que pide acceso no consta en este producto. No se ha concedido nada.',
    hint: 'Vuelve a la herramienta y conéctala otra vez desde el principio. Si el error se repite, quien la mantiene tiene que registrarla de nuevo.',
    retryLabel: 'Volver a la herramienta',
  },
  'invalid-redirect-uri': {
    title: 'La dirección de retorno no está permitida',
    description:
      'La herramienta ha pedido que el acceso se envíe a una dirección distinta de la que tiene registrada. No se ha enviado nada a ninguna parte.',
    hint: 'Es la comprobación que impide que un acceso legítimo acabe en manos de otro. Si la herramienta es tuya, revisa la dirección de retorno que tiene configurada; si no la reconoces, no vuelvas a intentarlo.',
    retryLabel: 'Volver a la herramienta',
  },
  'invalid-request': {
    title: 'La petición está incompleta',
    description: 'Falta algo en lo que ha pedido la herramienta, o ha llegado alterado por el camino. No se ha concedido ningún acceso.',
    hint: 'Vuelve a la herramienta y empieza la conexión de nuevo. Un enlace copiado a mano o reutilizado de otra vez suele acabar así.',
    retryLabel: 'Volver a la herramienta',
  },
  'access-denied': {
    title: 'No se ha dado acceso',
    description: 'La conexión se ha cancelado. La herramienta no ha recibido ningún permiso sobre tus datos.',
    hint: 'Puedes cerrar esta pantalla. Si ha sido sin querer, vuelve a la herramienta y pide la conexión otra vez.',
    retryLabel: 'Volver a intentarlo',
  },
  'session-expired': {
    title: 'La sesión ha caducado',
    description: 'Ha pasado demasiado tiempo desde que se abrió esta pantalla, así que la decisión ya no vale.',
    hint: 'Inicia sesión otra vez y repite la conexión desde la herramienta. Nada de lo anterior se ha concedido.',
    retryLabel: 'Iniciar sesión',
  },
};

export interface ConnectorRejectionPageProps extends ConnectorAuthChromeProps {
  /** Por qué no se ha conectado nada. De él salen el título, la explicación y el texto de la salida. */
  reason: ConnectorRejectionReason;
  /** Título, si el producto quiere el suyo. Default: el de la variante, en castellano. */
  title?: ReactNode;
  /** La frase bajo el título. Default: la de la variante, en castellano. */
  description?: ReactNode;
  /** Qué se puede hacer, en la columna de la derecha. Default: el de la variante, en castellano. */
  hint?: ReactNode;
  /**
   * El código técnico tal cual lo devuelve el servidor (`invalid_client`…),
   * bajo la explicación. No es para quien lee la pantalla: es para que pueda
   * copiarlo en un correo a soporte sin tener que describir el error con sus
   * palabras. Sin él, no se pinta.
   */
  code?: string;
  /** Rótulo del código. Default castellano: «Código». */
  codeLabel?: string;
  /** La salida, como enlace: la vuelta a la herramienta o al acceso. */
  retryHref?: string;
  /** La salida, en modo React (sin `retryHref`). */
  onRetry?: () => void;
  /** Etiqueta de la salida. Default: la de la variante, en castellano. */
  retryLabel?: string;
  /**
   * La salida entera, ya montada, cuando no basta con un botón (el `Link` del
   * router, dos acciones). Manda sobre `retryHref` / `onRetry`.
   */
  retryAction?: ReactNode;
  /** Bajo la cabecera, en su columna: un enlace de vuelta al producto. */
  aside?: ReactNode;
}

/**
 * **Una sola plantilla para los cinco rechazos**, que hoy son cinco respuestas
 * JSON en crudo sin ninguna pantalla detrás.
 *
 * Son cinco variantes y no cinco plantillas porque lo único que cambia entre
 * ellas es el texto. La maqueta es idéntica —la explicación a la izquierda, qué
 * hacer y la salida a la derecha—, y sobre todo lo es la postura: **ninguna
 * ofrece reintentar en el sitio**. Ni un botón que repita la petición ni un
 * formulario que la arregle; la conexión se empieza donde se empezó, en la
 * herramienta. Un rechazo de autorización que se pueda reintentar a golpes
 * desde la propia pantalla de rechazo es un fallo de seguridad, no una
 * comodidad, y por eso la salida por defecto es «volver» y no «reintentar».
 *
 * Los cinco se agrupan en tres causas, y el texto de cada uno lo dice sin
 * jerga:
 *
 * | Causa | Variantes | Qué se le ofrece |
 * | --- | --- | --- |
 * | La petición no vale | `invalid-client`, `invalid-redirect-uri`, `invalid-request` | Volver a la herramienta: el arreglo está allí |
 * | No se ha concedido | `access-denied` | Cerrar, o pedir la conexión otra vez |
 * | La sesión se ha acabado | `session-expired` | Identificarse y repetir |
 *
 * No lleva `Alert` ni color de error. Un rechazo aquí no es un fallo del
 * sistema del que avisar: es el resultado normal de una comprobación que ha
 * hecho su trabajo —y en `access-denied`, ni siquiera eso: es lo que se ha
 * pedido—. La página lo cuenta como cuenta cualquier otra cosa.
 */
export function ConnectorRejectionPage({
  reason,
  title,
  description,
  hint,
  code,
  codeLabel = 'Código',
  retryHref,
  onRetry,
  retryLabel,
  retryAction,
  aside,
  header,
  footer,
  preferences,
  preferencesLabel,
  id,
  shell,
}: ConnectorRejectionPageProps) {
  const copy = COPY[reason];
  const etiqueta = retryLabel ?? copy.retryLabel;

  const salida =
    retryAction ??
    (retryHref !== undefined ? (
      <Button href={retryHref}>{etiqueta}</Button>
    ) : onRetry ? (
      <Button onClick={onRetry}>{etiqueta}</Button>
    ) : null);

  return (
    <ConnectorAuthShell
      title={title ?? copy.title}
      description={description ?? copy.description}
      intro={
        code !== undefined ? (
          <Paragraph size="small">
            {codeLabel}: <Code>{code}</Code>
          </Paragraph>
        ) : undefined
      }
      aside={aside}
      header={header}
      footer={footer}
      preferences={preferences}
      preferencesLabel={preferencesLabel}
      id={id}
      shell={shell}
    >
      <Stack align="stretch">
        <Paragraph size="large">{hint ?? copy.hint}</Paragraph>
        {salida}
      </Stack>
    </ConnectorAuthShell>
  );
}
