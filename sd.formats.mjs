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

// Un token oscuro puede referenciar el par oscuro de OTRO componente
// (`{menu.surface-dark-item-color}`). Style Dictionary lo emitiría como
// `var(--menu-surface-dark-item-color)`, una variable que no existe: el par
// oscuro se publica con el nombre de su par claro. Dentro del bloque oscuro,
// donde `--menu-item-color` YA vale el valor oscuro sobre el mismo elemento,
// la referencia correcta es la del nombre claro — que es a lo que se reescribe
// aquí. Sin esto, la propiedad queda inválida y el componente pierde su color
// en superficie oscura.
function remapDarkReferences(css) {
  return css.replace(/var\(--([a-z0-9-]+?)-surface-dark-([a-z0-9-]+)\)/g, 'var(--$1-$2)');
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
        output += `\n${darkSelectors.join(',\n')} {\n${remapDarkReferences(darkVars)}\n}\n`;
      }

      return output;
    },
  });
}

/**
 * Registra el formato `json/css-variables`: el mismo diccionario que sale a
 * CSS, pero como un objeto JSON plano `{ "--nombre": "valor" }` con los
 * valores YA resueltos (sin `var()`), para consumidores que no pueden leer
 * custom properties — un correo HTML, por ejemplo, donde todo estilo tiene
 * que ir inline y resuelto en tiempo de render.
 *
 * La clave es el nombre de la custom property, no la ruta del token: así el
 * mismo identificador sirve para buscar el valor en JS y para leer el CSS
 * generado, sin traducción por medio.
 */
export function registerJsonVariablesFormat(StyleDictionary) {
  StyleDictionary.registerFormat({
    name: 'json/css-variables',
    format: ({ dictionary }) => {
      const entries = dictionary.allTokens.map((token) => [
        `--${token.name}`,
        String(token.$value ?? token.value),
      ]);
      return `${JSON.stringify(Object.fromEntries(entries), null, 2)}\n`;
    },
  });
}
