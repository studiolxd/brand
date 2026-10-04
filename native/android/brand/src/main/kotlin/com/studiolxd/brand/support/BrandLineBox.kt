package com.studiolxd.brand.support

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.TextUnit

/**
 * Una caja de **una línea** con el alto exacto de `line-height` de CSS (`fontSize × lineHeight`). La fuente trae más alto
 * natural que algunos interlineados de la marca y Compose no encoge una línea por debajo de él, así que la caja se fija al
 * token y el texto se centra en ella (la técnica de `BrandTag`). Crece con la escala de fuente. Interno.
 */
@Composable
internal fun BrandLineBox(fontSize: TextUnit, lineHeight: Float, modifier: Modifier = Modifier, content: @Composable () -> Unit) {
    Box(modifier.height((fontSize * lineHeight).toScaledDp()), contentAlignment = Alignment.Center) {
        Box(Modifier.wrapContentHeight(Alignment.CenterVertically, unbounded = true)) { content() }
    }
}
