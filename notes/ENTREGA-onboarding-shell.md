# Entrega — PublicPageShell + Stepper + OnboardingShell

Rama `onboarding-shell`. **Sin release**: no se ha tocado `package.json#version` ni
`CHANGELOG.md`, y **`dist/` no se ha regenerado** (sigue correspondiendo a v30.1.2).
Quien publique tendrá que correr `pnpm release:check` —que regenera `dist/`— antes
del tag, como manda `CLAUDE.md`.

## Componentes nuevos

### `PublicPageShell` — `templates/PublicPageShell/`

El marco de una página pública, en una sola pieza. Extrae el bloque que
`ErrorPage` y `NotFoundPage` repetían carácter por carácter.

```tsx
interface PublicPageShellProps {
  children: ReactNode;
  header?: ReactNode;   // dentro de un ErrorBoundary
  footer?: ReactNode;   // dentro de un ErrorBoundary
  id?: string;          // default 'main-content'
  shell?: boolean;      // default true; con false devuelve solo los children
}
```

Rinde `SiteShell` → `Container as="main" id space="xl" tabIndex={-1}`. Exportado
en `src/index.ts` y como `./public-page-shell` en `package.json#exports`;
registrado en `scripts/entry-points.mjs` (y en `clientComponents`, porque lleva
`ErrorBoundary`). Story + MDX propios.

### `Stepper` — `molecules/Stepper/`

Progreso de un flujo **con estado**. No es `Steps` (documental, sin paso actual);
`Steps` no se ha tocado.

```tsx
interface StepperStep { id?: string; label: ReactNode; description?: ReactNode }

interface StepperProps {
  steps: StepperStep[];
  current: number;                                   // base 0
  onStepSelect?: (index: number, step: StepperStep) => void;
  label?: string;                                    // 'Progreso'
  compactLabel?: (paso: number, total: number) => string;  // 'Paso 2 de 4'
  labels?: { completed?: string; current?: string; pending?: string };
  className?: string;
  id?: string;
}
```

- Semántica de `ol`, `aria-current="step"` en el actual, estado anunciado con
  texto oculto traducible.
- Estados deducidos de `current`, nunca pasados: completado / actual /
  pendiente. Se distinguen por **dos** señales (forma de la marca y peso de la
  etiqueta), no solo por color.
- Horizontal a partir de `md`; por debajo, la forma compacta. Solo una de las
  dos está en el árbol (`display: none`), así que el progreso no se anuncia dos
  veces.
- **Con menos de dos pasos devuelve `null`.**
- `onStepSelect` convierte en `<button>` **solo** los pasos completados. Los
  pendientes nunca son alcanzables, ni con el callback puesto.
- Sirve tal cual a los dos consumidores previstos: el alta del hub (4 pasos) y
  `design-matrix-wizard` de bricks (4 pasos, hoy `Tabs` + `TabsList
  variant="pill"` con las pestañas de delante deshabilitadas). No se ha migrado
  ninguno de los dos.
- Tokens: `tokens/molecule/stepper.json` → `src/tokens/molecules/stepper.css`.

### `OnboardingShell` — `templates/OnboardingShell/`

```tsx
interface OnboardingShellProps {
  children: ReactNode;
  brand?: ReactNode;
  switchers?: ReactNode;
  stepper?: ReactNode;
  primaryAction?: ReactNode;
  backAction?: ReactNode;
  exitAction?: ReactNode;
  actionsLabel?: string;   // 'Acciones del paso'
  id?: string;             // default 'main-content'
  shell?: boolean;         // default true
  className?: string;
}
```

Cuelga de `PublicPageShell` (superficie pública: cuerpo 20px, controles `lg`),
**sin cabecera pública** —en el alta ya hay sesión—, columna única centrada al
ancho de un formulario (`--onboarding-shell-max-width`, 768px). El pie fija la
jerarquía: principal a la derecha, «Atrás» a su izquierda, salida (`ghost`) al
otro extremo; en móvil, columna invertida. La ranura del progreso se monta
siempre y se retira sola con `:empty` cuando el `Stepper` no se pinta.
Tokens: `tokens/organism/onboarding-shell.json`.

