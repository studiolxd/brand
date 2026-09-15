# Changelog

Este fichero arranca en `v13.5.0`. El histórico anterior vive en los mensajes de commit
de cada tag (`git log --tags`).

El paquete sigue [semver](https://semver.org/lang/es/): **patch** para bug fixes y
regeneración de `dist`, **minor** para componentes/props/variantes/tokens nuevos, **major**
para breaking changes.

## [48.0.0] — 2026-09-16

> **Major.** Novena familia al proveedor de textos: copiar, datos y estado. Diecisiete
> espacios nuevos, y con ellos el primero que **no es de un componente sino de una
> conducta**: `copy`, las tres palabras que dicen por igual el botón suelto, el valor en
> línea y el bloque de código. Además, la banda de preferencias de `PublicPageShell` se
> puede pedir a otra medida, y `Foundations/Redacción` fija por escrito que los estados de
> carga conservan sus puntos suspensivos.

### Copiar, datos y estado leen del proveedor

Diecisiete espacios nuevos en `BrandMessages`: `copy`, `codeBlock`, `dotsButton`,
`progressBar`, `spinner`, `slider`, `treeView`, `uptimeBars`, `chart`, `stepper`,
`carousel`, `languageSwitcher`, `projectCard`, `legalFooter`, `calendarRoster`,
`calendarPlanner` y `notificationList`. Mismo orden —**prop → proveedor → error**— y cada
texto se lee **donde se pinta**: un botón que nunca falla no exige el aviso de
portapapeles roto, un spinner decorativo no exige su texto, un progreso que empieza en el
primer paso no exige la marca de «completado», un deslizador de un pulgar no exige los dos
nombres del rango y un cuadrante sin leyenda no exige ninguno de sus seis tipos.

### `copy` es un espacio de conducta, y es la primera excepción a «un espacio por componente»

`CopyButton`, `CopyableValue`, `DescriptionDetails copyable` y el acuse de `CodeBlock`
dicen **las mismas tres palabras**: «Copiar», «Copiado», «No se pudo copiar». Un espacio
por componente habría obligado a la aplicación a escribirlas tres veces, con el riesgo de
que un día dijeran cosas distintas; el catálogo de la suite ya las tiene una sola vez
(`common.copy`, `common.copied`). Así que la interfaz `CopyMessages` vive donde ya vivía
la conducta compartida —`src/stories/constants/copy-to-clipboard.ts`— y no junto a un
componente: lo que comparten es el comportamiento, y el texto va con él.

`CodeBlock` es el caso que lo enseña: lee de **dos** espacios, porque su rótulo dice
«Copiar código» (suyo, `codeBlock.copy`) y su acuse dice «Copiado» (de todos,
`copy.copied`). Y `codeBlock.region` —el nombre del área desplazable— interpola el
lenguaje, así que es función.

### Un nombre genérico es cromo; el de ESTA pantalla sigue siendo prop

`ProgressBar` y `TreeView` son la pareja que mejor lo enseña. El catálogo pone «Progreso»
y «Árbol», que valen en cualquier pantalla; lo que avanza de verdad —«Subiendo el
vídeo»— y de qué árbol se trata —«Matriz de contenidos»— lo sabe solo la pantalla, y para
eso siguen estando las props, que ganan. Lo mismo en `Chart`: el cromo de la tabla
equivalente es catálogo, pero **`ariaLabel` sigue obligatorio y fuera** —un texto común lo
dejaría diciendo «Gráfico» en todas partes sin que nada fallara—.

### Cuatro piezas entran al alcance por arrastre

`Spinner` no estaba en la lista y entra: es el estado por excelencia, y su «Cargando…» es
exactamente el texto que la norma de redacción de esta misma release declara excepción.
`Slider` tenía tres palabras cableadas dentro del default de `thumbLabel` («Valor»,
«Mínimo», «Máximo») que ninguna prop de texto dejaba ver. `CalendarPlanner` comparte
familia con `CalendarRoster` y se habría quedado con su «+N más» en castellano.
`DescriptionDetails` y `ContextMenu` pasan a ser **reenvíos puros**: sus props siguen
existiendo como anulación puntual, pero ya no hacen falta para traducir.

`MessageComposer`, `ConversationList`, `ConversationThread`, `AssistantMessage`,
`AnnotationThread`, `ChatShell`, `TypingIndicator` y las pantallas de `ConnectorAuth`
**no entran**: son texto de producto y legal, y tienen ola propia.

### La leyenda del cuadrante va clave a clave, contra la regla general

La norma del sistema es que una **lista** se traduce pasándola entera, no con una prop de
texto por elemento. Los seis tipos de la leyenda de `CalendarRoster` son la excepción: es
un vocabulario **cerrado** del componente —festivo, vacaciones, ausencia, recuperación,
cumpleaños, no laborable—, y obligar a la aplicación a montar el array con sus `type`
correctos solo para traducir seis palabras era peor que darles seis claves.
`legendItems` sigue existiendo para sustituir la leyenda **entera** —otro orden, otros
tipos— y gana. `birthdayPrefix` se queda fuera: es un emoji, y un emoji no se traduce.

### Redacción: los estados de carga conservan los puntos suspensivos

Sección propia en `Foundations/Redacción`, con sus ejemplos ✓/✗. «Buscando…»,
«Cargando…», «Guardando…» no son una frase que se corta: son **progreso**, y los tres
puntos dicen que algo está pasando ahora mismo y que va a terminar. Quitárselos convierte
el estado en un rótulo. Vale igual para el texto visible y para el que solo oye un lector
de pantalla. Lo que **no** es un estado en curso sigue sin llevarlos, aunque hable de algo
que tarda.

### La banda de preferencias de `PublicPageShell` se puede pedir a otra medida

Prop nueva, `preferencesWidth?: ContainerWidth`, con el prefijo de la ranura —como
`mainWidth`— porque el marco tiene cuatro y un `width` pelado no diría cuál gobierna. El
default es `'xl'`, lo de hoy, **así que esta parte no es breaking**. Una página que lee a
`lg` pide `preferencesWidth="lg"` y la banda estrecha con ella.

Lo que resolvía el hueco hasta hoy —anidar un `Container width="lg"` dentro de
`preferences`— metía un `container__inner` dentro de otro: el relleno lateral se contaba
dos veces y la banda dejaba de alinear con el `main`. Sin CSS nuevo.

### Para quien actualice

El catálogo del `BrandMessagesProvider` tiene que crecer con los diecisiete espacios, o la
primera pantalla con un `CopyButton`, un `Spinner` o una `ProgressBar` **lanza en render**.
Estas son las claves que hay que aportar:

| Espacio | Claves | Qué es |
| --- | --- | --- |
| `copy` | `label`, `copied`, `error` | copiar al portapapeles, para toda la familia |
| `codeBlock` | `copy`, `region(language?)` | el rótulo propio del bloque y el nombre de su área |
| `dotsButton` | `label` | el botón de tres puntos — lo reenvía `ContextMenu` |
| `progressBar` | `label` | el nombre genérico de lo que avanza |
| `spinner` | `label` | la espera, con sus puntos suspensivos |
| `slider` | `value`, `min`, `max`, `valueAt(index)` | los nombres de los pulgares |
| `treeView` | `label` | el nombre genérico del árbol |
| `uptimeBars` | `label`, `noData` | la tira y cómo se dice que un punto no tiene dato |
| `chart` | `tableCaption`, `tableHint`, `category`, `value`, `share`, `empty` | el cromo de la tabla equivalente |
| `stepper` | `label`, `compact(current, total)`, `completed`, `current`, `pending` | el progreso y sus tres marcas de estado |
| `carousel` | `label`, `roleDescription`, `track`, `previous`, `next`, `indicator(index)`, `pause`, `play`, `slideStatus(index, total)`, `slideRoleDescription` | todo el cromo del carrusel |
| `languageSwitcher` | `label` | la etiqueta del selector — **no** los idiomas |
| `projectCard` | `tags` | la lista de etiquetas de categoría |
| `legalFooter` | `label` | la navegación del pie legal |
| `calendarRoster` | `name`, `legend`, `holiday`, `vacation`, `absence`, `recovery`, `birthday`, `nonWorking` | la columna de nombres y los seis tipos de la leyenda |
| `calendarPlanner` | `more(count)` | el botón de desbordamiento de una celda |
| `notificationList` | `label`, `unread`, `markRead` | la bandeja — **no** el panel de la cabecera |

Seis de ellas interpolan un dato (`codeBlock.region`, `slider.valueAt`, `stepper.compact`,
`carousel.indicator`, `carousel.slideStatus`, `calendarPlanner.more`), así que son
funciones.

A cambio, dejan de hacer falta para traducir `DescriptionDetails.copyLabel` y
`copiedLabel`, y `ContextMenu.label`: son reenvíos puros y siguen existiendo solo como
anulación puntual. `RecoveryCodes` mantiene sus tres `labels` obligatorias —«Copiar todos»
no es «Copiar»—, pero su botón lee `copy.error` si el portapapeles falla.

**Ojo con dos valores.** `spinner.label` lleva **puntos suspensivos** dentro («Cargando…»):
son parte del texto, no adorno. Y `notificationList.*` no es `notificationPanel.*`: en el
catálogo de la suite son `notifications.inbox.*` y `notifications.panel.*`, y mezclarlos
deja la bandeja diciendo lo del flotante.

## [47.1.0] — 2026-09-15

> **Minor.** La norma de puntuación de subtítulos y estados vacíos, fijada por escrito en
> Foundations → Redacción, con el JSDoc de `Hero`, `PageIntro` y `EmptyState` remitiendo a
> ella. Documentación y ejemplos, sin cambios de comportamiento ni de CSS de por sí — salvo
> el `fix` suelto que viaja en la misma release: un `Link` dejaba de medir su texto al ser
> ítem directo de un `Stack align="stretch"`.

### `PageIntro` gana `eyebrow`: la ranura encima del título

Prop nueva, `eyebrow?: ReactNode`: lo que va **encima** del título —una `Tag` de estado,
una categoría, un `Breadcrumb` corto—, nunca un subtítulo ni una frase larga (para eso
sigue estando `description`). Con `actions`, el eyebrow se queda en la **columna del
título**, nunca en la de las acciones: el título y las acciones pasan a compartir fila
dentro de una nueva `.page-intro__title-group` que agrupa eyebrow y título, y las reglas
de la fila (ancho flexible, línea base, aire bajo el bloque) se mueven de `.heading` a
ese grupo. El hueco entre eyebrow y título es `--page-intro-row-gap`, el mismo que ya
separaba el título de las acciones apiladas — ningún token nuevo. Sin `eyebrow`, el
marcado es exactamente el de siempre. Story «Con eyebrow» y su test de contrato en
`Molecules/PageIntro`.

### Redacción: subtítulo y estado vacío terminan en punto

Página nueva, `Foundations/Redacción`: todo subtítulo (`Hero.description`,
`PageIntro.description`) y toda `EmptyState.description` terminan en punto; el `title` de
`EmptyState`, los rótulos, los botones y los tags, no. Sin puntos suspensivos ni
exclamación; el signo de interrogación solo si la frase es una pregunta de verdad. El
JSDoc de las tres props afectadas remite a la página. `dataTable.empty` del catálogo de
Storybook (`.storybook/brandMessagesFixture.ts`) llevaba un punto de más: alimenta el
`title` de `EmptyState` dentro de `DataTable`, y un título no lleva punto.

### Fix: un `Link` directo de un `Stack align="stretch"` no se estira

`Link` fijaba su color, su subrayado y su relleno pero no su ancho: como ítem de un flex en
columna con `align-items: stretch`, ocupaba todo el ancho del `Stack` y la línea de su
subrayado cruzaba la página entera —el caso de un «← Volver» sobre un `PageIntro`—. Ahora
`inline-size: fit-content` en la cara base del enlace (`a:not(.button)`, `.link`): su caja
vuelve a ser la de su texto, sin tocar el enlace suelto en un párrafo (donde `width` no
aplica a una caja `inline`) ni el centrado vertical de `Inline` (`align-items: center`),
que un `align-self` habría descuadrado. Story «El enlace dentro de una columna» en
`Atoms/Link`, con su test de contrato.

## [47.0.0] — 2026-09-15

> **Major.** Octava familia al proveedor de textos: el cromo de aplicación y la navegación.
> Catorce espacios nuevos, y con ellos la familia donde más claves ya existían en el
> catálogo de la suite. Además, los portales dejan de abrirse en la talla equivocada dentro
> de una página pública, y el `main` de `PublicPageShell` se puede pedir a sangre.

### La navegación lee del proveedor

Catorce espacios nuevos en `BrandMessages`: `menuButton`, `appRoot`, `appShell`, `sidebar`,
`sidebarNav`, `siteNav`, `siteHeader`, `userMenu`, `orgSwitcher`, `breadcrumb`,
`tableOfContents`, `prevNextNav`, `publicPageShell` y `onboardingShell`. Mismo orden —**prop
→ proveedor → error**— y cada texto se lee **donde se pinta**: una barra fuera de un
`AppShell` no tiene asa y no exige sus dos textos, una navegación sin entradas vacías no
exige su marca, un menú de cuenta sin contador no exige el plural, un paso sin acciones no
exige el nombre de su pie.

La frontera se decide por el valor. **Cromo**: el nombre de una región de navegación
(«Principal», «En esta página», «Migas de pan»), el salto al contenido, qué hace el
logotipo, la dirección de un par anterior/siguiente. **Contenido**: los ítems de un menú,
los nombres de las organizaciones, el nombre de la persona, los títulos de destino del
`PrevNextNav`, el rótulo visible de un índice. `PrevNextNav` es el caso que mejor lo
enseña: «Anterior» y «Siguiente» son catálogo, pero un par que navega semanas quiere decir
«Semana anterior» y para eso siguen estando las props, que ganan.

### Tres piezas entran al alcance por arrastre

`MenuButton` es donde vivía el castellano que reenviaban las dos cabeceras: migrarlo deja
`AppHeader.menuLabel` y `SiteHeader.menuLabel` como **reenvíos puros**, una sola clave en
vez de tres. `AppRoot` tiene la misma frase de salto que `AppShell` y se habría quedado
cableada. Y `PublicPageShell` tenía que migrar para que `OnboardingShell.preferencesLabel`
pudiera ser reenvío puro: es la misma banda y la misma clave.

`Switcher` estaba en la lista y **no entra**: no emite ningún texto propio. Lo nombra la
etiqueta de su campo.

### Breaking — `MenuButton` abierto dice «cerrar»

El nombre accesible pasa a seguir al estado: cerrado lee `menuButton.open`, abierto lee
`menuButton.close`. Antes, con el menú abierto el botón seguía llamándose igual salvo que
el consumidor pasara `closeLabel` a mano, así que la cara de cerrar casi nunca se pintaba.
Ahora que el catálogo trae las dos, el nombre ya no se queda a medias. **Un test que
consulte el botón por su nombre con la barra abierta deja de encontrarlo**: es el punto
donde esto rompe en silencio.

`UserMenu` tenía un texto que ni siquiera era prop —el contador de notificaciones llevaba
`${count} notificaciones sin leer` escrito en el JSX—. Ahora es `userMenu.unread`, una
función, y `notifications.unreadCount` de la suite ya la satisface con su plural.

### Los portales heredan la superficie

La v45.1.0 puso los controles en talla `lg` dentro de `.site-shell` por herencia CSS, y
dejó apuntado lo que no cubría: la lista de un `Select` y el calendario de un `DatePicker`
los monta un portal en `document.body`, que no es descendiente del bloque. El campo se
pintaba a 48px/20 y su lista se abría a 40px/16. El tema oscuro no tenía este problema
porque se activa en `<html>` y cascadea a todo el documento; la superficie de lectura se
activa a media altura del árbol.

`SiteShell` publica ahora su nodo raíz por `PortalContainerContext`, y todo componente con
portal lo toma como destino cuando no recibe `container`. La resolución es **prop →
contexto → `document.body`**, y la prop gana siempre. No hay nada que pasar en cada uso: el
árbol de React sabe dónde está el shell aunque el árbol del DOM no lo sepa. El nodo viaja
en **estado y no en una ref**, porque el destino tiene que existir en el render en el que
el portal se monta — el mismo patrón que `ChatShell` ya usaba para el `container` de su
cajón. `SiteShell` pasa a ser componente cliente.

Lo consumen por defecto `Select`, `MultiSelect`, `AsyncSelect`, `AsyncMultiSelect`,
`InputPhone`, `Modal`, `Sheet`, `AppLauncher`, `OrgSwitcher`, `UserMenu` y `Toaster`.
`Popover`, `Tooltip` y `Menu` **estrenan prop `container`** —son los primitivos
componibles, y sin ella no había escotilla—, y con ellos heredan sin tocar nada
`DatePicker`, `DateTimeField`, `TimeSelect`, `TimeField`, `ContextMenu`, `DropdownField`,
`NotificationButton`, `ConfirmDialog`, `ImageCropDialog`, `AvatarUpload`, `CommandPalette`
y `Consent`. `FloatingDock` queda intacto: monta su panel dentro de su propia ancla a
propósito y no pasa por el contexto.

**`AppShell` no provee el contexto, y es deliberado.** La superficie de aplicación es la
del `:root`, así que `document.body` ya resuelve los mismos valores; meter los portales
dentro de `.app-shell` —que es `overflow: clip` y de altura fija— solo añadiría riesgo de
recorte sin arreglar nada. El día que la superficie de aplicación cambie de talla, el
arreglo es montar ahí el mismo proveedor: una línea.

Los campos `*Field` siguen **sin** reenviar `container`, y también a propósito: obligar a
cada app a pasar un nodo en cada uso era el problema, no la solución. La escotilla vive en
el primitivo.

### El `main` de `PublicPageShell` se puede pedir a sangre

`PublicPageShell` montaba su `main` como `Container as="main" space="xl"` fijo. Es lo que
quiere una página corriente, pero no una **portada**: la que abre con un `Hero` de lado a
lado no cabía en el molde y tenía que montarse a mano con `SiteShell` + `Container`, que es
justo lo que el molde único existe para evitar.

El `main` lleva ahora los mismos tres mandos que un `Container` —`mainWidth`, `mainSpace` y
`mainFlush`—, con el prefijo de la ranura porque el marco tiene cuatro y un `width` pelado
no diría cuál gobierna. **Los defaults son los de hoy** (`'xl'`, `'xl'`, `false`): quien no
los toque se pinta exactamente igual, así que esta parte no es breaking. Una portada pide
`mainWidth="full" mainSpace="none" mainFlush` y apila secciones, poniendo su propio
`Container` a lo que quiera columna.

El `main` sigue siendo el `main`, con su `id` y su `tabIndex`, así que el enlace de salto al
contenido llega igual a una portada abierta a sangre.

### Para quien actualice

El catálogo del `BrandMessagesProvider` tiene que crecer con los catorce espacios, o la
primera pantalla con un `Breadcrumb`, un `AppRoot` o un `MenuButton` **lanza en render**.
Estas son las claves que hay que aportar:

| Espacio | Claves | Qué es |
| --- | --- | --- |
| `menuButton` | `open`, `close` | qué hace el botón de menú, en sus dos caras |
| `appRoot` | `skipToContent` | el salto al contenido del documento |
| `appShell` | `skipToContent` | el salto al contenido de la aplicación |
| `sidebar` | `label`, `resizer`, `resizerValue(width)` | la región, el asa y su ancho hablado |
| `sidebarNav` | `label`, `empty` | la región y la marca de una entrada sin contenido |
| `siteNav` | `label` | la región del índice del sitio |
| `siteHeader` | `logo` | qué hace el logotipo — **lleva la marca dentro** |
| `userMenu` | `trigger(name)`, `unread(count)` | el botón de cuenta y su contador |
| `orgSwitcher` | `trigger(name)` | el botón del conmutador de organización |
| `breadcrumb` | `label` | la región del rastro |
| `tableOfContents` | `label` | la región del índice de la página |
| `prevNextNav` | `previous`, `next` | la dirección, no el destino |
| `publicPageShell` | `preferences` | la banda de idioma y tema |
| `onboardingShell` | `actions` | el grupo de acciones del pie del alta |

Cuatro de ellas interpolan un dato (`sidebar.resizerValue`, `userMenu.trigger`,
`userMenu.unread`, `orgSwitcher.trigger`), así que son funciones. `siteHeader.logo` la
escribe cada producto con su propia marca: el default retirado decía «Studio LXD — ir al
inicio».

A cambio, dejan de hacer falta para traducir `AppHeader.menuLabel` y `menuCloseLabel`,
`SiteHeader.menuLabel` y `menuCloseLabel`, y `OnboardingShell.preferencesLabel`: son
reenvíos puros y siguen existiendo solo como anulación puntual.

## [46.0.0] — 2026-09-15

> **Major.** Séptima familia al proveedor de textos: los envoltorios de diálogo. `Consent`,
> `CommandPalette`, `AppLauncher`, `FloatingDock`, `NotificationButton` y
> `NotificationPanel` dejan de traer castellano puesto.

### Los envoltorios leen del proveedor

Seis espacios nuevos en `BrandMessages`: `consent`, `commandPalette`, `appLauncher`,
`floatingDock`, `notificationButton` y `notificationPanel`. Mismo orden —**prop →
proveedor → error**—. `CommandPalette` y `AppLauncher` relajan su API de paso: los textos
que antes eran props obligatorias en cada uso ahora son opcionales, porque los pone el
catálogo.

### Lo que se queda como prop, por valor y no por nombre

`ConsentBanner.description` y `policyLabel` son **obligatorias y sin default**, como el
`confirmLabel` de un diálogo: el texto legal depende de la jurisdicción y de lo que cada
producto guarde. El tipo exige `policyLabel` en cuanto hay `policyHref` —o el enlace no
está, o está entero—, así que una política sin nombre no compila.

`AppLauncherLabels.trigger` no va al catálogo por una razón distinta: su **presencia**
decide la cara del disparador (solo icono, o icono con rótulo), y un texto de catálogo está
siempre presente. Meterlo ahí obligaría a todos los lanzadores de la suite a llevar rótulo.

### `FloatingDock` tiene su propio aspa, y por qué no pasa por `Modal`

Se miró antes de decidirlo, y la razón es real: es un diálogo **no modal** —sin velo, con
la página viva detrás—, no atrapa el foco, su portal monta dentro del propio ancla para
heredar la superficie por cascada, y va anclado a una esquina con el aspa fuera de la
cabecera. El `Modal` del sistema es lo contrario en las cuatro cosas. Hacerlo pasar por él
no era quitar una clave: era cambiar el componente. Queda escrito en el componente y en su
documentación para que no se vuelva a abrir.

## [45.1.0] — 2026-09-15

> **Minor.** La superficie pública pone los controles en talla lg, igual que hace con el
> texto.

### `.site-shell` parte de lg también en los controles

El bloque subía el cuerpo a 20px y dejaba los campos en la talla de aplicación: en una
página pública el texto era grande y los buscadores, filtros y botones de al lado no. Misma
omisión que tenía el término de la ficha hasta la v39.0.0, y misma respuesta: en el bloque,
no en cada app.

No se enumeran controles a mano. Cada control ya declara su talla lg en tokens hermanos
(`input.lg-height` junto a `input.height`), de donde bebe su modificador `--lg`; ahora
`.site-shell` apunta cada token de partida a su hermano `lg-*`, y lo que hereda de un
control sube con él. Un control nuevo entra solo por tener sus tokens `lg-*`. La familia
base (`control.*`) estrena su par lg, y el motor de tokens arrastra ahora una referencia
metida dentro de una fórmula —sin eso el renglón reservado para el rótulo de la barra de
filtros se quedaba corto y descolocaba el interruptor—.

**El botón entra**: 40→48px y 16→20px, porque un botón md junto a un campo de 48 se lee
como un control de otra talla justo donde más se juntan. **El chevron del `Select`** era lo
único de la caja que no subía —su tamaño salía de una prop de React y no de un token— y
ahora es token (16→24px).

Medido en Chromium: dentro del shell, campo, selector, selector múltiple, campo de fecha y
botón a 48px/20px, exactamente lg; fuera, 40px/16px. El interruptor, su campo y el botón de
acciones de la barra siguen con el centro en el mismo píxel.

**Dos matices, documentados.** `size="sm"` sigue mandando dentro del shell; lo que ya no
se distingue de lg es un `size="md"` escrito a mano. Y **lo que sale por un portal** —la
lista de un `Select`, el calendario de un `DatePicker`— monta en `document.body` y no
hereda la superficie: el disparador va a 48/20 y su lista se queda en la talla de
aplicación. Es el mismo caso que `Modal` y `Sheet` documentan, y la misma respuesta
(`container`), pero los campos `*Field` no lo exponen todavía.

## [45.0.0] — 2026-09-15

> **Major.** Sexta familia al proveedor de textos: diálogos y superficies. `Modal`, `Sheet`,
> `ConfirmDialog`, `Alert`, `Banner` y `Toaster` dejan de traer castellano puesto — y el
> botón de confirmar de un diálogo pasa a exigir su texto.

### Los diálogos leen del proveedor

Seis espacios nuevos en `BrandMessages`: `modal` (close, fallbackTitle), `sheet` (close),
`confirmDialog` (cancel, pending), `alert` (close), `banner` (dismiss) y `toaster`
(container, close). Mismo orden —**prop → proveedor → error**— y cada texto se lee **donde
se pinta**: el título de respaldo solo sin `title`, el aspa del aviso solo si es
descartable, el «Confirmando…» solo mientras la promesa corre. La mayoría de los usos no
exige ninguna clave nueva.

Con ello se cierran los dos reenvíos que la v44 dejó apuntados (`ImageCropDialog.closeLabel`
y `AvatarUpload.cropCloseLabel` llegan ya a un `Modal` que lee del proveedor), y
`Consent.closeLabel` pierde su default por lo mismo: tapaba el del `Modal`.

### Breaking — `ConfirmDialog.confirmLabel` es obligatorio

Pasa a **obligatorio y sin default**, y **no entra en el catálogo** aunque `common.confirm`
exista. El botón de confirmar es el único punto del diálogo donde se toma la decisión, y
por eso es el único donde el texto tiene que nombrar la consecuencia —«Borrar la
organización», «Revocar la clave»—. Un default lo haría decir «Confirmar» en todas partes
sin que nada fallara, que es justo el rótulo que la documentación del componente lleva
pidiendo que no se use; y siendo opcional, nadie llegaría a escribir el bueno: el default
es lo que quita la presión de pensarlo. Mismo trato que el de `ImageCropDialog`.

`pendingLabel`, en cambio, sí es cromo aunque se pinte sobre el mismo botón: se lee
**mientras ya se ejecuta**, sobre un control deshabilitado. Nadie decide nada leyéndolo.

### Lo que se queda como prop

`title`, `description`, los pies, el texto de cada aviso, `secondaryActionLabel`, y los
`confirmPhraseLabel` / `confirmPhraseMismatch` de la v39, que siguen obligatorios.

### Para quien actualice

El `<Toaster />` tiene que quedar **dentro** del `BrandMessagesProvider`: montado como
hermano suyo revienta en el primer render. Y cada `ConfirmDialog` sin `confirmLabel` deja de
compilar — los que hoy caían en «Confirmar» son exactamente los que estaban mal.

## [44.1.0] — 2026-09-15

> **Minor.** Las estrellas ganadas de `StarRating` se rellenan en accent-2 sobre superficie
> oscura.

Un solo token, `star-rating.surface-dark-fill-color`, pasa de `{color.accent-1}` a
`{color.accent-2}` (decisión del 2026-09-15). Sobre superficie clara sigue en prusia, que
ahí sí contrasta. Ningún color nuevo.

## [44.0.0] — 2026-09-15

> **Major.** Quinta familia al proveedor de textos: las subidas. `FileUpload`,
> `AvatarUpload` e `ImageCropDialog` dejan de traer castellano puesto, el peso de un
> archivo lo escribe el `locale`, y una lista de formatos lleva la conjunción de su idioma.

### Las subidas leen del proveedor

Tres espacios nuevos en `BrandMessages`: **`fileUpload`**, **`imageCropDialog`** y
**`avatarUpload`**, veintidós claves. `CalendarPlanner` y `CalendarRoster` no estrenan
espacio: sus dos flechas leen `calendar.previousMonth` y `calendar.nextMonth`, que es
literalmente el mismo texto que el del `Calendar`. Mismo orden —**prop → proveedor →
error**— y misma naturaleza: incompatible **en tiempo de compilación**.

Un cambio incompatible más, de props: `AvatarUpload.cropTitle` pasa a **obligatorio**. El
diálogo no sabe qué se recorta —«Recorta tu foto», «Recorta tu logo»—, y eso es contenido de
la pantalla, no del sistema.

### «2,5 MB» tiene dos mitades

`formatBytes` hacía `toFixed(1) + ' KB'`: punto decimal inglés cableado, en todos los
idiomas. Ahora el peso lo escribe `Intl.NumberFormat` con `style: 'unit'` en el `locale`
del componente, y al catálogo va solo la plantilla que lo envuelve («máx. {size}»). Con el
mismo catálogo inglés, `es-ES` escribe «max. 2,5 MB» y `en-US` «max. 2.5 MB». Es la regla
de la v43 aplicada a otra cosa: *si cambia al cambiar de idioma es cromo; si cambia al
cambiar de país es formato.*

Efecto de asumir CLDR: las unidades son las suyas —«kB» y no «KB»— y por debajo de un
kilobyte un `en-US` escribe «500 byte». La alternativa era volver a decidir a mano la
colocación del sufijo, que es justo lo que la regla prohíbe.

### Dos textos que no se pueden traducir por separado

`AvatarUpload` tiene un botón con texto visible («Subir») y un nombre accesible («Subir el
logo»), y WCAG 2.5.3 exige que el segundo **contenga** al primero. Traducirlos en dos
sitios distintos es dejar que una traducción los despareje sin que falle nada; concatenarlos
en el componente es castellano disfrazado, porque el orden es del idioma —«Subir el logo»
lleva el verbo delante, «das Logo hochladen» lo lleva detrás—. Así que van los dos al
catálogo, `avatarUpload.button` y `avatarUpload.buttonFor(subject)`, con la regla escrita
al lado; la pantalla solo aporta el sujeto. El aviso de consola en desarrollo sigue
vigilando la contención.

### Una lista lleva la conjunción de su idioma

Los formatos admitidos se unían con `join(', ')` y no ponían conjunción en ningún idioma:
«JPEG, PNG, WEBP». Ahora es `Intl.ListFormat` con `type: 'disjunction'`: «JPEG, PNG o
WEBP», «JPEG, PNG, or WEBP», «JPEG, PNG oder WEBP».

### Lo que se queda como prop

`ImageCropDialog.title`, `cancelLabel` y `confirmLabel` eran ya obligatorias y sin default,
y son el modelo de toda la ola: el diálogo no sabe qué se recorta ni qué pasa al confirmar.
En `AvatarUpload`, en cambio, `cropCancel` y `cropConfirm` sí salen del catálogo, y no es
incoherencia: esa subida sí sabe lo que confirma —se guarda un recorte—, y vale igual en
todas las pantallas.

Quedan dos reenvíos puros a una pieza sin migrar: `ImageCropDialog.closeLabel` y
`AvatarUpload.cropCloseLabel` van al `Modal`, que aún trae su «Cerrar». Es la deuda que
esta ola deja apuntada, y es por donde sigue la siguiente.

## [43.0.0] — 2026-09-15

> **Major.** Cuarta familia al proveedor de textos: fecha y hora. `Calendar`, `DatePicker`
> y `TimeSelect` dejan de traer castellano puesto, y con ellos se cierran los reenvíos que
> las olas anteriores dejaron inventariados.

### Fecha y hora leen del proveedor

Tres espacios nuevos en `BrandMessages`: **`calendar`** (previousMonth, nextMonth,
previousYears, nextYears, yearGrid), **`datePicker`** (openCalendar, invalid, calendar y
las letras de la máscara) y **`timeSelect`** (hours, minutes y sus máscaras). Los campos
que los envuelven —`DatePickerField`, `DateTimeField`, `TimeField`— no pierden props: sus
reenvíos quedan como anulación puntual, pero ya no hay que enhebrar nada para traducir,
porque el proveedor llega por contexto a la pieza que pinta el texto. Se ha retirado
`SPANISH_MASK_LETTERS`, el último juego de letras castellanas vivo en el código.

Mismo orden que en las tres olas anteriores —**prop → proveedor → error**— y misma
naturaleza: incompatible **en tiempo de compilación**. El texto que no se pinta no se
exige: un `Calendar` sin navegación no pide las flechas, un `DatePicker` con fecha válida no
pide el aviso, un `TimeSelect` con hora no pide las máscaras.

### Una máscara tiene dos mitades

`dd/mm/aaaa` no es una cosa, son dos decididas en sitios distintos. **El orden y el
separador son formato**: salen del `locale` vía `Intl.DateTimeFormat`, y una aplicación en
inglés que enseñe fechas españolas las quiere en orden español. **Las letras son idioma**:
`aaaa` es «año», `yyyy` es *year*, `jjjj` es *Jahr* — la abreviatura de una palabra, y se
traduce. Por eso el catálogo guarda las tres letras sueltas y nunca la máscara montada: la
arma el componente poniendo las letras en el orden del `locale`.

Lo mismo con `HH/MM`: parecen notación técnica, pero son la inicial de una palabra, y en
alemán son `SS/MM`. Lo que no se traduce es el dibujo —dos cifras, la hora antes que el
minuto, dos puntos en medio—.

La regla, en una frase, escrita en `Foundations › Internacionalización`: **si cambia al
cambiar de idioma es cromo; si cambia al cambiar de país es formato.**

### Lo que se queda como prop

`label`, `helperText` y `errorMessage` de los tres campos; `gridLabel` del `Calendar`, que
nombra a ESE calendario («Fecha de alta») y sin el cual la rejilla toma el título del mes,
que ya viene del `locale`; `calendarLabel` cuando lo pone un campo, porque es su etiqueta;
y el `placeholder` del `DatePicker` cuando dice algo del campo («Desde»), que sustituye a la
máscara entera.

### Pendiente, anotado

`CalendarPlanner` y `CalendarRoster` siguen con «Mes anterior» y «Mes siguiente» cableados:
es el mismo texto que `Calendar` y pueden leer de `calendar.*` tal cual. Y `TimeSelect` es
de 24 horas por construcción; el reloj de 12 con AM/PM es cosa del `locale`, no del idioma,
y hoy una aplicación en inglés americano ve las horas en formato militar. No es un texto,
y queda por decidir.

## [42.0.0] — 2026-09-15

> **Major.** Tercera familia al proveedor de textos: los átomos y moléculas de formulario
> dejan de traer castellano puesto. Y la barra de filtros apila de verdad por debajo del
> punto de ruptura, no solo cuando la aritmética de la rejilla lo permitía.

### Los formularios leen del proveedor

Doce componentes, doce espacios nuevos en `BrandMessages`: `inputField`, `passwordField`,
`select`, `multiSelect`, `numberInput`, `otpInput`, `inputPhone`, `asyncSelect`,
`asyncMultiSelect`, `searchForm`, `docsSearch` y `filterBar`. Los `*Field` que los envuelven
son reenvío puro y no tienen espacio propio: pasan la prop al átomo, y el átomo lee del
catálogo. Mismo orden que en las dos olas anteriores —**prop → proveedor → error**— y
mismo carácter: incompatible **en tiempo de compilación**, que es lo que se busca.

Esta familia iba ahora, y no más tarde, por un reenvío: `DataTable` pasaba
`searchClearLabel` a un `InputField` que seguía con su «Borrar» cableado, así que las
tablas no quedaban limpias del todo en una aplicación francesa hasta que cayera el átomo.
Ese reenvío está cerrado. Y de paso se ha visto lo que tapaba: `removeLabel`,
`decrementLabel`, `incrementLabel`, `digitLabel`, `countryLabel` y `loadingLabel` **no se
pasaban en ningún sitio de la suite** — esos controles salían en castellano dentro de las
aplicaciones en francés, alemán, neerlandés y portugués, y nadie lo había parcheado porque
nadie lo veía. Con el proveedor se corrigen sin tocar un solo punto de uso.

### Lo que se queda como prop, y las dudosas

`label`, `helperText`, `errorMessage` y el `placeholder` que dice algo del campo son
**contenido de ese campo** y siguen siendo props; ninguno traía castellano que retirar. Las
que hubo que decidir mirando **el valor y no el nombre**: `Select.placeholder`
(«Seleccionar…») es cromo, y la prop gana cuando el marcador dice algo del campo;
`SearchForm.label` («Buscar») es cromo, porque el buscador de sitio se llama igual en toda
la suite; `AsyncSelect.emptyMessage` («Sin resultados») es cromo, con la prop intacta para
un vacío propio. `DocsSearch.clearLabel` no tiene clave: el aspa es la del `InputField` de
debajo, y darle clave obligaría a traducir «Borrar» dos veces y a que coincidieran.
`InputPhone.internationalLabel` conserva su «🌐»: un glifo no se traduce.

El sistema **no tiene marca de obligatorio ni de «opcional»** — ni `Label` ni ningún
`*Field` la emiten. No había nada que migrar ahí; si algún día se quiere, es una pieza
nueva.

### `FilterBar`: una columna por debajo de `md`, de verdad

Su documentación prometía una columna por debajo del punto de ruptura y sus acciones sí
conmutaban ahí, pero los filtros se dejaban a la aritmética de la rejilla
(`minmax(min(192px, 100%), 1fr)`), que solo apila por fuerza por debajo de unos 400px.
Medido en Chromium: a 320 y 390px, una columna; **a 430, 600, 700 y 760px, dos o tres
columnas y un selector a media línea**. Es justo lo que se veía en un teléfono apaisado.
Ahora la base es `1fr` y la rejilla `auto-fill` vive dentro del `@media (min-width: 768px)`
que ya existía.

El test que debía haberlo cogido medía la caja equivocada: comprobaba que la **celda**
llenaba la línea —y lo hacía siempre—, no el **control** de dentro, que era lo que se
quedaba corto, y solo en una franja que ningún preset de ventana de Storybook toca. El test
nuevo mide el control y mide a 600px.

`FilterBar` pasa a ser componente cliente: leer del contexto lo exige.

### Un solo fixture inglés para las historias

Las historias «Textos desde el proveedor (otro idioma)» de esta ola y de las dos anteriores
importan un único `.storybook/brandMessagesFixtureEn.ts`, hermano del castellano, en vez de
repetir el literal en cada una. El test que vigila que ningún fixture se publica ahora
enumera lo que hay en `.storybook/`, así que el de la próxima ola queda cubierto por
existir.

## [41.1.0] — 2026-09-15

> **Minor.** El interruptor de la barra de filtros se centra con el campo que tiene al
> lado, el pie de una tarjeta cumple la norma de las acciones por sí solo, y `block` queda
> escrito como lo que es: la excepción.

### `FilterBar`: un control sin rótulo, a la altura del que sí lo lleva

Un interruptor no lleva rótulo encima y un campo sí, así que en la rejilla el interruptor
se pegaba arriba, a la altura de los **rótulos** en vez de a la de los **campos**. Ahora la
barra le reserva a esa celda el renglón del rótulo —medido por token, no a ojo— y, en el
espacio que queda, abre una caja de **la altura de un campo** y centra el control dentro.

Medido en Chromium: los centros de la caja del campo, del interruptor y del botón de las
acciones caen en el mismo píxel. La referencia es la **talla estándar del campo**, no el
alto real del renglón, y eso es lo que permite tener las dos cosas a la vez: un control que
crece hacia abajo —un selector múltiple con fichas— sigue creciendo sin mover a nadie, y
los rótulos siguen todos en su línea. Donde ningún filtro lleva rótulo no se reserva nada,
y apilado, por debajo del punto de ruptura, tampoco.

### `CardFooter` cumple la norma solo

Era la única ranura de acciones del sistema que no lo hacía: siempre una fila, con la
columna a pedir a mano — la prop de escape que la norma vino a quitar, mudada del botón al
contenedor. Ahora, por debajo de `md`, sus acciones ocupan la línea como en las otras once
ranuras.

`direction="column"` **se queda**, y con un significado más limpio: ya no es «acuérdate de
apilar en móvil», sino «apila **siempre**, también donde hay sitio» — el pie con una línea
de texto sobre el botón, o la tarjeta que se sabe estrecha en escritorio.

**Por qué por ventana y no por contenedor**, que es el hallazgo que merece quedar escrito:
se intentó como el pie de un diálogo y se midió antes de darlo por bueno. Declarar la
tarjeta como contenedor (`container-type: inline-size`) le quita el ancho que saca de su
contenido: dos tarjetas dentro de un `Inline` pasan de medir lo que mide su texto a 34px,
solo su propio aire. **Una tarjeta no puede ser contenedor** porque se usa de las dos
maneras —unas veces la estira su hueco, otras la mide su contenido—; un diálogo sí, porque
su ancho siempre viene de fuera. Queda en `Foundations › Puntos de ruptura` como el primer
límite documentado de la técnica.

### `Button.block`, escrito al derecho

Su documentación decía que era «lo que quiere un botón suelto dentro de una página», que es
justo la invitación a usarlo en vez de buscar la ranura. Ahora dice lo contrario, y la
norma tiene su mitad negativa escrita:

> Todo botón vive en una ranura de acciones. Si no hay ranura que le encaje, eso es un
> hueco del sistema que se reporta — no un `block` que se añade.

Con la lista de las ranuras que dan la línea entera y de las que no la dan a propósito
—las que viven dentro de una fila, donde estirar rompería la fila que les da sentido—.
`AnnotationThread` sale de la lista de dudosos: vive en un panel estrecho también en
escritorio, así que sus acciones ocupan la línea **siempre**, sin punto de ruptura.

## [41.0.0] — 2026-09-15

> **Major.** Segunda familia al proveedor de textos: `Table` y `DataTable` pierden sus
> textos castellano por defecto.

### Las tablas leen del proveedor

Mismo mecanismo que estrenó `Pagination` en la v40.0.0 y mismo orden —**prop → proveedor →
error**—, ahora en la familia que más superficie ocupa en una aplicación. `BrandMessages`
gana dos espacios:

- **`table`** — `actions`, `sortable`, `sortedAscending`, `sortedDescending`.
- **`dataTable`** — `empty`, `search`.

Los cinco calcan clave a clave el catálogo de la suite, así que montarlos es mapear y no
traducir de nuevo. Es incompatible **en tiempo de compilación**, que es justo lo que se
busca: el contrato exige los dos espacios, así que ninguna aplicación compila hasta
añadirlos — nadie se entera en producción de que le falta un texto.

### Lo que NO se fue al proveedor, y por qué

La distinción que gobierna toda la campaña: al catálogo común va lo que el componente emite
**por su cuenta** e igual en toda la suite; se queda como prop lo que es **contenido de esa
pantalla**.

- `Table.caption` y `TableRow.label` nombran ESA tabla y ESA fila.
- `DataTable.ariaLabel` nombra ESA lista.
- `DataTable.emptyMessage` **sobrevive como anulación**: el catálogo pone el aviso genérico,
  y la prop queda para el que explica algo del dominio —«todavía no has invitado a nadie»—.
  No es una concesión: en la suite ya hay pantallas que dan un vacío distinto según haya
  filtros o no, y eso ningún catálogo común puede saberlo.

`DataTable.searchClearLabel` se queda como **reenvío puro**: ese texto no lo emite la tabla,
lo emite el `InputField` que lleva dentro, y ese átomo todavía no está migrado.

### Lo que esta ola enseña sobre las que vienen

Una familia no queda limpia del todo mientras reenvíe texto a un componente sin migrar, y
eso **no se ve desde dentro de la familia**. De ahí que las olas siguientes se ordenen para
que los átomos de formulario caigan pronto: medio catálogo termina reenviando a ellos.

## [40.1.0] — 2026-09-15

> **Minor.** `AnnotationThread` gana un tercer estado y una ranura para la coordenada de
> cada anotación.

### El tercer estado: `acknowledged`

El organismo tenía dos estados, `open` y `resolved`, y le faltaba el peldaño de en medio.
No es un matiz visual: donde se usa, el pie ofrece **las transiciones disponibles desde
donde estás**, así que colapsar «planteada» y «atendida» en un mismo `open` hace que el
rótulo diga lo mismo en dos estados entre los que se puede mover, y la interfaz deja de
decir si alguien se ha hecho cargo.

Se llama `acknowledged` —«Atendida» por defecto, con su `acknowledgedLabel`— y no
`verified`, que es el vocabulario de UN producto: donde nació, «verificada» significa que
alguien comprobó el arreglo, pero en una nota de traducción el mismo peldaño es «alguien ya
se ha hecho cargo». El nombre del sistema dice **dónde está el hilo** —planteado, atendido,
cerrado—, no qué significa en tu dominio; el rótulo es prop, así que cada producto sigue
diciendo su palabra. Se descartó `reviewed` por colisión: el componente vive en paneles de
revisión, donde «revisada» ya se lee como otra cosa.

El tratamiento es una **escala de presencia** —plena, segundo plano, retirada— con un solo
token nuevo, `annotation-thread.acknowledged-opacity`, hermano del `resolved-opacity` que ya
existía. Ningún color nuevo: el `Tag` usa su variante `info`. Y por ser opacidad se lee
igual en superficie clara y oscura, así que no hizo falta ningún par `surface-dark-*`.

### `AnnotationEntry.meta`: la coordenada de una anotación

Ranura nueva **por anotación**, no del hilo: cada una tiene su fecha y su sitio, y una
respuesta puede apuntar a otro lugar que la anotación que abre el hilo. Se pinta dentro de
la cabecera de esa anotación, después del avatar, el autor, la fecha y la marca de editada
— añade, no sustituye.

No es `actions`, y la diferencia no es de colocación: `actions` son las cosas que se le
hacen a la anotación —editar, borrar, citar—; la coordenada es parte de **lo que la
anotación es**. Puesta entre los botones del pie se convertía en un botón más.

Cuando no cabe, la que baja de línea es la coordenada y nunca la fecha: lo garantiza el
orden del marcado, no una media query. Una coordenada larga —el título de una lección— se
parte dentro en vez de desbordar el hilo. Las dos cosas las mide un test en un navegador de
verdad, dentro de una caja estrecha.

La ranura lee los tokens `meta-*` que el organismo ya tenía para la fecha, así que no
estrena ninguno.

## [40.0.0] — 2026-09-15

> **Major.** El sistema estrena **proveedor de textos**: un catálogo que se monta una vez
> en la raíz de la aplicación y del que los componentes leen lo que pintan. `Pagination`
> es el primero en usarlo, y con él pierde sus textos castellano por defecto.

### El proveedor de textos, y por qué

Hasta hoy, todo texto que un componente emite por su cuenta venía en una prop opcional con
el castellano puesto. En una suite de doce aplicaciones que hablan seis idiomas eso es un
fallo silencioso: el componente pinta «Cancelar» dentro de una página en francés, no falla
nada, ningún test lo ve, y se ve bien estando mal. Un inventario de hoy midió el tamaño del
asunto: **111 componentes, 310 props de texto**.

El mecanismo son cuatro piezas en `src/messages/`, y se importa desde
`@studiolxd/brand/messages`:

- **`BrandMessages`** — el contrato, anidado por componente. **El tipo nace aquí**, en el
  sistema, y el catálogo de la aplicación lo satisface; no al revés, porque un sistema que
  necesitara un paquete ajeno para declarar lo que necesita dejaría de sostenerse solo.
- **`BrandMessagesProvider`** — se monta una vez, con el catálogo entero. Todas las claves
  de cada espacio son **obligatorias**: si una aplicación se deja una, no compila.
- **`useBrandMessages`** — el lector, para los componentes.

El orden es **prop → proveedor → error**, y no hay cuarto escalón: ahí es donde estaba el
castellano, y de ahí se ha ido. El error se lanza **donde el texto se pinta**, así que un
paginador sin selector de registros no exige el texto del selector, y quien ya pasa todas
las props sigue funcionando sin montar nada.

Lo que se gana, dicho sin adornos: una clave que falta es un error de compilación; un
proveedor sin montar es un fallo ruidoso e inmediato. Ninguno de los dos es un texto mudo
en el idioma equivocado que nadie descubre.

### Breaking — `Pagination` ya no trae sus textos

Sus ocho textos —`label`, `pagesGroup`, `previous`, `next`, `goToPage`, `perPage`,
`total` y el `allOption` del selector, que estaba cableado dentro— salen del proveedor o de
las props. **Un `Pagination` sin proveedor y sin props de texto lanza en render.** Siete de
las ocho claves ya existían tal cual en el espacio `pagination` de los catálogos de la
suite; la octava se ha escrito en los seis idiomas.

Alcanza a quien lo compone: `DataTable` monta un `Pagination`, así que una pantalla con
tabla necesita el proveedor aunque no pagine a mano.

### Storybook: un fixture, no un default por la puerta de atrás

Las historias se envuelven en un decorador que monta el proveedor con un fixture
castellano. No es el default de antes con otro nombre, y la diferencia es la que da sentido
a todo lo anterior: el fixture vive fuera de `src/`, no es punto de entrada, ningún
componente lo importa y `package.json#files` solo publica `dist/`, `src/tokens/` y el
registro de cambios — así que **ningún código de un consumidor puede caer en él**. Un
default viaja dentro del paquete y se alcanza en ejecución; un fixture no. Las cuatro
condiciones las vigila un test, no un comentario.

### Sobre lo que viene

Esta versión es **una rebanada vertical**: una sola familia llevada hasta el final, con sus
defaults retirados, para probar el patrón antes de comprometer los otros 110 componentes.
El patrón aguanta. Lo que no es gratis, y conviene saberlo: retirar el default es
incompatible por componente y se propaga a quien lo compone, así que lo que sigue se
ordenará **por familias y con versión mayor**, no componente a componente.

## [39.0.0] — 2026-09-15

> **Major.** `StarRating` deja de traer sus textos puestos: ahora se le pasan, y el
> compilador lo exige. Además, la flecha de la tarjeta enlazada es opcional, el
> `ConfirmDialog` sabe pedir una frase de confirmación y el término de una lista de
> descripción deja de verse diminuto en superficie pública.

### Breaking — `StarRating`: el componente recibe su texto

Los cinco textos pasan a ser props **obligatorias y sin valor por defecto**, exigidas por
el tipo en cuanto el componente puede emitirlas: `valueLabel` siempre en lectura;
`countLabel` en cuanto se pasa `reviewCount`; `emptyLabel` en cuanto `value` puede ser
`null`; `optionLabel` y `groupLabel` en modo entrada. El corte lo hace el tipo, no la
documentación: si el valor de tu API es `number` no se te pide `emptyLabel`, y el día que
pase a `number | null` el compilador te lo reclama en vez de dejarte pintar cinco estrellas
vacías —que es el dibujo de «valorado con 0», una nota real y la peor de todas.

Van con ello otros tres cambios incompatibles: **`value` pasa a obligatorio** en lectura
(antes omitirlo pintaba cero estrellas, o sea un olvido disfrazado de valoración);
**`locale` desaparece**, porque el componente ya no escribe ninguna cifra y quien compone
la frase es quien la escribe; y el modo se elige con `readOnly` **literal**.

Qué hacer al actualizar: `StarRating.mdx` § «Qué se rompe al actualizar» trae el código
exacto de los textos que había, para copiarlos tal cual si tu app está en castellano.

> La regla del repo sobre textos de componente —prop opcional con el castellano por
> defecto— queda en revisión: hay ya cuatro piezas que no la cumplen, y lo que decida esa
> revisión se escribirá en su sitio, no aquí.

### `Card`: la flecha la manda `ctaLabel`

En modo enlace, la flecha y el nombre accesible del CTA aparecen **con `ctaLabel` y solo
con él**. Sin la prop no hay ninguno de los dos: una rejilla de catálogo donde cada tarjeta
repite la misma flecha es ruido, no señal. No hay `showArrow`/`hideArrow` — una sola cosa
que decidir, no dos que se puedan contradecir. Ningún consumidor del repo se ve afectado:
los veinte usos del modo enlace ya pasaban `ctaLabel`.

### `ConfirmDialog`: frase de confirmación

Nueva prop `confirmPhrase` —la frase exacta que hay que teclear para que la acción se
habilite— con `confirmPhraseLabel` y `confirmPhraseMismatch`, obligatorias en cuanto se usa
la primera, porque el rótulo es donde el producto dice QUÉ hay que escribir y eso el diálogo
no lo sabe. El botón de confirmar nace apagado; el error sale **tras un intento** —salir del
campo con algo escrito, o pulsar Intro—, nunca mientras se teclea, y seguir escribiendo lo
retira. Con la frase puesta, Intro confirma desde el propio campo. La comparación perdona
los espacios de los extremos y nada más: ni caja ni acentos, que es de lo que vive la
barrera. Con la frase, el foco entra en el campo y no en «Cancelar»: lo que la regla del
foco evita es que un Intro de más caiga sobre la acción que destruye, y aquí el botón nace
apagado.

Existía porque faltaba: tres sitios de la suite resolvían este patrón de tres maneras
distintas, dos dejando el botón vivo y lanzando desde `onConfirm` para que el diálogo no se
cerrara, y otro saltándose el `ConfirmDialog` entero para montar un `Modal` a mano.

### `DescriptionList`: el término, proporcionado en superficie pública

El bloque `.site-shell` subía el valor a `--text-font-size` (20px) y **no tocaba el
término**, que se quedaba en `--label-font-size` (14px): dentro de `AppShell` el par es
14/16 y no canta, en superficie pública era 14/20 y el término se veía diminuto al lado de
su valor. El término pasa a `{text.paragraph.small.font-size}`, que ES el peldaño
inmediatamente por debajo del valor por definición: **la superficie de aplicación queda
idéntica** (14/16) y la pública pasa a 16/20. Cambia el aspecto de toda ficha pública de la
suite que monte una `DescriptionList` dentro de un `SiteShell`, incluidas las pantallas de
conexión de conector.

No había ninguna historia que montara una `DescriptionList` dentro de un `SiteShell` — por
eso nadie lo había visto. Ahora la hay. Y `Typography.mdx` gana el escalón que le faltaba a
la doctrina: **«hereda un peldaño por debajo»**, entre «hereda el cuerpo» y «talla propia»,
donde encajan el término de la ficha, el Breadcrumb, el pie de `Figure`, la ayuda de
formulario y el índice del `Accordion`.

### Publicación

`scripts/publish-npm.mjs` sube el paquete con `npm stage publish` en vez de publicarlo
directo, y termina imprimiendo el identificador del stage: el segundo factor se difiere a
una persona, que aprueba con su sesión. El camino del token «Automation» queda documentado
como lo que es —npm está restringiendo los tokens que se saltan el 2FA— y el ritual de
`release:check` + tag no cambia.

## [38.17.0] — 2026-09-15

> **Minor.** En `ChatShell`, el botón que despliega el cajón de conversaciones
> deja de saltar: cerrado y abierto cae en el mismo punto exacto de la pantalla.

**`ChatShell` — el disparador del cajón no se mueve al desplegar.** En pantalla
estrecha hay dos botones gemelos con el mismo glifo: el de la cabecera, que abre
el cajón, y el del propio cajón, que lo cierra. La v38.15.0 ya los dejó
idénticos de forma —misma variante, misma talla, mismo icono— pero no de sitio,
porque cada uno se medía contra un origen distinto: el de la cabecera contra el
relleno que ponga quien monta el armazón (el armazón no tiene relleno propio: quien
compone, espacia) y el del cajón contra el `padding-block`, el `padding-inline` y el
`gap` del `Sheet`. Medido en `mobile1` con 24px de aire alrededor: cerrado caía en
(24,24) y abierto en (56,72) — 48px más abajo y 32 a la derecha, con la misma caja
de 32×32. Al plegar y desplegar, el glifo daba un salto.

Ahora el cajón **repite la misma fila `chat-shell__header`** que la columna
principal, con el botón dentro y la lista debajo en `chat-shell__drawer-list`;
`.chat-shell__drawer` anula el relleno propio del `Sheet` para que esa fila nazca
donde nace la cabecera, y no recorta (`overflow: visible`), que si no se comía dos
lados del anillo de foco. El disparador gana además `align-self: flex-start`: sin
eso el arreglo solo valía con cabeceras bajitas —con un título y un selector de
modelo, la fila crece, el botón centrado baja con ella y el del cajón se queda
arriba, y volvía a saltar 22px—. Anclado al arranque coinciden sea cual sea el alto
de la cabecera, el mismo criterio con el que el aspa de un diálogo se alinea con la
primera línea del título. Verificado en Chromium: (24,24,32,32) antes y después.

**Token nuevo:** `chat-shell.drawer-gap`, en cascada desde
`chat-shell.thread-padding-block` — la lista del cajón arranca donde arranca el
hilo. Ningún color nuevo.

**Para consumidores:** ninguna prop cambia. Dos efectos visibles: el disparador de
la cabecera pasa a ir pegado al canto superior de su fila en vez de centrado, así
que con cabeceras altas el glifo sube unos píxeles; y dentro del cajón hay marcado
nuevo (`.chat-shell__header`, `.chat-shell__drawer-list`), que afecta a quien
estuviera pintando a mano el interior de `.chat-shell__drawer`. `Sheet` no se toca.

## [38.16.0] — 2026-09-15

> **Minor.** La barra de filtros deja de reorganizarse mientras escribes,
> `Alert` gana ranura de acciones y el pie de un diálogo se coloca por el ancho
> del diálogo, no por el de la ventana.

**`FilterBar` — una sola rejilla para los filtros y sus acciones.** Eran dos
cajas hermanas: la rejilla `auto-fit` de filtros y, aparte, un bloque de
acciones `flex: none` anclado al extremo con `margin-inline-start: auto`. De
ahí salían los dos defectos que se veían a diario. El botón de «Limpiar
filtros» solo se pinta cuando ya hay algo que limpiar —o sea, **mientras se
escribe**— y, al aparecer, le restaba a la rejilla su ancho más el hueco: si
ese recorte cruzaba un múltiplo del mínimo de columna, la rejilla perdía una
columna de golpe y un filtro se caía a la línea siguiente. Medido a 1024px con
cuatro filtros: sin el botón, una fila de cuatro columnas; con él, dos filas y
733px de hueco. A 768px con tres filtros, lo mismo: de tres columnas a dos, con
467px de hueco.

Ahora el botón es **una celda más de la misma rejilla**, la siguiente al último
filtro, alineada con los controles. Y la rejilla es `auto-fill` en vez de
`auto-fit`: las pistas las decide el ancho disponible y **solo** el ancho
disponible, así que ni el número de columnas ni el ancho de los campos cambian
porque el botón aparezca o desaparezca — medido a 1536, 1280, 1024, 900, 768,
640 y 390px, con dos, tres y cuatro filtros. La contrapartida —con dos filtros
en una pantalla ancha sobra sitio a la derecha— es la buena: un filtro mide lo
que mide una celda del sistema (192px, `field-row.cell-md`), no media pantalla.
`.filter-bar__filters` pasa a `display: contents`: el envoltorio conserva su
clase pero deja de ser una caja.

**`Alert` gana ranura de acciones** (`actions`, o `<Alert.Actions>` para el
modo composición), con la misma norma y el mismo nombre de clase que sus
hermanos `Banner` y `ConsentBanner`: por debajo de `md` apila y cada botón
ocupa la línea. Hasta ahora, quien necesitaba un botón en un aviso lo metía
dentro de la descripción y en móvil se quedaba a medio ancho. La ranura vive
**dentro** de `.alert__content`, que es quien declara la superficie interior
del relleno: un botón fuera de ella leería con la página en vez de con el
aviso. Tokens nuevos: `alert.actions-gap` y
`alert.actions-margin-block-start`.

**El pie de un diálogo se coloca por el ancho del diálogo** (`@container`, con
umbral `sm`), no por el de la ventana. `Sheet` ya usaba la pieza compartida
`.dialog-footer` y apilaba en móvil; el fallo estaba en escritorio, donde un
cajón lateral mide lo mismo que en un teléfono —320px, 256 de hueco útil— y el
pie seguía siendo una fila: dos botones con su etiqueta no cabían. Ahora
`.sheet` y `.modal__content` se declaran contenedor de consulta, y el umbral es
el que hace falta para una fila de dos botones, no el ancho de una pantalla. El
cajón apila siempre; el diálogo centrado (560px, 494 de hueco) conserva su fila
donde la tenía. Es el caso que Fundamentos › Puntos de ruptura ya señalaba como
propio de `@container`.

Nueve historias de contrato nuevas o actualizadas, en el viewport que le toca a
cada una.

## [38.15.0] — 2026-09-15

> **Minor.** El cajón de conversaciones del chat, en móvil: ocupa el ancho y su
> botón no cambia de forma al abrirse. `Sheet` gana `hideClose`.

El cajón medía 320px de 390 porque heredaba el ancho lateral del `Sheet`.
Mientras está abierto, la lista de conversaciones ES la pantalla: ahora mide lo
que el armazón. Sin media query, porque el cajón solo se monta por debajo de
`lg`.

Y al abrirse aparecía el aspa del `Sheet` encima del disparador, así que el
glifo cambiaba de «barra lateral» a «cerrar» según el estado. `Sheet` acepta
`hideClose` —por defecto no cambia para nadie— y el armazón pinta dentro del
cajón el MISMO botón que lo abrió, en el mismo sitio: pliega y despliega sin
cambiar de dibujo. Dos controles de cierre con formas distintas en la misma
pantalla son dos maneras de decir lo mismo.

## [38.14.0] — 2026-09-15

> **Minor.** En móvil, las acciones ocupan la línea porque lo decide el sitio
> donde viven, no cada botón. Ninguna prop cambia; el dibujo sí, en cinco
> componentes.

### La norma: el ancho lo decide el contenedor

`.form__actions` ya lo hacía y los otros catorce contenedores de acciones no,
así que un botón suelto solo se estiraba si alguien se acordaba de pedírselo
pieza por pieza. Ahora la norma es del sistema y está escrita en
`Foundations/Breakpoints`, con el patrón, dónde se aplica y —sobre todo—
dónde NO.

Entran `Banner`, `ConsentBanner`, `FilterBar`, `Highlight` y
`RecoveryCodes`. Se quedan fuera, a propósito, las acciones que viven DENTRO
de una fila y no son un pie: las de `NotificationList`, `TreeView` y
`MessageComposer` —estirarlas rompería la fila que les da sentido— y las de
`SiteHeader`, que en móvil ni se pintan. `AnnotationThread` queda anotado
como dudoso: vive en un panel estrecho también en escritorio, así que su caso
es de consulta de contenedor, no de anchura de ventana.

### `DescriptionList` mide su hueco

No fijaba su ancho, así que dependía de dónde se pusiera: dentro de un
contenedor que alinea al principio se encogía al contenido y los filetes
salían a media línea, en móvil y en escritorio. Ahora el ancho es de la ficha.

## [38.13.0] — 2026-09-15

> **Minor.** Las burbujas del chat parten el texto que no cabe, una fila puede
> apilarse en móvil, y el paquete estrena README de verdad.

### `MessageBubble` — una URL ya no se come el pico

`.message-bubble` no declaraba `overflow-wrap`, así que una URL o una palabra
larga sin espacios no partía: el texto se salía por la derecha, cruzaba el
borde del globo, tapaba su cola y abría scroll horizontal en el hilo. Medido a
390px, un globo de 273px con 431px de contenido. Ahora es `anywhere`, que
además encoge el tamaño mínimo intrínseco de la caja y hace que el globo
respete su `max-width`. De cinturón, `ConversationThread` recorta el eje
horizontal (`overflow-x: clip`, que no crea contexto de desplazamiento): un
bloque que aun así desborde —un `<pre>`, una tabla— no abre una barra.

### `Inline` — `stack="mobile"`

Por debajo de `md` la fila pasa a columna y cada pieza ocupa el ancho. Es lo
que quiere una fila de un control con su acción —un campo de mes y
«Descargar», un selector y un botón— en una pantalla estrecha, donde repartir
dos piezas deja a las dos sin sitio. La envoltura de `flex-wrap` no servía:
baja la pieza de línea pero la deja a su ancho natural.

### El README

Era literalmente la plantilla de Vite. Ahora cuenta qué es el paquete, cómo se
instala y se importa, qué trae, de dónde salen los tokens y qué NO es. Con él,
`description`, `repository` y `homepage`, que es lo que la página de npm
enseña.

## [38.12.4] — 2026-09-14

> **Patch.** El paquete queda listo para publicarse en npm. Nada de código.

`publishConfig.access: "public"` y `pnpm release:npm`, que lee el token de
`~/.config/slxd/npm-studiolxd.env`, escribe un `.npmrc` temporal, publica y lo
borra — sin `npm login` ni credenciales en la máquina. Va detrás de
`release:check` y del tag: se publica lo que ya pasó la puerta de calidad.

## [38.12.3] — 2026-09-14

> **Patch.** `action` de las pantallas del conector acepta una acción de
> servidor, no solo una URL.

`ConnectorConsentPage` y `ConnectorExternalSignInPage` tipaban `action` como
`string`. El `<form>` de React 19 acepta además una función, y es lo que
necesita el flujo de lmsmcp para arrancar el salto a la instalación del
cliente: al cablearlo hubo que pasar por un cast. El tipo se ensancha a
`string | ((formData: FormData) => void | Promise<void>)` y el `method="post"`
se pone solo cuando la acción es una URL — con una acción de servidor lo
gobierna React.

## [38.12.2] — 2026-09-14

> **Patch.** El chrome de las pantallas del conector, al criterio con el que se
> van a cablear. Solo cambian las stories y la documentación: las plantillas no
> se tocan.

Las cuatro pantallas montaban el idioma y el tema dentro de la barra superior.
Van **en la banda de preferencias del pie**, que es donde están en el resto de
páginas públicas de la suite, y la barra se queda **solo con el logotipo**:
quien está autorizando un conector no está navegando, y un menú ahí no ofrece
más que salidas de un flujo que hay que terminar o rechazar. La ranura
`preferences` ya existía en `ConnectorAuthShell` para esto.

Una story de contrato lo fija, para que la integración no se desvíe: un único
control en la barra, sin nada desplegable, y los dos selectores por debajo del
contenido.

## [38.12.1] — 2026-09-14

> **Patch.** Con cinco grupos, el menú del sitio dejaba el quinto solo en una
> segunda fila en pantallas anchas.

El reparto de la última fila de cada tramo se colaba en el tramo siguiente:
las medias queries de `min-width` se acumulan y esas reglas llevan dos
pseudoclases, así que pesan más que la regla del tramo de arriba. El quinto
grupo conservaba en el breakpoint ancho el `span 6` del tramo de tres
columnas, caía solo a una segunda fila y abría un tramo de 0px. Ahora cada
reparto vive en un rango cerrado; el del tramo más ancho se queda abierto,
que no tiene ninguno por encima. Lo vigila una prueba sobre la hoja: la story
que había solo podía comprobar `data-columns` —que estaba bien— porque el
runner no fija el ancho del viewport.

## [38.12.0] — 2026-09-14

> **Minor.** El chat en móvil y dos selectores que ahora saben ser campo de
> formulario. Ninguna prop existente cambia.

### `ChatShell` — el cajón es de la pantalla de chat

Tres cosas del cajón de conversaciones en pantallas estrechas:

- **Se queda dentro del armazón**, con su velo, en vez de tapar la aplicación
  entera: se monta en el propio `.chat-shell` y se mide contra él.
- **Su rótulo no se pinta.** Sigue nombrando el diálogo para quien lo escucha,
  pero se comía una línea de pantalla en la que caben dos conversaciones.
- **El botón que lo abre lleva el glifo de barra lateral**, no el de menú: con
  tres rayas se confundía con el menú de navegación de la aplicación, que está
  a dos dedos en la misma cabecera.

### `LanguageSwitcher` y `ThemeSwitcher` — `layout="stacked"`

Los dos nacieron para el chrome, donde la etiqueta va delante del control. En
un formulario de ajustes eso desentona con el resto de campos, que ponen la
etiqueta encima y el control a todo el ancho. `layout="stacked"` hace eso; el
valor por defecto sigue siendo `inline`.

De paso, un `DropdownField` apilado estira su control hasta el ancho del
campo, como `SelectField` o `InputField`. En línea conserva su ancho natural.

## [38.11.0] — 2026-09-14

> **Minor.** Seis arreglos de móvil y un modificador nuevo. La portada crece y
> apila sus botones, la barra pública se queda con lo imprescindible, el cajón
> lateral se aparta cuando se abre un diálogo desde dentro, un enlace de menú
> deja de teñirse de amarillo y el hilo de conversación ya no corta los picos
> de los globos. Ninguna prop existente cambia.

### `Hero` — la portada, a la medida de una pantalla estrecha

El título de móvil sube de 40 a 56px (`--hero-title-size-compact`, paso 8 de
la escala) y las acciones se apilan a todo el ancho por debajo de `md`
(`--hero-actions-block-width`). Dos botones en fila en 360px se reparten un
sitio que no da para su texto; apilados, el primario manda y el segundo se lee
igual. Medido con los títulos reales: el de `aipricing` y una palabra
compuesta alemana caben a 360 y a 390 sin desbordar.

### `SiteHeader` — en móvil, logotipo y menú

Lo que va en `actions` —hoy el botón «Panel»— se esconde por debajo de `md`
dentro de un `.site-header__actions` nuevo, que existe justo para poder
ocultarlo sin llevarse por delante el botón de menú. En una barra estrecha ese
botón aprieta el menú, y su destino cabe dentro del panel.

### `Sidebar` — el cajón se aparta cuando se abre un diálogo

Navegar cerraba el cajón móvil; abrir un diálogo desde dentro, no. El lanzador
de aplicaciones vive en el pie del cajón y se presenta como modal a pantalla
completa —la misma capa que el propio cajón—, así que los dos se quedaban
abiertos, con el velo del modal por debajo del cajón: la barra lateral sin
oscurecer, pegada al diálogo. Ahora un clic en `[aria-haspopup="dialog"]` lo
cierra, igual que un enlace. Los controles que abren capas ancladas (un menú,
un select) siguen sin cerrarlo: se usan dentro.

### `Menu` — un ítem que es enlace no se pinta como enlace

`Link.css` estila todo `<a>` que no sea botón, y ese selector pesa más que
`.menu__item` en cuanto el ítem entra en estado: con el puntero encima —o con
el dedo en móvil, antes de que Base UI marque `data-highlighted`— el ítem se
teñía del color de enlace y se subrayaba. En superficie oscura, amarillo de
marca. `Menu.css` lo neutraliza sin tocar el estado resaltado, que es del
menú. Lo vigila una prueba sobre las dos hojas: una story no sirve, porque el
`hover` de testing-library es sintético y no enciende el `:hover` del motor de
CSS.

### `Button` — `block="mobile"`

`block` acepta ahora `'mobile'`: ancho completo por debajo de `md` y ancho
natural a partir de ahí. Es lo que quiere un botón suelto dentro de una
página; en una pantalla estrecha, media línea de botón y media vacía se lee
como un error.

### `ConversationThread` — el pasillo de las colas es suyo

El relleno lateral que deja sitio al pico del globo valía cero por defecto y
solo lo declaraba `ChatShell`, así que un hilo montado a pelo salía con los
dos picos cortados contra el canto del desplazamiento. Ahora vale por defecto
exactamente lo que la cola sobresale. Quien necesite otro ancho sigue pisando
la variable.

## [38.10.0] — 2026-09-14

> **Minor.** Dos bugs de móvil que estaban en el DS, no en las apps: la portada
> pública desbordaba el ancho de la pantalla y el pie de la barra lateral
> —donde vive el lanzador de aplicaciones— caía fuera de la pantalla. Un token
> nuevo, `--hero-title-size-compact`; ninguna prop cambia.

### `Hero` — el título ya cabe en una pantalla de 360px

El paso 10 de la escala de títulos son 96px en **cualquier** anchura: la escala
no tiene peldaño móvil, y `.hero__title` no declaraba `overflow-wrap`. Medido a
360px, el documento medía 528px de ancho: scroll horizontal en las tres
portadas públicas de la suite y en `studiolxd.com`.

Bajo `md` el título pasa a `--hero-title-size-compact` (40px, el paso 7 de la
escala que ya existía) y declara `overflow-wrap: break-word`, que es lo que
salva una palabra compuesta alemana aunque la talla haya bajado. Con el parche,
el ancho del documento coincide con el de la pantalla a 360 y a 390.

### `Sidebar` — el pie del cajón vuelve a la pantalla

`.sidebar` declara `block-size: 100%` y `.sidebar--drawer` lo pone
`position: fixed` bajo la cabecera sin redeclarar el alto. En un elemento fijo
ese `100%` se resuelve contra el viewport entero, así que el cajón medía la
pantalla completa empezando la altura de la cabecera más abajo: sobresalía
justo esos 56px por el pie. Como `.sidebar__inner` es una columna flex con el
panel en `flex: 1` y el pie al final, lo que se perdía era exactamente el pie.

`block-size: auto` en el cajón: los dos insets ya fijan el alto. Medido a
390×780, el pie pasa de 796-836 (entero fuera) a 740-780. Afecta a las diez
apps con `AppShell`, no solo al lanzador del hub.

## [38.9.0] — 2026-09-14

> **Minor.** El texto que escribe un tercero deja de poder desmontar —ni
> falsear— la pantalla donde se conceden permisos. El nombre con el que se
> registró una herramienta, la cuenta y el host de retorno pasan ahora por una
> sola pieza, `UntrustedText`, en las cuatro plantillas de `ConnectorAuth`:
> **caracteres invisibles a la vista, dirección aislada, valor entrecomillado y
> recorte con desplegador**. Ninguna prop existente cambia.

### `ConnectorAuth` — todo dato de fuera se pinta igual

El registro de clientes del conector es abierto: **el nombre lo escribe quien
quiere pedir acceso** y llega tal cual. Lo mismo vale para la cuenta y para el
host de retorno, que es donde más daño hace. Tres problemas, tres respuestas, y
las tres en la plantilla:

- **Los caracteres invisibles se marcan, no se borran.** `U+202E` y compañía
  salen escritos (`[U+202E]`): un control de dirección convertía
  `gro.odigirroc-eldoom` en `moodle-corregido.org`, que en esta pantalla es
  suplantación y no fealdad. Marcados, el efecto desaparece igual que
  borrándolos, pero dos nombres que solo se diferencien en un carácter invisible
  **se siguen viendo distintos**. Entran controles y aislantes bidireccionales y
  espacios de anchura cero; **no** entran los juntadores `U+200C`/`U+200D`, que
  no reordenan nada y los necesitan el persa y los emojis compuestos.
- **El valor va aislado** en un `<bdi>` (`unicode-bidi: isolate`): tampoco puede
  reordenar el texto que lo rodea, y un nombre legítimamente en árabe o hebreo
  se sigue pintando en su sentido.
- **El valor va entrecomillado** (`valueQuotes`, por defecto `« »`). Que un
  nombre registrado como `<strong>Claude</strong>` se lea con sus signos es la
  defensa funcionando y no se toca; las comillas están para que se lea como lo
  que es —una cadena que alguien eligió— y no como un fallo de la interfaz.
- **Un valor larguísimo se recorta** a tres líneas
  (`--connector-auth-untrusted-max-lines`) y deja de empujar la decisión fuera
  de la vista. El recorte es solo visual —el texto completo sigue en el
  documento, y un lector de pantalla lo lee entero— y en la ficha hay un
  desplegador, «Ver el valor completo», que es un `<details>` nativo: **sin una
  línea de JavaScript**, como el resto de la pantalla.

Props nuevas, todas opcionales y con default castellano: `expandLabel`,
`collapseLabel` y `valueQuotes` en `ConnectorConsentPage`, `ConnectorSignInPage`
y `ConnectorRequestSummary`; `valueQuotes` en `ConnectorExternalSignInPage`,
cuya organización viene también de la petición.

### Tokens

- **`connector-auth.untrusted.*`** (`tokens/organism/connector-auth.json`) —
  cuántas líneas se ve de un valor de fuera y cómo se viste su desplegador. El
  anillo de foco y el cursor beben de `link.*`, así que el par oscuro sale solo.

## [38.8.0] — 2026-09-14

> **Minor.** Las pantallas del conector MCP —consentimiento, inicio de sesión,
> rechazos y el caso de Moodle— dejan de ser HTML a mano y JSON en crudo y
> pasan a ser plantillas del sistema, **de la misma familia que las de
> acceso**. Y cuatro arreglos del chat y del menú público vistos en
> producción: el aire de la ranura del hilo, el aspa de la lista de
> conversaciones, el título cortado que se lee en un bocadillo y el reparto de
> la última fila del índice del sitio. Ninguna prop existente cambia.

### `ConnectorAuth` — el flujo OAuth del conector, como plantillas

Cinco productos de la suite (bricks, lmsmcp, lrs, sharescorm y tender) sirven
un conector MCP con su propio servidor de autorización. La pantalla de
consentimiento era **una cadena de HTML con su `<style>` embebido**, sin una
sola pieza del sistema, y los rechazos no tenían pantalla: eran respuestas
JSON. Esta familia es ese flujo entero, hecho con el sistema. **No cablea
nada**: son plantillas y sus stories, para revisar.

- **`ConnectorAuthShell`** — el marco de las cuatro. Cuelga de
  `PublicPageShell`, se maqueta en dos columnas y reparte talla `lg`: conectar
  una herramienta es una pantalla pública de una sola decisión, de la familia
  de iniciar sesión o recuperar la contraseña, y no un documento suelto con su
  propio contenedor. Reenvía el `ref` al nodo del marco.
- **`ConnectorConsentPage`** — la principal. Frase en la cabecera, ficha
  verificable en la decisión y **las dos acciones** (hoy solo hay «permitir»).
  Denegar va primera en el DOM, permitir es la principal, y al cargar **no se
  enfoca nada** (`initialFocus`, que no admite `'approve'`). Con `action`
  funciona **sin JavaScript**, que es como la sirve el servidor
  (`default-src 'none'`).
- **`ConnectorSignInPage`** — se llegó sin sesión: enseña ya la ficha de la
  petición y manda a identificarse.
- **`ConnectorRejectionPage`** — **una plantilla con cinco variantes**
  (`invalid-client`, `invalid-redirect-uri`, `invalid-request`,
  `access-denied`, `session-expired`), agrupadas en tres causas. Ninguna
  ofrece reintentar en el sitio.
- **`ConnectorExternalSignInPage`** — el caso de Moodle, donde el conector es
  de la instalación del cliente y no hay nada que consentir en la suite.
- **`ConnectorRequestSummary`** — la ficha de los cinco hechos. El nombre de la
  herramienta es **dato de quien la registró**: se pinta como texto plano y se
  parte por cualquier punto, para que ni un nombre con marcado ni uno de 180
  caracteres puedan desmontar la pantalla.
- Textos con default castellano —los reales del producto en consentimiento y
  Moodle—; los que interpolan un valor son funciones, porque el orden cambia
  con el idioma.

### `ChatShell` — vuelve el aire de la ranura del hilo

Remata la v38.7.0: quitar los siete rellenos de golpe se pasó de frenada justo
aquí. El primer globo arrancaba tocando el selector de modelo de la cabecera y
el pico de los globos quedaba cortado contra el canto.

- **Nuevo `chat-shell.thread-padding-block`** (`{spacing.4}`): en el
  envoltorio, fuera del desplazamiento, así el pasillo no se va con el scroll.
- **Nuevo `chat-shell.thread-padding-inline`**
  (`calc({message-bubble.tail-size} + {message-bubble.border-width})`): tiene
  que llegar **por dentro** del hilo, que es el elemento que recorta —un
  `overflow-y` distinto de `visible` recorta también el eje contrario— y la
  cola del globo nace fuera de su caja. El armazón lo declara en su ranura y
  `ConversationThread` lo consume con `--conversation-thread-padding-inline`,
  **cero por defecto**: el hilo sigue sin rellenarse a sí mismo.

### `ConversationList` — el aspa y el título cortado

- **El icono del aspa pasa de `xs` a `sm`**, la pareja que usan todos los
  botones de icono del sistema para un `iconOnly` de talla `sm`. Era la
  excepción y se leía pequeña dentro de su cuadrado.
- **Token retirado**: `conversation-list.delete-margin-inline-end`. El aire
  hacia el canto lo pone el contenedor de las filas, no un margen de la pieza,
  que además descentraba el aspa y encogía su objetivo táctil.
- **El título cortado se lee entero en un bocadillo** al apuntar la fila o al
  enfocarla con el teclado, y **solo si está cortado de verdad**: se mide
  (`scrollWidth` contra `clientWidth`) en el propio evento que lo abriría, no
  al pintar la lista. `ConversationList` pasa a ser componente cliente.

### `Tooltip` — nueva prop `describe`

`describe={false}` no enlaza el bocadillo por `aria-describedby`. Es para
cuando el bocadillo **solo repite el nombre accesible del disparador** —un
texto que corta el CSS y que sigue entero en el DOM—: describir con lo mismo
que ya nombra hace que el lector de pantalla lo anuncie dos veces. Por defecto
`true`: nada cambia para quien ya lo usaba.

### `SiteNav` — la última fila reparte el sobrante

Con cinco grupos en `lg` salían tres arriba y dos abajo dejando el tercio
derecho vacío. **Cuántos grupos caben por fila no cambia** (1 / 2 / 3 / 4, y
hasta cinco en `xl` por `data-columns`): lo que cambia es que una fila
incompleta se reparte el ancho.

- La rejilla pasa de una columna por grupo a **doce tramos**, y cada grupo
  ocupa los que le tocan. Sigue siendo rejilla, sin anchos mínimos en píxeles y
  sin ningún atributo `style` —`style-src 'self'` los descarta en silencio—.
- Cuántos caen en la última fila se lee con `:nth-child`/`:nth-last-child`
  dentro de cada media query, que es donde se sabe cuántos entran por fila: no
  hace falta ningún atributo nuevo.
- **Límite conocido y aceptado**: las filas solo alinean cuando el número de la
  última divide al de una completa. Dos repartidos en el ancho de tres no
  alinean, y se prefiere eso al hueco.

## [38.7.0] — 2026-09-14

> **Minor.** El chat se queda sin ningún relleno propio y sin ninguna línea
> interior, la conversación abierta se dice en tinta también en oscuro, y
> `ConfirmDialog` aprende a llevar una tercera acción en el pie. Cae la tercera y última línea de `ChatShell` —la de encima de la
> caja de escribir— y se retiran los cuatro rellenos del armazón y el del hilo.
> Queda una sola medida de espaciado en toda la familia: el aire ENTRE la
> columna de conversaciones y el hilo, que ahora lo pone el contenedor con un
> `gap` en vez de ponérselo cada hijo. El principio: **quien compone, espacia;
> los hijos no se auto-rellenan**. Cambio visual deliberado en los tres
> productos que montan el chat (lmsmcp, lrs y tender); ninguna prop cambia.

### `ChatShell` — ni rellenos ni líneas

- **Fuera el `border-block-start` del composer**, la última línea que le
  quedaba al armazón. Con las dos que se retiraron en v38.6.0 —la de la columna
  de conversaciones y la de debajo de la cabecera—, el armazón se queda sin
  ninguna línea interior.
- **Fuera el relleno de `.chat-shell__list`, `.chat-shell__header` y
  `.chat-shell__composer`.** El aire alrededor del chat es una decisión de la
  pantalla que lo monta —cuánto respira, si va a sangre o dentro de un
  contenedor que ya tiene su propio inset—: un componente que se rellena por su
  cuenta la toma por ella y obliga a deshacerla.
- **Nuevo token `chat-shell.gap`** (`{spacing.6}`, 32px): la separación entre la
  columna de conversaciones y el hilo, que sobrevive al relleno que la ponía.
  Va como `gap` de `.chat-shell--with-list`, es decir **la pone el contenedor**,
  no cada hijo, y es la única medida de espaciado que le queda al armazón —
  porque es lo único que el consumidor no puede poner desde fuera. Sustituye
  al par `list-padding-inline` (8px) + `conversation-thread.padding-inline`
  (32px), que sumaban 40px de pasillo.
- **Tokens retirados**: `chat-shell.list-padding-block`,
  `chat-shell.list-padding-inline`, `chat-shell.header-padding-block`,
  `chat-shell.header-padding-inline`, `chat-shell.composer-padding-block`,
  `chat-shell.composer-padding-inline`, `chat-shell.border-width`,
  `chat-shell.border-style`, `chat-shell.border-color` y
  `chat-shell.surface-dark-border-color`. En v38.6.0 los `border-*` se
  conservaron porque todavía pintaban la línea del composer; ahora no pintan
  nada, y un token que no pinta nada es deuda. Del armazón siguen vivos
  `list-width`, `gap`, `header-gap`, `bg`, `breakpoint` y `surface-dark-bg`.
- **Consecuencia práctica, dicha en la doc**: montado a pelo, el chat toca los
  cantos. El aire lo pone el consumidor, alrededor del armazón o dentro de los
  slots. El cajón de pantalla estrecha no se ve afectado: ahí la lista va
  dentro de un `Sheet`, que pone su propio relleno.
- **Documentación**: `ChatShell.mdx` cambia la sección «Una sola línea» por
  «Ni líneas ni rellenos», con el principio y con la lista de lo retirado.
  Story nueva `Test — ni rellenos ni líneas`, que mide en navegador que las
  tres zonas van a cero, que no queda borde y que el `gap` sí está.

### `ConversationThread` — el hilo tampoco se rellena

- **Fuera `padding-block` y `padding-inline` del hilo**, y con ellos los tokens
  `conversation-thread.padding-block` y `conversation-thread.padding-inline`.
  Queda solo `conversation-thread.gap`, la separación entre mensajes.
- El centrado de la conversación sin mensajes **no cambia**: sigue siendo
  márgenes automáticos sobre el bloque que va solo. El test
  `Test — lo que va solo se centra` mide ahora contra cero en vez de contra el
  relleno que había.
- **Documentación**: sección nueva «El hilo no se rellena» en
  `ConversationThread.mdx`, que remite al mismo principio.

### `ConversationList` — la conversación abierta, en tinta también en oscuro

- **`conversation-list.surface-dark-item-active-color` pasa de
  `{color.accent-1}` (lavanda) a `{color.text.on-dark}`** (tinta plena). La
  lavanda venía del `SidebarNav`, pero la regla de este componente es que la
  conversación abierta **se dice con tinta y peso, no con un color de marca** —
  que es justo lo que ya hacía en superficie clara.
- **Coincide con el color del puntero, igual que en claro**, y no hace falta
  compensarlo: quien separa la abierta del resto de la lista es el peso
  (`item-active-font-weight`) frente al gris de reposo
  (`color.text.muted-on-dark`), más el `aria-current="page"` para quien no ve
  ninguno de los dos. Comprobado en el navegador sobre la superficie oscura.
  **Sin colores nuevos**: no se ha tocado la paleta.

### `ConfirmDialog` — una tercera acción en el pie

- **Nuevas props `secondaryActionLabel` + `onSecondaryAction`**: una acción
  intermedia que el diálogo coloca **entre la de descartar y la principal**
  («Permitir siempre» entre «Denegar» y «Permitir»). Se pinta solo si vienen
  las dos; **sin ellas el diálogo no cambia en nada**, así que no rompe a
  ninguno de los consumidores actuales.
- **El orden del pie es descartar → intermedia → principal**, y va así en el
  DOM: de ahí sale sola la colocación en las dos maquetas que ya tenía el pie
  (fila a la derecha en escritorio; apilada a todo el ancho en
  `column-reverse` por debajo de `--breakpoint-md`, con la principal arriba).
  Tres botones no se amontonan en estrecho porque a esa anchura no comparten
  fila.
- **La intermedia va en `outline`** —como la de descartar— y **se deshabilita
  mientras la acción principal está en curso**: el pie solo tiene dos niveles
  de énfasis, la principal y el resto.
- Es una prop y no un slot por lo mismo que el pie de un diálogo no se escribe
  a mano (regla 10 del sistema): el orden y el énfasis los pone el componente.
  La alternativa que se venía usando —meter el tercer botón por `children`— lo
  dejaba arriba, suelto y alineado a la izquierda.
- `secondaryActionLabel` **no tiene default castellano**: es texto del
  producto, de la misma familia que `title` y `description`, no algo que el
  diálogo diga por su cuenta. Anotado en Foundations › Internacionalización.
- Story «Con una acción intermedia», test de story
  `Test — el sitio de la acción intermedia` y dos pruebas unitarias (con y sin
  las props); sección nueva «Una tercera acción en el pie» en la `.mdx`.

## [38.6.0] — 2026-09-14

> **Minor.** El chat afina: `ChatShell` pierde dos de sus tres líneas —la que
> separaba la columna de conversaciones del hilo y la de debajo de la cabecera—
> y `ConversationThread` centra verticalmente la conversación que todavía no
> tiene mensajes. Cambio visual deliberado en los tres productos que montan el
> chat (lmsmcp, lrs y tender); ninguna prop cambia.

### `ChatShell`

- **Fuera el borde `inline-end` de la columna de conversaciones** —el que el
  usuario llama «el borde izquierdo que separa los chats»— y **fuera el borde
  `block-end` de la cabecera**, el de debajo del título. La columna ya se lee
  como columna por su ancho y por su aire, y la cabecera es una fila corta
  sobre un hilo que empieza más abajo: ninguna de las dos líneas separaba algo
  que no se viera solo.
- **La línea del composer se queda.** Es la única que hace trabajo: el hilo se
  desplaza por detrás mientras la caja de escribir se queda quieta, así que sin
  ella el último globo pasaría bajo el campo sin que se notara dónde acaba uno
  y empieza el otro.
- **Nuevo token `chat-shell.list-padding-inline`** (`{spacing.2}`, 8px): a
  cambio de la línea, la columna se pone su propio pasillo a los dos lados —
  antes solo tenía `padding-block`—. Sumado al aire del hilo
  (`conversation-thread.padding-inline`) quedan 40px entre la lista y los
  globos: la separación pasa de trazo a aire. El paso es corto a propósito,
  porque cada píxel de pasillo se lo quita al título de la conversación, que se
  trunca. Sin colores nuevos: la columna no se tiñe.
- **Los tokens `chat-shell.border-width|style|color` y
  `chat-shell.surface-dark-border-color` NO se retiran ni se renombran** —eso
  sería breaking para quien los remapee—: se quedan con el mismo nombre y con
  la `$description` corregida, porque ahora describen una sola línea, la del
  composer.
- **Documentación**: `ChatShell.mdx` deja de contar las tres líneas como parte
  del diseño y gana la sección «Una sola línea», con el porqué de lo que se
  quita y de lo que se queda. El cajón de pantalla estrecha (`Sheet`) no cambia:
  ahí la lista no pasa por `.chat-shell__list`, así que nunca tuvo esa línea ni
  ese pasillo.

### `ConversationThread` — la conversación sin mensajes se centra

- **El hilo ocupa todo el alto que le dan** (`flex: 1` + `min-block-size: 0`),
  no el de su contenido. Fuera de un contenedor flex las dos declaraciones se
  ignoran y el hilo sigue creciendo con su contenido, como antes.
- **Lo que va solo en el hilo se centra** en el alto disponible con márgenes
  automáticos: es la conversación recién abierta, donde la pantalla mete un
  bloque —normalmente un `EmptyState`— en lugar de los globos. La regla **no
  nombra a ese componente**: cuenta bloques (`:first-child:nth-last-child(2)`,
  porque el centinela del autoscroll siempre cierra el hilo). Con dos bloques,
  o con el contenido desbordando, los márgenes valen cero y todo vuelve arriba
  con el scroll de siempre — el hilo con mensajes no cambia en nada.
- **Nuevo atributo `data-content="children" | "messages"`** en el `<div>` del
  hilo: dice si los globos los monta el hilo o el producto. El centrado solo
  se aplica al caso `children`: así, una conversación de un solo mensaje lo deja
  arriba —donde irán los siguientes— en vez de pintarlo centrado y subirlo en
  cuanto llega la respuesta.
- Stories nuevas: «Conversación sin mensajes» en `ConversationThread` y en
  `ChatShell`, más el test `Test — lo que va solo se centra`.

### `ConversationList` — el texto de la lista vacía, documentado como default

- Sin cambios de API. Se aclara en el JSDoc de `emptyMessage`, en la `.mdx` y en
  una story nueva («Sin conversaciones — texto propio») que **la lista pinta
  ella el estado vacío con texto castellano por defecto** («Todavía no hay
  conversaciones»): quien no pase `emptyMessage` no se queda sin aviso, así que
  la pantalla no debe añadir uno propio encima — si lo añade, se ven dos.

## [38.5.2] — 2026-09-14

> **Patch.** El logotipo de la banda de marca del correo (`EmailLayout`)
> quedaba inset respecto al recuadro del mensaje: la celda que lo envuelve
> llevaba padding y el recuadro no, así que sus bordes izquierdos no
> coincidían aunque comparten el mismo `maxWidth`.

### Correo (`EmailLayout`)

- **La celda de la banda de marca ya no lleva `padding`.** El aire de
  seguridad ya lo da el margen del lienzo (`--email-canvas-padding-*`) y el
  PNG trae su propio padding horneado (`--email-logo-padding`): el padding de
  la celda solo desplazaba el logotipo hacia dentro respecto al recuadro del
  mensaje.
- **El `<Img>` sale con `marginLeft` negativo** — tanto como medía ese
  padding lateral (`-{--email-brand-padding-inline}`, hoy 16px) — para
  alinearse con el borde izquierdo del recuadro en vez de con el de su propia
  celda. Se escribe como el negativo del valor ya resuelto en JS, no como
  `calc(-1 * ...)`: `emailToken` ya devuelve píxeles absolutos (un correo no
  tiene `var()` que negar) y el soporte de `calc()` en estilos en línea es
  flojo en los clientes de correo. Nueva función `negatedEmailToken` en
  `emailTheme.ts`.
- **El `<Img>` gana un `marginBottom`** con el valor de
  `--email-brand-padding-block` para conservar el aire que antes daba el
  padding inferior de la celda respecto al recuadro de abajo — el resultado
  visual no cambia en el eje vertical, solo en el horizontal.
- **Tokens `email.brand-padding-block` y `email.brand-padding-inline`
  reutilizados, no retirados**: sus `$description` se actualizan porque ya no
  miden el padding de una celda, sino la magnitud del `marginBottom` y del
  `marginLeft` negativo del logotipo, respectivamente.

## [38.5.1] — 2026-09-14

> **Patch.** Corrige el incidente de producción del logotipo del correo:
> `v38.5.0` cambió sus medidas conservando el nombre del PNG.

### Correo (`EmailLayout`)

- **`EMAIL_LOGO_FILENAME` sube a `logo-v3.png`.** `v38.5.0` (más abajo, misma
  fecha) dio por hecho que "no se ha enviado ningún correo real" con
  `logo-v2.png` y por eso mantuvo el nombre al llevar el logotipo de 256×96 a
  626×202 (talla `xxl`) — el supuesto era falso: sí se habían enviado correos
  con esa URL. Gmail proxea y cachea las imágenes de los correos por URL, y no
  hay forma de forzar un refresco: siguió sirviendo el PNG viejo de 256×96
  cacheado, estirado a las medidas nuevas — deformado y pixelado en la
  bandeja. Con el nombre nuevo, `logo-v2.png` queda huérfano (se retira de
  `public/email/` y `dist/assets/email/`) y cada cliente de correo pide de
  cero `logo-v3.png`.
- **Guarda en `scripts/build-email-assets.mjs`**: si el PNG que ya vive bajo
  `EMAIL_LOGO_FILENAME` (el comprometido en el repo) tiene otras medidas que
  las que va a generar el build, falla en vez de sobrescribirlo en
  silencio — pide subir el nombre. Es la comprobación que habría cogido este
  incidente antes de publicarlo.

## [38.5.0] — 2026-09-14

> **Minor.** `ProgressBar` gana el filete de contorno del carril, y el logotipo de la
> cabecera del correo sube a la talla de la cabecera del sitio (`xxl`).

### Tokens (`progress-bar`)

- **`track-border-width`** (`{border-width.default}`) y **`track-border-color`**
  (`{color.text.on-light}`, prusia) — filete del carril en superficie clara.
- **`surface-dark-track-border-color`** (`{color.text.on-dark}`, blanco) — el
  mismo filete en superficie oscura.
- Mismo criterio que `fill-border-width`/`fill-border-color`, ya existentes: el
  carril es una superficie plana y, sin borde, un carril vacío o casi vacío es
  solo un bloque de fondo sin límite visible sobre la superficie ambiente.

### `ProgressBar`

- `.progress-bar__track` pinta el filete con `box-shadow: inset` (igual que el
  relleno), para no alterar la caja del carril. Story y MDX actualizados para
  enseñar el borde en ambas superficies.

### Correo (`EmailLayout`)

- **Logotipo a la talla de la cabecera del sitio.** `tokens/component/email.json ›
  logo-height` pasa de `{logo.height-sm}` a `{logo.height-xxl}`: a 32px se veía diminuto
  junto al resto de la marca del correo, y la cabecera del sitio (`SiteHeader`, prop
  `logoSize`) usa `xxl` por defecto. El PNG generado (`logo-v2.png`, sin cambio de
  nombre: no se ha enviado ningún correo real con él) pasa a verse a 313×101px (626×202px
  a 2x); sobra ancho de sobra en la banda de marca (568px útiles en los 600px del correo).
- `scripts/build-email-assets.mjs` y el generador de `src/stories/email/emailTokens.ts`
  (`sd.config.mjs`) ahora resuelven tokens en `calc()` (p. ej. `calc(64px * 4 / 3)`, la
  talla xxl del logotipo): antes solo sabían leer `rem` y `px` sueltos, y con `xxl` el
  build de assets del correo rompía (`magick: must specify image size`).

## [38.4.0] — 2026-09-13

> **Minor.** La cabecera del correo pasa del isotipo al **logotipo completo** ("Studio LXD").
> El PNG cambia de nombre (`logo-v2.png`) y de proporción.

### Correo (`EmailLayout`)

- **El logotipo completo en la banda de marca.** `scripts/build-email-assets.mjs` genera el PNG
  a partir de `src/assets/logo.svg` en vez de `src/assets/logomark.svg`: un correo no trae barra
  de navegación ni dominio a la vista que digan de quién es el mensaje, así que la marca tiene
  que poder leerse y un isotipo suelto no se lee. Mismo fondo blanco horneado, mismo aire, misma
  exportación a 2x.
- **Nombre nuevo: `logo-v2.png`.** `EMAIL_LOGO_FILENAME` sube a `logo-v2.png`. Gmail proxea y
  cachea las imágenes de los correos y no admite forzar un refresco: cambiar la imagen obliga a
  publicar una URL nueva. El `logo-v1.png` cuadrado **ya no se genera** y sale de
  `dist/assets/email/`; el host de assets lo mantiene mientras queden correos viejos en las
  bandejas.
- **Medidas.** El PNG pasa de 128 × 128 px (visto a 64 × 64) a **256 × 96 px, visto a 128 × 48**.
  `emailLogo` deja de ser cuadrado: `{ width, height, filename }` en vez de `{ size, filename }`,
  y el `<img>` de `EmailLayout` lleva las dos medidas por separado.

### Tokens

- **Nuevo `email.logo-height`** (`--email-logo-height`, `{logo.height-sm}` = 32px): el alto al
  que se ve el logotipo dentro del PNG. **Retirado `email.logo-mark-size`**
  (`--email-logo-mark-size`), que medía el lado del isotipo cuadrado y no tenía más consumidores
  que el correo.
- `email.logo-padding` se mantiene sin cambios (8px de blanco horneado por los cuatro costados).
- **El ancho no es un token**: sale de la proporción del trazado de `assets/logo.svg` (`viewBox`
  925,5 × 265,5), con `emailLogoWidthFor` (`src/assets/brand-assets.ts`) como único sitio donde
  se aplica, para que la imagen generada y los atributos del `<img>` no puedan discrepar. El
  script comprueba que el SVG siga declarando ese `viewBox` y falla si se separan.

### Migración

Nada que tocar en las apps: `EmailLayout` sigue con la misma API. Al bumpear el pin hay que
**volver a publicar `dist/assets/email/*` en el host de assets del correo**
(`https://slxd.app/brand/email/`), que ahora incluye `logo-v2.png`.

### `Link`

- **Story de `Link`: el ejemplo de contraseña vuelve a tone `accent`.** El cambio a `accent-1`
  de v38.3.0 fue un error: «¿olvidaste la contraseña?» es el ejemplo canónico del tono `accent`
  (el de texto y acciones), no el de `accent-1`. La story `Tonos` mantiene los tres tones con
  ejemplos coherentes — `accent` recupera «¿olvidaste la contraseña?», `ink` sigue con «Aviso
  legal» y `accent-1` pasa a «Descubre las novedades».

## [38.3.0] — 2026-09-12

> **Minor.** `Link`: nuevo tono `accent-1`.

### `Link`

- **Nuevo tono `accent-1`.** Además de `accent` (texto y acciones) e `ink` (utilitario: legal,
  volver), `Link` gana `accent-1`: pinta el enlace con el acento 1 de la paleta (lavanda,
  `color.accent-1`) — color saturado que ya contrasta en cualquier superficie, sin par
  surface-dark (mismo motivo que `Card`, `Step` o `ProgressBar`). Línea en reposo que desaparece
  en hover, igual en las dos superficies, coherente con cómo lo hace `accent`. Nuevos tokens
  `link.accent-1-color`, `link.accent-1-hover-color`, `link.accent-1-underline-width` y
  `link.accent-1-hover-underline-width`. El ejemplo de «¿olvidaste la contraseña?» de la story
  pasa de `ink` a `accent-1`; `ink` mantiene su ejemplo con «Aviso legal».

## [38.2.1] — 2026-09-12

> **Patch.** `CopyableValue`: el botón ya no salta solo a su propia línea en Chrome. `Table`:
> nueva prop `nowrap` en `Table.Cell`/`Table.Header` para valores que no deben partirse.

### `CopyableValue`

- **El botón ya no queda solo en su propia línea.** El WORD JOINER entre el valor y el botón
  sellaba el corte ENTRE caracteres, pero Chrome (y el resto de motores) abren oportunidad de
  salto antes de un inline atómico (`inline-flex`) aunque el carácter previo sea el joiner: con
  una celda estrecha, el botón se iba solo a la línea siguiente. Cuando `children` es una cadena,
  ahora se parte en `head` + `tail` (cola: desde el último separador `/ - _ .` si cae a menos de
  12 caracteres del final, si no los últimos 6) y la cola viaja con el botón en un tramo
  `white-space: nowrap` (`.copyable-value__tail`): si no caben, el flujo manda TODO el tramo a la
  siguiente línea, nunca solo el botón. Con `children` no textual, se aplica la misma idea cuando
  el nodo es corto (sin espacios, ≤ 24 caracteres); un nodo largo, con espacios, o cuyo texto no
  se puede determinar de antemano deja el comportamiento anterior (límite conocido, documentado
  en `CopyableValue.mdx`). `copyText` por defecto sigue siendo el texto completo, nunca la cola.
  `DescriptionDetails copyable` hereda la corrección sin cambios de API.

### `Table`

- **Nueva prop `nowrap` en `Table.Cell` (y `Table.Header`)**: impide el salto de línea del
  contenido de esa celda concreta (`table__cell--nowrap` / `table__header--nowrap`, misma técnica
  que `actions`) para un valor que no debe partirse —una URL, un identificador— sin encoger la
  columna a su mínimo. La tabla sigue resolviendo el desborde con scroll horizontal.

## [38.2.0] — 2026-09-12

> **Minor.** Nuevo átomo `CopyableValue`: el valor con su botón de copiar pegado, reutilizable
> fuera de `DescriptionList`.

### `CopyableValue`

- **Nuevo átomo**, subpath `@studiolxd/brand/copyable-value`. Es el mecanismo de
  `DescriptionDetails copyable` —el valor con el botón de copiar pegado al final, nunca al margen
  ni en su propia línea— suelto de la lista de definición: para el dato que se copia y no cuelga
  de un `<dl>` (una celda de tabla con una URL de endpoint, un identificador dentro de un
  párrafo). Mismo botón `ghost sm iconOnly`, mismo anuncio accesible, mismo `useCopyToClipboard` y
  el mismo separador de unión para el pegado. `children` acepta texto o nodos (un `Code`, un
  icono). Props: `children`, `copyText`, `copyLabel`, `copiedLabel`, `className`.

### `DescriptionList`

- `DescriptionDetails copyable` monta ahora `CopyableValue` por dentro. Sin cambios de API ni de
  aspecto; el DOM interno de la fila copiable pasa a tener un `<span class="copyable-value">`
  envolvente y las clases del valor y el botón cambian de `description-list__value` /
  `description-list__copy` a `copyable-value__value` / `copyable-value__copy` — el token
  `--description-list-copy-gap` se retira (el aire ahora sale de `--copyable-value-gap`).

## [38.1.1] — 2026-09-12

> **Patch.** El botón de copiar de `DescriptionDetails copyable` ya no se va al margen derecho:
> ahora va en línea, pegado al final del valor.

### `DescriptionList`

- **El botón de copiar va en línea, nunca separado del valor.** Con la fila copiable en flex y
  `margin-inline-start: auto`, un valor largo (una URL) que ocupaba varias líneas dejaba el botón
  arriba a la derecha, lejos del final del texto; en la maqueta de una columna, incluso suelto
  debajo. Ahora el valor fluye como texto corriente y el botón es un nodo en línea más, pegado al
  final del último carácter con un separador de unión (`WORD JOINER`, U+2060) que impide el corte
  entre ambos — y si ni así cabe en lo que resta de la última línea, el flujo normal lo manda a la
  siguiente, pegado a su principio, nunca al margen.
- Retirado el token `copy-value-padding-block` (centraba el botón con la PRIMERA línea del flex
  antiguo; con el botón en línea, `vertical-align: middle` basta).
- Nueva story «Copiable con valor largo» y doc actualizada en `DescriptionList.mdx`.

## [38.1.0] — 2026-09-12

> **Minor.** El `Alert` `default` deja de ser prusia sobre página oscura: ahí invierte a
> **relleno blanco con tinta prusia** (16,77:1, AAA), con el borde igual al fondo, como las
> tres intenciones de feedback. Tokens nuevos y un mecanismo nuevo de superficie.

### `Alert`

- **`default` invierte en superficie oscura.** Cuatro tokens nuevos en `tokens/component/alert.json`:
  `surface-dark-bg` y `surface-dark-border-color` (`{color.text.on-dark}`, blanco) y
  `surface-dark-title-color` / `surface-dark-description-color` (`{color.primary}`, prusia). En
  superficie clara no cambia nada. `success`, `error` y `warning` tampoco: sus rellenos son
  universales. Hasta aquí el relleno neutro seguía siendo prusia sobre página prusia y el filete
  blanco de 1px era el único separador; era una decisión declarada en la doc, y cambia.
- La superficie interior del relleno ya no se declara en la raíz sino en el contenido y en el aspa
  (`.surface-invert` en `default`; `.surface-dark` sigue en la raíz de `success`/`error`). La raíz
  del `default` no puede declararla: sus propios tokens voltean con el tema, y un selector de tema
  sobre ella le daría el valor de la otra cara.
- `Alert.css` copia la tinta del alert en `--alert-title-ink` / `--alert-description-ink` sobre la
  raíz, para que el texto de dentro siga leyendo la cara de fuera.

### Tokens

- **`.surface-invert`: la superficie contraria a la ambiente.** Nuevo selector del sistema de
  temas, en `DARK_SELECTORS` (`sd.formats.mjs`): sobre página clara trae los valores oscuros y,
  dentro de una superficie oscura, `src/tokens/surface-invert.css` —generado por `pnpm build:tokens`,
  como el derivado— devuelve a claro todo token que el modo oscuro voltea, ganando por
  especificidad. Es para el interior de un relleno que invierte el lienzo. No pinta el lienzo: solo
  lleva la tinta. Documentado en Foundations › Colores § «La superficie contraria a la ambiente».
- `base.css` añade `.surface-invert` al `color-scheme: dark` y le devuelve `color-scheme: light`
  cuando cae dentro de una superficie oscura.

## [38.0.6] — 2026-09-12

> **Patch.** Los dos flotantes de la cabecera de aplicación —el menú de usuario y el panel
> de notificaciones— se abren ahora a la misma distancia bajo el header.

- **Token compartido `app-header.flyout-offset`** (`{spacing.1}`, 4px): la separación entre
  el borde inferior de la cabecera y el flotante que ancla cada disparador. De él beben
  `user-menu.offset` y `notification-panel.offset`.
- **`UserMenu`: fuera el `sideOffset={4}` cableado en TSX.** El `BaseMenu.Positioner` lee
  ahora `--user-menu-offset` en runtime (mismo patrón que ya usaba `Popover` para
  `--popover-offset`), así que el número deja de estar fijo en el componente.
- **`NotificationPanel` pasa su propio `sideOffset` al `Popover`**, leyendo
  `--notification-panel-offset` en vez de heredar el `--popover-offset` genérico (8px, el
  de cualquier otro `Popover` de contenido libre): antes el panel se abría con el doble de
  aire que el menú de usuario y su borde superior quedaba pegado a la línea del header.
- `Popover`: `sideOffset` acepta ahora también una función (la forma de Base UI), no solo un
  número — lo que permite a un consumidor (aquí, `NotificationPanel`) leer su propio token
  en vez del de `Popover`.
- Medido en Storybook: antes del cambio, `UserMenu` abría a ~4px y el `Popover` del panel de
  notificaciones a 8px (`--popover-offset`); con el token compartido, los dos quedan en 4px.

## [38.0.5] — 2026-09-12

> **Patch.** Los activos del correo (logotipo y fuente) viajan en el paquete, como los
> iconos: `pnpm build:email-assets` ahora escribe también en `dist/assets/email/` y entra en
> `build:all`/`release:check`.

- **`scripts/build-email-assets.mjs` escribe en dos destinos, un origen.** Además de
  `public/email/` (para Storybook en local), genera el logotipo y la fuente en
  `dist/assets/email/` — lo que de verdad viaja al instalar el paquete y lo que el host de
  marketing (`https://slxd.app/brand/email/*`) debe servir. Antes solo se generaba
  `public/email/`, que `package.json › files` nunca publicaba: quien instalaba el paquete no
  recibía esos ficheros y nadie los servía en producción.
- **`build:email-assets` entra en `build:all`** (y por tanto en la comprobación de sync de
  `release:check`), después de `build:icons`.
- **`src/assets/brand-assets.ts`: nuevas `BRAND_EMAIL_ASSETS`, `EMAIL_LOGO_FILENAME` y
  `EMAIL_FONT_FILENAME`.** Mismo mecanismo que `BRAND_ICON_ASSETS` para los iconos.
  `emailTheme.ts` y `scripts/build-email-assets.mjs` leen los dos nombres de fichero de ahí en
  vez de repetirlos como literales.
- **Fix: `scripts/build-email-assets.mjs` leía un token que ya no existe.** `--email-light-bg`
  se retiró junto con el modo oscuro del correo; el script llevaba tiempo rompiendo en cuanto
  se ejecutara con los tokens actuales (nadie lo había corrido porque no estaba en
  `build:all`). Ahora lee `--email-bg`, el fondo de la caja donde vive el logotipo.
- Test unitario (`src/assets/build-email-assets.test.ts`): los ficheros de `BRAND_EMAIL_ASSETS`
  existen en `dist/assets/email/` tras el build, en los dos destinos.
- Doc: `EmailLayout.mdx` § «Dónde se aloja» explica los dos destinos y que cambiar el
  logotipo es publicar un nombre nuevo (`logo-v2.png`), nunca sobrescribir el que hay — la
  caché de Gmail no admite forzar un refresco.

## [38.0.4] — 2026-09-12

> **Patch.** Ajustes en los correos de ejemplo: la entrada de «Nuevas licitaciones» ya no
> lleva énfasis, y el enlace de respaldo bajo `EmailButton` pasa al formato de `EmailNote`.

- **`Correos.stories.tsx`: la entrada de «Nuevas licitaciones» ya no lleva `emphasis`.** El
  párrafo «Tres anuncios publicados esta semana encajan con tus perfiles de interés…» es texto
  corriente, no una frase destacada; era el único `<EmailText emphasis>` de entrada de todo el
  fichero.
- **`EmailButton`: el enlace de respaldo se pinta con el formato de `EmailNote`.** `emailStyles.
  buttonFallback` deriva ahora de `emailStyles.muted` (mismo color, tamaño y altura de línea que
  la nota), en vez de la talla del cuerpo; conserva sus propios márgenes
  (`--email-button-fallback-margin-block-start` / `--email-button-margin-block-end`) y el
  `<br/>` + URL en su propia línea. Afecta a los 18 correos de la suite que usan `fallbackLabel`,
  sin tocar ninguna app consumidora.

## [38.0.3] — 2026-09-12

> **Patch.** `CommandPalette` ya no revienta con un `keydown` sin `key`.

- **`CommandPalette`: guarda contra `keydown` sintéticos sin `key`.** El atajo global (⌘K/Ctrl+K)
  hacía `event.key.toLowerCase()` sin comprobar antes que `event.key` fuera una cadena. El
  autocompletado de Chrome y los gestores de contraseñas disparan `keydown` sintéticos sin `key`
  al rellenar un campo, y la página entera caía con `Cannot read properties of undefined
  (reading 'toLowerCase')`. Se descartan ahora esos eventos antes de leer `key`.

## [38.0.2] — 2026-09-12

> **Patch.** La baldosa de la app actual del `AppLauncher` ya no lleva borde.

- **`AppLauncher`: fuera el borde de la app actual.** `.app-launcher__tile--active` deja de
  pintar el `box-shadow` inset; la app actual se sigue distinguiendo por el peso del nombre
  (`tile-name-active-font-weight`), que se mantiene. Se retiran `tile-active-border-width`,
  `tile-active-border-color` y `surface-dark-tile-active-border-color` (claro y oscuro): el
  borde no era accesible de todos modos — la baldosa ya llevaba `aria-current="page"`, que
  se conserva como el marcado real de «app actual».

## [38.0.1] — 2026-09-12

> **Patch.** `Toggle`/`ToggleGroup` en superficie oscura ya no marcan el hover con borde `accent-1`.

- **El hover en oscuro marca con tinta, no con acento.** `surface-dark-hover-border-color`
  pasa de `{color.accent-1}` a `{color.text.on-dark}` — el toggle es un control de contorno,
  como `Button variant="outline"`, y ese botón ya usa la tinta (blanco) para el borde de
  hover en oscuro. El lavanda queda reservado al pulsado, que es el único estado con relleno.
- **`surface-dark-pressed-border-color` documentado, sin cambio de valor.** Ya coincidía con
  `surface-dark-pressed-bg` (ambos `{color.accent-1}`), que es la misma regla del modo claro
  (`pressed-border-color = primary = pressed-bg`): el borde pulsado es el del relleno. Solo
  se aclara el porqué en la `$description`.

## [38.0.0] — 2026-09-11

> **Major (breaking).** La tarjeta social (`@studiolxd/brand/og`) se rediseña y `ogCard` pierde la prop obligatoria `appName`.

- **`ogCard`: fuera `appName`.** La tarjeta ya no firma con el isotipo más el nombre de la
  aplicación, sino con el **logotipo completo de Studio LXD**, arriba a la derecha. La
  aplicación no se identifica: la tarjeta es de Studio LXD y la app se deduce del enlace.
  Quien quiera nombrarla, la pasa en `eyebrow` (`'Bricks · Documentación'`).
  **Migración:** quitar `appName` de la llamada; es un error de tipo si se deja.
- **Lienzo lavanda con tinta prusia.** El fondo pasa de `color.background.dark` a
  `color.accent-1`, y todo el texto —eyebrow, título, subtítulo— y el logotipo a
  `color.primary`. Es el par autocontenido de `Button primary`, así que no depende de la
  superficie ambiente. Desaparece la tinta secundaria (`color.text.muted-on-dark`) de la
  tarjeta.
- **Fuera la franja amarilla del pie** (`color.accent-2`): el color de marca lo pone ahora
  el lienzo entero.
- **El eyebrow se lee como antetítulo, no como una línea suelta.** Sigue la receta del
  eyebrow de `PrevNextNav`: va pegado al título (`spacing.2`; el aire grande, `spacing.5`,
  queda solo antes del subtítulo) y se distingue por peso (`font-weight.emphasis`), no por
  tamaño, mayúsculas ni caja. La tinta no cambia porque la tarjeta lee toda en prusia.
- **Escala.** Eyebrow a `site-shell.heading-size-6` y subtítulo a `site-shell.heading-size-7`
  (antes `-5` y `-6`); el título se queda en `-9`. El logotipo va al doble de
  `logo.height-xl`: a la talla de una cabecera la firma no se lee en una miniatura.
- **El margen vuelve a un nodo interior.** El lienzo lleva ancho fijo y satori lo mide como
  `border-box`, pero el navegador del catálogo no: con el padding en el lienzo, el logotipo
  se salía por la derecha en el preview HTML. Con el margen dentro, los dos motores dibujan
  lo mismo.

## [37.5.4] — 2026-09-11

> **Patch (tooling).** `release-check.mjs` gana un guardián que habría cazado la 37.5.2 directamente: compara el ÍNDICE de git de `dist/` contra el disco (no solo el disco consigo mismo) y falla si difieren en caja, con el comando de arreglo en el propio mensaje. El check de imports existente también compara ahora contra el índice, no solo contra el disco. Lógica pura extraída a `scripts/lib/case-guard.mjs` con tests (`scripts/lib/case-guard.test.ts`, ya en el proyecto `unit` de Vitest). CLAUDE.md documenta `git config core.ignorecase false` para este repo en macOS.

## [37.5.3] — 2026-09-11

> **Patch.** Corrige la 37.5.2: el índice de git en macOS (`core.ignorecase`) no registró los renombrados a minúscula de `dist/`, así que la etiqueta llevaba ficheros con mayúscula e imports en minúscula y nada resolvía. Reindexado con la caja exacta del disco.

## [37.5.2] — 2026-09-11

> **Patch.** `next build` en Linux/producción vuelve a resolver el CSS del logotipo (B16).

- **`Logo`: el CSS del chunk compartido resuelve en cualquier filesystem, no solo en macOS.**
  Desde v37.5.0, cuando el entry de `Logo` pasó a `Logo/index.ts` para reexportar
  `logoSvg`/`logoPaths` (8fe5a9bf), `Logo.tsx` quedó compartido entre tres entries
  (`logo`, `site-header`, `site-footer`) y Vite lo separó en un chunk propio —
  `_shared/Logo.js`, nombrado por el fichero fuente (`Logo.tsx`, con mayúscula) — que
  importaba `../Logo.css`. El CSS en sí se publicaba como `dist/logo.css`, en minúscula,
  porque ese nombre sale de la clave de `entryPoints` (`logo`), no del fichero fuente: dos
  reglas de nombrado distintas para el mismo par JS/CSS. En APFS (macOS), insensible a
  mayúsculas, el import resolvía igual; en Linux (`next build` en producción) o bajo
  Turbopack, sensibles a mayúsculas, fallaba con «Can't resolve '../Logo.css'» en
  cualquier app que montara `SiteHeader`/`PublicHeader`. `vite.lib.config.ts` fija
  `chunkFileNames`/`assetFileNames` para que ambos deriven siempre en minúscula del mismo
  nombre — ya no pueden divergir en caja. Sin cambios de API, props ni tokens.
- **Guardián nuevo en `pnpm release:check`**: tras `build:all`, recorre `dist/**/*.js`,
  extrae cada import relativo y comprueba con `readdirSync` (comparación exacta, sensible a
  mayúsculas — no `existsSync`, que en un filesystem insensible da un falso OK) que el
  fichero importado existe con ese nombre exacto; y comprueba además que `dist/` no tiene
  dos ficheros que solo difieran en mayúsculas (colisionarían al empaquetar en un
  filesystem insensible). Falla el release antes de taggear si vuelve a pasar.

## [37.5.1] — 2026-09-11

> **Patch.** El conector de `Steps` vuelve a llegar de una marca a la siguiente.

- **`Steps`: el conector entre marcas, arreglado (B15).** Desde que `StepMarker` pasó a ser
  de talla fija (v37.3.0), el conector seguía intentando estirarse con `flex-grow` y un
  margen negativo dentro del propio flujo — la técnica que usaba cuando la marca era un
  `NumberBadge` flexible. Ese margen negativo corrompía el alto mínimo que la rejilla usa
  para dimensionar la fila: en un paso sin descripción (solo título), la fila salía más baja
  que los 32px de la marca y esta se salía de su sitio, sin línea visible. El conector pasa a
  ser un `::after` fuera de flujo, anclado con `top`/`bottom` (o `left`/`right` en horizontal)
  a la celda de la marca — que la rejilla sigue estirando a la altura/ancho real de la fila —
  en vez de `flex-grow`: no participa en el cálculo del alto de la fila, así que no puede
  volver a romperlo. Sin cambios de API ni de tokens.

## [37.5.0] — 2026-09-11

> **Minor.** La marca como activos publicados: logotipo suelto, favicon único de suite y
> juego de iconos de aplicación.

- **`logo.svg`**: el logotipo completo, hasta ahora solo inline en `Logo.tsx`, existe también como fichero suelto (`src/assets/logo.svg`, publicado en `@studiolxd/brand/assets/logo.svg`) y como datos (`logoSvg`, `logoPaths`, `logoViewBox`, subpath `@studiolxd/brand/logo` y barril principal) — mismo patrón que ya tenía `Logomark` con `logomarkAssets.ts`. `Logo.tsx` pasa a consumir esos mismos trazados (`logoAssets.ts`) en vez de tenerlos repetidos inline; sin cambios de API, CSS ni clases BEM.
- **Un solo favicon para toda la suite, sin variantes por producto** (decisión de marca, 2026-09-11): nuevo script `scripts/build-icons.mjs` (`pnpm build:icons`, dentro de `pnpm build:all`) genera en `dist/assets/icons/` `icon.svg`, `favicon.ico` (16/32/48), `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` (margen del 20 % por lado, spec "maskable"), `apple-touch-icon.png` (180×180) y `manifest.webmanifest` — todos a partir de `logomark-safe.svg` sobre dos tokens, con el mismo criterio que el aviso del DS (CLAUDE.md § «Tokens de feedback», regla 8: relleno claro + tinta prusia, nunca tinta suelta): relleno `color.lavender` (`#BAABFF`, el primitivo de paleta más próximo a "violeta de marca") y tinta `color.primary` (`#111E30`, el prusia). Ninguno de los dos es un hex nuevo (regla de CLAUDE.md § «No se inventan colores»). Determinista: misma entrada, mismos bytes. El favicon del propio Storybook (`public/favicon.svg`) pasa a ser el mismo `icon.svg` generado.
- **Nuevo export `@studiolxd/brand/brand-assets`** (`src/assets/brand-assets.ts`): metadatos tipados (`BRAND_ICON_ASSETS`, `BRAND_SOURCE_ASSETS`, `BRAND_ICON_BG_COLOR`, `BRAND_ICON_INK_COLOR`) con la ruta, talla y propósito de cada activo publicado, para que un script de instalación en una app consumidora los copie sin adivinar nombres de fichero.
- **Nueva página Foundations → Marca** (`src/stories/foundations/Marca.mdx`): catálogo de logotipo, isotipo (y su área de seguridad del 10 %), el favicon único de suite y el juego de iconos generado, con enlaces de descarga de cada fichero.
- Tests nuevos: `Logo.test.ts` (paridad `logoSvg` ↔ `src/assets/logo.svg`, como ya tenía `Logomark`) y `src/assets/build-icons.test.ts` (el script produce los siete ficheros con las tallas del spec, es determinista, y el color de fondo es el primitivo de paleta esperado).

## [37.4.0] — 2026-09-11

> **Minor.** `Card`: tarjeta-opción marcada también por `:checked` (sin estado de React) y tarjeta-acción sobre `<button>`.

- **Tarjeta-opción (`selectable`) marcada también sin estado de React.** `.card--selectable:has(input:checked)` pinta la misma variante accent-1 que `selected`, a partir del propio input marcado — para un `RadioField`/`CheckboxField` no controlado (`defaultChecked`) o un formulario nativo sin React alrededor (el tema de Keycloak es el caso que lo motiva). `selected` sigue funcionando igual y manda cuando el consumidor sí lleva el estado. Story «Opciones sin estado».
- **Tarjeta-acción: el modo enlace admite `render` sobre un `<button type="submit">`.** Pulsar la tarjeta no navega, envía su `name`/`value` en el `FormData` del formulario que la contiene. El CSS del modo enlace ya no depende de que el elemento sea un `<a>`: `:where(button.card)` retira el chrome nativo del botón (appearance, borde, tipografía, ancho de contenido) antes de que las reglas de color lo vistan igual. Story «Tarjeta-acción (formulario)»; test unitario del contrato `render` + `FormData`.
- MDX: sección «Tarjeta-acción» junto a «Tarjeta-opción», con la regla para elegir entre las dos.

## [37.3.0] — 2026-09-11

> **Minor.** Átomo nuevo `StepMarker`, compartido por `Steps` y `Stepper`; sus marcas pasan de círculo a cuadrado.

- **`StepMarker` (atoms), nuevo.** La marca de un paso: un cuadrado —el radio del sistema
  (`{border-radius.default}`, rectas), no `round`— con una cifra, un icono del catálogo o el
  check de completado dentro. Es puramente decorativa (`aria-hidden` siempre). Props: `state`
  (`done` | `current` | `pending` | `neutral`, default `neutral`), `tone` (las mismas
  variantes que `NumberBadgeVariant`, default `primary`), `size` (`sm` | `md`, default `md`),
  `count`, `icon`.
- **Tokens `step.*` (`tokens/component/step.json`), nuevos.** Tamaño de marca `sm`/`md`,
  radio, tipografía de la cifra, fondo y tinta por tono, estilo hueco de `pending`, conector
  (grosor y color, recorrido y sin recorrer) y color de la descripción — compartidos por
  `Stepper` y `Steps`.
- **`Stepper` adopta `StepMarker`.** Misma API y los mismos tres estados; su marca pasa de
  círculo a cuadrado. `stepper.*` pierde los tokens de la marca (superseded por `step.*`) y
  conserva solo los suyos: etiqueta, forma compacta, subrayado de hover y anillo de foco.
- **`Steps` sustituye `NumberBadge` por `StepMarker state="neutral"`**, con el icono del paso
  dentro de la marca cuando lo trae. `badgeVariant` se renombra a `tone` (se mantiene como
  alias deprecado). El título por defecto pasa de talla `4` (20px) a talla `1` (14px, la de
  la etiqueta de `Stepper`), y la descripción y el conector comparten color y grosor con
  `Stepper` (`step.description-color`, `step.connector-*`). `steps.*` pierde los tokens de
  conector (superseded por `step.*`).
- Stories «Lado a lado» en `Steps` y `Stepper`, con los mismos textos, para comparar la base
  común y la diferencia (estado vs. contenido).

## [37.2.0] — 2026-09-11

> **Minor.** `OtpInput` en formularios nativos y molécula `RecoveryCodes`.

- **`OtpInput` en un `<form>` nativo**: si se pasa `name`, además de las celdas (`${name}-${i}`) se añade un `<input type="hidden">` con ese `name` y el código completo, actualizado en cada cambio — `new FormData(form).get(name)` devuelve el código sin depender de react-hook-form ni de ningún otro gestor JS. `form.reset()` vacía a la vez las celdas y el input oculto.
- **Nueva molécula `RecoveryCodes`**: códigos de recuperación de un solo uso (2FA) en una lista numerada real (`<ol>`), monoespaciada, en rejilla de 1 a 3 columnas CSS. Trae el botón de copiar todos (`CopyButton`); descargar o imprimir es decisión de cada producto, vía el slot `actions` — `brand` no implementa ninguno de los dos.

## [37.1.2] — 2026-09-11

> **Patch.** Solo la página de referencia «Sala de espera».

- **Sala de espera a mitades**: `Columns` pasa de `2:1` a `1:1`, como las páginas de acceso, y el botón «Cerrar sesión» usa `block` del DS en todas las tallas. Desaparece `SalaDeEspera.css`: no hacía falta CSS propio.

## [37.1.1] — 2026-09-11

> **Patch.** Rediseño de la página de referencia `Pages/Onboarding · Sala de espera`: de
> «Qué pasará» con tres pasos a dos columnas — la explicación a la izquierda, la salida sola
> a la derecha.

- **`Pages/Onboarding · Sala de espera`: dos columnas en vez de `Steps`.** La columna
  izquierda lleva un `PageIntro` («El acceso está restringido a invitaciones» + entradilla)
  y un `Paragraph` con el correo de invitación; la derecha, solo el botón «Cerrar sesión»
  como acción primaria, alineado arriba y al inicio (a ancho completo en móvil, bajo el
  texto). El `exitAction` de texto del marco y el pie de acciones del `OnboardingShell` se
  retiran de esta pantalla: la única acción vive en su columna, no hay nada que cancelar.
  - **`OnboardingPage`** (interno, sin exportar): nueva prop `width` (`'md' | 'wide'`,
    reenviada a `OnboardingShell`) para que un paso pueda pedir el ancho de página pública
    cuando reparte el contenido en columnas.
  - Nuevo `SalaDeEspera.css`, colocalizado con la story: el único CSS propio, la regla del
    botón a ancho completo en móvil (mismo criterio que el pie de `Form`).

## [37.1.0] — 2026-09-11

> **Minor.** Todo popup posicionado por Base UI (`Menu` y todo lo que lo monta por dentro —
> `ContextMenu`, `DropdownField`, `LanguageSwitcher`, `ThemeSwitcher` —, `Popover`,
> `AsyncSelect`, `AsyncMultiSelect`, `UserMenu`, `OrgSwitcher`, `AppLauncher`) limita su
> altura al espacio disponible y hace scroll en vez de salirse de la pantalla. Caso real: el
> `LanguageSwitcher` con ~30 idiomas en un móvil, el panel sobresalía por arriba y las
> primeras opciones quedaban inalcanzables.

- **Popups: altura máxima + scroll interno, como ya hacía `Select`.** `Select` y
  `MultiSelect` ya limitaban su panel a `--available-height` (el espacio que calcula el
  `Positioner` de Base UI) y hacían `overflow-y: auto`; el resto de popups del sistema no lo
  hacía. Se añade el mismo mecanismo — token `<bloque>-content-max-height` (o
  `popover-max-height`, que no tiene "content") con valor `var(--available-height)`, más
  `overflow-y: auto` y `overscroll-behavior: contain` para que el scroll del panel no arrastre
  la página de detrás — a `Menu.css`, `Popover.css`, `AsyncSelect.css`,
  `AsyncMultiSelect.css`, `UserMenu.css`, `OrgSwitcher.css` y `AppLauncher.css`.
  `ContextMenu` y `DropdownField` (y con él `LanguageSwitcher`/`ThemeSwitcher`) lo heredan
  sin cambios propios: montan `Menu` por dentro.
  - **Tokens nuevos:** `menu.content-max-height`, `popover.max-height`,
    `async-select.content-max-height` (hereda de `select.content-max-height`),
    `async-multi-select.content-max-height` (hereda de `multi-select.content-max-height`),
    `user-menu.content-max-height`, `org-switcher.content-max-height`,
    `app-launcher.content-max-height`.
  - `Select.css` y `MultiSelect.css` ganan `overscroll-behavior: contain`, que les faltaba,
    para quedar en el mismo punto que el resto.
  - `InputPhone.css` (el desplegable de país, que ya limitaba su altura con un token propio
    `input-phone.content-max-height` fijo en rem) gana también `overscroll-behavior: contain`.
  - Documentado en `Menu.mdx` y `Popover.mdx`, § «Colocación» / «Contenido».
  - Stories «Muchas opciones» en `Menu` y `LanguageSwitcher` (≥30 ítems, viewport móvil) con
    `play` que comprueba que el panel hace scroll (`scrollHeight > clientHeight`) y que no se
    sale de la ventana (`getBoundingClientRect().bottom <= window.innerHeight`); la de `Menu`
    comprueba además que recorrer la lista con flechas hasta el último ítem lo deja visible
    dentro del panel (scroll automático de Base UI).

## [37.0.0] — 2026-09-11

> **Major.** `CheckboxField`/`RadioField`/`SwitcherField` pierden el `padding-inline` de su
> `__control` (los custom properties `--checkbox-field-padding-inline`,
> `--radio-field-padding-inline` y `--switcher-field-padding-inline`, con sus variantes
> `sm-`/`lg-`, desaparecen). `AppLauncher` cambia el hover de su disparador solo-icono.

- **`CheckboxField`/`RadioField`/`SwitcherField`: el control ya no sangra respecto al resto
  de campos de un formulario.** Decisión del usuario (informe de un consumidor externo, el
  tema de login de Keycloak — opción 1): su `__control` llevaba `padding-inline` heredado de
  `control.padding-inline`, así que en una columna de `InputField` el cuadro de la casilla
  arrancaba 16px (24/32px en `lg`) a la derecha del borde de su propio campo. El área
  sensible al puntero ya la garantiza el átomo (`Checkbox`/`Radio` ya tenían un `::after`
  invisible de `size-target.min`, 24×24px, que no ocupa sitio en la maqueta; `Switcher` no lo
  tenía —su track mide 24px de bloque en `sm`— y se le añade con el mismo patrón, token
  `switcher.target-size`), así que el padding no hacía falta para el objetivo táctil.
  - `padding-block` se conserva: sigue dando aire vertical entre opciones apiladas.
  - Se retira también el `padding-inline` que heredaban el `.error-text` y el texto de ayuda
    de los tres campos (estaban sangrados para alinearse con el control, no con el borde de
    la columna).
  - **Ruptura:** desaparecen `checkbox-field.padding-inline` (+ `sm-`/`lg-`),
    `radio-field.padding-inline` (+ `sm-`/`lg-`) y `switcher-field.padding-inline` (+
    `sm-`/`lg-`) — y sus custom properties `--checkbox-field-padding-inline`,
    `--radio-field-padding-inline`, `--switcher-field-padding-inline` (y sm/lg). Ningún otro
    componente los leía (comprobado con grep).
  - Story «Alineado con otros campos» en `CheckboxField.stories.tsx`, con `play` que
    comprueba que el borde izquierdo del checkbox/radio/switcher coincide (±1px) con el de
    un `InputField` en la misma columna.
  - MDX de los tres campos: nueva sección «Alineación con otros campos».

- **`AppLauncher`: el disparador solo-icono ya no deja una línea bajo el icono de rejilla en
  hover, y la Tag «nuevo» acompaña el hover del tile.**
  - El disparador solo-icono (sin `labels.trigger`) dejaba, bajo el puntero, la misma línea
    de tinta que el resto de estados del sistema (`hover-line-width`/`-color`) — pero esa
    línea subraya texto, y bajo un glifo suelto se leía como un subrayado del propio icono
    (mismo razonamiento por el que las flechas de `Calendar` no la llevan). Se sustituye por
    la inversión de marca que ya usan los tiles del panel que abre: nuevos tokens
    `trigger-hover-bg`/`trigger-hover-color` (`{menu.item-highlighted-bg}`/`-color`, con par
    `surface-dark-*`). El disparador con texto (`labels.trigger`) no cambia: seguía sin
    pintar nada en hover, como un ítem de `SidebarNav`, y ahora resetea explícitamente
    `background-color` para no heredar el relleno de la variante solo-icono.
    - **Ruptura:** `app-launcher.hover-line-width`/`-color` (+ `surface-dark-hover-line-color`)
      desaparecen — sin sustituto directo, los sustituyen `trigger-hover-bg`/`-color`.
  - La `Tag` «nuevo» del tile no cambiaba de color en el hover de la entrada, mientras el
    nombre sí. Nuevos tokens `tile-badge-hover-bg`/`-color` (el par invertido de
    `tile-highlighted-bg`/`-color`, para que la Tag siga leyéndose como píldora de contraste
    sobre el tile relleno en vez de fundirse con él) que sobrescriben únicamente las custom
    properties de color de la `Tag` (`--tag-info-bg`/`--tag-info-color`) en el hover/foco del
    tile — nunca su CSS.
  - Dos stories nuevas, «Hover — disparador» y «Hover — Tag «nuevo»», **sin `play`**: se
    revisan visualmente en la captura de Chromatic. `userEvent.hover` no dispara el `:hover`
    nativo del navegador (no hay movimiento real del puntero) y leer la hoja de estilos desde
    el `play` para comprobar la regla resultó frágil entre el dev server local y el build de
    producción que usa Chromatic (CSS separado por chunk, minificado, `<link>` con
    `crossorigin`) — se descarta esa vía en vez de perseguir el entorno.

## [36.0.0] — 2026-09-11

> **Major.** `AppLauncher` retira el cuadrado de color/inicial de cada entrada: `accent` e
> `initial` desaparecen del tipo `LauncherApp`.

- **`AppLauncher`: cada entrada es solo el nombre de la app, sin el cuadrado de color con la
  inicial.** Decisión del usuario: el icono (`.app-launcher__tile-icon`, relleno con
  `app.accent` vía CSSOM) se retira del marcado y del CSS en las dos presentaciones
  (`modal`/`popover`). El icono de rejilla del botón disparador (`<Icon name="grid">`) no
  cambia — es el disparador, no una entrada.
  - **Ruptura:** `LauncherApp.accent` y la función interna `initial()` desaparecen. Ningún
    consumidor de la suite pasaba `accent` con otro propósito (se comprobó con grep en
    slxd) — no hay migración más allá de quitar el campo si algún consumidor lo pasaba.
  - El tile pasa de columna centrada (icono encima, nombre debajo) a fila alineada al
    inicio, coherente con un ítem de `Menu`: `tile-padding-block`/`tile-padding-inline`
    pasan a referenciar `{menu.item-padding-block}`/`{menu.item-padding-inline}` y se añade
    `tile-name-line-height` (`{menu.item-line-height}`), para que alto y aire casen con las
    listas de opciones del DS.
  - **La app actual (`currentAppId`) pasa de barra lateral a borde completo alrededor del
    tile**, por `box-shadow` inset (no `border`: no reserva espacio ni desplaza el texto).
    Tokens renombrados: `tile-active-marker-width`/`-color` → `tile-active-border-width`/
    `-color` (mismo valor: `{border-width.focus}` / `{color.primary}`, el par oscuro sigue
    en `{color.accent-1}`).
  - Tokens retirados (sin sustituto — la inicial ya no existe): `tile-icon-size`,
    `tile-icon-border-radius`, `tile-icon-font-size`, `tile-icon-font-weight`,
    `tile-icon-color`.
  - MDX y test actualizados: se quita la mención al icono/inicial y a `accent` (§ «Color de
    dato» del MDX desaparece entera), y el test de contrato comprueba que la rejilla no
    pinta ningún elemento `aria-hidden` junto al nombre.

- **`multi-select`/`async-multi-select`: el token `values-gap` se renombra a
  `selection-gap`.** No es un cambio de diseño — Style Dictionary 4.4.0 tiene un bug de
  resolución de referencias (`getReferences.js` hace `variable.replace('.value', '')` con
  un `String.replace` de texto plano, sin anclar al final del string) que confunde
  cualquier segmento de ruta que *empiece* por «value» — no solo «value» a secas, también
  «values-gap» — con el sufijo `.value`/`.$value` del propio alias DTCG. El resultado:
  `--async-multi-select-values-gap` salía sin resolver en `dist/tokens.css` y
  `dist/brand.css` (`{multi-select.values-gap}` literal en vez de
  `var(--multi-select-values-gap)`), una propiedad CSS inválida que el navegador descarta
  en silencio. Renombrar el segmento evita el bug sin romper la cascada de tokens (la
  alternativa — resolver el valor a mano en vez de referenciar — habría estado bien pero
  no hacía falta: el bug es del segmento de nombre, no de encadenar componente→componente).
  - **Ruptura:** `--multi-select-values-gap` y `--multi-select-selection-gap` (SCSS
    `$multi-select-values-gap` → `$multi-select-selection-gap`, e igual en
    `async-multi-select`). Quien sobreescribía la custom property a mano debe renombrarla.
  - `pnpm release:check` gana un paso nuevo: falla si `dist/*.css` contiene alguna
    referencia de token sin resolver (`scripts/release-check.mjs`), para que este bug de
    Style Dictionary no vuelva a colarse sin que nadie lo note.

## [35.0.0] — 2026-09-11

> **Major.** `AppLauncher` cambia su contenedor por defecto: rompe a quien confiaba en el
> panel flotante sin fijar `presentation`.

- **`AppLauncher` abre un modal por defecto, no un popover.** Nueva prop
  `presentation?: 'modal' | 'popover'` (default `'modal'`): con `'modal'` el disparador abre
  un `Modal` centrado, como `CommandPalette` — foco atrapado, aspa, cierre con Escape y
  título (`labels.title`, nueva etiqueta opcional con default «Aplicaciones»). `'popover'`
  recupera el panel flotante anclado al disparador que tenía el componente hasta v34. La
  rejilla de apps (`app-launcher__grid`, `__tile`…) es el mismo componente interno
  compartido por las dos presentaciones — sin cambios de aspecto en esta tanda, solo de
  contenedor.
  - **Ruptura:** un consumidor que instanciaba `<AppLauncher apps labels currentAppId />`
    sin `presentation` pasaba a abrir un popover; al actualizar a v35 pasa a abrir un modal.
    Para conservar el comportamiento anterior, pasar `presentation="popover"` explícitamente.
  - API por lo demás compatible: `apps`, `currentAppId`, `open`/`defaultOpen`/`onOpenChange`
    y `labels.open`/`labels.new`/`labels.trigger` no cambian.

## [34.1.2] — 2026-09-11

> Nota: la etiqueta `v34.1.1` de GitHub se cortó por error sobre el contenido de
> 34.1.0 y no debe usarse; este es el release con la fecha fija.


> **Patch.** Solo stories y configuración de Storybook: ni un cambio en
> componentes, CSS ni tokens. `dist/` no se mueve (solo el `.d.ts` nuevo del
> helper de fecha).

- **El catálogo vive siempre en la misma fecha: «hoy» ya no cambia de
  captura cada noche en Chromatic.** `Calendar` marca el día actual con
  `new Date()` en el propio componente, y `Calendar.stories.tsx`,
  `CalendarRoster.stories.tsx`, `CalendarPlanner.stories.tsx` y
  `ChatShell.stories.tsx` calculaban mes/eventos/marca de tiempo sobre
  `new Date()`. La línea base capturada un día quedaba desalineada al
  siguiente: pasó el 11 de septiembre con la línea base del día 10 (el
  marcador de «hoy» se había movido una casilla) y volvería a pasar cada
  noche.
  - `.storybook/preview.tsx` fija `Date` con `mockdate` a `STORY_TODAY`
    (domingo 15 de marzo de 2026 — mes de 31 días que empieza en domingo, para
    que la rejilla salga completa), una constante exportada desde
    `src/stories/utils/storyDate.ts`. El mock se fija al cargar el módulo,
    antes de montar ninguna story, y cubre el navegador de Storybook en local,
    `pnpm test:stories` (Chromium vía `@storybook/addon-vitest`) y la captura
    de Chromatic — los tres son el mismo entorno de navegador real.
  - Las cuatro stories dejan además de calcular sobre `new Date()` y derivan
    de `STORY_TODAY` explícitamente, para que se lean sin depender
    implícitamente del mock global.

## [34.1.0] — 2026-09-11

> **Minor.** Cuatro primitivas de correo nuevas, dos props nuevas en las que ya
> había y sus tokens. `EmailLayout` no cambia.

Sale del inventario de los ocho correos de producto de la suite —los que no son
del hub—. **Cada pieza la pide un correo real de hoy**; lo que no tenía un correo
detrás no se ha añadido.

- **`EmailHeading` gana `level`** — *para `TenderBatchEmail`*, que escribía su
  título de bloque a mano: 12px, mayúsculas y gris, tres decisiones que el
  sistema no tiene. `level={2}` es el mismo componente dos peldaños más abajo,
  como `<h2>`, con aire por encima que es lo que hace de él un corte. No es un
  `EmailSectionTitle` aparte: es un título más pequeño, que es lo que es.
- **`EmailText` gana `emphasis`** — *para `TenderBatchEmail`* (`summaryBar`): la
  frase que resume el correo antes del detalle. Sube al rol de énfasis del
  sistema y no toca nada más.
- **`EmailList` / `EmailListItem`** — *para `TenderBatchEmail`*, que pinta cinco
  listas (riesgos, requisitos, criterios, lotes y las que «también encajaron»)
  como párrafos con un `•` delante. Ahora son `<ul>`/`<ol>` de verdad, con
  `ordered` para la numerada: un bolo escrito a mano deja al lector de pantalla
  sin saber cuántos elementos hay, y el sangrado de la segunda línea lo tiene
  que fingir cada plantilla.
- **`EmailQuote`** — *para `moderation-email` de `lmsmarketplace`*, que cita las
  palabras de quien denunció un plugin con su propio `borderLeft` de 3px. Sin
  tono: citar no es avisar.
- **`EmailTag`** — *para `validation-email` de `lmsmarketplace`*, que tenía los
  tres colores de veredicto escritos a mano (`#006616`, `#ffcd00`, `#b30000`) en
  un `BADGE_COLORS` propio. Son exactamente los del sistema, así que migrar la
  app es un cambio de nombres y no de colores. `tone` es obligatorio y sin valor
  por defecto: una etiqueta de estado sin estado no dice nada.
- **`EmailDivider`** — *para `TenderBatchEmail`*, que usa dos `<Hr />` crudos de
  react-email y se queda con el borde en relieve que trae de serie. Es el `<hr>`
  vestido con los tokens del correo, sin API propia.
- **Los tres tonos son rellenos, y lo decide el aviso.** El amarillo de marca da
  1,50:1 sobre blanco y no llega al 3:1 de WCAG 1.4.11, así que el aviso solo
  existe como relleno con tinta prusia — no hay `warning-text-on-light` en el
  sistema y no se inventa uno. Darles a los otros dos una forma distinta habría
  dejado tres veredictos que no se parecen entre sí.
- **Ningún color nuevo.** Los 29 tokens que entran en
  `tokens/component/email.json` referencian todos a uno que ya existía: la
  escala pública, los roles de feedback, la paleta neutra.
- **Doc y catálogo.** `EmailLayout.mdx` estrena § «Correos de producto» con la
  regla (las apps componen; ninguna escribe objetos de estilo propios), la tabla
  de las nueve primitivas, el porqué del relleno y un § «Lo que a propósito NO
  hay» con las cuatro piezas que se escribieron y se retiraron por no tener un
  correo detrás —recuadro de aviso con tono, bloque de clave en mono, par
  etiqueta/valor y API de columnas— y con el aviso de que las columnas de un
  correo no se apilan en el móvil. En el catálogo, «Primitivas» se parte en
  «Texto y acción» y «Bloques», y «Correos de ejemplo» suma el aviso de
  licitaciones de Tender montado solo con primitivas, con un `play` que
  comprueba el contrato dentro del documento del cliente.
  `EmailPrimitives.test.tsx` lo vigila sobre el HTML renderizado, incluido que
  no se cuele un hex que no venga de un token del correo.

## [34.0.2] — 2026-09-11

> **Patch.** Solo stories, tests y documentación: ni un cambio en componentes,
> CSS ni tokens. `dist/` no se mueve.

- **Chromatic entra en el flujo del DS, y las 19 stories que rompían en él ya
  no rompen.** La primera subida capturaba las 1532 stories pero fallaba con 19
  *component errors*: stories con `play` que pasan en `pnpm test:stories` y
  revientan en el navegador de captura. La causa no era Chromatic sino los
  propios `play`, que daban por hecho lo que en local les regala el runner:
  `@storybook/addon-vitest` renderiza dentro de `act()`, que vacía los efectos
  de React antes de llamar al `play`; un navegador de verdad no lo hace.
  - `Modal` y `Sheet` (14 + 5 stories) buscaban el popup con
    `document.querySelector('.modal__content')` / `.sheet` nada más arrancar,
    cuando el portal todavía no existía → `null`. Ahora se espera con
    `await screen.findByRole('dialog')`.
  - Los dos «panel opaco en reposo» de cada uno esperaban a `animationend`.
    Donde las animaciones están desactivadas ese evento no llega nunca y el
    `play` se colgaba hasta el timeout. Ahora se espera al **valor final** con
    `waitFor`, que vale con animación y sin ella.
  - `AvatarUpload` › «la diana se anuncia y acepta el archivo» disparaba
    `dragenter` sobre `window` antes de que el efecto hubiera instalado el
    escucha. Ahora el evento va dentro del `waitFor`, que lo reintenta.
  - `Container` › «fondo y color voltean juntos» y `Logo` › «mide su talla y
    hereda la superficie» troceaban el hexadecimal del token de dos en dos. El
    CSS del Storybook compilado va minificado y ahí `#ffffff` viaja como
    `#fff`: salía `rgb(255, 15, NaN)`. Ahora el color lo resuelve el navegador
    con una sonda `color: var(--token)`.
  - `Tipografía` › «las fuentes las trae el DS» esperaba a
    `document.fonts.ready`, que resuelve en vacío cuando el `play` corre antes
    de la primera maqueta: no hay descarga pendiente y `check()` responde
    `false`. Ahora las tres caras se piden con `document.fonts.load(...)`.
- **El flujo queda escrito en CLAUDE.md**: dónde vive el token (fuera del repo,
  `~/.config/slxd/chromatic.env`), cuándo se corre (en cada release, después de
  `release:check` y antes del tag) y que la revisión y la aceptación se hacen en
  chromatic.com. El script `pnpm chromatic` lleva ya `--exit-zero-on-changes`, y
  los informes del CLI (`chromatic-diagnostics.json`, `chromatic.log`…) van al
  `.gitignore`. Se añaden además las tres reglas para escribir un `play` que
  aguante fuera de local.

## [34.0.1] — 2026-09-11

> **Patch.** Bug fix.

- **`color-scheme` sigue al tema del brand, no a la preferencia del sistema.**
  `base.css` anunciaba `color-scheme: light dark` en `html`, de forma estática:
  le prometía al navegador un modo oscuro automático por `prefers-color-scheme`
  que el sistema de tokens no hace — aquí el tema se voltea por clase o
  atributo (`.surface-dark`, `[data-theme="dark"]`, `html.dark`) y no hay ni una
  media query de esquema en todo el CSS generado.
  El desajuste se veía con **el SO en oscuro y la aplicación en claro**: el
  navegador oscurecía por su cuenta todo lo que el CSS no puede repintar
  —scrollbars, *pickers* nativos de fecha y hora, el desplegable nativo de un
  `<select>`— y, sobre todo, el fondo del autorrelleno de Chrome, que quedaba
  como una barra negra ilegible sobre un campo que el CSS seguía calculando en
  claro.
  Ahora `html` declara `color-scheme: light` y el par `dark` va bajo esos mismos
  tres selectores, así que el chrome nativo voltea a la vez que los tokens.
  Como la propiedad se hereda, una banda `.surface-dark` anidada también
  oscurece los controles nativos que contiene.
  **No cambia el contrato:** el tema lo sigue decidiendo el producto. Quien
  quiera seguir al sistema escucha `prefers-color-scheme` y aplica `html.dark`
  —el `system` del `ThemeSwitcher`—, y a partir de aquí eso voltea los tokens
  **y** el chrome nativo. Una aplicación con un selector de tema oscuro propio,
  distinto de los tres, debe declarar `color-scheme: dark` en él.
  Lo vigila `src/stylesheets/color-scheme.test.ts` contra el `DARK_SELECTORS`
  de `sd.formats.mjs`, que pasa a exportarse para eso.

## [34.0.0] — 2026-09-11

> **Major.**

- **Todos los `*Field` pintan su error con el átomo `ErrorText`**, en vez de
  un `<span>`/`<p>` propio con una clase `*__error` duplicada. Mismo `id`
  (para el `aria-describedby` del control), mismo `role="alert"`, misma
  condición de render y mismo resultado visual — ahora exacto, no solo
  parecido, porque es literalmente el mismo átomo.
  Campos tocados: `InputField`, `PasswordField`, `TextareaField`,
  `NumberInputField`, `SelectField`, `DropdownField`, `MultiSelectField`,
  `AsyncSelectField`, `AsyncMultiSelectField`, `CheckboxField`, `RadioField`,
  `SwitcherField`, `TimeField`, `DateTimeField`, `DatePickerField`,
  `InputPhoneField`, `OtpField`, `FileUploadField`, `AvatarUpload` y el
  `errors` de `Form`.
- **Ruptura**: se retiran las clases `*__error` de los campos de arriba
  (`.input-field__error`, `.checkbox-field__error`, `.form__error`…) y sus
  reglas de color/tamaño/margen. Quien las estilara desde fuera del sistema
  ya no tiene ese selector — el error se sigue pudiendo posicionar apuntando
  a `.error-text` (la clase del átomo) dentro del campo.
  `ImageCropDialog` no se toca: su error ya es un `Alert` de bloque, no una
  línea de texto — no hay clase de texto duplicada que unificar ahí.

## [33.5.1] — 2026-09-10

> **Patch.**

- **`PageIntro`**: la cabecera ocupa siempre todo el ancho disponible
  (`inline-size: 100%`). Dentro de un `Stack` con el `align` por defecto
  (`start`) se encogía a su contenido y, con `actions`, el botón quedaba
  pegado al título en vez de al margen derecho.
- **`Table`**: nuevo modificador `Table.Cell actions` (`white-space: nowrap`)
  para la columna de acciones — mismo valor que el `actions` de su
  `Table.Header`. Sin él, un enlace o botón de dos palabras («Ver recibo») se
  partía en dos líneas aunque la columna, encogida a `min-content` por
  `.table__header--actions`, tuviera ancho de sobra.

## [33.5.0] — 2026-09-10

> **Minor.**

- **`ErrorText`** (`./error-text`): el error de formulario suelto, para un
  error que pertenece a un control o a un dato que no es un campo
  (`<p role="alert" class="error-text">`, `as`, `id` para
  `aria-describedby`). Misma cara que el `errorMessage` de los `*Field`, por
  los tokens compartidos `form.error.*`. El MDX fija cuándo `ErrorText`,
  cuándo `Alert` y cuándo `errorMessage`.

## [33.4.2] — 2026-09-10

> **Patch.**

- **`ImageCropDialog`**: una imagen vertical ya no se recorta por abajo. El
  tope de alto del área va en la raíz de `ReactCrop`, que es de donde su
  hoja hace heredar el `max-height` al envoltorio y a la imagen.

## [33.4.1] — 2026-09-10

> **Patch.**

- **`ImageCropDialog`**: la selección inicial es la mayor que cabe con la
  proporción pedida, centrada: la imagen cuadrada entera; la vertical al
  100 % de ancho, centrada en vertical; la apaisada al 100 % de alto,
  centrada en horizontal (antes, el 80 % del ancho). `initialCrop` en
  `crop.ts`.

## [33.4.0] — 2026-09-10

> **Minor.**

- **`DescriptionDetails` copiable** (`copyable`, `copyText`, `copyLabel`,
  `copiedLabel`): el valor se lee como texto normal y el botón de copiar va
  al final del `<dd>`. Regla: un valor que se copia va en texto, no en
  `CodeBlock`. Conducta de copiado compartida en `useCopyToClipboard`
  (`CopyButton`, `CodeBlock`, `DescriptionDetails`). `./description-list`
  pasa a componente cliente.
- **`NotificationList`**: la hora en su propia línea bajo el cuerpo y las
  acciones (retirado el token `aside-gap`); los títulos sin leer ya no van en
  negrita (tokens `*unread-font-weight` retirados; `read-font-weight` →
  `title-font-weight`). Lo mismo en `NotificationPanel`, cuyos enlaces del
  pie pasan al tono `accent` (en oscuro: amarillo, línea en hover).
- **`PageIntro`**: la entradilla es una frase y termina con puntuación
  (MDX y JSDoc).
- Docs: el ejemplo de enlace en la frase de Tipografía, como código.

## [33.3.1] — 2026-09-10

> **Patch.**

- **`NotificationList`**: sin línea entre filas (retirados los tokens
  `separator-*`); a partir de `md` la hora cierra la fila por abajo, a la
  altura de la última línea del texto; el título mide su texto y no toda la
  columna (el enlace ya no ocupa la línea entera).

## [33.3.0] — 2026-09-10

> **Minor.**

- **`NotificationList`** (`./notification-list`): la lista de notificaciones a
  página completa, sin `Card`: filas a sangre con separador, columna del
  indicador siempre reservada, título y cuerpo a la izquierda y, a la
  derecha, las acciones de la fila (`renderActions`, más «Marcar como leída»
  si hay `onMarkRead`) con la hora debajo; bajo `md` la columna derecha cae
  bajo el texto. El ítem usa `unread`, como el panel.
- **`PageIntro`**: bajo `md`, las acciones van en bloque, una por línea y a
  todo el ancho.

## [33.2.0] — 2026-09-10

> **Minor.**

- **`NotificationPanel`**: «Marcar todas como leídas» pasa bajo la lista y
  sobre los enlaces del pie, como botón a ancho completo (`block`), y solo se
  pinta con `onMarkAllRead` y alguna notificación sin leer. La fila ya no
  pinta la barra de tinta en hover (retirados los tokens
  `item-hover-marker-*`); solo el cursor, como `SidebarNav`. La hora va bajo
  la descripción, alineada al final. Clase `notification-panel__mark-all-row`
  → `notification-panel__mark-all` (CSS interno del componente).

## [33.1.0] — 2026-09-10

> **Minor.**

- **`PageIntro` con `actions`**: la acción principal de la página a la derecha
  del título (fila `page-intro__row`, alineación `baseline` desde `md`; bajo
  `md`, las acciones bajo el título). `as?: 'header' | 'div'` para usarlo
  como cabecera de sección. Sin `actions` el marcado no cambia. Tokens
  `page-intro.*` de aire. El MDX fija los tres niveles de acciones: cabecera
  (acción principal), `FilterBar` (limpiar filtros) y `DataTable.toolbar`
  (acciones sobre la tabla), con una página de listado de ejemplo.

## [33.0.1] — 2026-09-10

> **Patch.**

- **`SwitcherField`, `CheckboxField`, `RadioField`**: la etiqueta pulsable
  termina donde termina su texto. La raíz es una columna flex y estiraba el
  `label` al ancho del formulario, así que el hueco vacío a la derecha también
  conmutaba el control (`align-items: flex-start` en la raíz).
- `LanguageSwitcher`: el comentario del compacto dice nombre, no código.

## [33.0.0] — 2026-09-10

> **Major.** Ningún componente emite ya un atributo `style` en el HTML del
> servidor: las apps pueden servir `style-src 'self'` sin `style-src-attr`.

- **Breaking — `Skeleton`**: desaparece la prop `style`; el bloque pasa de
  `<span>` a `<svg>` y `width`/`height` son atributos de presentación (las
  props sueltas se tipan como `SVGProps<SVGSVGElement>`).
- **Breaking — `Sparkline`**: `color?: string` se sustituye por
  `series?: 1…8` (`SparklineSeries` exportado); la ranura se resuelve en la
  hoja por `data-series`.
- `SiteNav`: columnas por `data-columns` (tope `site-nav.columns-max`).
- `ProgressBar`: valor por `data-value` (0…100) resuelto en la hoja.
- `Chart`: ranuras de color por `data-slot`, colores de dato por `fill`/
  `stroke` de SVG; muestras de leyenda y bocadillo como `<svg><rect>`. Atenuar
  una serie vuelve a apagar su color (antes el `style` ganaba al modificador).
  El rótulo de baldosa más allá de la octava ranura cae al token base.
- `Menu`, `Toaster`, `AppShell`, `Carousel`, `AppLauncher` (`LauncherTile`):
  medidas y acentos por el CSSOM con `useCssProperties`, solo en cliente;
  en SSR mandan los defectos de la hoja.
- `AuthPage`: el hueco del captcha por clase.
- Regla ESLint contra el atributo `style` en `src/stories/**` (regla 11 de
  CLAUDE.md § CSS y tokens).

## [32.14.0] — 2026-09-10

> **Minor.**

- **`CodeToken`** en `./code-block`: resaltado de sintaxis por clases
  (`code-block__token--<tipo>`, quince tipos en `CodeTokenType`) sobre seis
  tintas derivadas de primitivos existentes (`code-block.token.*`, con par
  oscuro). El resaltador sigue siendo del producto; brand solo pone la clase
  y el color. Tabla de ámbitos TextMate → tipo en el MDX.
- **`LineBreak`** en `./text`: el `<br>` dentro de una frase como componente.
- **`./og`**: `OgFont.weight` tipado como `OgFontWeight` (100…900), sin casts
  en los consumidores.

## [32.13.0] — 2026-09-10

> **Minor.**

- **`ListItem`** en `./list`: el `<li>` de una `List` como componente, con
  `as`. No pinta nada nuevo: la lista ya vestía sus hijos por elemento y la
  clase `list__item` repite el mismo aire para que una app sin HTML suelto
  tenga qué poner dentro de `List`.
- **`DescriptionTerm` y `DescriptionDetails`** en `./description-list`: el
  `<dt>`/`<dd>` como componentes, con `as`. Sin pintura nueva: las clases se
  suman a los selectores de elemento que ya existían.
- **`Banner`** (`./banner`): barra de sistema persistente, a ancho completo,
  fuera del contenido — «estás viendo la aplicación como…». Variantes `info`
  (relleno prusia, raíz `.surface-dark`) y `warning` (relleno de aviso, tinta
  del rol); ranura `actions`, `onDismiss` + `dismissLabel` (no se oculta
  sola). Tokens `banner.*` sin colores nuevos. El MDX abre con Banner vs Alert.
- **Tarjeta social (`./og`)**: `ogCard()`, `ogFonts()`, `OG_SIZE` y
  `OG_CONTENT_TYPE` para `next/og`/satori. Árbol con estilos en línea leídos
  de `tokens.ts` (excepción declarada: satori no lee CSS) y dos TTF estáticos
  de Google Sans Flex (300 y 500) en `assets/fonts` porque satori no acepta
  woff2 ni ejes variables. `ogFonts()` lee del disco (Node, no Edge).

## [32.12.0] — 2026-09-09

> **Minor.**

- **`TreeView` como árbol de carpetas de una barra lateral.** Acciones por
  nodo (`actions`, visibles al pasar el puntero o con el foco, sin robar
  selección ni foco), estados de destino de arrastre (`dropTarget`,
  `dropDisabled`, `data-drop`, `nodeRef` para dnd-kit), `iconExpanded`,
  truncado desde el cuarto nivel. La fila toma los tokens del ítem de
  `SidebarNav` por referencia: elegido solo en negrita, sin línea de hover,
  sin guías verticales. Tokens de arrastre nuevos en `tree-view.*`, sin
  colores nuevos. `SidebarNav` no cambia.
- **`Icon`: `folder-open` y `trash`.**
- **Pages/Bricks — barra lateral con carpetas**: la referencia visual del
  árbol dentro de la barra, desplegada y en rail, con menú, arrastre y
  papelera.

## [32.11.0] — 2026-09-07

> **Minor.**

- **`Link` viste también por clase.** El componente pone siempre `link`, y la
  cara del enlace (color, subrayado, hover, foco) cuelga de `:where(.link)`
  además de la etiqueta `a`, con la misma especificidad mínima. Así
  `render={<button type="button" />}` —una acción que se lee como enlace—
  sale igual que un `<a>`; el cromo del botón nativo se retira. Story «Como
  botón de acción» con su contrato. Los enlaces crudos siguen vestidos por la
  etiqueta.

## [32.10.6] — 2026-09-07

- **Pages/Segundo factor** y **Pages/Enlace mágico enviado** reflejan las
  pantallas reales: la vuelta al acceso es un enlace en la columna de la
  introducción (`aside`) y cambiar de método va `outline` a todo el ancho;
  el aviso del enlace enviado es el `success` del `Form` (solo texto, sin
  caja), como «Recuperar contraseña». Solo Storybook.

## [32.10.5] — 2026-09-07

- **Pages/Verificar correo**: la story refleja la página real — «Reenviar
  correo» en primary y «Iniciar sesión con otra cuenta» en la columna de la
  introducción (`aside`), como «Recuperar contraseña». Solo Storybook.

## [32.10.4] — 2026-09-07

- **`SidebarNav`: los enlaces de nivel principal van en tinta de ítem.**
  Tomaban el color de etiqueta de grupo, que en superficie oscura es gris
  atenuado: los enlaces no activos se leían como apagados. Ahora
  `sidebar-nav.item-color` (prusia en claro, blanco en oscuro).

## [32.10.3] — 2026-09-07

- **`Sidebar` en rail: el `AppLauncher` con texto vuelve a ser icono.** Con
  `labels.trigger` el disparador enseña «Aplicaciones» a la derecha del
  icono; en el rail (56px) ese texto no cabe: se oculta y el botón recupera
  la talla cuadrada del disparador sin texto.

## [32.10.2] — 2026-09-07

- **`Input` y `Textarea`: el placeholder vuelve al gris de placeholder del
  sistema** (`color.text.placeholder-on-light|dark`), también en error y en
  superficie oscura. Iba en tinta y un campo vacío parecía relleno. Se alinea
  con `MultiSelect` y `CommandPalette`, que ya lo hacían.

## [32.10.1] — 2026-09-07

- **`Card`: la `List` de dentro toma la tinta de la tarjeta.** `List` pinta
  con su propio token de texto y no heredaba: en tema oscuro, sobre una
  tarjeta `accent-1` (o `selected`), la lista salía clara sobre lavanda. Las
  variantes de color y la tarjeta-opción marcada remapean `--text-list-color`.

## [32.10.0] — 2026-09-07

> **Minor.**

- **`OnboardingShell width="wide"`.** La columna del paso crece al ancho de
  página pública (token `onboarding-shell.max-width-wide` → 1280px) para un
  paso con una fila de tarjetas, como la elección de plan. Por defecto sigue
  la medida estrecha.

## [32.9.0] — 2026-09-07

> **Minor.**

- **`Card selectable` / `selected`** (modo contenedor). La tarjeta entera es
  la opción de un grupo: el `RadioField`/`CheckboxField` que lleva dentro se
  extiende a todo el bloque, invisible, y pulsar en cualquier punto marca la
  opción; el foco se dibuja sobre la tarjeta. La marcada (`selected`) toma
  accent-1. Tokens `card.selectable-focus-ring-*`.

## [32.8.1] — 2026-09-07

- **`Table`: la última fila tampoco subraya su cabecera de fila.** Con
  `TableHeader scope="row"` en el cuerpo, la última fila perdía la línea en
  las celdas pero la conservaba bajo la primera columna.

## [32.8.0] — 2026-09-07

> **Minor.**

- **`CardFooter direction="column"`.** Las piezas del pie apiladas y a todo
  el ancho, para una línea de texto pegada sobre el botón (una nota de
  prueba, una condición). Por defecto sigue siendo `row`.

## [32.7.0] — 2026-09-07

> **Minor.**

- **`Button variant="text" tone="ink"`.** La misma pareja de tonos que `Link`:
  con `ink` el botón-enlace toma la tinta de la superficie y su subrayado
  (`button.text.ink-*` → `link.ink-*`). Para acciones utilitarias que no
  deben leerse como enlace de acento (abrir o cerrar un bloque, deshacer).

## [32.6.0] — 2026-09-07

> **Minor.**

- **`CardDescription lines={1|2|3}`.** Reserva esa altura (`min-block-size`
  en `lh`) aunque el texto sea más corto: en una fila de tarjetas de precio,
  la cifra queda a la misma altura tenga la descripción una línea o dos.

## [32.5.2] — 2026-09-07

- **`Columns intermediate={false}` ya llega a sus columnas en escritorio.**
  La regla del tramo `md` (una columna) pesaba más que la de `lg` y ganaba
  también allí: tres o cuatro columnas «sin salto intermedio» se quedaban
  apiladas en escritorio. Ahora `lg` nombra la variante y reparte.
- **`CardFooter` se ancla abajo** (`margin-block-start: auto`): en una rejilla
  estirada, los botones de tarjetas hermanas quedan a la misma altura aunque
  el contenido de cada una mida distinto.

## [32.5.1] — 2026-09-07

- **Las etiquetas `sm`/`lg` de `SwitcherField`, `CheckboxField` y `RadioField`
  siguen al `Label`, no al párrafo.** Apuntaban a `text.paragraph.large`, que
  en la superficie pública crece con la escala de prosa: el conmutador de
  precios salía con una etiqueta enorme. Ahora `{label.lg-font-size}` /
  `{label.sm-font-size}`, como el resto de campos.

## [32.5.0] — 2026-09-07

> **Minor.**

- **`Columns`: salto intermedio opcional (`intermediate`).** Con 3 o 4
  columnas, por defecto la rejilla pasa por un tramo de dos columnas entre
  `md` y `lg`. Con `intermediate={false}` se salta ese paso: de una columna
  en móvil a las definitivas directamente en `lg` — para piezas que nunca
  deben leerse como "dos y una suelta" (tres packs de crédito).
- **`Columns`: con `align="stretch"`, las celdas de la fila miden igual.**
  El hijo directo de cada `.columns__col` ahora ocupa toda la altura de su
  celda (sin depender de que sea una `Card`), así que tarjetas con
  contenido de distinta longitud quedan alineadas en la fila.
- **`Switcher`: talla `lg` más contenida.** `lg-track-width`/`lg-track-height`/
  `lg-thumb-size` pasan de `em` a `rem` (3rem × 1.625rem, thumb 1.25rem):
  antes se escalaban también con la fuente del párrafo `large` del campo y el
  control salía casi el doble de grande que `md` en vez de un paso por
  encima. El ancho del track queda alineado con `size-component.lg` (48px),
  como el resto de campos en `lg`. `sm`/`md` no cambian.

## [32.4.3] — 2026-09-06

- **`Pagination`: los chevrones cuadrados también en `sm` y `lg`.** La regla
  por talla volvía a poner `padding-inline` a los chevrones; ahora la del
  chevrón va al final con la misma especificidad. (32.4.1 y 32.4.2 lo
  anunciaron sin conseguirlo; la caja además incluye el borde.)

## [32.4.2] — 2026-09-06

- **`Pagination`: los chevrones sin inset lateral, de verdad** (la 32.4.1
  anunció el arreglo sin aplicarlo).

## [32.4.1] — 2026-09-06

- **`Pagination`: los chevrones sin inset lateral.** En talla `lg` icono +
  padding superaban el lado de la caja cuadrada (50 px frente a 48). Un
  chevrón no necesita padding: la caja lo centra.

## [32.4.0] — 2026-09-06

> **Minor.**

- **`Pagination`: los botones son `outline`, en tres tallas.** Los números y los
  chevrones dejan de ser texto plano con subrayado en hover y pasan a dibujarse como un
  `Button variant="outline"` en miniatura, con sus estados y por referencia a sus tokens:
  reposo con borde y tinta `color.primary` sin relleno; hover con relleno `color.primary`
  y tinta clara —**sin subrayado**—; página vigente (`aria-current="page"`) con ese mismo
  dibujo más `font-weight.emphasis` y sin cambio al pasar por encima; deshabilitado con
  borde y cifra en `color.disabled.border-on-light`. En superficie oscura, el par del
  `Button outline`: borde y tinta blancos en reposo, relleno blanco con tinta prusia en
  hover y en la página activa, `color.disabled.border-on-dark` deshabilitado.
  La caja de todos los botones es **cuadrada** (`min-inline-size` igual a la altura), de
  modo que un «1» mide lo mismo que un «‹»; los puntos suspensivos conservan la caja pero
  siguen sin borde.
- **`Pagination`: prop `size` (`sm` | `md` | `lg`, por defecto `md`).** Altura,
  tipografía y caja de cada talla salen de los tokens del `Button` de esa talla —32/40/48
  px—; `sm` para una tabla densa, `md` para la aplicación (la que usan `DataTable` y el
  pie de las tablas) y `lg` para la superficie pública. La talla viaja al `Select` de
  registros por página. `FormSizeContext` no aplica: el paginador no es un campo.
  Lo que va en `afterPageSize` lo dimensiona quien lo pasa — las stories de `Pagination`
  y `DataTable` suben su botón «Exportar» a la talla del paginador.
  - Tokens nuevos: `pagination.btn-height`, `btn-font-size`, `btn-border-width`,
    `btn-border-style`, `btn-bg`, `btn-border-color`, `btn-hover-bg`,
    `btn-hover-border-color`, `btn-current-bg`, `btn-current-border-color`,
    `btn-disabled-bg`, `btn-disabled-border-color`, `sm-btn-height`, `sm-btn-font-size`,
    `lg-btn-height`, `lg-btn-font-size`, `sm-font-size`, y sus pares `surface-dark-*`.
  - Tokens retirados: `pagination.btn-hover-underline-width` y
    `btn-hover-text-decoration` (ya no hay subrayado), `btn-min-width`,
    `btn-padding-block`, `sm-btn-min-width`, `sm-btn-padding-block`, `lg-btn-min-width`,
    `lg-btn-padding-block` (la caja la fija la altura) y `md-font-size` (la talla `md` es
    ahora la base, `pagination.font-size`).
- **`Table`/`DataTable`: la columna pegajosa pierde el filete de inicio.** Lo que la
  distingue del contenido que pasa por debajo es su fondo opaco (`table.sticky-bg`), y
  nada más: una línea ahí se leía como un borde con peso de dato en una tabla que ya
  tiene los suyos. Tokens retirados: `table.sticky-separator-width`,
  `table.sticky-separator-color` y `table.surface-dark-sticky-separator-color`.

## [32.3.0] — 2026-09-06

> **Minor.**

- **`Table`/`DataTable`: columna de acciones pegajosa al desbordar.** Con muchas
  columnas la tabla mide más que su contenedor y la columna de acciones caía fuera
  del recorte de `.table__wrapper` —en macOS, sin barra de scroll visible, el menú de
  fila quedaba inalcanzable. `Table.Header`/`Table.Cell` aceptan `sticky="end"` (y
  `DataTable`, `meta: { sticky: 'end' }`, junto a `align`/`headerHidden`): la columna se
  pega al borde final (`inset-inline-end: 0`) con un fondo opaco por token
  (`table.sticky-bg`) que tapa el resto de columnas al deslizarse por debajo, y un
  filete de inicio recesivo (`table.sticky-separator-color`) que marca el
  desbordamiento — no un borde con peso de dato, el mismo criterio que la rejilla de
  `Chart`.
- **`Chart`: la rejilla en superficie oscura corrige su procedencia.**
  `chart.surface-dark-grid-color` apuntaba a `color.surface.secondary-on-dark`, un
  token de SUPERFICIE — el mismo defecto de origen que hizo invisible el carril del
  Stepper. El valor visual era correcto (la rejilla es cromo recesivo a propósito) y
  no cambia: ahora apunta al nuevo token de línea `color.border.recessive-on-dark`
  (mismo `grey-darkest`).
- **`PublicPageShell`: ranura `preferences`.** La banda de «idioma + tema» que el
  panel de estado y el alta montaban cada uno por su cuenta pasa a ser del marco.
  Nueva prop `preferences?: ReactNode` —se le pasan los conmutadores sueltos— que
  pinta una `section` con nombre accesible (`preferencesLabel`, «Preferencias» por
  defecto) **entre el contenido y el `footer`**, al ancho de página, con los
  controles alineados al final y con envoltura. Va en su propio `ErrorBoundary`,
  como `header` y `footer`; con `shell={false}` no se pinta, porque no hay ranura
  de pie donde ponerla. Tokens nuevos: `public-page-shell.preferences-padding-block`
  (→ `legal-footer.padding-block`, el aire del pie público) y
  `public-page-shell.preferences-gap` (→ `spacing.3`).
- **`OnboardingShell` usa esa ranura por debajo.** Nueva prop `preferences`, con
  `switchers` conservada como **alias** (si se pasan las dos, manda `preferences`)
  para no romper a quien ya la usa. Con marco, la banda la pinta ahora
  `PublicPageShell`: desaparecen la clase `.onboarding-shell__settings--band` y el
  envoltorio `.onboarding-shell__switchers`, y con ellos el token
  `onboarding-shell.settings-padding-block` (sin más uso: el aire lo decide el
  marco, y sigue saliendo de `legal-footer.padding-block`). Sin marco
  (`shell={false}`) las preferencias vuelven a la columna del alta, ahora con
  nombre accesible. Nueva prop `preferencesLabel`.
- **`Pages/Estado del servicio` usa la ranura.** La página deja de montar su
  `Container as="section"` + `Inline` a mano: solo pasa los dos conmutadores. La
  banda cierra con el aire del pie público (24px) en vez del `space="sm"` (12px)
  que tenía cuando la montaba ella.
- **Fundamentos › Tipografía: «Un enlace dentro de un título».** Cuándo vale meter
  un `Link` dentro de un `Heading` (el «nombre (dominio)» del panel de estado), por
  qué no se envuelve el título entero, cómo queda el nombre accesible de cada uno,
  dónde va la puntuación y por qué el subrayado no se quita.
- **Tres pantallas públicas de hub, con story.** `Pages/Segundo factor` (el
  `OtpField` de seis dígitos, el código de recuperación y las dos salidas en
  `outline`), `Pages/Enlace mágico enviado` (el aviso que sustituye al formulario)
  y el estado «Inválida con sesión» de `Pages/Aceptar invitación` (con quién se
  entró y una sola salida, al panel). Textos copiados de los catálogos de hub.

## [32.2.0] — 2026-09-06

> **Minor.**

- **`NotificationPanel`: «Marcar todas como leídas» sube encima de la lista.** Deja
  de vivir en el pie (donde compartía fila con los enlaces de servicio) y pasa a una
  fila propia justo encima de la lista, con el botón alineado al final. Sigue
  dependiendo solo de `onMarkAllRead`: sin la prop no hay fila. El foco de apertura
  sigue entrando por la primera notificación (no por este botón nuevo).
- **`NotificationPanel`: fuera la línea entre la lista y el pie.** Ya no hay
  `border-block-start` en el pie: el cambio de bloque lo marca solo el aire de su
  padding. Se retiran los tokens `notification-panel.separator-thickness`,
  `notification-panel.separator-color` y `notification-panel.surface-dark-separator-color`
  (sin más uso); nuevo `notification-panel.mark-all-padding-block` para el aire de la
  fila del botón.
- **`CodeBlock`: variante de una línea.** Sin saltos de línea en `children` (o con la
  prop explícita `singleLine`), el bloque pasa a ser una fila: el código a la
  izquierda con su propio scroll horizontal y, a la derecha, el lenguaje y el botón
  de copiar centrados en vertical — sin la cabecera aparte que dejaba un hueco vacío
  encima del texto en un bloque corto (por ejemplo, una URL con botón de copiar).
  Multilínea, o con nodos ya resaltados por un highlighter externo, se queda con la
  cabecera de siempre.
- **`CodeBlock`: fondo, borde y tinta pasan a su par oscuro.** Hasta ahora el bloque
  se pintaba igual en `.surface-dark` que en claro (gris claro con tinta oscura), sin
  contraste sobre fondo oscuro. Nuevos tokens `code-block.surface-dark-bg` (la misma
  superficie clara secundaria, en su variante oscura — la que ya usan `Kbd` y el pie
  de `Table`), `code-block.surface-dark-color` y `code-block.surface-dark-focus-ring-color`
  (`color.text.on-dark`, por la regla de derivación); `code-block.surface-dark-border-color`
  cambia de `color.primary` a `color.text.on-dark` por el mismo motivo. `Code` (el
  átomo en línea) y `Prose` heredan el par nuevo sin cambios propios, por referencia.

## [32.1.0] — 2026-09-06

> **Minor.**

- **`AppLauncher`: el disparador puede pintar texto además del icono.** Nueva
  `labels.trigger?: string` en `AppLauncherLabels`: con ella, el botón pinta `Icon
  grid` + el texto, se lee como un ítem de `SidebarNav` (tipografía, alto, radio y
  aire por referencia a sus tokens — `trigger-label-*` → `{sidebar-nav.item-*}`) y su
  hover deja de pintar línea (mismo criterio que `.sidebar-nav__item:hover`: solo
  `color`). Sin `trigger`, el disparador se queda exactamente como antes: solo icono,
  con `labels.open` de nombre accesible y su línea de tinta en hover. Con texto
  visible, el nombre accesible pasa a ser ese texto — no se duplica con `aria-label`.

## [32.0.0] — 2026-09-06

> **Major.** Retira `NotificationPanelItem['link']` y la prop `viewLabel`: el próximo
> tag es `v32.0.0`.

- **`NotificationPanel`: el panel pierde la cabecera, y la fila el enlace.** Cuatro
  decisiones que le cambian la cara y una que le cambia la API:
  - **El título «Notificaciones» ya no se pinta.** `panelLabel` sigue nombrando el
    `role="dialog"` y, dentro de un `VisuallyHidden`, la `<ul>` — pero la cabecera
    entera (con su línea y su aire) desaparece: la campana que se acaba de pulsar ya
    dice qué es esto. La lista empieza en el borde de arriba del panel, sin hueco.
    Fuera el token `notification-panel.header-padding-block`, y `separator-*` pasa a
    describir solo la línea del pie.
  - **Fuera el enlace «Ver» de cada notificación** (*breaking*). Se retiran el campo
    `link` de `NotificationPanelItem`, la prop de texto `viewLabel`, el nodo
    `.notification-panel__view` y el token `notification-panel.view-font-size`. Del
    panel no se navega a una notificación: pulsar la fila la marca leída y la deja
    donde está, y lo único que navega son los dos enlaces del pie. **Migración:** basta
    con dejar de pasar `link` en los `items` (y `viewLabel`, si se pasaba); nada más
    cambia. El único consumidor conocido es el `NotificationBell` de `@slxd/app-shell`,
    que lo pasa en una línea.
  - **La fila ya no se subraya en hover.** Una fila no es un enlace: bajo el puntero se
    marca con la **barra de tinta en su borde de inicio**, el mismo grafismo que la fila
    interactiva de `Table` y que la sección activa del `SidebarNav` en rail. Los tokens
    `item-hover-line-{width,color}` pasan a `item-hover-marker-{width,color}` (y su par
    `surface-dark-`), y el grosor sube de `border-width.default` a `border-width.focus`,
    el de la barra de `Table`.
  - **La fecha relativa se va al extremo derecho de la línea del título.** El título y
    la fecha comparten línea en un nodo nuevo, `.notification-panel__item-head`: el
    título se encoge, la fecha se queda entera y la fila baja una línea de alto.
  - **El pie se lee centrado.** «Marcar todas como leídas» pasa de `Button variant="text"`
    a `variant="outline"` —es una acción sobre el conjunto, no un enlace— y los dos
    enlaces (bandeja y preferencias) van en **tono tinta** (`link--ink`, la variante
    utilitaria del átomo `Link`), centrados y uno por línea: a 360 px los dos rótulos no
    caben en la misma. Fuera el remapeo `--button-sm-font-size` del botón.
  Sin colores nuevos: todos los tokens tocados siguen apuntando por referencia a roles
  que ya existían.
- **`DataTable`: la columna de acciones sin rótulo visible.** Nueva entrada en el `meta`
  de columna (module augmentation de `ColumnMeta`, junto a `align`):
  `headerHidden?: boolean`. Con ella el `header` se sigue pintando, pero dentro de
  `VisuallyHidden`: la columna conserva su nombre para quien lee con lector de pantalla
  —dejar el `header` vacío la deja sin nombre que anunciar— y la celda de cabecera sigue
  en la fila con su alineación. **La columna de acciones se escribe siempre así:**
  `meta: { align: 'center', headerHidden: true }`. Sin tokens ni CSS nuevos.

## [31.4.0] — 2026-09-05

- **`Modal`: el aspa se alinea con la primera línea del título.** La cabecera del
  diálogo (`dialog-header--inline`, compartida) pasa de `align-items: center` a
  `flex-start`: con un título de dos líneas el aspa quedaba flotando en medio de la
  cabecera. El ajuste óptico que la baja hasta el eje de esa primera línea sale de
  los tokens del propio título —`title-font-size` × `title-line-height` menos
  `close-size`, a la mitad—, así que cuadra igual si cambia el título o si el aspa
  sube a `lg` en la superficie pública. Token nuevo por referencia,
  `modal.title-line-height` → `{line-height.tight}`, que además retira el `1.2`
  cableado que había en `Modal.css`. Sin título, el aspa se queda en su esquina.
- **`Pagination`: ranura `afterPageSize`.** Nueva prop `afterPageSize?: ReactNode`,
  que se pinta **justo detrás del selector de registros por página**, dentro del
  mismo grupo que el total (`.pagination__after-page-size`); los botones de página
  se quedan solos al otro extremo. Por debajo de `md` la ranura baja a su propia
  línea, bajo el selector. Con la ranura llena el `nav` se pinta aunque no haya
  páginas que recorrer: una lista vacía se sigue pudiendo exportar. Sin tokens ni
  colores nuevos.
- **`DataTable`: `footerActions` se muda junto al selector.** La prop no cambia de
  forma, pero ya no se pinta al extremo derecho del pie (v31.3.0): viaja a la ranura
  `afterPageSize` de `Pagination`, así que queda inmediatamente después del selector
  de «elementos por página» y el paginador se queda solo, a la derecha. Desaparece el
  nodo `.data-table__footer-actions`; quien lo tuviera enganchado por CSS debe mirar
  ahora a `.pagination__after-page-size`.
- **`Stack`: talla de aire `sm`.** `gap` acepta ahora `'sm' | 'md' | 'lg'` (antes solo
  `md` y `lg`), con su clase `stack--gap-sm` y el token nuevo por referencia
  `stack.gap-sm` → `{spacing.2}` (8px). Es el peldaño que faltaba para agrupar
  **líneas de un mismo dato** —nombre y correo de un propietario, las tres líneas de
  una sesión activa, título y subtítulo—: el mismo aire compacto que `inline.gap-sm`,
  y por debajo del que separa dos párrafos, para que el grupo se lea como una sola
  cosa. `md` sigue siendo el default y separa campos; `lg`, secciones. El criterio, en
  la doc del componente.
- **`FilterBar`: nueva molécula** (`@studiolxd/brand/filter-bar`). La barra de filtros
  de un listado: ranura `search` en **su propia línea entera**, los filtros
  (`children`) en una rejilla `auto-fit` que decide sola cuántas columnas caben —tres
  o cuatro en escritorio, una a ancho completo en móvil, sin punto de ruptura— y una
  ranura opcional `actions` al final de la fila, alineada con los controles. Es
  maqueta y nada más: no guarda estado, no filtra y no pide datos. Punto de referencia
  `search` con `ariaLabel` (default «Filtros»). Tokens nuevos en
  `tokens/molecule/filter-bar.json`, todos por referencia (`{form.gap}`,
  `{form.actions-gap}`, `{field-row.column-gap}`, `{field-row.row-gap}`,
  `{field-row.cell-md}` para el ancho mínimo de columna); sin colores nuevos y sin par
  oscuro, porque la barra no pinta ni un color.

## [31.3.0] — 2026-09-05

- **`DataTable`: acciones en el pie.** Nueva prop `footerActions?: ReactNode`, para
  acciones sobre el conjunto (exportar, imprimir) — distintas de `toolbar`, que son
  sobre la selección y van arriba. Se pinta en `.data-table__footer-actions`, a la
  derecha de la paginación (del selector de registros por página incluido), en la
  misma fila cuando cabe; si la paginación apila en móvil, baja a su propia línea
  alineada al final, con el mismo truco de `margin-inline-start: auto` que ya usa
  `Pagination` para sus propios controles. Sin `footerActions` el pie no cambia: no
  se pinta ningún nodo vacío. Token nuevo por referencia,
  `data-table.footer-actions-gap` → `{spacing.3}`, sin colores nuevos.

## [31.2.0] — 2026-09-05

- **`DataTable`: alineación por columna.** `meta: { align: 'start' | 'center' | 'end' }`
  en la definición de la columna (`ColumnMeta` tipado por module augmentation de
  TanStack, como recomiendan) y la tabla lo traduce a modificadores BEM en la
  **cabecera y la celda a la vez**: `data-table__header-cell--center|--end` y
  `data-table__cell--center|--end`. `start` es el default y no emite clase. Solo
  `text-align`: sin tokens ni colores nuevos. Números a `end`, acciones y estados a
  `center` — el criterio, en la doc del componente. Retira el `Inline justify="center"`
  a mano en cabecera y celda que hoy escriben las apps.
- **`DatePicker` reenvía los textos de su calendario.** Montaba el `Calendar` en el
  popover pero no dejaba traducir sus rótulos, así que las flechas de mes y la vista
  de años salían siempre en castellano. Nuevas props, con los mismos nombres y
  defaults que en `Calendar`: `previousMonthLabel`, `nextMonthLabel`,
  `previousYearsLabel`, `nextYearsLabel`, `yearGridLabel` y `gridLabel` (que cae a
  `calendarLabel`, como antes). `DatePickerField` ya las heredaba por su `Omit`;
  `DateTimeField` las reexpone, y con ellas `calendarLabel` (por defecto la etiqueta
  del campo), `openCalendarLabel`, `invalidMessage` y `maskLetters`, que tampoco
  llegaban.
- **Criterio del pie de los diálogos, escrito.** Norma 10 de `CLAUDE.md` y sección
  «El pie: cuándo hay Cancelar» en la doc de `Modal`: `Cancelar` (`variant="outline"`,
  primero en el DOM del `footer`) solo cuando el diálogo **ejecuta** algo; los
  informativos y los selectores no lo llevan; los botones nunca van en las acciones
  del `Form` dentro de un `Modal` —van en el `footer` y el submit se ata con
  `form={id}`—; `ConfirmDialog` ya lo cumple por construcción. Stories nuevas
  «Informativo» y «Selector», y la de «Formulario» reescrita al patrón. `Cancelar`
  pasa de `ghost` a `outline` en las stories del pie, en línea con `ConfirmDialog`.
  Solo documentación y stories: ningún componente cambia.

## [31.0.1] — 2026-09-05

- **`ImageCropDialog` se cierra al confirmar.** Tras `await onConfirm(blob)` el
  diálogo se quedaba abierto —el consumidor veía su toast de «actualizado» con
  el recorte todavía en pantalla— porque nadie llamaba a `onClose`. Ahora, si
  `onConfirm` resuelve, el diálogo se cierra y limpia la selección; si lanza,
  se queda abierto con la selección intacta. Afecta a `AvatarUpload`.

## [31.0.0] — 2026-09-05

- **`NotificationPanel`: la campana abre un panel flotante** (molécula nueva,
  export `@studiolxd/brand/notification-panel`). El `NotificationButton` de
  siempre —contador incluido— montado sobre un `Popover` anclado a él, con el
  adelanto de las últimas notificaciones (`items`: título, cuerpo recortado a
  dos líneas por token, fecha ya formateada, punto de no leída y enlace «Ver»
  cuando la notificación tiene destino), estado vacío («Estás al día») y un pie
  con los enlaces a la bandeja y a las preferencias, más el botón opcional
  «Marcar todas como leídas» (solo con `onMarkAllRead`). **Pulsar una fila la
  marca leída y la deja en su sitio**: no navega, no cierra el panel y no
  reordena la lista —lo único que navega es el enlace de cada notificación—;
  al cerrar, el panel olvida lo marcado y vuelve a mandar `items`. El foco
  entra por la primera notificación y `Escape` cierra devolviéndolo a la
  campana; el panel es un `role="dialog"` nombrado y la lista una `<ul>` que se
  llama con el título visible de la cabecera. Todos los textos por prop con
  default castellano (fila nueva en Fundamentos › Internacionalización) y los
  enlaces por `renderLink`, como en `SiteNav`. Tokens nuevos en
  `tokens/molecule/notification-panel.json`, sin colores nuevos: el punto es el
  mismo `error-fill` del contador de la campana y el hover de la fila es una
  línea, no un relleno.
- **`Popover` acepta `initialFocus`** (prop de Base UI, tal cual). Por defecto
  el foco sigue yendo al propio panel, que es lo correcto para un panel de
  lectura; un panel cuyo contenido es una lista de controles pasa aquí el
  primero de ellos. Es lo que necesita `NotificationPanel`.
- **La página de estado, en el catálogo** (`Pages/Estado del servicio`).
  `status.slxd.app` montado con piezas del DS y datos falsos: `AppRoot` +
  `PublicPageShell` con la cabecera de la marca **sin índice** —un panel que
  debe seguir en pie cuando la suite se cae no promete enlaces a servicios
  caídos—, las preferencias de idioma y tema en el pie, `PageIntro`, el resumen
  en `Alert`, y por aplicación un `Heading` con su enlace, su `Tag` de estado y
  su `UptimeBars` de 30 días. Cinco situaciones: todo operativo, parcialmente
  disponible, caído, sin datos (el monitor no contesta) y cargando. Dieciocho
  aplicaciones en el orden real, con treinta días de historia creíble.
- **`ImageCropDialog` deja de parecer roto mientras carga la imagen.** El área
  de recorte **reserva su alto desde el primer render** (token nuevo
  `image-crop-dialog.area-min-height`, que apunta a su propio `area-max-height`)
  y enseña el `Spinner` del sistema con texto (`loadingLabel`, «Cargando
  imagen…») hasta que la imagen dispara su `load`; entonces aparece en el hueco
  ya reservado, **sin salto de maqueta**. Si falla, un `Alert` de error
  (`errorMessage`) ocupa ese mismo hueco y la imagen rota no se pinta. Elegir
  otra imagen vuelve a empezar por la carga. `AvatarUpload` los reexpone como
  `cropLoadingLabel` y `cropErrorMessage`.
- **`AvatarUpload`: el botón cierra a la altura del avatar y estrena pista de
  arrastre.** La columna del botón se alinea con el borde inferior del retrato
  en vez de flotar a media altura, y bajo el botón va `dropHintLabel` («…o
  arrastra la imagen hasta el avatar»), lo único de la pieza que no se adivina
  mirándola. Visible, con la tipografía y el color del texto de ayuda de los
  campos (tokens nuevos `avatar-upload.hint.*` → `{form.helper.*}`). Los
  formatos y el peso siguen donde estaban: en la descripción accesible del
  botón. Con `dropHintLabel=""` no se pinta.
- **`OnboardingShell` reparte la talla `lg` al paso entero**, no solo a su pie.
  El alta es superficie pública: cualquier `Form`, campo o `AvatarUpload` del
  cuerpo hereda ahora la talla sin que la aplicación tenga que pasarla. Antes,
  el paso del logotipo salía con un botón de subir mediano bajo un formulario
  grande.
- **Las páginas del alta y las públicas, al día con producción.** El alta pierde
  el botón «Atrás» (el progreso navega, y qué paso es alcanzable lo dice el
  flujo), el perfil se queda en un solo campo y sin salida, la organización en
  el campo que la crea, el logotipo pasa de `FileUploadField` a `AvatarUpload`
  cuadrado, las invitaciones dicen «Rol» con dos papeles y cierran con
  «Finalizar», y la sala de espera estrena los textos que el producto usa. En
  las públicas se corrigen rótulos de botón, marcadores de posición, el texto de
  las condiciones (dos enlaces), el estado «enlace enviado» —que sustituye al
  formulario entero— y la pantalla de nueva contraseña. `Templates/App with
  sidebar` pierde el saludo y el título de la barra, y monta el panel como lo
  monta la suite.
### Breaking

- **`DatePicker`: el disparador deja de ser un botón con la fecha en largo y
  pasa a ser un campo de texto editable.** Tres roturas para el consumidor:
  - `onChange` pasa de `(date: Date) => void` a **`(date: Date | null) => void`**:
    vaciar el campo borra la fecha y eso viaja como `null`. Un consumidor que
    escribiera `onChange={(d: Date) => …}` deja de compilar. Arrastra a
    `DatePickerField` y a `DateTimeField`, cuyo `onChange` ya era nullable pero
    ahora sí emite `null`.
  - El **`ref` pasa de `HTMLButtonElement` a `HTMLInputElement`** en
    `DatePicker`, `DatePickerField` y `DateTimeField` —va al campo, que es lo
    que react-hook-form debe enfocar al fallar—, y `onBlur` con él
    (`FocusEventHandler<HTMLElement>` en `DateTimeField`, que lo comparte con
    los desplegables de hora).
  - **La clase `.date-picker__trigger` desaparece**, y con ella los tokens
    `--date-picker-height|font-size|color|bg|border-*|focus-*|error-*|disabled-*`
    y sus hermanos de talla: el campo es el `Input` del sistema y se viste con
    `--input-*`. Quien apuntase a esa clase o a esos tokens, apunta ahora a los
    del campo. El `className` del componente va al **contenedor**, no al control.

### Añadido

- **`DatePicker` se escribe y se borra.** Muestra y acepta el formato numérico
  corto del locale (`25/09/2026` en `es`, `09/25/2026` en `en-US`, `25.09.2026`
  en `de`), con el orden y el separador sacados de
  `Intl.DateTimeFormat().formatToParts()` —no de una tabla por idioma— y las
  cifras siempre en ASCII, para que lo que se pinta pueda volver a teclearse. La
  fecha completa sube por `onChange`; la incompleta o imposible (`25/09`,
  `31/02/2026`, un año de dos cifras) no sube nada y pone el campo en error con
  un aviso `role="alert"`. El calendario lo abre un botón de icono al final del
  campo —el patrón de adorno de `SearchForm`— o la flecha abajo; `Escape`
  cierra, y al elegir un día el foco vuelve al campo.
- Props de texto nuevas de `DatePicker`, todas con default castellano:
  `invalidMessage`, `openCalendarLabel` y `maskLetters` (las letras de la
  máscara del marcador de posición, `dd/mm/aaaa`).
- **`Calendar`: el título del mes lleva a elegir año.** Pulsarlo abre una
  rejilla de doce años en tres filas de cuatro; las mismas flechas navegan de
  docena en docena («Años anteriores» / «Años siguientes»), al elegir uno se
  vuelve al mes en ese año y el foco regresa al título. `Escape` vuelve sin
  elegir. Sin paso intermedio de meses: las flechas ya recorren los meses, y lo
  que falta en un viaje largo es el año. Props nuevas: `previousYearsLabel`,
  `nextYearsLabel`, `yearGridLabel`.
- Icono `calendar` en el catálogo de `Icon`.
- Tokens nuevos por referencia: `calendar.year-*`, `calendar.title-button-*`,
  `date-picker.button-*` y `date-picker.message-*`.

### Cambiado

- **Las flechas del `Calendar` ya no pintan línea de tinta bajo el puntero**:
  son un glifo, y la línea del sistema subraya texto. Lo que las señala es el
  anillo de foco. Los días la conservan, y ahora también el título y los años.
  (`CalendarPlanner` mantiene la suya: queda fuera de este encargo.)

## [30.10.1] — 2026-09-05

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
- **`UptimeBars`, tres retoques de superficie clara.** El **filete** de cada
  barrita pasa a ser el prusia (`{color.primary}`) en vez de transparente:
  recuadra cada día —también el «sin dato»— y es lo que hace visible el tramo
  intermedio, cuyo relleno amarillo se queda en 1,50:1 contra el blanco. **La
  media** deja el peso fuerte y va en peso de cuerpo (`{font-weight.default}`).
  Y **los extremos** (`startLabel`/`endLabel`) pasan de atenuados a la tinta
  plena (`{color.text.on-light}` y su par oscuro).
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
