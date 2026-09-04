import type { ReactNode } from 'react';
import { type StepperStep } from '../../molecules/Stepper/Stepper';
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
export declare function OnboardingPage({ steps, current, children, backAction, primaryAction, exitAction, theme }: OnboardingPageProps): import("react/jsx-runtime").JSX.Element;
