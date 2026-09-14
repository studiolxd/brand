import type { ReactNode } from 'react';
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '../../atoms/DescriptionList/DescriptionList';
import { UntrustedText } from './UntrustedText';
import './ConnectorRequestSummary.css';

/** Qué se le concede al conector: leer, o leer y modificar. Son los dos únicos alcances que emite el servidor de autorización (`mcp:read` y `mcp:write`). */
export type ConnectorScope = 'read' | 'write';

export interface ConnectorRequestSummaryProps {
  /**
   * El nombre con el que la herramienta se registró.
   *
   * **Es dato de quien registró el cliente, no de la suite.** El registro es
   * abierto: cualquiera puede darse de alta con el nombre que quiera, así que
   * un «Claude» falso es indistinguible del real. Pásalo como **cadena**: así
   * lo pinta `UntrustedText` —texto plano entrecomillado, con los caracteres
   * invisibles a la vista, aislado de dirección y recortado si es larguísimo—.
   * Un `ReactNode` se pinta tal cual, sin ese tratamiento, porque ya no es
   * texto de fuera sino algo que compusiste tú. Nunca lo pases por
   * `dangerouslySetInnerHTML` ni lo uses para componer una URL.
   */
  clientName: ReactNode;
  /** El producto de la suite al que se pide acceso: bricks, lmsmcp, lrs, sharescorm, tender. */
  productName?: ReactNode;
  /** La cuenta con la que se está decidiendo. Sin sesión —la pantalla de identificarse— no se pasa. */
  accountEmail?: ReactNode;
  /** El alcance concedido. Sin él, la fila no se pinta. */
  scope?: ConnectorScope;
  /**
   * El host al que se enviará el acceso, sacado del `redirect_uri` ya validado
   * contra lo registrado.
   *
   * **Es la única parte de la ficha que quien ataca NO elige**, y por eso está
   * aquí y no en un párrafo suelto: el nombre lo puso quien registró, el host
   * lo impone el registro.
   */
  redirectHost?: ReactNode;
  /** Rótulo de la herramienta. Default castellano: «Herramienta». */
  clientLabel?: string;
  /** Rótulo del producto. Default castellano: «Producto». */
  productLabel?: string;
  /** Rótulo de la cuenta. Default castellano: «Cuenta». */
  accountLabel?: string;
  /** Rótulo del permiso. Default castellano: «Permiso». */
  scopeLabel?: string;
  /** Rótulo del destino. Default castellano: «Destino». */
  redirectLabel?: string;
  /** Valor del permiso de solo lectura. Default castellano, el del servidor de autorización. */
  scopeReadLabel?: ReactNode;
  /** Valor del permiso de lectura y escritura. Default castellano, el del servidor de autorización. */
  scopeWriteLabel?: ReactNode;
  /** Etiqueta del desplegador de un valor recortado. Default castellano: «Ver el valor completo». */
  expandLabel?: string;
  /** Etiqueta del desplegador abierto. Default castellano: «Ver menos». */
  collapseLabel?: string;
  /** Las comillas que enmarcan los valores de fuera. Default castellano: `['«', '»']`. */
  valueQuotes?: [string, string];
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * La ficha de la petición: los cinco hechos que hay que mirar antes de
 * conceder nada —qué herramienta, a qué producto, con qué cuenta, con qué
 * permiso y a dónde va el acceso—, en una `DescriptionList`.
 *
 * Es una **lista de datos, no una frase**, a propósito. La frase de la
 * cabecera («X quiere leer los datos de este producto como tú@ejemplo.com»)
 * se lee de corrido y se cree entera; una ficha obliga a que cada dato tenga
 * su rótulo y se pueda comparar con lo que uno esperaba. Los dos textos dicen
 * lo mismo y conviven: la frase explica, la ficha verifica.
 *
 * Los tres valores que vienen de fuera —el nombre de la herramienta, la cuenta
 * y el host— pasan por `UntrustedText`: texto plano entrecomillado, con los
 * caracteres invisibles a la vista, aislados de dirección y recortados con
 * desplegador si son larguísimos. Ver ahí el porqué de cada una de las tres
 * cosas.
 */
export function ConnectorRequestSummary({
  clientName,
  productName,
  accountEmail,
  scope,
  redirectHost,
  clientLabel = 'Herramienta',
  productLabel = 'Producto',
  accountLabel = 'Cuenta',
  scopeLabel = 'Permiso',
  redirectLabel = 'Destino',
  scopeReadLabel = 'leer los datos de este producto',
  scopeWriteLabel = 'leer y modificar los datos de este producto',
  expandLabel,
  collapseLabel,
  valueQuotes,
  className,
}: ConnectorRequestSummaryProps) {
  // Los tres valores de fuera se pintan igual, y aquí —la ficha, que es donde
  // el dato se compara con lo que uno esperaba— el recorte trae desplegador.
  const ajeno = (value: ReactNode) => (
    <UntrustedText value={value} expandable expandLabel={expandLabel} collapseLabel={collapseLabel} quotes={valueQuotes} />
  );

  return (
    <DescriptionList className={['connector-request-summary', className].filter(Boolean).join(' ')}>
      <DescriptionTerm>{clientLabel}</DescriptionTerm>
      <DescriptionDetails className="connector-request-summary__untrusted">{ajeno(clientName)}</DescriptionDetails>

      {productName !== undefined && (
        <>
          <DescriptionTerm>{productLabel}</DescriptionTerm>
          <DescriptionDetails>{productName}</DescriptionDetails>
        </>
      )}

      {accountEmail !== undefined && (
        <>
          <DescriptionTerm>{accountLabel}</DescriptionTerm>
          <DescriptionDetails className="connector-request-summary__untrusted">{ajeno(accountEmail)}</DescriptionDetails>
        </>
      )}

      {scope !== undefined && (
        <>
          <DescriptionTerm>{scopeLabel}</DescriptionTerm>
          <DescriptionDetails>{scope === 'read' ? scopeReadLabel : scopeWriteLabel}</DescriptionDetails>
        </>
      )}

      {redirectHost !== undefined && (
        <>
          <DescriptionTerm>{redirectLabel}</DescriptionTerm>
          <DescriptionDetails className="connector-request-summary__untrusted">{ajeno(redirectHost)}</DescriptionDetails>
        </>
      )}
    </DescriptionList>
  );
}
