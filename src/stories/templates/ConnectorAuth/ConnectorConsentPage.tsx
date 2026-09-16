'use client';

import type { ReactNode } from 'react';
import { ConnectorAuthShell, type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { ConnectorRequestSummary, type ConnectorScope } from './ConnectorRequestSummary';
import { UntrustedText } from './UntrustedText';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Form } from '../../molecules/Form/Form';
import { useBrandMessages } from '../../messages/BrandMessagesContext';

/**
 * El cromo de la pantalla de consentimiento, y **solo el cromo**: cómo se
 * titula y cómo se llama la salida que no concede nada.
 *
 * Todo lo demás de esta pantalla se queda fuera del catálogo y pasa a ser prop
 * obligatoria, porque **afirma algo**: la frase que cuenta qué se pide
 * (`intro`), el aviso de a dónde sale el acceso (`redirectNotice`), qué se
 * concede (`scopeReadLabel`/`scopeWriteLabel`) y el rótulo del botón que
 * concede (`approveLabel`). Es la misma línea que ya separa
 * `confirmDialog.cancel` —cromo— de `ConfirmDialog.confirmLabel` —obligatoria,
 * porque nombra la consecuencia—.
 */
export interface ConnectorConsentMessages {
  /** Título de la pantalla. */
  title: string;
  /**
   * Rótulo del botón que no concede nada. Es cromo por la misma razón que
   * «Cancelar»: describe lo único que hace —no seguir— y no hay consecuencia
   * que nombrar.
   */
  deny: string;
}

