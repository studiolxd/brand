'use client';

import type { ReactNode } from 'react';
import { ConnectorAuthShell, type ConnectorAuthChromeProps } from './ConnectorAuthShell';
import { Alert } from '../../molecules/Alert/Alert';
import { Button } from '../../atoms/Button/Button';
import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { Stack } from '../../atoms/Stack/Stack';
import { Form } from '../../molecules/Form/Form';
import { InputField } from '../../molecules/InputField/InputField';

export interface ConnectorExternalSignInPageProps extends ConnectorAuthChromeProps {
  /**
   * Cómo se llama la instalación de la que es el conector, para la frase y
   * para el botón. Default castellano: «tu Moodle», que hoy es el único
   * conector de esta forma; cambiarlo sirve a cualquier otra instalación
   * ajena a la suite.
   */
  platformName?: ReactNode;
  /**
   * La organización a la que se va a entrar, **ya resuelta**: el conector vive
   * en un subdominio y el servidor la saca del `resource` de la petición. Con
   * ella, la pantalla solo la confirma. Sin ella pinta el campo para
   * escribirla, que es el caso de una conexión al dominio pelado.
   */
  organization?: ReactNode;
  /** Valor inicial del campo de organización, cuando hay que escribirla. */
  organizationDefaultValue?: string;
  /** `name` del campo de organización en el envío. Default: `'org'`. */
  organizationName?: string;
  /** Destino del envío. La acción de servidor que arranca el salto a la instalación. */
  action?: string;
  /** El envío, en modo React (sin `action`). */
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  /** Los parámetros de OAuth que tienen que sobrevivir al salto, como `<input type="hidden">`. */
  hiddenFields?: Record<string, string>;
  /** Un fallo del intento anterior —«no hay ninguna conexión para esa organización»—, sobre el formulario. */
  error?: ReactNode;
  /** Título de la pantalla. Default castellano: «Autorizar la conexión». */
  title?: ReactNode;
  /** La frase de la cabecera. Recibe el nombre de la instalación. Default castellano. */
  intro?: (parts: { platform: ReactNode }) => ReactNode;
  /** La frase que confirma a dónde se entra, con `organization`. Default castellano. */
  signingInTo?: (parts: { organization: ReactNode }) => ReactNode;
  /** Etiqueta del campo de organización. Default castellano: «Tu organización». */
  organizationLabel?: string;
  /** Etiqueta de la acción. Recibe el nombre de la instalación. Default castellano. */
  submitLabel?: (parts: { platform: ReactNode }) => ReactNode;
  /**
   * Debajo del formulario: lo que no es del sistema de diseño. Es la ranura
   * donde el producto cuelga su andamio de desarrollo —pegar una clave de MCP,
   * detrás de un `Accordion`— sin que el DS tenga que conocerlo.
   */
  extra?: ReactNode;
  /** Bajo la acción: ayuda, un enlace de vuelta. Se pinta en `links` del `Form`. */
  links?: ReactNode;
}

/**
 * **El caso del conector de Moodle**, que no se parece a los otros tres y por
 * eso tiene pantalla propia.
 *
 * En los conectores de la suite, quien concede es la suite: hay sesión, hay
 * consentimiento y el acceso sale de aquí. En el de Moodle **el conector es de
 * la instalación del cliente**, así que no hay nada que consentir en la suite:
 * la pantalla solo confirma a qué organización se entra y manda a
 * identificarse a su Moodle, que es quien decide. De ahí que no lleve ni ficha
 * de permisos ni botón de denegar — denegar, aquí, es no seguir.
 *
 * Es la única de la familia que **pide un dato**: cuando la organización no
 * viene en la petición (una conexión al dominio pelado), hay que escribirla.
 * Con la organización resuelta, el campo desaparece y queda una frase de
 * confirmación: la pantalla no pregunta lo que ya sabe.
 *
 * Lleva el marco y la talla del resto de la familia —`PublicPageShell`, dos
 * columnas, controles `lg`—, que es lo que hace que las dos familias de
 * conector se lean como hermanas. En el producto esta pantalla vive hoy en una
 * `Card` dentro de una columna estrecha, sin cabecera pública ni pie: al
 * cablearla, ese molde propio se retira y lo pone la plantilla.
 */
export function ConnectorExternalSignInPage({
  platformName = 'tu Moodle',
  organization,
  organizationDefaultValue,
  organizationName = 'org',
  action,
  onSubmit,
  hiddenFields,
  error,
  title = 'Autorizar la conexión',
  intro = ({ platform }) => (
    <>
      Tu asistente de IA solicita acceso a {platform}. Inicia sesión con tu cuenta para autorizarlo.
    </>
  ),
  signingInTo = ({ organization: org }) => <>Iniciarás sesión en {org}.</>,
  organizationLabel = 'Tu organización',
  submitLabel = ({ platform }) => <>Iniciar sesión con {platform}</>,
  extra,
  links,
  header,
  footer,
  preferences,
  preferencesLabel,
  id,
  shell,
}: ConnectorExternalSignInPageProps) {
  return (
    <ConnectorAuthShell
      title={title}
      description={intro({ platform: platformName })}
      header={header}
      footer={footer}
      preferences={preferences}
      preferencesLabel={preferencesLabel}
      id={id}
      shell={shell}
    >
      {/* La columna de la decisión: el aviso de fallo, el formulario y el
          andamio del producto, separados por el aire del sistema. `Stack` con
          `align="stretch"` y no una caja propia — no hace falta CSS nuevo para
          apilar tres bloques. */}
      <Stack align="stretch">
        {error !== undefined && <Alert role="alert" variant="error" description={error} />}

        <Form
          size="lg"
          blockActions
          method={action !== undefined ? 'post' : undefined}
          action={action}
          onSubmit={onSubmit}
          links={links}
          actions={<Button type="submit">{submitLabel({ platform: platformName })}</Button>}
        >
          {hiddenFields &&
            Object.entries(hiddenFields).map(([name, value]) => (
              <input key={name} type="hidden" name={name} value={value} />
            ))}

          {organization === undefined ? (
            <InputField
              id={organizationName}
              name={organizationName}
              label={organizationLabel}
              defaultValue={organizationDefaultValue}
              autoComplete="off"
              required
            />
          ) : (
            <Paragraph>{signingInTo({ organization: <strong>{organization}</strong> })}</Paragraph>
          )}
        </Form>

        {extra}
      </Stack>
    </ConnectorAuthShell>
  );
}
