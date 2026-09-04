# Entrega — el chrome del alta respira como el del sitio

Rama `aire-chrome`. **Sin release**: no se ha tocado `package.json#version` ni
`CHANGELOG.md`, y **`dist/` no se ha regenerado** (sigue correspondiendo a
v30.3.2). Quien publique tendrá que correr `pnpm release:check` —que regenera
`dist/`— antes del tag, como manda `CLAUDE.md`.

Verde: `pnpm lint`, `npx tsc -b`, `pnpm test` (49 ficheros, 304 tests) y
`pnpm test:stories` en lo tocado (Stepper, OnboardingShell, Pages/Onboarding,
Pages/Acceso). En la pasada completa de `test:stories` quedan **3 fallos
ajenos y anteriores** a este trabajo: `DateTimeField` (dos, `aria-invalid` en
el grupo) y `NotificationButton` (geometría del badge). No se han tocado.

Cuatro asuntos, un commit cada uno, más uno previo de saneamiento:

- `f88f0c3` — los contratos del alta, al día con la variante de la salida.
- `610f226` — el aire del chrome sale del chrome público.
- `d5d8070` — la cifra de la marca del `Stepper`, en peso de cuerpo.
- `347a659` — el flujo declara qué pasos son alcanzables.
- `f584a80` — el pie de acciones impone la talla `lg`.

---

## 0. Los contratos del alta estaban desfasados

Antes de nada: `test:stories` no se corría desde hace tiempo (necesita
Chromium) y cinco contratos habían quedado atrás respecto al código. No es
parte del encargo, pero sin arreglarlos no había forma de comprobar nada:

- `Perfil`, `Logotipo` y `SalaDeEspera` esperaban `button--ghost` en la salida,
  que hoy es `variant="text"` → `button--text`.
- El contrato de `OnboardingShell` seguía esperando el orden de marcado de
  v30.3.1 (`Atrás, Continuar, Omitir`) cuando el de v30.3.2 es
  `Atrás, Omitir, Continuar` —la principal cierra el renglón— y esperaba el
  par de decisiones vacío en la sala de espera, donde hoy va la salida.

Se han puesto al día contra el comportamiento vigente, que es el documentado.
Los tres de `Pages/Onboarding` van en su propio commit; las dos aserciones del
contrato de la plantilla viajan con el commit del aire, porque tocan el mismo
fichero que los contratos nuevos.

---

## 1. El aire del chrome (el encargo)

### Medidas

Medidas de verdad, en Chromium, con `getBoundingClientRect` sobre las stories:

| | `Pages/Acceso` | Alta, antes | Alta, ahora |
| --- | --- | --- | --- |
| Del borde superior de la página a la marca | **8px** | 48px | **8px** |
| Del pie (idioma y tema / enlaces legales) al borde inferior | **24px** | 48px | **24px** |

De dónde sale cada una:

| Pieza | Token del alta | Apunta a | Valor |
| --- | --- | --- | --- |
| Barra de la marca | `--onboarding-shell-brand-padding-block` (nuevo) | `{app-header.padding-block}` — el que da alto a `SiteHeader` | 8px |
| Pie de preferencias | `--onboarding-shell-settings-padding-block` (sustituye a `…-padding-block-end`) | `{legal-footer.padding-block}` — el aire del pie público | 24px |
| Contenido del paso | el `Container` del `main` con `space="xl"` | `{container.padding-block-xl}` | 48px, sin tocar |

Los 48px de antes eran, literalmente, el aire del contenido: la marca vivía
dentro del `main` y el pie sumaba otro `padding-block-end` del mismo tamaño
sobre el que ya pone el marco.

### El mecanismo, y por qué este

La marca sube a la **ranura de cabecera de `PublicPageShell`** —el sitio donde
en cualquier otra página pública va `SiteHeader`— y el pie se queda donde ya
estaba, en la de pie. Las dos son chrome y ninguna vive ya dentro del `main`,
así que el `space="xl"` del `Container` vuelve a gobernar **solo el contenido**,
que es para lo que está. No hacía falta dejar de envolver el pie en su
`Container`: lo que sobraba no era la banda, era el aire de contenido que se le
había puesto encima.

