import { createContext, useContext } from 'react';

/** Lo que la raíz numerada presta a cada disparador. */
export interface AccordionNumberingValue {
  /** Posición del ítem entre los hijos directos de la raíz, empezando en 1. */
  index: number;
  /** Cómo se escribe el número. */
  formatIndex: (index: number) => string;
}

export const AccordionNumberingContext = createContext<AccordionNumberingValue | null>(null);

/**
 * Lo usa `AccordionTrigger` para saber si su acordeón numera. Vive en su propio
 * módulo para que el fichero del componente solo exporte componentes.
 */
export function useAccordionNumbering(): AccordionNumberingValue | null {
  return useContext(AccordionNumberingContext);
}