## Qué cambió por dentro (sin breaking)

- **`ErrorPage`** — mismas props, mismo DOM. Ya no importa `SiteShell`,
  `Container` ni `ErrorBoundary`: devuelve su `Columns.error-page__content`
  dentro de `PublicPageShell`. `packages/app-shell` del monorepo `slxd` no
  cambia.
- **`NotFoundPage`** — ídem con su `Stack`.
- **`AuthPage`** (maqueta de Storybook, no exportada) — el `SiteShell` +
  `Container as="main"` montados a mano se sustituyen por `PublicPageShell`.
  `SiteHeader`/`LegalFooter` siguen siendo suyos, pasados por las ranuras. Así
  las seis `Pages/*` de acceso no pueden divergir del marco real.
- `ErrorPage.mdx` y `NotFoundPage.mdx` remiten ahora al molde único.
- `foundations/Internacionalizacion.mdx`: filas nuevas para `Stepper` y
  `OnboardingShell`.

## `Pages/Onboarding` — cinco pantallas

`src/stories/pages/Onboarding/`, mismo patrón que `Pages/Auth`: un
`OnboardingPage.tsx` que solo fija lo que en el producto viene del layout (marca
y los dos conmutadores) y monta `AppRoot` + `OnboardingShell` + `Stepper`. Todo
lo demás son componentes publicados; no hay maqueta paralela.

`Perfil` · `Nombre de la organización` · `Logotipo` · `Invitaciones` ·
`Sala de espera`, cada una en claro y en oscuro (la oscura con
`parameters: { surface: 'dark' }`, el mecanismo documentado en `CLAUDE.md`, y un
arg `theme` que solo mueve lo que enseña el `ThemeSwitcher`).

### Decisiones de diseño de la sala de espera

Es la pantalla del usuario que completó su perfil, no pertenece a ninguna
organización y no puede crear una: solo puede esperar.

1. **Se dice lo que pasa, no se disimula.** Nada de estado vacío que insinúe que
   falta un clic: la entradilla dice que no hay nada más que hacer ahí.
2. **Se dice quién le sacará de ahí y cómo.** Un `Steps` —el componente
   documental, aquí en su sitio— con las tres cosas que van a ocurrir: quién
   invita, a qué dirección llega el correo (escrita, para poder comprobar que es
   la correcta) y qué pasa al aceptar.
3. **Sin acción principal.** Un botón primario sin nada detrás es una promesa
   falsa. Por eso `primaryAction` es opcional en la plantilla; el pie se queda
   solo con la salida.
4. **Salida digna:** «Cerrar sesión» en `ghost`, con la frase que aclara que no
   se pierde nada al hacerlo.
5. **Sin progreso**: flujo de un solo paso, el `Stepper` no se pinta. Es la
   demostración de lo adaptativo — la plantilla monta la ranura igual que en las
   otras cuatro pantallas.

## Roces con el criterio del repo

- El brief pedía «pie de acciones» y lo natural era un `<footer>`; dentro de un
  `main` ese elemento no es una landmark y su `aria-label` se perdería, así que
  el grupo se monta como `div role="group"` con nombre accesible.
- El brief pedía cada pantalla «en claro y oscuro». Se usa
  `parameters: { surface: 'dark' }` (lo que manda `CLAUDE.md`), no un `<div
  className="surface-dark">` como el que aún tiene `AuthPage` por herencia.
- Par oscuro de la marca del `Stepper`: la derivación de `CLAUDE.md` daba el par
  de `Button primary` (lavanda con tinta prusia), pero el operador decidió
  amarillo (`accent-2`) tras revisarlo en Storybook — ver «Correcciones» al
  final. Es una salida deliberada de la regla, apuntada en la descripción del
  propio token para que el próximo que lo lea sepa que no es un descuido.
  El carril
  sin recorrer usa el rol de superficie secundaria (como el de `ProgressBar`) y
  el recorrido, la tinta del sistema: así los dos tramos siguen distinguiéndose
  en oscuro.