export interface ConnectorConsentPageProps extends ConnectorAuthChromeProps {
  /** El nombre con el que la herramienta se registró. **Dato de fuera**: ver `ConnectorRequestSummary`. */
  clientName: string;
  /** El producto de la suite al que se pide acceso. */
  productName?: ReactNode;
  /** La cuenta con la que se está decidiendo. */
  accountEmail: string;
  /** Qué se concede. Default: `'read'`. */
  scope?: ConnectorScope;
  /** El host al que se enviará el acceso, sacado del `redirect_uri` ya validado. */
  redirectHost: string;
  /**
   * Destino del envío nativo. **Con `action` la pantalla funciona sin una
   * línea de JavaScript**: el bloque de decisión es un `<form method="post">`
   * de verdad y los dos botones son `submit`. Es el modo que necesita el
   * servidor de autorización, que la sirve con
   * `Content-Security-Policy: default-src 'none'` —ni un script, ni una hoja
   * de estilos externa— y por tanto no puede depender de un `onClick`.
   *
   * Sin `action`, los botones son botones y la decisión sale por `onApprove` /
   * `onDeny`: el modo de montarla dentro de una aplicación React.
   */
  action?: string | ((formData: FormData) => void | Promise<void>);
  /**
   * Los parámetros de OAuth que tienen que viajar con la decisión —`client_id`,
   * `redirect_uri`, `code_challenge`, `state`, `scope`, `consent_nonce`—, como
   * `<input type="hidden">`. Son **datos en tránsito, no interfaz**: la
   * plantilla no los lee ni los valida, solo los devuelve intactos.
   */
  hiddenFields?: Record<string, string>;
  /** Nombre del campo que distingue la decisión en el envío nativo. Default: `'decision'`. */
  decisionName?: string;
  /** Valor que envía el botón de permitir. Default: `'approve'`. */
  approveValue?: string;
  /** Valor que envía el botón de denegar. Default: `'deny'`. */
  denyValue?: string;
  /** La decisión afirmativa, en modo React (sin `action`). */
  onApprove?: () => void;
  /** La negativa, en modo React (sin `action`). */
  onDeny?: () => void;
  /**
   * Denegar como enlace en vez de como envío: la vuelta a la herramienta con
   * `error=access_denied`, ya compuesta por el servidor. Manda sobre
   * `onDeny` y sobre el envío nativo.
   */
  denyHref?: string;
  /**
   * Dónde empieza el foco. Default `'none'`: **la pantalla no enfoca nada**, y
   * el primer tabulador cae en denegar porque es el primero del DOM. Con
   * `'deny'` se enfoca denegar al cargar. Permitir no es una opción, y no se
   * va a añadir: conceder acceso no puede estar a un Intro de distancia de
   * abrir la página.
   */
  initialFocus?: 'none' | 'deny';
  /** Título de la pantalla. **Sin default**: sin él, sale de `connectorConsent.title`. */
  title?: ReactNode;
  /**
   * La frase de la cabecera. Recibe las tres piezas ya compuestas —la
   * herramienta y la cuenta en negrita, el permiso en texto corriente— porque
   * el orden cambia con el idioma (en alemán la cuenta va antes del permiso).
   *
   * **Obligatoria y sin default**: es la frase que cuenta qué se está
   * consintiendo, y el sistema de diseño no puede escribirla por el producto.
   */
  intro: (parts: { client: ReactNode; what: ReactNode; email: ReactNode }) => ReactNode;
  /**
   * El aviso de a dónde se enviará el acceso, bajo la ficha. Recibe el host ya
   * en negrita. Va a tamaño de cuerpo, no de nota al pie: es la señal que
   * convierte una suplantación en visible y no puede leerse como letra
   * pequeña.
   *
   * **Obligatoria y sin default**: afirma a dónde sale el acceso y qué hacer
   * si no se reconoce el destino. Un texto de catálogo la dejaría diciendo lo
   * mismo en todas partes sin que nada fallara.
   */
  redirectNotice: (parts: { host: ReactNode }) => ReactNode;
  /**
   * Etiqueta del botón que concede.
   *
   * **Obligatoria y sin default, y fuera del catálogo**: es donde se toma la
   * decisión, y tiene que nombrar la consecuencia. Mismo caso —y misma
   * respuesta— que `ConfirmDialog.confirmLabel`.
   */
  approveLabel: string;
  /** Etiqueta del botón que deniega. **Sin default**: sin ella, sale de `connectorConsent.deny`. */
  denyLabel?: string;
  /**
   * Qué se concede con `mcp:read`, para la frase y para la ficha.
   * **Obligatoria y sin default**: ver `ConnectorRequestSummary`.
   */
  scopeReadLabel: string;
  /** Ídem, lectura y escritura. **Obligatoria y sin default**. */
  scopeWriteLabel: string;
  /** Reenvío puro a `UntrustedText` (`untrustedText.expand`). */
  expandLabel?: string;
  /** Reenvío puro a `UntrustedText` (`untrustedText.collapse`). */
  collapseLabel?: string;
  /** Reenvío puro a `UntrustedText` (`untrustedText.quotes`), aquí y en la ficha. */
  valueQuotes?: [string, string];
  /** Rótulos de la ficha. Ver `ConnectorRequestSummary`. */
  summaryLabels?: Pick<
    React.ComponentProps<typeof ConnectorRequestSummary>,
    'clientLabel' | 'productLabel' | 'accountLabel' | 'scopeLabel' | 'redirectLabel'
  >;
  /** Bajo las acciones: un enlace de ayuda, la política de la suite. Se pinta en `links` del `Form`. */
  links?: ReactNode;
}

