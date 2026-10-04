package com.studiolxd.brand.components.menu

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.tooling.preview.Preview
import com.studiolxd.brand.icon.BrandIconName
import com.studiolxd.brand.support.BrandControlSize
import com.studiolxd.brand.support.BrandPreviewSurface
import com.studiolxd.brand.tokens.BrandSpacing

/** Los ítems de la story `ContextMenu` de React: dos acciones, un separador, «Ver detalle» y «Eliminar». */
internal val previewMenuItems: List<BrandMenuItem> = listOf(
    BrandMenuItem.Button("Duplicar", action = {}),
    BrandMenuItem.Button("Editar", action = {}),
    BrandMenuItem.Separator,
    BrandMenuItem.Button("Ver detalle", action = {}),
    BrandMenuItem.Separator,
    BrandMenuItem.Button("Eliminar", action = {}, destructive = true),
)

/** Todos los casos de ítem: iconos, descripción, deshabilitado, destructivo, rótulo y un grupo de radio. */
internal val previewMenuRichItems: List<BrandMenuItem> = listOf(
    BrandMenuItem.Label("Archivo"),
    BrandMenuItem.Button("Duplicar", action = {}, icon = BrandIconName.Copy),
    BrandMenuItem.Button("Descargar", action = {}, description = "PDF, 2 MB", icon = BrandIconName.Download),
    BrandMenuItem.Button("Publicar", action = {}, disabled = true),
    BrandMenuItem.Separator,
    BrandMenuItem.Label("Orden"),
    BrandMenuItem.Radio("Por fecha", "fecha"),
    BrandMenuItem.Radio("Por nombre", "nombre"),
    BrandMenuItem.Radio("Por tamaño", "tamano", disabled = true),
    BrandMenuItem.Separator,
    BrandMenuItem.Button("Eliminar", action = {}, icon = BrandIconName.Close, destructive = true),
)

/** Todas las variantes: el panel con todos los ítems, el panel de la story y los disparadores de `ContextMenu`. */
@Composable
internal fun MenuPreviewContent() {
    Column(verticalArrangement = Arrangement.spacedBy(BrandSpacing.s5)) {
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s5), verticalAlignment = Alignment.Top) {
            BrandMenuPanel(previewMenuItems, selection = null, limitHeight = false) {}
            BrandMenuPanel(previewMenuRichItems, selection = "fecha", limitHeight = false) {}
        }
        Row(horizontalArrangement = Arrangement.spacedBy(BrandSpacing.s4), verticalAlignment = Alignment.CenterVertically) {
            BrandControlSize.entries.forEach { size ->
                BrandContextMenu(previewMenuItems, triggerSize = size)
                BrandContextMenu(previewMenuItems, triggerSize = size, triggerOrientation = ContextMenuTriggerOrientation.Vertical)
            }
        }
        BrandMenu("Acciones", previewMenuItems)
    }
}

@Preview(name = "Menu — claro", showBackground = true, widthDp = 460, heightDp = 780)
@Composable
internal fun MenuPreviewLight() = BrandPreviewSurface(dark = false) { MenuPreviewContent() }

@Preview(name = "Menu — oscuro", showBackground = true, widthDp = 460, heightDp = 780)
@Composable
internal fun MenuPreviewDark() = BrandPreviewSurface(dark = true) { MenuPreviewContent() }
