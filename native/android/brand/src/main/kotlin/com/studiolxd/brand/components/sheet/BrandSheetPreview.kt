package com.studiolxd.brand.components.sheet

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.components.button.ButtonVariant
import com.studiolxd.brand.components.dialog.BrandDialogButton
import com.studiolxd.brand.components.text.BrandParagraph
import com.studiolxd.brand.support.BrandPreviewSurface

/** El cajón de la vista previa: con pie (`Cancelar` primero), con título oculto y sin aspa ni pie. */
@Composable
internal fun SheetPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        BrandSheetContent(
            title = "Filtros",
            description = "Afina los resultados de la lista.",
            onClose = {},
            modifier = Modifier.width(390.dp).height(440.dp),
            footer = {
                BrandDialogButton("Cancelar", onClick = {}, variant = ButtonVariant.Outline)
                BrandDialogButton("Aplicar", onClick = {})
            },
        ) { BrandParagraph("El cuerpo del cajón: lo que cada pantalla quiera poner entre la cabecera y el pie.") }
        BrandSheetContent(
            title = "Detalle",
            onClose = {},
            modifier = Modifier.width(390.dp).height(200.dp),
            hideClose = true,
        ) { BrandParagraph("Un cajón sin aspa ni pie.") }
    }
}

@Preview(name = "Sheet — claro", showBackground = true, widthDp = 420, heightDp = 700)
@Composable
internal fun SheetPreviewLight() = BrandPreviewSurface(dark = false) { SheetPreviewContent() }

@Preview(name = "Sheet — oscuro", showBackground = true, widthDp = 420, heightDp = 700)
@Composable
internal fun SheetPreviewDark() = BrandPreviewSurface(dark = true) { SheetPreviewContent() }