## Verificación

`pnpm lint`, `npx tsc -b` y `pnpm test` (46 ficheros, 289 tests) en verde.
`pnpm test:stories` no se ha podido correr: Chromium de Playwright no está
instalado en esta máquina (caso previsto en `CLAUDE.md`). Los tests de story
nuevos (`Test — …`, con `tags: ['!dev']`) están escritos y quedan pendientes de
esa pasada.


---

## Correcciones tras la revisión en Storybook

### El carril cruzaba por delante de las marcas

El tramo de línea de un paso se extiende hacia atrás hasta el centro del paso
anterior. Como el paso que lo pinta es hermano **posterior**, se dibujaba encima
de la marca del anterior y la partía por la mitad. El comentario del CSS daba
por bueno el orden del documento, y eso solo resuelve el caso dentro de un mismo
`.stepper__step`: ninguno de ellos crea contexto de apilamiento (están
posicionados, pero con `z-index: auto`), así que carriles y contenidos de todos
los pasos compiten en el mismo contexto. Ahora el contenido va sobre el carril
con `z-index`, que vale para cualquier pareja de pasos; el comentario se
reescribió con el razonamiento correcto.

De paso, la marca de un paso **pendiente** pasa de fondo transparente al lienzo
(`marker-pending-bg`, con su par oscuro): era hueca, así que el carril se veía
cruzándola por dentro — el mismo defecto, en el estado que no se había mirado.

### Superficie oscura: `accent-1` → `accent-2`

Decisión de diseño del operador: en oscuro, el relleno de los pasos completado y
actual pasa de lavanda a amarillo.

- La tinta sobre ese relleno **no cambia**: prusia sobre `accent-2` da **11,2:1**,
  muy por encima del 4,5:1 que pide AA (con lavanda eran 8,3:1).
- Esas marcas **no llevan borde propio** en ninguna superficie —el único token de
  borde es el de la marca pendiente, que sigue siendo la tinta clara—, así que no
  hubo nada más que pasar a `accent-2`.
- Las descripciones que hablaban de «lavanda» están reescritas, y la del token
  del relleno deja constancia de que es una salida deliberada de la regla de
  derivación.

### Verificación

`pnpm lint`, `npx tsc -b` y `pnpm test` (289 tests) en verde. Las dos superficies
se comprobaron a ojo en el Storybook del worktree (6007), en `Molecules/Stepper`
y en `Pages/Onboarding · Invitaciones`. La **forma compacta** quedó verificada
por lectura del código, no en pantalla: este Storybook no tiene addon de
viewport y la ventana del navegador no se dejó redimensionar en este entorno.
Su CSS no lo toca ninguno de los dos arreglos —no tiene marcas ni carril—, pero
conviene que le eches un vistazo en un móvil real.


---

## Segunda ronda de correcciones

### El alto de la marca lo impone el sitio donde se pinta

`OnboardingShell` no tenía regla para su ranura `brand`: el logotipo salía a su
tamaño intrínseco y no coincidía con el del chrome público. Ahora el template lo
impone con tokens propios que **referencian a los de la cabecera**
(`site-header.content-height` y sus variantes compacta y estrecha), así que
tocar el de la cabecera mueve los dos y no hay ningún valor copiado a ojo.

**`SiteHeader` tampoco lo conseguía**, aunque su comentario dijera «manda la
cabecera, no el logotipo». `Logo` estila sus tallas con doble clase
(`.logo.logo--xxl`, dos puntos de especificidad) y `.site-header__logo > *` solo
tiene uno: perdía siempre. En escritorio el resultado coincidía **de casualidad**,
porque `site-header.content-height` vale exactamente la talla `xxl` que la
cabecera le pasa por defecto; en móvil, en cambio, la marca seguía saliendo a
85px en lugar de encoger a 48 como pedían sus propios tokens. Medido en el
Storybook antes de tocar nada: `alto: 85.33` con `--site-header-content-height:
3rem`.

