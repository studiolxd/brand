# Comparaciones React ↔ SwiftUI

Una carpeta por componente, con parejas `<caso>.react.<claro|oscuro>.png` y `<caso>.ios.<claro|oscuro>.png`.

- **`react`**: la story de Storybook (`pnpm storybook` + `native/apple/scripts/capture-story.mjs <storyId> <salida.png> [--dark]
  [--args "k:v;k2:v2"] [--selector "…"]`, Playwright/Chromium, a @2x).
- **`ios`**: la captura de swift-snapshot-testing del simulador de iOS (`__Snapshots__/`, a @2x), con un lienzo del ancho
  de la story (los tests `testComparison…` de cada grupo reproducen su composición).
- Las dos imágenes de una pareja se reducen por el **mismo factor** (`native/apple/scripts/pair-comparison.sh`, ≤ 640 px
  de ancho): un tamaño de letra o un margen miden lo mismo en las dos y las diferencias que se ven son reales.

Lo que difiere a propósito está anotado en el campo `differences` de la ficha del componente
(`native/parity/components/<Componente>.json`). Un cambio en un componente que tiene versión nativa obliga a regrabar sus
capturas y sus parejas en el mismo commit.
