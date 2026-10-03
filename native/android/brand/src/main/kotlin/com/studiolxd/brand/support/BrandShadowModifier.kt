package com.studiolxd.brand.support

import android.graphics.BlurMaskFilter
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.ClipOp
import androidx.compose.ui.graphics.Paint
import androidx.compose.ui.graphics.drawscope.clipRect
import androidx.compose.ui.graphics.drawscope.drawIntoCanvas
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.studiolxd.brand.tokens.BrandShadow

/**
 * Aplica una sombra de la marca (`shadow.*`): desplazamiento, desenfoque y color de CSS, no la elevación de Material.
 * El desenfoque de CSS equivale a un radio de `blur / 2`, igual que en SwiftUI. La sombra se pinta solo **fuera** de
 * la caja (recortada por dentro), así que un fondo translúcido no la deja ver a través. Sin sombra ([BrandShadow.None]),
 * no hace nada.
 */
fun Modifier.brandShadow(shadow: BrandShadow, cornerRadius: Dp = 0.dp): Modifier {
    if (shadow.blur == 0.dp && shadow.x == 0.dp && shadow.y == 0.dp) return this
    return drawBehind {
        val radius = (shadow.blur / 2).toPx()
        val corner = cornerRadius.toPx()
        drawIntoCanvas { canvas ->
            val paint = Paint().apply {
                color = shadow.color
                asFrameworkPaint().maskFilter = if (radius > 0f) BlurMaskFilter(radius, BlurMaskFilter.Blur.NORMAL) else null
            }
            // Recorta el interior de la caja: la sombra solo asoma por fuera.
            clipRect(0f, 0f, size.width, size.height, ClipOp.Difference) {
                val left = shadow.x.toPx()
                val top = shadow.y.toPx()
                canvas.nativeCanvas.drawRoundRect(left, top, left + size.width, top + size.height, corner, corner, paint.asFrameworkPaint())
            }
        }
    }
}
