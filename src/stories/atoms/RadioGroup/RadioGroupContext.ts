import { createContext, useContext } from 'react';

/** Lo que el grupo presta a cada opción que cuelga de él. */
export interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  select: (value: string) => void;
  disabled: boolean | undefined;
  size: 'sm' | 'md' | 'lg' | undefined;
  error: boolean | undefined;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

/**
 * Lo usan `Radio` y `RadioField` para saber si cuelgan de un grupo. Vive en su
 * propio módulo para que el fichero del componente solo exporte componentes.
 */
export function useRadioGroup(): RadioGroupContextValue | null {
  return useContext(RadioGroupContext);
}
