import type { ReactNode } from 'react';
export interface LegalFooterNavProps {
    /** El `label` de `LegalFooter`: sin él, sale de `legalFooter.label` del catálogo. */
    label?: string;
    children: ReactNode;
}
/**
 * La isla cliente de `LegalFooter`: el `<nav>` y nada más, porque su nombre
 * accesible es lo único del pie que lee el catálogo (`BrandMessagesProvider`),
 * y leer un contexto solo se puede en cliente. Así `LegalFooter` —y con él
 * `SiteFooter`— se renderiza desde un Server Component, y su `renderLink`, que
 * es una función, se queda en el servidor: aquí solo llegan los enlaces ya
 * pintados, como `children`.
 *
 * Interno: es una entrada de `entry-points.mjs` (para que salga a `dist/` como
 * módulo `'use client'`, la frontera que el servidor necesita) pero no tiene
 * subruta en `package.json#exports`.
 */
export declare function LegalFooterNav({ label, children }: LegalFooterNavProps): import("react/jsx-runtime").JSX.Element;
