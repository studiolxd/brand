package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.layout.layout
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.rememberTextMeasurer
import androidx.compose.ui.unit.constrainHeight
import kotlin.math.ceil

/**
 * El alto de un texto de **una o varias líneas** con el `line-height` de CSS cuando el interlineado es más apretado que
 * la fuente: Compose no deja la PRIMERA línea por debajo del alto natural de la fuente (23,7 dp a 16 sp con Google Sans
 * Flex), así que un `line-height: 1.3` mide 20,8 en la web y 23,7 aquí. Las demás líneas sí toman el interlineado.
 *
 * Lo que la primera línea trae de más se mide una vez con [style] (una línea de muestra contra `ceil(lineHeight)`) y se
 * descuenta del alto, repartido mitad arriba y mitad abajo, como el medio interlineado de CSS: los glifos se quedan
 * centrados en su caja y lo que sobresale se pinta fuera, como en la web. Con un interlineado que ya cubre la fuente
 * (`1.5`) no hace nada. Para un texto de una sola línea dentro de una fila, [BrandLineBox].
 */
@Composable
internal fun Modifier.brandCssLineHeight(style: TextStyle): Modifier {
    val measurer = rememberTextMeasurer(cacheSize = 1)
    val density = LocalDensity.current
    val extra = remember(style, density) {
        val natural = measurer.measure("Hg", style).size.height
        val box = with(density) { ceil(style.lineHeight.toPx()).toInt() }
        (natural - box).coerceAtLeast(0)
    }
    if (extra == 0) return this
    return layout { measurable, constraints ->
        val placeable = measurable.measure(constraints.copy(minHeight = 0))
        val height = constraints.constrainHeight(placeable.height - extra)
        layout(placeable.width, height) { placeable.place(0, -extra / 2) }
    }
}
