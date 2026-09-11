import type { ReactNode } from 'react';
import { type StepperStep } from '../../molecules/Stepper/Stepper';
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
    /**
     * Ancho de la columna del paso, tal cual lo recibe `OnboardingShell`: `md`
     * (por defecto) es la medida de lectura de un formulario; `wide` es el
     * ancho de página pública, para un paso que reparte el contenido en
     * columnas (la sala de espera, dos columnas).
     */
    width?: 'md' | 'wide';
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
export declare function OnboardingPage({ steps, current, children, primaryAction, exitAction, theme, width }: OnboardingPageProps): import("react/jsx-runtime").JSX.Element;
