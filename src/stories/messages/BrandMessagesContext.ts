'use client';

import { createContext, useContext } from 'react';
import type { BrandMessages, CompleteBrandMessages } from './BrandMessages';

/**
 * El catálogo montado por la aplicación, o `null` si no hay proveedor. Lo
 * pone `BrandMessagesProvider` y lo leen los componentes con
 * `useBrandMessages`.
 */
export const BrandMessagesContext = createContext<BrandMessages | null>(null);

/**
 * El espacio **entero** de un componente: el lector siempre devuelve un
 * texto, porque lo que no trae el catálogo sale del castellano de respaldo.
 */
export type BrandMessagesNamespace<K extends keyof CompleteBrandMessages> = CompleteBrandMessages[K];

/**
 * Lee un texto del espacio de un componente: `t('previous')` devuelve el del
 * proveedor (o el castellano de respaldo), y `t('previous', previousLabel)`
 * deja ganar a la prop cuando el consumidor la pasa.
 */
export interface BrandMessagesReader<K extends keyof CompleteBrandMessages> {
  <N extends keyof BrandMessagesNamespace<K>>(
    key: N,
    override?: BrandMessagesNamespace<K>[N] | null,
  ): BrandMessagesNamespace<K>[N];
}

/**
 * `process.env.NODE_ENV` escrito tal cual, para que el bundler del consumidor
 * (Next, Vite, Turbopack…) lo sustituya por su literal y el aviso desaparezca
 * del build de producción. Sin bundler que lo sustituya y sin `process` —un
 * navegador a pelo—, la referencia lanza y se trata como producción: el aviso
 * es una ayuda, nunca un requisito. Declarado aquí para no depender de los
 * tipos de `@types/node`.
 */
declare const process: { env: { NODE_ENV?: string } };

function enDesarrollo(): boolean {
  try {
    return process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
}

/** Las claves ya avisadas: el aviso sale **una vez por clave**, no por render. */
const avisadas = new Set<string>();

function avisar(clave: string): void {
  if (avisadas.has(clave) || !enDesarrollo()) return;
  avisadas.add(clave);
  console.warn(`@studiolxd/brand: falta «${clave}» en el catálogo; sale en castellano.`);
}

/**
 * Olvida los avisos ya dados. **Solo para los tests**, que comprueban el aviso
 * de una clave que otro test del mismo proceso ya pudo disparar. No se publica
 * por `@studiolxd/brand/messages`.
 */
export function resetMissingMessageWarnings(): void {
  avisadas.clear();
}

function esObjetoPlano(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor);
}

/**
 * Un texto compuesto (`datePicker.maskLetters`) puede llegar a medias: lo que
 * trae el catálogo gana, y cada hueco se rellena con el respaldo y se avisa.
 */
function completar(valor: unknown, respaldo: unknown, ruta: string): unknown {
  if (!esObjetoPlano(valor) || !esObjetoPlano(respaldo)) return valor;
  const salida: Record<string, unknown> = { ...respaldo };
  for (const clave of Object.keys(respaldo)) {
    const propio = valor[clave];
    if (propio === undefined || propio === null) avisar(`${ruta}.${clave}`);
    else salida[clave] = completar(propio, respaldo[clave], `${ruta}.${clave}`);
  }
  return salida;
}

/**
 * El lector del espacio de un componente. Se llama **en el punto donde el
 * texto se pinta**, no al principio del render: así un componente que no
 * enseña el selector de tamaño tampoco pide su texto.
 *
 * El orden de resolución de cada texto es **prop → catálogo → castellano**:
 *
 * 1. la prop suelta, si el consumidor la pasa (`t('previous', previousLabel)`);
 * 2. el catálogo montado con `BrandMessagesProvider`;
 * 3. el castellano de respaldo del espacio, que cada componente pasa como
 *    `fallback` (`useBrandMessages('pagination', paginationEs)`). Cada uno
 *    trae solo el suyo, así que el respaldo de un componente que la app no
 *    importa no viaja en su bundle. En desarrollo avisa una vez por clave.
 *
 * Sin `fallback` —un uso del lector fuera de la librería— un texto que falte
 * lanza, porque no hay castellano al que caer.
 */
export function useBrandMessages<K extends keyof CompleteBrandMessages>(
  namespace: K,
  fallback?: BrandMessagesNamespace<K>,
): BrandMessagesReader<K> {
  const messages = useContext(BrandMessagesContext);

  return function read<N extends keyof BrandMessagesNamespace<K>>(
    key: N,
    override?: BrandMessagesNamespace<K>[N] | null,
  ): BrandMessagesNamespace<K>[N] {
    if (override !== undefined && override !== null) return override;

    const ruta = `${String(namespace)}.${String(key)}`;
    const espacio = messages?.[namespace] as Partial<BrandMessagesNamespace<K>> | undefined;
    const valor = espacio?.[key];
    const respaldo = fallback?.[key];

    if (valor !== undefined && valor !== null) {
      return completar(valor, respaldo, ruta) as BrandMessagesNamespace<K>[N];
    }

    if (respaldo !== undefined) {
      avisar(ruta);
      return respaldo;
    }

    throw new Error(
      `@studiolxd/brand: falta el texto «${ruta}», no hay catálogo que lo traiga y este ` +
        'lector no tiene castellano de respaldo. Pasa el espacio de respaldo como segundo ' +
        'argumento de useBrandMessages, monta <BrandMessagesProvider> con el texto o pasa la prop.',
    );
  };
}
