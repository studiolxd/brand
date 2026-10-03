package com.studiolxd.brand.support

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * El anillo de foco del sistema (`focus-ring-*`): un contorno de [width] a [offset] del borde del elemento, que se
 * pinta **fuera** de su caja sin cambiar la maqueta. [visible] es el foco de teclado o DPAD
 * (`BrandInteractionState.focusVisible`); con el dedo no hay anillo.
 */
fun Modifier.brandFocusRing(
    visible: Boolean,
    color: Color,
    width: Dp,
    offset: Dp,
    cornerRadius: Dp = 0.dp,
): Modifier = if (!visible) this else drawBehind {
    val outset = (offset + width / 2).toPx()
    val radius = if (cornerRadius > 0.dp) cornerRadius.toPx() + outset else 0f
    drawRoundRect(
        color = color,
        topLeft = Offset(-outset, -outset),
        size = Size(size.width + 2 * outset, size.height + 2 * outset),
        cornerRadius = CornerRadius(radius),
        style = Stroke(width = width.toPx()),
    )
}
