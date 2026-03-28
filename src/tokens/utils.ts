export interface Token {
  name: string;
  value: string;
  description?: string;
}

type DtcgNode = { $value: string; $type: string; $description?: string };
type DtcgTree = { [key: string]: DtcgNode | DtcgTree };

/** Resolve a DTCG reference like "{color.prussian}" using a flat key→value map. */
export function resolveRef(value: string, refMap: Record<string, string>): string {
  let current = value;

  while (true) {
    const match = current.match(/^\{(.+)\}$/);
    if (!match) return current;

    const next = refMap[match[1]];
    if (!next || next === current) return current;

    current = next;
  }
}

export function flattenTokens(tree: DtcgTree, prefix = ''): Token[] {
  return Object.entries(tree).flatMap(([key, node]) => {
    const path = prefix ? `${prefix}-${key}` : key;
    if ('$value' in node) {
      return [{
        name: `--${path}`,
        value: (node as DtcgNode).$value,
        description: (node as DtcgNode).$description,
      }];
    }
    return flattenTokens(node as DtcgTree, path);
  });
}
