import { createContext, useContext } from 'react';

export interface ToggleGroupContextValue {
  /** Talla que el grupo reparte a sus botones. */
  size?: 'sm' | 'md' | 'lg';
}

export const ToggleGroupContext = createContext<ToggleGroupContextValue | undefined>(undefined);

/** Lo que un `Toggle` hereda del grupo que lo contiene, si lo hay. */
export function useToggleGroup() {
  return useContext(ToggleGroupContext);
}
