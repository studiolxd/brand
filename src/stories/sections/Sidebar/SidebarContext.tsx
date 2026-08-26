'use client';

import { createContext, useContext } from 'react';

export interface SidebarContextValue {
  /** La sidebar está en rail: solo iconos. `SidebarNav` lo lee para cambiar de modo. */
  rail: boolean;
}

export const SidebarContext = createContext<SidebarContextValue>({ rail: false });

export function useSidebar(): SidebarContextValue {
  return useContext(SidebarContext);
}
