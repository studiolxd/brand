/**
 * `process.env.NODE_ENV` sin depender de los tipos de `@types/node`: la
 * librería se distribuye para consumidores que no siempre los tienen en su
 * propio `tsconfig`, así que se lee a través de `globalThis` en vez de
 * asumir el global ambiental `process`.
 */
export function isDevelopment(): boolean {
  const env = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env;
  return env?.NODE_ENV !== 'production';
}