El mecanismo, en los dos sitios, es **remapear los tokens de talla del `Logo`**
en el contenedor (`--logo-height-sm…xxl` → el alto del sitio) en vez de intentar
ganarle por selector. La regla del `Logo` sigue mandando, pero lee el alto que le
da el contenedor, así que la prop `size` del consumidor deja de decidir el
tamaño final — que era el objetivo. Un `block-size` sobre el hijo cubre además
una marca de producto que no sea el `Logo` del sistema.

Ojo: esto **cambia el render de `SiteHeader` en móvil** para todos los
consumidores. La marca pasa a 48px por debajo de `md` y a 40px por debajo de
`sm`, que es lo que sus tokens pedían desde el principio («para que quepa con los
controles», «para caber en 360px con idioma y menú»).

Medido con las dos páginas abiertas: escritorio 85,33px en ambas; a 500px de
ancho, 48px en ambas, con `logo--xxl` en la cabecera y `logo--md` en el alta —la
talla que pasa el consumidor ya no cambia nada.

### Idiomas reales en la maqueta

`OnboardingPage` ofrecía catalán, que no es uno de los seis de la suite
(`en es fr de nl pt`). Ahora español, inglés y francés. `AuthPage` ya usaba dos
reales y no necesitaba cambio.

### El conmutador de idioma enseña su etiqueta

El alta lo montaba con `labelHidden`, así que «Idioma» no se veía y el control
quedaba descompensado junto a «Tema». El chrome público no lo oculta, así que el
alta tampoco. El de tema ya estaba alineado; solo se quitó de la story un
`labels` que repetía a mano el default castellano.

### De paso

La **forma compacta del `Stepper`** —que en la ronda anterior no se pudo ver en
pantalla— quedó comprobada aquí: a 500px de ancho la maqueta del alta enseña
«Paso 1 de 4  Perfil», con la fila de pasos retirada.

### Verificación

`pnpm lint`, `npx tsc -b` y `pnpm test` (289 tests) en verde, y las medidas de
arriba tomadas en el Storybook del worktree (6007).


---

## Tercera ronda

### El ancho sale de la escala de contenido

`--onboarding-shell-max-width` apuntaba a `{breakpoint.md}`; ahora apunta a
`{container.max-width-md}`, que vale lo mismo pero es lo que nombra la cosa: un
punto de corte responsive y una medida de columna tienen que poder moverse por
separado. El render no cambia ni un píxel.

Ojo con el nombre: el token es **`container.max-width-md`** (plano, con guion),
no `container.max-width.md` — con la forma anidada Style Dictionary aborta el
build con «Reference Errors». Revisado el resto de tokens del shell: todos los
demás ya apuntaban al rol correcto.

### Dos anchos: el chrome a ancho de página, solo el paso acotado

La plantilla era una sola columna de 768px con la marca dentro, así que el
logotipo quedaba más al centro que en el resto de la suite. Ahora:

- El **chrome** —barra de la marca y pie de preferencias— ocupa el ancho normal
  de una página pública: el del `Container` del `main`, el mismo que
  `SiteHeader` da a su barra.
- Solo la **columna del paso** (`.onboarding-shell__step`: progreso, cuerpo y
  acciones) se acota y se centra.
- La marca toma el mismo desplazamiento lateral que la cabecera
  (`brand-margin-inline-start` → `{site-header.logo-margin-inline-start}`), que
  descuenta el espacio de seguridad del trazado.

Medido a 1512px: el logotipo de `Pages/Acceso` y el del alta arrancan **los dos
en x=100 y miden 85px**. La misma vertical y el mismo tamaño, que era el
objetivo.

### Idioma y tema, en un pie de chrome propio

Salen de la barra superior —arriba queda solo la marca— y se pintan al final, en
un `footer` propio **separado del pie de acciones del paso**: una preferencia
global no es una acción del flujo. Sigue el ancho del chrome, así que cierra la
pantalla en la misma vertical en que la abre la marca.