/**
 * **La pantalla principal del flujo**: una herramienta pide acceso a un
 * producto de la suite y hay que concederlo o denegarlo.
 *
 * La cabecera cuenta la petición en una frase; la columna de la decisión la
 * repite como ficha verificable (`ConnectorRequestSummary`), avisa de a dónde
 * saldrá el acceso y ofrece las dos salidas. Nada más: no hay recordar la
 * decisión, ni elegir alcance a la carta, ni ver qué se llevó la última vez.
 * Una pantalla de una sola decisión.
 *
 * ### Las dos acciones
 *
 * Denegar va **primera en el DOM** y permitir después, como el `Cancelar` de
 * un diálogo del sistema: el recorrido del teclado abre por la salida segura.
 * Visualmente permitir es la principal —es la que ejecuta— y denegar va en
 * `outline`; apiladas (`blockActions`, como el resto de la familia de acceso)
 * permitir queda arriba, que es donde el pulgar espera la acción del
 * formulario. Lo que **no** pasa en ninguna talla es que conceder acceso se
 * lleve el foco al cargar: ver `initialFocus`.
 *
 * ### Sin JavaScript
 *
 * Con `action` la pantalla es un formulario nativo y funciona con los scripts
 * desactivados, que es como la sirve hoy el servidor de autorización. Sin
 * `action` es una pantalla de React con dos callbacks. Las dos formas pintan
 * exactamente lo mismo.
 */
export function ConnectorConsentPage({
  clientName,
  productName,
  accountEmail,
  scope = 'read',
  redirectHost,
  action,
  hiddenFields,
  decisionName = 'decision',
  approveValue = 'approve',
  denyValue = 'deny',
  onApprove,
  onDeny,
  denyHref,
  initialFocus = 'none',
  title,
  intro,
  redirectNotice,
  approveLabel,
  denyLabel,
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
}: ConnectorConsentPageProps) {
  const t = useBrandMessages('connectorConsent');
  const nativo = action !== undefined;
  const alcance = scope === 'read' ? scopeReadLabel : scopeWriteLabel;

  // Dentro de una frase el valor de fuera va sin desplegador: un `<details>` no
  // puede vivir dentro de un `<p>`. El recorte sí, y el texto completo se ve
  // desplegando el mismo dato en la ficha.
  const ajeno = (value: string) => <UntrustedText value={value} quotes={valueQuotes} />;

  // Denegar: enlace si el servidor ya compuso la vuelta, envío si la pantalla
  // es nativa, botón si vive dentro de una aplicación React.
  const denegar = denyHref !== undefined ? (
    <Button variant="outline" href={denyHref}>
      {t('deny', denyLabel)}
    </Button>
  ) : (
    <Button
      variant="outline"
      type={nativo ? 'submit' : 'button'}
      name={nativo ? decisionName : undefined}
      value={nativo ? denyValue : undefined}
      onClick={onDeny}
      autoFocus={initialFocus === 'deny'}
    >
      {t('deny', denyLabel)}
    </Button>
  );

  const permitir = (
    <Button
      type={nativo ? 'submit' : 'button'}
      name={nativo ? decisionName : undefined}
      value={nativo ? approveValue : undefined}
      onClick={onApprove}
    >
      {approveLabel}
    </Button>
  );

  return (
    <ConnectorAuthShell
      title={title ?? t('title')}
      description={intro({
        client: <strong>{ajeno(clientName)}</strong>,
        what: alcance,
        email: <strong>{ajeno(accountEmail)}</strong>,
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
        /* `method` solo con una URL: con una acción de servidor lo pone React. */
        method={typeof action === 'string' ? 'post' : undefined}
        action={action}
        links={links}
        actions={
          <>
            {denegar}
            {permitir}
          </>
        }
      >
        {hiddenFields &&
          Object.entries(hiddenFields).map(([name, value]) => (
            <input key={name} type="hidden" name={name} value={value} />
          ))}

        <ConnectorRequestSummary
          clientName={clientName}
          productName={productName}
          accountEmail={accountEmail}
          scope={scope}
          redirectHost={redirectHost}
          scopeReadLabel={scopeReadLabel}
          scopeWriteLabel={scopeWriteLabel}
          expandLabel={expandLabel}
          collapseLabel={collapseLabel}
          valueQuotes={valueQuotes}
          {...summaryLabels}
        />

        <Paragraph>{redirectNotice({ host: <strong>{ajeno(redirectHost)}</strong> })}</Paragraph>
      </Form>
    </ConnectorAuthShell>
  );
}
