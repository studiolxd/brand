package com.studiolxd.brand.support

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.TextUnit

/**
 * Una caja de **una línea** con el alto exacto de `line-height` de CSS (`fontSize × lineHeight`), con el contenido centrado
 * en ella y desbordándola si es más alto. Para un **texto** no hace falta —[BrandBasicText] ya le da su caja de línea de
 * CSS—: es para una fila que no es solo texto y tiene que medir una línea, como el contenido de `BrandTag` (un icono de
 * `1em` junto al texto). Crece con la escala de fuente. Interno.
 */
@Composable
internal fun BrandLineBox(fontSize: TextUnit, lineHeight: Float, modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Box(modifier.height((fontSize * lineHeight).toScaledDp()), contentAlignment = Alignment.Center) {
        Box(Modifier.wrapContentHeight(Alignment.CenterVertically, unbounded = true)) { content() }
    }
}
