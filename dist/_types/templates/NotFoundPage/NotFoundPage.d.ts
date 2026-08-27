import type { ReactNode } from 'react';
export interface NotFoundPageProps {
    /** El título («Página no encontrada»): `Heading` de nivel 1 vía `PageIntro`. */
    title: ReactNode;
    /** La frase bajo el título (el código, una explicación corta). */
    description?: ReactNode;
    /** El enlace de vuelta: el `Link` del producto con su icono (`<Link icon="arrow-left" href="/">Ir al inicio</Link>`). Sin router dentro. */
    homeLink: ReactNode;
    /** Cabecera del sitio. Va dentro de un `ErrorBoundary`: si falla, la página sigue. */
    header?: ReactNode;
    /** Pie del sitio. Ídem. */
    footer?: ReactNode;
    /** `id` del `main` (`main-content` por defecto, destino del `SkipLink`). */
    id?: string;
}
/**
 * Plantilla de 404: el marco público (`SiteShell`) con cabecera y pie
 * opcionales, y dentro un `main` con la cabecera de página y el enlace de
 * vuelta. Cabecera y pie van cada uno en su `ErrorBoundary`, así que un chrome
 * roto no se lleva por delante el mensaje.
 */
export declare function NotFoundPage({ title, description, homeLink, header, footer, id }: NotFoundPageProps): import("react/jsx-runtime").JSX.Element;
