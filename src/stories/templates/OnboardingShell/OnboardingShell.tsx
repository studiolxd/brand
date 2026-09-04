'use client';

import type { ReactNode } from 'react';
import { PublicPageShell } from '../PublicPageShell/PublicPageShell';
import './OnboardingShell.css';

export interface OnboardingShellProps {
  /** El cuerpo del paso: el formulario, la explicación, lo que toque. */
  children: ReactNode;
  /** La marca, arriba a la izquierda: un `Logo`, o el `Logo` dentro del enlace al inicio. */
  brand?: ReactNode;
  /**
   * Los conmutadores de la barra superior, a la derecha: idioma y tema. En el
   * alta no hay cabecera pública —el usuario ya tiene sesión, no hay nada que
   * navegar—, así que estos dos son todo el chrome.
   */
  switchers?: ReactNode;
  /**
   * El progreso: un `Stepper`. La ranura se monta siempre; es el `Stepper`
   * quien decide no pintarse cuando el flujo tiene un solo paso.
   */
  stepper?: ReactNode;
  /** La acción principal del paso, la de la derecha: «Continuar», «Terminar». */
  primaryAction?: ReactNode;
  /** «Atrás», a la izquierda de la principal. En el primer paso no se pasa. */
  backAction?: ReactNode;
  /**
   * La salida del paso, separada del par «Atrás»/principal y al otro extremo:
   * «Omitir por ahora», «Cerrar sesión». Va en `ghost` — es la acción de menos
   * peso de la pantalla y no debe competir con la principal.
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
 *   al que navegar y una barra de marketing solo invitaría a irse. Solo quedan
 *   las dos ranuras de conmutadores.
 * - **Ancho de página.** La columna se acota a la medida de lectura y se
 *   centra: un formulario de cinco campos pegado al borde izquierdo de una
 *   pantalla de 27 pulgadas no se lee.
 *
 * El pie de acciones fija la jerarquía en un solo sitio, para que ninguna
 * pantalla del alta la reinvente: la principal a la derecha, «Atrás» a su
 * izquierda, y la salida (`ghost`) separada al otro extremo.
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

  return (
    <PublicPageShell id={id} shell={shell}>
      <div className={['onboarding-shell', className].filter(Boolean).join(' ')}>
        {(brand || switchers) && (
          <header className="onboarding-shell__top">
            {brand && <div className="onboarding-shell__brand">{brand}</div>}
            {switchers && <div className="onboarding-shell__switchers">{switchers}</div>}
          </header>
        )}

        {stepper && <div className="onboarding-shell__progress">{stepper}</div>}

        <div className="onboarding-shell__body">{children}</div>

        {hayAcciones && (
          <div className="onboarding-shell__actions" role="group" aria-label={actionsLabel}>
            {exitAction && <div className="onboarding-shell__exit">{exitAction}</div>}
            <div className="onboarding-shell__decisions">
              {backAction}
              {primaryAction}
            </div>
          </div>
        )}
      </div>
    </PublicPageShell>
  );
}
