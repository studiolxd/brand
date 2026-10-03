package com.studiolxd.brand.components.list

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.components.text.BrandText
import com.studiolxd.brand.components.text.TextTone
import com.studiolxd.brand.icon.BrandIcon
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.icon.BrandIconSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

@Composable
internal fun ListPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s6)) {
        ListType.entries.forEach { type ->
            BrandList(type = type) {
                item("Primer elemento de la lista")
                item("Segundo elemento de la lista")
                item("Tercer elemento de la lista")
            }
        }
        BrandList(type = ListType.Plain, showSeparators = true) {
            item {
                BrandListItem(
                    secondary = { BrandText("Avisos de la comunidad") },
                    trailing = { BrandIcon(BrandIconName.Chevron, size = BrandIconSize.Sm) },
                    onClick = {},
                ) { BrandText("Notificaciones") }
            }
            item { BrandListItem(trailing = { BrandText("Español", tone = TextTone.Muted) }) { BrandText("Idioma") } }
            item { BrandListItem(leading = { BrandIcon(BrandIconName.Key) }) { BrandText("Seguridad") } }
            item("Cerrar sesión")
        }
    }
}

@Preview(name = "List — claro", showBackground = true, widthDp = 380, heightDp = 640)
@Composable
internal fun ListPreviewLight() = BrandPreviewSurface(dark = false) { ListPreviewContent() }

@Preview(name = "List — oscuro", showBackground = true, widthDp = 380, heightDp = 640)
@Composable
internal fun ListPreviewDark() = BrandPreviewSurface(dark = true) { ListPreviewContent() }
