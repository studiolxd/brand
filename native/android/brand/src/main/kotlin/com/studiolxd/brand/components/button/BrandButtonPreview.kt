package com.studiolxd.brand.components.button

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.components.closebutton.BrandCloseButton
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

@Composable
internal fun ButtonPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s4)) {
        ButtonVariant.entries.forEach { variant ->
            Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
                BrandButton("Guardar", onClick = {}, variant = variant)
                BrandButton("Eliminar", onClick = {}, variant = variant, destructive = true)
                BrandButton("Desactivado", onClick = {}, variant = variant, enabled = false)
            }
        }
        BrandButton("Tono ink", onClick = {}, variant = ButtonVariant.Text, tone = ButtonTone.Ink)
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
            BrandButton("Pequeño", onClick = {}, size = ButtonSize.Sm)
            BrandButton("Mediano", onClick = {}, size = ButtonSize.Md)
            BrandButton("Grande", onClick = {}, size = ButtonSize.Lg)
        }
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
            BrandButton(BrandIconName.Close, "Cerrar", onClick = {}, variant = ButtonVariant.Outline, size = BrandControlSize.Sm)
            BrandButton(BrandIconName.Plus, "Añadir", onClick = {})
            BrandButton(BrandIconName.Search, "Buscar", onClick = {}, variant = ButtonVariant.Ghost, size = BrandControlSize.Lg)
            BrandButton("Con icono", onClick = {}, icon = BrandIconName.Plus, variant = ButtonVariant.Outline)
            BrandCloseButton(onClick = {})
        }
        BrandButton("A ancho completo", onClick = {}, block = true)
    }
}

@Preview(name = "Button — claro", showBackground = true, widthDp = 460)
@Composable
internal fun ButtonPreviewLight() = BrandPreviewSurface(dark = false) { ButtonPreviewContent() }

@Preview(name = "Button — oscuro", showBackground = true, widthDp = 460)
@Composable
internal fun ButtonPreviewDark() = BrandPreviewSurface(dark = true) { ButtonPreviewContent() }
