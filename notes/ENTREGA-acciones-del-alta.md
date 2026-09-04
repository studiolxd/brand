# Entrega — el pie de acciones del alta, como el de un formulario

Rama `acciones-alta`. **Sin release**: no se ha tocado `package.json#version`
ni `CHANGELOG.md`, y **`dist/` no se ha regenerado** (sigue correspondiendo a
v30.3.1). Quien publique tendrá que correr `pnpm release:check` —que regenera
`dist/`— antes del tag, como manda `CLAUDE.md`.

Verde: `pnpm lint`, `npx tsc -b`, `pnpm test` (49 ficheros, 302 tests).

Dos commits, uno por asunto:

- `27ce55b` — la principal cierra el renglón.
- `95959b6` — el aire del pie sale del token del formulario.

## 1. El orden en escritorio

Salía `[Continuar] [Omitir por ahora]`: la acción de más peso en mitad del
renglón y la salida cerrándolo. Ahora `[Omitir por ahora] [Continuar]`, que es
lo que ya hace el pie de un `Form` (`.form__actions:not(--block)` → `row` +
`justify-content: flex-end`, con la principal la última del marcado). En móvil
no cambia nada: «Atrás» y «Continuar» a todo el ancho, «Omitir por ahora»
centrado debajo.

### Cómo, y por qué no toca el foco

El criterio se copió entero del `Form`, incluidos sus dos pasos:

1. **El marcado va en el orden del renglón de escritorio** — «Atrás», la
   salida, la principal. Ese es el orden del DOM y, por tanto, el del
   tabulador.
2. **La inversión de móvil se hace sobre el par de decisiones**, no sobre la
   fila: `.onboarding-shell__decisions` pasa a `column-reverse`, igual que
   `.form__actions--block` en el `Form`. Ni `order` ni `row-reverse` sobre
   `.onboarding-shell__actions`.

Para que la inversión no arrastre a «Atrás» —que en móvil tiene que seguir
arriba— «Atrás» sale del sub-grupo y pasa a ser hijo directo del pie. El pie
queda así:

```
.onboarding-shell__actions        (column → row en md)
├── backAction
└── .onboarding-shell__decisions  (column-reverse → row en md)
    ├── .onboarding-shell__exit   (la salida)
    └── primaryAction
```

En escritorio la fila sigue literalmente el marcado, así que ahí el orden de
foco y el visual son el mismo (WCAG 2.4.3). En móvil el único par que se lee
al revés que el DOM es salida/principal, exactamente el compromiso que el
sistema ya tiene asumido en `.form__actions--block` y por la misma razón: en
columna la principal va arriba, que es donde el pulgar la espera.

**Comprobación del tabulador.** Se añadió `OnboardingShell.test.tsx`, con dos
pruebas: que el marcado del grupo de acciones es «Atrás» → «Omitir por ahora» →
«Continuar», y que `userEvent.tab()` los recorre en ese mismo orden. Ese test
es el que impide que alguien «arregle» el orden de escritorio con un `order` y
descoloque el foco sin enterarse.

**Comprobación visual.** Sin arrancar Storybook: se montó el marcado del pie
sobre el CSS del componente en una página estática y se midieron las cajas con
Chrome a 1280 y a 375, en superficie clara y oscura. A 1280 la fila queda
`Atrás (x 674) · Omitir (x 749) · Continuar (x 921)`; a 375, «Atrás» y
«Continuar» a los 293px de la columna y «Omitir» centrado debajo —idéntico al
móvil de antes—.

## 2. El aire del último campo al pie

El operador preguntaba si esa medida es la de los formularios. Lo era **por
casualidad**: `--onboarding-shell-gap` y `--form-actions-margin-block-start`
valían los dos `spacing.6` sin depender uno del otro. Ahora depende:

- **Nuevo `onboarding-shell.actions-margin-block-start` →
  `{form.actions-margin-block-start}`.** Es el aire del cuerpo del paso a su
  pie de acciones. Si el `Form` mueve el suyo, el alta se mueve con él.
- **`onboarding-shell.gap`** se queda con lo demás y su descripción lo dice:
  gobierna el chrome (barra de marca, pie de preferencias) y, dentro de la
  columna, el tramo del progreso al cuerpo — **no** el del cuerpo al pie.
- **`onboarding-shell.actions-padding-block-start`** (`spacing.5`) sigue igual:
  el aire extra que sustituye a la línea que aquí no hay. Su descripción ahora
  remite al token de arriba en vez de «la rejilla».

Para poder darle a ese tramo una medida propia, `.onboarding-shell__step` deja
de repartir un `gap` uniforme —una rejilla no sabe dar un hueco distinto a una
sola fila—: el progreso pone su aire por debajo (`margin-block-end`) y el pie
el suyo por arriba (`margin-block-start`). El `:empty` del progreso sigue
funcionando igual, y ahora además se lleva su propio aire al no pintarse, así
que un flujo de un solo paso tampoco deja hueco.

**El render no se mueve.** Medido en Chrome con el CSS de antes y el de ahora:
32px del progreso al cuerpo, y 32 + 24 = 56px del cuerpo al primer botón del
pie, en los dos casos.

## Qué no se tocó

- La disposición de móvil, ni la posición de «Atrás».
- La API: ninguna prop cambia de nombre ni de tipo. Lo que cambia en el JSDoc
  y en el MDX es dónde se pinta la salida (antes «después de la principal»,
  ahora «antes»).
- `Form`: el `Form` ya lo hacía bien; aquí solo se siguió su criterio.
