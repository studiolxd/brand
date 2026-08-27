import type { ReactNode } from 'react';
export interface AuthPageProps {
    /** Título de la página. */
    title: string;
    /** Frase bajo el título (opcional): texto, o texto con un enlace («¿No tienes una cuenta? Regístrate»). */
    description?: ReactNode;
    /** Más texto bajo la frase. */
    intro?: ReactNode;
    /** Lo que va a la derecha: el formulario. */
    children: ReactNode;
    /** Superficie oscura. */
    surface?: 'light' | 'dark';
}
/** El chrome público de la suite con la página de acceso dentro: es el layout `(auth)` de hub, con piezas del DS y datos falsos. */
export declare function AuthPage({ title, description, intro, children, surface }: AuthPageProps): import("react/jsx-runtime").JSX.Element;
/** Botones de acceso con terceros (Google, GitHub, un OIDC…). */
export declare function SocialButtons({ providers }: {
    providers: string[];
}): import("react/jsx-runtime").JSX.Element;
/** El hueco del captcha (Turnstile mide 300×65). */
export declare function Captcha(): import("react/jsx-runtime").JSX.Element;
