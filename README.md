# @studiolxd/brand

El sistema de diseño de Studio LXD: los componentes React, los tokens y la
documentación con los que se visten las doce aplicaciones de la suite SLXD.
No es un tema ni una hoja de estilos suelta — es la capa de interfaz completa,
y el catálogo de Storybook es su fuente de verdad.

## Instalación

```sh
pnpm add @studiolxd/brand
```

El paquete declara como peer dependencies `react` y `react-dom` (>=18) y
`react-hook-form` (>=7), del que dependen el `Form` y todos los campos que se
atan a él. `react-email` (>=6) es un peer **opcional**: solo hace falta si se
consume el subpath `@studiolxd/brand/email`.

## Uso

Los estilos se importan una vez, en el layout raíz. `brand.css` trae el
normalize, los tokens y la base tipográfica; `fonts.css` es la hoja de
`@font-face` con las tres familias de la marca, que el paquete sirve por su
cuenta —no hace falta `next/font` ni un `<link>` a Google Fonts.

```ts
import '@studiolxd/brand/brand.css';
import '@studiolxd/brand/fonts.css';
```

No hay barril: cada componente se importa por su propia subruta, y el CSS de
ese componente viaja con él.

```tsx
import { Button } from '@studiolxd/brand/button';
import { InputField } from '@studiolxd/brand/input-field';

export function Ejemplo() {
  return (
    <form>
      <InputField id="correo" name="correo" label="Correo electrónico" type="email" />
      <Button type="submit">Entrar</Button>
    </form>
  );
}
```

La subruta es el nombre del componente en kebab-case. El bloque `exports` del
`package.json` las lista todas.

## Qué trae

Los componentes se organizan en Atomic Design, y el paquete publica 164
subrutas de componente repartidas así:

- **64 átomos** — los elementos básicos: `Button`, `Input`, `Link`, `Heading`,
  `Tabs`, `Tooltip`, `Icon` (77 glifos dibujados en el propio repo)…
- **73 moléculas** — combinaciones de átomos: `InputField`, `Form`, `Modal`,
  `Table`, `Menu`, `Calendar`, `Pagination`…
- **5 organismos** — piezas complejas con lógica propia: `Chart`, `DataTable`,
  `Steps`, `ConversationThread`, `AnnotationThread`.
- **11 secciones** — bloques de página: `AppHeader`, `SiteHeader`, `Sidebar`,
  `SiteShell`, `Hero`…
- **11 plantillas** — páginas enteras listas para envolver contenido:
  `PublicPageShell`, `OnboardingShell`, `ChatShell`, `ErrorPage`,
  `NotFoundPage` y las seis piezas del consentimiento de conectores.

Cada uno de los 159 componentes tiene sus stories en el catálogo, y 155 llevan
además una página propia de documentación en MDX con su API y sus reglas de
uso.

Fuera del Atomic Design hay tres subpaths más: `@studiolxd/brand/email`, con
las primitivas de correo sobre `react-email`; `@studiolxd/brand/og`, para las
tarjetas sociales; y `@studiolxd/brand/brand-assets`, con el logotipo y las
marcas.

## Los tokens

Toda propiedad visual del sistema sale de un token. Las definiciones viven en
`tokens/`, en ficheros JSON con el formato del Design Tokens Community Group
(`$value`, `$type`, `$description`), y Style Dictionary las compila a cuatro
salidas. Hoy son 3.265 tokens.

Una aplicación React ya los tiene: `brand.css` los declara en `:root`, así que
se consumen como custom properties.

```css
.mi-bloque {
  color: var(--color-primary);
  padding-block: var(--spacing-4);
}
```

Una aplicación que no use React —PHP, un servidor, una herramienta de diseño—
recibe los mismos tokens en SCSS, con los valores ya resueltos y prefijo
`$lxd-`. Hay un entrypoint moderno con `@forward` y otro legacy con `@import`,
para compiladores sin `@use`.

```scss
@use '@studiolxd/brand/scss' as brand;

.mi-bloque { color: brand.$lxd-color-primary; }
```

Y quien necesite el valor como dato y no como CSS —un correo, un canvas, un
PDF— tiene `@studiolxd/brand/tokens`, un mapa plano con los valores resueltos
y dos ayudas, `token()` y `tokenPx()`.

El sistema tiene tema claro y oscuro. El oscuro no se escribe a mano: se
deriva de los propios tokens y se activa con `data-theme="dark"`, `html.dark`
o la clase `.surface-dark` en cualquier contenedor.

## El catálogo

```sh
pnpm install
pnpm storybook
```

Storybook arranca en el puerto 6006 y es la fuente de verdad del sistema: las
props de un componente, sus variantes y sus reglas de uso son las que están
ahí, no las que uno supondría por el nombre. Junto a los componentes hay 17
páginas de fundamentos —color, tipografía, espaciado, bordes y radios,
iconografía, movimiento, capas, marca, internacionalización— que explican el
porqué de las decisiones; la documentación de cada componente explica su API
y remite a ellas.

La regresión visual se comprueba en Chromatic, con cada story capturada en
claro y en oscuro.

## Qué no es

Esto no es una librería de propósito general ni pretende serlo. Es el sistema
de diseño de una suite concreta, y se publica porque las aplicaciones que lo
consumen lo instalan como cualquier otra dependencia. El código está a la
vista y se puede leer y estudiar; lo que no está abierto es el diseño: la
paleta, la escala tipográfica, las variantes de cada componente y las reglas
que las gobiernan responden a la marca de Studio LXD y se deciden aquí
dentro. Si el sistema le sirve tal cual a alguien más, encantados; si hace
falta que sea otra cosa, un fork es mejor camino que una petición.
