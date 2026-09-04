# Entrega — `PublicPageShell` con `ref`, y el pie del correo sin cuenta

Rama `ref-y-pie`. **Sin release**: no se ha tocado `package.json#version` ni
`CHANGELOG.md`, y **`dist/` no se ha regenerado** (sigue correspondiendo a
v30.2.0). Quien publique tendrá que correr `pnpm release:check` —que regenera
`dist/`— antes del tag, como manda `CLAUDE.md`.

Verde: `pnpm lint`, `npx tsc -b`, `pnpm test` (48 ficheros, 300 tests).
`pnpm test:stories` **no se ha podido correr**: en esta máquina falta el
Chromium de Playwright (`npx playwright install`). Las stories de prueba nuevas
están escritas pero no ejecutadas.

## 1. `PublicPageShell` reenvía el `ref`

`SiteShell` ya reenviaba el suyo al nodo raíz (`.site-shell`) desde v25.30.0: el
hueco no estaba abajo, estaba en la plantilla, que lo tragaba. Se arregla ahí y
no en una capa de más.

```tsx
const PublicPageShell: ForwardRefExoticComponent<
  PublicPageShellProps & RefAttributes<HTMLDivElement>
>;
```

La API existente no cambia: mismas props, mismo render, mismo default. Ni
`ErrorPage`, ni `NotFoundPage`, ni `AuthPage`, ni `OnboardingShell` han
necesitado tocarse.

### A qué nodo va el ref, y por qué

**Al nodo raíz del `SiteShell` (`.site-shell`)**, el mismo que reenvía
`SiteShell`. No al `main`.

Para qué sirve: ser el **`container` de un panel que monta en un portal**
—`ConsentPreferences`, `Modal`, `Sheet`—. Sin ese nodo el portal monta en
`document.body`, que no es descendiente de `.site-shell` y por tanto **no
hereda el remapeo de superficie pública** (`src/tokens/surface-public.css`
declara bajo `.site-shell`): el panel saldría a la talla de aplicación —cuerpo
16px, controles `md`, aspa pequeña— en medio de una página que lee a 20px. El
tema oscuro sí llega solo, porque se activa en `<html>` y cascadea a cualquier
portal.

Por qué no el `main`: es un `Container` acotado, con ancho máximo y sangrado
propios. Un panel anclado ahí quedaría **dentro de la columna de contenido** en
vez de flotar sobre la página entera — que es exactamente el fallo que el
brief teme y que nadie ve hasta producción.

Y es el nodo que el consumidor espera. En `slxd`,
`packages/public-shell/src/consent/PublicSiteShell.tsx` existe solo para esto:

```tsx
export function PublicSiteShell(props: SiteShellProps) {
  const { containerRef } = useConsent();      // RefObject<HTMLDivElement | null>
  return <SiteShell ref={containerRef} {...props} />;
}
```

Con este cambio, el layout `(auth)` del hub y las nueve `unsubscribe` pueden
pasar a `PublicPageShell` poniéndole ese mismo `containerRef` — y
`PublicSiteShell` deja de tener razón de ser (retirarlo es decisión de `slxd`,
aquí no se ha tocado nada).

**Con `shell={false}` el `ref` se queda sin asignar**, porque no hay marco: en
ese caso la página vive dentro del `AppShell` de la app, que es quien pone el
contenedor. Está documentado en el JSDoc de `shell`, en el del componente y en
el MDX.

Story `Con un panel anclado al marco` (`ConsentPreferences` abierto con
`container={marco}`), story de prueba `Test — el ref llega al nodo del marco`
(afirma `.site-shell`, y **no** `.container`) y sección propia en el MDX con el
porqué del nodo, para que el próximo no lo use para otra cosa.

## 2. El pie del correo, para quien no tiene cuenta

`EmailOptOut` pasa a ser una **unión de dos formas**, sin tocar el nombre del
tipo ni la prop `optOut` (la forma de hoy sigue compilando y renderizando
igual):

```ts
type EmailOptOut = EmailOptOutAccount | EmailOptOutGuest;

interface EmailOptOutAccount {          // quien tiene cuenta — lo de siempre
  unsubscribeUrl: string;
  preferencesUrl?: string;
  unsubscribeLabel?: string;
  manageLabel?: string;
  manageBeforeLabel?: string;
  managePreferencesLabel?: string;
  manageAfterLabel?: string;
  reasonLabel?: never;
}

interface EmailOptOutGuest {            // quien no la tiene
  unsubscribeUrl: string;
  reasonLabel: string;                  // obligatoria, SIN default castellano
  unsubscribeLabel: string;             // obligatoria, SIN default castellano
  preferencesUrl?: never;               // prohibida por el tipo
  manageLabel?: never;
  manageBeforeLabel?: never;
  managePreferencesLabel?: never;
  manageAfterLabel?: never;
}
```

Rinde `{reasonLabel} <a>{unsubscribeLabel}</a>` en el mismo `Text` del pie, con
los mismos estilos: es un cambio de composición y de contrato, no de pintura.

Tres decisiones, por si se discuten luego:

- **`preferencesUrl` prohibida por el tipo**, no solo desaconsejada. El fallo
  que hay que evitar —ofrecerle al invitado una pantalla tras la sesión del hub
  que no puede abrir— es silencioso: el correo sale perfecto y el enlace acaba
  en un login. Que no compile es la única forma de que no pase.
- **Las dos props obligatorias y sin default castellano.** Es la segunda
  excepción del repo tras `EmailButton.fallbackLabel`, y por lo mismo: el
  motivo por el que a alguien sin cuenta le llega un correo lo sabe el producto
  que lo manda (y en seis idiomas, que están en `mailer`), no el DS. Siendo el
  enlace una frase entera que cierra el motivo, ningún default podría encajar
  con la frase de delante. **Aquí no se ha escrito copy**: la frase del brief
  vive en la story y en el test, no en el componente.
- **Se distinguen por `reasonLabel`**, no por un `variant`: pasarla obliga a
  omitir `preferencesUrl` y al revés, así que un correo no puede acabar con la
  mitad de cada pie.

Exportados también `EmailOptOutAccount` y `EmailOptOutGuest` desde
`@studiolxd/brand/email`. Story `Sin cuenta` junto a las que ya había, sección
«El pie de quien no tiene cuenta» en el MDX, test en `EmailLayout.test.tsx`
(afirma el motivo y la baja, y que **no** aparece nada del pie con cuenta), y
la tabla de Foundations › Internacionalización actualizada con la excepción.

## Lo que queda fuera

- La versión, el `CHANGELOG` y `dist/`: los pone quien publique.
- `slxd` no se ha tocado (era de solo lectura): adoptar `PublicPageShell` en el
  layout `(auth)` y en las nueve `unsubscribe`, y pasar el pie sin cuenta en las
  plantillas de revisión de invitados de bricks, es trabajo de allí.
