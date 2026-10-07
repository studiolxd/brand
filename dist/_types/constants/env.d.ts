export declare function isDevelopment(): boolean;
/** `console.warn` una sola vez por `key`, y solo en desarrollo. */
export declare function warnOnce(key: string, message: string): void;
/**
 * Aviso de API obsoleta (alias que se retira en el major siguiente), una vez
 * por componente y prop: «`<Tag variant>` está obsoleta; usa `tone`. Se
 * retira en la v52.»
 */
export declare function warnDeprecated(component: string, old: string, replacement: string): void;
/** Solo para tests: vacía el registro de avisos ya emitidos. */
export declare function resetWarnings(): void;
