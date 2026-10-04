import type { BrandMessages } from './BrandMessages';
/**
 * El catálogo montado por la aplicación, o `null` si no hay proveedor. Lo
 * pone `BrandMessagesProvider` y lo leen los componentes con
 * `useBrandMessages`.
 */
export declare const BrandMessagesContext: import("react").Context<BrandMessages | null>;
/**
 * Lee un texto del espacio de un componente: `t('previous')` devuelve el del
 * proveedor, y `t('previous', previousLabel)` deja ganar a la prop cuando el
 * consumidor la pasa.
 */
export interface BrandMessagesReader<K extends keyof BrandMessages> {
    <N extends keyof BrandMessagesNamespace<K>>(key: N, override?: BrandMessagesNamespace<K>[N]): NonNullable<BrandMessagesNamespace<K>[N]>;
}
/**
 * El espacio de un componente, sin el `undefined` de los espacios opcionales
 * (`appHeader`): el lector nunca devuelve `undefined`, porque si el texto
 * falta lanza.
 */
export type BrandMessagesNamespace<K extends keyof BrandMessages> = NonNullable<BrandMessages[K]>;
/**
 * El lector del espacio de un componente. Se llama **en el punto donde el
 * texto se pinta**, no al principio del render: así un componente que no
 * enseña el selector de tamaño tampoco exige su texto.
 */
export declare function useBrandMessages<K extends keyof BrandMessages>(namespace: K): BrandMessagesReader<K>;
