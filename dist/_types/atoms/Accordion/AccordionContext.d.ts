/** Lo que la raíz numerada presta a cada disparador. */
export interface AccordionNumberingValue {
    /** Posición del ítem entre los hijos directos de la raíz, empezando en 1. */
    index: number;
    /** Cómo se escribe el número. */
    formatIndex: (index: number) => string;
}
export declare const AccordionNumberingContext: import("react").Context<AccordionNumberingValue | null>;
/**
 * Lo usa `AccordionTrigger` para saber si su acordeón numera. Vive en su propio
 * módulo para que el fichero del componente solo exporte componentes.
 */
export declare function useAccordionNumbering(): AccordionNumberingValue | null;