La ranura **sigue llamándose `switchers`**, con la misma forma: nombra lo que
contiene, no dónde se pinta, así que sigue siendo exacta y ningún consumidor
cambia. Orden de tabulación comprobado en el navegador: progreso → campos →
acciones del paso → idioma → tema; las preferencias, las últimas.

La story `Test — main acotado, progreso y jerarquía de acciones` cubre ahora las
tres cosas: que el progreso vive dentro de la columna acotada, que los
conmutadores ya no están en la barra superior y que su pie va detrás del paso en
el documento.

### Verificación

`pnpm lint`, `npx tsc -b` y `pnpm test` (289 tests) en verde. Las cinco páginas
revisadas en el 6007 en claro y en oscuro; las medidas de arriba, tomadas ahí.


---

## Cuarta ronda

### Fuera la línea entre el paso y sus acciones

El pie de acciones se separaba con un borde superior, recurso que el sistema no
usa. La separación la hacen ahora el espacio de la rejilla y el aire propio del
pie. Con la línea se fueron sus tres tokens (`actions-border-width`,
`actions-border-color` y el par oscuro), que no usaba nadie más.

### La salida: `text`, pegada a la principal, y el foco alineado con el ojo

`exitAction` pasa de `ghost` a `variant="text"`, y deja de estar al otro extremo:
va **pegada a la principal**, con el mismo hueco que hay entre «Atrás» y ella
(medido: 12px). Al no tener caja ya no compite — el peso lo pone la forma, no la
distancia. En móvil, «Atrás» y la principal a todo el ancho y la salida centrada
debajo.

**Cómo se resolvió el orden de tabulación.** La salida pasa a ir *después* de la
principal en el marcado y el pie deja de usar `column-reverse`: escritorio es
`row` y móvil `column`, las dos recorriendo el mismo orden que el DOM —«Atrás»,
principal, salida—, sin `order` ni `row-reverse` en ninguna parte. Así el foco va
por donde va el ojo en las dos disposiciones (WCAG 2.4.3).

Esto además **arregla un desajuste que ya existía**: el `column-reverse` de móvil
pintaba «Atrás, principal, Omitir» mientras el foco recorría «Omitir, Atrás,
principal».

El precio de no usar `order` es que en móvil «Atrás» queda por encima de la
principal, en vez de la principal la primera. Es la única de las dos
disposiciones posibles que mantiene DOM = visual = foco: poner la principal
arriba en móvil y a la derecha en escritorio exige reordenar por CSS, que es
justo lo que 2.4.3 no admite.

**El color en oscuro: no hubo que tocar nada.** Antes de cambiarlo se comprobó de
dónde sale: `button.text.color` → `{link.color}` y
`button.text.surface-dark-color` → `{link.surface-dark-color}`, que **ya vale
`{color.accent-2}`**. O sea que la variante `text` en superficie oscura ya se
pinta en amarillo por el propio sistema. Verificado en el navegador:
`--button-text-color: #ffcd00` y el botón amarillo en pantalla.

Si en algún momento se quisiera un amarillo *distinto* del de `Link`, el camino
acotado sería remapear `--button-text-color` (y sus pares de hover/active) sobre
`.onboarding-shell__exit`, como ya se hace con `--logo-height-*` en la marca —
nunca editar `button.text.surface-dark-color` en el JSON, que arrastraría a
todos los `Button variant="text"` de la suite.

### Los pasos van solo con título

`PageIntro` sin `description` en las cinco páginas y en la story del template.

Una excepción razonada: en la **sala de espera** ese texto no era una ayuda del
paso, sino el sentido de la pantalla —decir que no se puede hacer nada ahí, que
es la primera de sus decisiones de diseño—. En vez de perderlo, baja al cuerpo
como `Paragraph`. El `PageIntro` queda solo con el título, como pedía la ronda.

### Verificación

`pnpm lint`, `npx tsc -b` y `pnpm test` (289 tests) en verde. Escritorio
comprobado en el 6007 en claro y oscuro, con las posiciones de los tres botones
medidas. La disposición de móvil no se pudo ver en pantalla —la ventana del
navegador no se deja redimensionar en este entorno—: queda comprobada por
lectura del CSS.
