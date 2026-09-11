// Lógica pura de comparación de caja entre dos listas de nombres (rutas
// relativas). La usa release-check.mjs para comparar el índice de git contra
// el disco — y contra sí mismo en ambas direcciones — sin volver a golpear el
// filesystem ni `git`, así que es testeable con listas fijas.
//
// El caso que motivó esto (B17, v37.5.2): macOS lleva `core.ignorecase=true`,
// así que un `git mv`/rename a otra caja puede dejar el DISCO actualizado
// mientras el ÍNDICE sigue con el nombre viejo. `readdirSync` (disco) por sí
// solo no lo detecta — hay que comparar explícitamente índice vs disco.

/**
 * @param {string[]} expectedNames - nombres que deberían existir (p. ej. el índice de git)
 * @param {string[]} actualNames - nombres reales a comparar (p. ej. el disco)
 * @returns {{ expected: string, foundAs: string[] }[]} entradas de expectedNames
 *   que no están en actualNames con la caja exacta, pero sí existe una variante
 *   con distinta caja (mismatch real, no ausencia lisa y llana).
 */
export function findCaseMismatches(expectedNames, actualNames) {
  const actualSet = new Set(actualNames);
  const actualByLower = new Map();
  for (const name of actualNames) {
    const lower = name.toLowerCase();
    if (!actualByLower.has(lower)) actualByLower.set(lower, []);
    actualByLower.get(lower).push(name);
  }

  const mismatches = [];
  for (const expected of expectedNames) {
    if (actualSet.has(expected)) continue;
    const candidates = actualByLower.get(expected.toLowerCase());
    if (candidates?.length) {
      mismatches.push({ expected, foundAs: candidates });
    }
  }
  return mismatches;
}

/**
 * Compara índice y disco en ambas direcciones: índice→disco (un fichero
 * trackeado con otra caja que la que hay en disco) y disco→índice (un
 * fichero en disco trackeado con otra caja que la que se acaba de escribir).
 * Devuelve la unión, sin duplicados por par.
 *
 * @param {string[]} indexNames
 * @param {string[]} diskNames
 * @returns {{ expected: string, foundAs: string[] }[]}
 */
export function findIndexDiskCaseMismatches(indexNames, diskNames) {
  const fromIndex = findCaseMismatches(indexNames, diskNames);
  const fromDisk = findCaseMismatches(diskNames, indexNames);
  const seen = new Set(fromIndex.map((m) => m.expected.toLowerCase()));
  const merged = [...fromIndex];
  for (const m of fromDisk) {
    if (!seen.has(m.expected.toLowerCase())) merged.push(m);
  }
  return merged;
}
