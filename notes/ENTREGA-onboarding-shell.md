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
- Par oscuro de la marca del `Stepper`: por la regla de derivación de
  `CLAUDE.md`, relleno prusia → par de `Button primary` (lavanda con tinta
  prusia), porque `Stepper` no usa lavanda en ninguna otra variante. El carril
  sin recorrer usa el rol de superficie secundaria (como el de `ProgressBar`) y
  el recorrido, la tinta del sistema: así los dos tramos siguen distinguiéndose
  en oscuro.

## Verificación

`pnpm lint`, `npx tsc -b` y `pnpm test` (46 ficheros, 289 tests) en verde.
`pnpm test:stories` no se ha podido correr: Chromium de Playwright no está
instalado en esta máquina (caso previsto en `CLAUDE.md`). Los tests de story
nuevos (`Test — …`, con `tags: ['!dev']`) están escritos y quedan pendientes de
esa pasada.
