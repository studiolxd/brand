package com.studiolxd.brand

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import app.cash.paparazzi.DeviceConfig
import app.cash.paparazzi.Paparazzi
import com.studiolxd.brand.tokens.BrandColorRoles
import org.junit.Rule
import org.junit.Test

/** Una fila por rol, con su cara clara y su cara oscura lado a lado. */
@Composable
private fun PaletteSample() {
    val light = BrandColorRoles.light
    val dark = BrandColorRoles.dark
    val rows = listOf(
        light.text to dark.text,
        light.textMuted to dark.textMuted,
        light.bg to dark.bg,
        light.surfaceSecondary to dark.surfaceSecondary,
        light.errorText to dark.errorText,
        light.successText to dark.successText,
        light.disabledBg to dark.disabledBg,
        light.iconSecondary to dark.iconSecondary,
    )
    Column(Modifier.width(240.dp)) {
        rows.forEach { (l, d) -> Swatches(l, d) }
    }
}

@Composable
private fun Swatches(light: Color, dark: Color) {
    Row(Modifier.fillMaxWidth()) {
        Row(Modifier.width(120.dp).height(30.dp).background(light)) {}
        Row(Modifier.width(120.dp).height(30.dp).background(dark)) {}
    }
}

/**
 * Capturas de tokens: dejan probado el flujo de pruebas de capturas con Paparazzi. Las de cada componente irán igual,
 * una por componente y por estado, en el mismo commit que el componente.
 * Graba con `./gradlew :brand:recordPaparazziDebug`; `./gradlew build` las verifica.
 */
class PaletteSnapshotTest {
    @get:Rule
    // Pantalla cuadrada de 240 dp (8 filas de 30 dp). PIXEL_5 es xxhdpi: 3 píxeles por dp. Cuadrada a propósito:
    // con más ancho que alto, layoutlib la toma por horizontal y la gira.
    val paparazzi = Paparazzi(deviceConfig = DeviceConfig.PIXEL_5.copy(screenWidth = 240 * 3, screenHeight = 240 * 3))

    @Test
    fun colorRolesInLightAndDark() {
        paparazzi.snapshot { PaletteSample() }
    }
}