Sobre la forma de atarlo, de las dos que planteaste va la **(b)**: el alta
declara su token y el `$value` referencia al del chrome público. Es el criterio
que ya tiene el repo y se ve en este mismo fichero de tokens —`brand-height` →
`{site-header.content-height}`, `brand-margin-inline-start` →
`{site-header.logo-margin-inline-start}`, `actions-margin-block-start` →
`{form.actions-margin-block-start}`—: un componente **sí** puede leer el token
de otro, pero lo hace en el JSON y con nombre propio, no metiendo la variable
ajena en su CSS. La ventaja práctica es que el CSS del alta sigue hablando de
sí mismo (un consumidor puede recolocar solo el alta redefiniendo su token) y
la procedencia queda escrita en un sitio: la descripción del token. Aun así el
resultado también cumple la (a), porque Style Dictionary emite la referencia
como `var()`:

```css
--onboarding-shell-brand-padding-block: var(--app-header-padding-block);
--onboarding-shell-settings-padding-block: var(--legal-footer-padding-block);
```

### Comprobación del atado

No basta con que hoy coincida, así que se comprobó moviendo el token público a
mano:

1. `app-header.padding-block` de `{spacing.2}` a `{spacing.7}` y
   `legal-footer.padding-block` de `{spacing.5}` a `{spacing.8}`.
2. `pnpm build:tokens` y medida en Chromium: el chrome del alta pasó de
   **8px → 48px** arriba y de **24px → 64px** abajo, sin tocar una sola línea
   del alta.
3. Tokens públicos devueltos a su valor y nueva medida: **8px y 24px** otra
   vez. `git status` limpio en `tokens/component/`.

Además queda un contrato permanente que lo vigila —`Test — el aire del chrome
sale del chrome público`—: no compara contra `8px` ni `24px`, sino contra el
valor **resuelto** de `--app-header-padding-block` y
`--legal-footer-padding-block` (y contra `--container-padding-block-xl` para el
`main`). Si alguien vuelve a poner un número propio que hoy coincida, el test
sigue verde; si lo desata del token público, se cae.

### Lo que no se ha roto

- **El pie sigue cayendo al fondo de la ventana** (v30.3.1): no se ha movido de
  la ranura de pie del `SiteShell`; solo ha cambiado su `padding`.
- **El chrome sigue a ancho de página y la columna acotada** (v30.2.0): la
  marca va en su propio `Container` (ancho `xl`, mismo aire lateral que el
  `main`), y lo único centrado y estrecho sigue siendo `.onboarding-shell__step`.
- **El aire del contenido del paso no se toca**: progreso → cuerpo → acciones
  siguen con sus tokens de siempre.
- Con `shell={false}` marca y preferencias vuelven a la rejilla y **sin** el
  aire del chrome (`--band`), porque ahí manda el `AppShell` de la app.
- Los peldaños de la marca en móvil y teléfono cuelgan ahora de
  `.onboarding-shell__top`, que es donde vive la marca en los dos modos.

---

## 2. Las cifras del Stepper, en peso de cuerpo

`stepper.marker-font-weight`: `{font-weight.emphasis}` → `{font-weight.default}`.
Un token, sin CSS.

La **etiqueta** del paso actual se queda en énfasis
(`current-font-weight`, intacto): es la segunda señal, la que distingue el paso
actual sin depender del color. Las dos descripciones lo dicen ahora, cada una
apuntando a la otra, para que no se «arregle» la de la cifra por simetría.

El paso actual sigue distinguiéndose de los pendientes por lo que siempre lo
distinguió, y en las dos superficies: marca **rellena** con la cifra frente a
marca **hueca** con filete, y etiqueta en énfasis y tinta principal frente a
tinta secundaria. En claro, relleno prusia con cifra clara; en oscuro, relleno
`accent-2` con cifra prusia (`surface-dark-marker-done-*`). El peso de la cifra
no participaba de esa distinción: iba en énfasis tanto en el actual como en los
pendientes.

