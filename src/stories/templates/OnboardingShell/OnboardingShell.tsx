'use client';

import type { ReactNode } from 'react';
import { PublicPageShell } from '../PublicPageShell/PublicPageShell';
import { Container } from '../../atoms/Container/Container';
import { FormSizeContext } from '../../constants/form-size';
import './OnboardingShell.css';

export interface OnboardingShellProps {
  /** El cuerpo del paso: el formulario, la explicación, lo que toque. */
  children: ReactNode;
  /**
   * La marca, arriba a la izquierda: un `Logo`, o el `Logo` dentro del enlace
   * al inicio. Se pinta en la **ranura de cabecera del marco**, fuera del
   * `main`: es chrome, y respira como la barra pública, no como el contenido.
   * El **alto lo impone la plantilla** —el mismo de la cabecera pública, y con
   * sus mismos peldaños en móvil—, así que la prop `size` del `Logo` no decide
   * el tamaño final: manda el sitio donde se pinta.
   */
  brand?: ReactNode;
  /**
   * Las preferencias globales de la pantalla: idioma y tema. Se pintan en un
   * **pie de chrome propio**, al final y separadas del pie de acciones del
   * paso — una preferencia global no es una acción del flujo y no puede
   * parecerlo. En el alta no hay cabecera pública —el usuario ya tiene sesión,
   * no hay nada que navegar—, así que estos dos son todo el chrome que queda.
   */
  switchers?: ReactNode;
  /**
   * El progreso: un `Stepper`. La ranura se monta siempre; es el `Stepper`
   * quien decide no pintarse cuando el flujo tiene un solo paso.
   */
  stepper?: ReactNode;
  /** La acción principal del paso, la última del renglón: «Continuar», «Terminar». */
  primaryAction?: ReactNode;
  /** «Atrás», la primera del renglón. En el primer paso no se pasa. */
  backAction?: ReactNode;
  /**
   * La salida del paso: «Omitir por ahora», «Cerrar sesión». Va en `text` — es
   * la acción de menos peso de la pantalla y no debe competir con la
   * principal. Se pinta **antes** de la principal: a su izquierda en
   * escritorio, y debajo y centrada en móvil.
   */
  exitAction?: ReactNode;
  /** Nombre accesible del grupo de acciones del pie. Default: «Acciones del paso» (castellano). */
  actionsLabel?: string;
  /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
  id?: string;
  /**
   * Con `false` no monta el marco público ni el `main`: solo la columna del
   * alta, para pintarla dentro de una app que ya tiene su `main`. Por defecto
   * `true`.
   */
  shell?: boolean;
  /** Se añade DESPUÉS de las clases propias del componente. */
  className?: string;
}

/**
 * La plantilla del alta: una columna centrada con la marca arriba, el progreso,
 * el paso y un pie de acciones. Cuelga de `PublicPageShell`, así que lee en la
 * **superficie pública** —cuerpo a 20px, controles `lg`—: el alta no es una
 * pantalla de aplicación, es la puerta.
 *
 * Lo que no lleva, a propósito:
 *
 * - **Cabecera pública.** En el alta el usuario ya tiene sesión; no hay sitio
 *   al que navegar y una barra de marketing solo invitaría a irse. Arriba queda
 *   solo la marca, en la ranura de cabecera del marco —donde iría `SiteHeader`—
 *   y con su mismo aire; idioma y tema bajan a la ranura de pie, al borde
 *   inferior de la ventana y separados del pie de acciones del paso. Las dos
 *   piezas son chrome y viven fuera del `main`: el aire del `Container` con
 *   `space="xl"` gobierna solo el contenido del paso.
 * - **Una sola columna a lo ancho de la página.** El chrome ocupa el ancho
 *   normal de una página pública —la marca cae donde el ojo ya la espera de la
 *   pantalla de acceso—, y lo que se acota a la medida de lectura y se centra
 *   es solo la columna del paso: un formulario de cinco campos pegado al borde
 *   izquierdo de una pantalla de 27 pulgadas no se lee.
 *
 * El pie de acciones fija la jerarquía en un solo sitio, para que ninguna
 * pantalla del alta la reinvente: la principal cierra el renglón por la
 * derecha, con la salida (`text`) pegada a su izquierda y «Atrás» abriendo. Es
 * el mismo criterio que el pie de un `Form`: la principal, la última. En móvil
 * la principal sube a todo el ancho y la salida cae centrada debajo, como en
 * `Form` con acciones en bloque.
 *
 * **Y también la talla**: el pie reparte `lg` a lo que reciba por el contexto
 * de talla del sistema (`FormSizeContext`, el mismo que usa `Form` con sus
 * campos y `Hero` con sus acciones), así que las acciones del paso salen a la
 * talla de la superficie pública sin que cada pantalla tenga que acordarse de
 * pedirla — y a la misma que los campos del formulario que tienen encima.
 */
export function OnboardingShell({
  children,
  brand,
  switchers,
  stepper,
  primaryAction,
  backAction,
  exitAction,
  actionsLabel = 'Acciones del paso',
  id = 'main-content',
  shell = true,
  className,
}: OnboardingShellProps) {
  const hayAcciones = Boolean(primaryAction || backAction || exitAction);
  const preferencias = switchers && <div className="onboarding-shell__switchers">{switchers}</div>;
  const marca = brand && <div className="onboarding-shell__brand">{brand}</div>;

  return (
    <PublicPageShell
      id={id}
      shell={shell}
      header={
        marca && (
          <Container
            as="header"
            className="onboarding-shell__top onboarding-shell__top--band"
            innerClassName="onboarding-shell__bar"
          >
            {marca}
          </Container>
        )
      }
      footer={
        preferencias && (
          <Container as="footer" className="onboarding-shell__settings onboarding-shell__settings--band">
            {preferencias}
          </Container>
        )
      }
    >
      <div className={['onboarding-shell', className].filter(Boolean).join(' ')}>
        {!shell && marca && <header className="onboarding-shell__top onboarding-shell__bar">{marca}</header>}

        <div className="onboarding-shell__step">
          {stepper && <div className="onboarding-shell__progress">{stepper}</div>}

          <div className="onboarding-shell__body">{children}</div>

          {hayAcciones && (
            <div className="onboarding-shell__actions" role="group" aria-label={actionsLabel}>
              <FormSizeContext.Provider value="lg">
                {backAction}
                {(exitAction || primaryAction) && (
                  <div className="onboarding-shell__decisions">
                    {exitAction && <div className="onboarding-shell__exit">{exitAction}</div>}
                    {primaryAction}
                  </div>
                )}
              </FormSizeContext.Provider>
            </div>
          )}
        </div>

        {!shell && preferencias && <footer className="onboarding-shell__settings">{preferencias}</footer>}
      </div>
    </PublicPageShell>
  );
}
