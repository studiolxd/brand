package com.studiolxd.brand

import androidx.compose.runtime.Composable
import app.cash.paparazzi.DeviceConfig
import app.cash.paparazzi.Paparazzi
import com.studiolxd.brand.support.BrandPreviewSurface

/**
 * Pantalla de capturas: `widthDp × heightDp` en PIXEL_5 (xxhdpi, 3 píxeles por dp). Cuadrada o más alta que ancha: con
 * más ancho que alto layoutlib la toma por horizontal y la gira. Úsala como `@get:Rule val paparazzi = brandPaparazzi(w, h)`.
 */
internal fun brandPaparazzi(widthDp: Int, heightDp: Int): Paparazzi {
    return Paparazzi(deviceConfig = DeviceConfig.PIXEL_5.copy(screenWidth = widthDp * 3, screenHeight = maxOf(heightDp, widthDp) * 3))
}

/**
 * Una captura en claro y otra en oscuro (`<prueba>_claro.png` y `<prueba>_oscuro.png`), sobre el lienzo de la marca.
 * Con [name], `<prueba>_<name>-claro.png`: para varias capturas en una misma prueba.
 */
internal fun Paparazzi.brandSnapshots(name: String? = null, content: @Composable () -> Unit) {
    val prefix = if (name == null) "" else "$name-"
    snapshot("${prefix}claro") { BrandPreviewSurface(dark = false, content) }
    snapshot("${prefix}oscuro") { BrandPreviewSurface(dark = true, content) }
}
