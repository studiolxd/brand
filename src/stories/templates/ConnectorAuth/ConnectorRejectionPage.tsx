'use client';

import type { ReactNode } from 'react';
import { ConnectorAuthShell, type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { Button } from '../../atoms/Button/Button';
import { Code } from '../../atoms/Code/Code';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

/**
 * Por qué no se ha conectado nada. Son los cinco errores que el servidor de
 * autorización devuelve hoy en crudo —`invalid_client`,
 * `invalid_redirect_uri`, `access_denied`, `invalid_request`,
 * `login_required`—, uno por uno y con el nombre que entiende quien los lee.
 *
 * **Es un vocabulario, no una prop.** Desde la v49 los cuatro textos del
 * rechazo los pasa el producto (`title`, `description`, `hint`, `retryLabel`),
 * así que el tipo ya no elige nada dentro del componente: está aquí para que
 * la aplicación teclee el motivo contra él al sacar del catálogo los cuatro
 * textos, y para que la lista de motivos siga siendo una sola y esté escrita
 * en el sistema.
 */
export type ConnectorRejectionReason =
  | 'invalid-client'
  | 'invalid-redirect-uri'
  | 'invalid-request'
  | 'access-denied'
  | 'session-expired';

/**
 * El único texto del rechazo que es cromo: el rótulo del código técnico.
 *
 * Los otros cuatro —qué pasó, qué se puede hacer y cómo se llama la salida—
 * **afirman algo sobre una comprobación de seguridad** («no se ha enviado nada
 * a ninguna parte», «si no la reconoces, no vuelvas a intentarlo») y son props
 * obligatorias: el sistema de diseño no puede decidir qué se le cuenta a
 * alguien sobre un acceso que no se ha concedido.
 */
export interface ConnectorRejectionMessages {
  /** Rótulo del código técnico, bajo la explicación. */
  code: string;
}

export interface ConnectorRejectionPageProps extends ConnectorAuthChromeProps {
  /**
   * Qué ha pasado.
   *
   * **Obligatorio y sin default**: los cinco motivos afirman cada uno algo
   * sobre una comprobación de seguridad —qué se ha enviado y qué no—, y eso lo
   * escribe quien conoce el servidor de autorización, no un catálogo de cromo.
   * El vocabulario de los cinco está en `ConnectorRejectionReason`.
   */
  title: ReactNode;
  /** La frase bajo el título. **Obligatoria y sin default**, por lo mismo. */
  description: ReactNode;
  /** Qué se puede hacer, en la columna de la derecha. **Obligatoria y sin default**, por lo mismo. */
  hint: ReactNode;
  /**
   * El código técnico tal cual lo devuelve el servidor (`invalid_client`…),
   * bajo la explicación. No es para quien lee la pantalla: es para que pueda
   * copiarlo en un correo a soporte sin tener que describir el error con sus
   * palabras. Sin él, no se pinta.
   */
  code?: string;
  /**
   * Rótulo del código. **Sin default**: sin él, sale de
   * `connectorRejection.code` del `BrandMessagesProvider`, y solo se lee
   * cuando hay `code`.
   */
  codeLabel?: string;
  /** La salida, como enlace: la vuelta a la herramienta o al acceso. */
  retryHref?: string;
  /** La salida, en modo React (sin `retryHref`). */
  onRetry?: () => void;
  /**
   * Etiqueta de la salida.
   *
   * **Obligatoria y sin default**: nombra a dónde lleva —volver a la
   * herramienta, volver a intentarlo, iniciar sesión—, y de los cinco motivos
   * salen tres salidas distintas. Se pide aunque la salida se monte entera con
   * `retryAction`: un rótulo que se traduce solo a veces acaba sin traducir.
   */
  retryLabel: string;
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
 * Son cinco motivos y una sola plantilla porque lo único que cambia entre
 * ellos es el texto — y ese texto lo pasa el producto: `title`, `description`,
 * `hint` y `retryLabel` son **obligatorias y sin default** desde la v49,
 * porque cada una afirma algo sobre una comprobación de seguridad y eso no lo
 * decide el sistema de diseño (ver `ConnectorRejectionMessages`). El
 * vocabulario de los cinco sigue escrito aquí, en
 * `ConnectorRejectionReason`, para que la aplicación teclee contra él al sacar
 * los cuatro textos de su catálogo.
 *
 * La maqueta es idéntica en los cinco —la explicación a la izquierda, qué
 * hacer y la salida a la derecha—, y sobre todo lo es la postura: **ninguna
 * ofrece reintentar en el sitio**. Ni un botón que repita la petición ni un
 * formulario que la arregle; la conexión se empieza donde se empezó, en la
 * herramienta. Un rechazo de autorización que se pueda reintentar a golpes
 * desde la propia pantalla de rechazo es un fallo de seguridad, no una
 * comodidad, y por eso la salida se llama «volver» y no «reintentar».
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
  title,
  description,
  hint,
  code,
  codeLabel,
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
  const t = useBrandMessages('connectorRejection');

  const salida =
    retryAction ??
    (retryHref !== undefined ? (
      <Button href={retryHref}>{retryLabel}</Button>
    ) : onRetry ? (
      <Button onClick={onRetry}>{retryLabel}</Button>
    ) : null);

  return (
    <ConnectorAuthShell
      title={title}
      description={description}
      intro={
        code !== undefined ? (
          <Paragraph size="small">
            {t('code', codeLabel)}: <Code>{code}</Code>
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
        <Paragraph size="large">{hint}</Paragraph>
        {salida}
      </Stack>
    </ConnectorAuthShell>
  );
}
