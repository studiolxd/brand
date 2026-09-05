# Changelog

Este fichero arranca en `v13.5.0`. El histórico anterior vive en los mensajes de commit
de cada tag (`git log --tags`).

El paquete sigue [semver](https://semver.org/lang/es/): **patch** para bug fixes y
regeneración de `dist`, **minor** para componentes/props/variantes/tokens nuevos, **major**
para breaking changes.

## Sin publicar

- **`UptimeBars`, la tira de disponibilidad** (`Molecules/UptimeBars`, export
  `@studiolxd/brand/uptime-bars`). Una barrita por punto de la serie y la media
  del periodo debajo, para el panel de estado. Agnóstica del tiempo y del origen
  de los datos: recibe N puntos con porcentaje, etiqueta y detalle opcional, y
  pinta. `value: null` es la ausencia de medida —no un 0 %—: va rayada y se
  anuncia «sin datos». Tres tramos con los roles de feedback y cortes
  configurables (`thresholds`), con un valor de fábrica pensado en tiempo caído
  al día. Accesible sin depender del color: lista ordenada con nombre, nombre
  accesible completo por barrita, la media siempre en texto, bocadillo también
  por teclado y una sola parada de tabulador con flechas.
- **Rol de feedback `warning`, con dos tokens: `color.warning-fill`
  (`{color.yellow}`) y `color.warning-fill-text` (`{color.primary}`).** Faltaba
  el tramo intermedio: lo que ya no está bien pero todavía no está roto. **Un
  aviso siempre va como relleno, con la tinta prusia encima** (11,17:1, AAA);
  por eso el rol no tiene `-text-on-light` ni `-text-on-dark` y no los tendrá:
  el amarillo da 1,50:1 sobre blanco y sobre prusia se confundiría con la marca.
  Excepción declarada en `CLAUDE.md` y explicada en Fundamentos › Colores.
- **Retirados `color.amber` y `color.amber-light`.** El primer intento del rol
  (v30.10.0) inventó dos colores de sistema para el aviso; la paleta no se
  amplía por la puerta de atrás. El aviso vuelve a ser el amarillo que `Alert` y
  `Tag` ya pintaban — mismo píxel, otra procedencia: llega por el rol de
  feedback, no por `accent-2`, así que se cambia en un sitio si deja de ser
  amarillo.
- **`Alert`, `Toast` y `Tag` pintan el aviso con el rol, no con la marca.** Sin
  cambio visual respecto de v30.9.x: relleno amarillo con tinta prusia. `Alert`
  y `Toast` mantienen su excepción de siempre — la raíz no declara
  `.surface-dark` en `warning`, porque ahí la superficie lee en claro.
- **`UptimeBars`: el tramo «tocado» lleva filete también en superficie clara**
  (`uptime-bars.degraded-border-color`, el prusia del rol). El amarillo del
  aviso da 1,50:1 sobre blanco, por debajo del 3:1 que pide WCAG 1.4.11 para un
  objeto gráfico; el filete es lo que identifica la barrita, el mismo recurso
  que las tres usan ya en oscuro.
- **`Avatar` gana las tallas `3xl` (128px) y `4xl` (192px)**, y `AvatarUpload`
  remapea a `sm` → 96px, `md` → 128px y `lg` → 192px: cada contexto sale al
  doble de lo que salía. Cambio visual en la subida de la foto de perfil y en el
  logotipo del alta. La fila de `AvatarUpload` envuelve cuando el retrato ya no
  cabe con el botón al lado (a 375px, en `lg`).

## v30.10.0

- **`UptimeBars`** (nuevo, `./uptime-bars`): la tira de disponibilidad, una
  barrita por punto con su porcentaje, su etiqueta y su detalle, la media del
  periodo y los extremos etiquetados. Agnóstica del tiempo y del origen: no
  sabe qué es un día. Un punto **sin dato** se pinta y se anuncia distinto, no
  como 0 %. Tres tramos por umbral configurable, con el por defecto pensado en
  tiempo caído por día: verde hasta 5 min, aviso hasta 1 h, error de ahí en
  adelante — el margen del verde es deliberado, un fallo aislado de
  comprobación no es un incidente. `summary` es obligatoria: es la alternativa
  en texto a la tira, y cada barrita lleva su nombre accesible completo.
- **Rol de feedback `warning`** (`color.warning-*`, con `-fill`, `-fill-text`,
  `-text-on-light` y `-text-on-dark`), que no existía: `Alert`, `Tag` y `Toast`
  pintaban su variante de aviso con **`accent-2`, el amarillo de marca** del
  hover de los botones. **Los tres pasan al rol.** Cambio visual en componentes
  en uso.
- **`Avatar`: tallas `3xl` (128px) y `4xl` (192px)**, y `AvatarUpload` sube un
  peldaño en cada contexto (sm→2xl, md→3xl, lg→4xl): el retrato de la foto de
  perfil y del logotipo de la organización sale al doble. A 375px la fila
  envuelve y el botón cae debajo.
- Punto flojo declarado: en superficie oscura los tres tramos de la tira se
  separan por el filete y no por luminancia (los `*-fill` son universales,
  ~2,3:1 sobre el prusia). Arreglarlo pediría un relleno por superficie, que no
  se ha inventado.

## v30.9.0

- **Una sola superficie de diálogo: `Modal` y `Sheet` dejan de ser dos árboles
  paralelos.** El velo, la cabecera y el pie viven ahora una sola vez en
  `molecules/_shared/dialogSurface`, y cada uno es una **colocación** de ella:
  el diálogo, centrada; el cajón, lateral. Mismo trato que recibió el aspa en
  v30.8.0 — la superficie no tiene ni un color ni una medida propia, y cada
  contenedor mapea encima sus tokens (`modal.*`, `sheet.*`), así que quien los
  sobrescriba sigue mandando.
- **No cambia ninguna API ni desaparece ninguna clase.** `modal__overlay`,
  `sheet__header`, `modal__footer`… siguen en el DOM junto a las compartidas
  (`dialog-overlay`, `dialog-header`, `dialog-footer`), de modo que quien
  afinaba por esas clases —`ConfirmDialog` y `ImageCropDialog`, sin ir más
  lejos— no se entera.
- **Lo que no se ha unificado, porque no estaba duplicado**: la cabecera del
  cajón apila título y descripción con el aspa sobre la esquina y la del
  diálogo los pone en fila; son dos colocaciones declaradas (`stacked` /
  `inline`) de la misma pieza, no dos maneras de hacer lo mismo. Y el
  comportamiento de diálogo —foco, Escape, velo, scroll, `aria-modal`— nunca
  estuvo duplicado: lo pone Base UI.
- **Un arreglo de paso**: el velo tiene su opacidad de token también en
  reposo. Antes solo la tenía mientras corría la animación de entrada, así que
  con las animaciones desactivadas el diálogo se velaba a opacidad 1.

## v30.8.0

- **`CloseButton` — una sola aspa para todo el sistema.** Hasta ahora había dos
  maneras de pintar lo mismo: `Modal`, `Sheet` y `FloatingDock` montaban un
  botón nativo propio con sus tokens `*-close-*`, y `Alert` y `Toaster` un
  `Button iconOnly variant="ghost"`, que pinta un relleno al pasar el puntero.
  Ahora las cinco montan el mismo átomo, **sin hover**: ni fondo ni cambio de
  color; el único estado que marca es el foco.
- **Es una pieza propia, no una variante de `Button`.** Un aspa no tiene rótulo,
  ni relleno, ni el hover de un botón de acción; y `ghost` revela justo el fondo
  que aquí sobra. Se suma a la familia de iconos-botón del sistema
  (`MenuButton`, `DotsButton`), y es el aspa en la que termina la animación de
  `MenuButton`. Nuevo export `@studiolxd/brand/close-button` y tokens
  `close-button.*`.
- **Ningún token desaparece**: cada contenedor sigue mandando su talla y su
  tinta desde los tokens `*-close-*` que ya tenía, remapeados sobre el átomo.
  El aspa del `Alert` pasa de 16 a 24px de glifo, la talla de icono-botón del
  sistema, la misma que ya tenían el diálogo y el dock.
- **El pie de los diálogos, a ancho completo en móvil.** `Modal` gana la prop
  `footer` (y `footerClassName`): reparte los botones a la derecha en una fila
  y, por debajo del punto de ruptura `md`, los apila a todo el ancho con la
  acción principal arriba. Es el mismo criterio —y el mismo `column-reverse`—
  que las acciones de `Form`, y vive en `Modal` una sola vez: `ConfirmDialog`,
  `ImageCropDialog`, `CommandPalette` y `ConsentPreferences` son `Modal`, así
  que ninguno lo repite. El pie queda además fuera del cuerpo desplazable.
- Tokens nuevos `modal.footer-margin-block-start` y `modal.footer-gap`
  repuntado a `{form.actions-gap}`: la fila de acciones del sistema es una
  sola, esté en un formulario o en un diálogo.
- **`ImageCropDialog` — el copy del recorte.** El título nombra la acción y no
  invita a hacerla: el default de `AvatarUpload` pasa de «Recorta la imagen» a
  **«Recortar imagen»**, y los ejemplos de stories y docs van con él. La
  descripción del diálogo **deja de tener default**: lo que hay en pantalla es
  la imagen con su marco de selección, que se explica solo. `cropDescription`
  sigue existiendo para quien tenga algo que decir.
- **`Avatar` gana `2xl` (96px) y `AvatarUpload` lo usa.** En el paso del
  logotipo el avatar no acompaña al botón: es el asunto de la pantalla y
  además la diana donde se suelta la imagen. La talla del avatar pasa a ir
  **dos peldaños por encima** del control (`sm` → 48, `md` → 64, `lg` → 96),
  y el icono del velo sube a `lg` en la talla grande. 96px es vez y media el
  peldaño anterior, sigue en el múltiplo de 8 y —con el botón al lado y el
  aire del sistema— la fila entera cabe todavía en un móvil de 375px; hay un
  test de story que lo mide.

- **El pie del `Sheet`, también a ancho completo en móvil.** El cajón repetía
  la fila alineada a la derecha del diálogo pero se quedó sin el apilado que
  `Modal` acaba de ganar, y es la única de las duplicaciones entre los dos que
  producía una diferencia de comportamiento: un cajón con dos acciones en un
  móvil de 375 apretaba los botones. Mismo criterio y mismo punto de ruptura
  (`md`) que el diálogo y que las acciones de `Form`.

## v30.7.0

- **`AvatarUpload` — el avatar de una entidad con su subida.** Una sola pieza
  para persona (redondo) y organización (cuadrado): avatar, subida por clic y
  por arrastre, validación de cliente y recorte. Compone lo que ya existía
  —`Avatar`, la validación del `FileUpload`, `ImageCropDialog` y `Button`— y
  entrega el recorte por `onChange(blob, file)`; la subida de verdad sigue
  siendo del producto.
- **La diana es el avatar**, no el bloque: se anuncia con un anillo en cuanto
  empieza un arrastre sobre la ventana, y el anillo se pinta con `outline`, así
  que la zona sensible no crece más allá del avatar. El botón se queda siempre:
  es la vía accesible, no un respaldo.
- **Dos textos para el botón**: `buttonLabel` (visible, «Subir») y
  `buttonAccessibleLabel` (el nombre completo, «Subir logo»). En desarrollo
  avisa si el accesible no contiene el visible — WCAG 2.5.3.
- **Los formatos y el peso ya no se pintan**: los dice el error de la
  validación —que ahora dice qué **sí** se acepta— y la descripción accesible
  del botón, porque el `accept` del input no lo anuncia ningún lector.
- **La talla la manda el contexto** (`FormSizeContext`): sin `size`, botón y
  avatar suben juntos con el `Form`/`OnboardingShell` que los envuelva.
- **`Avatar` gana la talla `xl` (64px)**, para cuando el avatar es el asunto de
  la pantalla. No es una talla de control —48px sigue siendo el control más
  alto—: es el peldaño de marca de la escala de iconos, el mismo de
  `logo.height-xl` y `logomark.size-xl`.
- Tokens nuevos: `avatar-upload.*` y `avatar.size-xl` /
  `avatar.initials-font-size-xl`.
- **El CSS de un chunk compartido ya no se queda huérfano.** Cuando dos
  entradas comparten un componente, rollup saca su cuerpo a `dist/_shared/` y
  su CSS al raíz con el nombre del chunk, sin nadie que lo importe:
  `scripts/post-build.mjs` lo engancha ahora igual que el de las entradas. Le
  pasaba ya a `ProgressBar` (`dist/ProgressBar.css` estaba huérfano en
  v30.6.0), que queda arreglado.

- **Arreglado: los chunks compartidos salían sin su CSS.** Cuando dos entradas
  comparten un componente, rollup saca su cuerpo a `dist/_shared/` y su hoja al
  raíz con el nombre del chunk, **sin que nadie la importe**. `post-build.mjs`
  engancha ahora ese CSS. **`ProgressBar` ya venía así desde v30.6.0**
  (`dist/ProgressBar.css` huérfano): quien lo usara lo recibía sin estilos.

## v30.6.0

- **`FieldRow` / `FieldRows` — la fila de formulario repetible.** La pieza que
  le faltaba al DS para cualquier **lista editable** (invitar personas,
  dominios, redirecciones, variables de entorno): un campo que absorbe el
  sobrante, otros con su ancho propio y **una acción al final, en su propia
  celda**, fuera de la columna de cualquier campo. Antes esto se montaba con
  `Columns ratio="2:1"` y el aspa dentro de la celda del select: la fila no
  llenaba el ancho y la acción colgaba de la etiqueta de otra cosa.
- **Las etiquetas, solo en la primera fila, sin trucos del consumidor.**
  `FieldRows` conoce la posición y reparte el ocultado por contexto —el mismo
  mecanismo con el que `Form` reparte la talla—, así que ya no hace falta
  acordarse de `labelHidden={i > 0}` fila a fila. En las filas sin etiqueta
  visible el `<label>` sigue en el árbol: **el campo conserva su nombre
  accesible en todas**.
- `labelHidden` pasa a heredarse en los dieciséis `*Field` que lo tenían: sin
  valor, lo decide quien envuelva. Sin `FieldRow` alrededor el default sigue
  siendo `false` — no cambia nada de lo ya escrito.
- Tokens nuevos: `field-row.*` (anchos de celda, aire, hueco de la etiqueta).

- **`Card` con `href` ya no arrastra la línea de la base**, el mismo defecto que
  tenía `ProjectCard`: la tarjeta-enlace llevaba una línea de 1px pegada a su
  borde inferior, heredada del subrayado de la base y nunca anulada.
- **El título del correo lee con el interlineado de su peldaño.** Subió a 32px
  pero conservaba el interlineado del anterior; se nota en un asunto de dos
  renglones.
- **La norma 7 la vigila un test, no la memoria**
  (`src/stylesheets/underline.test.ts`): barre los `.css` de `src/` **y los JSON
  de `tokens/`** —por donde se había colado el `Breadcrumb`, invisible al buscar
  en el CSS— y falla si aparece `text-decoration: underline` fuera de las dos
  excepciones, que están escritas en el propio test con su motivo.

## v30.5.0

- **Norma nueva del DS: el subrayado es una línea, no `text-decoration`.** Se
  subraya con `box-shadow` y su `padding-block-end`, como ya hacían `Link` y
  `Button --text`. Dos motivos: `text-decoration` no cubre un SVG —un elemento
  con icono queda con la línea cortada— y su grosor y posición los deciden la
  fuente y el navegador, así que no hay forma de que todos los subrayados
  coincidan. Con **dos excepciones que no se amplían**: `vendor/normalize.css`,
  que es de terceros, y `src/stories/email/`, donde Outlook renderiza con el
  motor de Word y no pinta `box-shadow`.
- **El barrido que trajo la norma**: `Stepper` (el hover de un paso navegable),
  `ProjectCard` —que además arrastraba la línea en reposo sin anularla nunca,
  contra lo que decía su propio MDX— y `Breadcrumb`, donde el subrayado entraba
  **por token** y por eso no aparecía buscando en el CSS. Sus dos tokens quedan
  en `none` y marcados obsoletos; retirarlos sería breaking.
- **`OnboardingShell`**: más aire entre la salida y la acción principal del pie
  (12 → 16px). No hizo falta separar el token: las tres acciones son hermanas.
- **Correo**: el título sube a 32px por `{site-shell.heading-size-6}`, que es ese
  valor en la escala de la superficie pública; el enlace de respaldo pasa a la
  talla del cuerpo y **a su propia línea**, sin sacar barra horizontal a 320px
  con una URL con token; y el botón **gana el hover** del `Button primary`
  (lavanda → amarillo) en la hoja embebida, con el aviso escrito de dónde no
  funciona: Outlook de escritorio lo ignora, y en móvil no hay hover.

## v30.4.1

Los tres contratos que `test:stories` daba en rojo. La puerta llevaba tiempo sin
poder correrse —el Chromium de Playwright no bajaba en esta red—, así que
nadie los había mirado.

- **`NumberBadge` / `NotificationButton`: el contador se leía dos veces.** Un
  lector de pantalla anunciaba el número del badge y luego otra vez dentro del
  nombre del botón. El MDX decía que el badge visible era decorativo desde el
  primer día; en el DOM no lo era. Arreglado en el átomo. **Afecta a la campana
  con contador de las ocho apps.**
- **`DateTimeField`: el contrato miraba el `aria-invalid` donde ya no vive.**
  Test desfasado, no componente.
- El contrato de `NotificationButton` seguía pasando el contador dentro de
  `label`, cuando `11a0d97` (2026-09-02) desdobló el nombre en `label` /
  `countLabel`. Puesto al día, y con dos aserciones más que cazan el fallo de
  arriba.

## v30.4.0

Cuatro cosas del alta, todas vistas en el hub.

- **`Stepper`: el flujo declara qué pasos son alcanzables.** Antes solo se podía
  volver a un paso completado; ahora el consumidor dice hasta dónde se puede
  llegar y el componente hace clicables esos, dejando **inertes** —sin foco, sin
  role de botón— los demás. Un paso al que todavía no se puede llegar no es un
  destino, así que no se pinta como un botón deshabilitado. El componente no
  sabe nada de validación: eso lo sabe el producto.
- **`Stepper`: la cifra de la marca, en peso de cuerpo.** El énfasis se queda
  donde hace falta: en la **etiqueta** del paso actual, que es la señal que lo
  distingue sin depender del color. La cifra va dentro de una marca rellena de
  otro color, así que su peso no señalaba nada.
- **`OnboardingShell`: el aire del chrome sale del chrome público.** La marca
  abría a 48px —el `space="xl"` del `Container`, que es aire de contenido—
  cuando en el sitio abre a 8. Ahora `brand-padding-block` apunta a
  `{app-header.padding-block}` y `settings-padding-block` a
  `{legal-footer.padding-block}`: **atados**, no copiados, así que si el chrome
  del sitio respira distinto el alta se mueve con él.
- **`OnboardingShell`: el pie de acciones impone la talla `lg`** por
  `FormSizeContext`, el mecanismo que ya usa `Hero`. La superficie pública
  remapea tipografía pero no controles, así que la talla dependía de que cada
  call-site la recordara: en la misma pantalla convivían un pie en talla base y
  un formulario en `lg`.

## v30.3.2

`OnboardingShell`, el pie de acciones:

- **La principal cierra el renglón**, como en el pie de un `Form`: en escritorio
  la fila es «Atrás» · salida · principal, alineada al final. Antes la salida
  quedaba detrás de la principal. El marcado va en ese mismo orden, así que en
  escritorio el foco y el orden visual coinciden; en móvil se invierte solo el
  par salida/principal —la principal arriba, donde el pulgar la espera—, con
  `column-reverse` sobre ese sub-grupo, que es el compromiso que el sistema ya
  tiene asumido en `.form__actions--block` y por la misma razón. «Atrás» sale
  del sub-grupo para que la inversión no lo arrastre.
- **El aire del cuerpo al pie sale del token del formulario**
  (`{form.actions-margin-block-start}`) en vez de un valor propio: los dos pies
  se mueven juntos. Antes coincidían por casualidad y el alta podía descolgarse
  sin que nadie se enterara. El `gap` del alta pasa a gobernar solo el chrome y
  el tramo del progreso al cuerpo, y las descripciones de ambos tokens dicen qué
  gobierna cada uno. El render no cambia.

## v30.3.1

`OnboardingShell`: el pie con los conmutadores de idioma y tema **cae al fondo
de la ventana** cuando el paso no llega a llenarla, y lo empuja el contenido
cuando sí. Antes era un bloque más dentro del contenido, así que en el paso del
perfil —un campo y un botón— quedaba media pantalla vacía debajo. Va por la
ranura de pie del `SiteShell`, que ya ocupa `100dvh`, en vez de repetir el alto
dentro (un `100dvh` anidado da alto de más y una barra de scroll de regalo). El
reparto horizontal no cambia: chrome a ancho de página, columna del paso acotada
y centrada.

## v30.3.0

Dos aperturas de API que desbloquean las dos últimas páginas públicas de la
suite fuera del modelo (`(auth)` del hub y las nueve `unsubscribe`).

- **`PublicPageShell` reenvía el `ref`** al nodo raíz del `SiteShell`, para que
  sirva de `container` de un panel montado en portal (`ConsentPreferences`, un
  `Modal` o un `Sheet` abiertos desde la página). Sin él, el portal monta en
  `document.body`, que no es descendiente de `.site-shell` y **no hereda el
  remapeo de superficie pública**: el panel saldría a talla de aplicación en una
  página que lee a 20px. Va al marco y no al `main` porque el `main` es un
  `Container` acotado, donde un panel quedaría dentro de la columna de contenido
  en vez de flotar. Con `shell={false}` no hay marco y el `ref` se queda sin
  asignar. API existente intacta.
- **El pie del correo admite al destinatario sin cuenta**: solo la baja, sin la
  invitación a gestionar preferencias. Los correos que van a quien no tiene
  cuenta en la suite —los de revisión de invitados— no pueden ofrecer una
  pantalla que hay detrás de la sesión. `preferencesUrl` queda **prohibida por
  el tipo** en ese caso: el fallo sería silencioso, así que la red es que no
  compile. Sin copy en el DS, como el resto del correo.

## v30.2.0

Dos frentes: **el alta de la suite** y **los correos**, más dos correcciones
que afectan a componentes ya en uso (ver «Lo que cambia fuera de lo nuevo»).

### El alta

- **`PublicPageShell`** (nuevo, `./public-page-shell`): el marco de una página
  pública en una sola pieza — `SiteShell` + `Container as="main"`, con `header`
  y `footer` opcionales dentro de su `ErrorBoundary` y la prop `shell`. Extrae
  el bloque que `ErrorPage` y `NotFoundPage` repetían carácter por carácter y
  que `AuthPage` volvía a montar a mano. Las tres pasan a colgar de él: **su API
  y su render no cambian**.
- **`Stepper`** (nuevo, `./stepper`): progreso de un flujo con estado
  (completado / actual / pendiente), `ol` real con `aria-current="step"`, estados
  distinguidos por dos señales además del color, horizontal desde `md` y
  compacto por debajo. Con menos de dos pasos no se pinta. `onStepSelect`
  convierte en botón solo los pasos ya completados. No confundir con `Steps`,
  que es documental y no se ha tocado.
- **`OnboardingShell`** (nuevo, `./onboarding-shell`): la plantilla del alta
  sobre superficie pública — chrome a ancho de página y solo la columna del paso
  acotada y centrada, marca cuyo alto sale del mismo token que la cabecera
  pública, conmutadores de idioma y tema en su propio pie, y pie de acciones con
  `primaryAction` / `backAction` / `exitAction`.
- **`Pages/Onboarding`**: las cinco pantallas del alta (perfil, organización,
  logotipo, invitaciones y sala de espera) sobre los componentes reales.

### Los correos

- **`./email`** (nuevo): `EmailLayout` y las primitivas del correo de la suite,
  con logotipo real, tipografía sans (antes usaba la monoespaciada de código en
  toda la prosa), paleta y espaciado por token, y el botón principal a ancho
  completo con su **enlace de respaldo** en texto. **El correo es solo claro**:
  el modo oscuro se retiró a propósito. Las plantillas concretas siguen siendo
  producto y viven en `@slxd/mailer`.
- **`./tokens`** (nuevo): los tokens con los valores ya resueltos, legibles como
  dato desde JS/TS, para consumidores cuyo medio no es un navegador — el correo,
  un canvas, un PDF. Para estilar una página la respuesta sigue siendo el CSS.
- `react-email` entra como **peer opcional**: los componentes de correo no
  cuelgan del barril, solo de su subpath, para que una app que importe un
  `Button` no tenga que instalarla.

### Lo que cambia fuera de lo nuevo

- **`SiteHeader`**: el alto del logotipo lo impone la barra, como su propio
  comentario ya decía y no cumplía (perdía por especificidad contra
  `.logo.logo--xxl`). En escritorio no cambia nada — los dos valores coinciden
  en 85px —, pero **en móvil el logotipo pasa a encoger con la barra**.
- **`Button variant="text"`**: el subrayado deja de ser `text-decoration` y pasa
  a la técnica de `Link` (línea bajo el texto). `text-decoration` no cubre un
  SVG, así que un botón de texto con icono tenía la línea cortada. **Afecta a
  todos los botones de texto.**
- **`Stepper`** no existía, pero el criterio que lo arregló sí toca al resto: su
  carril usaba un token de superficie para pintar una línea de 1px y quedaba
  invisible en las dos superficies. Queda anotado en `chart.grid-color`, que
  arrastra el mismo defecto de procedencia con el valor correcto.

## v30.1.2

`Pagination`: `.pagination__meta` (resumen + selector de tamaño) usaba
`--pagination-controls-gap` (`{spacing.1}`, 4px) — un token pensado para
el gap entre botones de página contiguos, no entre secciones distintas.
Pasa a `--pagination-gap` (`{spacing.3}`, 12px), el mismo que usa
`.pagination` entre sus grupos principales.

## v30.1.1

`Table`: el icono de ordenación en reposo pierde la opacidad reducida
(`--table-sort-icon-inactive-opacity`, `0.35`) — ahora tinta plana con el
color muted del token en los dos estados (reposo y activo), en vez de
fundirse hacia el color de fondo de la superficie. El efecto anterior era
asimétrico entre temas (aclaraba hacia blanco en claro, oscurecía hacia el
navy en oscuro) y confundía visualmente. El token
`sort-icon-inactive-opacity` se retira de `tokens/component/table.json` por
quedar sin uso.

## v30.1.0

`Stack`: nueva prop `align` (`'start'` | `'stretch'`, opt-in, por defecto
`'start'` — no cambia el aspecto de ningún uso existente). Con
`align="stretch"` las piezas ocupan todo el ancho disponible del `Stack`,
en vez de medir solo su contenido. Resuelve el caso de `Stack` como raíz de
una página completa (`<Stack gap="lg"><PageIntro .../><DataTable .../></Stack>`),
donde `align-items: flex-start` encogía el contenido ancho (una tabla con
`width: 100%` en su `<table>` interno) al tamaño de su propio contenido en
vez de ocupar el ancho del `Stack`.

## v30.0.6

`UserMenu` y `OrgSwitcher`: el chevron del trigger giraba a saltos al
abrir/cerrar — le faltaba `transition` en la regla base (solo tenía
`transform: rotate(...)`, sin la propiedad que anima el cambio de ángulo).
Ahora reutiliza la transición general de cada componente
(`--user-menu-transition-duration`/`--user-menu-transition-easing` y
`--org-switcher-transition-duration`/`--org-switcher-transition-easing`),
el mismo patrón que ya usan `Accordion`, `Collapsible` y `SidebarNav`.

## v30.0.5

`AppShell`: `.app-shell__content` (el `<main>` donde cada app pinta sus
páginas) gana el aire que le faltaba — 16px lateral y 32px arriba/abajo,
reutilizando `--section-padding-inline` y `--section-padding-block-lg`
(los mismos tokens que ya usa `Container` en las páginas públicas). Antes
el contenido arrancaba pegado al borde superior-izquierdo en las 8 apps de
la suite. El safe-area en los lados "end" se conserva con `max()`.

## v30.0.4

`Sidebar`: el rail pasa a padding-inline simétrico (16px a ambos lados,
antes 16px/8px) — visualmente descompensado en una columna tan estrecha.
`--sidebar-rail-width` sube de 64 a 72px para mantener el mismo hueco de
icono (40px) y la misma alineación con el `MenuButton` del header.

`Sidebar`: el asa de redimensión ya no se ve como una línea más gruesa y
borrosa en hover/foco/arrastre. La causa no era el grosor del degradado
(ya iba a 1px desde v30.0.3), sino que ese degradado vivía en una capa
propia superpuesta al borde real de `.sidebar`, y las dos líneas de 1px
no coincidían exactamente en el mismo subpíxel. Ahora
`.sidebar:has(.sidebar__resizer:hover/[data-dragging]/:focus-visible)`
tiñe directamente el color del borde único — una sola línea, sin
depender de que dos capas independientes redondeen igual.

## v30.0.3

`Sidebar`: el asa de redimensión ya no engorda al pasar el ratón, enfocar
con teclado o arrastrar — antes pintaba el doble de grosor
(`2 * --sidebar-border-width`) que el borde en reposo; ahora pinta el
mismo grosor, solo cambia de color.

`Sidebar`/`SidebarNav`: los iconos del rail ya no quedan desplazados 8px
respecto al `MenuButton` del header. `--sidebar-rail-width` pasa de 56 a
64px (inset izquierdo de 16px, igual a `--app-header-padding-inline`, +
caja de icono de 40px + 8px de aire a la derecha) con un padding-inline
asimétrico propio del rail (`sidebar.rail-padding-inline-start`), que no
toca el de desplegada (ya alineada por composición de otros tokens).

## v30.0.2

`SidebarNav`: guard de hover contra la fuga del átomo `Link` de vuelta en
`.sidebar-nav__rail-item` (se había perdido al quitar su línea de hover
propia). El ítem activo del rail ya no lleva color de acento ni barra
lateral — en rail (solo iconos) la sección activa se comunica por
`aria-current` y por el `Tooltip`, sin marca visual permanente.

`Sidebar`: `.sidebar__panel` lleva ahora `padding-block` incondicional
(`spacing.6`, el doble del aire de cabecera/pie) — antes ese aire dependía
de que hubiera `logo`, así que sin él (como en el hub) la sidebar quedaba
pegada al borde superior, en rail y desplegada. Nuevo token
`sidebar.panel-padding-block`.

`Tooltip`: en oscuro pasa a fondo claro/texto oscuro (superficie invertida
simétrica a la de claro) en vez del par de `Button primary` — sin acento de
marca. Cambio global, afecta a todos los tooltips de la suite.

`Sidebar`: arreglado el asa de redimensión — arrastrar hacia afuera desde
rail no desplegaba (el estado se quedaba en `'rail'`, que gana por
especificidad CSS al ancho arrastrado). De paso, la zona de agarre del asa
ya no pierde su mitad exterior por el `overflow: hidden` del contenedor.

## v30.0.1

`SidebarNav`: los enlaces de nivel principal (`kind: 'link'`) ya no heredan
el peso de una cabecera de grupo (bold en todos, activos o no) — el activo se
marca solo con negrita, sin cambio de color, igual que `.sidebar-nav__item--active`
y `[data-selected]` de `Select`. Quitado también el hover del átomo `Link`
que se colaba (misma especificidad, distinto orden de carga) en los enlaces
de nivel principal y en los ítems agrupados, con su línea + amarillo de
oscuro (`accent-2`) de enlace de prosa. Excepción de diseño: los ítems
agrupados y el rail ya no pintan ninguna línea al hover (antes sí, por la
regla general de Colores) — decisión explícita para este componente.

Storybook: el toggle de fondo oscuro ya tiñe los canvases embebidos en la
página Docs (antes solo funcionaba en la vista de story aislada — el
contenedor propio del addon de docs pintaba blanco por encima).

## v30.0.0

Rediseño de `ErrorPage` a dos columnas (mismo molde que `AuthPage`): izquierda
título, frase y el enlace de vuelta; derecha la frase de reintento y el
`Button` «Reintentar» en bloque. Pulido de textos en las plantillas de
error/404/auth (frases que terminan en punto, incluso con un enlace dentro;
«Volver al inicio» unificado entre `ErrorPage` y `NotFoundPage`).

### Cambios incompatibles

- **`ErrorPage` cambia su prop `actions` por tres props separadas**:
  `homeAction` (columna izquierda, antes iba junto al `Button` en `actions`),
  `retryDescription` (nueva, frase sobre el botón) y `retryAction` (columna
  derecha). El `main` pasa de `Inline` a `Columns` — cualquier consumidor que
  pasara `actions` tiene que migrar a las tres props nuevas.

## v29.0.0

Revisión de calidad de los 35 componentes sin consumidor directo en la suite
(los usa la app interna de 360 — no se retira ninguno). Informes con fichas
estructurales en `notes/REVISION-huerfanas-lote-{a,b}.md`.

### Cambios incompatibles

- **`OtpInput` pasa a BEM propio** (`otp-input`, `otp-input__cell`) con fichero
  de tokens registrado: desaparecen `[data-otp-input]` y los cuatro `data-*`
  que emitía (nadie los leía dentro del sistema, pero eran DOM público — quien
  estilase por esos selectores tiene que pasarse a las clases BEM).
- **`NotificationButton`**: con contador visible, el nombre accesible sale de
  `countLabel` (traducible, con el número dentro); `label` queda para el estado
  sin notificaciones. Antes `label` ganaba siempre.
- **Tokens retirados**: `number-input.btn-font-size` y
  `number-input.btn-line-height` (los botones +/− son ahora `Icon`
  `minus`/`plus` del catálogo, no glifos de texto).

### Arreglado

- Historias «En superficie oscura» que faltaban en 11 componentes.
- Cero primitivos y literales sueltos en el CSS de los dos lotes (opacidad,
  pesos, spacing, easing, cursor, keyframes de TypingIndicator y MenuButton →
  tokens propios).
- a11y/i18n: `moreLabel` traducible en CalendarPlanner, `role="group"` en la
  leyenda de CalendarRoster, aria-label inerte retirado del planner, reenvío de
  `loadingLabel`/`clearLabel`/`container` en los `Async*Field`.
- `InputPhoneProps` exportado; MDX propio para DatePicker, MultiSelect,
  NumberInput, Switcher, TimeSelect y TimeSelect sin `autodocs`.
- **Las 23 fichas estructurales de la revisión, resueltas** (ola S): el bug de
  `AsyncMultiSelect` no controlado (las pills salen ahora también del estado
  interno, con test); rebote de los `Async*` con limpieza al desmontar y
  descarte de respuestas fuera de orden; `FileUpload` compone `Icon` y
  `ProgressBar` de verdad; `DatePicker` con tokens propios; cabeceras y nombres
  accesibles de los calendarios (`useId`, `<th scope="row">`, celda con fecha);
  `required` en los fields que no lo aceptaban; teclado opcional de `TreeView`;
  emoji de cumpleaños ahora es `birthdayPrefix` del consumidor; escalones
  `opacity.full`/`opacity.muted` e iconos `minus`/`upload` nuevos en el
  sistema. Cobertura jsdom del lote: de 4 a 9+ componentes (287 tests).

## v28.0.0

Saneamiento de la **familia chat** (`MessageBubble`, `UserMessage`,
`AssistantMessage`, `ConversationThread`, `MessageComposer`,
`ConversationList` y `ChatShell`) con un criterio común, documentado en
**Templates › ChatShell → «El criterio de la familia»**: lo que es del hilo se
mide en la familia y no en la pieza; el hilo se lee siempre sobre el fondo del
sistema; y **nada del chat se dice solo con la forma** (el emisor lleva nombre,
una acción es un `Button` del sistema, y lo que existe no se vuelve
inalcanzable al estrechar la pantalla).

### Cambiado

- **Cero primitivos `var(--color-grey-*)` en CSS de componente.** Último uso
  vivo migrado: el borde del control de muestra en `Foundations/SizeScale`
  pasa de `--color-grey-light` a `--color-border-default-on-light` (mismo
  valor resuelto, `#d0d0d0`, y sin par oscuro, así que el computado no cambia
  en ninguna de las dos superficies). Los cuatro primitivos grises siguen
  existiendo y siguen teniendo consumidores: los roles semánticos de
  `tokens/color/semantic.json`, que son ya el único sitio del sistema que los
  referencia.

### Cambios incompatibles

- **`ChatShell` pliega la lista a un cajón por debajo de `--breakpoint-lg`.**
  Antes la columna de conversaciones se convertía en una tira acotada de 12rem
  sobre el hilo; ahora sale del flujo y vive en un `Sheet` que abre un botón en
  la cabecera. Cambia el DOM en pantalla estrecha (el `<aside class="chat-shell__list">`
  ya no se monta; la lista es el contenido de un diálogo) y aparece un envoltorio
  `.chat-shell__header-content` alrededor de lo que el producto pone en la
  cabecera. Quien tenía CSS propio colgando de esas clases tiene que revisarlo.
  El componente pasa a ser **cliente** (`'use client'`): el punto de ruptura se
  decide con `matchMedia`, porque la lista cambia de sitio en el árbol.
- **Tokens retirados**: `chat.list-narrow-max-height` y
  `chat-shell.list-narrow-max-height` (ya no hay tira que acotar);
  `conversation-list.delete-size` y `conversation-list.delete-border-radius`
  (el cuadrado y el radio del aspa los pone ahora el `Button` que la dibuja).
- **El aspa de `ConversationList` es un `Button`** (`ghost`, `sm`, `iconOnly`)
  en vez de un `<button>` con estilos propios. Su nombre accesible viaja ahora
  en `aria-label` y no en un `VisuallyHidden` dentro del botón: el texto sigue
  saliendo de `deleteLabel` y el nombre no cambia, pero deja de existir como
  nodo de texto en el DOM (los tests que lo buscaban por contenido, y no por
  rol y nombre, dejan de encontrarlo).

### Añadido

- **`ChatShell`**: props `listOpen` / `onListOpenChange` para controlar el
  cajón de conversaciones desde el producto (cerrarlo al abrir una
  conversación, que es navegación y el armazón no puede saberlo), y
  `listTriggerLabel` (default castellano) para el nombre accesible del botón
  que lo abre. `listLabel` pasa a nombrar también el cajón. El botón lleva
  `aria-haspopup="dialog"` y `aria-expanded`; el foco, la trampa de foco y el
  cierre con Escape los pone `Sheet`.
- **`conversation-list.delete-hover-bg`** (transparente) y
  **`conversation-list.delete-focus-ring-offset`**: la fila del chat no se
  rellena bajo el puntero, así que el aspa apaga el relleno de marca del ghost
  remapeando los tokens del propio `Button` en su ámbito, sin tocar el CSS de
  `Button`.
- Story **«Cajón en pantalla estrecha»** en `ChatShell` y pruebas de contrato
  del cajón (`ChatShell.test.tsx`): columna en escritorio, cajón accesible por
  debajo del punto de ruptura, control desde el producto y traducción de los
  dos textos.
- Stories **«En superficie oscura»** en `OrgSwitcher`, `UserMenu`,
  `DatePicker`, `DatePickerField`, `TimeField` y `DateTimeField`: los seis
  tenían el juego de tokens oscuros completo (propio o heredado) y ninguna
  story que lo enseñara. Cierra la revisión de cobertura oscura del sistema —
  auditados los 79 ficheros de token y todo el CSS de componente, no queda
  ningún color de superficie clara sin su par (lo que se queda igual en las dos
  superficies lo está por la regla de Foundations → Colores § «La regla de
  derivación»: rellenos autocontenidos, `*-fill` de feedback y estado
  deshabilitado).
- **`progress-bar.inside-label-threshold`**: el 15% que decide si la cifra se
  escribe dentro o fuera del relleno vivía como número suelto en el TSX; ahora
  es un token (`$type: number`) que el componente importa directamente del
  JSON — el CSS no puede leer una custom property desde JS en tiempo de
  render, así que el token se consume por import en vez de por `var()`, pero
  deja de haber un número mágico sin origen declarado.

### Barrido de escala — verificación (2026-09-01)

Revisión de la nota `notes/REVISION-pendientes.md` (icono 18→16, esquina recta,
sombras de `Sidebar`/`AppHeader`, transiciones y tallas de `FileUpload`):
comprobado por lectura y `grep` que los cinco puntos ya estaban resueltos en
tandas anteriores (`icon.size-sm` ya es 16px, sin `4px` de radio ni sombra
cruda sueltos, sin `ms` a mano en transiciones, `FileUpload` ya tiene
`sm`/`md`/`lg` con story «Tallas»); sin cambio de código en esos cinco. Solo el
umbral de `ProgressBar` (arriba) seguía pendiente.

## v27.2.0

### Añadido

- **`SelectField` acepta grupos de opciones**: `options` admite, además de
  `{ value, label }`, entradas `{ label, options }` que se pintan como
  cabeceras de grupo con la semántica del listbox (`SelectGroup`/
  `SelectLabel` del motor, `role="group"` + `aria-labelledby`; las cabeceras
  no son enfocables). La lista plana sigue funcionando igual. Nace para los
  cinco selectores de bricks que perdieron sus cabeceras al migrar a `*Field`
  (tipografías «Theme / System / Custom Fonts» y la voz del TTS).

## v27.1.1

### Arreglado

- `v27.1.0` se publicó sin regenerar `dist/`: el export `./floating-dock`
  existía en `package.json` pero no su fichero compilado. Solo cambia el
  `dist` (y este aviso).

## v27.1.0

### Añadido

- **`FloatingDock`** (`@studiolxd/brand/floating-dock`): el ancla fija que
  faltaba para un asistente tipo widget — lanzador de icono anclado a una
  esquina (`position`), con `aria-label` obligatorio, `aria-expanded`/
  `aria-controls`, contador (`badge`) anunciado por región viva, y panel
  `Dialog` no modal con nombre, Escape, foco que entra al abrir y vuelve al
  lanzador al cerrar; respeta `safe-area-inset` y `prefers-reduced-motion`.
  Controlado o no controlado (`open`/`onOpenChange`). Tokens nuevos
  `floating-dock.*` (offset, z-index, tamaño del panel). Nace para el
  asistente de IA de tender, que hasta ahora usaba un `div` con `style` en
  línea (hueco del DS anotado en el encargo C de la suite, 2026-08-31).

## v27.0.0

Cierra los 22 hallazgos de accesibilidad del DS de la auditoría de suite
2026-08-30/31 (B5-B26). Major: cuatro componentes cambian de DOM/rol de forma
que un consumidor que consulte por rol (tests incluidos) puede notarlo.

### Cambios que rompen (major)

- **`FileUpload`**: la zona de arrastre deja de llevar `role="button"` — el
  `<input type="file">` real recupera el foco, el nombre y el selector nativo
  por teclado; la zona pasa a `aria-hidden` (B12).
- **`MultiSelect`**: el `role="combobox"` se mueve del disparador entero a un
  elemento interno dedicado; las píldoras y sus aspas de quitar salen fuera
  del elemento con ese rol (un combobox no admite controles dentro). Teclado
  completo del patrón combobox: Escape, Inicio/Fin, salto por letra,
  `aria-activedescendant` en vez de mover el foco del DOM (B9).
- **`Pagination`**: los enlaces sin destino pasan a `<button>` (B22).
- **`ThemeSwitcher`**: la opción vigente deja de ser un `<span>` — ahora es un
  control real con `aria-pressed` (B23).
- **`iconOnly` de `Button`/`Toggle`**: pasa de exigir `aria-label` solo por
  JSDoc a exigirlo por tipos (unión discriminada) — un `iconOnly` sin
  `aria-label`/`aria-labelledby` deja de compilar (B26, cierra A15 de raíz en
  las apps consumidoras).

### Arreglado

- Cajón de `Sidebar` en móvil: ahora es `role="dialog"`/`aria-modal` y
  devuelve el foco al cerrar; el asa de redimensión anuncia sus límites
  (`aria-valuemin`/`aria-valuemax`) en vez de un «280 %» sin sentido (B5, B6).
- Fila de `Table`/`DataTable`: `aria-selected` real, nombre accesible y
  `aria-busy` durante la carga (B7, B15).
- `aria-controls` ya no cuelga hacia un listbox cerrado en `MultiSelect`,
  `AsyncSelect`, `AsyncMultiSelect` (B8).
- `Calendar`: cada día se anuncia por su fecha completa, no solo el número
  (B10).
- `Carousel`: el autoplay se puede pausar (botón visible) y anuncia el slide
  activo sin ser intrusivo (B11).
- `Alert` descartable ya no pierde el foco al `<body>` al cerrarse (B13).
- `Button` con `href`+`disabled` deja de navegar/disparar `onClick` (B14).
- `CommandPalette` gana anillo de foco visible — era el único componente del
  sistema sin uno (B16).
- Contraste: rótulos del treemap (B17), relleno del `ProgressBar` (B18),
  borde de `Toggle` en reposo (B19), carril del anillo radial y línea base
  del sparkline (B20), borde de `CodeBlock` en oscuro (B26) — todos a ≥4.5:1
  (texto) o ≥3:1 (gráfico) según corresponda.
- `FormField`/`InputField`: `aria-describedby` solo apunta a una descripción
  que existe de verdad, y ya no pisa el que pase el consumidor (B21).
- `Chart`: la exploración por teclado anuncia el punto de datos enfocado
  mediante región viva (B24).
- Objetivo táctil de `Checkbox`/`Radio` sube a 24×24px mínimo vía
  `--size-target-min`, sin tocar la maqueta visual (B25).
- `TypingIndicator` respeta `prefers-reduced-motion`; la región viva del
  vacío de `CommandPalette` deja de usar `display:none` (nunca se habría
  anunciado); `NumberInput` pasa a `min-block-size` para no recortar con
  zoom de texto grande (B26).
- Los ~10 sitios con texto accesible por defecto en castellano
  (`ProgressBar`, `Toaster`, `Modal`, `Table`, `Pagination`, `Carousel`,
  `Breadcrumb`, `Sidebar`, `TreeView`, `StarRating`) documentan ahora
  explícitamente en su JSDoc que es un placeholder de desarrollo y que una
  app multiidioma debe pasar su propio texto traducido — el default se
  mantiene en castellano a propósito, es la convención ya establecida del
  repo (B26).

## v26.2.0

### Arreglado

- **El foco no entraba en ningún diálogo del sistema** (B1 de la auditoría de
  suite 2026-08-30, crítico). `Modal` pasaba `initialFocus={false}` a
  `Dialog.Popup`, y en Base UI `false` significa «no muevas el foco al abrir»:
  el foco se quedaba en el disparador, fuera del popup y detrás del velo, sin
  que ningún consumidor pudiera corregirlo. Alcanzaba a `Modal`,
  `ConfirmDialog`, `ImageCropDialog` y `CommandPalette`, es decir, a todo
  diálogo de la suite. Se retira la prop: manda el comportamiento por defecto
  de Base UI —el foco entra por el primer elemento focable (el aspa de cerrar),
  vuelve al disparador al cerrar y queda atrapado dentro mientras está
  abierto—, que además contempla la apertura táctil.
- **`ProgressBar` primary en superficie oscura: la cifra de dentro quedaba
  blanca sobre relleno blanco** (B2, contraste 1.00:1). `surface-dark`
  invertía el relleno a `color.text.on-dark` pero no reasignaba el color de la
  cifra interior.
- **`PasswordField`: el botón de ver/ocultar no tenía indicador de foco**
  (B3, 1.00:1): `outline: none` y un color de foco idéntico al de reposo.
  Ahora pinta el anillo de foco del sistema, como el aspa del `Modal`.
- **`InputField` (búsqueda): el aspa de borrar, el mismo caso** (B4, 1.00:1).
  Mismo arreglo.

### Añadido

- **`Modal` acepta `initialFocus`** (se reenvía a `Dialog.Popup` de Base UI):
  el destino del foco al abrir, para el diálogo que tiene uno mejor que el
  primer elemento focable. Sin la prop, manda el comportamiento por defecto.
  `ConfirmDialog` lo usa para abrir el foco en la salida segura («Cancelar»)
  en lugar de moverlo a mano tras el montaje —el gestor de foco de Base UI
  corre después y ganaba él—.
- **Tokens nuevos**: `progress-bar.surface-dark-primary-label-inside-color`;
  `password-field.toggle-focus-ring-{width,offset,color}` y su
  `surface-dark-toggle-focus-ring-color`;
  `input-field.search.clear-focus-ring-{width,offset,color}` y su
  `surface-dark-clear-focus-ring-color`.

### Tests

- Contrato nuevo en `Modal.stories.tsx` (el foco entra al abrir y vuelve al
  disparador al cerrar; `initialFocus` manda sobre el aspa),
  `CommandPalette.stories.tsx` (el foco abre en el buscador),
  `PasswordField.stories.tsx` e `InputField.stories.tsx` (anillo de foco
  distinto del estado sin foco y del fondo del campo) y
  `ProgressBar.stories.tsx` (la cifra de dentro no es del color del relleno en
  superficie oscura).

## v26.1.2

### Arreglado

- **`SelectField`: `value=""` sin ninguna opción de valor `""` mostraba el
  centinela interno (`__empty__`) en crudo** en vez del placeholder —
  detectado en lmsmarketplace, filtro «Visibility» (F1 2026-08-30). El
  centinela solo hace falta cuando la propia lista de opciones usa `""`
  como valor real de un ítem (patrón "Selecciona un tipo" en cabeza de
  lista); si ninguna opción lo usa, ahora se pasa `undefined` a `Select`,
  que ya sabe enseñar el placeholder para ese caso. Test de contrato nuevo
  en `SelectField.stories.tsx`.

## v26.1.1

### Arreglado

- **`Sidebar`: el asa de redimensión perdía `aria-valuenow` con ancho 0**
  (axe: `aria-required-attr`, crítico — detectado en la pasada real de e2e en
  7 apps). El asa es focusable (`tabIndex`), así que WAI-ARIA exige
  `aria-valuenow` siempre; `Math.round(shell.sidebarWidth || 0) || undefined`
  colapsaba un ancho de 0 legítimo (el valor antes de que el `AppShell` lo
  mida, en el primer pintado de servidor) a `undefined`, quitando el
  atributo. Cambiado a `Math.round(shell.sidebarWidth ?? 0)`. Test de
  contrato nuevo en `Sidebar.stories.tsx` que fuerza `sidebarWidth: 0`.

## v26.1.0

### Cambiado

- **En la superficie pública el glifo del aspa también es `lg`**: `site-shell.close-icon-size`
  pasa de `icon.size-md` (24px) a `icon.size-lg` (48px), a juego con la caja `lg` que ya tenía.
  Dentro de `SiteShell` el aspa de `Modal`/`Sheet` queda, pues, en 48px de caja y 48px de glifo;
  fuera sigue en `md` (40 / 24px).

## v26.0.0

### Breaking

- **`ConsentPreferences` se queda sin acciones globales.** Fuera «Aceptar todas» y «Rechazar
  todas» del pie del panel —el pie entero desaparece—: quien abre las preferencias viene a
  decidir categoría por categoría, y para volver atrás se marcan y desmarcan los interruptores
  uno a uno. Las salidas de un clic siguen donde la ePrivacy las pide, en `ConsentBanner`
  («Aceptar todas» y «Rechazar» al mismo peso), que no cambia. Se eliminan las props
  `onAcceptAll`, `onRejectAll`, `acceptAllLabel` y `rejectAllLabel` de `ConsentPreferences`
  (las del banner siguen), y la clase `.consent-preferences__footer`.
- **Se elimina el token `modal.close-hover-color`** (y su derivado `sheet.close-hover-color`,
  más sus pares de `surface-dark`): el aspa ya no cambia de color al pasar el puntero, así que
  el token no tenía a qué apuntar. Quien lo remapeara debe remapear `modal.close-color`.

### Cambiado

- **El aspa de `Modal` y `Sheet` va en tinta desde el reposo.** `modal.close-color` pasa de
  `color.icon.secondary-on-light` a `color.primary` (y de `icon.secondary-on-dark` a
  `text.on-dark` en `surface-dark`). El único estado que se marca sigue siendo el foco, con su
  anillo; el hover no toca ni el fondo ni el color.
- **El aspa de `Modal` y `Sheet` es `md`, no `sm`**: `modal.close-size` pasa de
  `size-component.sm` a `size-component.md` (32 → 40px) y `modal.close-icon-size` de
  `icon.size-sm` a `icon.size-md` (16 → 24px), la talla por defecto de icono-botón. En la
  superficie pública (`SiteShell`) el remapeo a `site-shell-close-*` manda, como hasta ahora.

## v25.32.1

### Corregido

- **`CHANGELOG.md` viaja en el paquete** (`files`): los consumidores por tag git pueden leer el
  contrato de cada release desde `node_modules/@studiolxd/brand/CHANGELOG.md`.

## v25.32.0

### Corregido

- **Test de contrato de `CopyButton` (`Test — acuse doble`)**, roto de origen (no relacionado con
  este cambio): faltaba el mock de `navigator.clipboard` que `CodeBlock.stories.tsx` ya usaba para
  el mismo escenario — sin él, el navegador de test deniega el permiso real de portapapeles,
  `writeText` rechaza y el botón cae en estado `error` en vez de `copied`. Bloqueaba
  `release:check` en verde para este tag; se corrige de paso.

### Cambiado

- **`ConsentPreferences` sin botón «Guardar»: autoguardado por categoría.** Cada
  `Switcher` de categoría persiste al instante — se conmuta y `onChange` se llama
  en el momento con la decisión completa (categorías necesarias incluidas,
  siempre a `true`), sin paso de guardado intermedio. `onSave` pasa a ser un
  **alias deprecado** de `onChange`: sigue funcionando para quien ya lo pasaba,
  pero ahora se llama en cada conmutación (y en «Aceptar todas»/«Rechazar
  todas»), no solo al pulsar un guardado explícito que ya no existe. Se retira
  la prop `saveLabel` (sin botón que rotular).

  Receta para el `public-shell` y cualquier otro consumidor: deja de pasar
  `saveLabel`, y cambia `onSave` por `onChange` (si seguías pasando `onSave`,
  el panel te seguirá llamando igual — pero en cada cambio, no solo al
  guardar).

- **Pie del panel: solo «Aceptar todas»/«Rechazar todas», los dos `Button`
  primary** (sin `outline` ni `text` — el mismo peso, la misma jerarquía que en
  la banda). Pulsarlos aplica la decisión completa y cierra el panel por su
  cuenta; `onAcceptAll`/`onRejectAll` pasan a ser opcionales de verdad —ya no
  hace falta pasarlos para que los botones funcionen—, solo para lógica extra
  del consumidor.
- **`Modal` gana el token `modal.footer-gap`**: separación entre el cuerpo y un
  pie que un consumidor monta dentro de su propio contenido (`Modal` no tiene
  prop `footer`, a diferencia de `Sheet`, que ya lo resolvía solo por el gap de
  su columna flex). `ConsentPreferences` lo usa para separar la lista de
  categorías del pie cuando se abre sobre `Modal` — antes quedaba pegado.

## v25.31.0

### Añadido

- **`Icon`: 17 glifos nuevos** (fase 2 de la unificación de iconos en slxd) — `chevron-right`,
  `chevron-down`, `chevron-up` (derivados de `chevron` por rotación de 90°, misma lógica que
  `close`/`menu`), `info`, `alert-triangle`, `alert-error`, `connection`, `package`, `archive`,
  `database`, `building`, `send`, `external-link`, `gavel`, `inbox`, `library`, `target` y
  `languages` (globo propio — círculo, ecuador y meridiano —, no el par de caracteres de
  lucide/heroicons). Ninguno copiado de una librería ajena: mismo trazo 1px no escalable, retícula
  de 24, esquinas rectas. `spinner` queda fuera a propósito: ya existe como componente `Spinner`.
  Story-test de catálogo (cada `IconName` renderiza un `<svg stroke="currentColor">`) y criterio de
  trazo documentado en Foundations → Iconografía.

### Corregido

- **`ConsentPreferences`: nombre accesible pegado de la categoría necesaria.** «Necesarias» y la
  marca «Siempre activa» (en `VisuallyHidden`) se separaban con un simple espacio inicial, que un
  motor de accesibilidad puede colapsar en el límite entre dos elementos en línea y dejar
  «NecesariasSiempre activa» pegado (detectado en producción por public-shell). Pasa a una coma
  explícita, que no se colapsa nunca.

## v25.30.0

### Cambiado

- **Aspa de cerrar de `Modal`/`Sheet`: sin hover, talla por superficie.** El aspa deja de
  componerse con `Button variant="ghost"` (pintaba relleno en hover, la excepción del sistema) y
  pasa a un botón nativo con tokens propios `modal.close-*`/`sheet.close-*`: en reposo, hover y
  foco solo cambia el color del glifo. La talla remapea de `sm` (32px) a `lg` (48px) bajo
  `SiteShell`/`.site-shell`, por token (`modal.close-size`/`-icon-size`, con seeds en
  `site-shell.json` y `sd.config.mjs`), no por prop del consumidor.
- **`Sheet` gana la prop `container`** (paridad con `Modal`) y **`SiteShell` reenvía su `ref`**:
  el portal de `Dialog` monta por defecto en `document.body`, que no es descendiente de
  `.site-shell` (a diferencia del tema oscuro, que se activa en `<html>` y cascadea a cualquier
  portal sin más). Sin `container` apuntando dentro de `SiteShell`, el remapeo de superficie
  pública —tamaño del aspa incluido— no llegaba nunca al panel.
- **`ConsentPreferences`**: quita el párrafo de descripción bajo el título (retira la prop
  `description` y su texto por defecto) — el panel es título + lista de categorías + pie. Quita la
  línea `Separator` entre categorías (el ritmo lo pone el gap) y la marca de texto visible
  «Siempre activa» de la categoría necesaria, que sigue en el nombre accesible del interruptor vía
  `VisuallyHidden`. Retira los tokens huérfanos `consent.preferences.always-*`. Gana la prop
  `container`, reenviada a `Modal`/`Sheet`, para abrirse dentro de `SiteShell`.
- **`SiteHeader` fija al hacer scroll** (`position: sticky`, no `fixed`): se queda visible al
  bajar sin que las páginas reserven hueco. `SiteShell` da `scroll-margin-top` (el alto de la
  barra, por token) a cualquier ancla del contenido, para que el salto al contenido de `AppRoot` y
  los anclajes de un `TableOfContents` no queden tapados bajo la barra.
- **`SiteNav`**: el panel del menú escala a tantas columnas como grupos en el breakpoint ancho
  (hasta `site-nav.columns-max`, 5) en vez de un `repeat(4, 1fr)` fijo — un quinto grupo ya no cae
  solo a una segunda fila. `md` (2) y `lg` (3) siguen fijos.

## v25.29.1

### Cambiado

- **`ConsentPreferences` se abre en `Modal` por defecto** (`surface` pasa de `'sheet'` a
  `'modal'`); decisión del sistema del 2026-08-29. El `Sheet` lateral sigue disponible con
  `surface="sheet"` para otros usos. Consumidores que ya pasaban `surface="modal"` pueden
  retirar la prop.

## v25.29.0

### Añadido

- **`UserMessage`**: prop `author?: string` opcional — nombre visible y discreto sobre el globo,
  coherente con el nombre del modelo de `AssistantMessage` pero sin su énfasis. Tokens propios
  `user-message.author-*` (con par oscuro), story «Con autor» y test de contrato.

### Cambiado

- **`message-bubble.max-width`** y **`chat-shell.list-narrow-max-height`** dejan de ser valores
  sueltos: pasan al token compartido `chat.*` nuevo (`tokens/component/chat.json`).
  `list-narrow-max-height` se deriva por fórmula de `size-component.lg`
  (`calc(4 * {size-component.lg})` = 12rem exacto); `bubble-max-width` documenta su ratio (75%)
  como decisión de producto, no como longitud de la escala. Sin cambio visual.
- **`MessageBubble`/`ChatShell`**: documentado en MDX que `tail-fill` es el fondo del sistema y
  que un hilo se monta siempre sobre él, nunca sobre `Card` ni otra superficie propia — regla del
  producto, no técnica. Story `EnElShell` en `MessageBubble` como referencia.

### Corregido

- **Marca de tiempo inválida** en `UserMessage`/`AssistantMessage`: seguía sin pintarse (mejor que
  «Invalid Date»), pero ahora avisa por `console.warn` en desarrollo (`NODE_ENV !== 'production'`)
  con el valor recibido; en producción sigue mudo.

## v25.28.1

### Corregido

- **Fuera el hook `prepack`** que ejecutaba `release:check`: pnpm lo dispara al instalar el paquete
  como dependencia git en cada consumidor, y ahí corre lint, tests y story-tests de Storybook —
  fallaba la instalación de toda la suite. `release:check` sigue existiendo como puerta **manual**
  antes de taggear (documentada en CLAUDE.md); ningún hook de ciclo de vida de npm/pnpm lo invoca.

## v25.28.0

### Cambiado

- **Tokens de gris a roles semánticos**: los 64 usos directos de `{color.grey-*}` en
  `tokens/component/**`, `tokens/molecule/**` y `tokens/organism/**` pasan a roles semánticos
  (`color.text.muted-*`, `color.surface.secondary-*`/`inverse-*` reutilizados; nuevos
  `color.disabled.{bg,text,border}-on-light|on-dark`, `color.border.default-on-light`,
  `color.icon.secondary-on-light|on-dark` y `color.surface.highlight-on-dark`). Sin cambio
  visual: cada rol apunta al mismo primitivo que ya se usaba.
- **`AppHeader`**: se verificó y documentó que su `box-shadow` (borde simulado) es deliberado,
  no una sombra sin tokenizar — evita que el borde real sume altura al compuesto que consumen
  `AppShell`/`Sidebar`. Sin cambio de código.
- **Escala**: verificado que `icon.size-sm` (16px), las transiciones sin `ms` a mano y los
  radios rectos (`border-radius.default` = 0) ya estaban cerrados en tandas anteriores.
- **Puerta de calidad**: nuevo script `pnpm release:check` (lint + tsc + test + test:stories +
  build:all) y hook `prepack`. No se taggea sin él en verde (documentado en `CLAUDE.md`).

## v25.27.1

### Corregido

- **`@studiolxd/brand/fonts.css`**: alias con extensión de la subruta `./fonts` (como ya tenían
  `brand.css` y `tokens.css`). Sin él, TypeScript 6 con resolución estricta marca TS2882 en el
  `import "@studiolxd/brand/fonts"` de efecto secundario y obligaba a una declaración de módulo
  por app. Consumidores: importar `@studiolxd/brand/fonts.css`.

## v25.27.0

### Cambiado

- **`ConsentBanner`**: el texto de la banda va al cuerpo de texto de la superficie
  (`consent.banner.description-font-size` → `{text.font-size}`), no al peldaño pequeño; el
  `Paragraph` interno deja de ir a `size="small"`. Decisión del usuario (2026-08-28). La marca
  «siempre activa» del panel de preferencias sigue en pequeño.

## v25.26.0

### Añadido

- **`@studiolxd/brand/fonts`**: subruta nueva con los ficheros de fuente del sistema
  (Google Sans Flex variable 1–1000, Google Sans Code 300–800 normal/itálica, Libre Bodoni
  400–700 normal/itálica; subconjuntos latin + latin-ext, licencia OFL junto a cada familia en
  `dist/assets/fonts/<familia>/LICENSE.txt`). Es una hoja `@font-face` (`font-display: swap`,
  `unicode-range` por subconjunto) que resuelve exactamente los nombres de familia de
  `--font-family-sans/-mono/-serif`. **412 KB en total** (bajo el límite de ~600 KB que se
  había fijado para esta pieza). No se incluye en `brand.css`: el consumidor la importa una
  vez, en el layout raíz (`import '@studiolxd/brand/fonts'`).

### Cambiado

- **Las fuentes las trae el DS, no el producto** (`Typography.mdx` § «Las fuentes las trae el
  DS»). Antes cada consumidor cargaba Google Sans Flex/Code/Libre Bodoni por su cuenta
  (`next/font/google`, un `<link>` a Google Fonts, o nada — y entonces el sistema caía a
  `system-ui`, visiblemente más fino). Ahora es una única fuente de verdad.

  **Migración:**
  - Si el producto usaba `next/font/google`: retirar esa carga (el objeto de fuente y su
    `className`/variable CSS) y añadir `import '@studiolxd/brand/fonts'` en el layout raíz
    (`app/layout.tsx`, o `app/[locale]/layout.tsx` en apps con i18n). `next/font` ya no hace
    falta y, si se deja, duplica la descarga con un segundo `@font-face` del mismo nombre.
  - Si el producto usaba un `<link>` a `fonts.googleapis.com`: retirar el `<link>` (y los
    `<link rel="preconnect">` a `fonts.googleapis.com`/`fonts.gstatic.com` si no sirven a
    ningún otro fin) y añadir el mismo `import '@studiolxd/brand/fonts'`.
  - Los nombres de familia y los fallbacks de los tokens no cambian: ningún CSS que consuma
    `--font-family-sans/-mono/-serif` necesita tocarse.
  - Storybook sigue el mismo cambio: ya no enlaza a Google Fonts, importa `fonts.css` como
    cualquier consumidor.

## v25.25.0

### Cambiado

- **`ConsentBanner`/`ConsentPreferences`**: «Rechazar todo» pasa de `outline` a la variante
  primaria por defecto (igual peso visual que «Aceptar todo», sin dar prioridad implícita a
  aceptar); «Preferencias» (banda) y «Aceptar todo» (panel de preferencias) pasan de `text` a
  `outline`. Sin cambios de API — solo el `variant` interno de los botones.
- **`Hero`**: los botones de `actions` reciben la talla `lg` por contexto (el mismo mecanismo
  de reparto que usa `Form`, `FormSizeContext`), sin que el consumidor tenga que pasar `size`
  en cada `Button`. Si un `Button` dentro de `actions` ya trae `size` explícito, gana el suyo.
  Como renderiza un `Context.Provider`, `Hero` pasa a ser componente de cliente (mismo caso que
  `Form`): sin este marcado, un Server Component que lo monta (p. ej. la portada de una app Next)
  rompe en runtime (`createContext is not a function` en el bundle RSC).

## v25.24.0

### Cambiado

- **Motor de conducta: `@base-ui-components/react` (rc.0, deprecado) → `@base-ui/react`
  1.7.0**, el paquete estable al que sus propios autores renombraron el proyecto. Barrido de
  todos los imports (componentes, stories, tests, `entry-points.mjs`, `vite.lib.config.ts`) y
  de `package.json`. Sin cambios en la API pública de brand ni en los `data-*` que engancha el
  CSS BEM (`[data-highlighted]`, `[data-open]`, `[data-popup-open]`…): se comprobaron uno a uno
  contra el CHANGELOG oficial del paquete (rc.1 → 1.7.0) y no hay renombres que afecten a los
  componentes que usa este DS. Al instalar el paquete en un consumidor (`pnpm install`), deja
  de emitir el aviso de dependencia deprecada.
- **`Accordion`**: el trigger de un ítem deshabilitado se queda enfocable con teclado (antes
  perdía el foco, como cualquier `<button disabled>`) — comportamiento que trae la propia
  librería al alinear sus atajos de teclado con el patrón APG. Sigue anunciándose como
  deshabilitado (`aria-disabled`, `[data-disabled]` en CSS) y sin abrirse al activarlo; solo
  cambia que ya no desaparece del recorrido por tabulador.

### Corregido

- Los dos errores preexistentes de `tsc --noEmit` (`Menu.stories.tsx` sin `args` en una story,
  cast incorrecto en `src/tokens/typography.ts`): el build de tipos pasa limpio por primera vez.

## v25.23.0

Las secciones de página poseen su propio ritmo vertical: se montan **a sangre**, con su aire
arriba y abajo por tokens propios y un `Container` interior para el aire lateral. La misma
sección se ve igual en cualquier web, sin depender del envoltorio en el que se cuelgue.

### Añadido

- **Tokens de aire vertical por sección**: `hero.space-block-start` / `-end`,
  `highlight.space-block-start` / `-end` y `site-footer.space-block-start` / `-end`
  (`section.padding-block.2xl`, 64px), con su peldaño de móvil `-compact`
  (`section.padding-block.xl`, 48px, por debajo de `md`). Salen de la escala de espaciado del
  sistema, así que el ritmo de una sección se cambia por token, sin tocar CSS.
- **`Hero` acepta `width`** (`ContainerWidth`, por defecto `xl`): el ancho de su `Container`
  interior, el mismo de la barra del `SiteHeader`.
- **Stories nuevas**: `Sections/Hero → A sangre` (la misma portada suelta y dentro de una banda
  a sangre, con la misma geometría), `Sections/SiteShell → Portada de referencia` (cabecera,
  portada, dos bandas y pie apilados sin envoltorio) y `Atoms/Container → Sección a sangre`.
  Con sus story-tests: la geometría del `Hero` no depende del envoltorio, las secciones apiladas
  caen en la misma columna y anidar un `Container` dentro de una sección a sangre no duplica el
  aire lateral.
- **Foundations → `Container`** escribe la regla de maqueta: las secciones traen su aire, la
  página solo las apila y `Container space` es para contenido de artículo.

### Cambiado

- **Las secciones ya no son un `Container`: lo llevan dentro** (**cambio visual en las
  portadas**). `Hero`, `Highlight`, `SiteFooter`, `LegalFooter` y `SiteHeader` renderizaban un
  `Container` como raíz y tomaban su aire vertical de la prop `space`; ahora la raíz es el
  elemento semántico (`section`, `footer`, `header`) a sangre, con su `padding-block` por
  tokens propios, y el `Container` —con su ancho y su aire lateral— va dentro. El aire vertical
  en escritorio es el mismo de antes; en móvil baja un peldaño.
- **Receta de migración** para las portadas: **quitar el `Container` envolvente**. Donde hoy hay

  ```tsx
  <Container space="xl">
    <Hero … />
  </Container>
  ```

  va la sección suelta, colgada del `main`:

  ```tsx
  <main id="main-content">
    <Hero … />
    <Highlight … />
  </main>
  ```

  Envolverlas suma el aire de la banda al de la sección y las deja más altas que las de otra
  web. Un `Container width="full" flush space="none"` alrededor no cambia nada (es el caso de
  studiolxd.com), pero sobra. Para el contenido de artículo —una página legal, un formulario,
  prosa del producto— `Container space` sigue siendo lo correcto.
- **El fondo oscuro de `Highlight`, `SiteFooter` y `LegalFooter`** lo pinta ahora la clase de
  lienzo del sistema (`.surface-dark`) sobre la propia sección, en vez de `Container
  surface="dark"`. Mismo par fondo/color; quien seleccionara `.site-footer.container` en CSS
  propio debe apuntar a `.site-footer`.
- **`LegalFooter`** pasa su `--legal-footer-padding-block` del interior a la raíz de la sección:
  mismo aire, ahora a sangre. El token no cambia de nombre.

## v25.22.0

El resaltado de las listas de opciones desplegables vuelve a la inversión de marca que tenía
antes de v25.8.0: el gris de superficie secundaria que estrenó v25.17.0 no era la señal
correcta.

### Cambiado

- **El ítem resaltado de los desplegables invierte la marca** (**cambio visual**). La opción
  bajo el puntero o resaltada por el teclado (`[data-highlighted]`) pasa de rellenarse con la
  superficie secundaria gris a invertir la marca: sobre superficie clara, prusia
  (`color.primary`) con tinta clara (`color.text.on-dark`); sobre superficie oscura, al revés
  —blanco con tinta prusia— por la regla de derivación. El **ítem destructivo** resaltado
  invierte a su propio rojo sólido (`color.destructive-fill` con `color.destructive-fill-text`),
  igual en las dos superficies. Alcanza a `Menu` (y con él `ContextMenu`, `DropdownField`,
  `LanguageSwitcher`, `ThemeSwitcher` y `TimeSelect`), `UserMenu`, `OrgSwitcher`, los tiles de
  `AppLauncher`, `CommandPalette`, `Select`, `MultiSelect`, `AsyncSelect`, `AsyncMultiSelect`,
  la lista de países de `InputPhone` y los resultados de `DocsSearch`.
- **Los nombres de token no cambian**: siguen siendo `*-highlighted-bg` (y `tile-`/`result-`/
  `country-item-` donde corresponde), solo cambia su valor. Se añade en todos el par
  `*-highlighted-color` —y sus `surface-dark-*`— para que la tinta invierta con el relleno;
  iconos, glifos y atajos dentro del ítem la heredan por `currentColor`, sin tokens propios.
  `Menu`, `UserMenu` y `OrgSwitcher` estrenan además `item-destructive-highlighted-bg` /
  `-color`. Quien hubiera sobreescrito un `*-highlighted-bg` para volver al gris lo sigue
  pudiendo hacer, pero debe fijar también el `*-highlighted-color`.
- **Foundations → Colores** reescribe la tercera excepción («las listas de opciones
  desplegables se rellenan») para decir que el relleno es la inversión de marca, y deja de
  atribuir ese papel a `surface.secondary-*`, que vuelve a ser solo una superficie y no marca
  ningún estado.

## v25.21.0

La marca manda más en la cabecera pública: el logotipo estrena una talla mayor y la
cabecera del sitio la usa por defecto.

### Añadido

- **`Logo` › talla `xxl`.** Un peldaño por encima de `xl`: 85px, la talla `xl` con el mismo
  salto que lleva de `lg` a `xl` (4/3), de modo que la escala de marca es regular. Sale del
  token nuevo `logo.height-xxl`, derivado de `logo.height-xl`, con su clase `.logo--xxl`.
  La story de tallas las enseña las cinco.

### Cambiado

- **`SiteHeader` › la marca va a `xxl` por defecto** (antes `xl`): **cambio visual** en las
  páginas públicas. La barra crece con ella —101px en vez de 80— porque su alto se deriva
  del token del logotipo (`site-header.content-height` → `logo.height-xxl`), sin ninguna
  cifra propia. Los peldaños de móvil no cambian: por debajo de `md` la barra sigue bajando
  a 64px (marca a 48) y por debajo de `sm` a 56px (marca a 40), así que la marca sigue
  cabiendo junto al botón de menú. Quien quiera la cabecera de antes pasa `logoSize="xl"`.

## v25.20.0

Ocho huecos del bloque B, cerrados: siete componentes nuevos y tres ampliaciones.

### Añadido

- **`StarRating`** (átomo, `./star-rating`) — valoración en estrellas, de lectura y de
  entrada. En lectura es **una sola imagen** cuyo nombre accesible lleva el valor exacto
  («4,5 de 5 estrellas»), no cinco iconos que contar, y admite **media estrella**. En
  entrada (`readOnly={false}`) es un grupo de radios nativos, en pasos enteros: la media
  describe una media calculada, no algo que se elija. Con él llega el **glifo `star`** al
  catálogo de `Icon`, con la geometría del set (retícula de 24, contorno de trazo 1).
- **`Toggle`** (átomo, `./toggle`) sobre Base UI Toggle — botón de dos estados. Es un
  valor que se conmuta, no una acción: queda relleno mientras está pulsado, y el hover
  marca el borde sin rellenar, para que «señalado» y «elegido» no se lean igual.
- **`ToggleGroup`** (átomo, `./toggle-group`) sobre Base UI Toggle Group — conmutación
  **exclusiva** por defecto o `multiple`, una sola parada de tabulación y recorrido con
  flechas. Reparte la talla a sus botones. El valor viaja siempre como lista, también en
  exclusivo. Sustituye al apaño de `Fieldset` + botones con `aria-pressed` a mano.
- **`Collapsible`** (átomo, `./collapsible`) sobre Base UI Collapsible — una sección que
  se pliega, con `Collapsible` / `CollapsibleTrigger` / `CollapsibleContent`. Para varias
  coordinadas sigue estando `Accordion`.
- **`ScrollArea`** (átomo, `./scroll-area`) sobre Base UI Scroll Area — recuadro con
  desplazamiento propio y barra del sistema. `label` da nombre a la región, que es lo que
  evita el fallo de «región desplazable sin nombre»; el alto lo pone quien lo usa.
- **`Slider`** (átomo, `./slider`) sobre Base UI Slider — un valor o un rango. Devuelve
  **la misma forma que recibe** (número o lista), separa `onValueChange` (mientras se
  arrastra) de `onValueCommitted` (al soltar) y nombra cada pulgar.
- **`TreeView`** (molécula, `./tree-view`) — árbol con sangría, ramas que se abren, nodo
  elegido y el patrón WAI-ARIA de *tree view* completo: `role="tree"` con niveles, una
  sola parada de tabulación y recorrido con flechas, `Inicio`/`Fin` e `Intro`. Base UI no
  trae árbol: es la excepción declarada al motor único. Selección por tinta y peso, hover
  por línea; ninguna fila se rellena.
- **`AnnotationThread`** (organismo, `./annotation-thread`) — hilo de anotaciones con
  **estado** (abierta/resuelta), autor, fecha en `<time datetime>` legible por máquina,
  acciones por anotación y por hilo, y ranura de respuesta. No es `ConversationThread`
  (usuario ↔ asistente): recoge el patrón que localizia y bricks montaban a mano con
  `Card` + `Tag`.
- **`Text`** (átomo, `./text`) — fragmento **en línea** con `lang` (y `dir`) para texto en
  otro idioma, y `tone` para énfasis con intención (`destructive`, `success`, `muted`).
  El tono es tinta de feedback sobre la superficie, **nunca un relleno**; `as` elige
  significado (`span` / `em` / `strong`), no pinta.
- **`Chart` › cinco formas nuevas**: `funnel`, `treemap`, `radial-bar`, `scatter` y
  `radar`. Las tres primeras comparten el contrato de porción de `pie`/`donut` —categoría
  por fila, primera serie como valor— y su tabla equivalente con valor y porcentaje;
  `scatter` estrena **eje X numérico** y `radar` su telaraña. Todo sigue siendo SVG a
  pelo, sin librería.
- **`Chart` › color por dato** (`colors`): paleta por posición en colores literales, para
  cuando el color **es dato** —el que eligió el autor de un contenido desde la paleta de
  su tema— y no diseño. Prioridad: `series[i].color` › `colors[i]` › ranura de token. La
  interfaz del sistema sigue usando las ranuras.
- **`SidebarNav` › entradas vacías** (`empty` en una entrada, `emptyLabel` en el
  componente): la sección que existe pero aún no lleva a ninguna parte se enseña con su
  marca «sin docs» en vez de esconderse. No se pinta como enlace —`<span>` con
  `aria-disabled`, sin `href`— y la razón va en texto, no solo en el color.

### Notas

- Tokens nuevos por Style Dictionary para cada componente, con sus pares `surface-dark-*`
  por la regla de derivación. `Chart` suma `funnel-gap`, `treemap-gap`, `radial-bar-gap`,
  `radial-track-color`, `dot-size`, `radar-fill-opacity` y `tile-label-color`.
- La tabla de props de texto de **Foundations → Internacionalización** recoge los
  componentes nuevos.
- **Decisión pendiente, fuera de alcance**: los editores de tema de bricks-editor (muestra
  y editor de color, degradado y tipografía, editor de espaciado, previsualización por
  opción en `Select`, zona de subida en línea del canvas) siguen sin decidirse como DS o
  producto. No entran aquí.

## v25.18.0

El isotipo de la marca sale del logotipo y se publica como activo: las apps ya pueden
generar su favicon, sus iconos y sus imágenes OG sin redibujar nada.

### Añadido

- **`Logomark` › el isotipo como átomo.** Las tres letras del logotipo —la parte gráfica,
  sin la firma— en un `viewBox` cuadrado, con las mismas tallas de componente que `Logo`
  (`sm`, `md`, `lg`) más `xl` (64px, la talla de marca). Es decorativo por defecto
  (`aria-hidden`) y con `title` pasa a `role="img"` con ese nombre. El trazado sale tal
  cual de `Logo`, no es un dibujo nuevo: un test lo comprueba contra el logotipo.
- **Subruta `@studiolxd/brand/logomark`.** Publica además el isotipo como datos:
  `logomarkSvg` y `logomarkSafeSvg` (documentos SVG completos), `logomarkPaths` y
  `logomarkViewBox`/`logomarkSafeViewBox` para pintarlo en `next/og` o Satori sin montar
  el componente. La tinta es `currentColor` y todo son trazados: ni `<image>` ni base64.
- **`src/assets/logomark.svg` y `logomark-safe.svg`, servidos desde `@studiolxd/brand/assets/*`.**
  El primero, el isotipo a sangre; el segundo con **área de seguridad del 10 %** por lado
  —el isotipo ocupa el 80 % central— para máscaras circulares: `apple-touch-icon`, iconos
  `maskable`, avatares redondos. El build los copia a `dist/assets/`.
- **Tokens `logomark.*`.** Las cuatro tallas (cuadradas, heredadas de las tallas de control
  y de la escala de iconos) y el color del trazado, con su par oscuro por derivación.

### Documentación

- **`Logo` › cuándo cada uno.** El MDX del logotipo abre con la regla: si cabe el logotipo,
  va el logotipo; el isotipo entra cuando el hueco es cuadrado o tan pequeño que la firma
  no se leería. El MDX de `Logomark` documenta el uso fuera de React (favicon, PWA,
  `next/og`) con ejemplo.

## v25.19.0

El buscador del menú del sitio tiene su propia talla, `xl`.

### Añadido

- **`SearchForm` acepta `size="xl"`.** Una talla propia de este componente —`InputField` y
  `Button` conservan `sm|md|lg`— para el buscador del panel del menú de `SiteHeader`, que
  ahí no es un campo más de un formulario sino una de las dos formas de recorrer el sitio.
  Sube a la vez el alto del campo (64px), el cuerpo de letra (28px, la escala de **títulos
  pequeños**, no la del cuerpo de texto), el aire horizontal y el glifo de la flecha (32px).
- **Tokens `search-form.xl.*`**: `height`, `padding-inline`, `font-size`, `slot-size` e
  `icon-size`, derivados de las escalas de espaciado (`spacing.6`, `spacing.8`) y tipografía
  (`font-size.5`, `font-size.6`) del sistema, sin un solo valor duro.

### Cambiado

- **El buscador del panel del menú de `SiteHeader` pasa de `lg` a `xl`** en la story «En el
  menú del sitio» y en la documentación.

### Notas

- `xl` **no viaja por el contexto de `Form`**: `useFormSize` sigue conociendo solo las tres
  tallas de formulario, así que un `Form size="lg"` no vuelve `xl` a un buscador que tenga
  dentro. Se pide a mano.
- La composición no duplica el campo: `SearchForm` monta `InputField` en `lg` y, bajo
  `.search-form--xl`, remapea las tres custom properties de talla que `Input` ya expone
  (`--input-height`, `--input-padding-inline`, `--input-font-size`). Borde, foco, estado
  deshabilitado y autorrelleno siguen siendo los del campo del sistema.

## v25.17.0

Las listas de opciones desplegables recuperan el fondo en el resaltado.

### Cambiado

- **El resaltado de las listas de opciones desplegables se rellena.** El ítem bajo el
  puntero o resaltado por el teclado (`[data-highlighted]`) vuelve a pintar un fondo suave
  —la superficie secundaria del sistema (`color.surface.secondary-on-light`, y su par
  `-on-dark` por la regla de derivación)— en vez del anillo, y sin línea de hover. Es una
  excepción **declarada y cerrada** a «Estados: nada se rellena», por dos razones que solo
  se juntan aquí: la densidad de un desplegable (las filas se tocan, un anillo se lee como
  borde de la lista y una línea como separador) y el foco virtual
  (`aria-activedescendant`), que recorre la lista deprisa sin mover el foco real. El valor
  ya elegido conserva su marca (peso o casilla).
  - Alcance: `Menu` —y con él `ContextMenu`, `DropdownField`, `LanguageSwitcher` y
    `ThemeSwitcher` cuando despliegan—, `UserMenu`, `OrgSwitcher`, `AppLauncher`,
    `CommandPalette`, `Select` (y `TimeSelect`), `MultiSelect`, `AsyncSelect`,
    `AsyncMultiSelect`, la lista de países de `InputPhone` y la de resultados de
    `DocsSearch`.
  - Fuera de él nada cambia: `Table`, `Tabs`, `Pagination`, `SidebarNav`, `Calendar`,
    `CalendarPlanner`, `ConversationList`, `NumberInput` y `Link` siguen con línea o barra.
- **Tokens nuevos `*-highlighted-bg`** (con su par `surface-dark-*`): `menu.item-*`,
  `select.item-*`, `multi-select.item-*`, `async-select.item-*`,
  `async-multi-select.item-*`, `user-menu.item-*`, `org-switcher.item-*`,
  `command-palette.item-*`, `docs-search.result-*`, `input-phone.country-item-*` y
  `app-launcher.tile-*`. Los de cada componente cuelgan del `Menu` o del `Select`, así que
  el sistema se retoca desde un único sitio.
- **Retirados los tokens que dibujaban el resaltado con anillo o línea** en esos
  componentes: `*-item-focus-ring-*` (y `country-item-`/`result-focus-ring-*`) y
  `docs-search.result-hover-line-*`. El anillo de foco de los **controles** (`focus-ring-*`
  del disparador, del campo) no se toca, ni la línea de hover del disparador del
  `AppLauncher`, que no es una opción de la lista.
- **Foundations › Colores** documenta la excepción como la tercera del sistema, con su
  porqué, su ámbito exacto y lo que se queda fuera.

## v25.15.0

El panel del menú de `SiteHeader` respira por los lados, y el buscador del sitio
deja de ser un campo con un botón pegado.

### Corregido

- **`SiteHeader` › el panel del menú cae en la columna de la barra.** El contenido del
  panel llegaba pegado a los bordes de la pantalla: el panel es `position: fixed`, sale
  del flujo de la banda, y aun así le alcanzaba la regla de `Container` que anula el aire
  lateral de una banda anidada (`.container:not(.container--flush) .container`). Ahora lo
  recupera con el mismo token, zona segura del sistema incluida — mismo ancho, mismo aire
  y mismo arranque que la barra, en todas las tallas y en las dos superficies. Story-test
  nuevo: el panel monta su contenido en el mismo `Container` que la barra.

### Cambiado

- **`SearchForm` › la flecha va dentro del campo.** Era un `Button` `outline` en caja
  aparte, pegado al campo y solapando un borde para simular una costura. Ahora es un
  adorno clicable **dentro del borde del campo**, alineado al final, como la lupa y el
  aspa de `InputField`: sin caja, sin borde y **sin fondo en hover** —solo la tinta—, con
  el foco marcado por un anillo recto por dentro del campo. Sigue siendo un botón
  accesible: se tabula, se nombra con `submitLabel` y `Enter` desde el campo envía.
- **`SearchForm` › la talla escala también el glifo.** `sm`/`md`/`lg` mueven a la vez el
  alto del campo, el cuerpo de letra y el tamaño de la flecha; `lg` es un buscador mayor
  de verdad, no el mismo estirado. En el panel del menú de `SiteHeader` va siempre a `lg`.
- **`SiteHeader` › el ritmo vertical del panel, de un solo token.** `panel-gap` separa por
  igual el índice, el buscador y los ajustes; `settings-margin-block-start` pasa a colgar
  de él (mismo valor, sin cambio visual).

### Añadido

- **Tokens `site-header.panel-padding-inline`** (el aire lateral del panel, `=
  container.padding-inline`) y **`site-header.panel-gap`** (el ritmo vertical entre las
  secciones del panel).
- **Tokens `search-form.submit.*`** — hueco, glifo, tinta, tinta en hover, tinta
  deshabilitada y anillo de foco de la flecha, por talla, con sus pares oscuros.
- **Story `SiteHeader` › «En el menú del sitio»** — la cabecera con el panel abierto, el
  índice, el buscador a `lg` y los ajustes.

### Retirado

- **Tokens `search-form.seam-width`, `search-form.submit-bg`,
  `search-form.submit-disabled-bg`** y sus pares oscuros — describían la costura y el
  fondo de la caja del botón, que ya no existe. La flecha no tiene fondo propio. Único
  motivo por el que esta versión podría considerarse mayor: quien sobreescribiera esos
  tokens deja de tener efecto, sin que nada más se rompa.

## v25.14.0

Los quince bloqueantes de producto que destaparon las fases 2–4 de la suite y de
`studiolxd/web` (`notes/HUECOS-brand-2026-08-28.md`, bloque A).

### Añadido

- **`Figure`** (átomo) — imagen con pie: el `<figure>`/`<figcaption>` del sistema, con
  la proporción de la caja (`ratio`: `auto`, `1:1`, `4:3`, `3:2`, `16:9`, `21:9`), el
  encaje (`fit`) y el cuerpo del pie por tokens. `src`/`alt` pintan un `<img>` normal;
  `render` pone la imagen de la aplicación (el `next/image` de una web Next.js) y la
  figura le presta su clase. Tokens `figure.*` con par oscuro para el pie y el fondo
  de la caja.
- **`Code`** (átomo) — fragmento de código **en línea**, el hermano de `CodeBlock`. Sus
  tokens `code.*` cuelgan de los de `CodeBlock`, y el aire vertical es cero para no
  romper el interlineado del párrafo. Los tokens `prose.code-*` cuelgan ahora de este
  átomo en vez de directamente de `CodeBlock`.
- **`RadioGroup`** (átomo) — la raíz de un grupo de opciones excluyentes:
  `value`/`defaultValue`/`onValueChange`, `name` compartido (generado si no se pasa),
  `disabled`, `size`, `error` y `orientation`. `Radio` y `RadioField` lo leen, así que
  dentro del grupo no hay que repetir `name`, `checked`, `size` ni `disabled`; lo que se
  pasa a mano manda sobre el grupo. El rótulo lo sigue poniendo un `Fieldset` o un
  `aria-label`. Tokens `radio-group.*`.
- **`Card` › `external`** — misma prop y mismo contrato que en `Button` y `Link`: con
  `href`, `target="_blank"` y `rel="noopener noreferrer"`.
- **`Card` › `children` en modo enlace** y **`description` como `ReactNode`** — la
  descripción admite marcado (varios párrafos, una etiqueta) sin aplanarla a texto, y la
  link-card acepta hijos entre la descripción y la flecha. Nada interactivo: el bloque
  entero sigue siendo un enlace.
- **Passthrough de `role`/`aria-*`/`id`/`data-*`** en `Stack`, `Inline`, `Columns`,
  `TabsList` y `TableOfContents`. Una pila puede ser el grupo con nombre accesible y una
  fila, una barra de herramientas, sin envolverlas en un elemento nativo aparte; `TabsList`
  gana el `aria-label` que necesita cuando hay más de un juego de pestañas en la página.
  `className` sigue siendo prop propia y se concatena tras las clases del sistema.
- **`PrevNextNav` › `prevTitle`/`nextTitle`** — los controles enseñan el título del
  destino y `prevLabel`/`nextLabel` pasan a ser el rótulo visible que lo encabeza
  («Anterior · Instalación»). `label` (el rótulo central de periodo) es ahora opcional.
  Tokens `prev-next-nav.eyebrow-*`, `title-*` y `text-gap`, con par oscuro.
- **`Steps` compuesto por `children`** — un `Step` por paso, con el cuerpo que haga falta
  dentro (varios párrafos, una lista, un bloque de código): la forma para MDX. El número
  lo sigue poniendo la lista. `items` es ahora opcional.
- **`ConversationList` › `isLoading`, `loadingCount`, `error`, `errorTitle`,
  `emptyMessage`** — los tres estados los pinta la lista con las piezas del sistema
  (`Skeleton`, `Alert`, `EmptyState`), con prioridad error → carga → vacía → lista, y
  `aria-busy` en el `<nav>` mientras carga. `isLoading` y `emptyMessage` se llaman igual
  que en `DataTable`.
- **`CheckboxField` › `labelHidden`** — como en `InputField`, `TextareaField`,
  `SelectField` y `FileUploadField`.
- **`Modal` y `Sheet` reenvían `{...rest}` al popup** (`id`, `data-*`, `aria-*` y los
  handlers de evento): es lo que permite montar la barrera de eventos cuando el diálogo
  se abre desde dentro de una tarjeta clicable, sin `div`s de producto alrededor. En
  `Modal`, `className` **no** se reenvía a propósito.
- **`Popover` › `onPointerDownOutside`, `onFocusOutside`, `onEscapeKeyDown`** — los tres
  motivos de cierre automático, cada uno con el detalle de Base UI (evento nativo, motivo
  y `cancel()`). Es el escape para el clic que cae en un portal del producto que el motor
  no reconoce como parte del panel.
- **`Accordion` › `numbered` y `formatIndex`** — ranura de índice (`01`, `02`…) delante
  del rótulo de cada apartado, numerada por orden de los hijos. Tokens
  `accordion.index-*` con par oscuro.
- **`Container` anidado** — una banda dentro de otra ya no duplica el aire lateral: sale a
  cero por CSS, sin prop. Dentro de una banda `flush` la anidada conserva el suyo.

### Cambiado

- **`Tooltip` reenvía `ref` y `{...rest}` a su disparador**, no al bocadillo. Es lo que le
  permite ser a su vez el `trigger` de un `Popover` sobre el mismo botón: las props que
  inyecta el motor de fuera (`aria-expanded`, el `onClick` que abre el panel) llegan al
  elemento real. `className` sigue siendo del bocadillo.
- **`Popover` › `onOpenChange` recibe un segundo argumento**, el detalle de Base UI.
  Compatible: quien solo lea el primero no nota nada.

### Cambios para consumidores

- **`MessageComposer` › `helperText` ya no trae texto por defecto.** Antes pintaba el
  atajo de teclado en castellano (`Enter para enviar, Mayús + Enter para salto de línea`);
  ahora, sin `helperText`, **no se pinta la línea ni el `aria-describedby`**. Es la única
  prop de texto del sistema sin default en ningún idioma: lo que hay que contar bajo un
  composer depende del producto, no de la traducción de una cadena. Quien quiera el atajo
  lo pasa (la doc del componente trae el fragmento con `Kbd` listo para copiar).
- **`Card` en modo enlace ya no pinta un `<h2>` vacío sin `title`** ni un
  `VisuallyHidden` vacío sin `ctaLabel`. Si algún consumidor dependía de que el encabezado
  existiera siempre, ahora tiene que pasar `title`.
- **`Radio` y `RadioField` leen el `RadioGroup` que los envuelva.** Fuera de un grupo se
  comportan exactamente igual que antes.

## v25.13.0

### Añadido

- **`InputField` › `kind="search"`** — la variante de búsqueda del sistema. El
  campo es `type="text"` con `autoComplete="off"` y `enterKeyHint="search"`, y
  lleva una **lupa fija** al inicio (`Icon name="search"`), a la vista esté el
  campo vacío o escrito: dice, sin gastar texto, que lo que se escriba filtra.
  La lupa no es un control — no responde al puntero y el clic lo recibe el
  campo.
  - `clearable` añade al final un botón con el **aspa del sistema**
    (`Icon name="close"`, el mismo trazo del set), que solo aparece cuando hay
    texto: vacía el campo y devuelve el foco al control. Sirve igual con el
    campo controlado y sin controlar — el valor se escribe con el setter nativo
    y se anuncia con un evento `input`, así que se entera tanto React como
    quien escuche el DOM (Base UI en `DocsSearch`).
  - `clearLabel` nombra el aspa («Borrar» por defecto, castellano); `onClear`
    avisa tras vaciar, ya con el foco devuelto.
  - Tokens propios `input-field.search.*`: hueco y glifo por talla (32/40/48),
    tinta de lupa y aspa con su par oscuro, y el padding que aparta el texto de
    cada icono. Sin fondo en hover, sin bordes redondeados.
- **`DocsSearch`** — props `clearable` (por defecto `true`: el gesto de un
  autocompletar es borrar para volver a preguntar) y `clearLabel`.
- **`DataTable`** — prop `searchClearLabel` para el nombre accesible del aspa
  del buscador.

### Cambiado

- **Fuera `type="search"` de todo el sistema.** El tipo nativo pinta la X de
  borrado del navegador, distinta en cada uno, imposible de vestir y fuera de
  los tokens. Cuando un campo del sistema ofrece borrado, el aspa es la nuestra.
  - `DataTable` — el buscador pasa de `Input type="search"` a
    `InputField kind="search" clearable`, con la etiqueta oculta. **El rol del
    control cambia de `searchbox` a `textbox`**: los tests que lo busquen por
    rol hay que actualizarlos.
  - `DocsSearch` — el campo pasa de `InputField type="search"` a
    `InputField kind="search"`, con borrado por defecto.
  - `InputField` — el valor `'search'` sale de la unión de `type`. Es el único
    cambio de tipos: quien lo pasara, ahora pasa `kind="search"`.
- **`SearchForm`** — sin cambios de API. Documenta la familia: comparte con la
  variante el `Input` y, con él, alto, borde, foco y aire (`input.*`); lo que
  cambia es el icono de acción — aquí la flecha de envío al final, no la lupa,
  y sin borrado. Un solo icono de acción por campo.

## v25.12.0

### Añadido

- **`SearchForm`** (molécula, `@studiolxd/brand/search-form`) — el buscador del
  sitio: `<form role="search">` con `InputField` y un botón-icono de envío con
  la flecha, pegados en una sola línea (solapan un borde, así que el conjunto
  se lee como un solo control). Envía a una página de resultados; no sugiere ni
  autocompleta — para eso sigue estando `DocsSearch`, y el MDX explica cuándo
  va cada uno.
  - `onSubmit(query)` previene el envío nativo y entrega la consulta recortada;
    con el campo vacío (o solo con espacios) no se llama.
  - Sin `onSubmit`, `action`/`method` hacen el envío nativo (`GET` con `q` por
    defecto, `name` configurable): el buscador funciona sin JavaScript.
  - Sin aspa de borrado: el campo es `type="text"`, no `type="search"` —el tipo
    nativo pinta la X del navegador, que no sale de ningún token— con
    `autoComplete="off"` y `enterKeyHint="search"`.
  - Props: `id`, `name`, `value`/`defaultValue`, `onChange`, `onSubmit`,
    `action`, `method`, `label`, `labelHidden` (por defecto `true`),
    `placeholder`, `submitLabel`, `size` y `disabled`. El `ref` va al `<input>`.
    Sin `className`.
  - Tokens `search-form.*` (`tokens/molecule/search-form.json`), derivados de
    los de `input`: anchura, solape de la costura y el fondo del botón, con su
    par `surface-dark-*`. La tipografía, la altura, el borde y el foco siguen
    saliendo de `Input` y de `Button`.
  - Story-tests del envío: consulta recortada, campo vacío que no envía y
    `Enter` desde el campo.

## v25.11.2

### Corregido

- **Empaquetado** — seis componentes construidos en `dist/` desde v25.11.0 no
  tenían su subruta en `exports` de `package.json`, así que eran inalcanzables
  para los consumidores aunque el CHANGELOG los anunciara como públicos:
  `./prose`, `./table-of-contents`, `./docs-search`, `./stat-tile`,
  `./copy-button` y `./confirm-dialog`. `scripts/entry-points.mjs` sí los
  construía y sus `dist/_types` existían. Añadidas las seis subrutas; el
  `exports` vuelve a cubrir todos los puntos de entrada.

## v25.11.1

### Corregido

- **`AsyncSelect`/`AsyncSelectField`** — las variantes `sm`/`lg` sobreescribían
  `--multi-select-height` (residuo de copiar el CSS de `MultiSelect`) en vez
  de `--async-select-height`: la talla del control nunca cambiaba y siempre
  medía 40px (`md`). Corregido a la custom property propia del componente.
- **`AsyncMultiSelect`/`AsyncMultiSelectField`** — mismo copy-paste
  (`--multi-select-height` en vez de `--async-multi-select-height`) en las
  variantes `sm`/`lg`. Corregido.
- **`CheckboxField`** (con `react-hook-form`) — `Checkbox` pisaba el
  `aria-checked` que pone Base UI en el botón nativo con un
  `aria-checked={isIndeterminate ? 'mixed' : undefined}` explícito: pasar la
  prop con valor `undefined` sigue anulando el atributo interno de Base UI
  (a diferencia de no pasarla), así que fuera del estado mixto el control
  quedaba sin `aria-checked` en absoluto y `.toBeChecked()` no podía leer su
  estado. Ahora solo se añade `aria-checked="mixed"` cuando el estado es
  indeterminado; en los demás casos Base UI pone el suyo.
- **`Sheet`** — el test de cierre comprobaba `not.toBeInTheDocument()` justo
  después del clic en el aspa, sin esperar a que terminase la animación de
  salida (Base UI mantiene el panel montado durante `data-closed` +
  `data-ending-style` y lo desmonta al terminar). Test corregido con
  `waitFor`; el componente no tenía ningún bug.
- **`Kbd`** — el test «una tecla de un carácter es cuadrada» comprobaba
  igualdad exacta de ancho y alto. El diseño real nunca fue cuadrado exacto:
  el ancho mínimo (`kbd.min-size`) es solo un suelo, y el aire horizontal
  (deliberadamente mayor que el vertical) ensancha el control por encima de
  ese suelo en las tres tallas (S: 26,4×24, M: 35,6×26, L: 46×38). La
  documentación pre-existente a la revisión que introdujo el test ya lo decía
  bien: «casi cuadrada», no cuadrada. Revertido el texto de MDX y del token
  a esa descripción, y el test ahora comprueba que el ancho nunca es menor
  que el alto ni se estira más de 1,5× — el contrato real, no uno que el
  propio CSS nunca pudo cumplir.

## v25.11.0

Fase 0.3: las piezas de documentación y datos que faltaban para desmontar los
componentes caseros de `apps/web` y de `aipricing`, más tres huecos pequeños que
las apps piden al retirar su capa `components/ui/`.

### Añadido

- **`Prose`** (molécula, `./prose`) — el contenedor de contenido largo: MDX,
  textos legales, artículos, cualquier HTML que llegue de un CMS. Viste la
  semántica cruda (`h1`–`h6`, `p`, `ul`/`ol`, `blockquote`, `pre`/`code`,
  `table`, `hr`, `img`, `figcaption`) con la escala del sistema y la acota a la
  medida de lectura. Es la **excepción documentada** al estilado de etiquetas
  nativas: el contenido no viene de React y no hay dónde poner una clase. El
  ritmo lo pone el flujo —los bloques no traen margen propio— y los tokens son
  prestados: el código los de `CodeBlock`, la tabla los de `Table`, la cita y el
  corte los de `Separator`, la sangría de las listas la de `List`. Los enlaces
  no llevan nada: `base.css` ya viste cualquier `<a>`. Props `as`, `size`
  (`sm`|`md`) y `measure`.
- **`TableOfContents`** (molécula, `./table-of-contents`) — el índice de anclas
  de la página. Controlado y sin scroll propio: recibe `activeId` y lo pinta,
  porque el «dónde estoy» se resuelve de tres maneras distintas
  (`IntersectionObserver`, hash, scroll de un contenedor) y ninguna cabe dentro.
  `nav` con nombre, rótulo opcional, `List` + `Link`, sangría relativa al nivel
  más alto de la lista y `aria-current="location"` en la sección actual. Estados
  del sistema: línea en hover, barra al borde de inicio y peso `emphasis` en la
  actual, anillo en el foco. `sticky` opcional.
- **`DocsSearch`** (molécula, `./docs-search`) — el buscador de la
  documentación. No busca nada: recibe `query`, `results` y `loading`. El motor
  es el `Autocomplete` de Base UI con `filter={null}` y la lista en línea, sin
  popup; el campo es el `InputField` del sistema, montado por `render`. Campo
  `combobox`, `listbox` con nombre, un `option`-enlace por resultado y una
  región viva que solo existe cuando hay algo que decir. `renderLink` para el
  enlace del router.
- **`StatTile`** (molécula, `./stat-tile`) — la baldosa de una cifra: etiqueta,
  cifra, delta y contexto. No calcula ni formatea. `direction` gira la flecha y
  fija el tono por defecto (subir es bueno); `tone` lo invierte donde subir es
  malo, sin tocar la flecha. La dirección viaja además en texto oculto. Sin
  fondo propio: se lee sobre el lienzo y funciona igual en las dos superficies.
  La rejilla la pone `Columns`.
- **`CopyButton`** (molécula, `./copy-button`) — copiar al portapapeles con
  acuse doble: el icono pasa a un tic y una región viva lo anuncia. `value`
  acepta una función, evaluada en el clic. Si el portapapeles no está
  disponible lo dice en vez de fingir que ha copiado.
- **`ConfirmDialog`** (molécula, `./confirm-dialog`) — la pregunta antes de lo
  irreversible, sobre `Modal`. **El foco arranca en «Cancelar»**: confirmar
  cuesta un `Tab`. `onConfirm` acepta una promesa y el diálogo se queda abierto
  y ocupado mientras dura; si rechaza, sigue abierto y avisa por
  `onConfirmError`.
- **`Inline`** gana `justify` (`start` | `center` | `end` | `between`). Era el
  hueco por el que se colaba un `className` de producto en cada pie de
  formulario: una fila de acciones a la derecha no tenía forma de pedirse.
  `start` es el defecto y no añade clase.

### Tokens

Nuevos grupos `prose.*`, `table-of-contents.*`, `docs-search.*`, `stat-tile.*`,
`copy-button.*` y `confirm-dialog.*`, con sus pares `surface-dark-*` donde el
color no llega ya por derivación.

## v25.10.0

Fase 0.5: el sistema aprende a dibujar datos. Un organismo `Chart`, un átomo
`Sparkline` y la paleta de datos completa —categórica, secuencial y
divergente—, derivada de los tonos de marca y validada, no elegida a ojo.

### Añadido

- **`Chart`** (organismo, export `./chart`): línea, área, barras —verticales u
  horizontales, agrupadas o apiladas—, tarta y donut. **Sin librería de
  gráficos**: dibuja SVG a pelo, así que todo el color y toda la tipografía
  salen de tokens, el marcado es BEM y el primer render vale en servidor.

  API: `data` + `series: {key, label, color?}[]` + `xKey`; `type`,
  `orientation`, `stacked`, `emphasis`, `height`, `yTicks`, `legend`, `grid`,
  `tooltip`, `valueLabels`; formateadores `formatValue` y `formatX` sobre
  `locale`. `color` en una serie acepta solo una referencia a token.

  Cada gráfico trae su **tabla equivalente oculta** (`VisuallyHidden`) con
  todas las filas y todas las series: el bocadillo enriquece, no franquea. El
  lienzo SVG va `aria-hidden` y quien lleva el nombre accesible y el foco es la
  capa de exploración, que se recorre con las flechas del teclado. La leyenda
  aparece desde dos series y se monta con `Inline` de `Tag`; el bocadillo usa
  los tokens de `Tooltip`.

- **`Sparkline`** (átomo, export `./sparkline`): la chispa que acompaña a una
  cifra dentro de un `StatTile`. Gris de atenuación, punto final en el acento,
  línea del cero cuando la serie lo cruza. Sin `ariaLabel` es decorativa.

- **Paleta de datos** (`color.chart.*`, roles `chart.*`): ocho ranuras
  categóricas con par oscuro propio, rampa secuencial de siete pasos y par
  divergente cálido/frío con neutro gris. Los tonos salen de la marca —cinco de
  la paleta llevados al paso legible de gráfico y tres derivados interpolando el
  ángulo de tono en OKLCH entre pares de marca contiguos—, y el **orden de las
  ranuras** se obtuvo enumerando órdenes y pasos y quedándose con el que
  maximiza la separación mínima entre ranuras contiguas. Medido: separación bajo
  daltonismo 17.0 en claro y 14.7 en oscuro (puerta ≥ 8), con visión plena 19.6 y
  19.8 (puerta ≥ 15), y las ocho ranuras por encima de 3:1 en las dos
  superficies.

- **Foundations → Gráficos de datos**: el sistema entero —los cinco oficios del
  color, la paleta con sus medidas, cuántas series caben, las marcas y los dos
  huecos, y los errores que no se cometen.

### Cambiado

- **`VisuallyHidden`** acepta `as="div"` para envolver contenido de flujo que no
  cabe dentro de un `span` —la tabla equivalente de `Chart`—. El default sigue
  siendo `span`: no hay cambio para quien ya lo usa.

## v25.9.0

Fase 0.4: las piezas de marketing que le faltaban al sistema para levantar
studiolxd.com y la web de la suite sin CSS de proyecto. Todas reconstruidas
sobre las reglas de hoy —formas rectas, tokens, estados sin relleno— y ninguna
restaurada tal cual estaba en `v22.5.1`.

### Añadido

- **`Carousel`** (molécula, con `CarouselSlide`) — pista de scroll nativo con
  `scroll-snap`: arrastrar, deslizar y las flechas del teclado son del
  navegador. Añade botones prev/next (`Button ghost` + `Icon`), indicadores de
  posición y `autoplay` opcional, que se para con el puntero o el foco dentro y
  no arranca con `prefers-reduced-motion`. **Sin `embla-carousel`**: la versión
  anterior traía esa librería y aquí no hay ninguna. Cubre los tres casos de la
  web: logotipos de clientes en marcha, proyectos en tarjetas y reseñas.
- **`Steps`** (organismo) — proceso numerado a partir de
  `items: {title, description?, icon?}[]`, en vertical u horizontal. Es un `ol`
  de verdad: el orden lo anuncia el elemento, y el `NumberBadge` que se ve va
  marcado como decorativo para no repetir la posición en voz alta.
- **`SiteFooter`** (sección) — pie corporativo multicolumna: marca con su
  frase, columnas de enlaces por `renderLink`, slot libre para el contacto o la
  newsletter y `LegalFooter` anidado debajo, separado por la línea del sistema.
  Superficie oscura por defecto.
- **`ProjectCard`** (molécula) — tarjeta de proyecto con imagen, etiquetas
  (`Tag`), título y descripción. Es un `<article>` con **un solo** enlace, el
  título, cuya área pulsable se estira sobre la tarjeta: se pulsa donde sea,
  el teclado se para una vez y el lector de pantalla anuncia el nombre del
  proyecto. Acepta `render` para el enlace del router, como `Card` y `Button`.
- **`Highlight`** (sección) — banda destacada con titular, texto, acciones
  (`Inline`) y slot de media, repartido con `Columns`. Superficie oscura por
  defecto.
- **`Card`: props `variant` (`default` | `square` | `split`) y `media`** — las
  dos tarjetas de marketing que antes eran `CardSquare` y `CardSplit` son ahora
  una maqueta de `Card`. Su contrato ya era idéntico al de la link-card
  (enlace, título, descripción, CTA accesible, color); lo único distinto era
  dónde va la imagen. Ninguna de las dos esconde ya la descripción hasta el
  *hover*: el texto que explica la tarjeta se lee siempre, también con el dedo.

### Notas

- Los indicadores del `Carousel` son barras de tinta, no puntos rellenos de
  marca: la posición dentro de una pista es un estado, y los estados no se
  rellenan (Foundations → Colores).
- Ninguna de las piezas nuevas define color de fondo propio: `SiteFooter`,
  `Highlight` y `ProjectCard` lo dejan en manos de la superficie, así que
  cambiar `surface` los voltea enteros.

## v25.8.0

Fase 0 de la revisión: las dos reglas transversales que faltaban —cómo se dicen
los estados y cómo se deriva el modo oscuro— escritas en Foundations y
aplicadas a todo el sistema.

### Cambiado

- **Los estados no pintan relleno** (Foundations → Colores, «Estados: nada se
  rellena»). Ningún componente pinta un fondo para decir que está bajo el
  puntero o activo: el foco lleva el anillo del sistema, el hover una línea de
  tinta bajo el elemento —el grafismo del subrayado de `Link`— y el activo
  persistente una barra de tinta en el borde de inicio con peso `emphasis`. Los
  tres se apilan. Excepciones documentadas: `Button` (el relleno es el lenguaje
  de sus variantes, y `ghost` conserva su tinta suave) y el valor elegido (día
  del `Calendar`, pestaña activa de `Tabs` pill).

  Retirados los `*-hover-bg` / `*-active-bg` / `*-highlighted-bg` y sus pares
  oscuros, con los tokens de texto que los acompañaban, en **Menu, UserMenu,
  OrgSwitcher, CommandPalette, Select, MultiSelect, AsyncSelect,
  AsyncMultiSelect, InputPhone, SidebarNav, Table, Tabs, AppLauncher, Calendar,
  CalendarPlanner, ConversationList, NumberInput y Pagination**; en su lugar,
  tokens `*-focus-ring-*`, `*-hover-line-*` y `*-active-marker-*`. Cambio
  visual en esos componentes, sin cambio de API.
- **El modo oscuro se deriva del rol** (Foundations → Colores, «La regla de
  derivación»): texto → el mismo rol `-on-dark`; superficie → ídem; borde,
  separador, anillo y líneas de estado → `color.text.on-dark`; marca (relleno
  prusia) → el par de `Button primary` (lavanda con tinta prusia), invertido a
  blanco/prusia solo donde `accent-1` ya es otra variante del componente
  (`Tag`, `NumberBadge`, `ProgressBar`); feedback → `*-text-on-dark`, con los
  `*-fill` sin cambiar por universales; deshabilitado → opacidad, sin par. Un
  relleno autocontenido no deriva y no lleva par.
- El pill activo de `Tabs` pasa de invertirse a blanco a la lavanda de
  `Button primary`: en Tabs `accent-1` no está ocupada, y la inversión era el
  patrón de los componentes que sí la tienen ocupada.

### Añadido

- `SwitcherField` acepta `labelHidden` (mismo nombre y default que
  `InputField`/`SelectField`): la etiqueta sigue nombrando al interruptor —queda
  en el DOM dentro de un `VisuallyHidden`— pero no se pinta. Para las tablas de
  preferencias, donde el nombre del ajuste ya está en su columna.
- `FileUpload` y `FileUploadField` tienen las tres tallas del sistema, por
  `useFormSize`. La zona de arrastre no es un control de una línea, así que no
  toma la altura 32/40/48: lo que sigue a la talla es su aire (32/48/64), el
  cuerpo de su texto y el icono. La miniatura de cada archivo sí toma la talla
  exacta 32/40/48. Antes `size` solo movía la etiqueta del campo.
- `AsyncSelect` y `AsyncMultiSelect` tienen tokens propios
  (`tokens/component/async-select.json`, `async-multi-select.json`), con cada
  token apuntando por defecto al del `Select`/`MultiSelect` — misma cara, ahora
  declarada. Estrenan lo que solo tiene un buscador: la fila de carga
  (`loading-*`), el mensaje de lista vacía (`empty-*`, con par oscuro) y el peso
  de la opción ya elegida (antes `--font-weight-bold` crudo).
- Pares oscuros nuevos, por la regla de derivación, con story «En superficie
  oscura»: **FileUpload** (los 22 colores), **NumberInput** (botones +/−),
  **NumberBadge** (`primary` y `neutral`), **Tooltip**, **TypingIndicator**,
  **TimeSelect**, **Radio**, **EmptyState** (icono), **InputPhone** (separador
  de país), **Sidebar** (asa), **CommandPalette** (pista), **MultiSelect**
  (pills) y **ProgressBar** (relleno primary). Stories oscuras también en
  Switcher, Checkbox, Avatar, Spinner y PasswordField, que ya heredaban pero no
  lo enseñaban.
- MDX nuevo en tres átomos que no lo tenían: `FileUpload`, `AsyncSelect` y
  `AsyncMultiSelect`, con sus tablas de tokens.

### Arreglado

- **Un token que hereda de otro no heredaba su modo oscuro.** Un `var()` dentro
  de una custom property se sustituye en el elemento que la declara, así que
  `--sheet-title-color: var(--modal-title-color)`, declarado en `:root`, llegaba
  al `Sheet` ya resuelto en claro. El build genera ahora
  `src/tokens/surface-dark-derived.css`, que vuelve a declarar bajo los
  selectores oscuros todo token que referencie a otro con par oscuro, por punto
  fijo — el mismo mecanismo que `surface-public.css`. Recuperan su tema oscuro
  **Sheet, Popover, Menu, UserMenu y OrgSwitcher** (paneles), **NumberInput**
  (campo entero) y **CommandPalette**.
- `sd.formats.mjs` reescribe las referencias a un `surface-dark-*` de otro
  componente al nombre claro de esa variable: el par oscuro se publica con el
  nombre del claro, así que `var(--menu-surface-dark-separator-color)` apuntaba
  a una variable inexistente y la declaración quedaba inválida. Afectaba a
  UserMenu, OrgSwitcher, CommandPalette, AppLauncher y `Button` variante `text`.
- `OrgSwitcher` consumía `--context-menu-item-destructive-*`, variables
  huérfanas desde que `context-menu.json` se eliminó; pasa a tokens propios.
- `FileUpload`: fuera los números sueltos del borde discontinuo (16px/10px), el
  `gap` de 2px entre nombre y peso, el `2.5rem` de la miniatura y el
  `outline-offset`/`border-radius` de 2px del aspa.

## v25.7.0

### Añadido

- **`Separator`** (átomo, `@studiolxd/brand/separator`) — la línea de
  separación del sistema, que hasta ahora cada menú, cada panel y cada
  aplicación pintaban por su cuenta. Es un `<hr>` (el elemento que ya significa
  «separación» en HTML), con el grosor pintado por el fondo para que el mismo
  token sirva de alto en horizontal y de ancho en vertical. Props:
  `orientation` (`horizontal` | `vertical`), `decorative` (default `true`: sale
  del árbol de accesibilidad; con `false` conserva su rol `separator` y declara
  `aria-orientation` en vertical) y `spacing` (`sm` | `md` | `lg`, el aire va en
  la propia línea). Tokens nuevos `separator.color`, `separator.thickness`,
  `separator.spacing-sm|md|lg` y `separator.surface-dark-color`.
- **`ConsentBanner` + `ConsentPreferences`** (molécula,
  `@studiolxd/brand/consent`) — el par de piezas del consentimiento de cookies
  que las ocho aplicaciones de la suite tenían copiado. La banda es una
  `role="region"` con nombre, fija al borde inferior: **no atrapa el foco, no
  lleva velo y no bloquea la página**, y rechazar cuesta exactamente lo mismo
  que aceptar (un clic, la misma fila). El panel es un diálogo sobre `Sheet`
  (default) o `Modal` (`surface="modal"`), con un `SwitcherField` por categoría,
  `Separator` entre ellas y las categorías `required` marcadas, deshabilitadas y
  con la marca «Siempre activa». **El DS no guarda nada**: ni cookies, ni
  `localStorage`, ni caducidad — props controladas y callbacks; la decisión y su
  persistencia siguen siendo del consumidor. Sin `onChange` el panel lleva
  borrador y solo devuelve la decisión al guardar; con `onChange` es controlado.
  Todos los textos son props con default castellano. Tokens nuevos
  `consent.banner.*` y `consent.preferences.*`.
- `Card`: prop **`render`** — el modo enlace sobre el elemento de navegación de
  la aplicación (el `Link` del router), con `useRender` de Base UI, igual que
  `Button` y `SiteNav`. Manda sobre `href`, que sigue funcionando igual.
- `Heading` y `Paragraph` reenvían el resto de props de su elemento (`data-*`,
  `aria-*`, `id`…) y aceptan `ref`.

### Cambiado

- `CardTitle` renderiza el átomo `Heading` en vez de un `<div>`: el título de
  una tarjeta es un encabezado de verdad, cuenta para el esquema del documento y
  un lector de pantalla puede saltar de tarjeta en tarjeta. Props nuevas `level`
  (default `3`) y `size` (default `4`) — el nivel dice de qué encabezado cuelga
  la tarjeta, el tamaño cómo se ve. `CardDescription` renderiza `Paragraph` en
  talla `small`, así que su cuerpo sigue el peldaño de párrafo de la superficie
  de lectura. **Breaking de facto para quien ya compusiera un encabezado propio
  dentro de `CardTitle`**: ahora el título ya es el encabezado.
- `CardHeader` pasa de fila flex a rejilla de dos columnas: el texto a la
  izquierda (título y descripción, uno debajo de otro) y la acción anclada
  arriba a la derecha. Las cuatro subpartes son hermanas — se escriben en el
  orden en que se leen, sin envoltorio para el bloque de texto. Token nuevo
  `card.header-row-gap`.
- La regla `.card p` de la link-card pasa a `.card p:not(.paragraph)`: deja
  fuera al átomo `Paragraph` —y con él a `CardDescription`—, que trae su propio
  cuerpo de la superficie y no quiere el aire de la maqueta de marketing.
- Los separadores de `Menu`, `UserMenu`, `OrgSwitcher`, `Sidebar` y `Select`
  hacen cascada sobre los tokens del átomo nuevo: `--menu-separator-color` y
  compañía apuntan a `separator.color` / `thickness` / `spacing-md`, así que
  cambiar la línea del sistema los cambia a todos a la vez. Siguen renderizando
  su propio elemento, que se lo pide su motor de Base UI. `Select` estrena
  `separator-color` / `separator-height` propios (antes reutilizaba los del
  borde del desplegable) con su par oscuro.

### Corregido

- El separador de `UserMenu` y de `OrgSwitcher` no tenía color en superficie
  oscura: su token apuntaba a `{menu.surface-dark-separator-color}`, que nunca
  llega a declararse como custom property (el formato de modo oscuro remapea la
  propiedad original, no crea una `--*-surface-dark-*`). Ahora apuntan al rol
  directo `color.text.on-dark`.

## v25.6.0

Lote de deudas mecánicas del DS sin decisión de diseño (ver `notes/REVISION-pendientes.md`).

### Añadido

- `CheckboxField` al contrato de campo de los otros 14 fields: `forwardRef`
  (al disparador de Base UI), `helperText`, `error`/`errorMessage` (con
  `aria-describedby`/`aria-invalid`) y `className` en el contenedor. Nueva
  prop `error` en el átomo `Checkbox` (`checkbox--error`, borde en el color
  de error, token `checkbox.error-border-color` con par `surface-dark-*`). El
  label deja `font-size.2` crudo por `{text.font-size}` (era un peldaño por
  debajo del `RadioField`/`SwitcherField` en la superficie pública); tokens
  de `checkbox-field` alineados al mismo patrón (`stack-gap`, grupos `error`/
  `helper`). Mismo contrato, forma y tokens que `SwitcherField`.
- `AppShell` monta `SkipLink` (nueva prop `skipLabel`, default «Saltar al
  contenido principal») como primer elemento del árbol, apuntando al
  `<main id="main-content" tabIndex={-1}>` que ya renderizaba: la app con
  sesión tiene salto al contenido, mismo patrón que `AppRoot`.

### Arreglado

- `DatePicker` (y `DateTimeField`, que reenvía su `name`): el input oculto
  que monta el `name` construía la fecha en `yyyy-mm-dd` con
  `toISOString().slice(0, 10)` — UTC — y desplazaba un día en husos al este
  del meridiano a horas tempranas en el envío nativo del formulario. Nuevo
  helper `toLocalDateInputValue` usa los componentes locales de la fecha
  (`getFullYear`/`getMonth`/`getDate`). Sin impacto en react-hook-form, que
  guarda el `Date`.

### Verificado sin cambios de código

- `icon.size-sm` ya vale `16px` desde el rediseño (commit `9e51db5`); auditados
  los ~18 usos de `<Icon size="sm">` del sistema, ninguno dependía del valor
  anterior (18px).
- Las transiciones de `Table`, `Modal` y `Tooltip` ya toman sus tokens de
  motion directos, sin `ms` a mano ni el bug de `calc(var(--…) * 1ms)`;
  `CardSplit` (el único caso pendiente anotado) ya no existe, fusionado en
  `Card`.

## v25.5.0

### Cambiado

- `Calendar`: la rejilla es ya una rejilla accesible completa. `role="grid"`
  con filas, cabeceras de columna y celdas —eso ya estaba— más **roving
  tabindex**: un mes es una sola parada de tabulador, no treinta y cinco.
  Dentro se navega con ←→ (día), ↑↓ (semana), Inicio/Fin (lunes/domingo de la
  semana), RePág/AvPág (mes) y Mayús+RePág/AvPág (año); cruzar el borde del
  mes arrastra el mes visible. Las cabeceras de día llevan el nombre completo
  en un `<abbr>`, y la rejilla acepta nombre propio por la prop nueva
  `gridLabel` (`DatePicker` le pasa su `calendarLabel`, así el panel y la
  rejilla tienen nombre). El marcador del día de hoy deja los `3px`/`4px`/`50%`
  cableados por `today-marker-offset`/`-size`/`-radius` (esquina recta, como
  todo el sistema; el token `today-border-color` pasa a llamarse
  `today-marker-color`). `nav-hover-bg` y `day-hover-bg` dejan `grey-lightest`
  por el relleno de marca del patrón Menu/Button ghost, con su par de texto
  (`nav-hover-color`/`day-hover-color`) e inversión en superficie oscura —
  fuera los `rgba(255,255,255,.12)` a mano. `outside-color` pasa a
  `color.text.muted-on-light` (los días fuera de mes se leen: son texto). MDX
  nuevo con la tabla de teclado, story de superficie oscura, story de test y
  `Calendar.test.tsx` con doce casos.
- **Rejilla de mes compartida**: `getCalendarDays`, el reparto en semanas, los
  nombres de día, la cabecera, la navegación de mes y el teclado de la rejilla
  viven en `src/stories/molecules/_shared/calendarGrid`, que consumen
  `Calendar`, `CalendarPlanner` y `CalendarRoster`. Es interno: no cambia nada
  de la API pública.
- `CalendarPlanner`: deja de reimplementar `Calendar` línea por línea.
  `calendar-planner.json` se queda con lo que es suyo (bordes de parrilla,
  altura de celda, badge del número, «+N más») y hace cascada sobre
  `{calendar.*}` para navegación, título, cabeceras, hover de celda, color del
  número y transiciones. `--calendar-planner-day-hover-bg` no existía en los
  tokens generados —el hover estaba muerto—: ahora es `cell-hover-bg`/`-color`.
  Retirados los huérfanos `nav-disabled-color` y `nav-disabled-cursor`.
  `cell-outside-bg` deja `grey-lightest` por `color.surface.secondary-*`. Con
  `onDayClick` la parrilla es ya operable con teclado (mismo roving tabindex y
  mismas teclas que `Calendar`) y tiene anillo de foco. Prop nueva `gridLabel`.
  MDX, story de superficie oscura y story de test nuevas.
- `CalendarRoster`: la banda de mes pasa a ser `PrevNextNav` en vez de un
  control a mano; se van con ella `renderNav`, su CSS y once tokens
  (`nav-*`, `title-*`, `transition-*`). `chip-padding-block` (2px, fuera de la
  escala de 4) desaparece con el botón que lo usaba, y `chip-padding-inline`
  pasa a `legend-item-gap`, que es lo que hacía. El badge de hoy deja
  `1.5rem` por `th-day-today-size`, y el recuadro de la columna de hoy deja
  `outline: 2px`/`-2px` por `cell-today-outline-width`. `cell-weekend-bg`,
  `cell-holiday-bg` (era `#E5E7EB` a pelo) y `cell-non-working-bg` apuntan los
  tres al rol `color.surface.secondary-*`: un día no laborable es una
  superficie, y lo que separa las categorías es el chip que las nombra; par
  oscuro nuevo para no laborable. `schedule-font-size` (11px) y
  `th-day-sub-font-size` (10px) entran en la escala (`font-size.0`). La
  inicial del día lleva `<abbr>`. MDX, story de superficie oscura y story de
  test nuevas.
- `PrevNextNav`: `border-radius: 2px` del anillo de foco → `focus-ring-radius`.
  Par oscuro nuevo (`surface-dark-*`) para rótulo, controles, deshabilitado y
  anillo de foco; el hover pasa a `color.accent-2` porque en oscuro el prusia
  de marca es el propio fondo (mismo criterio que `SiteNav`). Props nuevas
  `linkComponent` (rinde el `href` con el `Link` del router) y `labelId` (id
  del rótulo, para `aria-labelledby`); `prevOnClick`/`nextOnClick` reciben
  ahora el evento y se disparan también junto al `href`, que es la puerta de
  la navegación SPA. MDX, story de superficie oscura y story de test nuevas.
- Los tokens de `calendar`, `calendar-planner`, `calendar-roster` y
  `prev-next-nav` se mudan de `tokens/component/` a `tokens/molecule/`, la
  carpeta que les corresponde. El CSS y el SCSS generados salen donde salían.
- Los cuatro salen de `Por revisar/`: `Molecules/Calendar`,
  `Molecules/CalendarPlanner`, `Molecules/CalendarRoster` y
  `Molecules/PrevNextNav`.

## v25.4.0

### Cambiado

- `Modal`: el aspa de cierre pasa a `<Button variant="ghost" size="sm" iconOnly>`
  compuesto con `Dialog.Close` vía `render` (precedente de `Alert`/`Toast`);
  se retiran `close-color`/`close-hover-color`/`close-hover-bg` y el foco
  prestado de Button. `calc(-50% - 8px)` de los keyframes de
  entrada/salida pasa a token (`content-enter-offset`, `spacing.2`). El
  panel gana borde 1px en superficie oscura (`surface-dark-border-color`,
  blanco) que lo separa del velo, también oscuro; transparente en
  superficie clara, donde el velo ya basta. `width-max`/`max-height`
  quedan documentados como medidas de layout. Story oscura reescrita con
  `parameters: { surface: 'dark' }` en vez de alternar `html.dark` a mano.
  Doc MDX nueva.
- `Sheet`: el aspa deja de tomar prestados `--modal-close-*` y pasa al mismo
  patrón `Button ghost` de Modal — con ello se resuelve un bug de a11y real,
  `.sheet__close` no tenía `:focus-visible`. `description-font-size`/
  `description-color` dejan de tomar prestado `input-field.helper.*` y pasan
  a referenciar los de `Modal`; verificado en el CSS generado que Sheet
  hereda el modo oscuro de Modal por cascada real de custom properties, sin
  declarar tokens `surface-dark-*` propios. Story oscura y story
  `Test — abre, cierra con el aspa y devuelve el foco` nuevas (antes sin
  ningún `play`). Doc MDX nueva.
- `ImageCropDialog`: `area-bg`/`surface-dark-area-bg` dejan de nombrar
  `color.grey-lightest` y una rgba cableada; pasan al rol
  `surface.secondary-on-light|dark` (mismo que `Kbd`/`CodeBlock`/
  `ProgressBar`). Story oscura nueva; el marco de `react-image-crop` se
  verificó sobre superficie oscura (dibuja sobre la imagen, no sobre
  `area-bg`, así que su contraste no depende del tema — documentado en el
  MDX). Doc MDX nueva.
- Los tres salen de `Por revisar/`: `Molecules/Modal`, `Molecules/Sheet`,
  `Molecules/ImageCropDialog`.

## v25.3.0

### Cambiado

- `Table`: la cabecera ordenable pasa a ser un `<button>` dentro del `<th>`
  (patrón WAI-ARIA). El `th` conserva `aria-sort`, el nombre accesible del
  botón es solo el rótulo de la columna —el estado deja de mezclarse con el
  nombre— y Enter y **Espacio** activan de forma nativa, lo que el
  `tabIndex` + `onKeyDown` manual anterior no garantizaba. La API pública no
  cambia (`sortable`/`sorted`/`onSort`); lo que cambia es el DOM interno:
  `.table__header-content` es ahora el botón. `Table.Row` acepta `selected`
  (nueva prop) y emite `.table__row--selected`. Los estados salen del gris:
  el hover de fila interactiva invierte —relleno de marca y tinta clara—
  como en `Menu` y `SidebarNav`; la fila seleccionada se dice con tinta y
  peso; `footer-bg` pasa al rol `surface.secondary-on-light`; el hover de una
  columna ordenable no pinta fondo, lleva el icono de ordenación al color
  activo; y `sort-icon-color` deja `grey-dark` por `text.muted-on-light`.
  Tokens huérfanos `border-color` y `header-hover-bg` retirados con sus pares
  oscuros, y los `rgba()` cableados del par oscuro sustituidos por roles.
  `gap: 0.375rem` pasa al token propio `header-content-gap` ({spacing.2}),
  fuera los `@import` de CSS ajeno y documentado el `width: 1px` de la
  columna de acciones. Doc MDX nueva, story de superficie oscura, story de
  columna de acciones y test de contrato de la cabecera ordenable.
- `DataTable`: fuera el `data-state="selected"` —prohibido por la regla de
  Base UI y, además, atributo muerto que ningún CSS leía—; la selección viaja
  ahora por la prop `selected` de `Table.Row`. Doc MDX nueva y stories de
  superficie oscura, con y sin `isLoading`.
- Storybook: una story marcada `parameters: { surface: 'dark' }` acota su
  lienzo a un contenedor `.surface-dark` cuando se renderiza dentro de la
  página de **docs**. Antes teñía el `<html>` entero y dejaba ilegibles todas
  las demás stories de esa página. En el canvas de la story sigue usando el
  `<html>`, que es donde hace falta alcanzar a los portales.
## v25.2.0

### Cambiado

- `Card`: los cuatro fondos `accent-1`/`accent-2`/`support-1`/`support-2`
  —antes primitivo `var(--color-*)` directo en CSS— pasan a tokens de
  componente propios. La variante `primary` deja de usar `color.primary`
  como fondo (coincidía con `color.background.dark`: invisible sobre
  `.surface-dark`) y pasa al patrón autocontenido de `button.primary` —
  fondo `color.accent-1` (lavanda), texto `color.primary` (prussian), igual
  en los dos temas. Token huérfano `card.shadow` (ya en `none`) retirado
  junto con su `box-shadow` en CSS. Doc MDX ampliada (modo link/contenedor,
  accesibilidad) y story de superficie oscura nueva.
- `AppLauncher`: se borran 50 líneas de CSS bajo
  `.surface-dark`/`[data-theme]`/`html.dark` que nunca surtían efecto (el
  popup va en `Portal`; los tokens oscuros ya funcionan por el mecanismo
  estándar de activación root-level). `trigger-size`/`tile-icon-size`
  —2.5rem crudos— pasan a `size-component.md` (mismo valor).
  `trigger-hover-bg`/`tile-hover-bg`/`tile-active-bg` dejan `grey-lightest`
  y usan el relleno de marca del patrón Menu/Button ghost, con inversión en
  superficie oscura. Doc MDX, story de superficie oscura y test de contrato
  nuevos.
- `Pagination`: el subrayado del botón en hover —antes `link.underline-width`
  prestado de `Link`— pasa a `pagination.btn-hover-underline-width`, token
  propio. Story de superficie oscura nueva.
- `Skeleton`: `skeleton.duration` pasa de número crudo consumido con
  `calc(var(*)*1ms)` a `"1400ms"` directo (como `spinner.animation-duration`).
  Se apaga en `prefers-reduced-motion` (no lo cubría el
  `--motion-duration-*` global). `skeleton--circle` usa `border-radius.round`
  en vez de `50%` a mano; `bg` pasa al rol `surface.secondary-on-light` y
  `surface-dark-bg`/`-highlight` dejan los `rgba` cableados por
  `surface.secondary-on-dark` y `grey-dark`. Doc MDX nueva, story de
  superficie oscura y test de contrato.

## v25.1.0

Revisión de la familia de chat entera: los seis componentes salen de
`Por revisar/` y la plantilla `Chat` se convierte en un componente de verdad.

### Roto

- **`MessageBubble` pierde los cuatro tokens de relleno** (`user-bg`,
  `user-color`, `assistant-bg`, `assistant-color`). Ningún globo lleva relleno:
  quien personalizara el fondo del globo del usuario ahora repunta
  `message-bubble.border-color` y `message-bubble.color`.
- **`MessageBubble` deja de aceptar el atributo `role` de ARIA.** Su prop `role`
  dice quién habla, no qué es el elemento, así que el atributo nativo queda
  excluido de las props reenviadas.
- **`UserMessage` / `AssistantMessage` / `ConversationThread`: `timestamp` pasa
  a ser el instante** (`Date` o cadena ISO 8601), no una hora ya formateada.
  Quien pase `"14:32"` deja de ver la marca de tiempo (no se pinta nada, en vez
  de «Invalid Date»). Afecta a **lrs › StoreChat**, que hoy pasa la hora ya
  formateada con `format.dateTime`: hay que pasarle el `Date`.
- **`MessageComposer` pierde `sendAriaLabel`.** El botón tenía texto «Enviar» y
  `aria-label="Enviar mensaje"` a la vez, y el `aria-label` sustituye al nombre
  visible: quien dictaba «Enviar» no activaba el control (WCAG *label in name*).
  Ahora el nombre accesible es el texto visible; se traduce `sendLabel`.
- **`MessageComposer` cambia de estructura BEM.** `.message-composer` es ahora
  la pila (marco + línea de ayuda) y el marco es `.message-composer__box`.
  Quien estilara `.message-composer` como caja tiene que apuntar al box.
- **`ConversationList` pierde `item-active-bg`** (era gris claro, y estaba
  huérfano) y **`.conversation-list__new` deja de ser un `<button>` propio**:
  es un `Button variant="outline" block`, así que su CSS ya no existe.
- **La plantilla `Chat` desaparece.** Era solo una story, sin componente ni
  export, así que ningún producto podía consumirla; en su sitio está `ChatShell`.

### Añadido

- **`ChatShell`** (`Templates/ChatShell`, export `./chat-shell`): el armazón de
  una pantalla de chat en tres zonas por slots —`list`, `header`, el hilo como
  `children` y `composer`—, sin estado, con el scroll solo en el hilo y una
  maqueta que cae a una columna por debajo de `--breakpoint-lg`. Tokens propios
  con par oscuro.
- **`Textarea` gana la variante `bare`**: el campo renuncia a borde, fondo,
  aire, altura mínima, asa de redimensionado y anillo de foco para que los
  dibuje el contenedor que lo enmarca. Nueve tokens `textarea.bare-*`.
- **La cola del globo.** `MessageBubble` estrena una cola triangular que nace en
  la esquina inferior del lado del emisor. Como el globo no tiene relleno, la
  cola tampoco: dos triángulos superpuestos, el exterior del color del borde y
  el interior del color de la superficie (`tail-fill`), que la vacía e
  interrumpe el borde del globo donde nace. Tamaño por `tail-size`.
- **Tokens propios para `UserMessage` y `AssistantMessage`** (JSON nuevos, con
  par oscuro): antes tiraban del `message-bubble.font-family` del vecino y de
  `--font-size-1`, `--color-grey-dark` y `--spacing-1` globales.
- **Props nuevas**: `locale` y `timestampFormat` en `UserMessage`,
  `AssistantMessage` y `ConversationThread`; `helperText` y `rows` en
  `MessageComposer`; `listLabel` en `ChatShell`. `className`, `...rest` y
  `forwardRef` en los seis componentes de la familia.

### Cambiado

- **El globo es contorno, no relleno.** Rectángulo de 1px con las cuatro
  esquinas rectas y una sola tinta, con par claro/oscuro. Al emisor lo
  distinguen la alineación y la cola. El prusia del globo del usuario
  desaparecía sobre superficie oscura y llenaba el hilo de color.
- **`ConversationThread` respeta `prefers-reduced-motion`** en el autoscroll:
  consulta la media query en JS —a un `scrollIntoView` no le llega ningún token
  CSS— y baja de golpe para quien ha pedido menos movimiento.
- **`MessageComposer` deja de pisar el `Textarea` desde fuera.** Fuera las cinco
  reglas `.message-composer .textarea { border: none; box-shadow: none;
  min-height: unset }`; el campo va en variante `bare` y el marco, el fondo y el
  anillo de foco (`:focus-within`) los dibuja el composer. El `1px` cableado del
  borde sale de `border-width`.
- **`MessageComposer` enseña su atajo**: `Enter` envía y `Mayús + Enter` salta
  de línea, escrito bajo el marco con `Kbd` y enlazado al campo por
  `aria-describedby`.
- **`ConversationList` tenía cinco custom properties que no existen en el
  sistema** (`--font-size-body`, `--font-family-ui`, `--color-focus`,
  `--motion-ease-default`, `--color-grey`): la tipografía caía en la del
  navegador y **los tres anillos de foco no se pintaban**. Todas salen ya de
  tokens propios con par oscuro.
- **El aspa de `ConversationList` es alcanzable por teclado.** Llevaba
  `tabIndex={-1}` y una regla `:focus-visible` que no podía dispararse: borrar
  una conversación era imposible sin ratón. Ahora está en el orden de
  tabulación, mide la talla mínima (32px) y se ve siempre con puntero grueso.
- **Los estados de `ConversationList` dejan de ser grises.** Bajo el puntero la
  fila se rellena de marca y voltea la tinta, como en el `SidebarNav`; la
  conversación abierta se dice con tinta plena y peso, sin fondo. `item-color`
  pasa de `grey-dark` —que no es un color de texto— a `text.muted-on-light`.
- **El nombre del modelo sube a tinta plena** en `AssistantMessage`: firma la
  respuesta, no es un dato de segunda fila.
- Doc: MDX nuevas en `MessageBubble`, `UserMessage`, `AssistantMessage`,
  `ConversationThread`, `MessageComposer`, `ConversationList` y `ChatShell`;
  sección `bare` en `Textarea.mdx`; tabla de internacionalización al día.
  Stories en castellano con story «En superficie oscura» en los siete y tests de
  contrato `!dev`. `MessageComposer.test.tsx` y `ConversationList.test.tsx`
  nuevos.

## v25.0.0

### Eliminado (breaking)

- **Fuera `sonner`.** El motor de la cola de avisos pasa a ser
  `@base-ui-components/react/toast`, el mismo motor de conducta que el resto del
  sistema. `sonner` desaparece de `dependencies`, de `peerDependencies` y del
  `dist`: el paquete ya no lo reexporta (`export { toast } from 'sonner'`) ni lo
  arrastra ninguna salida.
- **`Toaster` pierde la prop `theme`.** Era la sincronización de tema de sonner;
  el modo oscuro sale de la cascada de tokens (`.surface-dark`,
  `[data-theme="dark"]`, `html.dark`).
- **Las firmas de sonner que no eran del sistema no se han portado**:
  `toast.custom()`, las opciones de presentación por aviso (`icon`, `cancel`,
  `className`, `style`, `richColors`, `position`, `unstyled`) y el par
  `onDismiss`/`onAutoClose`, que se unifica en un solo `onClose`. `toast.message`
  sobrevive como alias del aviso neutro.
- **Migración para las apps**: `import { toast } from 'sonner'` →
  `import { toast } from '@studiolxd/brand/toast'`. La tabla completa está en
  `Toast.mdx` § «Migración desde sonner».

### Añadido

- **`@studiolxd/brand/toast`**, punto de entrada nuevo con el manager de avisos:
  `toast(msg)`, `toast.message|success|error|warning|info|loading(msg, options)`,
  `toast.dismiss(id?)` y `toast.promise(promise, { loading, success, error })`.
  Cada llamada devuelve el `id` del aviso; reutilizar un `id` vivo **actualiza el
  aviso en su sitio** en vez de apilar otro (el patrón
  `const id = toast.loading(…)` → `toast.success(…, { id })`). Opciones:
  `id`, `description`, `duration` (`Infinity` deja el aviso fijo), `action`
  (`{ label, onClick }`) y `onClose`.
- **`Toast`: rol ARIA por intención.** Lo que sonner no permitía: `error` y
  `warning` interrumpen (`role="alertdialog"` y anuncio asertivo) y el resto
  informa sin interrumpir (`role="dialog"` en región `aria-live="polite"`). Es el
  mismo criterio que el `role` por variante del `Alert`.
- **`Toast`: acción opcional** — un `Button` ghost bajo el texto, montado sobre
  `Toast.Action` con `render`.
- Tokens nuevos del apilado y del movimiento: `toast.gap`, `toast.stack-offset`,
  `toast.stack-scale` y `toast.enter-scale`. El apilado lo dibuja ahora el CSS a
  partir de las alturas que mide el motor, así que `gap` es a la vez prop y
  token (la prop viaja como custom property).

### Cambiado

- **`Toast`: el aspa vuelve a ser un `Button` ghost.** Con sonner el elemento lo
  montaba el motor y había que reproducir su cara a mano; ahora `Toast.Close`
  monta el `Button variant="ghost" size="sm" iconOnly` del sistema con `render`,
  y desaparecen las reglas `.toast__close` que imitaban al ghost. El motor oculta
  el aspa al lector de pantalla mientras la pila está recogida (`aria-hidden`) y
  la descubre al desplegarla con el ratón o con el foco.
- **`Toast`: la pila se alcanza con F6** (el atajo de Base UI), que lleva el foco
  a la región y la despliega.
- `Toaster`: `visibleToasts` pasa a ser el `limit` del motor y `expand` una clase
  del CSS; el resto de props (`position`, `containerAriaLabel`, `closeLabel`,
  `closeButton`, `duration`, `gap`) mantiene su firma y sus defaults castellanos.
- Doc y pruebas: `Toast.mdx` estrena «Acción», «Espera», «API del manager» y
  «Migración desde sonner»; stories nuevas de acción y de espera; el test de
  componente cubre auto-cierre con timers falsos, cierre manual, acción,
  actualización por `id`, `dismiss` y rol por intención.

## v24.11.0

### Cambiado

- `CommandPalette` deja de envolver **cmdk**, que arrastraba
  `@radix-ui/react-dialog`, `react-primitive` y `react-id` al bundle publicado
  pese a que CLAUDE.md prohíbe Radix en el DS. Se reescribe sobre el `Modal`
  del sistema (Base UI Dialog) + `Autocomplete` de Base UI en modo `inline`.
  **La API pública no cambia**: `open`, `onOpenChange`, `groups`, `title`,
  `placeholder`, `emptyLabel`, `listLabel`, `closeLabel`, `shortcut` y
  `className` siguen igual, y los ítems mantienen `id`, `label`, `icon`,
  `onSelect`, `keywords` y `disabled` — los 8 consumidores de la suite suben
  de versión sin tocar nada. Lo que sí cambia es el DOM interno y los tokens,
  que son detalle de implementación (el CSS de componente no se expone):
  - `[cmdk-group-heading]` → `.command-palette__heading`.
  - `.command-palette__item[data-selected="true"]` →
    `[data-highlighted]`; `[data-disabled="true"]` → `[data-disabled]`.
  - Fuera `.command-palette__separator` y sus tokens
    (`command-palette.separator-height|-color|-margin-block` y
    `surface-dark-separator-color`): la regla existía pero el componente nunca
    renderizó un separador.
  - `command-palette.list-padding` se desdobla en `list-padding-block` /
    `list-padding-inline` (regla de ejes inline/block).
- `cmdk` sale de `dependencies`.
- `CommandPalette` sale de «Por revisar»: su título pasa a
  `Molecules/CommandPalette`.

### Añadido

- `CommandPalette`: prop `locale` (default: el del entorno) para fijar el
  idioma con el que `Intl.Collator` compara al filtrar.
- `CommandPalette`: MDX con anatomía, teclado, tokens, accesibilidad y
  «Migración desde cmdk»; stories «Con grupos» y «En superficie oscura»; dos
  stories de test (`!dev`) y `CommandPalette.test.tsx` con 13 casos
  (filtrado con y sin acentos, keywords, grupos vacíos, región viva, ↑↓,
  Home/End, Enter, ratón, deshabilitados, Escape y el atajo ⌘K).

## v24.10.0

### Cambiado

- `Arrow`: exporta `ArrowProps` desde `src/index.ts` (único átomo de este
  bloque que no lo hacía). Token huérfano `width-default` (duplicaba
  `width-md`, sin consumidores) retirado. MDX con anatomía, superficie oscura
  y accesibilidad.
- `Breadcrumb`: `renderLink` reenvía ahora todas las props que recibe
  (`{...props}`, tipo extendido con `AnchorHTMLAttributes<HTMLAnchorElement>`),
  en vez de recomponer solo `href`/`children`/`className`. `border-radius` del
  foco pasa de `2px` cableado a `border-radius.default`. `font-size` pasa de
  `font-size.1` fijo a `text.paragraph.small.font-size` (texto de navegación,
  respira en `SiteShell`). Doc MDX y stories de contrato/superficie oscura
  nuevas.
- `EmptyState`: `title-color`/`description-color` dejan de ser `grey-dark`
  (texto prohibido) y pasan a `color.text.muted-on-light`, con par
  `surface-dark-*` nuevo — antes no tenía ningún token oscuro y quedaba
  ilegible sobre `.surface-dark`. `icon-size` se unifica con `icon.size-lg`
  (48px); las stories con icono pasan de `size="xl"` a `size="lg"` para
  coincidir. Doc MDX nueva.
- `Tabs`: hover de la variante pill —antes `rgba(0,0,0,.06)` cableado— pasa a
  tokens `trigger-pill-hover-bg`/`-color` con relleno de marca (mismo patrón
  que `Menu`/`Button ghost`) y par oscuro; el foco —antes `outline: … solid
  2px` / `outline-offset: 2px` a mano— usa `focus-ring-width`
  (`border-width.focus`) + `focus-ring-offset` (`border-width.default`); la
  opacidad del trigger deshabilitado pasa de `0.4` cableado a
  `opacity.disabled`; `trigger-color` pasa de `grey-dark` a
  `color.text.muted-on-light`. Se añaden los pares `surface-dark-*` que
  faltaban para el pill activo y el indicador underline (`color.primary`
  colisionaba con el fondo de `.surface-dark`, ambos prusia). Doc MDX y
  stories de contrato/superficie oscura nuevas.

## v24.9.0

### Cambiado

- `Tooltip`, `Table`, `AppLauncher` y `PrevNextNav`: `calc(var(--…-transition-duration) * 1ms)`
  anulaba la animación (el token ya trae `ms`, así que el `calc` daba `ms²`,
  inválido). La propiedad toma ahora el token tal cual, como ya hacía
  `Popover`. `Modal` no tenía el patrón; `Skeleton` se deja intacto porque su
  duración es un número sin unidad por diseño.
- Decorator `withSurface` (`.storybook/preview.tsx`): en vez de envolver la
  story en `<div class="surface-dark">` —que no llega a los portales
  (`Popover`, `Menu`, `Tooltip`, `Modal`, `Select` renderizan en
  `document.body`)— pone `data-theme="dark"` en `document.documentElement`.
  Story «En superficie oscura» en `Popover`, ahora honesta.
- `DatePicker`: nueva prop `calendarLabel` (default «Calendario») que da
  nombre accesible al panel del calendario (antes `role="dialog"` sin
  nombre); `DatePickerField` usa el `label` del campo como nombre del panel
  por defecto.
- `DescriptionList`: por debajo de `--breakpoint-md` término y descripción se
  apilan en una columna (antes `max-content 1fr` apretaba el valor con
  términos largos en móvil); story «Estrecha».
- Nuevos roles semánticos `surface.secondary-on-light|on-dark` y
  `surface.inverse-on-light|on-dark` para los usos de `grey-lightest` /
  `grey-darkest` como superficie (no como estado): `kbd.bg`,
  `progress-bar.track-bg`, `code-block.bg` y `tag.neutral-bg` apuntan ahora al
  rol en vez de al primitivo — mismos valores resueltos, sin cambio visual.
  Documentados en Foundations/Colores.

## v24.8.0

### Cambiado

- `Toast` sale de `Por revisar/` (`Molecules/Toast`) y deja de duplicar al
  `Alert`: **son el mismo objeto con distinta vida**. La tarjeta del aviso monta
  ahora las clases y el juego de tokens del alert (`alert`,
  `alert--<intención>`, `alert--dismissible`, `alert__title`,
  `alert__description`), así que relleno, borde, aire, tipografía y las cuatro
  intenciones son literalmente los mismos y se personalizan con `alert.*`.
  `toast.*` se queda solo con lo suyo: capa, posición, apilado y movimiento.
- `Toaster`: props nuevas `closeLabel` (etiqueta accesible del aspa, «Cerrar»),
  `closeButton`, `duration` (5000ms, el reloj se para con el puntero o el foco
  dentro), `gap`, `visibleToasts` y `expand`. `containerAriaLabel` estrena
  default castellano («Notificaciones»; antes caía en el «Notifications» del
  motor). `'use client'` explícito.
- `Toast`: el aspa deja de llevar color cableado —fuera el
  `rgba(255, 255, 255, .15)` del hover y el `color-mix(… 8%)` de la variante
  `warning`—; reproduce la cara del `Button` ghost con los tokens del alert
  (tinta del título, que voltea sola con la intención, e inversión contra el
  relleno en hover) y mide `alert.close-size` (32px). Los `--spacing-*` sueltos
  del CSS salen también de tokens del alert.
- `Toast`: `dist/toaster.css` incluye ahora el CSS del `Alert`, del que la
  tarjeta depende de verdad. Sin esto, un consumidor que importara solo el
  entrypoint `./toaster` se quedaba con la capa pero sin tarjeta.
- `Toast`: la pila no se sale por el lado en ventanas estrechas — su anchura es
  `min(toast.max-width, ancho de la ventana − aire lateral)`.
- Doc: `Toast.mdx` nueva (anatomía, montaje, intenciones, apilado, auto-cierre,
  superficie oscura, tokens y accesibilidad) y `Toast.test.tsx` nuevo
  (auto-cierre, `duration: Infinity`, cierre manual, `closeLabel`, la tarjeta es
  un alert, `containerAriaLabel`). Stories en castellano con contratos `!dev`.
- Doc: `Alert.mdx` § «Superficie oscura» recoge la decisión explícita — en
  oscuro el relleno del aviso neutro sigue siendo prusia y el borde es el único
  separador; **no se añade un neutro oscuro a la paleta**.
- Doc: `Kbd.mdx` estrena § «Medida» con el porqué de derivar la altura del texto
  (`cuerpo × interlineado + 2 × aire + 2 × borde`, como `textarea.min-height`) y
  de no alinearla a los 32px de los controles: un keycap es una marca inline, no
  un control, y a 32px `sm` y `md` colapsarían en la misma medida.
- Doc: `Foundations › Internacionalización` añade `Toaster`.

### Eliminado

- Tokens `toast.*` que duplicaban a `alert.*`, **breaking para quien los
  sobrescribiera** (ninguna app de la suite lo hacía; verificado por `grep`):
  `padding-block`, `padding-inline`, `border-radius`, `border-width`, `shadow`,
  `bg`, `border-color`, `title-font-size`, `title-font-weight`, `title-color`,
  `description-font-size`, `description-color`, `close-color`,
  `close-hover-color`, `close-size`, y los juegos completos `success-*`,
  `error-*` y `warning-*`. Su equivalente es el token `alert.*` del mismo
  nombre.
- Tokens `toast.width`, `toast.inset-block-end`, `toast.inset-inline-end` y
  `toast.gap`, renombrados o retirados: la anchura es ahora `toast.max-width`,
  las distancias al borde son `toast.inset-block` / `toast.inset-inline` (valen
  para las cuatro esquinas) y el aire entre avisos apilados pasa a ser la prop
  `gap` del `Toaster`, porque el apilado lo calcula el motor de la cola en JS.

## v24.7.0

### Cambiado

- `Accordion`: el separador entre ítems deja de ser `currentColor` y pasa a
  `accordion.border-color` (`color.primary`), con par oscuro; el anillo de foco
  usa el rol `focus` también para su separación y estrena
  `surface-dark-focus-ring-color`. Tipos (`AccordionProps`, `AccordionItemProps`,
  `AccordionTriggerProps`, `AccordionContentProps`) exportados. Doc MDX nueva y
  `Accordion.test.tsx`.
- `Tag`: los tokens de variante dejan de nombrar primitivos —`info-bg` y
  `warning-bg` pasan a `color.primary` y `color.accent-2`, los textos a
  `color.text.on-dark|on-light`—. Mismos valores resueltos: un componente nombra
  un rol, no un color. Doc MDX con anatomía, oscuro y matriz de contraste.
- `Kbd`: `min-size` (y sus `sm-`/`lg-`) dejan de ser números sueltos y salen de
  `cuerpo × interlineado + 2 × aire + 2 × borde`, así una tecla de un carácter
  es cuadrada en las tres tallas (24 / 26 / 38px); `lg-font-size` sube de 16 a
  20px. Fuera el token huérfano `kbd.shadow` (el relieve lo da el borde). El
  átomo reenvía props del `<kbd>` y `className`, con `forwardRef`.
- `List`: el aire entre ítems lo pone el ítem (`li + li`) en vez de un `gap` de
  flex sobre la lista. Reenvía props del elemento y `className`, con
  `forwardRef`; `ListProps` y `ListType` exportados. La tabla de tokens oscuros
  del MDX sale del JSON (antes era un token escrito a mano inexistente).
- `Popover`: la animación no ocurría —`animation-duration` tomaba
  `calc(var(--popover-transition-duration) * 1ms)` y el token ya trae `ms`—;
  ahora usa el token tal cual. Prop `label` para dar nombre al panel
  (`role="dialog"`), `sideOffset` por defecto desde el token nuevo
  `popover.offset`, anillo de foco propio con par oscuro y fuera el token
  huérfano `popover.shadow`. `'use client'`. `Popover.test.tsx` nuevo.
- `DescriptionList`: el término (`<dt>`) estrena tokens propios `term-*` —antes
  se vestía con `--label-*` directamente— y su par oscuro; CSS con ejes lógicos
  (`border-block-end` / `border-inline-end`). Reenvía props del `<dl>` y
  `className`, con `forwardRef`. Doc MDX nueva.
- `ProgressBar`: `label` es el nombre accesible y trae texto castellano por
  defecto («Progreso») —antes, sin él, la barra no tenía nombre—; añadido
  `aria-valuetext`, `className` al contenedor y token
  `progress-bar.line-height` (el CSS lo llevaba cableado). Doc MDX nueva y
  `ProgressBar.test.tsx`.
- Los siete salen del grupo «Por revisar» del catálogo: `Atoms/Accordion`,
  `Atoms/Tag`, `Atoms/Kbd`, `Atoms/List`, `Atoms/Popover`,
  `Atoms/DescriptionList` y `Atoms/ProgressBar`.

## v24.6.0

### Cambiado

- **`Alert`**: el rol ARIA sale de la intención — `alert` (live assertive) en
  `error` y `warning`, `status` (live polite) en `default` y `success`; la prop
  `role` lo sigue forzando. El botón de cierre es un `Button` ghost `sm`
  iconOnly: objetivo táctil de 32px, anillo de foco del sistema y hover que
  voltea con la superficie del relleno, en vez del `rgba(255, 255, 255, 0.15)`
  y el `color-mix(… 8%)` que llevaba cableados. Su etiqueta accesible es ahora
  la prop `closeLabel` (default «Cerrar»). Tokens nuevos: `alert.gap`,
  `alert.content-gap`, `alert.close-inset`, `alert.title-line-height`,
  `alert.description-line-height`; `alert.close-size` pasa a ser el lado del
  botón (`size-component.sm`). Retirados `alert.close-color`,
  `alert.close-hover-color`, `alert.warning-close-color`,
  `alert.warning-close-hover-color`, `alert.surface-dark-bg` y
  `alert.surface-dark-border-color` (la raíz ya se declara `.surface-dark`, así
  que los valores claros de `bg`/`border-color` nunca se aplicaban);
  `alert.border-color` es blanco. MDX y test de componente nuevos.
- **`CodeBlock`**: el área de código (`<pre>`) es una región focalizable
  (`role="region"`, `tabindex="0"`) con nombre accesible por la prop nueva
  `codeLabel` —función, porque interpola el lenguaje— y anillo de foco propio
  (tokens nuevos `code-block.focus-ring-width|style|offset|color`). El botón de
  copiar ya no se renombra bajo el foco: conserva `copyLabel` y el resultado se
  anuncia en una región `role="status"` con `copiedLabel`. Un portapapeles no
  disponible se captura en vez de dejar la promesa rechazada. Retirado el token
  `code-block.shadow` (heredaba `card.shadow`, que es `none`). El raíz reenvía
  `{...rest}`. MDX corregido: la superficie del bloque es autocontenida y su
  borde **no** hereda el remapeo oscuro de `Card`.
- Ambos salen del grupo «Por revisar» del catálogo: `Molecules/Alert` y
  `Molecules/CodeBlock`. Su story «En superficie oscura» usa el
  `parameters: { surface: 'dark' }` que llegó en v24.5.0.

## v24.5.0

### Añadido

- `Inline` (átomo): fila de piezas con envoltura, hermano horizontal de `Stack`.
  `gap` `sm|md|lg` (tokens nuevos `inline.gap-sm|md|lg` → `spacing.2|4|5`) y
  `align` `start|center|end` (centro por defecto). `div.inline`, sin fondo ni
  semántica. Export `./inline`.
- `NotFoundPage` y `ErrorPage`: prop `shell?: boolean` (por defecto `true`).
  Con `shell={false}` no montan `SiteShell` ni el `main`, solo el contenido
  (`Stack` → `PageIntro` + enlace/acciones), para una app con `AppShell` que ya
  tiene su `main`. Story «Dentro de una app».
- `Hero`: story «En superficie oscura».
- Storybook: el decorator global pasa a llamarse `withSurface` y, además del
  switcher de fondos, lee `parameters.surface = 'dark'` para envolver una story
  en `.surface-dark` (el lienzo del sistema). Patrón documentado en
  `CLAUDE.md` § Storybook.
- Barrel `src/index.ts`: `Container`, `Columns` y `Stack` (antes solo por
  subpath), junto a `Inline`.

### Cambiado

- `Hero` y `ErrorPage` componen su fila de acciones con `Inline` en lugar de un
  flex propio. `.hero__actions` y `.error-page__actions` siguen existiendo como
  clase sobre el `Inline`; `.hero__actions` conserva `hero.actions-space-before`.

### Retirado

- Tokens `hero.actions-gap` y `error-page.actions-gap` (y con él
  `tokens/component/error-page.json`, `ErrorPage.css` y el SCSS
  `components/_error-page.scss`): el aire entre acciones lo pone
  `inline.gap-md`, que resuelve al mismo `spacing.4` (16px), así que la maqueta
  no cambia. Nacieron en v24.2.0/v24.3.0 y no tienen consumidor; por eso va
  como minor y no como major.

## v24.4.0

### Cambiado

- `Spinner`: deja de ser un círculo que gira. Ahora es un cuadrado de solo
  contorno (SVG `<rect>` sin radio, `pathLength="100"`) que se dibuja desde la
  esquina superior izquierda hasta cerrarse y vuelve a empezar; sin rotación.
  Misma API (`size`, `label`, `aria-hidden`) y mismos tokens: `spinner.size-*`
  y `spinner.border-width-*` (ahora grosor del `stroke`);
  `spinner.animation-duration` pasa de 600ms a 1000ms (un ciclo de dibujo).
  Con `prefers-reduced-motion: reduce` no anima: se muestra el contorno
  completo. Elemento interno `.spinner__circle` → `.spinner__square` +
  `.spinner__stroke` (CSS interno, no expuesto). Doc MDX nueva.
- `TypingIndicator`: los tres puntos son cuadrados (sin `border-radius`).
  Tamaño, tokens, ritmo, reduced-motion y API sin cambios; el token
  `typing-indicator.dot-size` conserva su nombre (es el lado del cuadrado).
  Doc MDX nueva.
- `Tooltip`: la separación con el disparador sale del token nuevo
  `tooltip.offset` (`spacing.1`, 4px), leído en runtime sobre `<html>`; la prop
  `sideOffset` sigue como override. Doc MDX nueva y story «Cuatro lados» como
  contrato visual.
- `Spinner`, `TypingIndicator` y `Tooltip` pasan a definitivos: salen de
  «Por revisar» en Storybook (`Atoms/…`).

### Corregido

- `Tooltip` con `side="left"`/`"right"`: la flecha giraba 90° sobre el centro
  de su caja 10×5 y quedaba flotando 2,5px separada del bocadillo (y metida en
  el disparador). Un `translate` de ±25% la devuelve al borde. Test de
  geometría para los cuatro lados.

## v24.3.0

### Añadido

- `ErrorBoundary` (átomo): límite de error de React sin cara ni tokens.
  `children`, `fallback` (por defecto `null`) y `onError`. Componente de clase
  cliente: si un hijo lanza al renderizar, pinta el fallback y el resto del
  árbol sigue vivo.
- `NotFoundPage` (plantilla): el 404 de un sitio público. `SiteShell` con
  `header`/`footer` opcionales —cada uno dentro de su `ErrorBoundary`— y un
  `main` (`Container` `space="xl"`, `id="main-content"`, `tabIndex={-1}`) con
  `PageIntro` (`title`, `description`) y `homeLink` (el `Link` del producto).
- `ErrorPage` (plantilla): «algo ha salido mal», misma maqueta que
  `NotFoundPage` con una fila de `actions` (Button «Reintentar» + enlace «Ir al
  inicio») en lugar del enlace de vuelta. Regla documentada: en `error.tsx`
  cabecera sin auth y pie; en `global-error.tsx` ninguno. Token nuevo
  `error-page.actions-gap`.
- Exports `./error-boundary`, `./not-found-page` y `./error-page`.

## v24.2.0

### Añadido

- `Hero` (sección): cabecera de portada de un sitio público. `Container`
  `section` a ancho `xl` con aire `2xl`; `title` como `Heading` de nivel 1 a
  talla 10, `description` opcional como `Paragraph size="large"` y `actions`
  opcional (botones en fila con envoltura). Título y frase limitados a
  `--content-measure` (primer consumidor del token). Sin color propio: el fondo
  lo pone la superficie. Tokens nuevos `hero.actions-gap` y
  `hero.actions-space-before`.

## v24.1.0

### Añadido

- `SiteNav`: cada ítem admite `target` y `rel`. Con `target="_blank"` y sin
  `rel` explícito se aplica `rel="noopener noreferrer"`. Ambos viajan también
  en las props que recibe `renderLink` (`SiteNavRenderLinkProps`), así que el
  enlace del router del producto debe reenviarlos. Caso de uso: una entrada del
  menú que vive en otro dominio (estado del servicio) y abre en pestaña nueva.

## v24.0.0

### Eliminado (breaking)

Fuera todo el legado de la web de studiolxd.com: la suite no lo consume y el DS
deja de arrastrarlo.

- **Secciones**: `ClientsSection`, `ContactSection`, `CoursesSection`, `Footer`,
  `HighlightSection`, `MethodologySection`, `ProjectsSection`, `ReviewsSection`,
  `SolutionsSection`. El pie público vigente es `LegalFooter`.
- **Organismos**: `ProjectCarousel`, `ProjectGrid`, `ReviewCarousel`,
  `PricingCard`, `Steps`.
- **Moléculas**: `ProjectCard`, `CardSplit`, `CardSquare`. Para tarjetas, `Card`.
- **Átomos**: `Carousel`, `HeroVideo`, `Highlight`. La prop `size` de `Highlight`
  desaparece de la escala de títulos documentada en Foundations.
- **Tokens**: `carousel.*`, `card-split.*`, `card-square.*`, `clients-section.*`,
  `contact-section.*`, `footer.*`, `highlight-section.*`, `methodology-section.*`
  y `pricing-card.*` — con sus CSS/SCSS generados (`components/carousel`,
  `components/card-split`, `components/card-square`, `components/clients-section`,
  `components/contact-section`, `components/footer`,
  `components/highlight-section`, `components/methodology-section`,
  `components/pricing-card`). Los tokens `section.*` (`--section-padding-*`) se
  quedan: los consumen `Container` y `SiteHeader`.
- **Exports CSS de sección**: `./clients-section.css`, `./contact-section.css`,
  `./courses-section.css`, `./footer.css`, `./highlight-section.css`,
  `./methodology-section.css`, `./projects-section.css`, `./reviews-section.css`,
  `./solutions-section.css` — ya no queda ningún CSS de sección suelto.
- **Exports de componente**: `./carousel`, `./hero-video`, `./highlight`,
  `./card-split`, `./card-square`, `./project-card`, `./project-carousel`,
  `./project-grid`, `./review-carousel`, `./pricing-card`.
- **Dependencias**: `embla-carousel`, `embla-carousel-react` y
  `embla-carousel-auto-scroll` (solo las usaban los carruseles).

## v23.0.0

### Eliminado (breaking)

- `Header` (la cabecera legacy de studiolxd.com), sus tokens `header.*`
  (`--header-height-overlay/inline`, `--header-nav-*`…) y `header.css`.
  La cabecera pública es `SiteHeader` + `SiteNav`.
- Plantillas de página `Home`, `Content`, `Article` y `Legal` (montaban el
  `Header`; ningún producto las consumía) y sus CSS `article-template.css`,
  `content-template.css`, `legal-template.css`. Las secciones que usaban
  (`ClientsSection`, `Footer`…) siguen.

## v22.6.1

### Corregido

- `SiteHeader`, `Header` y `Sidebar`: el logo enlazado tampoco lleva línea en hover (la
  regla de hover de la base empataba en especificidad y ganaba por orden).

## v22.6.0

### Cambiado

- Títulos con su propio aire por debajo: `h1`…`h6` (y `Heading`) llevan
  `margin-block-end: var(--text-heading-space-after)` (`0.5em`, escala con el
  tamaño del título); se anula cuando el título es el último hijo. Antes iban
  sin margen y cada contenedor ponía un `gap` fijo.
- `PageIntro` deja el `gap`: el aire título→frase lo pone el título; entre la
  frase y `children`, `--spacing-3`.

### Corregido

- `Sidebar`: el logo enlazado (`<a>` en el slot `logo`) ya no lleva la línea
  de enlace, como en `SiteHeader`.

### Eliminado

- Token `--page-intro-gap` (y su export `tokens/molecules/page-intro`).

## v22.5.1

### Corregido

- `Stack`: las piezas miden lo suyo (`align-items: flex-start`); un enlace de
  vuelta no se estiraba a todo el ancho de la columna.

## v22.5.0

### Añadido

- `Stack` (átomo de maquetación): apila piezas con aire por token (`gap-md/lg`)
  y `mobileOrder="reverse"` (por debajo de `md`, la última pieza arriba; solo
  orden visual). Es el envoltorio explícito de una celda de `Columns` con varias
  piezas. Export `./stack`.

### Cambiado

- `PageIntro` ya no pone aire por debajo (`margin-block-end` retirado): lo pone el
  `Stack` que lo agrupa con lo que le sigue.

## v22.4.3

### Corregido

- `Form`: sin aire encima de las acciones cuando son lo primero (formulario
  solo de acciones); en `blockActions` la acción principal (última del JSX)
  queda arriba.

## v22.4.2

### Corregido

- `PageIntro` pone el aire por debajo cuando algo le sigue en la columna
  (`margin-block-end`), en vez de ponerlo el elemento que sigue.

## v22.4.1

### Corregido

- Texto de ayuda de los campos en oscuro: blanco (16 fields lo tenían aún en
  `text.muted-on-dark`). Fuera `columns.cell-gap`.

## v22.4.0

### Cambiado

- `Columns`: solo se desenvuelve el Fragment cuando es TODO el contenido; un
  Fragment entre otras hijas es una celda (agrupa varias piezas, apiladas con
  `cell-gap`). Antes cada hija del Fragment anidado pasaba a ser una columna.

## v22.3.0

### Cambiado

- `PageIntro`: la frase bajo el título es una entradilla (`Paragraph size="large"`,
  un peldaño por encima del cuerpo); `children` sigue en cuerpo normal.

## v22.2.1

### Corregido

- `Link` `tone="ink"`: faltaba la regla CSS (solo estaban los tokens), así que
  en oscuro salía amarillo como los `accent`.

## v22.2.0

### Añadido

- `Link` con `tone`: `accent` (por defecto: texto y acciones) e `ink` (utilitario:
  legal, volver, ¿olvidaste la contraseña? — tinta, línea en reposo y ninguna en
  hover, igual en claro y oscuro). Tokens `link.ink-*`. `LegalFooter` usa `ink`
  (fuera sus tokens de enlace propios de v22.1.0).

## v22.1.0

### Cambiado

- Enlaces en superficie oscura: amarillo (`accent-2`), sin línea en reposo y
  con línea en hover (`link.hover-underline-width`, `surface-dark-underline-width`,
  `surface-dark-hover-underline-width`). En claro, como antes.
- `LegalFooter`: excepción explícita — enlaces en tinta (blanco en oscuro),
  línea en reposo y ninguna en hover (`link-color`, `link-underline-width`,
  `link-hover-underline-width`).
- `SiteNav`: hover en oscuro a `accent-2`; más aire entre la cabecera del grupo
  y sus enlaces (`label-margin-block-end` = `spacing.4`).

## v22.0.2

### Corregido

- `OtpInput` admite `aria-labelledby` (el grupo se nombra por la etiqueta
  visible del `OtpField`); v22.0.1 lo pasaba sin que el átomo lo aplicara.

## v22.0.1

### Corregido

- `OtpField`: el grupo se nombra por `aria-labelledby` con la etiqueta visible,
  no con un `aria-label` duplicado (los tests por etiqueta encontraban dos).

## v22.0.0

### Rompe

- **Los 14 fields restantes pasan a definitivos** con el contrato completo
  (`id`/`useId`, `label` + `labelHidden`, `helperText`, `error`+`errorMessage`,
  `aria-describedby`/`aria-invalid`, `className` al contenedor, `forwardRef` al
  control real y `name`): RadioField, SwitcherField, SelectField,
  NumberInputField, InputPhoneField, OtpField, FileUploadField, MultiSelectField,
  AsyncSelectField, AsyncMultiSelectField, DatePickerField, DateTimeField,
  TimeField, y DropdownField gana ayuda y error. Cada uno con `Contrato`,
  `ContratoTallas` y `ConReactHookForm` (FormProvider + FormField reales).
- Átomos: Radio y Switcher estrenan `error`; NumberInput, InputPhone, OtpInput,
  FileUpload, Select, MultiSelect, AsyncSelect, AsyncMultiSelect, DatePicker y
  TimeSelect pasan a `forwardRef` con passthrough nativo y `name`
  (`describedBy`/`ariaLabel` deprecados). Fuera `multi-select.icon-size`,
  `multi-select.focus-ring-offset`, `select-field.error.border-color` y
  `time-select.error-border-color` (crudos o duplicados).
- `labelHidden` pasa a `false` por defecto en NumberInputField, InputPhoneField,
  FileUploadField, DatePickerField, DateTimeField y TimeField. El DOM de
  RadioField/SwitcherField cambia (raíz que apila; `__control` para marca+texto).
- `SiteNav`: la página actual ya no va en negrita (`item-current-font-weight` =
  `default`); la marca `aria-current`.

### Corregido

- A11y de los campos: el disparador del MultiSelect se nombra por
  `aria-labelledby`; los Async* no pisan la etiqueta con el placeholder;
  TimeField y DateTimeField nombran un `role="group"`; FileUpload lleva ayuda y
  error a la zona de arrastre; TimeSelect ya no salta de no controlado a controlado.

## v21.1.1

### Corregido

- `SiteNav`: la línea de hover ya no desplaza el contenido (el sitio se reserva
  siempre) y va más pegada al texto (`item-underline-offset` = 2px).

## v21.1.0

### Añadido

- `Form` `success`: el mensaje que sustituye al formulario al enviarlo, como
  texto anunciado (`role="status"`, tokens `form.success`), sin caja; mantiene
  `links`. Las páginas de contacto y verificación lo usan en vez de un `Alert`.

## v21.0.0

### Rompe

- `src/stylesheets/surface.css` **retirado**: era el último CSS del DS
  anterior (bordes de error en blanco, disabled a mano, separadores del Form,
  `.surface-light`, `form-spacer`…). Todo el modo oscuro sale ahora de tokens
  `surface-dark-*` de cada componente; los estados deshabilitados de `Input`,
  `Textarea` y `Checkbox` ganan sus tokens oscuros. `.surface-light` deja de existir.
- `.surface-dark` es un **lienzo**: fija fondo y color emparejados (`base.css`),
  como el `body`. Sin esto, el texto que solo hereda (párrafos, enlaces) seguía
  en el color del body dentro de una superficie oscura anidada.

## v20.2.1

### Corregido

- `surface.css` conservaba reglas de la técnica de separadores del `Form`
  anterior (`.surface-dark .form__fields > … { --input-border-color: fondo }`):
  en superficie oscura los campos de un formulario salían sin borde. Fuera.

## v20.2.0

### Añadido

- `TextareaField` reenvía `ref` y las props nativas al `<textarea>` (react-hook-form), como `InputField`.
- Storybook: `Pages/Contacto`; la sección pasa a llamarse «Páginas públicas».

## v20.1.2

### Corregido

- La anulación de la línea de los enlaces (`padding-block-end: 0`) pisaba el
  padding propio en 11 componentes (SkipLink, Menu, Card, Pagination, UserMenu,
  OrgSwitcher, SidebarNav, AppLauncher, CalendarRoster, PricingCard, Header):
  el SkipLink salía sin aire abajo. Retirada donde el componente ya fija su padding.

## v20.1.1

### Corregido

- `SkipLink`: el anillo de foco iba en el color del texto del relleno (blanco
  en claro, prusia en oscuro), invisible sobre la página. Ahora es la tinta de
  la superficie, a 4px, como en los botones.

## v20.1.0

### Cambiado

- Anillo de foco de `Button`: por fuera, a 4px del botón (`button.focus-ring-offset`
  = `spacing.1`), en la tinta de la superficie en todas las variantes — el
  `primary` deja de usar el lavanda (invisible sobre sí mismo). El hueco es el
  fondo, y así se lee como foco y no como un borde más.

## v20.0.1

### Corregido

- El estado de error de `Input`/`Textarea` en oscuro: fondo del lienzo, texto y
  placeholder blancos (tokens `surface-dark-error-*`; antes solo lo cubría
  `.surface-dark` a mano, no `html.dark`).
- Todos los fields marcan el control en error también cuando solo llega
  `errorMessage` (PasswordField, InputPhoneField, TimeField, DateTimeField,
  DatePickerField; los de selección en su contenedor). `Select`, `MultiSelect`,
  `AsyncSelect`, `AsyncMultiSelect` y `TimeSelect` ganan borde de error
  (`error-border-color` + variante oscura).

## v20.0.0

### Rompe

- **Dos superficies de lectura**, documentadas en Foundations → Tipografía:
  aplicación (base) cuerpo 16 / controles `md`; pública (`SiteShell`) cuerpo 20 /
  controles `lg`. En público los títulos suben un peldaño (H1 56 … H6 20) y los
  peldaños del párrafo también.
- `Paragraph size="large"` pasa a ser un peldaño sobre el cuerpo (20 en base,
  24 en público; antes 24 fijo); `small` un peldaño por debajo (14 / 16).
- Los componentes de texto **heredan** el cuerpo de la superficie en vez de fijar
  16px: alert, toast, modal, empty-state, description-list, table, prev-next-nav,
  file-upload, message-bubble, form (`success`; `error`/`helper` = párrafo
  pequeño). `LegalFooter` pierde su token de tamaño y hereda. Los componentes de
  interfaz (campos, botones, menús, kbd, tabs, calendarios…) conservan su talla.
- Mecanismo: `src/tokens/surface-public.css` (generado en `build:tokens`)
  redeclara bajo `.site-shell` todo token que dependa del cuerpo o la escala —
  un `var()` dentro de una custom property se resuelve en `:root`, así que
  remapear `--text-font-size` no bastaba. Documentado en `CLAUDE.md` del repo.
- `text.json`: descripciones corregidas (el cuerpo es 16px, no 18).

### Corregido

- Foundations → Tipografía: el bloque «Estilos de texto» estaba roto.

## v19.12.0

### Añadido

- `Form` `blockActions`: acciones (y botones de `alternatives`) a todo el ancho y
  apilados también en escritorio.

### Cambiado

- Sin `text-decoration: underline` en ningún enlace del sistema: el hover de
  `SiteNav` (claro), `LanguageSwitcher` y `ThemeSwitcher` en lista y
  `Pagination` usan la línea de los enlaces (`link.underline-*`);
  `site-nav.item-hover-line-width` (0 en oscuro, donde cambia el color).
- Placeholders en tinta: prusia sobre claro, blanco sobre oscuro (`input`,
  `textarea`), también en error. Foundations → Colores actualizado.

## v19.11.1

### Corregido

- `Form`: el rótulo de las alternativas («O continúa con») no fija talla ni
  color: es texto corriente y hereda los de la superficie (fuera los tokens
  `alternatives-label-*`).

## v19.11.0

### Añadido

- `SiteShell` fija la tipografía de la superficie pública: cuerpo a 20px
  (`site-shell.text-font-size` = `font-size.3`, la talla de los controles `lg`)
  y su interlineado. `AppShell` sigue a la base de 16px.

## v19.10.0

### Cambiado

- Enlaces: el subrayado es una **línea bajo el enlace** (sombra interior con
  `link.underline-width`/`underline-offset`), no `text-decoration`: cubre texto
  e icono, se separa del texto y desaparece en hover. Los componentes que visten
  sus propios enlaces la anulan (`box-shadow: none; padding-block-end: 0`);
  `a.button` queda fuera. Fuera `link.text-decoration`/`hover-text-decoration`.
- Textos de ayuda de los campos en tinta: prusia sobre claro, blanco sobre
  oscuro (`form.helper.color`), no gris.
- `Form`: el rótulo de las alternativas («O continúa con») en cuerpo normal y
  color de texto, no como pista.

## v19.9.1

### Corregido

- `Link` con icono: el subrayado cubre icono y texto (línea bajo el enlace,
  `icon-underline-width`/`-offset`); en hover desaparece, como en el resto.

## v19.9.0

### Cambiado

- Iconos `arrow` y `arrow-left`: la punta es un tercio del largo y abre a 45°
  (la proporción de la flecha de la marca), en trazo.

## v19.8.1

### Corregido

- `Input` y `Textarea`: el autorrelleno del navegador ya no pinta el campo de
  blanco (también en superficie oscura): sombra interior del color del campo y
  color de texto forzado; el anillo de foco en error se conserva.

## v19.8.0

### Añadido

- `Link` con `icon` (+ `iconPosition`) y `render` para el enlace del router del
  producto; icono `arrow-left`; token `link.icon-gap`.
- Storybook: sección `Pages/` con acceso, registro, recuperar contraseña,
  verificar correo y aceptar invitación montadas con el DS.

### Cambiado

- Borde de los campos en error en el color de error (`input`/`textarea`
  `error-border-color`, `error-focus-border-color`, con variante oscura):
  excepción explícita a «bordes en prusia».
- Storybook: fuera las 38 stories «superficie oscura» y «en móvil» sin
  contrato (la barra de fondos y de viewport ya lo hacen); las que afirman algo
  quedan como test `!dev`.

## v19.7.0

### Cambiado

- `SiteHeader`: fuera el marco con borde del panel (tokens `panel-frame-*`
  retirados). El panel vuelve a llevar su aire vertical directamente
  (`panel-padding-block`, `panel-padding-block-end`).

## v19.6.0

### Añadido

- `Form` sin campos (`children` opcional): solo acciones y enlaces.
- `PageIntro` admite `children`: más texto bajo la frase, con el mismo aire.

## v19.5.0

### Añadido

- `PageIntro` (molécula): cabecera de página — título (`Heading` 1) y frase
  opcional con su aire (`gap`). Un `header`; va como celda de `Columns` o en el
  `Container`. Export `./page-intro`.

## v19.4.0

### Añadido

- `Columns` (átomo de maquetación): N celdas iguales en escritorio (2–4),
  apiladas en móvil; `ratio` con dos columnas (`1:1`, `1:2`, `2:1`), `align`,
  `gap`, `stackOrder`. Sin semántica ni fondo: la jerarquía la pone el contenido.
  Export `./columns`.

## v19.3.1

### Corregido

- `PasswordField.action` no es ayuda: enlace en cuerpo normal, a la izquierda,
  con aire propio (`action-margin-block-start`); fuera `action-font-size`.

## v19.3.0

### Añadido

- `PasswordField` admite `action`: una acción bajo el campo, a la derecha
  («¿Olvidaste tu contraseña?»), en cuerpo de ayuda (`action-font-size`).

## v19.2.0

### Añadido

- `FormProvider` admite `translate`: `FormMessage` y `FormRootMessage` pasan por
  ahí los mensajes de error (claves de traducción de una política compartida con
  el servidor, por ejemplo) antes de pintarlos.

## v19.1.0

### Añadido

- `Form`: ranura `captcha` (entre los campos y las acciones, `captcha-margin-block-start`)
  y enlaces secundarios con texto delante (`<Paragraph>¿No tienes cuenta? <Link>Regístrate</Link></Paragraph>`).

## v19.0.0

### Rompe

- `Form` rediseñado: **solo estructura y aire** (tema claro/oscuro por tokens de
  cada pieza). Fuera el perímetro y la técnica de separadores del DS anterior
  (`--form-border-*`, `--form-separator-*`, `--form-heading-*`). Bloques nuevos:
  `links`, `alternatives` (+ `alternativesLabel`); `size` reparte la talla a
  campos y botones por contexto; `errors` es una lista `role="alert"`.
  Las clases `form-errors*` pasan a `form__errors`/`form__error`.
- `LoginForm` (organismo) retirado: los formularios de acceso son del producto
  sobre `Form` + `*Field`.
- Bordes y separadores: siempre prusia sobre claro y blanco sobre oscuro.
  Fuera `grey-light` y los blancos translúcidos en sidebar, app-header, table,
  tabs, kbd, file-upload, calendarios, legal-footer, menú, user-menu y
  org-switcher. `LegalFooter` sin línea.
- `LanguageSwitcher` compacto muestra el nombre del idioma (no el código); fuera
  los tokens `code-*`.

### Añadido

- Talla por contexto: `useFormSize` (`constants/form-size`); todos los `*Field`
  y `Button` toman la talla del `Form` si no se les pasa.
- `InputField` reenvía `ref` y las props nativas al `<input>` (react-hook-form).
- `Menu` con `size` (opciones a la talla del disparador, como el `Select`);
  `DropdownField` y `ThemeSwitcher` la propagan. Icono del valor a la talla del menú.
- `SiteHeader`: ajustes (idioma, tema) pegados abajo del panel, en fila en
  escritorio y apilados en móvil; contenido dentro de un marco con borde y aire
  (`panel-frame-*`, `panel-padding-block-end`); la marca descuenta el aire del
  Container (`logo-margin-inline-start`); hover de `SiteNav` en oscuro a `accent-1`.
- `LegalFooter`: enlaces apilados en móvil (`links-gap-stacked`), cuerpo base.
- `Label` `lg` a 20px (la del control). `PasswordField`: toggle en tinta e icono a
  la talla del campo.
- Storybook: `Form`, `FormField`, `PasswordField`, `CheckboxField`, `Checkbox` y
  `Fieldset` salen de «Por revisar».

### Corregido

- El disparador del `Menu` recibe `aria-expanded`/`data-popup-open` (el chevron
  de los desplegables gira).

## v18.1.0

### Cambiado

- `LanguageSwitcher` compacto: la etiqueta («Idioma») es visible por defecto,
  como la del selector de tema — ahora van juntos en los ajustes del panel.
  `labelHidden` sigue disponible.

## v18.0.0

### Rompe

- `SiteHeader`: la ranura `language` ya no va en la barra; se pinta en los
  ajustes del panel, delante de `settings` (tema) — en fila en escritorio,
  apilados en móvil (`settings-gap`). La barra queda en marca + acciones + menú.
  La API no cambia; cambia dónde aparece.

### Añadido

- `SiteShell`: cabecera, contenido y pie en columna con la altura mínima de la
  pantalla; el pie siempre abajo, scroll del documento. Export `./site-shell`.
- `Label` admite `size` (`sm`/`md` 14px, `lg` 16px); todos los fields con `size`
  se lo propagan a su etiqueta. `CheckboxField`, `RadioField` y `SwitcherField`
  escalan su etiqueta (`sm/lg-label-font-size`).
- `SiteHeader` responsive: por debajo de `md` barra 64 / marca 48
  (`content-height-compact`, `height-compact`); por debajo de `sm` barra 56 /
  marca 40 (`content-height-narrow`, `height-narrow`, `gap-narrow`). La marca de
  la ranura mide lo que la barra le da.

### Corregido

- El panel del `SiteHeader` solo desliza (cortina con `clip-path`), sin fundido.

## v17.1.0

### Añadido

- `DropdownField`, `LanguageSwitcher` y `ThemeSwitcher` admiten `size` (32/40/48).
- Foundations → Tallas: dónde va cada talla — superficies públicas a `lg`,
  interior de las aplicaciones a `md`.

## v17.0.1

### Corregido

- Paneles flotantes (menús, desplegables, popover, tooltip) sobre superficie
  oscura: borde blanco (`text.on-dark`), como el control que los abre; era un
  gris translúcido.

## v17.0.0

### BREAKING

- **`InputField` y `TextareaField` muestran la etiqueta por defecto**
  (`labelHidden` pasa de `true` a `false`, como `SelectField`). Con la etiqueta
  oculta y sin `placeholder`, la etiqueta sigue sirviendo de placeholder.
- **Placeholder en caja normal**: fuera los tokens `input.placeholder-text-transform`,
  `textarea.placeholder-text-transform` y sus pares `error-*`.
- `textarea.min-height` deja de ser un `15rem` suelto: se deriva de
  `textarea.rows` (4) × interlineado × cuerpo + aire + borde, por talla
  (`sm-min-height` / `min-height` / `lg-min-height`).

### Corregido

- Los ítems `radio` de los menús cierran el menú al elegir (`closeOnSelect`
  para dejarlo abierto); Base UI los dejaba abiertos.
- `SiteHeader`: elegir en un menú del panel (tema, idioma) ya no cierra el panel.

## v16.4.0

### Añadido

- `Logo size="xl"` (64px, la talla ilustrativa de la escala de iconos) y
  `MenuButton size="lg"` (48px con el glifo a 48).
- `SiteHeader`: `logoSize` (por defecto `xl`) y `menuButtonSize` (por defecto
  `lg`). La barra mide ahora el logotipo más el aire del sistema: **80px**
  (`site-header.content-height` → `logo.height-xl`); la de aplicación sigue en 56.

## v16.3.0

### Cambiado

- `LanguageSwitcher` compacto es un `DropdownField` (el mismo control que el
  selector de tema), con la etiqueta oculta por defecto (`labelHidden`, `id`).

## v16.2.0

### Cambiado

- **Los campos de texto miden la talla del sistema** (32/40/48), como Button y
  Select: `Input` y todo lo que hereda de él (`NumberInput`, `InputPhone`,
  `OtpInput`, `TimeSelect`, `DatePicker`, `MultiSelect`/`AsyncSelect`/
  `AsyncMultiSelect`, `PasswordField`) fijan `block-size` a la talla; fuera
  `input.padding-block`/`sm-`/`lg-padding-block`. Los triggers con píldoras usan
  `min-block-size` y solo crecen al envolver. `PasswordField`: botón cuadrado a
  la talla del campo. `control.padding-block` queda para lo multilínea.
- `Input`, `InputField`, `Textarea` y `TextareaField` revisados y definitivos
  (tests de altura, `aria-describedby`/`aria-invalid` desde el campo, docs).

## v16.1.1

### Corregido

- `AppRoot`: `children` opcional (puede ir como hermano antes del contenido).

## v16.1.0

### Añadido

- **`AppRoot`**: la raíz de cualquier sitio o app; pone el enlace de salto al
  contenido una vez por documento. `SiteHeader` y `AppHeader` **dejan de pintarlo**
  (fuera `skipLabel`/`skipHref` del SiteHeader); el `main` del `AppShell` es el
  destino (`#main-content`, `tabIndex=-1`).
- **`LegalFooter`**: el pie legal de las aplicaciones (enlaces legales, título
  opcional, `renderLink`, `Container`, `surface="dark"`).
- `SiteHeader`: `logo` (la marca del producto), `renderLogoLink` (router),
  `menuCloseLabel`; sin `children` ni `settings` no se pinta el botón de menú.
- `MenuButton` / `AppHeader`: `closeLabel` / `menuCloseLabel`.
- `ThemeSwitcher variant="icon"`: solo el icono del tema actual, para barras.
- `Pagination`: `mode="cursor"` (anterior/siguiente por `previousHref`/`nextHref`
  o `onPrevious`/`onNext`), `hrefs` precalculados y `pageCount`; `total`, `page` y
  `pageSize` pasan a opcionales.
- `EmptyState` reenvía atributos al contenedor (`role="status"`, `aria-live`).
- `ConversationThread` admite `children`: el producto monta las burbujas y el hilo
  pone contenedor, `role="log"` y autoscroll.

### Cambiado

- `SiteHeader` ya no acepta `skipLabel`/`skipHref` (ver `AppRoot`).

## v16.0.5

### Corregido

- `@base-ui-components/react` es externo del build (como react-hook-form y
  sonner): empaquetado arrastraba un shim CJS de `require` que Turbopack rechaza
  en desarrollo (`dynamic usage of require is not supported`).

## v16.0.4

### Corregido

- Exports `./container`, `./site-nav` y `./site-header` que faltaban en `package.json`.

## v16.0.3

### Corregido

- `Switcher` y `Checkbox`: el `id` va en el botón (Base UI lo daba al input
  oculto), así que `<label htmlFor>` nombra el control. Tests jsdom del contrato.

## v16.0.2

### Corregido

- `Switcher` y `Checkbox` renderizan un `<button>` nativo (Base UI ponía un
  `<span>`): un `<label htmlFor>` vuelve a nombrarlos y `disabled` es nativo.

## v16.0.1

### Corregido

- `Switcher` y `Checkbox`: `onCheckedChange` recibe solo el estado (Base UI
  añadía un segundo argumento con los detalles del evento).
- `Select`: el trigger resuelve la etiqueta de la opción elegida aunque los
  `Select.Item` vengan envueltos por un wrapper del producto.

## v16.0.0

Rediseño del sistema: Base UI como motor, doctrina de tokens cerrada (nada
inventado: todo referencia la escala), tallas de componente 32/40/48 en todos
los controles, y el shell de aplicación rehecho. Storybook es la verdad:
Foundations explica el sistema; cada componente definitivo documenta su API.

### BREAKING

- **Radix → Base UI** (`@base-ui-components/react`). `asChild` desaparece:
  `Button` y los primitivos usan `render`. `renderLink` de los menús debe
  reenviar TODAS las props inyectadas (`<Link {...props}>`).
- **Shell de aplicación**: `AppShell` exige `header` + `sidebar`; la sidebar tiene
  estado `open | rail | closed` y ancho redimensionable; en móvil es un cajón
  lateral que se cierra al navegar. `AppHeader` vive en todos los anchos
  (menú · `start` · `notifications` · `end`) y ya no admite `children`/`center`.
  `Sidebar` pierde `expanded`. `useAppShell()` cambia (`sidebar`, `setSidebar`,
  `toggleSidebar`, `closeSidebar`, `sidebarWidth`, `isDesktop`).
- **Menús**: `Menu` es la fuente (tipos `MenuItem`… y tokens `menu.*`);
  `ContextMenu` es `Menu` + `DotsButton` (`triggerAriaLabel` → `label`); fuera
  `context-menu.json` y `dots-button.json`. Ítems `radio` sin glifo: la elegida
  en énfasis.
- **Tallas**: `Avatar` y `Select` a 32/40/48 (`Avatar` pierde `xl`); `Button`,
  `Select` y `DotsButton` fijan altura por talla, sin `padding-block`. `Button`
  rectangular (`border-radius.default`) y ghost con relleno de marca en hover.
- **Tipografía**: la base viste `h1`–`h6`, `p` y `a`; `Heading`/`Paragraph` solo
  añaden modificadores. Fuera los pesos `extralight/regular/semibold/extrabold`
  y los alias `text.paragraph.*`. `Label` sin mayúsculas.
- **Tokens retirados**: `select.padding-block/icon-size/focus-ring-offset`,
  `site-header.settings-border-*`, `user-menu.avatar-size`/`initials-*`,
  `org-switcher.logo-*`/`initials-*`, `*-label-text-transform`, `link.color-hover`
  → `link.hover-color` (y `text-decoration-hover` → `hover-text-decoration`).

### Añadido

- Componentes: `Container`, `Logo`, `MenuButton`, `SkipLink`, `SiteHeader`,
  `SiteNav`, `LanguageSwitcher`, `ThemeSwitcher`, `DropdownField`,
  `NotificationButton`. `Icon` con `menu`/`close` compartiendo geometría con
  `MenuButton`.
- `Menu` con `openOnHover`; `SidebarNav` en rail (iconos, tooltips, grupos como
  menú con la portada de primer enlace); `OrgSwitcher block`/`compact`;
  `UserMenu compact`; `Select` con `aria-describedby`/`aria-invalid`;
  `SelectField` enlaza ayuda y error; `VisuallyHidden` reenvía `ref` y props.
- Foundations completas (colores, tipografía, espaciado, tallas, bordes, radio,
  sombras, opacidad, movimiento, puntos de ruptura, capas, iconografía);
  `z-index.*`, `size-component.*`, `font-size.0` (cifras de marcas).

## v15.0.0

### BREAKING

- **Reset global `box-sizing: border-box`** (`*`, `*::before`, `*::after`). Antes
  brand dejaba el `content-box` del navegador y cada consumidor escribía su propio
  reset. Si una app ya lo tenía, no nota nada; si no lo tenía, cualquier regla que
  combine `width`/`inline-size` con `padding` cambia de caja.
- **`html { color-scheme: light dark }`** (antes `light`). Los controles nativos y
  las barras de scroll pasan a seguir el tema.

### Añadido

- **Lienzo de página emparejado**: `body` fija ahora `background-color` además del
  color de texto, con tokens `--text-background` / `--text-color` y sus pares
  `surface-dark-*`. El modo oscuro del canvas llega solo con `.surface-dark`,
  `[data-theme="dark"]` o `html.dark`; ya no hace falta que cada app lo repita.
- **Subpartes componibles de Card**: `CardHeader`, `CardTitle`, `CardDescription`,
  `CardAction`, `CardContent` y `CardFooter`, con BEM propio (`.card__*`) y tokens
  `--card-header-gap`, `--card-title-font-weight`, `--card-footer-gap`. Eran divs
  sin estilar y cinco apps de la suite repetían su maquetación.

## v14.0.4

### Corregido

- **`'use client'` vuelve a la primera línea de todos los bundles.** En `dist/avatar.js` la
  directiva quedaba detrás del `import './avatar.css'` que inyecta el post-build, y Next la
  rechaza ("The 'use client' directive must be placed before other expressions"), rompiendo el
  build de cualquier consumidor que llegara a `Avatar` (p. ej. vía `review-carousel`). El
  post-build ahora arranca cualquier directiva que el bundler haya dejado dentro del fichero y la
  repone él mismo en la línea 1, de modo que un entry con `'use client'` en el fuente ya no
  depende de estar apuntado a mano en `clientComponents` — `avatar` se apunta igualmente.

## v14.0.3

Solo documentación: este fichero estrena las entradas de la serie `v14`.

## v14.0.2

### Cambiado

- **El repo pasa de npm a pnpm.** `pnpm-lock.yaml` importado del `package-lock.json` (mismas
  versiones), `packageManager` fijado a `pnpm@10.12.1` como en el resto de la suite y `Dockerfile`
  con corepack.

- **Fuera el script `prepare`.** `dist/` va committeado, así que a los consumidores que instalan
  por tag de git el `prepare` solo les costaba bajar las devDependencies y recompilar para nada.
  En local lo sustituye `pnpm build:all` (`build:tokens` → `build:lib` → `build:css` →
  `build:tokens-css`).

## v14.0.1

### Corregido

- **`react-hook-form` y `sonner` pasan a externos del build de librería.** Son peers con contexto
  compartido: bundlearlos duplicaba la librería dentro del consumidor, de modo que el
  `FormProvider` del consumidor no cruzaba hasta los campos de `brand` y los `toast()` disparados
  fuera no llegaban al `Toaster`. Ya estaban declarados en `peerDependencies`; ahora el bundle los
  respeta.

## v14.0.0

Mayor: `@studiolxd/brand` absorbe `@slxd/ui` y se convierte en el design system canónico de la
suite slxd y de la web. El breaking está en los tokens de feedback y en `Tag`; **no hay alias de
compatibilidad**, cualquier nombre viejo se queda sin valor al subir.

### Roto

- **Tokens de feedback por rol, separados por uso.** El esquema viejo tenía un solo token por rol
  y superficie que servía indistintamente de color de texto y de fondo. Ahora cada rol
  (`error`, `success`, `destructive`) expone tres cosas distintas: `*-text-on-light` /
  `*-text-on-dark` para texto, icono y borde; `*-fill` para fondo sólido (universal, el mismo en
  superficie clara y oscura); y `*-fill-text` para el contenido que va encima de ese fondo.

  | Nombre viejo | Nombre nuevo |
  | --- | --- |
  | `--color-error-on-light` | `--color-error-text-on-light` |
  | `--color-error-on-dark` | `--color-error-text-on-dark` |
  | `--color-success-on-light` | `--color-success-text-on-light` |
  | `--color-success-on-dark` | `--color-success-text-on-dark` |
  | `--color-destructive-on-light` | `--color-destructive-text-on-light` |
  | `--color-red-on-light` | `--color-red` |
  | `--color-red-on-dark` | `--color-red-light` |
  | `--color-green-on-light` | `--color-green` |
  | `--color-green-on-dark` | `--color-green-light` |

  La regla para migrar un uso viejo: si estaba en `color`, `border-color` o `outline-color` va a
  `*-text-on-*`; si estaba en `background`/`background-color` va a `*-fill`, y el color del
  contenido de encima a `*-fill-text`. Los primitivos `--color-red-light` y `--color-green-light`
  son **solo** texto/icono/borde sobre prussian, nunca fondo; y los `*-fill` nunca son color de
  texto.

- **Tokens retirados sin sustituto directo.**

  | Retirado | Qué usar |
  | --- | --- |
  | `--color-green-dark` | `--color-green` (texto sobre claro) o `--color-success-fill` (fondo) |
  | `--color-green-bg` | no hay equivalente: el fondo de success es `--color-success-fill` sólido, con `--color-success-fill-text` encima |
  | `--tag-default-bg`, `--tag-default-color` | `--tag-neutral-bg`, `--tag-neutral-color` |

  No entra en `brand` la familia *tint* de `@slxd/ui` (`success-tint`, `success-tint-text`,
  `green-tint`, `green-deep`): el rol de feedback se resuelve con el par texto/fill, sin fondo
  teñido intermedio. Los consumidores que la usaran tienen que pasar a `*-fill` + `*-fill-text`.

- **`Tag` pierde la variante `default`.** `TagVariant` ya no la acepta y el valor por defecto de
  la prop `variant` pasa a ser `neutral`. Migración: `variant="default"` → `variant="neutral"`, o
  quitar la prop. Ojo, no es un renombrado a secas: `default` era gris claro con texto oscuro y
  `neutral` es gris oscuro con texto blanco, así que el tag cambia de aspecto.

### Añadido

- **El delta de `@slxd/ui`, con diez entries nuevos del paquete.**

  | Entry | Componente |
  | --- | --- |
  | `@studiolxd/brand/skeleton` | `Skeleton` |
  | `@studiolxd/brand/tooltip` | `Tooltip` |
  | `@studiolxd/brand/command-palette` | `CommandPalette` |
  | `@studiolxd/brand/form-field` | `FormField` |
  | `@studiolxd/brand/image-crop-dialog` | `ImageCropDialog` |
  | `@studiolxd/brand/menu` | `Menu` |
  | `@studiolxd/brand/sheet` | `Sheet` |
  | `@studiolxd/brand/data-table` | `DataTable` |
  | `@studiolxd/brand/conversation-thread` | `ConversationThread` (ya existía, ahora con entry propio) |
  | `@studiolxd/brand/app-launcher` | `AppLauncher` — el `SlxdLauncher` de la suite, renombrado |

  `AppLauncher` llega nuevo a `brand`: ningún consumidor de `brand` usaba `SlxdLauncher`, así que
  el renombrado no rompe a nadie aquí.

- **`dropdownItems` acepta ítems de tipo `label` y `radio`**, además de los de acción y separador.

- **`'use client'` en los componentes con estado o efectos**, para consumirlos desde React Server
  Components sin envoltorios.

- **Fallback de `Avatar`** cuando la imagen falla o no hay `src`.

### Cobertura

Proyecto `components` nuevo de vitest sobre jsdom con los tests de componente que venían de
`@slxd/ui`. `pnpm test` corre `unit` + `components`; `pnpm test:stories` sigue corriendo el
proyecto `storybook`.

## v13.6.0

### Añadido

- **Props de texto en los componentes que aún cableaban castellano.** Misma convención que
  `Pagination` en `v13.5.0`: prop opcional con el texto actual como default, así que sin pasar
  nada el marcado no cambia.

  | Componente | Props nuevas |
  | --- | --- |
  | `AsyncSelect` | `emptyMessage`, `loadingLabel`, `clearLabel` |
  | `AsyncMultiSelect` | `emptyMessage`, `loadingLabel` |
  | `FileUpload` | `dropzoneLabel`, `dropzoneActiveLabel`, `dropzoneHintLabel`, `maxSizeHint`, `maxFilesHint`, `filesLabel`, `progressLabel`, `removeFileLabel`, `tooLargeError`, `invalidTypeError` |
  | `NumberInput` | `decrementLabel`, `incrementLabel` |
  | `TimeSelect` | `hoursLabel`, `minutesLabel`, `hoursPlaceholder`, `minutesPlaceholder` |
  | `InputPhone` | `countryLabel` |
  | `Calendar`, `CalendarPlanner` | `previousMonthLabel`, `nextMonthLabel` |
  | `CalendarRoster` | `previousMonthLabel`, `nextMonthLabel`, `legendLabel`, `legendItems` |
  | `Table` (`TableHeader`) | `sortedAscLabel`, `sortedDescLabel`, `sortableLabel` |
  | `CodeBlock` | `copyLabel`, `copiedLabel` |
  | `ConversationThread` | `ariaLabel` |
  | `LoginForm` | `emailLabel`, `passwordLabel`, `submitLabel`, `loadingLabel` |

  Los dos textos **visibles** sin ninguna vía de traducción eran "Sin resultados"
  (`AsyncSelect`/`AsyncMultiSelect`) y los de la zona de arrastre de `FileUpload`; el resto eran
  etiquetas accesibles.

- **`LegendItem`** exportado desde el índice del paquete (tipo de `CalendarRoster.legendItems`).

- **Foundations › Internacionalización** — página nueva de Storybook con la convención de props
  de texto, el criterio de nombres, el tratamiento de fechas vía `locale` y la tabla de todos los
  componentes con props de texto. La regla equivalente para el desarrollo interno queda en
  `CLAUDE.md`.

### Cobertura

Una story de test por componente tocado, verificando en cada uno que los textos por defecto se
siguen emitiendo y que las props pasadas los sustituyen.

## v13.5.0

### Añadido

- **Pagination — etiquetas accesibles configurables.** Todos los textos que el componente
  emitía cableados en castellano son ahora props opcionales, con el texto actual como valor
  por defecto:

  | Prop | Default | Dónde aparece |
  | --- | --- | --- |
  | `pageLabel?: (page: number) => string` | `` `Página ${page}` `` | `aria-label` de cada botón/enlace de página |
  | `previousLabel?: string` | `"Página anterior"` | `aria-label` del control anterior |
  | `nextLabel?: string` | `"Página siguiente"` | `aria-label` del control siguiente |
  | `pagesGroupLabel?: string` | `"Páginas"` | `aria-label` del `role="group"` de los controles |
  | `pageSizeLabel?: string` | `"Registros por página"` | `aria-label` del `Select` de registros por página |
  | `totalLabel?: (total: number) => string` | `` `${total} resultados` `` | texto del sumario de `showTotal` |

  `ariaLabel` (el `aria-label` del `<nav>`) ya era configurable y no cambia.

  Motivación: un consumidor multiidioma que delegaba en este componente perdía sus
  traducciones y anunciaba "Página 3" a un lector de pantalla en inglés o alemán. Ahora
  puede inyectar sus textos traducidos. Sin pasar ninguna prop el marcado es idéntico al
  de `v13.4.1`, así que el cambio es retrocompatible.

  Documentado en el JSDoc de `PaginationProps` y en la sección "Internacionalización de las
  etiquetas" de `Pagination.mdx`. Cubierto por dos stories de test: una verifica los textos
  por defecto, otra que las props pasadas ganan.
