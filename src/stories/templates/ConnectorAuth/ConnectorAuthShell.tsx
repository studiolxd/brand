'use client';

import { forwardRef, type ReactNode } from 'react';
import { PublicPageShell } from '../PublicPageShell/PublicPageShell';
import { Columns } from '../../atoms/Columns/Columns';
import { Stack } from '../../atoms/Stack/Stack';
import { PageIntro } from '../../molecules/PageIntro/PageIntro';
import { FormSizeContext } from '../../constants/form-size';

/**
 * El chrome que las cuatro pantallas del conector reenvían al marco público.
 * Va aparte para que cada plantilla lo extienda sin volver a escribirlo: son
 * las mismas ranuras que ya tiene `PublicPageShell`, ni una más.
 *
 * Quien cablee estas pantallas **tiene que rellenarlas**. El servidor de
 * autorización sirve el consentimiento fuera de la aplicación —sin su chasis—,
 * así que la cabecera pública, el pie legal y la banda de preferencias no le
 * llegan de ningún layout: entran por aquí o no existen.
 */
export interface ConnectorAuthChromeProps {
  /** Cabecera pública (`SiteHeader`). Va dentro de un `ErrorBoundary` del marco. */
  header?: ReactNode;
  /** Pie legal (`LegalFooter`). Ídem. */
  footer?: ReactNode;
  /**
   * Idioma y tema, en la banda de preferencias del marco. En estas pantallas
   * el idioma no es un adorno: el servidor de autorización lo saca de la
   * cookie `NEXT_LOCALE` o de `Accept-Language`, y quien llegue en el idioma
   * equivocado necesita poder cambiarlo **aquí**, porque no hay ninguna otra
   * pantalla de la suite alrededor donde hacerlo.
   */
  preferences?: ReactNode;
  /**
   * Nombre accesible de la banda de preferencias. **Reenvío puro** al
   * `PublicPageShell`, que lee `publicPageShell.preferences` del
   * `BrandMessagesProvider` por su cuenta: ya no hace falta pasarlo para
   * traducir, y el marco no repite la clave.
   */
  preferencesLabel?: string;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
  /**
   * Con `false` no monta el marco público ni el `main`: solo las dos columnas,
   * para pintarlas dentro de una aplicación que ya tiene su `main`. Por
   * defecto `true`. Sin marco, `header`, `footer`, `preferences` e `id` no
   * aplican —ni el `ref`, porque no hay marco al que engancharlo.
   */
  shell?: boolean;
}

export interface ConnectorAuthShellProps extends ConnectorAuthChromeProps {
  /** El título de la pantalla: `Heading` de nivel 1 vía `PageIntro`, columna izquierda. */
  title: ReactNode;
  /** La frase bajo el título, columna izquierda. Es una frase y termina en punto. */
  description?: ReactNode;
  /** Más texto bajo la frase, misma columna. */
  intro?: ReactNode;
  /** Bajo la cabecera, en su misma columna: un enlace de vuelta. El aire lo pone el `PageIntro`. */
  aside?: ReactNode;
  /** La columna de la derecha: la decisión —el formulario, la ficha, los botones—. */
  children: ReactNode;
  /** Se añade DESPUÉS de las clases propias. */
  className?: string;
}

/**
 * El marco de las pantallas del conector: **el mismo que el de acceso**.
 *
 * Conectar una herramienta es una pantalla pública de una sola decisión, de la
 * familia de iniciar sesión, recuperar la contraseña o verificar el correo:
 * cuelga de `PublicPageShell` —cabecera pública, `main` acotado, banda de
 * preferencias y pie legal—, se maqueta en dos columnas (`Columns`, la
 * cabecera a la izquierda y la decisión a la derecha) y reparte talla `lg` a
 * todo lo que lleve dentro, que es la talla de la superficie pública. Ninguna
 * de las cuatro pantallas inventa su propio contenedor.
 *
 * La consecuencia de esa decisión es de cableado, no de diseño: el servidor de
 * autorización **sirve el consentimiento fuera de la aplicación**, así que
 * quien lo monte tiene que pasar el chrome por props (`header`, `footer`,
 * `preferences`) — no le va a llegar de ningún layout. Por eso las ranuras
 * están en la plantilla y no dentro de ella.
 *
 * **Reenvía el `ref` al nodo del marco** (`.site-shell`), que es el
 * `container` que pide un panel flotante abierto desde la página (el de
 * cookies, un `Modal`): su portal monta en `document.body`, que no hereda el
 * remapeo de superficie pública.
 */
export const ConnectorAuthShell = forwardRef<HTMLDivElement, ConnectorAuthShellProps>(
  function ConnectorAuthShell(
    { title, description, intro, aside, children, header, footer, preferences, preferencesLabel, id, shell, className },
    ref,
  ) {
    const cabecera = (
      <PageIntro title={title} description={description}>
        {intro}
      </PageIntro>
    );

    return (
      <PublicPageShell
        ref={ref}
        header={header}
        footer={footer}
        preferences={preferences}
        preferencesLabel={preferencesLabel}
        id={id}
        shell={shell}
      >
        {/* La talla la reparte la pantalla entera, no solo su pie: es
            superficie pública, y ahí los controles van a `lg`. Un `Form` de
            dentro la vuelve a pedir explícitamente —declara su propio
            contexto— pero un botón o un enlace sueltos la heredan de aquí. */}
        <FormSizeContext.Provider value="lg">
          <Columns className={className}>
            {aside ? (
              <Stack mobileOrder="reverse">
                {cabecera}
                {aside}
              </Stack>
            ) : (
              cabecera
            )}
            {children}
          </Columns>
        </FormSizeContext.Provider>
      </PublicPageShell>
    );
  },
);
