/**
 * `process.env.NODE_ENV` escrito tal cual, para que el bundler del consumidor
 * (Next, Vite, Turbopack…) lo sustituya por su literal y los avisos
 * desaparezcan del build de producción. Sin bundler que lo sustituya y sin
 * `process` —un navegador a pelo—, la referencia lanza y se trata como
 * producción: un aviso es una ayuda, nunca un requisito. Declarado aquí para
 * no depender de los tipos de `@types/node`.
 *
 * Antes se leía como `globalThis.process?.env?.NODE_ENV`, que ningún bundler
 * sustituye: en un navegador sin `process` devolvía `true` en producción.
 */
declare const process: { env: { NODE_ENV?: string } };

export function isDevelopment(): boolean {
  try {
    return process.env.NODE_ENV !== 'production';
  } catch {
    return false;
  }
}

/** Las claves ya avisadas: cada aviso sale **una vez**, no en cada render. */
const avisados = new Set<string>();

/** `console.warn` una sola vez por `key`, y solo en desarrollo. */
export function warnOnce(key: string, message: string): void {
  if (!isDevelopment() || avisados.has(key)) return;
  avisados.add(key);
  console.warn(`@studiolxd/brand: ${message}`);
}

/**
 * Aviso de API obsoleta (alias que se retira en el major siguiente), una vez
 * por componente y prop: «`<Tag variant>` está obsoleta; usa `tone`. Se
 * retira en la v52.»
 */
export function warnDeprecated(component: string, old: string, replacement: string): void {
  warnOnce(
    `deprecated:${component}:${old}`,
    `\`<${component} ${old}>\` está obsoleta; usa ${replacement}. Se retira en la v52.`,
  );
}

/** Solo para tests: vacía el registro de avisos ya emitidos. */
export function resetWarnings(): void {
  avisados.clear();
}
