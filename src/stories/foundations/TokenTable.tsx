import type { Token } from '../../tokens/utils';
import { resolveRef } from '../../tokens/utils';
import './TokenTable.css';

/*
 * El 87% de los tokens de componente tienen una referencia como valor
 * (`{breakpoint.md}`, `{spacing.3}`…), porque la regla de cascada del DS quiere
 * justo eso. Pero una columna que dice `{breakpoint.md}` no responde a la
 * pregunta que trae quien la lee: cuánto mide. Van en columnas separadas —
 * de qué hereda y cuánto vale — para poder recorrer los valores de una escala
 * en vertical sin que la referencia se cruce por medio.
 */
const sources = import.meta.glob<Record<string, unknown>>('../../../tokens/**/*.json', { eager: true });

type Node = { $value?: string };

/** Mapa plano "ruta.con.puntos" → valor crudo, con TODOS los ficheros de token. */
const refMap: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  const walk = (tree: Record<string, unknown>, path: string[]) => {
    for (const [key, node] of Object.entries(tree)) {
      if (node === null || typeof node !== 'object') continue;
      const value = (node as Node).$value;
      if (typeof value === 'string') map[[...path, key].join('.')] = value;
      else walk(node as Record<string, unknown>, [...path, key]);
    }
  };
  for (const mod of Object.values(sources)) {
    const tree = (mod as { default?: Record<string, unknown> }).default ?? mod;
    walk(tree as Record<string, unknown>, []);
  }
  return map;
})();

const isRef = (value: string) => /^\{.+\}$/.test(value);

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  // Una tabla de primitivos (paleta, espaciado…) no hereda de nada: la columna
  // de referencia sería una fila de guiones. Solo aparece si alguna fila la usa.
  const hasRefs = tokens.some(({ value }) => isRef(value));

  return (
    <table className="token-table">
      <thead>
        <tr>
          <th>Token</th>
          {hasRefs && <th>Referencia</th>}
          <th>Valor</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(({ name, value, description }) => {
          // Si la referencia no resuelve (token de otro ámbito), se muestra tal
          // cual antes que mentir con un valor inventado.
          const resolved = isRef(value) ? resolveRef(value, refMap) : value;
          return (
            <tr key={name}>
              <td><code className="token-table__name">{name}</code></td>
              {hasRefs && (
                <td>
                  {isRef(value)
                    ? <span className="token-table__ref">{value}</span>
                    : <span className="token-table__empty">—</span>}
                </td>
              )}
              <td><span className="token-table__value">{resolved}</span></td>
              <td><span className="token-table__description">{description ?? '—'}</span></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
