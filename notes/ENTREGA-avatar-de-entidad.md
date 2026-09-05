# Entrega — `AvatarUpload`, el avatar de una entidad con su subida

Rama `avatar-upload`. **Sin tag ni bump de versión**: publicada sigue siendo la
v30.6.0. La entrada del CHANGELOG está escrita bajo «Sin publicar» — al
taggear, basta renombrar ese encabezado a la versión que toque (es **minor**:
componente nuevo, talla nueva, tokens nuevos, ningún breaking).

## Qué se ha hecho

Una sola pieza para los dos casos que hoy están duplicados en `hub`:
`Molecules/AvatarUpload`, export `@studiolxd/brand/avatar-upload`.

- **Compone, no reimplementa**: `Avatar` (el retrato), la validación de peso y
  tipo del `FileUpload` —extraída a `atoms/FileUpload/validate.ts` para que
  haya **una** definición de qué archivo vale—, `ImageCropDialog` (el recorte)
  y `Button` (la vía accesible).
- **La diana es el avatar.** Se anuncia en cuanto empieza un arrastre en
  cualquier punto de la ventana (anillo discontinuo), se cierra el trazo y cae
  un velo al pasar por encima, y acepta el archivo en todo el cuadro del avatar
  —esquinas incluidas—. El anillo se pinta con `outline`: se ve por fuera pero
  **no agranda la zona sensible**, que sigue siendo exactamente el avatar.
- **El botón se queda siempre** y es la vía principal: el `<input type="file">`
  real vive oculto y fuera del tabulador, y el botón lo dispara. Una parada de
  teclado por control.
- **Dos textos para el botón**: `buttonLabel` (visible, «Subir») y
  `buttonAccessibleLabel` (nombre completo, «Subir logo»). El componente avisa
  por consola en desarrollo si el accesible no **contiene** el visible —WCAG
  2.5.3, Label in Name—, y el MDX lo explica con ejemplos, que es quien escribe
  los dos textos es el consumidor.
- **El texto de ayuda sale de la vista**: los formatos y el peso máximo ya no
  se pintan. Se dicen (1) en el error de la validación, que ahora dice qué **SÍ**
  se acepta —«Formato no admitido. Se aceptan JPEG, PNG, WEBP.»—, y (2) como
  descripción accesible del botón (`aria-describedby` sobre texto oculto),
  porque el `accept` del input no lo anuncia ningún lector de pantalla.
- **La talla la manda el contexto** (`FormSizeContext`, como `Form` y el pie de
  `OnboardingShell`): sin `size`, la pieza toma la del contexto y sube a la vez
  el botón y el avatar. En el alta (`lg`) salen botón `lg` y avatar de 64px sin
  que el call-site pase nada.

### `Avatar` gana la talla `xl` (64px)

Es del átomo, no de esta pieza: una cabecera de perfil a 48px también se queda
corta. El peldaño es el que el sistema ya usa por encima de la escala de
controles —`icon.size-xl`, el mismo que `logo.height-xl` y `logomark.size-xl`—,
sigue en el múltiplo de 8 y no toca la escala de controles, donde 48px sigue
siendo el control más alto que existe. Las iniciales suben un peldaño de la
escala tipográfica, como las tres tallas anteriores.

El avatar de `AvatarUpload` va **un peldaño por encima** del control:
`sm`→40px, `md`→48px, `lg`→64px.

### De propina: `dist/_shared/*.css` ya no se quedaba huérfano

Al compartir `ImageCropDialog` entre dos entradas, rollup sacó su cuerpo a
`dist/_shared/ImageCropDialog.js` y su CSS a `dist/ImageCropDialog.css`, un
fichero que **no importaba nadie**: la entrada `image-crop-dialog` habría salido
sin estilos. `scripts/post-build.mjs` engancha ahora el CSS de los chunks
compartidos igual que ya hacía con el de las entradas. El mismo defecto lo tenía
ya `ProgressBar` en v30.6.0 (`dist/ProgressBar.css` estaba huérfano): queda
arreglado de paso.

## Cómo quedan los dos consumidores (`/Users/suvi/Dev/slxd`, sin tocar)

