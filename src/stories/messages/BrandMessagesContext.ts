'use client';

import { createContext, useContext } from 'react';
import type { BrandMessages } from './BrandMessages';

/**
 * El catálogo montado por la aplicación, o `null` si no hay proveedor. Lo
 * pone `BrandMessagesProvider` y lo leen los componentes con
 * `useBrandMessages`.
 */
export const BrandMessagesContext = createContext<BrandMessages | null>(null);

/**
 * Lee un texto del espacio de un componente: `t('previous')` devuelve el del
 * proveedor, y `t('previous', previousLabel)` deja ganar a la prop cuando el
 * consumidor la pasa.
 */
export interface BrandMessagesReader<K extends keyof BrandMessages> {
  <N extends keyof BrandMessages[K]>(
    key: N,
    override?: BrandMessages[K][N],
  ): BrandMessages[K][N];
}

/**
 * El lector del espacio de un componente. Se llama **en el punto donde el
 * texto se pinta**, no al principio del render: así un componente que no
 * enseña el selector de tamaño tampoco exige su texto.
 */
export function useBrandMessages<K extends keyof BrandMessages>(
  namespace: K,
): BrandMessagesReader<K> {
  const messages = useContext(BrandMessagesContext);

  return function read<N extends keyof BrandMessages[K]>(
    key: N,
    override?: BrandMessages[K][N],
  ): BrandMessages[K][N] {
    if (override !== undefined) return override;

    if (!messages) {
      throw new Error(
        `@studiolxd/brand: falta el texto «${String(namespace)}.${String(key)}» y no hay ` +
          'catálogo montado. Monta <BrandMessagesProvider> en la raíz de la aplicación con ' +
          'los textos del idioma vigente, o pasa la prop suelta en este uso concreto.',
      );
    }

    const value = messages[namespace]?.[key];
    if (value === undefined) {
      throw new Error(
        `@studiolxd/brand: el catálogo montado no trae «${String(namespace)}.${String(key)}».`,
      );
    }
    return value;
  };
}

