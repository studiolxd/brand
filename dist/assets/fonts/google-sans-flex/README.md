# Google Sans Flex — de dónde salen estos ficheros

Todos vienen de la **API CSS2 de Google Fonts** (`fonts.googleapis.com/css2?family=Google+Sans+Flex`),
que es la misma fuente de origen para los dos formatos, y todos están bajo la
**SIL Open Font License 1.1** que acompaña a esta carpeta (`LICENSE.txt`).

| Fichero | Formato | Para qué |
| --- | --- | --- |
| `google-sans-flex-normal-latin.woff2`, `…-latin-ext.woff2` | woff2, variable (`wght` 1–1000) | La web: los sirve `src/stylesheets/fonts.css` (`@studiolxd/brand/fonts`) |
| `google-sans-flex-normal-300.ttf` | TrueType, instancia estática `wght` 300 | La tarjeta social (`@studiolxd/brand/og`) |
| `google-sans-flex-normal-500.ttf` | TrueType, instancia estática `wght` 500 | Ídem |

## Por qué hay TTF además del woff2

**Satori no lee woff2.** El motor que pinta la tarjeta social —el que hay debajo
de `ImageResponse` de `next/og`— solo acepta TTF, OTF y WOFF. Con el woff2 de la
web no se puede generar una imagen, así que las dos caras que usa la tarjeta se
descargan de la misma API en TrueType:

```sh
# La API devuelve TTF estático cuando el User-Agent no soporta woff2.
curl -A 'Mozilla/4.0' 'https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300;500'
```

**Y por qué 300 y 500, no 400 y 700.** Son los dos pesos del sistema
(`--font-weight-default` y `--font-weight-emphasis`): la marca escribe en ligera
y enfatiza en media. Además satori no interpola ejes variables —renderiza la
instancia por defecto—, así que cada peso tiene que venir ya instanciado; por eso
son ficheros estáticos y no la variable de la web.
