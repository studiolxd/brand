package com.studiolxd.brand

import androidx.compose.runtime.Composable
import app.cash.paparazzi.DeviceConfig
import com.android.resources.Density
import app.cash.paparazzi.Paparazzi
import com.studiolxd.brand.support.BrandPreviewSurface

/**
 * Pantalla de capturas: `widthDp × heightDp` en PIXEL_5 (xxhdpi, 3 píxeles por dp). Cuadrada o más alta que ancha: con
 * más ancho que alto layoutlib la toma por horizontal y la gira. Úsala como `@get:Rule val paparazzi = brandPaparazzi(w, h)`.
 */
internal fun brandPaparazzi(widthDp: Int, heightDp: Int): Paparazzi {
    return Paparazzi(deviceConfig = brandDevice(widthDp, heightDp))
}

/** PIXEL_5 con `widthDp × heightDp` dp a **exactamente** 3 px por dp (la densidad de PIXEL_5 es 440 dpi, 2,75: no vale). */
private fun brandDevice(widthDp: Int, heightDp: Int): DeviceConfig = DeviceConfig.PIXEL_5.copy(
    screenWidth = widthDp * 3,
    screenHeight = maxOf(heightDp, widthDp) * 3,
    density = Density.XXHIGH,
    xdpi = 480,
    ydpi = 480,
)

/**
 * Una captura en claro y otra en oscuro (`<prueba>_claro.png` y `<prueba>_oscuro.png`), sobre el lienzo de la marca.
 * Con [name], `<prueba>_<name>-claro.png`: para varias capturas en una misma prueba.
 */
internal fun Paparazzi.brandSnapshots(name: String? = null, content: @Composable () -> Unit) {
    val prefix = if (name == null) "" else "$name-"
    snapshot("${prefix}claro") { BrandPreviewSurface(dark = false, content) }
    snapshot("${prefix}oscuro") { BrandPreviewSurface(dark = true, content) }
}

/**
 * Una captura de pareja con Storybook: el lienzo es exactamente `widthDp × heightDp` (el mismo que usa SwiftUI en
 * `native/apple/Comparisons/`), con el margen de 16 dp del sistema, en claro y oscuro. Como layoutlib exige pantalla
 * no horizontal, la imagen sale cuadrada o más alta: `native/android/scripts/pair-comparison.sh` la recorta al lienzo.
 */
internal fun Paparazzi.brandComparison(name: String, widthDp: Int, heightDp: Int, content: @Composable () -> Unit) {
    unsafeUpdateConfig(brandDevice(widthDp, heightDp))
    brandSnapshots(name, content)
}
