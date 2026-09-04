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

const IDIOMAS = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
];

export interface OnboardingPageProps {
  /** Los pasos del flujo. Con uno solo, el `Stepper` no se pinta. */
  steps?: StepperStep[];
  /** Índice (base 0) del paso actual. */
  current?: number;
  /** El cuerpo del paso. */
  children: ReactNode;
  /** «Atrás». En el primer paso no se pasa. */
  backAction?: ReactNode;
  /** La acción principal del paso. */
  primaryAction?: ReactNode;
  /** La salida: «Omitir por ahora», «Cerrar sesión». */
  exitAction?: ReactNode;
  /** Tema que enseña el conmutador. Solo eso: el oscuro del lienzo lo pone la story. */
  theme?: 'light' | 'dark';
}

/**
 * El alta del hub montada sobre las piezas reales: `AppRoot` + `OnboardingShell`
 * con el `Stepper` dentro. Lo único que añade es lo que en el producto viene del
 * layout —la marca y los dos conmutadores— con datos falsos, para que las cinco
 * pantallas de `Pages/Onboarding` no lo repitan.
 */
export function OnboardingPage({ steps = PASOS_ALTA, current = 0, children, backAction, primaryAction, exitAction, theme = 'light' }: OnboardingPageProps) {
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
        stepper={<Stepper steps={steps} current={current} onStepSelect={() => {}} />}
        backAction={backAction}
        primaryAction={primaryAction}
        exitAction={exitAction}
      >
        {children}
      </OnboardingShell>
    </AppRoot>
  );
}
