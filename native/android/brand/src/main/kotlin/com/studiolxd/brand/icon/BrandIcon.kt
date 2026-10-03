package com.studiolxd.brand.icon

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.ui.draw.drawWithCache
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.drawscope.Fill
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import com.studiolxd.brand.support.LocalBrandIconTextSize
import com.studiolxd.brand.support.brandContentColor
import com.studiolxd.brand.support.scaledByFontScale
import com.studiolxd.brand.support.toScaledDp
import com.studiolxd.brand.tokens.BrandBorderWidth
import com.studiolxd.brand.tokens.BrandIconTokens

/**
 * Talla de un icono (`Icon` `size`). Las cinco fijas salen de `icon.size-*`; `text` mide `1em`: el tamaño de la
 * tipografía que lo rodea ([LocalBrandIconTextSize]), como en un botón o un enlace.
 */
enum class BrandIconSize(val value: String) {
    Xs("xs"),
    Sm("sm"),
    Md("md"),
    Lg("lg"),
    Xl("xl"),
    Text("text"),
}

/** El lado de la caja de un icono, en dp, antes de aplicar la escala de fuente (`text` ya viene en sp). */
internal fun BrandIconSize.baseDp(): Dp? = when (this) {
    BrandIconSize.Xs -> BrandIconTokens.sizeXs
    BrandIconSize.Sm -> BrandIconTokens.sizeSm
    BrandIconSize.Md -> BrandIconTokens.sizeMd
    BrandIconSize.Lg -> BrandIconTokens.sizeLg
    BrandIconSize.Xl -> BrandIconTokens.sizeXl
    BrandIconSize.Text -> null
}

/**
 * Un icono del catálogo de Brand, dibujado con los mismos trazos que el `Icon` de React (retícula de 24, trazo de
 * 1 dp que no escala con la talla). Pinta con [color] o, sin él, con el primer plano heredado (`currentColor`).
 *
 * Sin [contentDescription] es **decorativo** (`aria-hidden` en la web): TalkBack lo ignora. Con él, se anuncia como
 * imagen. Crece con la escala de fuente del sistema.
 */
@Composable
fun BrandIcon(
    name: BrandIconName,
    modifier: Modifier = Modifier,
    size: BrandIconSize = BrandIconSize.Md,
    color: Color = Color.Unspecified,
    contentDescription: String? = null,
) {
    val side = size.baseDp()?.scaledByFontScale() ?: LocalBrandIconTextSize.current.toScaledDp()
    val tint = if (color != Color.Unspecified) color else brandContentColor()
    val semantic = if (contentDescription != null) {
        Modifier.semantics {
            this.contentDescription = contentDescription
            role = Role.Image
        }
    } else {
        Modifier
    }
    val strokeWidth = BrandBorderWidth.default
    Box(
        modifier
            .size(side)
            .then(semantic)
            .drawWithCache {
                val px = this.size.width
                val stroke = Stroke(width = strokeWidth.toPx(), miter = 10f)
                // Los trazos se construyen una vez por tamaño; la retícula de 24 se escala a la caja.
                val paths = name.shapes.map { shape -> shape to shape.toPath(px) }
                onDrawBehind {
                    for ((shape, path) in paths) {
                        if (shape.filled) drawPath(path, tint, style = Fill)
                        if (shape.stroked) {
                            drawPath(
                                path,
                                tint,
                                style = Stroke(
                                    width = stroke.width,
                                    miter = stroke.miter,
                                    cap = if (shape.round) StrokeCap.Round else StrokeCap.Butt,
                                    join = if (shape.roundJoin) StrokeJoin.Round else StrokeJoin.Miter,
                                ),
                            )
                        }
                    }
                }
            },
    )
}
