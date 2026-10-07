package com.studiolxd.brand.support

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.compositionLocalOf
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.platform.LocalFontFamilyResolver
import androidx.compose.ui.text.TextLayoutResult
import androidx.compose.ui.text.TextMeasurer
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.LayoutDirection
import androidx.compose.ui.unit.sp
import androidx.compose.ui.unit.dp
import java.util.concurrent.ConcurrentHashMap
import kotlin.math.roundToInt

/**
 * El subrayado de la web (D64): `text-decoration` con grosor y separación de token. En React es
 * `text-underline-position: under` más `text-underline-offset: calc(<separación> − <grosor>)`, con la separación reservada
 * como `padding-block-end`. Se pinta **bajo el texto, no bajo la caja**: un icono que acompañe al texto no se subraya,
 * porque `text-decoration` no se dibuja sobre un SVG.
 *
 * Compose no tiene un `TextDecoration.Underline` con grosor y distancia controlables, así que la línea se dibuja a mano
 * bajo cada línea del texto, en el mismo sitio que Chromium: la línea base, más el descendente de la fuente normalizado
 * al em (`descendente / (ascendente + descendente) × tamaño`, redondeado al dp como hace el navegador al píxel), más
 * `separación − grosor`. La línea cae así en el borde inferior del hueco que reserva el padding, como en la web.
 *
 * Quien subraya (un botón `text`, la opción del `ThemeSwitcher` bajo el puntero) la provee con [ProvideBrandTextUnderline];
 * la pinta [BrandBasicText], de modo que solo se subraya el texto, como la herencia de `text-decoration` en CSS.
 */
@Immutable
data class BrandTextUnderline(
    /** Grosor de la línea (`*-underline-width`). Con 0 no se pinta. */
    val width: Dp,
    /** Separación entre el texto y la línea (`*-underline-offset`). */
    val offset: Dp,
    /** El color: el del primer plano de quien subraya (`currentColor`). */
    val color: Color,
)

/** El subrayado vigente para los textos de dentro: `null`, sin línea. */
val LocalBrandTextUnderline = compositionLocalOf<BrandTextUnderline?> { null }

/** Subraya los [BrandBasicText] de [content] (y nada más: ni iconos ni fondos). `null` quita la línea heredada. */
@Composable
fun ProvideBrandTextUnderline(underline: BrandTextUnderline?, content: @Composable () -> Unit) {
    CompositionLocalProvider(LocalBrandTextUnderline provides underline, content = content)
}

/** La línea de un texto subrayado: el modificador que la dibuja y el `onTextLayout` que le da la geometría. */
internal class BrandTextUnderlineDrawing(val modifier: Modifier, val onTextLayout: (TextLayoutResult) -> Unit) {
    /** El `onTextLayout` del texto, que además guarda la geometría para la línea. */
    fun chain(other: ((TextLayoutResult) -> Unit)?): (TextLayoutResult) -> Unit =
        { result -> onTextLayout(result); other?.invoke(result) }
}

/**
 * La línea del subrayado heredado ([LocalBrandTextUnderline]) para un texto con [style]. Sin subrayado devuelve `null` y
 * el texto no cambia.
 */
@Composable
internal fun rememberBrandTextUnderline(style: TextStyle): BrandTextUnderlineDrawing? {
    val underline = LocalBrandTextUnderline.current ?: return null
    if (underline.width <= 0.dp) return null
    val drop = brandUnderlineDrop(style, underline)
    var layout by remember { mutableStateOf<TextLayoutResult?>(null) }
    // Va detrás del texto y fuera de su caja (debajo): Compose no recorta lo que se dibuja fuera.
    val modifier = Modifier.drawBehind {
        val result = layout ?: return@drawBehind
        val line = underline.width.toPx()
        for (i in 0 until result.lineCount) {
            val left = result.getLineLeft(i).coerceAtLeast(0f)
            val right = result.getLineRight(i).coerceAtMost(size.width)
            if (right <= left) continue
            drawRect(underline.color, topLeft = Offset(left, result.getLineBaseline(i) + drop), size = Size(right - left, line))
        }
    }
    return BrandTextUnderlineDrawing(modifier) { layout = it }
}

/**
 * Distancia, en px, de la línea base al borde de arriba de la línea: el descendente normalizado al em (redondeado al dp)
 * más `separación − grosor`. El descendente se mide con la fuente del estilo (una línea de muestra, una vez por
 * combinación), no con una cifra escrita a mano: es la proporción de la fuente, como en [brandCssLineBox].
 */
@Composable
private fun brandUnderlineDrop(style: TextStyle, underline: BrandTextUnderline): Float {
    val density = LocalDensity.current
    val resolver = LocalFontFamilyResolver.current
    val key = DescentKey(style.fontFamily, style.fontWeight, style.fontStyle)
    val ratio = remember(key, resolver) {
        DescentRatios.getOrPut(key) {
            val sample = TextMeasurer(resolver, density, LayoutDirection.Ltr, cacheSize = 0).measure(
                "Hg",
                TextStyle(fontFamily = style.fontFamily, fontSize = SampleSize, fontWeight = style.fontWeight, fontStyle = style.fontStyle),
            )
            val height = sample.size.height.toFloat()
            if (height > 0f) (height - sample.firstBaseline) / height else 0f
        }
    }
    return with(density) {
        val fontPx = if (style.fontSize.isSp) style.fontSize.toPx() else 0f
        val descentDp = (fontPx * ratio / this.density).roundToInt()
        (descentDp.dp + underline.offset - underline.width).toPx()
    }
}

private val SampleSize = 100.sp

private data class DescentKey(
    val family: FontFamily?,
    val weight: FontWeight?,
    val style: FontStyle?,
)

private val DescentRatios = ConcurrentHashMap<DescentKey, Float>()
