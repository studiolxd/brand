/**
 * Falso positivo de axe: `link-in-text-block` sobre un enlace dentro de texto
 * corrido en superficie oscura (D41, D43).
 *
 * El enlace dentro de un párrafo, una etiqueta, un título o un `Prose` lleva su
 * línea en reposo en las dos superficies (`Link.css`, D41): esa es la marca que
 * WCAG 1.4.1 pide además del color. Pero la línea del sistema es una sombra
 * interior (`box-shadow`, regla 7 de `CLAUDE.md`), y axe solo reconoce como
 * marca `text-decoration`, un borde, `outline`, `background-image` o un cambio
 * de fuente. Sin marca reconocible, mide el color contra el texto que lo rodea:
 * en oscuro el amarillo del enlace (`#ffcd00`) sobre la tinta blanca da 1,5:1,
 * y falla. En claro no salta porque el enlace y el texto ya contrastan.
 *
 * Desde D43 la auditoría a11y corre también en oscuro (proyecto de Vitest
 * `storybook-dark`), así que cada story con un enlace en texto corrido lo
 * desactiva en su `parameters` —nunca global—: `{ a11y: SIN_LINK_IN_TEXT_BLOCK }`.
 *
 * Si la línea pasa a pintarse con `text-decoration` (D64), axe la reconoce y
 * esta exclusión sobra: se borran este fichero y sus usos.
 */
export declare const SIN_LINK_IN_TEXT_BLOCK: {
    config: {
        rules: {
            id: string;
            enabled: boolean;
        }[];
    };
};