La adopción es mecánica: la pieza no cambia el flujo de subida (endpoint,
FormData, tRPC, toasts, `router.refresh()`). Lo que desaparece de cada archivo
es la validación a mano (`isAvatarMime`/`isLogoMime` + `MAX_BYTES`), el
`ImageCropDialog` suelto, el `useRef` del input y —en `LogoUpload`— el
`<input type="file">` a pelo, el `<div className="logo-upload">` que no estilaba
nada y el `<Paragraph>` de la pista.

### `apps/hub/src/components/settings/AvatarUpload.tsx`

```tsx
import { AvatarUpload as BrandAvatarUpload } from "@studiolxd/brand/avatar-upload";
import { AVATAR_ALLOWED_MIME, AVATAR_MAX_BYTES } from "@/lib/storage/validation";

// …el resto del componente igual: useMutation, handleCropped, uploading…

<BrandAvatarUpload
  src={preview ?? currentImageUrl}
  name={name}
  accept={AVATAR_ALLOWED_MIME.join(",")}
  maxSize={AVATAR_MAX_BYTES}
  outputMimeType="image/jpeg"
  busy={uploading}
  buttonLabel={t("uploadButton")}            /* «Subir» */
  buttonAccessibleLabel={t("uploadAvatar")}  /* «Subir avatar» — contiene el visible */
  formatsLabel={t("formats")}                /* «JPEG, PNG o WebP» */
  invalidTypeError={(formats) => t("invalidType", { formats })}
  tooLargeError={(max) => t("tooLarge", { max })}
  dropActiveMessage={t("dropActive")}
  cropTitle={t("cropTitle")}
  cropDescription={t("cropInstruction")}
  cropCancelLabel={t("cancel")}
  cropConfirmLabel={uploading ? t("uploading") : t("save")}
  cropCloseLabel={tCommon("close")}
  onChange={handleCropped}
/>
```

`handleCropped(blob)` se queda tal cual —la firma es `(blob, file)`, y el
segundo argumento se puede ignorar—; lo único que sobra es `closeDialog()` al
final: la pieza cierra su diálogo y revoca su object URL sola.

### `apps/hub/src/components/org/LogoUpload.tsx`

```tsx
import { AvatarUpload } from "@studiolxd/brand/avatar-upload";
import { LOGO_ALLOWED_MIME, LOGO_MAX_BYTES } from "@/lib/storage/validation";

<AvatarUpload
  src={preview ?? currentLogoUrl}
  name={orgName}
  shape="square"                             /* lo que distingue a una organización */
  accept={LOGO_ALLOWED_MIME.join(",")}
  maxSize={LOGO_MAX_BYTES}
  outputMimeType="image/png"
  busy={uploading}
  buttonLabel={t("uploadButton")}            /* «Subir» */
  buttonAccessibleLabel={t("uploadLogo")}    /* «Subir logo» */
  formatsLabel={t("formats")}
  invalidTypeError={(formats) => t("invalidType", { formats })}
  tooLargeError={(max) => t("tooLarge", { max })}
  dropActiveMessage={t("dropActive")}
  cropTitle={t("cropTitle")}
  cropDescription={t("cropInstruction")}
  cropCancelLabel={t("cancel")}
  cropConfirmLabel={uploading ? t("uploading") : t("save")}
  cropCloseLabel={tCommon("close")}
  onChange={handleCropped}
/>
```

Dentro del asistente de alta no hay que pasar `size="lg"`: el contexto de talla
del `OnboardingShell` lo pone. `onUploaded?.(previewUrl)` sigue viviendo en
`handleCropped`, igual que ahora.

**Claves de traducción nuevas** por cada uno de los dos espacios de mensajes:
`uploadAvatar`/`uploadLogo` (el nombre accesible, que tiene que contener el
`uploadButton` visible), `formats`, `dropActive`, y `invalidType`/`tooLarge`
pasan a llevar un parámetro (`{formats}` / `{max}`). Los `hint` actuales se
pueden borrar: ya no se pintan. Si se prefiere no tocar los mensajes de error,
se dejan sin pasar y salen los castellanos por defecto, que ya dicen qué se
acepta.

## Comprobado

`pnpm lint`, `npx tsc -b`, `pnpm test` (332), `pnpm test:stories`
(163 ficheros / 1346 tests, antes 162/1335) y `pnpm release:check` con `dist/`
regenerado y commiteado. Storybook del operador (6006) sin tocar.
