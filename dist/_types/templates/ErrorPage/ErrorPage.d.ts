import type { ReactNode } from 'react';
import './ErrorPage.css';
export interface ErrorPageProps {
    /** El título («Algo ha salido mal»): `Heading` de nivel 1 vía `PageIntro`. */
    title: ReactNode;
    /** La frase bajo el título. */
    description?: ReactNode;
    /** Las salidas: el `Button` «Reintentar» y el enlace «Ir al inicio» del producto. Sin router dentro. */
    actions: ReactNode;
    /** Cabecera del sitio, SIN auth. Va dentro de un `ErrorBoundary`. En `global-error.tsx` no se pasa. */
    header?: ReactNode;
    /** Pie del sitio. Ídem. */
    footer?: ReactNode;
    /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
    id?: string;
}
/**
 * Plantilla de «algo ha salido mal»: misma maqueta que `NotFoundPage` con las
 * acciones en lugar del enlace de vuelta. Cabecera y pie, si se pasan, van
 * cada uno en su `ErrorBoundary`: la página de error no puede depender del
 * layout que pudo fallar.
 */
export declare function ErrorPage({ title, description, actions, header, footer, id }: ErrorPageProps): import("react/jsx-runtime").JSX.Element;
