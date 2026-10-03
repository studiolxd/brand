package com.studiolxd.brand.components.toast

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.width
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.support.BrandPreviewSurface
import kotlin.time.Duration

/** Un aviso por intención, con descripción y, en dos de ellos, con acción. */
@Composable
internal fun ToastPreviewContent() {
    Column(Modifier.width(360.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        ToastIntent.entries.forEach { intent ->
            val action = if (intent == ToastIntent.Default || intent == ToastIntent.Warning) ToastAction("Deshacer") {} else null
            BrandToastCard(
                item = ToastItem(intent.value, "Aviso ${intent.value}", intent, "Segunda línea del aviso.", action = action),
                onClose = {},
            )
        }
    }
}

/** Una pila de tres avisos (el más nuevo delante), recogida o desplegada. */
@Composable
internal fun ToastStackPreviewContent(expand: Boolean, position: ToastPosition = ToastPosition.BottomRight) {
    val center = remember {
        ToastCenter().apply {
            success("Primer aviso", description = "El más antiguo.", duration = Duration.INFINITE)
            message("Segundo aviso", duration = Duration.INFINITE)
            error("Tercer aviso", description = "El más nuevo, delante.", duration = Duration.INFINITE)
        }
    }
    ToastHost(Modifier.fillMaxSize(), center = center, position = position, expand = expand)
}

@Preview(name = "Toast — claro", showBackground = true, widthDp = 400, heightDp = 680)
@Composable
internal fun ToastPreviewLight() = BrandPreviewSurface(dark = false) { ToastPreviewContent() }

@Preview(name = "Toast — oscuro", showBackground = true, widthDp = 400, heightDp = 680)
@Composable
internal fun ToastPreviewDark() = BrandPreviewSurface(dark = true) { ToastPreviewContent() }

@Preview(name = "Toaster — recogida", showBackground = true, widthDp = 400, heightDp = 300)
@Composable
internal fun ToastStackCollapsedPreview() = BrandPreviewSurface(dark = false) { ToastStackPreviewContent(expand = false) }

@Preview(name = "Toaster — desplegada", showBackground = true, widthDp = 400, heightDp = 420)
@Composable
internal fun ToastStackExpandedPreview() = BrandPreviewSurface(dark = false) { ToastStackPreviewContent(expand = true) }
