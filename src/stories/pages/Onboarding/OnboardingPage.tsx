import type { ReactNode } from 'react';
import { AppRoot } from '../../sections/AppRoot/AppRoot';
import { OnboardingShell } from '../../templates/OnboardingShell/OnboardingShell';
import { Stepper, type StepperStep } from '../../molecules/Stepper/Stepper';
import { Logo } from '../../atoms/Logo/Logo';
import { LanguageSwitcher } from '../../molecules/LanguageSwitcher/LanguageSwitcher';
import { ThemeSwitcher } from '../../molecules/ThemeSwitcher/ThemeSwitcher';

/** Los cuatro pasos del alta del hub. */
const PASOS_ALTA: StepperStep[] = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'organizacion', label: 'Organización' },
  { id: 'logotipo', label: 'Logotipo' },
  { id: 'invitaciones', label: 'Invitaciones' },
];

/** Los seis idiomas de la suite, cada uno en el suyo. */
const IDIOMAS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'pt', label: 'Português' },
];

/**
 * Qué pasos se pueden pulsar en el progreso, que es la regla del alta:
 *
 * - **el perfil**, nunca: está hecho y su ruta rebota en cuanto se completa,
 *   así que no es un destino al que se pueda llegar;
 * - **la organización**, siempre: volver a ella con la organización ya creada
 *   la renombra en lugar de crear otra;
 * - **el logotipo y las invitaciones**, solo con la organización creada: el
 *   paso de la organización *la crea*, y estos dos no existen sin ella.
 *
 * El paso actual nunca es alcanzable: eso lo impone el `Stepper`.
 */
function alcanzable(id: string | undefined, current: number): boolean {
  if (id === 'organizacion') return true;
  if (id === 'perfil') return false;
  return current >= 2;
}

export interface OnboardingPageProps {
  /**
   * Los pasos del flujo. `null` es un flujo sin progreso —la sala de espera,
   * que no es un paso porque no hay nada que hacer—, y entonces el `Stepper`
   * no se monta.
   */
  steps?: StepperStep[] | null;
  /** Índice (base 0) del paso actual. */
  current?: number;
  /** El cuerpo del paso. */
  children: ReactNode;
  /** La acción principal del paso. */
  primaryAction?: ReactNode;
  /** La salida: «Omitir», «Cerrar sesión». */
  exitAction?: ReactNode;
  /** Tema que enseña el conmutador. Solo eso: el oscuro del lienzo lo pone la story. */
  theme?: 'light' | 'dark';
}

/**
 * El alta del hub montada sobre las piezas reales: `AppRoot` + `OnboardingShell`
 * con el `Stepper` dentro. Lo único que añade es lo que en el producto viene del
 * layout —la marca y los dos conmutadores— con datos falsos, para que las cinco
 * pantallas de `Pages/Onboarding` no lo repitan.
 *
 * **No hay «Atrás».** El progreso navega, así que un botón que repita lo que
 * las cifras ya saben hacer sobraría: se retiró del alta y no vuelve.
 */
export function OnboardingPage({ steps = PASOS_ALTA, current = 0, children, primaryAction, exitAction, theme = 'light' }: OnboardingPageProps) {
  return (
    <AppRoot>
      <OnboardingShell
        brand={<Logo />}
        switchers={
          <>
            <LanguageSwitcher size="lg" value="es" languages={IDIOMAS} />
            <ThemeSwitcher size="lg" value={theme} />
          </>
        }
        stepper={
          steps && (
            <Stepper
              steps={steps.map((step) => ({ ...step, reachable: alcanzable(step.id, current) }))}
              current={current}
              onStepSelect={() => {}}
            />
          )
        }
        primaryAction={primaryAction}
        exitAction={exitAction}
      >
        {children}
      </OnboardingShell>
    </AppRoot>
  );
}
