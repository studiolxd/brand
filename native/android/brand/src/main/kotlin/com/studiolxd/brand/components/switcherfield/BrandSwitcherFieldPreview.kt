package com.studiolxd.brand.components.switcherfield

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Todas las variantes de `Switcher` y `SwitcherField`: tallas, encendido, ayuda, error, deshabilitado. */
@Composable
internal fun SwitcherFieldPreviewContent() {
    var on by remember { mutableStateOf(true) }
    var off by remember { mutableStateOf(false) }
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
        BrandControlSize.entries.forEach { size ->
            BrandSwitcherField("Talla ${size.value}", on, { on = it }, size = size)
        }
        BrandSwitcherField("Apagado", off, { off = it }, helperText = "Texto de ayuda")
        BrandSwitcherField("Con error", off, { off = it }, errorMessage = "Debes aceptarlo")
        BrandSwitcherField("Deshabilitado", on, { on = it }, enabled = false)
        BrandSwitcherField("Deshabilitado apagado", off, { off = it }, enabled = false)
    }
}

@Preview(name = "SwitcherField — claro", showBackground = true, widthDp = 360, heightDp = 800)
@Composable
internal fun SwitcherFieldPreviewLight() = BrandPreviewSurface(dark = false) { SwitcherFieldPreviewContent() }

@Preview(name = "SwitcherField — oscuro", showBackground = true, widthDp = 360, heightDp = 800)
@Composable
internal fun SwitcherFieldPreviewDark() = BrandPreviewSurface(dark = true) { SwitcherFieldPreviewContent() }
