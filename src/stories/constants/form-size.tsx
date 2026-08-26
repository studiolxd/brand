import { createContext, useContext } from 'react';

export type FormSize = 'sm' | 'md' | 'lg';

/**
 * La talla que un `Form` reparte a sus campos y botones. Los componentes con
 * `size` la toman de aquí cuando el consumidor no se la pasa; sin `Form` (o
 * sin `size` en él) vale `md`.
 */
export const FormSizeContext = createContext<FormSize | undefined>(undefined);

export function useFormSize(size?: FormSize): FormSize {
  const inherited = useContext(FormSizeContext);
  return size ?? inherited ?? 'md';
}
