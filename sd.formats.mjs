import { formattedVariables, fileHeader } from 'style-dictionary/utils';

// Selectores que activan el modo oscuro: `.surface-dark` (contextual,
// aplicado a mano a un contenedor) y `[data-theme="dark"]`/`html.dark`
// (root-level, para theme managers como next-themes que ponen la clase/
// atributo en <html>). Las custom properties se heredan por cascada, así
// que un único selector sirve tanto para el caso contextual como para el
// root-level — no hace falta lógica distinta.
const DARK_SELECTORS = ['.surface-dark', '[data-theme="dark"]', 'html.dark'];

// Marcador de los tokens auto-remapeados por este formato. Deliberadamente
// distinto de "dark-" a secas: algunos componentes (ej. header.json:
// `dark-bg`, `nav-dark-color`) ya usan ese prefijo/infijo para su propia
// variante BEM manual (`.header--dark`), consumida como una custom property
// aparte — no como un remapeo contextual. Colisionar con ese patrón haría
// desaparecer esas variables de `:root` y romper esos componentes.
const DARK_TOKEN_PREFIX = 'surface-dark-';

// Un token `surface-dark-<nombre>` es el par oscuro de `<nombre>` dentro del
// mismo grupo (ej. `button.primary.bg` + `button.primary.surface-dark-bg`).
// Exportado: la plataforma SCSS (consumidores no-React, sin modo runtime)
// filtra estos tokens para no exponerlos como variables sueltas.
export function isDarkToken(token) {
  const last = token.path[token.path.length - 1];
  return typeof last === 'string' && last.startsWith(DARK_TOKEN_PREFIX);
}

// La custom property generada por un token `surface-dark-<nombre>` debe
// llamarse igual que la de su par claro (`--button-primary-bg`, no
// `--button-primary-surface-dark-bg`) — solo cambia el bloque/selector en
// el que aparece, no el nombre de la variable que consume el componente.
function lightNameFromDarkToken(token) {
  const path = token.path;
  const last = path[path.length - 1];
  const stripped = last.slice(DARK_TOKEN_PREFIX.length);
  return [...path.slice(0, -1), stripped].join('-');
}

/**
 * Registra el formato `css/variables-with-dark-mode`: igual que el
 * `css/variables` built-in de Style Dictionary, pero además emite un
 * segundo bloque con los tokens `dark-*` de cada grupo, remapeando la
 * MISMA custom property bajo los selectores de activación de tema oscuro.
 */
export function registerDarkModeFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'css/variables-with-dark-mode',
    format: async ({ dictionary, options = {}, file }) => {
      const selector = options.selector || ':root';
      const darkSelectors = options.darkSelectors || DARK_SELECTORS;
      const { outputReferences, outputReferenceFallbacks, usesDtcg, formatting } = options;

      const header = await fileHeader({ file, formatting, options });

      const lightTokens = dictionary.allTokens.filter((t) => !isDarkToken(t));
      const darkTokens = dictionary.allTokens.filter(isDarkToken);

      const lightVars = formattedVariables({
        format: 'css',
        dictionary: { ...dictionary, allTokens: lightTokens },
        outputReferences,
        outputReferenceFallbacks,
        formatting,
        usesDtcg,
      });

      let output = `${header}${selector} {\n${lightVars}\n}\n`;

      if (darkTokens.length) {
        const renamedDarkTokens = darkTokens.map((t) => ({ ...t, name: lightNameFromDarkToken(t) }));
        const darkVars = formattedVariables({
          format: 'css',
          dictionary: { ...dictionary, allTokens: renamedDarkTokens },
          outputReferences,
          outputReferenceFallbacks,
          formatting,
          usesDtcg,
        });
        output += `\n${darkSelectors.join(',\n')} {\n${darkVars}\n}\n`;
      }

      return output;
    },
  });
}