---

## 3. El Stepper también hacia delante

**La API: `reachable?: boolean` en cada paso** (`StepperStep`), no una prop del
componente.

```tsx
steps={[
  { id: 'perfil', label: 'Perfil' },
  { id: 'organizacion', label: 'Organización' },
  { id: 'logotipo', label: 'Logotipo', reachable: true },
  { id: 'invitaciones', label: 'Invitaciones', reachable: hayOrganizacion },
]}
```

- Sin declararlo, lo de siempre: **alcanzables los completados**.
- `true` abre un pendiente; `false` cierra un completado.
- **El paso actual nunca** es alcanzable, se declare lo que se declare.
- Sin `onStepSelect` nada es interactivo, como antes.

Por qué en el paso y no en una prop `isStepReachable(index)`: la alcanzabilidad
es un hecho **de ese paso**, como su etiqueta, y el flujo ya está construyendo
la lista con su propio estado —el mismo `useState` que sabe si la organización
existe—. Una función aparte sería una segunda fuente de verdad viviendo lejos
de los datos que la deciden, y es justo el sitio donde se desincronizan las
cosas. Sirve igual al alta del hub (paso 4 cerrado hasta que el 2 crea la
organización, `CreateOrganizationWizard.tsx:100`) y al asistente de bricks
(donde el orden no obliga y basta con `reachable: true`). Y sigue la convención
del repo de pasar la **lista entera** en vez de una prop por elemento.

El componente **no valida nada**: la regla «hacia delante solo con el paso
actual completo» la pone el producto, que es quien conoce sus campos
obligatorios. La story `Ir también hacia delante` la enseña montada: con el
campo obligatorio vacío el paso siguiente no se pulsa; en cuanto se rellena, se
abre.

Un paso no alcanzable es **inerte**, no un botón deshabilitado: sigue siendo el
`<span>` de siempre, sin `role` de botón, sin foco y sin cursor de mano. No se
ha añadido ninguna señal visual nueva: el estado del paso ya se ve. Y el
`aria-current="step"` del actual sigue igual. Todo esto lo cubre
`Test — reachable abre pendientes y cierra completados`.

---

## 4. El pie de acciones impone la talla

El pie envuelve lo que recibe en **`FormSizeContext` con `lg`**. Es el mecanismo
del repo para esto, no uno nuevo: es el mismo contexto con el que un `Form`
reparte talla a sus campos y con el que `Hero` da `lg` a sus acciones
(`Hero.tsx:42`), y `Button` ya lo lee (`useFormSize`).

Hacía falta porque `surface-public.css` remapea **tipografía**, no tallas de
control: la talla la ponía cada `call-site`, y las cuatro pantallas de
`Pages/Onboarding` no la ponían. Resultado: campos `lg` y pie `md` en la misma
pantalla. Comprobado en el contrato de la plantilla: «Atrás», «Omitir por
ahora» y «Continuar» salen con `button--lg` **sin que nadie les pase `size`**,
la misma talla que el `input--lg` del formulario del paso. Se ha quitado el
`size="lg"` a mano de las stories de la plantilla, que ya no hace falta.

Un `size` explícito en un botón concreto sigue mandando, igual que en `Hero`:
el contexto pone el valor por defecto de la superficie, no un candado. El
candado duro solo tiene sentido donde el consumidor no puede saber la medida
—el alto del logotipo—; aquí la talla `lg` es la de la superficie pública y una
pantalla con un motivo para salirse debe poder hacerlo.

---

## Nota de entorno

Para poder correr `test:stories` hizo falta el `chrome-headless-shell` de
Playwright y la descarga no salía de la red. Se resolvió enlazando en la caché
de Playwright la revisión que ya estaba instalada:
`~/Library/Caches/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-mac-arm64`
→ la carpeta de `chromium_headless_shell-1217`. Es un enlace en la caché local
de la máquina, fuera del repo; se puede borrar y volver a `npx playwright
install` cuando haya red.
