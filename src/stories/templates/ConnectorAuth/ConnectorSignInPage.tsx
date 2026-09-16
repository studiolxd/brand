'use client';

import type { ReactNode } from 'react';
import { ConnectorAuthShell, type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { ConnectorRequestSummary, type ConnectorScope } from './ConnectorRequestSummary';
import { UntrustedText } from './UntrustedText';
import { Button } from '../../atoms/Button/Button';
import { Form } from '../../molecules/Form/Form';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

/**
 * El cromo de la pantalla de identificarse dentro del flujo del conector.
 *
 * Aquí **no se concede nada** —la única acción es iniciar sesión—, así que el
 * título y el rótulo de la acción sí son cromo: describen lo que hace el
 * control, no una consecuencia sobre los datos de nadie. La frase que cuenta
 * qué pide la herramienta (`intro`) y qué se pedirá (`scopeReadLabel` /
 * `scopeWriteLabel`) siguen fuera, obligatorias.
 */
export interface ConnectorSignInMessages {
  /** Título de la pantalla. */
  title: string;
  /** Rótulo de la acción de identificarse. */
  signIn: string;
  /**
   * Cómo se nombra el producto en la frase cuando la pantalla no recibe
   * `productName` («este producto»). Es un relleno genérico, no el nombre de
   * nada: el nombre de verdad viaja en `productName`.
   */
  fallbackProduct: string;
}

export interface ConnectorSignInPageProps extends ConnectorAuthChromeProps {
  /** El nombre con el que la herramienta se registró. **Dato de fuera**: ver `ConnectorRequestSummary`. */
  clientName: string;
  /** El producto de la suite al que se pide acceso. */
  productName?: ReactNode;
  /** Qué pide la herramienta. Se enseña ya aquí: quien se identifica tiene derecho a saber para qué. */
  scope?: ConnectorScope;
  /** El host al que se enviaría el acceso. */
  redirectHost?: string;
  /**
   * A dónde se va a identificar: el acceso de la suite, con la vuelta a esta
   * misma petición ya compuesta por el servidor. Con él, la acción es un
   * enlace y la pantalla **no necesita JavaScript**.
   */
  signInHref?: string;
  /** La acción, en modo React (sin `signInHref`). */
  onSignIn?: () => void;
  /** Destino del envío nativo, para reanudar la petición por POST en vez de por enlace. */
  action?: string;
  /** Los parámetros de OAuth que tienen que sobrevivir al acceso, como `<input type="hidden">`. */
  hiddenFields?: Record<string, string>;
  /** Título de la pantalla. **Sin default**: sin él, sale de `connectorSignIn.title`. */
  title?: ReactNode;
  /**
   * La frase de la cabecera. Recibe la herramienta y el producto ya
   * compuestos.
   *
   * **Obligatoria y sin default**: cuenta qué herramienta hay detrás y para
   * qué se está tecleando una contraseña. Eso no lo escribe un catálogo de
   * cromo.
   */
  intro: (parts: { client: ReactNode; product: ReactNode }) => ReactNode;
  /**
   * Cómo se nombra el producto en la frase cuando no se pasa `productName`.
   * **Sin default**: sin ella, sale de `connectorSignIn.fallbackProduct`, y
   * solo se lee cuando falta `productName`.
   */
  fallbackProductName?: ReactNode;
  /** Etiqueta de la acción. **Sin default**: sin ella, sale de `connectorSignIn.signIn`. */
  signInLabel?: string;
  /**
   * Qué se pedirá con `mcp:read`. **Obligatoria y sin default**: ver
   * `ConnectorRequestSummary`. Solo se pinta si hay `scope`, pero se pide
   * siempre — un alcance que se muestra a veces no puede depender de que
   * alguien se acordara de traducirlo.
   */
  scopeReadLabel: string;
  /** Ídem, lectura y escritura. **Obligatoria y sin default**. */
  scopeWriteLabel: string;
  /** Reenvío puro a `UntrustedText` (`untrustedText.expand`). */
  expandLabel?: string;
  /** Reenvío puro a `UntrustedText` (`untrustedText.collapse`). */
  collapseLabel?: string;
  /** Reenvío puro a `UntrustedText` (`untrustedText.quotes`). */
  valueQuotes?: [string, string];
  /** Rótulos de la ficha. Ver `ConnectorRequestSummary`. */
  summaryLabels?: Pick<
    React.ComponentProps<typeof ConnectorRequestSummary>,
    'clientLabel' | 'productLabel' | 'scopeLabel' | 'redirectLabel'
  >;
  /** Bajo la acción: «¿No tienes cuenta?», ayuda. Se pinta en `links` del `Form`. */
  links?: ReactNode;
}

/**
 * Se ha llegado al conector **sin sesión**: no hay con qué cuenta conceder
 * nada, así que primero hay que identificarse y luego se vuelve a la pantalla
 * de consentimiento.
 *
 * Enseña ya la ficha de la petición —menos la cuenta, que es justo lo que
 * falta—. Es deliberado: quien va a teclear una contraseña tiene derecho a
 * saber antes qué herramienta está detrás y a dónde va a salir el acceso, y no
 * enterarse dos pantallas más tarde. Y no concede nada: la única acción es
 * identificarse, así que aquí sí es la principal y puede llevarse el foco.
 *
 * Es la pantalla que hoy no existe —el servidor redirige directamente al
 * refresco de sesión del hub— y la que hace falta en cuanto la vuelta falla o
 * el usuario se planta en medio del camino.
 */
export function ConnectorSignInPage({
  clientName,
  productName,
  scope,
  redirectHost,
  signInHref,
  onSignIn,
  action,
  hiddenFields,
  title,
  intro,
  fallbackProductName,
  signInLabel,
  scopeReadLabel,
  scopeWriteLabel,
  expandLabel,
  collapseLabel,
  valueQuotes,
  summaryLabels,
  links,
  header,
  footer,
  preferences,
  preferencesLabel,
  id,
  shell,
}: ConnectorSignInPageProps) {
  const t = useBrandMessages('connectorSignIn');
  const nativo = action !== undefined;

  const acceder = signInHref !== undefined ? (
    <Button href={signInHref}>{t('signIn', signInLabel)}</Button>
  ) : (
    <Button type={nativo ? 'submit' : 'button'} onClick={onSignIn}>
      {t('signIn', signInLabel)}
    </Button>
  );

  return (
    <ConnectorAuthShell
      title={title ?? t('title')}
      description={intro({
        client: (
          <strong>
            <UntrustedText value={clientName} quotes={valueQuotes} />
          </strong>
        ),
        product: productName ?? fallbackProductName ?? t('fallbackProduct'),
      })}
      header={header}
      footer={footer}
      preferences={preferences}
      preferencesLabel={preferencesLabel}
      id={id}
      shell={shell}
    >
      <Form
        size="lg"
        blockActions
        method={nativo ? 'post' : undefined}
        action={action}
        links={links}
        actions={acceder}
      >
        {hiddenFields &&
          Object.entries(hiddenFields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}

        <ConnectorRequestSummary
          clientName={clientName}
          productName={productName}
          scope={scope}
          redirectHost={redirectHost}
          scopeReadLabel={scopeReadLabel}
          scopeWriteLabel={scopeWriteLabel}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
          valueQuotes={valueQuotes}
          {...summaryLabels}
        />
      </Form>
    </ConnectorAuthShell>
  );
}
