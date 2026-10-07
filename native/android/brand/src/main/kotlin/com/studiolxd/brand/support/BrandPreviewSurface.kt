package com.studiolxd.brand.support

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.studiolxd.brand.BrandTheme
import com.studiolxd.brand.tokens.BrandSpacing

/**
 * El lienzo de una vista previa o de una captura: `BrandTheme` del esquema pedido sobre el fondo de página
 * (`text.bg`), con el margen del sistema. Es `internal`: lo usan las `@Preview` y las pruebas de capturas.
 */
@Composable
internal fun BrandPreviewSurface(dark: Boolean, content: @Composable () -> Unit) {
    BrandTheme(darkTheme = dark) {
        Box(Modifier.fillMaxSize().background(BrandTheme.colors.background).padding(BrandSpacing.s4)) { content() }
    }
}
